// src/lib/auth/session.ts
import { cookies } from 'next/headers';
import { AUTH_CONFIG } from '@/lib/constants/auth';
import { auth } from '@/lib/auth/server';
import { sql } from '@/lib/db';
import type { Profile } from '@/lib/types/db';

/**
 * Marks the session start time in a cookie using the request cookie store.
 */
export async function setSessionStartCookieStore() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_CONFIG.SESSION_STARTED_AT_COOKIE, Date.now().toString(), {
    maxAge: AUTH_CONFIG.SESSION_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

/**
 * Checks if the 1-day session marker is present and not expired.
 */
export async function isSessionValid(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionStartedAt = cookieStore.get(
    AUTH_CONFIG.SESSION_STARTED_AT_COOKIE
  );

  if (!sessionStartedAt) {
    return true; // If no legacy marker, trust Neon Auth session
  }

  const startedAt = parseInt(sessionStartedAt.value, 10);
  if (isNaN(startedAt)) {
    return true;
  }

  const now = Date.now();
  const maxAgeMs = AUTH_CONFIG.SESSION_MAX_AGE * 1000;

  return now - startedAt < maxAgeMs;
}

/**
 * Marks the session start time in a cookie header on a Response object.
 */
export function setSessionStartCookie(response: Response) {
  const now = Date.now().toString();
  const cookieHeader = `${AUTH_CONFIG.SESSION_STARTED_AT_COOKIE}=${now}; Path=/; Max-Age=${AUTH_CONFIG.SESSION_MAX_AGE}; SameSite=Lax${
    process.env.NODE_ENV === 'production' ? '; Secure' : ''
  }`;

  const existing = response.headers.get('Set-Cookie');
  if (existing) {
    response.headers.append('Set-Cookie', cookieHeader);
  } else {
    response.headers.set('Set-Cookie', cookieHeader);
  }
}

/**
 * Clears the session start cookie on a Response object.
 */
export function clearSessionStartCookie(response: Response) {
  const cookieHeader = `${AUTH_CONFIG.SESSION_STARTED_AT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
  response.headers.append('Set-Cookie', cookieHeader);
}

/**
 * Gets the current authenticated user, enforcing session limits.
 * Returns null if no valid session exists.
 */
export async function getCurrentUser() {
  try {
    const { data: session } = await auth.getSession();
    if (!session?.user) {
      return null;
    }

    const valid = await isSessionValid();
    if (!valid) {
      // 1-day limit expired
      return null;
    }

    const rawUser = session.user as typeof session.user & {
      created_at?: string | Date;
    };

    return {
      ...session.user,
      created_at: rawUser.createdAt || rawUser.created_at,
    };
  } catch (err) {
    console.error('Error fetching current user:', err);
    return null;
  }
}

/**
 * Gets the current user's profile data from Neon Postgres.
 */
export async function getCurrentUserProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    const rows = await sql`
      SELECT id, email, full_name, phone, avatar_url, created_at, updated_at
      FROM public.profiles
      WHERE id = ${user.id}
      LIMIT 1
    `;

    if (rows.length > 0) {
      return rows[0] as Profile;
    }

    const inserted = await sql`
      INSERT INTO public.profiles (id, email, full_name, avatar_url)
      VALUES (${user.id}, ${user.email}, ${user.name || null}, ${user.image || null})
      ON CONFLICT (id) DO UPDATE
      SET email = EXCLUDED.email
      RETURNING id, email, full_name, phone, avatar_url, created_at, updated_at
    `;
    return (inserted[0] as Profile) ?? null;
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return null;
  }
}
