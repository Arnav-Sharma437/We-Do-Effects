'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { ArrowRight } from 'lucide-react';

const needs = [
  {
    id: 'brand',
    title: 'BUILD MY BRAND',
    description: 'Establish a distinctive identity and strong visual presence.',
    services: ['Branding', 'Graphic Design', 'Website Design'],
    href: '/services#brand-and-design',
    bg: 'bg-surface hover:bg-surface-elevated'
  },
  {
    id: 'grow',
    title: 'GROW MY BUSINESS',
    description: 'Increase visibility, traffic, and sustainable revenue.',
    services: ['Digital Marketing', 'SEO', 'Social Media'],
    href: '/services#digital-growth',
    bg: 'bg-surface hover:bg-surface-elevated'
  },
  {
    id: 'content',
    title: 'CREATE CONTENT',
    description: 'Tell your story through high-end cinematic production.',
    services: ['Video', 'Music Video', 'Audio', 'Radio / TV'],
    href: '/services#media-and-production',
    bg: 'bg-surface hover:bg-surface-elevated'
  }
];

export const NeedDiscovery = () => {
  return (
    <Section spacing="xl" className="bg-background relative">
      <div className="mb-20 flex flex-col items-center text-center">
        <h2 className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-6">Start Here</h2>
        <h3 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-foreground max-w-3xl leading-[0.9]">
          What are you trying to achieve?
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
        {needs.map((need, index) => (
          <motion.div 
            key={need.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <Link 
              href={need.href}
              className={`group flex flex-col h-[500px] border border-border/50 p-10 lg:p-12 transition-all duration-500 ${need.bg} relative overflow-hidden`}
            >
              {/* Subtle numeric indicator */}
              <div className="absolute top-10 right-10 text-6xl font-display font-bold text-background opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10">
                0{index + 1}
              </div>

              <h4 className="text-4xl font-display font-bold text-foreground mb-6 uppercase tracking-tight group-hover:text-accent transition-colors duration-300">
                {need.title}
              </h4>
              <p className="text-muted text-base mb-12 leading-relaxed max-w-xs relative z-10">
                {need.description}
              </p>
              
              <div className="space-y-4 mb-auto relative z-10">
                {need.services.map(service => (
                  <div key={service} className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/60 flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-accent/50" />
                    {service}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground mt-12 relative z-10">
                <span className="group-hover:text-accent transition-colors">View Solutions</span>
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-background transition-all">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
