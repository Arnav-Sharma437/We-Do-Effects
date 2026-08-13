import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getDb } from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const db = await getDb();
    const items = await db.collection('content_about').find({}).sort({ order: 1 }).toArray();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const items = await request.json();
    const db = await getDb();
    
    // Replace all
    await db.collection('content_about').deleteMany({});
    if (items.length > 0) {
      await db.collection('content_about').insertMany(items);
    }
    
    revalidatePath('/about');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
