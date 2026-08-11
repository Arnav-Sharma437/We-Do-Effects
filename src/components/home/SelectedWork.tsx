'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

// Temporary structured placeholder data reflecting the exact requirement:
// SERVICE → PROJECT → RESULT → TESTIMONIAL → CTA
const featuredWork = [
  {
    id: 'project-1',
    client: '[Project / Client Name]',
    service: 'Branding & Website Design',
    context: '[Brief challenge/context placeholder]',
    result: '[Verified outcome placeholder]',
    imagePlaceholder: 'Project Alpha'
  },
  {
    id: 'project-2',
    client: '[Project / Client Name]',
    service: 'Video Production',
    context: '[Brief challenge/context placeholder]',
    result: '[Verified outcome placeholder]',
    imagePlaceholder: 'Project Beta'
  }
];

export const SelectedWork = () => {
  return (
    <Section spacing="xl" className="bg-surface-elevated">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
        <div className="max-w-xl">
          <h2 className="text-sm font-medium tracking-[0.2em] text-accent uppercase mb-4">Selected Work</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-foreground">Proof in execution.</h3>
        </div>
        <Button variant="outline" asChild className="hidden md:inline-flex">
          <Link href="/work">View All Cases</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-16 md:gap-32">
        {featuredWork.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
          >
            {/* Image Placeholder */}
            <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-[16/10] bg-surface border border-border flex items-center justify-center overflow-hidden relative group">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <div className="text-muted tracking-widest uppercase text-xs animate-pulse">
                [IMAGE: {project.imagePlaceholder}]
              </div>
            </div>

            {/* Project Content */}
            <div className="w-full md:w-2/5 flex flex-col gap-6">
              <div>
                <span className="text-xs font-medium tracking-[0.2em] text-accent uppercase block mb-3">{project.service}</span>
                <h4 className="text-3xl font-serif text-foreground mb-4">{project.client}</h4>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  <span className="font-medium text-foreground/80">Challenge:</span> {project.context}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  <span className="font-medium text-foreground/80">Result:</span> {project.result}
                </p>
              </div>
              
              <div className="pt-6 border-t border-border/50">
                <Link 
                  href={`/work/${project.id}`}
                  className="inline-flex items-center text-xs font-medium uppercase tracking-widest text-foreground hover:text-accent transition-colors"
                >
                  View Case Study
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 md:hidden">
        <Button variant="outline" asChild className="w-full">
          <Link href="/work">View All Cases</Link>
        </Button>
      </div>
    </Section>
  );
};
