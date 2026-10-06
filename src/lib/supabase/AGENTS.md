# `src/lib/supabase/` instructions
- Keep Supabase client creation separated by execution context: browser/client, server, and middleware.
- `types.ts` is the database type contract; update it when the database schema changes.
- Never expose privileged Supabase credentials to browser code.
- Middleware must remain compatible with Next.js request/cookie semantics.
