'use client';

import React from 'react';
import Link from 'next/link';
import { navigation } from '@/data/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/20">
      <div className="mx-auto w-[92vw] max-w-[1600px] flex h-20 items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center" aria-label="We Do Effects Home">
          <img src="/assets/wde_1/wde_1.gif" alt="We Do Effects" className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
          {navigation.primary.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[14px] font-semibold text-foreground hover:text-accent transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:flex items-center">
            <Button asChild className="h-10 px-6 rounded-none text-[11px] font-bold uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 transition-colors flex items-center gap-2">
              <Link href="/book">
                Get a Quote <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
