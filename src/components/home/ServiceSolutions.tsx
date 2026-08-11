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
    <div className="mb-32 last:mb-0 relative">
      {/* Refined Ghost Typography - Accessible and intentional */}
      <div 
        aria-hidden="true" 
        className="absolute -top-16 lg:-top-24 left-0 text-[6rem] md:text-[10rem] lg:text-[14rem] font-display font-bold text-foreground opacity-[0.03] select-none pointer-events-none leading-none tracking-tighter uppercase whitespace-nowrap overflow-hidden w-full z-0"
      >
        {title}
      </div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start pt-8">
        <div className="lg:col-span-4 border-t border-accent pt-6">
          <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-4">0{index + 1}</span>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground uppercase tracking-tight">{title}</h3>
        </div>
        
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {items.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : idx * 0.1 }}
              className="group flex flex-col h-full"
            >
              <h4 className="text-2xl font-serif text-foreground mb-4 group-hover:text-accent transition-colors">{service.name}</h4>
              <p className="text-muted mb-8 leading-relaxed text-sm flex-grow">
                {service.shortDescription}
              </p>
              <Link 
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-foreground hover:text-accent transition-colors mt-auto w-fit"
              >
                {service.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Section spacing="xl" className="bg-background overflow-hidden">
      <div className="max-w-4xl mb-32 relative z-10">
        <h2 className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-6">Our Expertise</h2>
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase text-foreground leading-[1.05] tracking-tight mb-8">
          Comprehensive solutions for ambitious growth.
        </h3>
      </div>

      <ServiceGroup index={0} title="Brand & Design" items={brandDesign} />
      <ServiceGroup index={1} title="Digital Growth" items={digitalGrowth} />
      <ServiceGroup index={2} title="Media & Production" items={mediaProduction} />
    </Section>
  );
};
