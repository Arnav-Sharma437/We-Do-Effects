'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, subtotal, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface border-l border-border/10 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-serif font-bold text-foreground">Your Order</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-background rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-foreground/70" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-4 border border-border/10">
                    <ShoppingBag className="w-8 h-8 text-foreground/30" />
                  </div>
                  <p className="text-lg text-foreground/80 font-serif">Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-accent text-sm hover:underline"
                  >
                    Continue browsing services
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-background/50 rounded-xl border border-border/5">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-border/10">
                      <Image 
                        src={item.product.image} 
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif font-bold text-foreground text-sm truncate pr-2">
                          {item.product.name}
                        </h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-foreground/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-accent font-bold text-sm mb-2">£{item.product.price}</p>
                      
                      {item.selectedAddons.length > 0 && (
                        <div className="space-y-1 mb-3">
                          {item.selectedAddons.map(addon => (
                            <div key={addon.id} className="flex justify-between text-xs text-foreground/60">
                              <span>+ {addon.name}</span>
                              <span>£{addon.price}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-foreground/60">Qty:</span>
                        <div className="flex items-center bg-background rounded border border-border/20">
                          <button 
                            className="px-2 py-1 text-foreground/60 hover:text-foreground"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >-</button>
                          <span className="px-2 py-1 text-xs">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 text-foreground/60 hover:text-foreground"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border/10 bg-background/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-foreground/70">Estimated Total</span>
                  <span className="text-2xl font-serif font-bold text-accent">£{subtotal}</span>
                </div>
                <Link 
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-background font-bold py-4 rounded hover:bg-accent/90 transition-colors"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
