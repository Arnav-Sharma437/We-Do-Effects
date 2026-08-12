import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { NeedDiscovery } from '@/components/home/NeedDiscovery';
import { ServiceSolutions } from '@/components/home/ServiceSolutions';
import { SelectedWork } from '@/components/home/SelectedWork';
import { Process } from '@/components/home/Process';
import { InstagramReels } from '@/components/home/InstagramReels';
import { PricingPreview } from '@/components/home/PricingPreview';
import { Trust } from '@/components/home/Trust';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        {/* 01 - Hero */}
        <Hero />
        
        {/* 02 - Need Discovery */}
        <NeedDiscovery />
        
        {/* 03 - Service Solutions */}
        <ServiceSolutions />
        
        {/* 04 - Selected Work / Proof */}
        <SelectedWork />
        
        {/* 05 - Process */}
        <Process />
        
        {/* 05.5 - Instagram Reels Showcase */}
        <InstagramReels />
        
        {/* 06 - Pricing Preview */}
        <PricingPreview />
        
        {/* 07 - Trust & Testimonials */}
        <Trust />
        
        {/* 08 - Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
