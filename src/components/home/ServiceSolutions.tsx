'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { services } from '@/data/services';
import { ArrowRight } from 'lucide-react';

export const ServiceSolutions = () => {
  // Group services by category
  const brandDesign = services.filter(s => s.category === 'Brand & Design');
  const digitalGrowth = services.filter(s => s.category === 'Digital Growth');
  const mediaProduction = services.filter(s => s.category === 'Media & Production');

  const ServiceGroup = ({ title, items }: { title: string, items: typeof services }) => (
    <div className="mb-20 last:mb-0">
      <h3 className="text-2xl font-serif text-foreground mb-8 border-b border-border pb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {items.map((service, index) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex flex-col"
          >
            <h4 className="text-lg font-medium text-foreground mb-3">{service.name}</h4>
            <p className="text-sm text-muted mb-6 flex-grow leading-relaxed">
              {service.shortDescription}
            </p>
            <Link 
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent hover:text-foreground transition-colors group w-fit"
            >
              {service.cta}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <Section spacing="xl">
      <div className="max-w-2xl mb-16 md:mb-24">
        <h2 className="text-sm font-medium tracking-[0.2em] text-accent uppercase mb-4">Our Expertise</h2>
        <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Comprehensive solutions for ambitious growth.</h3>
        <p className="text-muted">We combine strategy, design, and execution across three core disciplines to deliver measurable outcomes.</p>
      </div>

      <ServiceGroup title="Brand & Design" items={brandDesign} />
      <ServiceGroup title="Digital Growth" items={digitalGrowth} />
      <ServiceGroup title="Media & Production" items={mediaProduction} />
    </Section>
  );
};
