# Development Standards

## Package manager

Use **pnpm only** (pnpm workspaces). Do not use npm, Yarn, or Bun.

## Branch workflow

- Never implement feature work directly on `main`.
- Use focused branches (e.g. `feat/...`, `fix/...`, `docs/...`).
- Keep each branch and pull request limited to one coherent purpose.

## Required checks

Before presenting work as complete, run and pass:

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

For database changes also run:

```bash
pnpm --filter @nova/database prisma:validate
pnpm --filter @nova/database prisma:generate
```

Do not claim completion when any required check fails. Report the exact failure.

## Formatting

`pnpm format` runs Prettier. `pnpm-lock.yaml`, build output, and generated Prisma
code are excluded via `.prettierignore` so formatting never rewrites them.

Note: some pre-existing repository files are not yet Prettier-clean. A repo-wide
formatting normalization should be done as its own dedicated change, not bundled
into feature work, so diffs stay focused.

## TypeScript

- All packages use TypeScript with strict settings; do not weaken strictness.
- Avoid `any` to bypass type errors unless narrowly justified and documented.
- Do not disable lint rules merely to make tests pass.

## Testing

- Unit tests must **not** require a live Neon connection. Mock `@nova/database`
  where a service depends on it (see `apps/api/src/health/*.spec.ts`).
- The end-to-end suite (`pnpm --filter @nova/api test:e2e`) boots the full
  application and therefore requires a valid environment; it is not part of the
  default `pnpm test`.

## Environment & secrets

- Real `.env` files are git-ignored and must never be committed.
- Only `.env.example` files (placeholders) belong in Git.
- Never commit database URLs, API keys, tokens, credentials, or recovery codes.
- Never log `DATABASE_URL` or print full environment objects.
- Production must not start using fallback secrets or fallback database
  credentials; missing mandatory variables must fail startup clearly.
- Confine direct `process.env` access to the configuration boundary
  (`src/config`) and the database client.

## API rules

- Preserve the `/api/v1` global prefix.
- Keep CORS restricted to configured trusted origins.
- Validate all request input via DTOs and the global `ValidationPipe`.
- Do not expose stack traces, secrets, database internals, or private
  identifiers to clients.
- Do not add authentication, uploads, payments, or public form handling without
  a separate approved security design.

## Database safety

- Local development uses the Neon **development** branch.
- Do not run migrations against production, reset/truncate/seed production,
  modify production connection strings, or make destructive schema changes
  without explicit approval.
- Do not run `prisma migrate reset`.
- Before proposing a migration, document: the schema change; backward
  compatibility; data-migration impact; rollback strategy; deployment order.

## Git safety

- Do not force-push, rewrite shared history, bypass CI, or disable security
  checks.
- Use conventional commit messages, e.g. `feat(api): ...`, `fix(database): ...`,
  `docs: ...`, `chore(ci): ...`.

## Dependency policy

Before adding a dependency: justify the need, check maintenance/security, prefer
small established packages, avoid duplicate functionality, and update the
lockfile with pnpm. Avoid broad dependency upgrades during unrelated feature
work.

## Scope control

Implement only the approved milestone. Do not silently add authentication,
admin dashboards, analytics/trackers, cookies, mailing-list integrations,
third-party embeds, payment systems, or data collection. When a requirement is
ambiguous or security-sensitive, stop and ask.
