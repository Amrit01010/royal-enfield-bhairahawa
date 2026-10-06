# `supabase/migrations/` instructions
- Add schema changes as new timestamped SQL migrations.
- Make migrations explicit, reviewable, and safe to run in order.
- When changing tables, policies, columns, or constraints used by application code, update corresponding Supabase types and affected actions/queries.
- Do not put application TypeScript in this directory.
