'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';

export const WhoWeAre = () => {
  return (
    <Section spacing="xl" className="relative overflow-hidden bg-surface">
      
      {/* Oversized Background Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none select-none z-0 flex justify-center opacity-[0.03]">
        <h2 className="text-[15vw] font-serif font-bold whitespace-nowrap text-white leading-none tracking-tighter">
          WHO WE ARE
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-tight text-foreground mb-8">
            WHO WE ARE?
          </h2>
          
          <div className="w-16 h-[1px] bg-accent mb-12 opacity-80" />

          <p className="text-lg md:text-2xl text-muted font-sans leading-relaxed md:leading-[1.8] font-light max-w-3xl">
            "Attention-wise, videos always come first, especially in a digital market filled with short attention spans and an overflow of content. From 15-second spots to TV commercials, the video takes the client's message and turns it into something even more easily remembered, building a great rapport for the brand itself."
          </p>
        </motion.div>

      </div>
    </Section>
  );
};
