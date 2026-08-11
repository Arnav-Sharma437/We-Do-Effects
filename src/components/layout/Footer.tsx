import React from 'react';
import Link from 'next/link';
import { navigation } from '@/data/navigation';

export const Footer = () => {
  return (
    <footer className="bg-surface-elevated border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Block */}
          <div className="col-span-1 md:col-span-1">
             <div className="h-10 w-24 bg-surface animate-pulse rounded mb-6 flex items-center justify-center text-[10px] text-muted tracking-widest uppercase border border-border">
                GIF LOGO
             </div>
             <p className="text-muted text-sm max-w-xs leading-relaxed">
               An experienced creative agency that understands what you need and makes the next step obvious.
             </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif text-lg text-foreground mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-muted">
              {navigation.primary.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-serif text-lg text-foreground mb-6">Services</h3>
            <ul className="space-y-4 text-sm text-muted">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg text-foreground mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-muted">
              <li>
                <span className="block text-xs uppercase tracking-widest mb-1">Phone</span>
                <a href="tel:#" className="hover:text-foreground transition-colors">[VERIFIED PHONE]</a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-widest mb-1">Email</span>
                <a href="mailto:#" className="hover:text-foreground transition-colors">[VERIFIED EMAIL]</a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-widest mb-1">Address</span>
                <span className="hover:text-foreground transition-colors">[VERIFIED ADDRESS]</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} We Do Effects. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
