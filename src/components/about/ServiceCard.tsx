'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  index: string;
  title: string;
  description: string;
  href?: string;
  delay?: number;
}

export const ServiceCard = ({ index, title, description, href = "/services", delay = 0 }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="group relative flex flex-col h-full bg-surface-elevated/30 border border-border/40 p-8 md:p-12 hover:-translate-y-2 transition-transform duration-500 ease-out"
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col h-full">
        <span className="text-accent font-sans text-sm font-bold tracking-widest mb-6">
          {index}
        </span>
        
        <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-6 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        
        {/* Animated Accent Line */}
        <div className="w-8 h-[1px] bg-accent/50 mb-6 group-hover:w-16 transition-all duration-500 ease-out" />
        
        <p className="text-muted font-sans font-light leading-relaxed mb-12 flex-1">
          {description}
        </p>
        
        <Link 
          href={href}
          className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors mt-auto w-fit"
        >
          READ MORE 
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
};
