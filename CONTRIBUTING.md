# Contributing to Nova Systems Lab Platform

Thank you for your interest in contributing.

This project is currently maintained under controlled development. Contributions may be accepted through approved issues and pull requests. Access to production infrastructure, secrets, billing, DNS, databases, and deployment administration is not required for normal contribution.

## Before contributing

1. Read `README.md`, `CLAUDE.md`, `SECURITY.md`, and this guide.
2. Check existing issues and pull requests to avoid duplicate work.
3. For substantial changes, open or request an issue before implementation.
4. Do not begin security-sensitive or architectural work without approval.

## Development setup

Requirements:

- Node.js 24
- pnpm 11
- Git

Install dependencies:

```bash
pnpm install --frozen-lockfile
```

Use the safe local environment examples in:

- `apps/web/.env.example`
- `apps/api/.env.example`
- `apps/worker/.env.example`
- `packages/database/.env.example`

Create ignored local environment files as needed. Never commit real credentials.

## Branch naming

Create a branch from the latest `main`:

```bash
git checkout main
git pull --ff-only
git checkout -b feat/short-description
```

Recommended prefixes:

- `feat/` — new functionality
- `fix/` — bug fix
- `docs/` — documentation
- `test/` — test changes
- `refactor/` — behavior-preserving refactor
- `chore/` — tooling or maintenance

Keep branches focused and short-lived.

## Coding expectations

- Use TypeScript.
- Follow the existing architecture and formatting.
- Avoid unrelated refactors.
- Do not hardcode secrets or production URLs.
- Keep accessibility and responsive design in scope for web changes.
- Validate API input and preserve secure defaults.
- Add or update tests when behavior changes.
- Avoid new dependencies unless justified.
- Do not modify production infrastructure without explicit approval.

## Required validation

Before opening a pull request, run:

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

All checks must pass.

## Commit messages

Use concise, descriptive commit messages. Conventional Commit style is preferred:

```text
feat(web): add responsive navigation
fix(api): reject invalid origin configuration
docs: clarify local setup
```

Do not include secrets, tokens, personal data, or generated credential files in commits.

## Pull requests

A pull request should include:

- a clear title;
- the problem being solved;
- a summary of the implementation;
- screenshots for visible UI changes;
- testing performed;
- known limitations;
- migration or deployment notes;
- security and privacy considerations, where relevant.

Keep pull requests small enough to review meaningfully.

## Review and merging

Pull requests target `main`.

Merging requires:

- successful required status checks;
- resolution of review comments;
- approval when reviewers are available;
- an up-to-date branch where required by repository rules.

Do not bypass branch protection, force-push to shared branches, or merge failing code.

## Security issues

Do not open a public issue for a suspected vulnerability. Follow `SECURITY.md` and report it privately to:

**security@novasystemslab.org**

## Database changes

Schema changes require special care. A database pull request must describe:

- the schema change;
- compatibility impact;
- migration steps;
- data implications;
- rollback plan;
- deployment order.

Never run a migration against production without explicit approval.

## Documentation

Update relevant documentation when behavior, configuration, commands, architecture, or contributor workflow changes.

## Conduct

Participation is governed by `CODE_OF_CONDUCT.md`.
