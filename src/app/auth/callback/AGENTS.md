# `src/app/auth/callback/` instructions
- `route.ts` handles OAuth callback/session exchange.
- Preserve the one-day session marker behavior and profile upsert unless intentionally changing authentication semantics.
- Validate/contain redirect targets; do not introduce open redirects.
