'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section spacing="none" className="min-h-[90vh] flex flex-col justify-center relative overflow-hidden bg-background">
      {/* Art-directed background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface via-background to-background pointer-events-none opacity-40" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      {/* Noise overlay for premium feel */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 relative pt-20 max-w-7xl mx-auto w-full px-6 md:px-12">
        
        {/* Typographic Core */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start gap-8 relative z-20"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-display uppercase font-bold leading-[0.85] text-foreground tracking-tighter mix-blend-difference">
              Nurtures<br />& Elevates<br />Your Brand
            </h1>
            <p className="text-xl md:text-2xl font-serif text-accent italic mt-6">
              Just as sunlight helps a plant grow.
            </p>
          </div>
          
          <p className="text-sm md:text-base text-muted max-w-md leading-relaxed mt-2">
            We are a premium creative agency combining strategic design, digital growth, and high-end media production to deliver measurable impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-6">
            <Button size="lg" asChild className="h-14 px-10 text-xs tracking-[0.2em] font-bold bg-accent text-background border-none hover:bg-accent/90 transition-colors">
              <Link href="/services">EXPLORE SERVICES</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="h-14 px-10 text-xs tracking-[0.2em] font-bold border border-border hover:bg-surface transition-colors">
              <Link href="/work">VIEW OUR WORK</Link>
            </Button>
          </div>
        </motion.div>

        {/* Major Brand Visual (GIF) */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full max-w-[600px] aspect-square mx-auto lg:scale-125 lg:-ml-8 lg:mt-0 mt-12 z-10 flex items-center justify-center pointer-events-none"
        >
           <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_0_80px_rgba(212,175,55,0.15)]">
             <img 
                src="/assets/wde_1/wde_1.gif" 
                alt="" 
                className="w-full h-full object-contain relative z-10"
                loading="eager"
             />
           </div>
        </motion.div>
      </div>
    </Section>
  );
};
