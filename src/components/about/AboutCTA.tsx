'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const AboutCTA = () => {
  return (
    <Section spacing="xl" className="bg-background relative overflow-hidden border-t border-border/20 py-24 md:py-32 lg:py-40 text-center">
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif uppercase tracking-tight text-foreground mb-8">
            Ready to create an <span className="text-accent italic font-light">effect</span>?
          </h2>
          
          <p className="text-lg md:text-xl text-muted font-sans font-light mb-12 max-w-2xl mx-auto">
            Let's build a stronger, more visible, and highly engaging presence for your brand.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
              <Link href="/book">GET A QUOTE</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/work">VIEW OUR WORK</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
