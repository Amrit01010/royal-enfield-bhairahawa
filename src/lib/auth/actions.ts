// src/lib/auth/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { auth } from '@/lib/auth/server';
import { sql } from '@/lib/db';
import { AUTH_CONFIG, AUTH_ERRORS } from '@/lib/constants/auth';
import { setSessionStartCookieStore } from './session';

type AuthState = {
  success: boolean;
  error?: string;
  field?: string;
};

/**
 * Email/password sign in
 */
export async function signInWithEmail(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;

  // Validation
  if (!email || !password) {
    return { success: false, error: AUTH_ERRORS.INVALID_CREDENTIALS };
  }

  try {
    const { data, error } = await auth.signIn.email({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error:
          error.message?.includes('Invalid') || error.message?.includes('credentials')
            ? AUTH_ERRORS.INVALID_CREDENTIALS
            : error.message || AUTH_ERRORS.INVALID_CREDENTIALS,
      };
    }

    if (!data?.user) {
      return { success: false, error: AUTH_ERRORS.INVALID_CREDENTIALS };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : AUTH_ERRORS.INVALID_CREDENTIALS;
    return {
      success: false,
      error: message,
    };
  }

  // Set the 1-day session marker
  await setSessionStartCookieStore();

  revalidatePath('/', 'layout');
  redirect(AUTH_CONFIG.DEFAULT_REDIRECT);
}

/**
 * Email/password sign up
 */
export async function signUpWithEmail(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;
  const fullName = (formData.get('fullName') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim();

  // Validation
  if (!email || !password || !fullName) {
    return {
      success: false,
      error: 'Please fill in all required fields',
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: AUTH_ERRORS.WEAK_PASSWORD,
      field: 'password',
    };
  }

  try {
    const { data, error } = await auth.signUp.email({
      email,
      password,
      name: fullName,
    });

    if (error) {
      if (
        error.message?.includes('already exists') ||
        error.message?.includes('already registered')
      ) {
        return { success: false, error: AUTH_ERRORS.EMAIL_TAKEN, field: 'email' };
      }
      if (error.message?.includes('Password') || error.message?.includes('password')) {
        return { success: false, error: AUTH_ERRORS.WEAK_PASSWORD, field: 'password' };
      }
      return { success: false, error: error.message || AUTH_ERRORS.GENERIC };
    }

    // Upsert into public.profiles
    if (data?.user?.id) {
      await sql`
        INSERT INTO public.profiles (id, email, full_name, phone)
        VALUES (${data.user.id}, ${email}, ${fullName}, ${phone || null})
        ON CONFLICT (id) DO UPDATE
        SET email = EXCLUDED.email,
            full_name = EXCLUDED.full_name,
            phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
            updated_at = now()
      `;
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : AUTH_ERRORS.GENERIC;
    return {
      success: false,
      error: message,
    };
  }

  // Set the 1-day session marker cookie
  await setSessionStartCookieStore();

  revalidatePath('/', 'layout');
  redirect(AUTH_CONFIG.DEFAULT_REDIRECT);
}

/**
 * Sign out - clears Neon Auth session and 1-day marker
 */
export async function signOut(): Promise<void> {
  try {
    await auth.signOut();
  } catch (err) {
    console.error('Error during signOut:', err);
  }

  // Clear the session start cookie
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_CONFIG.SESSION_STARTED_AT_COOKIE);

  revalidatePath('/', 'layout');
  redirect(AUTH_CONFIG.LOGIN_ROUTE);
}

/**
 * Google OAuth sign in
 */
export async function signInWithGoogle(): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const result = await auth.signIn.social({
    provider: 'google',
    callbackURL: `${appUrl}${AUTH_CONFIG.DEFAULT_REDIRECT}`,
  });

  if (result && 'url' in result && typeof result.url === 'string') {
    redirect(result.url);
  }
}
