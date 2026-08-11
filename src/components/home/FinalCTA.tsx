'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

export const FinalCTA = () => {
  return (
    <Section spacing="xl" className="bg-surface-elevated relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Have a project in mind?</h2>
        <p className="text-lg md:text-xl text-muted mb-10 leading-relaxed">
          Tell us what you're trying to achieve. We'll help you define the next steps, timeline, and investment required to make it happen.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Talk to Us</Link>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
};
