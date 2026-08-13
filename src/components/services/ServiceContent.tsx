import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
        className="inline-flex items-center px-8 py-4 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-background transition-all duration-300 rounded border border-accent/20 hover:scale-105"
      >
        {text}
      </Link>
    </div>
  );
};

// ---------------------------------------------------------
// NEW COMPONENTS FOR VISUAL HIERARCHY
// ---------------------------------------------------------

interface ServiceSplitSectionProps {
  title: string;
  imageSrc: string;
  imageAlt?: string;
  reverse?: boolean;
  children: React.ReactNode;
}

export const ServiceSplitSection = ({ title, imageSrc, imageAlt = "", reverse = false, children }: ServiceSplitSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 mb-20 md:mb-32 items-center`}
    >
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl md:text-4xl font-serif text-foreground font-bold mb-6">
          {title}
        </h2>
        <div className="w-12 h-[2px] bg-accent/80 mb-8 flex gap-1">
          <div className="w-1 h-full bg-accent/80 rounded-full" />
          <div className="w-1 h-full bg-accent/80 rounded-full" />
          <div className="w-1 h-full bg-accent/80 rounded-full" />
        </div>
        <div className="text-lg text-foreground/80 font-sans leading-relaxed space-y-6">
          {children}
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-border/20 shadow-2xl group">
        <Image 
          src={imageSrc}
          alt={imageAlt || title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

interface ServiceIconCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

export const ServiceIconCard = ({ title, icon, children, delay = 0 }: ServiceIconCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col bg-surface/30 border border-border/10 p-8 rounded-xl hover:bg-surface hover:border-accent/30 transition-all duration-300 group"
    >
      {icon && (
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}
      <h3 className="text-xl md:text-2xl font-serif text-foreground font-bold mb-4 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <div className="text-sm md:text-base text-foreground/70 font-sans leading-relaxed space-y-4">
        {children}
      </div>
    </motion.div>
  );
};

interface ServiceGalleryCardProps {
  title: string;
  children: React.ReactNode;
  images: string[];
  delay?: number;
}

export const ServiceGalleryCard = ({ title, children, images, delay = 0 }: ServiceGalleryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col mb-16"
    >
      <h3 className="text-2xl md:text-3xl font-serif text-foreground font-bold mb-4">
        {title}
      </h3>
      <div className="w-12 h-[2px] bg-accent/50 mb-6" />
      
      {/* Masonry/Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-border/20 group">
            <Image 
              src={img}
              alt={`${title} example ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-300" />
          </div>
        ))}
      </div>

      <div className="text-base text-foreground/80 font-sans leading-relaxed space-y-4 max-w-3xl">
        {children}
      </div>
    </motion.div>
  );
};

export const ServiceGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {children}
    </div>
  );
};
