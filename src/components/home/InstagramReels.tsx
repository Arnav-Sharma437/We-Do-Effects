'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { instagramPosts, InstagramCategory } from '@/data/instagram';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';

// Custom SVG to replace lucide-react Instagram if missing
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M7 17L17 7"/>
    <path d="M7 7h10v10"/>
  </svg>
);

type FilterOption = 'all' | InstagramCategory;

const filters: { label: string; value: FilterOption }[] = [
  { label: 'All', value: 'all' },
  { label: 'Stories', value: 'stories' },
  { label: 'Hoz Pox', value: 'hoz-pox' },
  { label: 'Informative', value: 'informative' },
  { label: 'Visuals', value: 'visuals' },
];

export const InstagramReels = () => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredPosts = instagramPosts.filter(
    post => activeFilter === 'all' || post.category === activeFilter
  );

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <Section spacing="xl" className="bg-background relative overflow-hidden border-t border-border/10">
      
      {/* Header Area */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 mb-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
          
          {/* Left: Titles */}
          <div className="lg:w-3/5">
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-accent uppercase mb-6 flex items-center gap-3">
              <InstagramIcon className="w-4 h-4" /> OUR WORK IN MOTION
            </h2>
            <h3 className="text-4xl md:text-6xl lg:text-[5rem] font-display font-bold uppercase tracking-tighter text-foreground leading-[1.05]">
              STORIES, VISUALS<br />
              <span className="text-accent italic font-normal">&amp;</span> IDEAS BROUGHT<br />
              TO LIFE.
            </h3>
          </div>

          {/* Right: Supporting Copy */}
          <div className="lg:w-2/5 flex flex-col justify-end lg:pb-4">
            <p className="text-muted text-lg md:text-xl leading-relaxed max-w-md">
              A glimpse of the stories, visuals and ideas we create for brands, businesses and creators.
            </p>
            <div className="w-12 h-[1px] bg-accent mt-6 opacity-50" />
          </div>

        </div>

        {/* Filters & Navigation Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-16">
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`text-[10px] md:text-xs font-bold tracking-widest uppercase px-6 py-3 transition-colors border ${
                  activeFilter === filter.value 
                    ? 'border-accent text-accent bg-transparent' 
                    : 'border-transparent text-muted hover:text-foreground hover:border-border/30'
                }`}
                aria-pressed={activeFilter === filter.value}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-border/30 flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-colors"
              aria-label="Previous posts"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-border/30 flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-colors"
              aria-label="Next posts"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative">
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto gap-6 md:gap-8 pb-8 snap-x snap-mandatory scrollbar-hide" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={post.id}
                className="relative flex-shrink-0 w-[300px] md:w-[350px] lg:w-[400px] aspect-[4/5] bg-surface-elevated border border-border/20 rounded-lg overflow-hidden group snap-center block"
              >
                
                {/* Cinematic Background Gradient (Placeholder for media) */}
                <div className="absolute inset-0 bg-gradient-to-br from-surface to-background group-hover:scale-105 transition-transform duration-700 ease-out z-0" />
                
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

                {/* Top Bar: Label & Icon */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                  <span className="bg-black/40 backdrop-blur-md border border-accent/30 text-accent text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm">
                    {post.category.replace('-', ' ')}
                  </span>
                  <InstagramIcon className="w-5 h-5 text-muted opacity-70 group-hover:text-foreground transition-colors" />
                </div>

                {/* Center: Play Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-16 h-16 rounded-full border border-white/50 flex items-center justify-center group-hover:border-accent group-hover:scale-110 transition-all duration-500 bg-black/20 backdrop-blur-sm">
                    <Play className="w-6 h-6 text-white ml-1 group-hover:text-accent transition-colors" fill="currentColor" />
                  </div>
                </div>

                {/* Bottom Bar: Content & CTA */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <h4 className="text-2xl md:text-3xl font-serif text-white mb-2 group-hover:text-accent transition-colors">
                    {post.category === 'hoz-pox' ? 'HozPox Special' : post.category === 'informative' ? 'Auditions Open' : post.category === 'visuals' ? 'Masala Odyssey' : 'Aikat Mozo Tavo'}
                  </h4>
                  <p className="text-xs text-muted mb-6">
                    {post.category === 'hoz-pox' ? 'Authentic Flavours • Premium Experience' : post.category === 'informative' ? 'New Talent • New Opportunities' : post.category === 'visuals' ? 'A Visual Journey • Crafted with Emotion' : 'The 7 Notes Band • Konkani Masala'}
                  </p>
                  
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-accent opacity-80 group-hover:opacity-100 transition-opacity">
                    View on Instagram <ArrowUpRightIcon className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
                
              </motion.a>
            ))}
          </AnimatePresence>

        </div>
        
        {/* Fading edge to indicate scrollability on desktop */}
        <div className="hidden md:block absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
      </div>

      {/* Global CTA */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 mt-12 flex justify-center">
        <a
          href="https://www.instagram.com/wedoeffects_uk/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground border border-border/30 hover:border-accent px-8 py-4 rounded-sm transition-colors"
        >
          <InstagramIcon className="w-4 h-4 opacity-70 group-hover:text-accent transition-colors" />
          View all on Instagram
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
        </a>
      </div>

    </Section>
  );
};
