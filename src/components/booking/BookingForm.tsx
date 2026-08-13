'use client';

import React, { useEffect, useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import {
  ACCEPTED_UPLOAD_EXTENSIONS,
  ACCEPTED_UPLOAD_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  type ExtraId,
  type PackageId,
  type ReelTierId,
} from '@/data/pricing';
import {
  calculateQuote,
  formatGbp,
  QuoteValidationError,
  serializeQuoteSelection,
  type QuoteResult,
} from '@/lib/pricing';
import { clearBookingSelection, loadBookingSelection } from '@/lib/booking-storage';
import { QuoteSummary } from '@/components/booking/QuoteSummary';
import { DepositPlaceholder } from '@/components/booking/DepositPlaceholder';
import { CalendarPlaceholder } from '@/components/booking/CalendarPlaceholder';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface BookingFormProps {
  initialPackageId?: string | null;
  initialExtraIds?: string[];
  initialReelTierId?: string | null;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const emptyForm: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
};

function isAcceptedFile(file: File): boolean {
  if ((ACCEPTED_UPLOAD_MIME_TYPES as readonly string[]).includes(file.type)) {
    return true;
  }
  const lower = file.name.toLowerCase();
  return ACCEPTED_UPLOAD_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export function BookingForm({
  initialPackageId,
  initialExtraIds = [],
  initialReelTierId = null,
}: BookingFormProps) {
  const [selection, setSelection] = useState<{
    packageId: string;
    extraIds: string[];
    reelTierId: string | null;
  } | null>(() =>
    initialPackageId
      ? {
          packageId: initialPackageId,
          extraIds: initialExtraIds,
          reelTierId: initialReelTierId,
        }
      : null
  );
  // Only wait for client hydration when we may need sessionStorage fallback.
  const [hydrated, setHydrated] = useState(Boolean(initialPackageId));
  const [form, setForm] = useState<FormState>(emptyForm);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [submittedQuote, setSubmittedQuote] = useState<QuoteResult | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (initialPackageId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHydrated(true);
      return;
    }
    const stored = loadBookingSelection();
    if (stored) {
      setSelection(stored);
    }
    setHydrated(true);
  }, [initialPackageId]);

  const quote = useMemo(() => {
    if (!selection) return null;
    try {
      return calculateQuote({
        packageId: selection.packageId,
        extraIds: selection.extraIds,
        reelTierId: selection.reelTierId,
      });
    } catch {
      return null;
    }
  }, [selection]);

  const acceptAttr = ACCEPTED_UPLOAD_EXTENSIONS.join(',');

  function onFilesChange(list: FileList | null) {
    if (!list) return;
    setFileError(null);
    const next = [...files, ...Array.from(list)];
    const invalid = next.find((f) => !isAcceptedFile(f));
    if (invalid) {
      setFileError(
        `“${invalid.name}” is not supported. Upload images, videos, logos, or PDFs.`
      );
      return;
    }
    const total = next.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_UPLOAD_BYTES) {
      setFileError('Total uploads must be under 10MB.');
      return;
    }
    setFiles(next);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError(null);
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!selection || !quote) {
      setFormError('Please choose a package on the pricing calculator first.');
      return;
    }

    if (!form.name.trim() || !form.email.trim()) {
      setFormError('Name and email are required.');
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!emailOk) {
      setFormError('Please enter a valid email address.');
      return;
    }

    startTransition(async () => {
      try {
        const body = new FormData();
        body.set(
          'quote',
          JSON.stringify({
            packageId: selection.packageId as PackageId,
            extraIds: selection.extraIds as ExtraId[],
            reelTierId: selection.reelTierId as ReelTierId | null,
          })
        );
        body.set('name', form.name.trim());
        body.set('email', form.email.trim());
        body.set('phone', form.phone.trim());
        body.set('company', form.company.trim());
        body.set('message', form.message.trim());
        for (const file of files) {
          body.append('files', file);
        }

        const res = await fetch('/api/enquiry', {
          method: 'POST',
          body,
        });

        const data = (await res.json()) as {
          ok?: boolean;
          error?: string;
          reference?: string;
          quote?: QuoteResult;
        };

        if (!res.ok || !data.ok) {
          setFormError(data.error || 'Something went wrong. Please try again.');
          return;
        }

        setReference(data.reference || 'WDE-ENQUIRY');
        setSubmittedQuote(data.quote || quote);
        clearBookingSelection();
      } catch (err) {
        const message =
          err instanceof QuoteValidationError
            ? err.message
            : 'Unable to send enquiry. Please try again.';
        setFormError(message);
      }
    });
  }

  if (!hydrated) {
    return (
      <div className="border border-border bg-surface p-8 text-muted text-sm">
        Loading your quote…
      </div>
    );
  }

  if (reference && submittedQuote) {
    return (
      <div className="space-y-10">
        <div className="border border-accent/40 bg-surface p-8 md:p-12">
          <p className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase mb-4">
            Enquiry received
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Thanks — we&apos;ll be in touch shortly.
          </h2>
          <p className="text-muted leading-relaxed mb-6 max-w-xl">
            Your quote has been emailed to the studio. Reference{' '}
            <span className="text-foreground font-mono">{reference}</span>. Estimated total{' '}
            <span className="text-foreground">
              {submittedQuote.packagePricePending && submittedQuote.subtotal === 0
                ? 'POA'
                : formatGbp(submittedQuote.subtotal)}
            </span>
            {submittedQuote.deposit > 0 ? (
              <>
                {' '}
                · deposit {formatGbp(submittedQuote.deposit)}
              </>
            ) : null}
            .
          </p>
          <QuoteSummary quote={submittedQuote} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DepositPlaceholder deposit={submittedQuote.deposit} />
          <CalendarPlaceholder />
        </div>

        <Button asChild variant="outline">
          <Link href="/pricing">Build another quote</Link>
        </Button>
      </div>
    );
  }

  if (!selection || !quote) {
    return (
      <div className="border border-border bg-surface p-8 md:p-12 text-center space-y-6">
        <h2 className="font-serif text-2xl text-foreground">Start with a package</h2>
        <p className="text-muted max-w-md mx-auto">
          Build your quote on the pricing calculator, then return here to send your enquiry and
          files.
        </p>
        <Button asChild>
          <Link href="/pricing">Open Pricing Calculator</Link>
        </Button>
      </div>
    );
  }

  const editHref = `/pricing?${serializeQuoteSelection({
    packageId: selection.packageId as PackageId,
    extraIds: selection.extraIds as ExtraId[],
    reelTierId: selection.reelTierId as ReelTierId | null,
  })}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="block space-y-2">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted">
              Full name *
            </span>
            <input
              required
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block space-y-2">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted">
              Email *
            </span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block space-y-2">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted">
              Phone
            </span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block space-y-2">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted">
              Company
            </span>
            <input
              name="company"
              autoComplete="organization"
              value={form.company}
              onChange={(e) => updateField('company', e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted">
            Project notes
          </span>
          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={(e) => updateField('message', e.target.value)}
            placeholder="Goals, deadlines, platforms, references…"
            className={cn(inputClass, 'resize-y min-h-[140px]')}
          />
        </label>

        <fieldset className="space-y-3">
          <legend className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted mb-2">
            File upload
          </legend>
          <p className="text-sm text-muted">
            Images, videos, logos, or brand guidelines (PDF). Max 10MB total.
          </p>
          <label
            className={cn(
              'flex flex-col items-center justify-center gap-2 border border-dashed border-border bg-surface px-6 py-10 cursor-pointer hover:border-muted transition-colors',
              fileError && 'border-red-500/60'
            )}
          >
            <span className="text-sm text-foreground font-serif">Drop files or click to browse</span>
            <span className="text-xs text-muted font-mono">{acceptAttr}</span>
            <input
              type="file"
              multiple
              accept={acceptAttr}
              className="sr-only"
              onChange={(e) => {
                onFilesChange(e.target.files);
                e.target.value = '';
              }}
            />
          </label>
          {fileError ? (
            <p className="text-sm text-red-400" role="alert">
              {fileError}
            </p>
          ) : null}
          {files.length > 0 ? (
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-3 border border-border bg-background px-4 py-3 text-sm"
                >
                  <span className="truncate text-foreground">
                    {file.name}{' '}
                    <span className="text-muted font-mono text-xs">
                      ({Math.ceil(file.size / 1024)} KB)
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-xs uppercase tracking-widest text-muted hover:text-accent"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </fieldset>

        {formError ? (
          <p className="text-sm text-red-400" role="alert">
            {formError}
          </p>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit" size="lg" disabled={isPending} className="h-14 px-10 text-xs tracking-[0.2em]">
            {isPending ? 'Sending…' : 'Send Enquiry'}
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14">
            <Link href={editHref}>Edit quote</Link>
          </Button>
        </div>
      </form>

      <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
        <QuoteSummary quote={quote} />
        <p className="text-xs text-muted leading-relaxed">
          Totals are recalculated on our server from the official pricing list — client figures are
          never trusted for the quote email.
        </p>
      </aside>
    </div>
  );
}

const inputClass =
  'w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-accent';
