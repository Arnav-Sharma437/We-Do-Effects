'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { AnimatedSun } from './AnimatedSun';

export const AboutHero = () => {
  return (
    <Section spacing="none" className="relative min-h-[90vh] flex items-center pt-24 pb-12 md:py-32 overflow-hidden border-b border-border/20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-background z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-background opacity-80 z-0" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-10" />
      
      {/* Subtle glowing orb */}
      <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Reusable Animated Motif */}
      <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 z-0 opacity-40">
        <AnimatedSun />
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 md:px-12 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Typographic Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 w-full"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-accent uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-accent" />
              ABOUT WE DO EFFECTS
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif uppercase tracking-tight text-foreground leading-[0.95] mb-6">
              WE DO<br />
              <span className="text-accent italic font-light">EFFECTS</span>
            </h1>
          </motion.div>

          {/* Right Column: Introduction */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="prose prose-invert max-w-xl">
              <p className="text-xl md:text-2xl text-muted font-light leading-relaxed mb-8">
                <span className="text-foreground font-normal">We Do Effects isn't just another digital marketing agency</span>, we are a creative marketing agency it's actually more of a strategic marketing partner for the development of a strong and sustainable brand presence. 
              </p>
              <p className="text-base md:text-lg text-muted/80 leading-relaxed font-sans">
                We help companies to preserve and innovate digital strategies incorporated creatively in advertising themes that blend today's influences with the former traditional marketing approaches. Deep knowledge of constantly shifting realities, a team of passionate experts, and individual solutions that drive growth, visibility enhancement, and meaningful relationships with customers is what the company has to provide.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};
