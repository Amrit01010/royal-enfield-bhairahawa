# `src/components/` instructions
- Components should be reusable and focused; keep data access and business rules in `lib` where practical.
- Respect Server/Client Component boundaries. Add `'use client'` only when needed.
- Prefer composition of existing UI primitives over bespoke duplicate controls.
- Keep feature-specific components under their feature directory and generic components under `shared` or `ui`.
