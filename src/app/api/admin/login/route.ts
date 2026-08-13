import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const correctPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Default fallback

    if (password !== correctPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = await signToken({ isAdmin: true, timestamp: Date.now() });

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
