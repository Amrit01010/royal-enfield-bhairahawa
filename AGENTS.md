<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project instructions

## Stack
- Next.js 16.3.4 App Router with React 19 and TypeScript.
- Tailwind CSS v4 via `@tailwindcss/postcss`.
- Supabase SSR/Auth for persistence and authentication.
- ImageKit for application image delivery/optimization.
- Bun 1.4.0 is the declared package manager.
- Use the `@/*` alias for imports from `src/*`.

## Commands
- Development: `bun run dev`
- Lint: `bun run lint`
- Production build: `bun run build`
- Production server: `bun run start`

## General coding rules
- Keep TypeScript strict and preserve the existing `tsconfig.json` conventions.
- Prefer Server Components by default; add `'use client'` only when browser state, effects, event handlers, or client-only APIs require it.
- Keep server-only logic out of Client Components.
- Reuse existing components, hooks, constants, utilities, and types before creating duplicates.
- Follow the existing dark Royal Enfield visual language: asphalt/charcoal surfaces, crimson accent, Oswald headings, Inter body text, compact borders, and restrained animation.
- Use semantic HTML, accessible labels, keyboard interaction, and meaningful image `alt` text.
- Do not introduce a new dependency when an existing package or local utility already solves the problem.
- Do not hard-code domain data in route components when it belongs in `src/lib/constants` or `src/lib/types`.
- Do not expose Supabase service-role credentials or other secrets to the client.
- Validate untrusted form input on the server even if the client also validates it.
- Before changing Next.js behavior, consult the installed Next.js docs mentioned above.

## Architecture
- `src/app`: route/page/layout and route-handler entry points.
- `src/components`: reusable UI and feature components.
- `src/config`: site-wide configuration.
- `src/hooks`: React client hooks.
- `src/lib`: domain logic, integrations, server actions, constants, and shared types.
- `supabase/migrations`: database schema changes; migrations are append-only.

## Verification
For meaningful changes, run lint and build. If a change touches authentication, Supabase, Server Actions, routing, or migrations, verify the affected flow rather than relying only on TypeScript compilation.
