'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const AboutCTA = () => {
  return (
    <section className="bg-surface py-16 md:py-24 text-center">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold uppercase tracking-tight text-white mb-6">Let&apos;s build something extraordinary.</h2>
          
          <p className="text-lg md:text-xl text-foreground/80 font-sans leading-relaxed mb-10 max-w-2xl mx-auto">
            Let&apos;s build a stronger, more visible, and highly engaging presence for your brand.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="default" size="lg" className="w-full sm:w-auto bg-accent text-background hover:bg-accent/90 border-transparent transition-all">
              <Link href="/book">GET A QUOTE</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto hover:border-accent hover:text-accent transition-colors">
              <Link href="/work">VIEW OUR WORK</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
