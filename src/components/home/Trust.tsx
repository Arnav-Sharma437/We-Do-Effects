'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';

const testimonials = [
  {
    id: 1,
    quote: '[Verified testimonial quote placeholder. This should describe the specific problem solved and the quality of the outcome.]',
    author: '[Client Name]',
    role: '[Client Role / Company]'
  }
];

export const Trust = () => {
  return (
    <Section spacing="xl">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-sm font-medium tracking-[0.2em] text-accent uppercase mb-4">Trust</h2>
        <h3 className="text-4xl md:text-5xl font-serif text-foreground">Why ambitious brands choose us.</h3>
      </div>

      <div className="max-w-4xl mx-auto">
        {testimonials.map((t, index) => (
          <motion.div 
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="text-accent text-6xl font-serif opacity-50 leading-none h-8">"</div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground leading-snug">
              {t.quote}
            </blockquote>
            <div>
              <div className="text-sm font-medium uppercase tracking-widest text-foreground">{t.author}</div>
              <div className="text-sm text-muted mt-1">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Client Logos Placeholder */}
      <div className="mt-24 pt-16 border-t border-border/50">
        <p className="text-center text-xs tracking-widest uppercase text-muted mb-8">Trusted by</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
          {/* Logo Placeholders */}
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-8 w-24 bg-surface-elevated animate-pulse rounded flex items-center justify-center text-[10px] text-muted">LOGO</div>
          ))}
        </div>
      </div>
    </Section>
  );
};
