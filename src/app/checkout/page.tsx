'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock WooCommerce API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center bg-background py-32 px-6 text-center">
          <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8 mx-auto">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Order Confirmed</h1>
          <p className="text-xl text-foreground/70 max-w-lg mx-auto mb-12">
            Thank you for your order! Your request has been securely processed and sent to our team. We will be in touch shortly to kick off your project.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-8 py-4 bg-accent text-background font-bold uppercase tracking-widest rounded hover:bg-accent/90 transition-all"
          >
            Return Home <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-12">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Checkout Form */}
            <div className="lg:w-2/3">
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                
                {/* Billing Details */}
                <div className="bg-surface/50 border border-border/10 p-8 rounded-2xl">
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Billing Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/70">First Name *</label>
                      <input required type="text" className="w-full bg-background border border-border/20 rounded-lg p-3 text-foreground focus:border-accent outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/70">Last Name *</label>
                      <input required type="text" className="w-full bg-background border border-border/20 rounded-lg p-3 text-foreground focus:border-accent outline-none transition-colors" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-foreground/70">Company Name (Optional)</label>
                      <input type="text" className="w-full bg-background border border-border/20 rounded-lg p-3 text-foreground focus:border-accent outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/70">Email Address *</label>
                      <input required type="email" className="w-full bg-background border border-border/20 rounded-lg p-3 text-foreground focus:border-accent outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/70">Phone *</label>
                      <input required type="tel" className="w-full bg-background border border-border/20 rounded-lg p-3 text-foreground focus:border-accent outline-none transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-surface/50 border border-border/10 p-8 rounded-2xl">
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Additional Information</h2>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/70">Order Notes (Optional)</label>
                    <textarea 
                      rows={4} 
                      placeholder="Notes about your order, e.g. special notes for delivery or project details."
                      className="w-full bg-background border border-border/20 rounded-lg p-3 text-foreground focus:border-accent outline-none transition-colors resize-none" 
                    />
                  </div>
                </div>

              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-surface/50 border border-border/10 p-8 rounded-2xl sticky top-28">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Your Order</h2>
                
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                    <p className="text-foreground/70">Your cart is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-6 mb-8">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between pb-4 border-b border-border/10 last:border-0 last:pb-0">
                        <div className="flex-1 pr-4">
                          <h4 className="font-serif font-bold text-sm text-foreground">{item.product.name} × {item.quantity}</h4>
                          {item.selectedAddons.length > 0 && (
                            <ul className="text-xs text-foreground/60 mt-1 space-y-1">
                              {item.selectedAddons.map(addon => (
                                <li key={addon.id}>+ {addon.name}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="text-accent font-bold text-sm text-right shrink-0">
                          £{((item.product.price + item.selectedAddons.reduce((s,a) => s + a.price, 0)) * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-border/10 pt-6 mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-foreground/70">Subtotal</span>
                    <span className="text-lg font-bold text-foreground">£{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-foreground/70 text-lg">Total</span>
                    <span className="text-4xl font-serif font-bold text-accent">£{subtotal}</span>
                  </div>
                </div>

                <div className="bg-background border border-border/10 p-4 rounded-lg mb-8">
                  <div className="flex gap-3 mb-2">
                    <input type="radio" id="payment_invoice" name="payment_method" defaultChecked className="mt-1" />
                    <div>
                      <label htmlFor="payment_invoice" className="font-bold text-sm cursor-pointer">Pay via Invoice</label>
                      <p className="text-xs text-foreground/60 mt-1">We will send you a secure payment link via Stripe once your order is reviewed.</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={items.length === 0 || isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-background font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
                <p className="text-xs text-center text-foreground/50 mt-4">
                  By placing your order you agree to our Terms & Conditions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
