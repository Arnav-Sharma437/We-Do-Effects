import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceHero } from '@/components/services/ServiceHero';

export const metadata = {
  title: 'Ivr - We Do Effects',
};

export default function PlaceholderPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-background">
        <ServiceHero title="Ivr" />
        <section className="py-24 text-center">
          <p className="text-foreground/60">Content coming soon...</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
