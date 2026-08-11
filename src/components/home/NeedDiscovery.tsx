'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { ArrowRight } from 'lucide-react';

const needs = [
  {
    id: 'brand',
    title: 'Build My Brand',
    description: 'Establish a distinctive identity and strong visual presence.',
    services: ['Branding', 'Graphic Design', 'Website Design'],
    href: '/services#brand-and-design'
  },
  {
    id: 'grow',
    title: 'Grow My Business',
    description: 'Increase visibility, traffic, and sustainable revenue.',
    services: ['Digital Marketing', 'SEO', 'Social Media'],
    href: '/services#digital-growth'
  },
  {
    id: 'content',
    title: 'Create Content',
    description: 'Tell your story through high-end cinematic production.',
    services: ['Video', 'Music Video', 'Audio', 'Radio / TV'],
    href: '/services#media-and-production'
  }
];

export const NeedDiscovery = () => {
  return (
    <Section spacing="lg" className="bg-surface border-y border-border">
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-sm font-medium tracking-[0.2em] text-accent uppercase mb-4">Start Here</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-foreground">What are you trying to achieve?</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {needs.map((need, index) => (
          <motion.div 
            key={need.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link 
              href={need.href}
              className="group flex flex-col h-full border border-border bg-background p-8 lg:p-10 transition-colors hover:border-foreground"
            >
              <h4 className="text-2xl font-serif text-foreground mb-4 group-hover:text-accent transition-colors">
                {need.title}
              </h4>
              <p className="text-muted text-sm mb-12 leading-relaxed flex-grow">
                {need.description}
              </p>
              
              <div className="space-y-3 mb-12">
                {need.services.map(service => (
                  <div key={service} className="text-xs tracking-widest uppercase text-foreground/70 border-b border-border/50 pb-2">
                    {service}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-foreground mt-auto">
                <span>View Solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
