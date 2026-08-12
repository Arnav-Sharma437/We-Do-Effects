import React from 'react';
import Link from 'next/link';
import { navigation } from '@/data/navigation';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto overflow-hidden relative">
      {/* Large subtle background typography */}
      <div className="absolute -bottom-10 -right-10 text-[10rem] md:text-[15rem] font-display font-bold text-background opacity-20 select-none pointer-events-none leading-none tracking-tighter uppercase z-0">
        WDE.
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand Block */}
          <div className="col-span-1 md:col-span-5 pr-8">
             <img src="/assets/wde_1/wde_1.gif" alt="We Do Effects" className="h-16 w-auto object-contain mb-8 mix-blend-screen" />
             <p className="text-foreground text-lg md:text-xl font-serif leading-relaxed mb-6">
               Nurtures and elevates your brand. Just as sunlight helps a plant grow.
             </p>
             <p className="text-muted text-sm leading-relaxed max-w-sm">
               An experienced creative agency that understands what you need and makes the next step obvious.
             </p>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold uppercase tracking-widest text-foreground mb-8">Company</h3>
            <ul className="space-y-4 text-sm font-medium tracking-wide text-muted">
              {navigation.primary.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold uppercase tracking-widest text-foreground mb-8">Services</h3>
            <ul className="space-y-4 text-sm font-medium tracking-wide text-muted">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="font-display text-xl font-bold uppercase tracking-widest text-foreground mb-8">Contact</h3>
            <ul className="space-y-6 text-sm text-muted">
              <li>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">Phone</span>
                <a href="tel:+447383939393" className="text-base font-serif hover:text-foreground transition-colors">+44 73 83 93 93 93</a>
              </li>
              <li>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">Email</span>
                <a href="mailto:hi@wedoeffects.co.uk" className="text-base font-serif hover:text-foreground transition-colors">hi@wedoeffects.co.uk</a>
              </li>
              <li>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">Address</span>
                <span className="text-base font-serif hover:text-foreground transition-colors block leading-relaxed">
                  Hemel Hempstead
                  <br />
                  HP2 4FA
                </span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="mt-24 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
          <p>&copy; {new Date().getFullYear()} WE DO EFFECTS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
