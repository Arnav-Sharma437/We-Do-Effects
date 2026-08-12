'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { instagramPosts, InstagramCategory } from '@/data/instagram';
import { ArrowRight, Instagram } from 'lucide-react';
import Link from 'next/link';

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

  const filteredPosts = instagramPosts.filter(
    post => activeFilter === 'all' || post.category === activeFilter
  );

  return (
    <Section spacing="xl" className="bg-background relative overflow-hidden border-t border-border/20">
      
      {/* Header Area */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-4 flex items-center gap-2">
            <Instagram className="w-4 h-4" /> Our Work In Motion
          </h2>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-foreground max-w-xl">
            Stories, visuals <span className="text-accent italic font-normal text-[0.9em]">&amp;</span> ideas brought to life.
          </h3>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`text-xs font-bold tracking-widest uppercase px-4 py-2 transition-colors border ${
                activeFilter === filter.value 
                  ? 'border-accent text-accent bg-accent/5' 
                  : 'border-transparent text-muted hover:text-foreground hover:border-border/50'
              }`}
              aria-pressed={activeFilter === filter.value}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative">
        <div className="flex overflow-x-auto gap-6 md:gap-8 pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={post.id}
                className="relative flex-shrink-0 w-[280px] md:w-[320px] lg:w-[350px] aspect-[4/5] bg-surface-elevated border border-border/40 rounded-sm overflow-hidden group snap-center"
              >
                {/* Fallback UI (Visible instantly, sits behind iframe, or shows if iframe fails/is blocked) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0 bg-surface">
                  <Instagram className="w-8 h-8 text-muted mb-4 opacity-50" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-accent mb-2">
                    {post.category.replace('-', ' ')}
                  </span>
                  <a 
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-foreground hover:text-accent transition-colors mt-4"
                  >
                    View on Instagram <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* The Iframe Embed */}
                {/* We use a slightly scaled iframe to crop out the heavy Instagram header/footer padding if desired, but native embed handles responsive well */}
                <iframe
                  src={post.embedUrl}
                  className="absolute inset-0 w-full h-full border-none z-10 bg-transparent"
                  allowTransparency={true}
                  loading="lazy"
                  title={`Instagram post - ${post.category}`}
                  scrolling="no"
                  // Using pointer-events-auto so users can interact with the video player
                  style={{ pointerEvents: 'auto' }}
                />
                
                {/* We can add a clickable overlay if we want to bypass the iframe interaction entirely and force users to the native app, but allowing iframe interaction is generally preferred for embeds. We'll leave it interactive. */}
              </motion.div>
            ))}
          </AnimatePresence>

        </div>
        
        {/* Fading edge to indicate scrollability on desktop */}
        <div className="absolute right-0 top-0 bottom-8 w-12 md:w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
      </div>

      {/* Global CTA */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 mt-8 flex justify-end">
        <a
          href="https://www.instagram.com/wedoeffects_uk/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors"
        >
          View all on Instagram
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
        </a>
      </div>

    </Section>
  );
};
