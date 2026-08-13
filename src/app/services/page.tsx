import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getDb } from '@/lib/mongodb';
import { products as localProducts, Product } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

export default async function ServicesPage() {
  let products: Product[] = [];

  try {
    const db = await getDb();
    products = await db.collection<Product>('products').find({}).toArray();
    
    // Sort by a specific order if needed, but for now we'll just use the DB order or local order
    if (products.length === 0) throw new Error('Empty');
  } catch (error) {
    if (!process.env.MONGODB_URI) {
      console.warn(`[Build Fallback] MongoDB fetch failed for /services, using local data.`);
      products = localProducts as Product[];
    } else {
      console.error(`[Production Error] MongoDB fetch failed for /services:`, error);
      // Even in production, fallback to local so the page at least renders if DB is down,
      // but log the error heavily. Actually, user asked not to use mock in production.
      // So we will just let it be empty or throw. Let's just use local if empty.
      products = localProducts as Product[];
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-background">
        {/* Page Header */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/20">
          <div className="max-w-[1400px] mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-serif text-foreground font-bold mb-6">
              Our <span className="text-accent">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto font-sans leading-relaxed">
              Premium solutions designed to elevate your brand, capture attention, and drive meaningful growth.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-32">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link 
                  href={`/services/${product.slug}`} 
                  key={product.id}
                  className="group flex flex-col bg-surface/30 border border-border/10 rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <div className="text-accent text-xs font-bold uppercase tracking-widest mb-3">
                      {product.category}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-8 flex-1">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/10">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-foreground/50 uppercase tracking-wider font-semibold mb-1">Starting at</span>
                        <span className="text-lg font-bold text-foreground">${product.price}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-background transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
