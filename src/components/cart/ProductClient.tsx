'use client';

import React, { useState } from 'react';
import { Product, ProductAddon } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProductClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedAddons, setSelectedAddons] = useState<ProductAddon[]>([]);
  const [isAdded, setIsAdded] = useState(false);

  const toggleAddon = (addon: ProductAddon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const totalAddonsPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const finalPrice = product.price + totalAddonsPrice;

  const handleAddToCart = () => {
    addItem(product, selectedAddons);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-surface/50 border border-border/10 p-8 rounded-2xl sticky top-28">
      <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Pricing & Options</h2>
      
      <div className="flex justify-between items-baseline mb-8">
        <span className="text-foreground/70">Base Price:</span>
        <span className="text-3xl font-serif font-bold text-accent">£{product.price}</span>
      </div>

      {product.addons && product.addons.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-4">Available Add-ons</h3>
          <div className="space-y-3">
            {product.addons.map((addon) => {
              const isSelected = selectedAddons.some(a => a.id === addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                    isSelected 
                      ? 'bg-accent/10 border-accent/30 text-accent' 
                      : 'bg-background border-border/10 text-foreground/80 hover:border-accent/20 hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-accent border-accent text-background' : 'border-foreground/20'}`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <span className="font-medium text-sm">{addon.name}</span>
                  </div>
                  <span className="font-bold font-serif">+£{addon.price}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="border-t border-border/10 pt-6 mb-6">
        <div className="flex justify-between items-end">
          <span className="text-foreground/70">Total</span>
          <span className="text-4xl font-serif font-bold text-foreground">£{finalPrice}</span>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 ${
          isAdded 
            ? 'bg-green-500 text-white' 
            : 'bg-accent text-background hover:bg-accent/90 hover:scale-[1.02]'
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-5 h-5" /> Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" /> Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
