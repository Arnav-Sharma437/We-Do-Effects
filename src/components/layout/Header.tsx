import React from 'react';
import Link from 'next/link';
import { navigation } from '@/data/navigation';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex h-20 items-center justify-between">
        {/* Brand / Logo (Placeholder for GIF) */}
        <Link href="/" className="flex items-center gap-2" aria-label="We Do Effects Home">
          <div className="h-10 w-24 bg-surface-elevated animate-pulse rounded flex items-center justify-center text-[10px] text-muted tracking-widest uppercase border border-border">
            GIF LOGO
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium tracking-wide">
            {navigation.primary.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-muted hover:text-foreground transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Button variant="default" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/contact">Get a Quote</Link>
          </Button>
          <button className="md:hidden text-foreground p-2" aria-label="Menu">
            <span className="block w-6 h-0.5 bg-current mb-1.5"></span>
            <span className="block w-6 h-0.5 bg-current"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
