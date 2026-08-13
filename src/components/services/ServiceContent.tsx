'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const ServiceSection = ({ title, children }: SectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="mb-16 md:mb-20"
    >
      <h2 className="text-2xl md:text-3xl font-serif text-foreground font-bold mb-4">
        {title}
      </h2>
      <div className="w-12 h-[2px] bg-accent/80 mb-6 flex gap-1">
        <div className="w-1 h-full bg-accent/80 rounded-full" />
        <div className="w-1 h-full bg-accent/80 rounded-full" />
        <div className="w-1 h-full bg-accent/80 rounded-full" />
        <div className="w-1 h-full bg-accent/80 rounded-full" />
      </div>
      <div className="text-base text-foreground/80 font-sans leading-relaxed space-y-6">
        {children}
      </div>
    </motion.div>
  );
};

interface BulletListProps {
  items: { title: string; text: string }[];
}

export const ServiceBulletList = ({ items }: BulletListProps) => {
  return (
    <ul className="space-y-4 mt-6">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          <p className="text-base text-foreground/80 leading-relaxed">
            <strong className="text-foreground">{item.title}:</strong> {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
};

export const ServiceCTAButton = ({ href = "/pricing", text = "EXPLORE PRICING →" }: { href?: string, text?: string }) => {
  return (
    <div className="mt-8">
      <Link 
        href={href}
        className="inline-flex items-center px-6 py-3 bg-accent/10 text-accent text-[11px] font-bold uppercase tracking-widest hover:bg-accent hover:text-background transition-all duration-300 rounded border border-accent/20"
      >
        {text}
      </Link>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

export const ServiceCard = ({ title, children, delay = 0 }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col"
    >
      <h3 className="text-xl md:text-2xl font-serif text-foreground font-bold mb-4">
        {title}
      </h3>
      <div className="w-8 h-[1px] bg-accent/50 mb-4" />
      <div className="text-sm md:text-base text-foreground/70 font-sans leading-relaxed space-y-4">
        {children}
      </div>
    </motion.div>
  );
};

export const ServiceGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-8">
      {children}
    </div>
  );
};
