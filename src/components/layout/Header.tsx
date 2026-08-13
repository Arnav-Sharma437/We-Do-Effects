'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { navigation } from '@/data/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ChevronDown, Menu, X, ShoppingBag } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const { totalItems, setIsCartOpen } = useCart();

  const toggleAccordion = (name: string) => {
    setOpenAccordions(prev => 
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/20">
      <div className="mx-auto w-[92vw] max-w-[1600px] flex h-20 items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center" aria-label="We Do Effects Home">
          <img src="/assets/wde_1/wde_1.gif" alt="We Do Effects" className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navigation.primary.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className="flex items-center gap-1.5 text-[14px] font-semibold text-foreground hover:text-accent transition-colors py-8"
              >
                {item.name}
                {item.dropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
              </Link>
              
              {item.dropdown && (
                <div className="absolute top-[80px] left-0 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                  <div className="bg-surface border border-border/20 rounded-md shadow-xl py-3 min-w-[220px] flex flex-col">
                    {item.dropdown.map(sub => (
                      <Link 
                        key={sub.name} 
                        href={sub.href} 
                        className="px-5 py-2.5 text-[13px] font-medium text-foreground/80 hover:text-accent hover:bg-background/50 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-foreground hover:text-accent transition-colors"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-background text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <div className="hidden lg:flex items-center">
            <Button asChild className="h-10 px-6 rounded-none text-[11px] font-bold uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 transition-colors flex items-center gap-2">
              <Link href="/book">
                Get a Quote <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>
          <button 
            className="xl:hidden text-foreground p-2" 
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="xl:hidden overflow-hidden bg-background border-b border-border/20 absolute top-full left-0 w-full shadow-2xl"
          >
            <nav className="flex flex-col px-6 py-6 gap-2">
              {navigation.primary.map((item) => (
                <div key={item.name} className="flex flex-col">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleAccordion(item.name)}
                        className="flex items-center justify-between py-3 text-base font-semibold text-foreground hover:text-accent transition-colors text-left"
                      >
                        {item.name}
                        <ChevronDown className={`w-5 h-5 transition-transform ${openAccordions.includes(item.name) ? 'rotate-180 text-accent' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openAccordions.includes(item.name) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col pl-4 gap-2 mb-2"
                          >
                            {item.dropdown.map(sub => (
                              <Link 
                                key={sub.name} 
                                href={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="py-2 text-sm text-foreground/70 hover:text-accent transition-colors"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-3 text-base font-semibold text-foreground hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-6 mt-4 border-t border-border/20">
                <Button asChild className="w-full h-12 rounded-none font-bold uppercase tracking-widest bg-accent text-background hover:bg-accent/90 transition-colors">
                  <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>
                    Get a Quote
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <CartDrawer />
    </header>
  );
};
