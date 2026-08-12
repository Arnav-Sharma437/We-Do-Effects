'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CalendarPlaceholderProps {
  className?: string;
}

export function CalendarPlaceholder({ className }: CalendarPlaceholderProps) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();

  if (calendlyUrl) {
    return (
      <div className={cn('border border-border bg-surface-elevated p-6 md:p-8', className)}>
        <h3 className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase mb-3">
          Book Consultation
        </h3>
        <p className="text-sm text-muted mb-6 leading-relaxed">
          Pick a time for a short consultation call after your enquiry.
        </p>
        <Button asChild className="w-full md:w-auto">
          <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
            Open Calendar
          </a>
        </Button>
        <div className="mt-6 aspect-[4/3] w-full border border-border/60 bg-background overflow-hidden">
          <iframe
            title="Consultation calendar"
            src={calendlyUrl}
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('border border-border bg-surface-elevated p-6 md:p-8', className)}>
      <h3 className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase mb-3">
        Book Consultation
      </h3>
      <p className="text-foreground font-serif text-lg mb-2">Consultation booking coming soon</p>
      <p className="text-sm text-muted leading-relaxed">
        A Calendly / TidyCal link will appear here once{' '}
        <code className="text-accent text-xs">NEXT_PUBLIC_CALENDLY_URL</code> is configured.
      </p>
    </div>
  );
}
