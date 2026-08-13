/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'app');

const routes = [
  'services/audio-marketing',
  'services/branding',
  'marketing/radio-ads',
  'marketing/ivr',
  'marketing/jingles',
  'marketing/music-videos',
  'marketing/social-media',
  'marketing/tv-ads',
  'marketing/video-ads',
];

const template = (title) => `import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceHero } from '@/components/services/ServiceHero';

export const metadata = {
  title: '${title} - We Do Effects',
};

export default function PlaceholderPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-background">
        <ServiceHero title="${title}" />
        <section className="py-24 text-center">
          <p className="text-foreground/60">Content coming soon...</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
`;

routes.forEach(route => {
  const dirPath = path.join(baseDir, route);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const pagePath = path.join(dirPath, 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    const title = route.split('/').pop().split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    fs.writeFileSync(pagePath, template(title));
    console.log(`Created placeholder for ${route}`);
  }
});
