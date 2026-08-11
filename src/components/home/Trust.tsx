'use client';

import React from 'react';
import { Section } from '@/components/layout/Section';

export const Trust = () => {
  return (
    <Section spacing="xl" className="bg-background">
      {/* Testimonials are structurally hidden until verified content is available to avoid exposing fake quotes */}
      <div className="hidden">
        {/* Testimonial component ready for future use */}
      </div>

      <div className="flex flex-col items-center text-center">
        <h2 className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-6">Trusted By</h2>
        <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter text-foreground mb-16">
          Ambitious Brands
        </h3>

        {/* Client Logos Placeholder */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-40 grayscale">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-[3/1] bg-surface-elevated border border-border/50 rounded flex items-center justify-center relative overflow-hidden group hover:opacity-100 transition-opacity">
               <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-muted uppercase">Client Logo</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
