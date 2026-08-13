'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, slug?: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const deleteKey = slug || id;
      await fetch(`/api/admin/products/${deleteKey}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting', error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Products & Services</h1>
          <p className="text-foreground/70 mt-1">Manage your storefront offerings.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="flex items-center gap-2 px-4 py-2 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-surface rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-surface rounded"></div>
              <div className="h-4 bg-surface rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-surface border border-border/20 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 border-b border-border/20 text-foreground/70 text-sm">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border/10 hover:bg-background/30 transition-colors">
                  <td className="p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.name} className="w-16 h-12 object-cover rounded" />
                  </td>
                  <td className="p-4 font-medium text-foreground">{product.name}</td>
                  <td className="p-4 text-foreground/80">£{product.price}</td>
                  <td className="p-4 text-foreground/80">{product.category}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${product.isActive !== false ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {product.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/products/${product.slug || product.id}`} className="p-2 text-foreground/70 hover:text-accent transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(product.id, product.slug)} className="p-2 text-foreground/70 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-foreground/50">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
