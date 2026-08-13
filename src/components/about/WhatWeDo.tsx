'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    title: "Social Media Marketing",
    description: "We manage your platforms such as Facebook, Instagram, YouTube, LinkedIn, and TikTok with regard to content creation, as well as interaction with your audience, to bring your online community closer and increase brand loyalty.",
    image: "/assets/about/service-social.jpg"
  },
  {
    title: "Search Engine Optimization or SEO",
    description: "Enhance the discovery of your brand by improving the ranking of your site on search engines like Google, Yahoo, and Bing through strategic keyword research, content optimization, and link building for more organic traffic and credibility.",
    image: "/assets/about/service-seo.jpg"
  },
  {
    title: "Digital Marketing",
    description: "Such are data-driven, paid campaigns we create on social media platforms like Instagram, Facebook, TikTok, and YouTube to increase reach and targeted traffic. The PPC-c-tpc, or pay-per-click, operates on the principle of Time and Audience – that you should reach the right customer at the right time.",
    image: "/assets/about/service-digital.jpg"
  },
  {
    title: "Advertising Display Screens",
    description: "We install gorgeous digital displays in high-traffic areas such as walls of offices, windows of stores, and even bars of menu boards in restaurants. These dynamic displays engage attention, improve the brand's visibility, and convert customers.",
    image: "/assets/about/service-screens.jpg"
  },
  {
    title: "Content Designing",
    description: "Our creative team does everything from graphic designs to photo and video shoots, editing, and the final output of professional designs for menus, flyers, etc. We shall ensure that your brand's visual identity stands out and stays in memory.",
    image: "/assets/about/service-content.jpg"
  },
  {
    title: "Traditional Marketing",
    description: "We create a mixture of digital strategies with tested and proven traditional techniques like flyer dropping, radio and TV ads, hoardings, etc., for outreach into the analog space. By this, there will be a comprehensive brand presence across all touchpoint interfaces.",
    image: "/assets/about/service-traditional.jpg"
  }
];

export const WhatWeDo = () => {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-tight text-foreground mb-4">
              What We Do
            </h2>
            <div className="w-12 h-[2px] bg-accent mb-6" />
            <p className="text-lg text-foreground/80 font-sans max-w-2xl">
              Our services cover all aspects of marketing so that your brand will receive maximum exposure and engagement with audiences on any platform.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col bg-background border border-border/20 rounded-lg overflow-hidden group"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <Image 
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-serif text-foreground font-bold mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-foreground/70 font-sans leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
