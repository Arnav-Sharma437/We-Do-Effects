import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const db = await getDb();
    const data = await request.json();
    
    delete data._id; // Prevent updating immutable field

    if (!data.slug && data.name) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    await db.collection('products').updateOne(
      { $or: [{ slug }, { id: slug }] },
      { $set: data }
    );
    
    // Revalidate cached paths
    revalidatePath('/services');
    revalidatePath(`/services/${slug}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const db = await getDb();
    
    await db.collection('products').deleteOne({ $or: [{ slug }, { id: slug }] });
    
    // Revalidate cached paths
    revalidatePath('/services');
    revalidatePath(`/services/${slug}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
