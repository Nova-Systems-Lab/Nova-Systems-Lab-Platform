# Nova Systems Lab Platform

Official platform for Nova Systems Lab, including the public website, contributor
portal, shared API, background integrations, and future native application
support.

Nova Systems Lab is an independent, founder-led open-source software
organization focused on systems tools, developer utilities, platform
integration, and experimental runtime technologies.

> **Open systems. Better tools. Independent software.**

Nova Systems Lab is **not** a registered company, nonprofit, NGO, Section 8
company, or otherwise incorporated organization. Do not add claims suggesting
otherwise.

## Monorepo structure

```text
apps/
├── web       # Next.js public website (one client of the platform)
├── api       # NestJS API (shared platform backend, /api/v1)
└── worker    # Background worker (placeholder foundation)

packages/
└── database  # Prisma schema, generated client, and the shared database client
```

Additional shared packages (`auth`, `authorization`, `integrations`,
`shared-types`, `validation`, `api-contracts`, `observability`, `config`, `ui`)
are planned but **not yet created**. See `docs/ARCHITECTURE.md`.

Core business logic lives behind the API and shared packages so that current and
future clients (website, native Windows/Android apps) reuse it. The web app must
never access the database directly.

## Prerequisites

- **Node.js 24** (see `.node-version`; `>=24.17.0 <25`)
- **pnpm 11** (this repo uses pnpm workspaces only — do not use npm, Yarn, or Bun)
- Access to a **Neon development branch** PostgreSQL database for local API work

Enable pnpm via Corepack if needed:

```bash
corepack enable
corepack prepare pnpm@11.13.0 --activate
```

## Install

```bash
pnpm install
```

## Environment setup

Environment files are per-app and are **git-ignored**. Copy the examples and
fill in real values locally:

```bash
cp apps/api/.env.example        apps/api/.env
cp packages/database/.env.example packages/database/.env
cp apps/web/.env.example        apps/web/.env.local
```

API variables (`apps/api/.env`):

| Variable       | Required | Example                                                        | Notes                                             |
| -------------- | -------- | -------------------------------------------------------------- | ------------------------------------------------- |
| `NODE_ENV`     | no       | `development`                                                  | `development` \| `test` \| `production`           |
| `PORT`         | no       | `4000`                                                         | Defaults to `4000`; local API is `4000`           |
| `DATABASE_URL` | **yes**  | `postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require`     | Neon **pooled** URL; use the Neon **dev** branch  |
| `WEB_ORIGIN`   | **yes**  | `http://localhost:3000`                                        | Trusted browser origin for CORS                   |

Database package variables (`packages/database/.env`):

| Variable       | Required | Notes                                                    |
| -------------- | -------- | -------------------------------------------------------- |
| `DATABASE_URL` | **yes**  | Neon **pooled** URL used by the Prisma runtime client    |
| `DIRECT_URL`   | **yes**  | Neon **direct** URL used only by Prisma migrations       |

Missing mandatory variables cause a clear startup failure — the API does not
fall back to placeholder secrets or database credentials.

> **Never commit real `.env` files, database URLs, API keys, or secrets.** Only
> `.env.example` files (placeholders) belong in Git.

## Prisma / database workflow

The `@nova/database` package owns the Prisma schema and client generation. Run
these from the repo root:

```bash
# Validate the Prisma schema
pnpm --filter @nova/database prisma:validate

# Generate the Prisma client
pnpm --filter @nova/database prisma:generate

# Create/apply a local migration against the Neon DEV branch (never production)
pnpm --filter @nova/database prisma:migrate
```

Do not run migrations, resets, or destructive commands against production.

## Development commands

```bash
pnpm dev        # run all app dev servers (turbo)
pnpm lint       # eslint across the workspace
pnpm typecheck  # tsc --noEmit across the workspace
pnpm test       # unit tests (turbo); no live database required
pnpm build      # build all packages and apps
pnpm format     # prettier --write (lockfile & generated code are ignored)
```

Run the API alone:

```bash
pnpm --filter @nova/database build   # build the shared client first
pnpm --filter @nova/api start:dev    # watch mode
```

## Health endpoints

Once the API is running (default `http://localhost:4000`):

| Endpoint                        | Purpose                        | Success response                                        |
| ------------------------------- | ------------------------------ | ------------------------------------------------------- |
| `GET /api/v1/health`            | Liveness (no database access)  | `{ "status": "ok", "service": "nova-systems-lab-api" }` |
| `GET /api/v1/health/database`   | Database connectivity readiness| `{ "status": "ok", "database": "up" }` (else `503`)     |

Health endpoints never expose connection strings, credentials, hostnames,
environment dumps, or stack traces.

## Documentation

- `docs/MISSION_STATUS.md` — current mission status and next steps
- `docs/PROJECT_CONTEXT.md` — what Nova Systems Lab is and public positioning
- `docs/ARCHITECTURE.md` — monorepo layout and architectural boundaries
- `docs/DEVELOPMENT_STANDARDS.md` — workflow, checks, and security rules
