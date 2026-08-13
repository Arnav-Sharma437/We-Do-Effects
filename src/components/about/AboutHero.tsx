'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const AboutHero = () => {
  return (
    <section className="bg-background pt-32 pb-16 md:pt-48 md:pb-24">
      <div className="max-w-[1200px] w-full mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-accent" />
              ABOUT US
            </span>
            <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-tight text-foreground leading-[1.1] mb-6">
              We Do <span className="text-accent italic">Effects</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-sans font-light leading-relaxed">
              We are a creative marketing agency and strategic partner dedicated to the development of a strong, sustainable brand presence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/20 shadow-2xl"
          >
            <Image 
              src="/assets/about/hero.jpg"
              alt="We Do Effects Studio"
              fill
              priority
              className="object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
