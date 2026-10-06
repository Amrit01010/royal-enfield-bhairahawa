# `src/app/` instructions
- Use Next.js App Router conventions: `page.tsx` for pages, `layout.tsx` for shared layouts, and `route.ts` for HTTP route handlers.
- Keep route components focused on composition and request/route concerns; delegate reusable UI and domain behavior to `components` and `lib`.
- Preserve metadata exports and the current server/client boundary.
- Route params and `searchParams` follow the current Next.js 16 async API shape used in this project.
