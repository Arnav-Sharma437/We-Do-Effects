'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'Understanding your goals, audience, and challenges.' },
  { num: '02', title: 'STRATEGY', desc: 'Defining the creative and technical roadmap.' },
  { num: '03', title: 'CREATE', desc: 'Executing the design, production, or development.' },
  { num: '04', title: 'LAUNCH', desc: 'Rolling out the solution to the market.' },
  { num: '05', title: 'GROW', desc: 'Monitoring, refining, and scaling the results.' }
];

export const Process = () => {
  return (
    <Section spacing="xl" className="bg-background relative">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
        
        {/* Sticky Header */}
        <div className="lg:w-1/3 lg:sticky lg:top-40">
          <h2 className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-6">Our Approach</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-foreground mb-8 leading-none">
            How we<br />work.
          </h3>
          <p className="text-muted leading-relaxed text-lg">
            We follow a structured methodology that reduces uncertainty and ensures alignment from initial concept to final delivery.
          </p>
        </div>

        {/* Timeline */}
        <div className="lg:w-2/3 flex flex-col w-full relative pt-12">
          {/* Vertical Line */}
          <div className="absolute left-[39px] md:left-[79px] top-0 bottom-0 w-[1px] bg-border" />
          
          {steps.map((step, index) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative flex items-center gap-12 md:gap-24 mb-16 md:mb-20 last:mb-0 group"
            >
              {/* Massive Number */}
              <div className="relative z-10 w-20 md:w-40 flex-shrink-0 bg-background py-4">
                <span className="text-5xl md:text-8xl font-display font-bold text-surface-elevated group-hover:text-accent transition-colors duration-500">
                  {step.num}
                </span>
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-4">
                <h4 className="text-3xl md:text-5xl font-display font-bold text-foreground uppercase tracking-tight">{step.title}</h4>
                <p className="text-muted text-lg leading-relaxed max-w-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
