'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const FinalCTA = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section spacing="none" className="bg-background relative overflow-hidden py-32 md:py-48 border-t border-border/20">
      
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[80%] aspect-square bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_transparent_60%)] pointer-events-none blur-3xl z-0" />
      
      {/* Subtle Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-[30%] left-[30%] w-1.5 h-1.5 bg-accent/40 rounded-full blur-[1px]" />
         <div className="absolute bottom-[40%] right-[25%] w-2 h-2 bg-accent/20 rounded-full blur-[1.5px]" />
      </div>

      <motion.div 
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto text-center relative z-10 px-4 sm:px-6"
      >
        <span className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase mb-8 block">
          Let&apos;s Collaborate
        </span>
        
        <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-bold uppercase tracking-tighter text-white mb-8 leading-[0.9]">
          Let&apos;s Build<br />
          <span className="text-accent italic font-normal">in mind?</span>
        </h2>
        
        <p className="text-[16px] md:text-[18px] text-muted mb-12 leading-relaxed max-w-2xl mx-auto font-sans">
          Stop settling for average. It&apos;s time to transform your brand into an industry leader. We&apos;re ready when you are.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto">
          <Button size="lg" asChild className="h-[52px] px-10 rounded-none text-[11px] tracking-widest font-bold bg-accent text-background border-none hover:bg-accent/90 transition-colors flex items-center justify-center">
            <Link href="/contact">
              GET A QUOTE <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="ghost" asChild className="h-[52px] px-10 rounded-none text-[11px] tracking-widest font-bold border border-border hover:border-foreground transition-colors flex items-center justify-center group">
            <Link href="/contact">
              TALK TO US <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
};
