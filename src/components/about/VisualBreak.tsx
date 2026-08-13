'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface VisualBreakProps {
  imageSrc: string;
  imageAlt: string;
  text: string | React.ReactNode;
}

export const VisualBreak = ({ imageSrc, imageAlt, text }: VisualBreakProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax scale effect
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section ref={ref} className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center bg-background border-b border-t border-border/10">
      
      <motion.div style={{ scale }} className="absolute inset-0 w-full h-full">
        <Image 
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-background/40" />
      </motion.div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none z-10" />

      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-2xl md:text-5xl lg:text-6xl font-serif text-foreground uppercase tracking-tight leading-[1.2]">
            {text}
          </div>
        </motion.div>
      </div>

    </section>
  );
};
