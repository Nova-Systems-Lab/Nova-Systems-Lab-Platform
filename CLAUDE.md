# CLAUDE.md

# Nova Systems Lab Platform — Claude Code Instructions

## Purpose

This repository contains the Nova Systems Lab platform. Claude Code may implement approved development tasks, but must preserve the repository architecture, security boundaries, deployment model, and review workflow defined here.

## Repository structure

- `apps/web` — Next.js public website
- `apps/api` — NestJS API
- `apps/worker` — background worker
- `packages/database` — Prisma schema, generated client, and PostgreSQL integration
- `.github/workflows` — continuous integration
- `render.yaml` — Render Blueprint configuration
- `turbo.json` — Turborepo task and environment configuration

## Technology baseline

- Node.js 24
- pnpm workspaces
- Turborepo
- Next.js 16
- React 19
- NestJS 11
- Prisma 7
- PostgreSQL on Neon
- Render for web/API deployment
- Cloudflare for DNS and domain infrastructure

Do not replace core technologies or introduce an alternative framework without explicit approval.

## Package manager

Use `pnpm` only.

Do not use `npm install`, Yarn, Bun, or another package manager.

## Branch workflow

Never implement feature work directly on `main`.

Use a focused branch such as:

- `feat/website-foundation`
- `feat/homepage`
- `feat/about-page`
- `fix/mobile-navigation`
- `docs/contributor-guide`

Keep each branch and pull request limited to one coherent purpose.

## Required checks

Before presenting work as complete, run:

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

Do not claim completion when any required check fails. Report the exact failure and stop before making unrelated changes.

## Environment rules

Never commit:

- `.env`
- `.env.local`
- database URLs
- API keys
- service-account credentials
- private certificates
- access tokens
- recovery codes
- production secrets

Use `.env.example` files only for variable names and safe local examples.

Production website:

- `https://novasystemslab.org`

Production API:

- `https://api.novasystemslab.org/api/v1`

Local website:

- `http://localhost:3000`

Local API:

- `http://localhost:4000/api/v1`

Browser-facing API requests must use `NEXT_PUBLIC_API_URL`. Do not hardcode Render URLs or production endpoints in application components.

## Database safety

Local development must use the Neon development branch.

Do not:

- run migrations against production;
- reset, truncate, or seed production;
- modify production connection strings;
- expose database credentials;
- make destructive schema changes without explicit approval.

Before proposing a migration, explain:

1. the schema change;
2. whether it is backward compatible;
3. the data-migration impact;
4. the rollback strategy;
5. the deployment order.

## API rules

- Preserve the `/api/v1` global prefix.
- Keep CORS restricted to configured trusted origins.
- Validate environment variables.
- Validate all request input.
- Do not expose stack traces, secrets, database internals, or private identifiers.
- Use least-privilege access and secure defaults.
- Do not add authentication, uploads, payments, or public form handling without a separate approved security design.

## Web rules

- Use TypeScript.
- Prefer server components unless client-side behavior is genuinely needed.
- Keep components small and reusable.
- Maintain responsive behavior.
- Meet basic accessibility requirements:
  - semantic HTML;
  - keyboard access;
  - visible focus states;
  - appropriate labels;
  - meaningful alternative text;
  - sufficient contrast;
  - reduced-motion consideration.
- Avoid unnecessary animation and large client bundles.
- Add metadata and structured page titles.
- Do not hardcode organization contact details throughout components; centralize reusable content where practical.

## Design and branding

Use the approved Nova Systems Lab identity consistently.

Do not invent:

- legal status;
- registration claims;
- nonprofit status;
- partnerships;
- certifications;
- team members;
- project achievements;
- testimonials;
- statistics.

Use only approved public wording and assets.

## Dependency policy

Avoid adding dependencies when the platform or existing dependencies already provide the required capability.

Before adding a dependency:

1. explain why it is needed;
2. check maintenance and security implications;
3. prefer a small, established package;
4. avoid duplicate functionality;
5. update the lockfile with pnpm.

Do not perform broad dependency upgrades during an unrelated feature.

## Scope control

Implement only the approved milestone.

Do not silently add:

- authentication;
- admin dashboards;
- analytics trackers;
- cookies;
- mailing-list integrations;
- third-party embeds;
- payment systems;
- data collection;
- production infrastructure changes.

When a requirement is ambiguous or security-sensitive, stop and ask for a decision.

## Git and commit safety

Do not:

- force-push;
- rewrite shared history;
- delete branches belonging to others;
- commit generated secrets;
- bypass CI;
- disable security checks;
- change repository rules;
- edit production environment variables;
- deploy manually without approval.

Use clear conventional commit messages where practical, such as:

- `feat(web): add responsive site header`
- `fix(api): validate trusted origin`
- `docs: add contribution workflow`
- `chore(ci): update validation step`

## Completion report

For each completed task, provide:

1. summary of changes;
2. files changed;
3. commands run;
4. test results;
5. known limitations;
6. any manual steps still required;
7. security or deployment considerations.

## Current development phase

The first approved milestone is **Website Foundation**.

Initial scope:

- design tokens;
- typography;
- responsive site header;
- footer;
- homepage shell;
- metadata;
- favicon and approved brand assets;
- accessibility baseline;
- reusable section components.

Out of scope for this milestone:

- authentication;
- user accounts;
- admin panels;
- database-backed public features;
- uploads;
- payments;
- public form submission;
- analytics or tracking.
