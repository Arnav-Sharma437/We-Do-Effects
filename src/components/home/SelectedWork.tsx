'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { ArrowRight } from 'lucide-react';

const featuredWork = [
  {
    id: 'project-1',
    client: '[Project Alpha]',
    service: 'Branding & Web Design',
    context: '[Brief challenge/context placeholder]',
  },
  {
    id: 'project-2',
    client: '[Project Beta]',
    service: 'Video Production',
    context: '[Brief challenge/context placeholder]',
  }
];

export const SelectedWork = () => {
  return (
    <Section spacing="xl" className="bg-surface relative overflow-hidden">
      <div className="flex flex-col items-start mb-24 md:mb-32">
        <h2 className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-6">Selected Work</h2>
        <h3 className="text-6xl md:text-[8rem] font-display font-bold uppercase tracking-tighter text-foreground leading-none">
          Proof In<br />Execution
        </h3>
      </div>

      <div className="flex flex-col gap-24 md:gap-48">
        {featuredWork.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1 }}
            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
          >
            {/* Massive Image Placeholder */}
            <div className="w-full md:w-[65%] aspect-[4/5] md:aspect-video bg-background relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-surface-elevated to-surface flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                <div className="text-border font-display text-4xl md:text-8xl font-bold uppercase tracking-tighter rotate-[-10deg] opacity-20">
                  {project.id}
                </div>
              </div>
              {/* Overlay for interaction */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                <div className="bg-accent text-background text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  View Project
                </div>
              </div>
            </div>

            {/* Project Context */}
            <div className={`w-full md:w-[35%] flex flex-col ${index % 2 === 1 ? 'md:items-end md:text-right' : 'md:items-start text-left'}`}>
              <div className="w-12 h-1 bg-accent mb-8" />
              <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase block mb-4">{project.service}</span>
              <h4 className="text-4xl md:text-5xl font-display font-bold uppercase text-foreground mb-6 leading-none tracking-tight">{project.client}</h4>
              {/* Keeping structural readiness without exposing fake results */}
              <p className="text-muted text-sm leading-relaxed mb-8 max-w-sm">
                A brief overview of the challenge and strategy will be inserted here when verified project data is supplied.
              </p>
              <Link 
                href={`/work/${project.id}`}
                className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-foreground hover:text-accent transition-colors group"
              >
                <span>Read Case Study</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${index % 2 === 1 ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 text-center">
        <Link 
          href="/work"
          className="inline-block text-2xl md:text-4xl font-serif text-foreground hover:text-accent transition-colors border-b border-accent pb-2"
        >
          View all our selected work.
        </Link>
      </div>
    </Section>
  );
};
