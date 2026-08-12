import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { PricingCalculator } from '@/components/booking/PricingCalculator';
import {
  getExtraById,
  getPackageById,
  getReelTierById,
  type ExtraId,
  type PackageId,
  type ReelTierId,
} from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Pricing Calculator | We Do Effects',
  description:
    'Build a live video package quote with optional extras, reel volume pricing, and deposit estimate.',
};

interface PricingPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const params = await searchParams;
  const packageParam = first(params.package);
  const extrasParam = first(params.extras);
  const reelsParam = first(params.reels);

  const initialPackageId: PackageId =
    (packageParam && getPackageById(packageParam)?.id) || 'footages';

  const initialExtraIds: ExtraId[] = extrasParam
    ? extrasParam
        .split(',')
        .map((id) => getExtraById(id.trim())?.id)
        .filter((id): id is ExtraId => Boolean(id))
    : [];

  const initialReelTierId: ReelTierId | null =
    (reelsParam && getReelTierById(reelsParam)?.id) || null;

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <Section spacing="lg" className="border-b border-border/40">
          <div className="max-w-3xl mb-14 md:mb-20">
            <p className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase mb-5">
              Pricing Calculator
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground uppercase tracking-tight leading-[0.95] mb-6">
              Build your video quote
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-xl">
              Select a package, add extras, choose reel volume where it applies, and see totals and
              deposit update live — then continue to book.
            </p>
          </div>
          <PricingCalculator
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
