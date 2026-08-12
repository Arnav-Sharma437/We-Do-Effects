import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { BookingForm } from '@/components/booking/BookingForm';
import {
  getExtraById,
  getPackageById,
  getReelTierById,
  type ExtraId,
} from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Book / Enquiry | We Do Effects',
  description:
    'Send your video project enquiry with quote summary, file uploads, and deposit estimate.',
};

interface BookPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const params = await searchParams;
  const packageParam = first(params.package);
  const extrasParam = first(params.extras);
  const reelsParam = first(params.reels);

  const initialPackageId =
    packageParam && getPackageById(packageParam) ? packageParam : null;

  const initialExtraIds: ExtraId[] = extrasParam
    ? extrasParam
        .split(',')
        .map((id) => getExtraById(id.trim())?.id)
        .filter((id): id is ExtraId => Boolean(id))
    : [];

  const initialReelTierId =
    reelsParam && getReelTierById(reelsParam) ? reelsParam : null;

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <Section spacing="lg" className="border-b border-border/40">
          <div className="max-w-3xl mb-14 md:mb-20">
            <p className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase mb-5">
              Book Consultation
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground uppercase tracking-tight leading-[0.95] mb-6">
              Send your enquiry
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-xl">
              Confirm your details, upload brand assets, and we&apos;ll receive your automatic quote.
              Deposit payment and calendar booking follow once your enquiry is in.
            </p>
          </div>
          <BookingForm
            initialPackageId={initialPackageId}
            initialExtraIds={initialExtraIds}
            initialReelTierId={initialReelTierId}
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}
