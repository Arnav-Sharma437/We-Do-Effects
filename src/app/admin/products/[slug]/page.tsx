'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/data/products';
import { ArrowLeft, Save, Plus, Trash2, Upload } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const isNew = slug === 'new';
  const router = useRouter();
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<Partial<Product>>({
    id: `prod_${Date.now()}`,
    slug: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'Services',
    features: [''],
    addons: [],
    isActive: true,
  });

  useEffect(() => {
    if (!isNew) {
      fetch('/api/admin/products')
        .then(res => res.json())
        .then(data => {
          const found = data.find((p: Product) => p.slug === slug);
          if (found) setProduct(found);
          setLoading(false);
        });
    }
  }, [slug, isNew]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setProduct({ ...product, image: data.url });
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (error) {
      alert('Upload failed');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = isNew ? '/api/admin/products' : `/api/admin/products/${slug}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        router.push('/admin/products');
      } else {
        alert('Failed to save product');
      }
    } catch (error) {
      alert('Error saving product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 text-foreground/70 hover:bg-surface rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            {isNew ? 'New Product' : 'Edit Product'}
          </h1>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="space-y-8">
        <div className="bg-surface border border-border/20 rounded-xl p-6 space-y-6 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-foreground">Basic Info</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-foreground/70 mb-2">Name</label>
              <input 
                value={product.name || ''} 
                onChange={e => setProduct({...product, name: e.target.value})}
                className="w-full bg-background border border-border/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent/50" 
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-foreground/70 mb-2">Slug</label>
              <input 
                value={product.slug || ''} 
                onChange={e => setProduct({...product, slug: e.target.value})}
                className="w-full bg-background border border-border/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent/50" 
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground/70 mb-2">Description</label>
              <textarea 
                value={product.description || ''} 
                onChange={e => setProduct({...product, description: e.target.value})}
                className="w-full bg-background border border-border/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent/50 h-24" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Base Price (£)</label>
              <input 
                type="number"
                value={product.price || 0} 
                onChange={e => setProduct({...product, price: Number(e.target.value)})}
                className="w-full bg-background border border-border/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent/50" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Category</label>
              <input 
                value={product.category || ''} 
                onChange={e => setProduct({...product, category: e.target.value})}
                className="w-full bg-background border border-border/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent/50" 
              />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <input 
                type="checkbox" 
                id="isActive"
                checked={product.isActive !== false} 
                onChange={e => setProduct({...product, isActive: e.target.checked})}
                className="w-4 h-4 text-accent bg-background border-border/20 rounded"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-foreground/80">Active (Visible on frontend)</label>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border/20 rounded-xl p-6 space-y-6 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-foreground">Media</h2>
          <div className="flex gap-6 items-start">
            {product.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image} alt="Preview" className="w-48 h-32 object-cover rounded-lg border border-border/20" />
            )}
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground/70 mb-2">Upload Image</label>
              <div className="relative">
                <input 
                  type="file" 
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full bg-background border border-dashed border-border/40 rounded-lg px-4 py-8 flex flex-col items-center justify-center text-foreground/50 hover:text-accent hover:border-accent/50 transition-colors">
                  <Upload className="w-6 h-6 mb-2" />
                  <span>Click or drag to upload image</span>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground/70 mb-2">Or Image URL</label>
                <input 
                  value={product.image || ''} 
                  onChange={e => setProduct({...product, image: e.target.value})}
                  className="w-full bg-background border border-border/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent/50" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border/20 rounded-xl p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif font-bold text-foreground">Features (Included)</h2>
            <button 
              onClick={() => setProduct({...product, features: [...(product.features || []), '']})}
              className="text-sm font-medium text-accent flex items-center gap-1 hover:underline"
            >
              <Plus className="w-4 h-4" /> Add Feature
            </button>
          </div>
          <div className="space-y-3">
            {product.features?.map((feature, idx) => (
              <div key={idx} className="flex gap-2">
                <input 
                  value={feature} 
                  onChange={e => {
                    const newFeatures = [...(product.features || [])];
                    newFeatures[idx] = e.target.value;
                    setProduct({...product, features: newFeatures});
                  }}
                  className="flex-1 bg-background border border-border/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent/50" 
                />
                <button 
                  onClick={() => {
                    const newFeatures = product.features?.filter((_, i) => i !== idx);
                    setProduct({...product, features: newFeatures});
                  }}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border/20 rounded-xl p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif font-bold text-foreground">Add-ons</h2>
            <button 
              onClick={() => setProduct({...product, addons: [...(product.addons || []), { id: `addon_${Date.now()}`, name: '', price: 0 }]})}
              className="text-sm font-medium text-accent flex items-center gap-1 hover:underline"
            >
              <Plus className="w-4 h-4" /> Add Add-on
            </button>
          </div>
          <div className="space-y-4">
            {product.addons?.map((addon, idx) => (
              <div key={idx} className="flex gap-4 items-center bg-background p-4 rounded-lg border border-border/10">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-foreground/50 mb-1">Add-on Name</label>
                  <input 
                    value={addon.name} 
                    onChange={e => {
                      const newAddons = [...(product.addons || [])];
                      newAddons[idx] = { ...addon, name: e.target.value };
                      setProduct({...product, addons: newAddons});
                    }}
                    className="w-full bg-transparent border-b border-border/20 px-0 py-1 text-foreground focus:outline-none focus:border-accent/50" 
                  />
                </div>
                <div className="w-32">
                  <label className="block text-xs font-medium text-foreground/50 mb-1">Price (£)</label>
                  <input 
                    type="number"
                    value={addon.price} 
                    onChange={e => {
                      const newAddons = [...(product.addons || [])];
                      newAddons[idx] = { ...addon, price: Number(e.target.value) };
                      setProduct({...product, addons: newAddons});
                    }}
                    className="w-full bg-transparent border-b border-border/20 px-0 py-1 text-foreground focus:outline-none focus:border-accent/50" 
                  />
                </div>
                <button 
                  onClick={() => {
                    const newAddons = product.addons?.filter((_, i) => i !== idx);
                    setProduct({...product, addons: newAddons});
                  }}
                  className="mt-4 p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
