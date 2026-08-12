'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { packages } from '@/data/pricing';
import { formatGbp } from '@/lib/pricing';

const previewIds = ['footages', 'informative', 'stories', 'podcast'] as const;

const previewPrices = previewIds.map((id) => {
  const pkg = packages.find((p) => p.id === id)!;
  const price =
    pkg.basePrice === null
      ? 'TBD / POA'
      : pkg.fromPrice
        ? `From ${formatGbp(pkg.basePrice)}`
        : `From ${formatGbp(pkg.basePrice)}`;
  return { service: pkg.name, price };
});

export const PricingPreview = () => {
  return (
    <Section spacing="xl" className="bg-surface-elevated border-y border-border relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, var(--foreground) 0%, transparent 50%)' }} />

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Context */}
        <div className="lg:w-1/2 w-full">
          <h2 className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-6">Investment</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold text-foreground uppercase tracking-tighter leading-[0.9] mb-8">
            What should you expect to invest?
          </h3>
          <p className="text-lg text-muted mb-12 leading-relaxed max-w-md">
            Build a live quote with packages, extras, and reel volume pricing — then send an enquiry
            with your deposit estimate.
          </p>
          <Button size="lg" asChild className="h-14 px-10 text-xs tracking-[0.2em] font-bold bg-foreground text-background hover:bg-foreground/90">
            <Link href="/pricing">OPEN PRICING CALCULATOR</Link>
          </Button>
        </div>

        {/* Pricing List */}
        <div className="lg:w-1/2 w-full">
          <div className="bg-background border border-border p-8 md:p-12 shadow-2xl relative z-10">
            <h4 className="text-xs font-bold tracking-[0.3em] text-muted uppercase mb-8 border-b border-border pb-4">Starting Prices</h4>
            <ul className="space-y-6">
              {previewPrices.map((item, index) => (
                <motion.li 
                  key={item.service}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6 last:border-0 last:pb-0"
                >
                  <span className="text-xl font-serif text-foreground">{item.service}</span>
                  <span className="text-sm font-mono bg-surface px-3 py-1 rounded text-muted uppercase tracking-widest">{item.price}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};
