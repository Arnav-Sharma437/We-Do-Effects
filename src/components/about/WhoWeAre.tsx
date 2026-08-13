'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const WhoWeAre = () => {
  return (
    <section className="bg-background pb-16 md:pb-24">
      <div className="max-w-[1200px] w-full mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-tight text-foreground">
              Who We Are
            </h2>
            <div className="w-12 h-[2px] bg-accent mt-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-2/3"
          >
            <p className="text-lg md:text-xl text-foreground/80 font-sans leading-relaxed mb-6">
              &quot;Attention-wise, videos always come first, especially in a digital market filled with short attention spans and an overflow of content. From 15-second spots to TV commercials, the video takes the client&apos;s message and turns it into something even more easily remembered, building a great rapport for the brand itself.&quot;
            </p>
            <p className="text-base text-foreground/70 font-sans leading-relaxed">
              We help companies preserve and innovate digital strategies incorporated creatively in advertising themes that blend today&apos;s influences with traditional marketing approaches. Deep knowledge of constantly shifting realities, a team of passionate experts, and individual solutions that drive growth, visibility enhancement, and meaningful relationships with customers is what the company provides.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
