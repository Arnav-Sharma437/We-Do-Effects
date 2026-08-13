import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AboutHero } from '@/components/about/AboutHero';
import { WhoWeAre } from '@/components/about/WhoWeAre';
import { WhatWeDo } from '@/components/about/WhatWeDo';
import { ImpactMission } from '@/components/about/ImpactMission';
import { AboutCTA } from '@/components/about/AboutCTA';

export const metadata = {
  title: 'About | We Do Effects',
  description: 'We Do Effects is a creative marketing agency that acts as a strategic marketing partner for the development of a strong and sustainable brand presence.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-background overflow-hidden selection:bg-accent selection:text-background">
        
        {/* 01 - Hero & Intro */}
        <AboutHero />
        
        {/* 02 - Who We Are */}
        <WhoWeAre />
        
        {/* 03 - What We Do (Services) */}
        <WhatWeDo />
        
        {/* 04 - Impact & Mission */}
        <ImpactMission />
        
        {/* 05 - CTA */}
        <AboutCTA />
        
      </main>
      <Footer />
    </>
  );
}
