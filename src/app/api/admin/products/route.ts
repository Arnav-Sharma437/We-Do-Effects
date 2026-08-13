import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { Product } from '@/data/products';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const db = await getDb();
    const products = await db.collection('products').find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDb();
    const data = await request.json();
    
    // Auto-generate ID if missing
    if (!data.id) {
      data.id = `prod_${Date.now()}`;
    }
    
    await db.collection('products').insertOne(data);
    
    // Revalidate cached paths
    revalidatePath('/services');
    revalidatePath(`/services/${data.slug}`);
    
    return NextResponse.json({ success: true, product: data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
