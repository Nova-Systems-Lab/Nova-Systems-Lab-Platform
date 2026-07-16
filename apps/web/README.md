# @nova/web

The public Nova Systems Lab website. It is **one client of the platform**, not
the platform itself: it must not access the database directly, and business
logic belongs behind the API so future native clients can reuse it.

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict)
- Tailwind CSS v4, themed through CSS-variable design tokens
- Vitest + Testing Library for component tests

## Commands

Run from the repository root:

```bash
pnpm --filter @nova/web dev        # http://localhost:3000
pnpm --filter @nova/web lint
pnpm --filter @nova/web typecheck
pnpm --filter @nova/web test       # vitest run
pnpm --filter @nova/web test:watch
pnpm --filter @nova/web build
```

## Environment

Copy `.env.example` to `.env.local`. Browser-facing API calls must use
`NEXT_PUBLIC_API_URL` — never hardcode Render or production endpoints.

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

## Structure

```text
src
├── app/           # Routes, root layout, globals.css (design tokens)
├── components/ui  # Primitives: Container, Button, StatusBadge
└── lib/           # Small helpers
```

## Design system

Design tokens are CSS variables in `src/app/globals.css`, exposed to Tailwind
via `@theme inline`. Theming is **dark-first** with full light support; a
`[data-theme="light"|"dark"]` attribute overrides the OS preference so a theme
toggle can be added later without touching components.

**Use semantic tokens, not `dark:` variants:**

```tsx
// Correct — follows the active theme automatically
<div className="bg-surface-2 text-fg-muted border-border-subtle" />

// Wrong — duplicates theming in every component
<div className="bg-zinc-100 dark:bg-zinc-900" />
```

Before changing colours, read `docs/design/DESIGN_TOKENS.md` — every token pair
is contrast-measured. Design rules (accessibility, prohibited practices) are in
`docs/design/UI_UX_FOUNDATION.md`; page structure is in
`docs/design/WEB_INFORMATION_ARCHITECTURE.md`.

## Current state

`/` is a **foundation placeholder**, not the real homepage. The full site
structure is specified in `docs/design/WEB_INFORMATION_ARCHITECTURE.md` and is
built in later missions. Do not add routes, links, or copy that are not backed
by real content.
