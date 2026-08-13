import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const db = await getDb();
    const data = await request.json();
    
    delete data._id; // Prevent updating immutable field

    await db.collection('products').updateOne(
      { slug },
      { $set: data }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const db = await getDb();
    
    await db.collection('products').deleteOne({ slug });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
