// src/proxy.ts
import { type NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { AUTH_CONFIG } from '@/lib/constants/auth';

const authMiddleware = auth.middleware({
  loginUrl: AUTH_CONFIG.LOGIN_ROUTE,
  publicRoutes: [
    '/',
    '/models',
    '/accessories',
    '/rides',
    '/book',
    '/cart',
    '/contact',
    '/about',
    '/privacy',
    '/terms',
    '/login',
    '/register',
    '/auth',
    '/api',
  ],
});

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Execute Neon Auth middleware
  const response = await authMiddleware(request);

  // Check if session token exists
  const hasSessionToken =
    request.cookies.get('__Secure-neon-auth.session_token') ||
    request.cookies.get('neon-auth.session_token') ||
    request.cookies.get('__Secure-neon-auth.local.session_data');

  if (
    hasSessionToken &&
    (pathname === AUTH_CONFIG.LOGIN_ROUTE ||
      pathname === AUTH_CONFIG.REGISTER_ROUTE)
  ) {
    return NextResponse.redirect(
      new URL(AUTH_CONFIG.DEFAULT_REDIRECT, request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
