import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { Product } from '@/data/products';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, company, email, phone, notes, items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }

    const db = await getDb();
    const productsCollection = db.collection<Product>('products');

    // SERVER-SIDE PRICING VALIDATION
    let serverSubtotal = 0;
    
    for (const item of items) {
      const realProduct = await productsCollection.findOne({ slug: item.product.slug });
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

    const depositAmount = serverSubtotal * 0.5; // 50% deposit
    const orderId = `WDE-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const now = new Date();

    // 1. Create/Update Customer Record
    const customersCollection = db.collection('customers');
    const customerRecord = await customersCollection.findOneAndUpdate(
      { email },
      { 
        $set: {
          name: `${firstName} ${lastName}`.trim(),
          phone,
          company: company || '',
          updatedAt: now
        },
        $setOnInsert: { createdAt: now }
      },
      { upsert: true, returnDocument: 'after' }
    );

    // 2. Create Order Record
    const ordersCollection = db.collection('orders');
    await ordersCollection.insertOne({
      orderId,
      customerId: customerRecord?._id,
      customerDetails: { firstName, lastName, email, phone, company },
      items,
      subtotal: serverSubtotal,
      deposit: depositAmount,
      total: serverSubtotal,
      status: 'pending',
      paymentStatus: 'pending',
      notes: notes || '',
      createdAt: now,
      updatedAt: now
    });

    console.info(`[CUSTOM ECOMMERCE] Created Order ${orderId} in MongoDB for ${email} | Total: £${serverSubtotal}`);
    
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
