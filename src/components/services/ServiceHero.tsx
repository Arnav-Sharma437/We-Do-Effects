'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ServiceHeroProps {
  title: string;
  imageSrc?: string;
}

export const ServiceHero = ({ title, imageSrc }: ServiceHeroProps) => {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-surface-elevated">
      {/* Background Image */}
      {imageSrc && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={imageSrc}
            alt={title}
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>
      )}
      
      {/* Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 mt-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif uppercase tracking-tight text-foreground font-bold shadow-black drop-shadow-lg"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
};
