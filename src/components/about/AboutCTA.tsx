'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export const AboutCTA = () => {
  return (
    <Section spacing="none" className="bg-background relative overflow-hidden py-32 md:py-48 lg:py-64 text-center">
      
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/assets/about/cta-bg.jpg"
          alt="Atmospheric Background"
          fill
          className="object-cover opacity-80 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif uppercase tracking-tight text-foreground mb-8">
            Ready to create an <span className="text-accent italic font-light drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">effect</span>?
          </h2>
          
          <p className="text-lg md:text-xl text-muted font-sans font-light mb-12 max-w-2xl mx-auto">
            Let's build a stronger, more visible, and highly engaging presence for your brand.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild variant="default" size="lg" className="w-full sm:w-auto bg-accent text-background hover:bg-accent/90 border-transparent transition-all hover:scale-105 duration-300">
              <Link href="/book">GET A QUOTE</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto hover:border-accent hover:text-accent transition-colors duration-300">
              <Link href="/work">VIEW OUR WORK</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
