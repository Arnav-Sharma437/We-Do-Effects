'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { packages, extras, reelTiers, type ExtraId, type PackageId, type ReelTierId } from '@/data/pricing';
import {
  calculateQuote,
  formatGbp,
  serializeQuoteSelection,
  type QuoteSelection,
} from '@/lib/pricing';
import { saveBookingSelection } from '@/lib/booking-storage';
import { QuoteSummary } from '@/components/booking/QuoteSummary';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PricingCalculatorProps {
  initialPackageId?: PackageId;
  initialExtraIds?: ExtraId[];
  initialReelTierId?: ReelTierId | null;
}

export function PricingCalculator({
  initialPackageId = 'footages',
  initialExtraIds = [],
  initialReelTierId = null,
}: PricingCalculatorProps) {
  const prefersReducedMotion = useReducedMotion();
  const [packageId, setPackageId] = useState<PackageId>(initialPackageId);
  const [selectedExtras, setSelectedExtras] = useState<Record<ExtraId, boolean>>(() => {
    const map = Object.fromEntries(extras.map((e) => [e.id, false])) as Record<ExtraId, boolean>;
    for (const id of initialExtraIds) {
      map[id] = true;
    }
    return map;
  });
  const [reelTierId, setReelTierId] = useState<ReelTierId | null>(initialReelTierId);

  const selectedPackage = packages.find((p) => p.id === packageId)!;

  const selection: QuoteSelection = useMemo(() => {
    const extraIds = extras.filter((e) => selectedExtras[e.id]).map((e) => e.id);
    return {
      packageId,
      extraIds,
      reelTierId: selectedPackage.supportsReels ? reelTierId : null,
    };
  }, [packageId, selectedExtras, reelTierId, selectedPackage.supportsReels]);

  const quote = useMemo(() => calculateQuote(selection), [selection]);

  const bookHref = `/book?${serializeQuoteSelection(selection)}`;

  function handleContinue() {
    saveBookingSelection({
      packageId: selection.packageId,
      extraIds: selection.extraIds,
      reelTierId: selection.reelTierId,
    });
  }

  function toggleExtra(id: ExtraId) {
    setSelectedExtras((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function selectPackage(id: PackageId) {
    setPackageId(id);
    const next = packages.find((p) => p.id === id);
    if (next && !next.supportsReels) {
      setReelTierId(null);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      <div className="lg:col-span-7 space-y-12">
        {/* Packages */}
        <fieldset>
          <legend className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase mb-6">
            Service Selection
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Video packages">
            {packages.map((pkg, index) => {
              const selected = pkg.id === packageId;
              const priceLabel =
                pkg.basePrice === null
                  ? 'TBD / POA'
                  : pkg.fromPrice
                    ? `From ${formatGbp(pkg.basePrice)}`
                    : formatGbp(pkg.basePrice);

              return (
                <motion.button
                  key={pkg.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => selectPackage(pkg.id)}
                  className={cn(
                    'text-left border p-5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
                    selected
                      ? 'border-accent bg-surface-elevated'
                      : 'border-border bg-surface hover:border-muted'
                  )}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="font-serif text-xl text-foreground">{pkg.name}</span>
                    {selected ? (
                      <span className="inline-flex h-6 w-6 items-center justify-center bg-accent text-background" aria-hidden>
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="h-6 w-6 border border-border" aria-hidden />
                    )}
                  </div>
                  <span className="block text-sm font-mono text-muted mb-2">{priceLabel}</span>
                  {pkg.description ? (
                    <span className="text-xs text-muted leading-relaxed">{pkg.description}</span>
                  ) : null}
                </motion.button>
              );
            })}
          </div>
        </fieldset>

        {/* Extras */}
        <fieldset>
          <legend className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase mb-6">
            Optional Extras
          </legend>
          <div className="space-y-3">
            {extras.map((extra) => {
              const on = selectedExtras[extra.id];
              return (
                <button
                  key={extra.id}
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => toggleExtra(extra.id)}
                  className={cn(
                    'w-full flex items-center justify-between gap-4 border px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
                    on ? 'border-accent bg-surface-elevated' : 'border-border bg-surface hover:border-muted'
                  )}
                >
                  <div>
                    <span className="block text-sm md:text-base text-foreground font-serif">
                      {extra.question}
                    </span>
                    <span className="text-xs text-muted font-mono mt-1 block">
                      {on ? 'Yes' : 'No'} · +{formatGbp(extra.price)}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'relative h-7 w-12 border transition-colors',
                      on ? 'border-accent bg-accent/20' : 'border-border bg-background'
                    )}
                    aria-hidden
                  >
                    <span
                      className={cn(
                        'absolute top-0.5 h-5 w-5 bg-foreground transition-all',
                        on ? 'left-6 bg-accent' : 'left-0.5'
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Reels */}
        {selectedPackage.supportsReels ? (
          <fieldset>
            <legend className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase mb-2">
              Reel Quantity
            </legend>
            <p className="text-sm text-muted mb-6">
              Select a reel pack for automatic volume pricing. Optional — leave unselected if not needed.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="radiogroup" aria-label="Reel quantity">
              {reelTiers.map((tier) => {
                const selected = reelTierId === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setReelTierId(selected ? null : tier.id)}
                    className={cn(
                      'border p-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
                      selected
                        ? 'border-accent bg-surface-elevated'
                        : 'border-border bg-surface hover:border-muted'
                    )}
                  >
                    <span className="block font-serif text-lg text-foreground mb-1">{tier.label}</span>
                    <span className="text-xs font-mono text-muted">{formatGbp(tier.price)}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : null}
      </div>

      {/* Sticky summary */}
      <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
        <QuoteSummary quote={quote} />
        <Button asChild size="lg" className="w-full h-14 text-xs tracking-[0.2em] font-bold">
          <Link href={bookHref} onClick={handleContinue}>
            Continue to Book
          </Link>
        </Button>
        <p className="text-xs text-muted leading-relaxed text-center lg:text-left">
          Next: tell us about your project, upload brand files, and send your enquiry. Deposit payment
          and consultation booking follow after submission.
        </p>
      </div>
    </div>
  );
}
