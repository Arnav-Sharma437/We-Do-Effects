'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

export const Hero = () => {
  return (
    <Section spacing="xl" className="min-h-[85vh] flex flex-col justify-center relative overflow-hidden">
      {/* Background ambient glow - very subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] text-foreground tracking-tight">
            Creative vision.<br />
            <span className="text-muted italic">Measurable impact.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted max-w-lg leading-relaxed">
            We help ambitious brands grow through strategic design, digital marketing, and high-end media production.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/work">View Our Work</Link>
            </Button>
          </div>
        </motion.div>

        {/* Hero Asset: GIF Logo Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center border border-border bg-surface-elevated overflow-hidden"
        >
           <div className="text-center">
             <div className="text-accent animate-pulse font-serif text-2xl mb-2">GIF ASSET HERE</div>
             <p className="text-xs text-muted uppercase tracking-widest">/public/assets/logo.gif</p>
           </div>
        </motion.div>
      </div>
    </Section>
  );
};
