'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { services } from '@/data/services';
import { ArrowRight } from 'lucide-react';

export const ServiceSolutions = () => {
  const prefersReducedMotion = useReducedMotion();
  const brandDesign = services.filter(s => s.category === 'Brand & Design');
  const digitalGrowth = services.filter(s => s.category === 'Digital Growth');
  const mediaProduction = services.filter(s => s.category === 'Media & Production');

  const ServiceGroup = ({ title, items, index }: { title: string, items: typeof services, index: number }) => (
    <div className="mb-32 md:mb-48 last:mb-0 relative">
      {/* Refined Ghost Typography - Pushed to the right and made extremely subtle */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-[15%] text-[8rem] lg:text-[14rem] font-display font-bold text-foreground opacity-[0.04] select-none pointer-events-none leading-[0.8] tracking-tighter uppercase whitespace-nowrap overflow-hidden w-full text-right z-0 mix-blend-overlay"
      >
        {title}
      </div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        {/* Category Header */}
        <div className="lg:col-span-4 lg:sticky lg:top-32">
          <span className="text-sm font-bold tracking-[0.2em] text-accent uppercase block mb-6">0{index + 1}</span>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground uppercase tracking-tight leading-[1.05] max-w-[280px]">
            {title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word === '&' ? <span className="text-accent italic font-normal">&amp;</span> : word}
                <br />
              </React.Fragment>
            ))}
          </h3>
        </div>
        
        {/* Services List */}
        <div className="lg:col-span-8 flex flex-col mt-8 lg:mt-0">
          <div className="border-t border-border/40 w-full" />
          {items.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : idx * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 border-b border-border/40 relative hover:bg-surface/30 transition-colors px-4 -mx-4 sm:px-6 sm:-mx-6 rounded-sm"
            >
              <div className="md:w-[45%] mb-4 md:mb-0">
                <h4 className="text-2xl md:text-3xl font-serif text-foreground group-hover:text-accent group-hover:translate-x-2 transition-all duration-300">
                  {service.name}
                </h4>
              </div>
              <div className="md:w-[55%] flex flex-col md:items-start md:pl-8">
                <p className="text-muted leading-relaxed text-[15px] mb-6">
                  {service.shortDescription}
                </p>
                <Link 
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-foreground group-hover:text-accent transition-colors"
                >
                  Explore {service.name}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Section spacing="xl" className="bg-background overflow-hidden relative">
      <div className="max-w-4xl mb-32 relative z-10 px-4 sm:px-0">
        <h2 className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-6">Our Expertise</h2>
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase text-foreground leading-[1.05] tracking-tight mb-8 max-w-[800px]">
          Comprehensive solutions for ambitious growth.
        </h3>
      </div>

      <div className="px-4 sm:px-0">
        <ServiceGroup index={0} title="Brand & Design" items={brandDesign} />
        <ServiceGroup index={1} title="Digital Growth" items={digitalGrowth} />
        <ServiceGroup index={2} title="Media & Production" items={mediaProduction} />
      </div>
    </Section>
  );
};
