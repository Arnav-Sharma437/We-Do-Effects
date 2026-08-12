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

          {/* Carousel Controls (Only visible when ALL filter is active) */}
          <div className="hidden md:flex items-center gap-4">
            {activeFilter === 'all' && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content Container: Carousel for 'ALL', Grid for specific categories */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative">
        <div 
          ref={carouselRef}
          className={
            activeFilter === 'all' 
              ? "flex overflow-x-auto gap-6 md:gap-8 pb-8 snap-x snap-mandatory scrollbar-hide" 
              : "flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8 pb-8"
          }
          style={activeFilter === 'all' ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
        >
          
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={post.id}
                className="relative flex-shrink-0 aspect-[4/5] w-[300px] md:w-[350px] lg:w-[400px] bg-surface-elevated border border-border/20 rounded-lg overflow-hidden group snap-center"
              >
                
                {/* Fallback Overlay (Shown while iframe loads or if it fails) */}
                <div className="absolute inset-0 bg-gradient-to-br from-surface to-background flex flex-col items-center justify-center p-6 text-center z-0">
                  <div className="w-16 h-16 rounded-full border border-border/50 flex items-center justify-center mb-6">
                    <Play className="w-6 h-6 text-muted" fill="currentColor" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-accent mb-2">
                    {post.category.replace('-', ' ')}
                  </span>
                  <a 
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-foreground hover:text-accent transition-colors mt-4"
                  >
                    View on Instagram <ArrowUpRightIcon className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* The Iframe Embed (Overlays the fallback) */}
                <iframe
                  src={post.embedUrl}
                  className="absolute inset-0 w-full h-full border-none z-10 bg-transparent"
                  allowTransparency={true}
                  loading="lazy"
                  title={`Instagram post - ${post.category}`}
                  scrolling="no"
                  style={{ pointerEvents: 'auto' }}
                />

                {/* Optional Custom UI layered ON TOP of the iframe edges to frame it creatively */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/90 to-transparent z-20 pointer-events-none" />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-30 pointer-events-none">
                  <span className="bg-black/60 backdrop-blur-md border border-accent/30 text-accent text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm">
                    {post.category.replace('-', ' ')}
                  </span>
                  <InstagramIcon className="w-5 h-5 text-white opacity-90 shadow-sm" />
                </div>
                
              </motion.div>
            ))}
          </AnimatePresence>

        </div>
        
        {/* Fading edge to indicate scrollability on desktop (Only for 'All' carousel) */}
        {activeFilter === 'all' && (
          <div className="hidden md:block absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
        )}
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
