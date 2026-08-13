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
      <main className="flex-1 flex flex-col bg-background selection:bg-accent selection:text-background">
        
        <AboutHero />
        <WhoWeAre />
        <WhatWeDo />
        <ImpactMission />
        <AboutCTA />
        
      </main>
      <Footer />
    </>
  );
}
