'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/data/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto w-[94vw] max-w-[1800px] flex h-[88px] items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center" aria-label="We Do Effects Home">
          <img src="/assets/wde_1/wde_1.gif" alt="We Do Effects" className="h-16 w-auto object-contain mix-blend-screen" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navigation.primary.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[15px] font-medium tracking-wide text-foreground/90 hover:text-accent transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Button asChild className="h-12 px-8 rounded-none text-xs font-bold uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 transition-colors flex items-center gap-2">
              <Link href="/contact">
                Get a Quote <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <button className="md:hidden text-foreground p-2" aria-label="Menu">
            <span className="block w-6 h-0.5 bg-current mb-1.5"></span>
            <span className="block w-6 h-0.5 bg-current"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
