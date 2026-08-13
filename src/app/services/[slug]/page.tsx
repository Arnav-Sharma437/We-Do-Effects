import React from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ProductClient } from '@/components/cart/ProductClient';
import { Check } from 'lucide-react';
import { Product } from '@/data/products'; // Keep type definition if needed, or inline it

async function getWooCommerceProduct(slug: string): Promise<Product | null> {
  try {
    // In server components, fetch via absolute URL or directly via WC API
    // Since we are in a server component, we should ideally fetch directly 
    // to avoid Next.js absolute URL requirements during build time.
    const { wcApi } = await import('@/lib/woocommerce');
    
    if (!process.env.NEXT_PUBLIC_WC_URL) {
      return null;
    }

    const { data: products } = await wcApi.get("products", { slug });
    
    if (!products || products.length === 0) {
      return null;
    }

    const product = products[0];
    let variations = [];
    if (product.type === 'variable') {
      const { data } = await wcApi.get(`products/${product.id}/variations`);
      variations = data;
    }

    return {
      id: String(product.id),
      slug: product.slug,
      name: product.name,
      description: product.short_description?.replace(/<[^>]+>/g, '') || product.name,
      price: parseFloat(product.price || '0'),
      image: product.images?.length > 0 ? product.images[0].src : '/assets/about/hero.jpg',
      category: product.categories?.length > 0 ? product.categories[0].name : 'Services',
      features: [
        "Premium Agency Quality",
        "Dedicated Support",
        "Satisfaction Guarantee"
      ],
      addons: variations.map((v: any) => ({
        id: String(v.id),
        name: v.attributes?.length > 0 ? v.attributes[0].option : `Add-on`,
        price: parseFloat(v.price || '0')
      }))
    };
  } catch (error) {
    console.error("WooCommerce Fetch Error:", error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = await getWooCommerceProduct(slug);

  if (!product) {
    // If the API keys aren't set, we show a helpful error instead of a generic 404
    if (!process.env.NEXT_PUBLIC_WC_URL) {
      return (
        <>
          <Header />
          <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] bg-background text-center px-6">
            <h1 className="text-3xl font-bold font-serif mb-4">WooCommerce Not Connected</h1>
            <p className="text-foreground/70 max-w-lg mb-8">
              This is a dynamic WooCommerce product page. It is attempting to fetch "{slug}" from your WordPress backend.
            </p>
            <p className="text-accent max-w-lg font-bold">
              Please add your WooCommerce URL, Consumer Key, and Consumer Secret to your .env file to enable this page.
            </p>
          </div>
          <Footer />
        </>
      );
    }
    notFound();
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

                <h3 className="text-2xl font-serif font-bold text-foreground mb-6">What's Included</h3>
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
                <ProductClient product={product} />
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
