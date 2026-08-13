'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import Image from 'next/image';

export const AboutHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <Section spacing="none" className="relative min-h-screen flex items-center pt-24 pb-12 md:py-32 overflow-hidden border-b border-border/20 bg-background" ref={ref}>
      
      {/* Cinematic Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <Image 
          src="/assets/about/hero.jpg"
          alt="Creative Marketing Studio"
          fill
          priority
          className="object-cover object-center opacity-40 mix-blend-luminosity"
        />
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </motion.div>
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-10" />

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 md:px-12 relative z-20">
        <div className="flex flex-col max-w-3xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-accent uppercase mb-8 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-accent" />
              ABOUT WE DO EFFECTS
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-serif uppercase tracking-tight text-foreground leading-[0.9] mb-8">
              WE DO<br />
              <span className="text-accent italic font-light">EFFECTS</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-xl md:text-3xl font-serif text-muted/90 leading-relaxed font-light">
              Creative thinking.<br />
              Strategic execution.<br />
              Measurable presence.
            </p>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};
