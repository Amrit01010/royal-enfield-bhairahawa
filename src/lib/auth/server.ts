// src/lib/auth/server.ts
import { createNeonAuth } from '@neon/auth/next/server';

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const secret = process.env.NEON_AUTH_COOKIE_SECRET;

if (!baseUrl) {
  throw new Error('NEON_AUTH_BASE_URL environment variable is required');
}

export const auth = createNeonAuth({
  baseUrl,
  cookies: {
    secret: secret || 'default_secret_for_neon_auth_cookie_min_32_characters',
  },
});
