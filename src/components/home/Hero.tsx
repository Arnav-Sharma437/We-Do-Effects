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
    <Section spacing="none" className="min-h-[85vh] flex flex-col justify-center relative bg-background">
      <div className="mx-auto w-[92vw] max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 relative pt-16 pb-16">
        
        {/* LEFT COLUMN: Typography */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start relative z-20"
        >
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-accent mb-6 block">
            Studio We Do Effects
          </span>

          <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-serif uppercase font-bold leading-[1.05] tracking-tight text-foreground mb-6">
            Nurtures <span className="text-accent italic font-normal">&amp;</span><br />
            Elevates<br />
            Your Brand
          </h1>
          
          <p className="text-[18px] md:text-[22px] font-serif text-accent italic mb-8">
            Just as sunlight helps a plant grow.
          </p>
          
          <p className="text-[15px] text-muted max-w-[400px] leading-relaxed mb-10 font-sans">
            We combine strategic design, digital growth, and media production to deliver measurable impact for ambitious brands.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" asChild className="h-12 px-8 rounded-none text-[11px] tracking-widest font-bold bg-accent text-background border-none hover:bg-accent/90 transition-colors flex items-center justify-center">
              <Link href="/services">
                EXPLORE SERVICES <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="h-12 px-8 rounded-none text-[11px] tracking-widest font-bold border border-border hover:border-foreground transition-colors flex items-center justify-center group">
              <Link href="/work">
                VIEW OUR WORK <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Visual Anchor */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative w-full h-full min-h-[40vh] md:min-h-[50vh] flex items-center justify-center lg:justify-end"
        >
          {/* Subtle Glow Behind Image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_transparent_60%)] pointer-events-none blur-3xl z-0" />
          
          {/* Faint Particles */}
          <div className="absolute inset-0 pointer-events-none z-0">
             <div className="absolute top-[25%] left-[20%] w-1.5 h-1.5 bg-accent/60 rounded-full blur-[1px]" />
             <div className="absolute bottom-[20%] left-[45%] w-1 h-1 bg-accent/40 rounded-full blur-[0.5px]" />
             <div className="absolute top-[60%] right-[10%] w-1.5 h-1.5 bg-accent/50 rounded-full blur-[1px]" />
          </div>

          <div className="relative w-full max-w-[650px] aspect-square flex items-center justify-center z-10 lg:pl-12">
            <img 
               src="/assets/wde_1/wde_1.gif" 
               alt="We Do Effects" 
               className="w-full h-full object-contain relative z-10 drop-shadow-xl"
               loading="eager"
            />
          </div>
        </motion.div>
        
      </div>
    </Section>
  );
};
