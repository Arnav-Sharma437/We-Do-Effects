'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, ProductAddon } from '@/data/products';

export interface CartItem {
  id: string; // Unique cart item ID (in case they add same product with diff addons)
  product: Product;
  selectedAddons: ProductAddon[];
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, addons: ProductAddon[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wde_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse cart from local storage', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('wde_cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addItem = (product: Product, addons: ProductAddon[]) => {
    setItems((prev) => {
      // Check if exact product+addons combination exists to just increment qty
      // For simplicity, we just add it as a new line item in service-based ecommerce
      const cartItemId = `${product.id}_${Date.now()}`;
      return [...prev, { id: cartItemId, product, selectedAddons: addons, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    const addonsTotal = item.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return acc + ((item.product.price + addonsTotal) * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      totalItems,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
