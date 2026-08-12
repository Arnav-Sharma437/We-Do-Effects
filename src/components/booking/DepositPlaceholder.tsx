'use client';

import React from 'react';
import { formatGbp } from '@/lib/pricing';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface DepositPlaceholderProps {
  deposit: number;
  className?: string;
}

export function DepositPlaceholder({ deposit, className }: DepositPlaceholderProps) {
  return (
    <div className={cn('border border-border bg-surface-elevated p-6 md:p-8', className)}>
      <h3 className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase mb-3">
        Pay Deposit
      </h3>
      <p className="text-foreground font-serif text-lg mb-2">
        {deposit > 0 ? formatGbp(deposit) : 'Deposit pending quote confirmation'}
      </p>
      <p className="text-sm text-muted mb-6 leading-relaxed">
        Online deposit payments via Stripe will be available once payment keys are connected.
        We&apos;ll confirm your enquiry and send payment details shortly.
      </p>
      <Button
        type="button"
        disabled
        className="w-full md:w-auto opacity-60 cursor-not-allowed"
        aria-disabled="true"
      >
        Pay Deposit — Coming Soon
      </Button>
    </div>
  );
}
