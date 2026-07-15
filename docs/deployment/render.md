# Render Deployment

Nova Systems Lab initially deploys two Render web services from the
monorepo:

- `nova-web` — Next.js public website and contributor interface
- `nova-api` — NestJS versioned backend API

Both services deploy in Render's Singapore region.

The background worker and Render Key Value instance will be added when
asynchronous integrations are implemented.

## External infrastructure

- PostgreSQL: Neon
- Domain and DNS: Cloudflare
- Object storage: Cloudflare R2, added later
- Organizational email: Google Workspace
- Transactional email: provider to be selected

## Required Render secrets

### nova-api

- `DATABASE_URL`: pooled Neon production connection string

Never commit production credentials to the repository.

## Health endpoint

Render monitors:

`GET /api/v1/health`

A healthy response confirms that the API is running and can query Neon.