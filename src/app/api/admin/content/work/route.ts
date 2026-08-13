import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const items = await db.collection('content_work').find({}).sort({ order: 1 }).toArray();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const items = await request.json();
    const db = await getDb();
    
    // Replace all to handle reordering easily
    await db.collection('content_work').deleteMany({});
    if (items.length > 0) {
      await db.collection('content_work').insertMany(items);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
