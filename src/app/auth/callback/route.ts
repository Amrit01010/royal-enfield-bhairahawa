// src/app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { AUTH_CONFIG } from '@/lib/constants/auth';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const next = searchParams.get('next') ?? AUTH_CONFIG.DEFAULT_REDIRECT;
  const forwardedHost = request.headers.get('x-forwarded-host');

  const redirectUrl = forwardedHost
    ? `https://${forwardedHost}${next}`
    : `${origin}${next}`;

  return NextResponse.redirect(redirectUrl);
}
