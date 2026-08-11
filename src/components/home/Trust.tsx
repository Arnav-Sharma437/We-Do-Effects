'use client';

import React from 'react';
import { Section } from '@/components/layout/Section';

export const Trust = () => {
  return (
    <Section spacing="xl" className="bg-surface relative border-t border-border/50">
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
        <div className="w-full max-w-xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mt-8" />
      </div>
    </Section>
  );
};
