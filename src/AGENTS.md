# `src/` instructions
- This is the application source root. Keep framework entry points in `app`, reusable UI in `components`, client hooks in `hooks`, configuration in `config`, and domain/integration logic in `lib`.
- Prefer the existing `@/*` alias and avoid deep relative imports across sibling areas.
- Do not move server-only code into client-oriented directories.
