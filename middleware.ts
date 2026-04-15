// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Only set cookie if not already present (respect manual override)
  if (!request.cookies.get('cc-country')) {
    // Vercel sets x-vercel-ip-country header automatically (geo API removed in Next.js 15+)
    const country = request.headers.get('x-vercel-ip-country') || 'JM';
    response.cookies.set('cc-country', country, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  // Run on all pages except API routes, static files, and Next.js internals
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|products/).*)'],
};
