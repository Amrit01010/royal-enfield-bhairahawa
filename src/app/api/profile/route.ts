// src/app/api/profile/route.ts
import { NextResponse } from 'next/server';
import { getCurrentUserProfile } from '@/lib/auth/session';

export async function GET() {
  try {
    const profile = await getCurrentUserProfile();
    return NextResponse.json({ profile });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ profile: null, error: message }, { status: 500 });
  }
}
