import { NextResponse } from 'next/server';
import { wcApi, WCProduct, WCVariation } from '@/lib/woocommerce';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    if (!process.env.NEXT_PUBLIC_WC_URL || !process.env.WC_CONSUMER_KEY || !process.env.WC_CONSUMER_SECRET) {
       return NextResponse.json({ error: 'WooCommerce API keys are not configured.' }, { status: 500 });
    }

    // 1. Fetch the main product by slug
    const { data: products } = await wcApi.get("products", { slug });
    
    if (!products || products.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product: WCProduct = products[0];

    // 2. If it's a variable product, fetch its variations (these represent the "add-ons")
    let variations: WCVariation[] = [];
    if (product.type === 'variable') {
      const { data } = await wcApi.get(`products/${product.id}/variations`);
      variations = data;
    }

    // Map WooCommerce data to a structured format for our Next.js frontend
    const formattedProduct = {
      id: String(product.id),
      slug: product.slug,
      name: product.name,
      description: product.short_description.replace(/<[^>]+>/g, '') || product.description.replace(/<[^>]+>/g, ''), // Strip HTML for simplicity here
      price: parseFloat(product.price || '0'),
      image: product.images.length > 0 ? product.images[0].src : '/assets/about/hero.jpg',
      category: product.categories.length > 0 ? product.categories[0].name : 'Services',
      features: [
        "Professional Execution",
        "Dedicated Account Manager",
        "Premium Quality Deliverables"
      ],
      addons: variations.map(v => ({
        id: String(v.id),
        name: v.attributes.length > 0 ? v.attributes[0].option : `Variation ${v.id}`,
        price: parseFloat(v.price || '0')
      }))
    };

    return NextResponse.json(formattedProduct);

  } catch (error: any) {
    console.error("[WC_API_ERROR]", error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch product from WooCommerce' }, { status: 500 });
  }
}
