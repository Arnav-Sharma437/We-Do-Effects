import React from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ProductClient } from '@/components/cart/ProductClient';
import { Check } from 'lucide-react';
import { getDb } from '@/lib/mongodb';
import { products, getProductBySlug } from '@/data/products';

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  let product: typeof products[0] | null = null;

  try {
    const db = await getDb();
    // @ts-expect-error - Document type mismatch but perfectly valid
    product = await db.collection<Product>('products').findOne({ slug }) as typeof products[0] | null;
  } catch (error) {
    console.warn(`[Build Fallback] MongoDB fetch failed for ${slug}, using local data.`);
    product = getProductBySlug(slug) || null;
  }

  if (!product) {
    // If it's still missing from both MongoDB and local fallback
    product = getProductBySlug(slug) || null;
    if (!product) {
      notFound();
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-background">
        <ServiceHero 
          title={product.name} 
          imageSrc={product.image}
        />

        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Product Details */}
              <div className="lg:w-2/3">
                <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                  {product.category}
                </div>
                <h1 className="text-3xl md:text-5xl font-serif text-foreground font-bold mb-6">
                  {product.name}
                </h1>
                
                <div className="w-16 h-[2px] bg-accent/80 mb-8" />
                
                <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-12">
                  {product.description}
                </p>

                <h3 className="text-2xl font-serif font-bold text-foreground mb-6">What&apos;s Included</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-surface/30 p-4 rounded-xl border border-border/5">
                      <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cart/Pricing Sidebar */}
              <div className="lg:w-1/3">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <ProductClient product={product as any} />
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
