import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AboutHero } from '@/components/about/AboutHero';
import { IntroSplit } from '@/components/about/IntroSplit';
import { VisualBreak } from '@/components/about/VisualBreak';
import { WhoWeAre } from '@/components/about/WhoWeAre';
import { WhatWeDo } from '@/components/about/WhatWeDo';
import { ImpactMission } from '@/components/about/ImpactMission';
import { ImageTextSplit } from '@/components/about/ImageTextSplit';
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
        
        <AboutHero />
        
        <IntroSplit />
        
        <VisualBreak 
          imageSrc="/assets/about/action-break.jpg" 
          imageAlt="Creative marketing studio in action" 
          text={<>CREATIVE THINKING,<br />BUILT TO MOVE BRANDS.</>}
        />
        
        <WhoWeAre />
        
        <WhatWeDo />
        
        <VisualBreak 
          imageSrc="/assets/about/strategy-break.jpg" 
          imageAlt="From strategy to execution" 
          text={<>FROM IDEA<br />TO EXECUTION.</>}
        />
        
        <ImpactMission />
        
        <ImageTextSplit />
        
        <AboutCTA />
        
      </main>
      <Footer />
    </>
  );
}
