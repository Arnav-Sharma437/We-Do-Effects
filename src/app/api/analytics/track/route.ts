import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const db = await getDb();
    
    // Fire and forget event logging
    await db.collection('analytics_events').insertOne({
      ...data,
      createdAt: new Date().toISOString()
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}
