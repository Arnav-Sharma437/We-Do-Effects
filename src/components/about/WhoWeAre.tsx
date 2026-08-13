'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';

export const WhoWeAre = () => {
  return (
    <Section spacing="lg" className="relative overflow-hidden bg-background border-b border-border/10">
      
      {/* Oversized Background Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none select-none z-0 flex justify-center opacity-[0.02]">
        <h2 className="text-[18vw] font-serif font-bold whitespace-nowrap text-white leading-none tracking-tighter">
          ATTENTION
        </h2>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/3 w-full"
          >
            <div className="text-accent font-sans text-sm font-bold tracking-widest mb-4">
              01
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-tight text-foreground">
              WHO WE ARE?
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-[1px] bg-accent mt-8 opacity-80" 
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="lg:w-2/3 w-full lg:pl-12"
          >
            <p className="text-lg md:text-2xl text-muted font-sans leading-relaxed md:leading-[1.8] font-light">
              "Attention-wise, videos always come first, especially in a digital market filled with short attention spans and an overflow of content. From 15-second spots to TV commercials, the video takes the client's message and turns it into something even more easily remembered, building a great rapport for the brand itself."
            </p>
          </motion.div>

        </div>

      </div>
    </Section>
  );
};
