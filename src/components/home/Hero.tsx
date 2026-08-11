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
      
      {/* Cinematic Atmosphere (Global) */}
      <div className="absolute inset-0 bg-background pointer-events-none z-0" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="mx-auto max-w-7xl w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 relative pt-24 pb-12">
        
        {/* LEFT COLUMN: Typography (Approx 45%) */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-start relative z-20"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-muted mb-6 md:mb-8 block">
            Studio We Do Effects
          </span>

          <h1 className="text-[3rem] sm:text-[4rem] md:text-[4.5rem] lg:text-[5rem] font-serif uppercase font-bold leading-[0.9] tracking-tight text-foreground mix-blend-screen mb-6">
            Nurtures &<br />Elevates<br />Your Brand
          </h1>
          
          <p className="text-lg md:text-xl font-serif text-accent italic mb-8">
            Just as sunlight helps a plant grow.
          </p>
          
          <p className="text-sm md:text-base text-muted max-w-[340px] leading-relaxed mb-10 font-sans">
            We combine strategic design, digital growth, and media production to deliver measurable impact for ambitious brands.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" asChild className="h-12 px-8 text-[10px] tracking-[0.2em] font-bold bg-accent text-background border-none hover:bg-accent/90 transition-colors">
              <Link href="/services">EXPLORE SERVICES</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="h-12 px-8 text-[10px] tracking-[0.2em] font-bold border border-border/60 hover:bg-surface hover:border-border transition-colors">
              <Link href="/work">VIEW OUR WORK</Link>
            </Button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Visual Anchor (Approx 55%) */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative w-full h-full min-h-[40vh] md:min-h-[50vh] flex items-center justify-center lg:justify-end"
        >
          {/* Cinematic Atmosphere for GIF */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_transparent_60%)] pointer-events-none z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_50%)] pointer-events-none blur-2xl z-0" />
          
          {/* Subtle Particles */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
             <div className="absolute top-[20%] left-[30%] w-1 h-1 bg-accent/40 rounded-full blur-[1px]" />
             <div className="absolute top-[60%] right-[20%] w-2 h-2 bg-accent/20 rounded-full blur-[2px]" />
             <div className="absolute bottom-[30%] left-[40%] w-1.5 h-1.5 bg-foreground/30 rounded-full blur-[1px]" />
          </div>

          <div className="relative w-full max-w-[700px] aspect-square flex items-center justify-center z-10 lg:scale-110 lg:translate-x-8">
            <img 
               src="/assets/wde_1/wde_1.gif" 
               alt="" 
               className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_60px_rgba(212,175,55,0.1)] mix-blend-screen"
               loading="eager"
            />
          </div>
        </motion.div>
        
      </div>
    </Section>
  );
};
