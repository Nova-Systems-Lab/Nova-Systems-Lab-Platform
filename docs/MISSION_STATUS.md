# Mission Status

## Current mission

**1.2 — Product Positioning, Brand Identity, and UI/UX Foundation**

Last updated: 2026-07-16

### Objective

Create the authoritative product-positioning, brand-identity, and UI/UX
foundation documents for Nova Systems Lab; audit the existing web application;
and implement only the minimum design-system scaffolding required to support
later frontend missions. Explicitly **not** building the website.

## Status: Complete (pending user review)

All applicable checks pass locally. Changes are left uncommitted for review; no
commits, branch changes, staging, or pushes were made.

## Completed work

### Documentation (primary deliverable)

- Created `BRAND_IDENTITY.md` — identity, personality, tone of voice with a
  banned-phrase list and rewrite table, approved public descriptions (short,
  medium, long, hero, GitHub, social, about/contact), visual reference
  framework, visual direction, product accents, prohibited practices.
- Created `PRODUCT_POSITIONING.md` — positioning statement, present-as /
  never-present-as rules, product direction, organizational strategy, the
  13-term product-status vocabulary, truthful growth signals, and future
  commercial direction.
- Created `design/UI_UX_FOUNDATION.md` — 15 UI principles, accessibility
  baseline, implementation rules, prohibited practices, primitive conventions,
  and the specified (unbuilt) homepage structure and hero messaging.
- Created `design/DESIGN_TOKENS.md` — full token reference with **measured**
  contrast for every pair.
- Created `design/WEB_INFORMATION_ARCHITECTURE.md` — routes, nav, page
  conventions, content rules, and a recommended build order.
- Updated `PROJECT_CONTEXT.md` (positioning + long-term direction),
  `ARCHITECTURE.md` (frontend boundaries and design-system section), the root
  `README.md` (docs index), and replaced the `create-next-app` `apps/web/README.md`.

### Web audit findings (all template debt, now removed)

`apps/web` was an unmodified `create-next-app` scaffold: `"Create Next App"`
metadata; a page of Vercel/Next.js marketing copy, logos and outbound template
links; `globals.css` forcing `Arial/Helvetica` over the configured Geist fonts;
Vercel/Next SVG assets; and no test runner.

### Implemented scaffolding

- **Design tokens** (`globals.css`): dark-first theming with full light support
  plus a `[data-theme]` override that correctly beats the OS preference;
  surface hierarchy, borders, text, electric-blue accent ladder, status colours,
  radii, easing, motion durations, container widths; Tailwind v4 `@theme inline`
  mapping; global focus ring, selection colour, and reduced-motion baseline.
- **Primitives** (`components/ui`): `Container`, `Button`, `StatusBadge`, plus a
  dependency-free `cn` helper.
- **Root layout**: real metadata (title template, description, Open Graph,
  Twitter), `lang="en"`, semantic body. No OG image (no approved asset exists).
- **Home route**: a minimal, honest foundation placeholder — _not_ the homepage.
- **Test runner**: Vitest + Testing Library + jsdom (the app had none).

### Key design decisions

- **Semantic tokens over `dark:` variants** so both themes stay correct without
  duplicated classes and a future toggle needs no component changes.
- **Accent ladder identical in both themes** (`#2A63F0` → `#2159D8` → `#1B4FD8`),
  darkening on hover/active, because white text is legible on every step.
- **Contrast measured, not assumed.** Initial candidates failed the 3:1 non-text
  rule for interactive borders and passed white-on-accent at only 4.50:1; both
  were retuned before shipping.
- **No product-status claims published.** WSL Studio and WinDroid Runtime have
  no assigned status, so the placeholder page states only that they are in
  development. The `Foundation` badge refers to the website, which is verifiable.
- **No `packages/ui` yet** — the primitives have exactly one consumer.
- **No icon library, no `clsx`/`tailwind-merge`, no animation library** — not
  justified yet.

## Tests and verification (2026-07-16, local)

| Check                                 | Result                           |
| ------------------------------------- | -------------------------------- |
| `pnpm lint`                           | pass                             |
| `pnpm typecheck`                      | pass                             |
| `pnpm test`                           | pass — 32 tests (12 api, 20 web) |
| `pnpm build`                          | pass                             |
| Palette contrast (measured, WCAG 2.1) | pass — all pairs                 |
| Browser verification (dark + light)   | pass                             |

Browser checks against the production build confirmed: dark canvas `#06070A` /
light `#FFFFFF`; theme swap of every semantic token; `data-theme` override
beating the OS preference; focus ring `#5B8DFF` (dark) and `#1B4FD8` (light) on
real keyboard `Tab`; **zero dead links; zero external hosts; no authored inline
styles**; Geist self-hosted.

**Bug found and fixed during verification:** Tailwind's `transition-colors`
includes `outline-color`, so the focus ring animated from `currentColor` (white)
to the focus token over 150ms. The `Button` now lists transition properties
explicitly. Focus indicators must never animate — recorded in the token and
UI/UX docs.

`pnpm format` was **not** run repo-wide: it reformats many pre-existing files
unrelated to this mission (see "Remaining"). Only files touched by this mission
were formatted.

## Deferred (out of scope this mission)

The complete homepage and all routes beyond `/`; global header/footer;
authentication and authenticated areas; database models, Prisma schema changes,
and API endpoints; GitHub/Discord integrations; releases, downloads, CMS,
newsletter, analytics, client-contact workflows; product accent tokens; product
screenshots; native apps; production infrastructure changes.

## Remaining risks / follow-ups

- **Favicon is still the Next.js default.** Replacing it needs an approved brand
  asset; inventing a logo was out of scope. `apps/web/public/` is now empty.
- **No approved brand assets exist** (logo, wordmark, icon set, OG image). The
  header/footer mission is blocked on the wordmark.
- **Product statuses unassigned.** The founder must assign a `ProductStatus` to
  WSL Studio and WinDroid Runtime before either appears publicly.
- **`next/font` fetches Geist from Google at build time** (self-hosted at
  runtime, so no runtime CDN). Builds therefore need network access; consider
  vendoring the font files if offline/hermetic builds are required.
- **Repo is not Prettier-clean** (carried over from 1.1); a dedicated
  formatting-normalization change is still recommended.
- **`WEB_ORIGIN` still missing from `render.yaml`** (carried over from 1.1) — a
  production API deploy would crash on boot.
- Screenshot capture was unavailable in this environment; visual verification
  was done via computed styles rather than by eye. A human should view both
  themes before the site goes public.

## Recommended next mission

**1.3 — Global Chrome and Brand Assets:** approve a wordmark/logo and favicon,
then implement the accessible site header (skip link, keyboard-operable mobile
menu, GitHub link) and footer with an honest legal line — linking only to routes
that exist. This unblocks every later page mission and is the natural first
consumer of the primitives.
