'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

export const PricingPreview = () => {
  return (
    <Section spacing="xl" className="bg-surface border-y border-border">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-sm font-medium tracking-[0.2em] text-accent uppercase mb-4">Investment</h2>
        <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-8">What should you expect to invest?</h3>
        
        <p className="text-lg text-muted mb-12 leading-relaxed">
          Every project is unique, but we believe in transparency. 
          Our pricing is structured to deliver measurable value and premium quality without surprises.
        </p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block border border-border bg-background p-8 md:p-12"
        >
          <div className="text-muted tracking-widest uppercase text-sm mb-4">Starting From</div>
          {/* Explicit Placeholder per UX review constraints */}
          <div className="text-3xl md:text-5xl font-serif text-foreground mb-8">[Pricing available on request]</div>
          
          <Button size="lg" asChild>
            <Link href="/pricing">View Pricing Details</Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
};
