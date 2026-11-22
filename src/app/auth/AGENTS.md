# `src/app/auth/` instructions
- Authentication route handlers must remain server-only.
- Keep OAuth/session exchange logic in the existing callback flow and reuse `lib/auth/server` and `lib/constants/auth`.
- Do not expose credentials, tokens, or service-role keys to client code.
