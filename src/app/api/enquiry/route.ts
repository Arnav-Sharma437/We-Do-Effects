import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  ACCEPTED_UPLOAD_EXTENSIONS,
  ACCEPTED_UPLOAD_MIME_TYPES,
  MAX_UPLOAD_BYTES,
} from '@/data/pricing';
import {
  calculateQuote,
  formatGbp,
  QuoteValidationError,
  type QuoteResult,
} from '@/lib/pricing';

export const runtime = 'nodejs';

function isAcceptedFile(file: File): boolean {
  if ((ACCEPTED_UPLOAD_MIME_TYPES as readonly string[]).includes(file.type)) {
    return true;
  }
  const lower = file.name.toLowerCase();
  return ACCEPTED_UPLOAD_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function buildReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `WDE-${stamp}-${rand}`;
}

function quoteEmailHtml(args: {
  reference: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  quote: QuoteResult;
  fileNames: string[];
}): string {
  const { reference, name, email, phone, company, message, quote, fileNames } = args;
  const lines = quote.lineItems
    .map(
      (item) =>
        `<li>${item.label}: ${
          item.amount === null ? 'TBD / POA' : formatGbp(item.amount)
        }${item.note ? ` (${item.note})` : ''}</li>`
    )
    .join('');

  return `
    <h1>New We Do Effects enquiry</h1>
    <p><strong>Reference:</strong> ${reference}</p>
    <h2>Contact</h2>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(name)}</li>
      <li><strong>Email:</strong> ${escapeHtml(email)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(phone || '—')}</li>
      <li><strong>Company:</strong> ${escapeHtml(company || '—')}</li>
    </ul>
    <h2>Quote (server-calculated)</h2>
    <ul>${lines}</ul>
    <p><strong>Estimated total:</strong> ${
      quote.packagePricePending && quote.subtotal === 0
        ? 'POA'
        : formatGbp(quote.subtotal)
    }</p>
    <p><strong>Deposit:</strong> ${
      quote.deposit > 0 ? formatGbp(quote.deposit) : '—'
    } (${escapeHtml(quote.depositLabel)})</p>
    <h2>Project notes</h2>
    <p>${escapeHtml(message || '—').replace(/\n/g, '<br/>')}</p>
    <h2>Attachments</h2>
    <p>${
      fileNames.length
        ? fileNames.map((n) => escapeHtml(n)).join(', ')
        : 'None'
    }</p>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const quoteRaw = String(formData.get('quote') || '');

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    let quotePayload: {
      packageId?: string;
      extraIds?: string[];
      reelTierId?: string | null;
    };
    try {
      quotePayload = JSON.parse(quoteRaw) as typeof quotePayload;
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Invalid quote payload.' },
        { status: 400 }
      );
    }

    // Recompute from pricing config — never trust client totals.
    const quote = calculateQuote({
      packageId: String(quotePayload.packageId || ''),
      extraIds: Array.isArray(quotePayload.extraIds) ? quotePayload.extraIds : [],
      reelTierId: quotePayload.reelTierId ?? null,
    });

    const uploaded = formData.getAll('files').filter((v): v is File => v instanceof File && v.size > 0);
    let totalBytes = 0;
    const attachments: { filename: string; content: Buffer }[] = [];

    for (const file of uploaded) {
      if (!isAcceptedFile(file)) {
        return NextResponse.json(
          {
            ok: false,
            error: `Unsupported file type: ${file.name}. Upload images, videos, logos, or PDFs.`,
          },
          { status: 400 }
        );
      }
      totalBytes += file.size;
      if (totalBytes > MAX_UPLOAD_BYTES) {
        return NextResponse.json(
          { ok: false, error: 'Total uploads must be under 10MB.' },
          { status: 400 }
        );
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name, content: buffer });
    }

    const reference = buildReference();
    const html = quoteEmailHtml({
      reference,
      name,
      email,
      phone,
      company,
      message,
      quote,
      fileNames: attachments.map((a) => a.filename),
    });

    const resendKey = process.env.RESEND_API_KEY?.trim();
    const toEmail = process.env.ENQUIRY_TO_EMAIL?.trim();
    const fromEmail = process.env.ENQUIRY_FROM_EMAIL?.trim();

    if (!resendKey || !toEmail || !fromEmail) {
      console.info('[enquiry:dev-fallback]', {
        reference,
        name,
        email,
        phone,
        company,
        message,
        quote: {
          packageId: quote.packageId,
          extraIds: quote.extraIds,
          reelTierId: quote.reelTierId,
          subtotal: quote.subtotal,
          deposit: quote.deposit,
          lineItems: quote.lineItems,
        },
        files: attachments.map((a) => a.filename),
        note: 'Resend env vars missing — enquiry logged only.',
      });
    } else {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject: `[We Do Effects] Enquiry ${reference} — ${quote.packageName}`,
        html,
        attachments: attachments.map((a) => ({
          filename: a.filename,
          content: a.content,
        })),
      });

      if (error) {
        console.error('[enquiry:resend-error]', error);
        return NextResponse.json(
          { ok: false, error: 'Unable to send enquiry email. Please try again.' },
          { status: 502 }
        );
      }

      // Best-effort customer confirmation
      await resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: `We received your We Do Effects enquiry (${reference})`,
        html: `
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thanks for your enquiry. We&apos;ve received your quote request and will be in touch shortly.</p>
          <p><strong>Reference:</strong> ${reference}</p>
          <p><strong>Estimated total:</strong> ${
            quote.packagePricePending && quote.subtotal === 0
              ? 'POA'
              : formatGbp(quote.subtotal)
          }</p>
          <p><strong>Deposit:</strong> ${
            quote.deposit > 0 ? formatGbp(quote.deposit) : '—'
          }</p>
          <p>— We Do Effects</p>
        `,
      });
    }

    return NextResponse.json({
      ok: true,
      reference,
      quote,
      emailSent: Boolean(resendKey && toEmail && fromEmail),
    });
  } catch (err) {
    if (err instanceof QuoteValidationError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
    }
    console.error('[enquiry:error]', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong processing your enquiry.' },
      { status: 500 }
    );
  }
}
