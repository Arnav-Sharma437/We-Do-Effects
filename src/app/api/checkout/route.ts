import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/data/products';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, company, email, phone, notes, items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }

    // SERVER-SIDE PRICING VALIDATION
    let serverSubtotal = 0;
    
    for (const item of items) {
      const realProduct = getProductBySlug(item.product.slug);
      if (!realProduct) {
        return NextResponse.json({ error: `Product not found: ${item.product.name}` }, { status: 400 });
      }

      const itemBasePrice = realProduct.price;
      let addonTotal = 0;

      // Validate addons
      if (item.selectedAddons && Array.isArray(item.selectedAddons)) {
        for (const addon of item.selectedAddons) {
          const realAddon = realProduct.addons?.find(a => a.id === addon.id);
          if (!realAddon) {
            return NextResponse.json({ error: `Invalid add-on selected: ${addon.name}` }, { status: 400 });
          }
          addonTotal += realAddon.price;
        }
      }

      serverSubtotal += (itemBasePrice + addonTotal) * (item.quantity || 1);
    }

    // Custom Order Processing Logic goes here in the future
    // e.g. Saving to custom DB, sending confirmation email via Resend, connecting to Stripe

    const orderId = `WDE-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // For now, we simulate a successful local order
    console.info(`[CUSTOM ECOMMERCE] Received Order ${orderId} for ${email} | Validated Total: £${serverSubtotal}`);
    
    // Fake processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ success: true, orderId });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[ORDER_ERROR]", error);
    return NextResponse.json(
      { error: 'Failed to process order.' }, 
      { status: 500 }
    );
  }
}
