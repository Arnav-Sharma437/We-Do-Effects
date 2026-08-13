'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { AnimatedSun } from './AnimatedSun';

export const IntroSplit = () => {
  return (
    <Section spacing="lg" className="bg-surface relative overflow-hidden border-b border-border/10">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />
      
      {/* Sun Motif */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 opacity-20 pointer-events-none z-0">
        <AnimatedSun />
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: Oversized Typography */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 w-full flex justify-center lg:justify-start"
          >
            <h2 className="text-[12vw] lg:text-[8rem] font-serif font-bold uppercase leading-[0.85] tracking-tighter text-foreground/10 text-center lg:text-left">
              WE<br />
              DO<br />
              EFFECTS
            </h2>
          </motion.div>

          {/* Divider Line */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "100%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block w-[1px] bg-gradient-to-b from-transparent via-accent/50 to-transparent min-h-[300px]"
          />

          {/* Right: Intro Paragraph */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="prose prose-invert max-w-xl">
              <p className="text-xl md:text-2xl text-muted font-light leading-relaxed mb-6">
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
