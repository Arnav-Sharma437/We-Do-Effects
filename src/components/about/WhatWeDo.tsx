'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { ServiceCard } from './ServiceCard';
import { AnimatedSun } from './AnimatedSun';

const services = [
  {
    title: "Social Media Marketing",
    description: "We manage your platforms such as Facebook, Instagram, YouTube, LinkedIn, and TikTok with regard to content creation, as well as interaction with your audience, to bring your online community closer and increase brand loyalty."
  },
  {
    title: "Search Engine Optimization or SEO",
    description: "Enhance the discovery of your brand by improving the ranking of your site on search engines like Google, Yahoo, and Bing through strategic keyword research, content optimization, and link building for more organic traffic and credibility."
  },
  {
    title: "Digital Marketing",
    description: "Such are data-driven, paid campaigns we create on social media platforms like Instagram, Facebook, TikTok, and YouTube to increase reach and targeted traffic. The PPC-c-tpc, or pay-per-click, operates on the principle of Time and Audience – that you should reach the right customer at the right time."
  },
  {
    title: "Advertising Display Screens",
    description: "We install gorgeous digital displays in high-traffic areas such as walls of offices, windows of stores, and even bars of menu boards in restaurants. These dynamic displays engage attention, improve the brand's visibility, and convert customers."
  },
  {
    title: "Content Designing",
    description: "Our creative team does everything from graphic designs to photo and video shoots, editing, and the final output of professional designs for menus, flyers, etc. We shall ensure that your brand's visual identity stands out and stays in memory."
  },
  {
    title: "Traditional Marketing",
    description: "We create a mixture of digital strategies with tested and proven traditional techniques like flyer dropping, radio and TV ads, hoardings, etc., for outreach into the analog space. By this, there will be a comprehensive brand presence across all touchpoint interfaces."
  }
];

export const WhatWeDo = () => {
  return (
    <Section spacing="xl" className="relative overflow-hidden border-t border-border/10 bg-background">
      
      {/* Oversized Background Typography */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full overflow-hidden pointer-events-none select-none z-0 flex justify-center opacity-[0.02]">
        <h2 className="text-[15vw] font-serif font-bold whitespace-nowrap text-white leading-none tracking-tighter">
          WHAT WE DO
        </h2>
      </div>

      {/* Subtle Motif */}
      <div className="absolute -left-[10%] top-[40%] z-0 opacity-20 pointer-events-none">
        <AnimatedSun />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Intro */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-tight text-foreground mb-8"
          >
            WHAT WE DO?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted font-sans font-light leading-relaxed"
          >
            Our services cover all aspects of marketing so that your brand will receive maximum exposure and engagement with audiences on any platform:
          </motion.p>
        </div>

        {/* Services Grid (2 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              index={`0${index + 1}`}
              title={service.title}
              description={service.description}
              delay={index * 0.1} // Staggered reveal
            />
          ))}
        </div>

      </div>
    </Section>
  );
};
