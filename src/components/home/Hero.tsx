'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section spacing="none" className="min-h-[90vh] flex flex-col justify-center relative overflow-hidden bg-background">
      
      {/* Cinematic Atmosphere (Global) */}
      <div className="absolute inset-0 bg-background pointer-events-none z-0" />

      <div className="mx-auto w-[94vw] max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 relative pt-16 pb-12">
        
        {/* LEFT COLUMN: Typography (Approx 42-45%) */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-start relative z-20"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent mb-6 md:mb-8 block">
            Studio We Do Effects
          </span>

          <h1 className="text-[clamp(42px,5vw,86px)] font-serif uppercase font-bold leading-[0.9] tracking-tight text-foreground mix-blend-screen mb-6">
            Nurtures <span className="text-accent italic font-light">&</span><br />Elevates<br />Your Brand
          </h1>
          
          <p className="text-[20px] md:text-[24px] font-serif text-accent italic mb-8">
            Just as sunlight helps a plant grow.
          </p>
          
          <p className="text-sm md:text-base text-muted max-w-[380px] leading-relaxed mb-12 font-sans">
            We combine strategic design, digital growth, and media production to deliver measurable impact for ambitious brands.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Button size="lg" asChild className="h-[52px] px-8 rounded-none text-[11px] tracking-[0.2em] font-bold bg-accent text-background border-none hover:bg-accent/90 transition-colors flex items-center justify-center">
              <Link href="/services">
                EXPLORE SERVICES <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="h-[52px] px-8 rounded-none text-[11px] tracking-[0.2em] font-bold border border-foreground/30 hover:border-foreground transition-colors flex items-center justify-center group">
              <Link href="/work">
                VIEW OUR WORK <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Visual Anchor (Approx 55-58%) */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative w-full h-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center lg:justify-end"
        >
          {/* Cinematic Atmosphere for GIF */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.15)_0%,_transparent_50%)] pointer-events-none z-0 mix-blend-screen" />
          
          {/* Subtle Rays / Light bursts CSS effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square pointer-events-none z-0 opacity-20" 
               style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(212,175,55,0.2) 10deg, transparent 20deg, rgba(212,175,55,0.1) 40deg, transparent 50deg, rgba(212,175,55,0.3) 70deg, transparent 80deg)' }} />

          {/* Subtle Particles */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
             <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-accent/60 rounded-full blur-[1px]" />
             <div className="absolute top-[60%] right-[20%] w-2 h-2 bg-accent/30 rounded-full blur-[2px]" />
             <div className="absolute bottom-[30%] left-[40%] w-1 h-1 bg-accent/80 rounded-full blur-[0.5px]" />
          </div>

          <div className="relative w-full max-w-[800px] aspect-square flex items-center justify-center z-10">
            <img 
               src="/assets/wde_1/wde_1.gif" 
               alt="We Do Effects Brand Animation" 
               className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_80px_rgba(212,175,55,0.15)] mix-blend-screen"
               loading="eager"
            />
          </div>
        </motion.div>
        
      </div>
    </Section>
  );
};
