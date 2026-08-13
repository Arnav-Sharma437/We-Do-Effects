import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await getDb();
    const data = await request.json();
    
    await db.collection('orders').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: data.status, updatedAt: new Date().toISOString() } }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
