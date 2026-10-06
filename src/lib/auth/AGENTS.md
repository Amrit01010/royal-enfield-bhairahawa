# `src/lib/auth/` instructions
- Centralize authentication actions, session checks, and auth context here.
- Server Actions must remain server-only and use the existing Supabase server client.
- Preserve the 24-hour session-marker behavior unless authentication requirements change.
- Treat `old_act.ts` as legacy code; do not build new features on it without an explicit reason.
