'use client';

import React from 'react';
import { formatGbp, type QuoteResult } from '@/lib/pricing';
import { cn } from '@/lib/utils';

interface QuoteSummaryProps {
  quote: QuoteResult | null;
  className?: string;
  compact?: boolean;
}

export function QuoteSummary({ quote, className, compact = false }: QuoteSummaryProps) {
  if (!quote) {
    return (
      <div
        className={cn(
          'border border-border bg-surface p-6 md:p-8 text-muted',
          className
        )}
      >
        <p className="text-sm tracking-wide">Select a package to see your live quote.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'border border-border bg-surface relative overflow-hidden',
        compact ? 'p-5' : 'p-6 md:p-8',
        className
      )}
      aria-live="polite"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <h3 className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase mb-6">
        Your Quote
      </h3>

      <ul className="space-y-4 mb-8">
        {quote.lineItems.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-4 border-b border-border/50 pb-3 last:border-0 last:pb-0"
          >
            <div>
              <span className="text-sm md:text-base text-foreground font-serif">{item.label}</span>
              {item.note ? (
                <span className="block text-[11px] uppercase tracking-widest text-muted mt-1">
                  {item.note}
                </span>
              ) : null}
            </div>
            <span className="text-sm font-mono text-muted whitespace-nowrap">
              {item.amount === null ? 'TBD' : formatGbp(item.amount)}
            </span>
          </li>
        ))}
      </ul>

      <div className="space-y-3 border-t border-border pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
            Estimated total
          </span>
          <span className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
            {quote.packagePricePending && quote.subtotal === 0
              ? 'POA'
              : formatGbp(quote.subtotal)}
          </span>
        </div>
        {quote.packagePricePending ? (
          <p className="text-xs text-muted leading-relaxed">
            Visuals base price is TBD. Extras and reels still update the running total.
          </p>
        ) : null}
        <div className="flex items-baseline justify-between gap-4 pt-2">
          <div>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Deposit due
            </span>
            <span className="text-[11px] text-muted">{quote.depositLabel}</span>
          </div>
          <span className="text-xl font-display font-bold text-accent">
            {quote.deposit > 0 ? formatGbp(quote.deposit) : '—'}
          </span>
        </div>
      </div>
    </div>
  );
}
