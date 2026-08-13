'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ImpactMission = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          
          {/* OUR IMPACT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground uppercase tracking-tight mb-4">
              Our Impact
            </h3>
            <div className="w-12 h-[2px] bg-accent mb-6" />
            <p className="text-base md:text-lg text-foreground/80 font-sans leading-relaxed">
              We have helped businesses from diverse industries build stronger visibility, both online and offline, enhance the customer relationships, and increase conversion rates. Our success cannot only be measured by numbers but reflected in meaningful relationships that the brands helped to build with their customers. Creative data-fed insightful strategies that we employ at work not only inspire trust but also augment loyalty.
            </p>
          </motion.div>

          {/* OUR MISSION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground uppercase tracking-tight mb-4">
              Our Mission
            </h3>
            <div className="w-12 h-[2px] bg-accent mb-6" />
            <p className="text-base md:text-lg text-foreground/80 font-sans leading-relaxed">
              To put your brand at the top of your particular industry through a flawless mix of new and old-age tactics regarding innovative digital strategies with traditional marketing methods. We believe that true marketing is beyond merely seeing really prominently. True marketing happens when one has made a connection with the audience such that long-lasting success can unfold. We're among the agencies that do not just make campaigns; we make experiences that provide engagement, inspiration, and conversion.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
