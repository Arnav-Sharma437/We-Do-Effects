'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const ImageTextSplit = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <Section spacing="none" className="bg-surface-elevated relative overflow-hidden border-t border-border/10">
      <div className="flex flex-col lg:flex-row min-h-[50vh]">
        
        {/* Left: Image with Parallax */}
        <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[300px] lg:min-h-full group">
          <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%]">
            <Image 
              src="/assets/about/strategy-break.jpg"
              alt="Creative marketing strategy"
              fill
              className="object-cover object-center opacity-80 mix-blend-luminosity group-hover:scale-105 transition-transform duration-[2s] ease-out"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-background z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-background z-10 lg:hidden" />
        </div>

        {/* Right: Editorial Statement */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:p-16 relative z-20">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground tracking-tight leading-[1.2] mb-8">
              We believe good marketing should be <span className="text-accent italic">felt</span>, not just seen.
            </h2>
            
            <Link 
              href="/work"
              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-foreground hover:text-accent transition-colors"
            >
              <div className="w-12 h-[1px] bg-foreground group-hover:bg-accent group-hover:w-16 transition-all duration-300" />
              VIEW OUR WORK 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

      </div>
    </Section>
  );
};
