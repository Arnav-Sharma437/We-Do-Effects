'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Use hover index if available, otherwise fallback to the last clicked active index
  const displayIndex = hoverIndex !== null ? hoverIndex : activeIndex;

  return (
    <Section spacing="lg" className="relative overflow-hidden border-t border-border/10 bg-surface">
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Intro */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-accent font-sans text-sm font-bold tracking-widest mb-4">
              02
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-tight text-foreground mb-6">
              WHAT WE DO?
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-foreground/80 font-sans leading-relaxed"
          >
            Our services cover all aspects of marketing so that your brand will receive maximum exposure and engagement with audiences on any platform:
          </motion.p>
        </div>

        {/* DESKTOP: Interactive Split Layout */}
        <div className="hidden lg:flex gap-16 min-h-[600px]">
          
          {/* Left: Service List */}
          <div className="w-1/2 flex flex-col justify-center border-t border-border/20">
            {services.map((service, index) => {
              const isActive = displayIndex === index;
              return (
                <div 
                  key={index}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative flex flex-col py-8 cursor-pointer border-b border-border/20 transition-all duration-500 ease-out ${
                    isActive ? 'bg-surface-elevated/30 pl-8 -ml-8 pr-8' : 'hover:bg-surface-elevated/10'
                  }`}
                >
                  <div className="flex items-start gap-8">
                    <span className={`text-sm font-bold tracking-widest mt-2 transition-colors duration-300 ${
                      isActive ? 'text-accent' : 'text-muted'
                    }`}>
                      0{index + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className={`text-3xl font-serif mb-4 transition-all duration-300 ${
                        isActive ? 'text-accent translate-x-2' : 'text-foreground'
                      }`}>
                        {service.title}
                      </h3>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-foreground/80 font-sans leading-relaxed mb-6 pr-8">
                              {service.description}
                            </p>
                            <Link 
                              href="/services"
                              className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors"
                            >
                              READ MORE 
                              <ArrowRight className="w-3.5 h-3.5 translate-x-2 transition-transform duration-300" />
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Image Viewer */}
          <div className="w-1/2 relative">
            <div className="sticky top-24 lg:top-32 w-full h-[60vh] max-h-[600px] overflow-hidden border border-border/20 bg-background rounded-lg shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={services[displayIndex].image}
                    alt={services[displayIndex].title}
                    fill
                    className="object-cover object-center"
                  />
                  {/* Subtle vignette/overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET: Accordion / Cards Layout */}
        <div className="flex lg:hidden flex-col gap-6">
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index} 
                className="border border-border/20 bg-background overflow-hidden"
              >
                <button
                  onClick={() => setActiveIndex(isActive ? -1 : index)}
                  className="w-full text-left p-6 flex items-center justify-between bg-surface-elevated/10"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-accent text-sm font-bold">0{index + 1}</span>
                    <h3 className="text-xl font-serif text-foreground">{service.title}</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-border/10">
                        <div className="relative w-full aspect-video mb-6 mt-6 overflow-hidden">
                          <Image 
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-muted font-light leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <Link 
                          href="/services"
                          className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent"
                        >
                          READ MORE <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </Section>
  );
};
