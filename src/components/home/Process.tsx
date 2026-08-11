'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';

const steps = [
  { num: '01', title: 'Discover', desc: 'Understanding your goals, audience, and challenges.' },
  { num: '02', title: 'Strategy', desc: 'Defining the creative and technical roadmap.' },
  { num: '03', title: 'Create', desc: 'Executing the design, production, or development.' },
  { num: '04', title: 'Launch', desc: 'Rolling out the solution to the market.' },
  { num: '05', title: 'Grow', desc: 'Monitoring, refining, and scaling the results.' }
];

export const Process = () => {
  return (
    <Section spacing="xl">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        <div className="md:w-1/3">
          <div className="sticky top-32">
            <h2 className="text-sm font-medium tracking-[0.2em] text-accent uppercase mb-4">Our Approach</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6">How we work together.</h3>
            <p className="text-muted leading-relaxed">
              We follow a structured methodology that reduces uncertainty and ensures alignment from initial concept to final delivery.
            </p>
          </div>
        </div>

        <div className="md:w-2/3 flex flex-col gap-0 border-l border-border/50 pl-8 md:pl-16 relative">
          {steps.map((step, index) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="py-12 first:pt-0 last:pb-0 relative group"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-33px] md:left-[-65px] top-12 first:top-0 w-2 h-2 rounded-full bg-border group-hover:bg-accent transition-colors" />
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8">
                <span className="text-2xl font-serif text-muted/50 group-hover:text-accent transition-colors">{step.num}</span>
                <div>
                  <h4 className="text-2xl font-serif text-foreground mb-3">{step.title}</h4>
                  <p className="text-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
