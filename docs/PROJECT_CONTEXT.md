# Project Context

## What Nova Systems Lab is

Nova Systems Lab is an independent, founder-led open-source software
organization focused on systems tools, developer utilities, platform
integration, and experimental runtime technologies.

- **Name:** Nova Systems Lab
- **Tagline:** Open systems. Better tools. Independent software.
- **GitHub organization:** `Nova-Systems-Lab`
- **Founder account:** `SamratB8`

## What Nova Systems Lab is not

Nova Systems Lab is **not** currently represented as any of the following, and
no code, copy, or documentation may claim otherwise:

- a registered company
- a nonprofit company
- an NGO
- a Section 8 company
- a legally incorporated organization

Do not invent legal status, registration, nonprofit status, partnerships,
certifications, team members, project achievements, testimonials, or statistics.

## Current projects

- **WSL Studio**
- **WinDroid Runtime** (never rename to "WinDroid Studio")

## Platform vision

The platform is more than a website. The website is one client of a shared
platform that may later support native Windows and Android applications.

The shared backend is intended to eventually support:

- accounts and authentication
- roles and permissions
- projects
- releases and downloads
- documentation metadata
- community profiles and badges
- GitHub integration
- Discord integration
- administrative workflows
- native application clients

Because of this, core business logic must remain reusable through APIs and
shared packages. It must **not** be implemented only inside the web frontend.

## Current phase

The platform is in **foundation** stage. Only the shared database package and
the NestJS API foundation (configuration, health endpoints, graceful lifecycle)
are in scope. User-facing platform features are explicitly deferred to later
missions. See `MISSION_STATUS.md`.
