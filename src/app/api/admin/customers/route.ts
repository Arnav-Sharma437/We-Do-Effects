import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const customers = await db.collection('customers').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}
