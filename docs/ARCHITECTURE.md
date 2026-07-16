# Architecture

## Monorepo layout

```text
apps/
├── web       # Next.js 16 public website (a platform client)
├── api       # NestJS 11 API, global prefix /api/v1
└── worker    # Background worker foundation (placeholder)

packages/
└── database  # Prisma 7 schema, generated client, shared database client
```

Tooling: pnpm workspaces + Turborepo. Node.js 24. TypeScript across all
packages.

### Planned (not yet created)

`packages/auth`, `packages/authorization`, `packages/integrations`,
`packages/shared-types`, `packages/validation`, `packages/api-contracts`,
`packages/observability`, `packages/config`, `packages/ui`.

These are intentionally **not** scaffolded yet. They will be added when a mission
needs them, to avoid empty speculative abstractions.

## Dependency boundaries

- Application packages (`apps/*`) may import from shared packages (`packages/*`).
- Shared packages must **not** import from application packages.
- No circular workspace dependencies.
- The **web app must not access Prisma or the database directly.** It talks to
  the API over HTTP using `NEXT_PUBLIC_API_URL`.
- Future native applications use the **API**, not the database package.
- The database package must not contain browser-facing code.
- API contracts and shared types should remain independent of NestJS
  controllers where practical.

## Shared database package (`@nova/database`)

The database package is the single, standard entry point for Prisma access.

- Owns `prisma/schema.prisma` and Prisma client generation
  (`generated/prisma`, git-ignored).
- Exports a ready-to-use `database` client plus a `DatabaseClient` type, so
  consumers do not import generated Prisma internals by path.
- Caches a single `PrismaClient` on `globalThis` outside production to avoid
  exhausting the connection pool during hot reload.
- Throws immediately if `DATABASE_URL` is absent — no fallback/placeholder URL.
- Uses the Neon serverless adapter (`@prisma/adapter-neon`). Connections are
  lazy: constructing the client does not open a connection.
- `DIRECT_URL` is used only by Prisma migrations (via `prisma.config.ts`).

Consumers import from the package root:

```ts
import { database } from "@nova/database";
```

## API foundation (`@nova/api`)

- Global prefix `/api/v1`.
- Environment is validated at boot with Zod (`src/config/environment.ts`);
  invalid/missing configuration fails startup with a clear message.
- Configuration is read through `@nestjs/config` `ConfigService`. Direct
  `process.env` access is confined to the configuration and database boundaries.
- A global `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, `transform`)
  is registered for future request DTOs.
- CORS is restricted to the configured `WEB_ORIGIN`.
- `enableShutdownHooks()` plus `DatabaseLifecycleService` disconnect the Prisma
  client on shutdown for graceful termination.

### Health endpoints

- `GET /api/v1/health` — liveness. Returns a small, stable
  `{ status: 'ok', service: 'nova-systems-lab-api' }` and does **not** touch the
  database.
- `GET /api/v1/health/database` — readiness. Runs `SELECT 1`; returns
  `{ status: 'ok', database: 'up' }` on success or `503` with
  `{ status: 'error', database: 'down' }` on failure.

Health responses never expose `DATABASE_URL`, credentials, hostnames,
environment contents, stack traces, or filesystem paths. Failures log only the
error class name.

## Web application (`@nova/web`)

Next.js 16 (App Router, Turbopack) + React 19 + Tailwind CSS v4. TypeScript
strict. Unit tests run on Vitest + Testing Library (`pnpm --filter @nova/web test`).

Boundaries:

- The web app is **one client of the platform**, not the platform. It must not
  access Prisma or `@nova/database`, and must not become the home of business
  logic — that belongs behind the API so native clients can reuse it.
- All browser-facing API calls go through `NEXT_PUBLIC_API_URL`. Never hardcode
  Render URLs or production endpoints in components.
- Server components by default; `"use client"` only for genuine interactivity.

Frontend structure:

```text
apps/web/src
├── app/          # App Router routes, root layout, globals.css (design tokens)
├── components/ui # Shared primitives (Container, Button, StatusBadge)
└── lib/          # Small framework-agnostic helpers
```

Design system:

- Design tokens are CSS variables in `app/globals.css`, exposed to Tailwind via
  `@theme inline`. Theming is dark-first with full light support and a
  `[data-theme]` override for a future toggle.
- Components use **semantic tokens** (`bg-surface-2`, `text-fg-muted`) rather
  than `dark:` variants, so both themes stay correct without duplicated classes.
- `packages/ui` is intentionally not created yet: the primitives have exactly one
  consumer. Extract a shared package when a second client genuinely needs them.
- See `design/DESIGN_TOKENS.md` and `design/UI_UX_FOUNDATION.md`.

## Data model scope

The schema is intentionally minimal. The only model is `SystemHealthCheck`, a
proof-of-connectivity table retained for the health/foundation phase. Tables for
users, accounts, sessions, roles, permissions, projects, releases, badges,
Discord/GitHub data, downloads, documentation, and analytics are **deferred** to
future missions with dedicated data-model design.

## Deferred until a real need

No microservices, message queue, Redis/Key Value, object storage, transactional
email, Sentry, or Docker are introduced at the foundation stage.
