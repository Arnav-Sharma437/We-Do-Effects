import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except login) and /api/admin routes (except login)
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAdminApiRoute = pathname.startsWith('/api/admin') && pathname !== '/api/admin/login';

  if (isAdminRoute || isAdminApiRoute) {
    const token = request.cookies.get('admin_token')?.value;
    const payload = token ? await verifyToken(token) : null;

    if (!payload || !payload.isAdmin) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
