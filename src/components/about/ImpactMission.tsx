'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';

export const ImpactMission = () => {
  return (
    <Section spacing="xl" className="bg-surface relative overflow-hidden border-t border-border/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* OUR IMPACT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative bg-background border border-border/20 p-8 md:p-16 lg:p-20 overflow-hidden group hover:border-accent/40 transition-colors duration-500"
          >
            {/* Background Typography */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none select-none z-0">
              <span className="text-8xl md:text-[12rem] font-serif font-bold text-white leading-none">
                01
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none overflow-hidden z-0">
              <span className="text-[20vw] lg:text-[15vw] font-serif font-bold text-white group-hover:scale-105 transition-transform duration-1000 ease-out">
                IMPACT
              </span>
            </div>

            <div className="relative z-10 group-hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-accent" />
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground uppercase tracking-tight">
                  Our Impact
                </h3>
              </div>
              <p className="text-base md:text-lg text-muted font-sans font-light leading-relaxed md:leading-[1.8]">
                We have helped businesses from diverse industries build stronger visibility, both online and offline, enhance the customer relationships, and increase conversion rates. Our success cannot only be measured by numbers but reflected in meaningful relationships that the brands helped to build with their customers. Creative data-fed insightful strategies that we employ at work not only inspire trust but also augment loyalty.
              </p>
            </div>
          </motion.div>

          {/* OUR MISSION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative bg-background border border-border/20 p-8 md:p-16 lg:p-20 overflow-hidden group hover:border-accent/40 transition-colors duration-500"
          >
            {/* Background Typography */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none select-none z-0">
              <span className="text-8xl md:text-[12rem] font-serif font-bold text-white leading-none">
                02
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none overflow-hidden z-0">
              <span className="text-[20vw] lg:text-[15vw] font-serif font-bold text-white group-hover:scale-105 transition-transform duration-1000 ease-out">
                MISSION
              </span>
            </div>

            <div className="relative z-10 group-hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-accent" />
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground uppercase tracking-tight">
                  Our Mission
                </h3>
              </div>
              <p className="text-base md:text-lg text-muted font-sans font-light leading-relaxed md:leading-[1.8]">
                To put your brand at the top of your particular industry through a flawless mix of new and old-age tactics regarding innovative digital strategies with traditional marketing methods. We believe that true marketing is beyond merely seeing really prominently. True marketing happens when one has made a connection with the audience such that long-lasting success can unfold. We're among the agencies that do not just make campaigns; we make experiences that provide engagement, inspiration, and conversion. Be it an upstart finding its space in the industry or an established brand within the industry trying to spread its wings a little further, we are here with you every step of the way.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};
