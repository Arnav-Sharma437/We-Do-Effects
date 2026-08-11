'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '@/components/layout/Section';

const clients = [
  { name: 'India Wale', src: '/assets/clients/india-wale.png' },
  { name: 'Glam & Go', src: '/assets/clients/glam-go.png' },
  { name: 'Bollywood Odyssey', src: '/assets/clients/bollywood-odyssey.png' },
  { name: 'Delhi Delights', src: '/assets/clients/delhi-delights.png' },
  { name: 'Flavors of India', src: '/assets/clients/flavors-of-india.png' },
  { name: 'My Style Wish', src: '/assets/clients/my-style-wish.png' },
  { name: 'Goo Flys.com', src: '/assets/clients/goo-flys.png' },
  { name: 'Masala Odyssey', src: '/assets/clients/masala-odyssey.png' }
];

export const Trust = () => {
  const prefersReducedMotion = useReducedMotion();
  
  // Duplicate the array for seamless looping
  const marqueeLogos = [...clients, ...clients];

  return (
    <Section spacing="xl" className="bg-background relative overflow-hidden">
      
      <div className="flex flex-col mb-16 lg:mb-24 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-foreground">
          Clients We<br />Worked With
        </h2>
      </div>

      {prefersReducedMotion ? (
        // ACCESSIBILITY: Static Grid for Reduced Motion
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto">
          {clients.map((client, idx) => (
            <div 
              key={`static-${idx}`} 
              className="aspect-[2/1] bg-background border border-border/40 flex items-center justify-center p-6 md:p-8"
              aria-label={client.name}
            >
              <img 
                src={client.src} 
                alt={client.name} 
                className="w-full h-full object-contain filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 text-[10px] text-muted text-center" 
              />
            </div>
          ))}
        </div>
      ) : (
        // INFINITE MARQUEE
        <div 
          className="relative w-full flex overflow-hidden group"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <motion.div 
            className="flex gap-4 md:gap-6 w-max pl-4 md:pl-6 group-hover:[animation-play-state:paused]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 40 
            }}
          >
            {marqueeLogos.map((client, idx) => (
              <div 
                key={`marquee-${idx}`} 
                className="w-[200px] md:w-[280px] lg:w-[320px] aspect-[2/1] bg-background border border-border/30 flex-shrink-0 flex items-center justify-center p-6 md:p-8 hover:border-border/80 transition-colors"
                aria-label={client.name}
              >
                <img 
                  src={client.src} 
                  alt={client.name} 
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-500 text-[10px] uppercase font-bold tracking-widest text-muted text-center" 
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}
      
    </Section>
  );
};
