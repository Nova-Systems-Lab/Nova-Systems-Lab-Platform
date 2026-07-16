# Design Tokens

Authoritative token reference. Implemented in `apps/web/src/app/globals.css`.
Every contrast ratio below was **measured** against the WCAG 2.1 relative
luminance formula, not estimated.

## How theming works

Dark-first. `:root` carries the dark palette; a light palette applies under
`prefers-color-scheme: light`; `[data-theme="light"|"dark"]` overrides both so an
explicit in-product theme switch can be added later without touching components.

**Components must use semantic tokens (`bg-surface-2`, `text-fg-muted`), not
`dark:` variants.** Both themes then stay correct automatically, and a future
theme toggle needs no component changes.

Tokens are exposed to Tailwind v4 via `@theme inline`, which keeps the `var()`
reference live so utilities follow the active theme.

## Colour — semantic tokens

### Surfaces (hierarchy: canvas → surface → surface-2 → surface-3)

| Token              | Utility        | Dark      | Light     |
| ------------------ | -------------- | --------- | --------- |
| `--nova-canvas`    | `bg-canvas`    | `#06070A` | `#FFFFFF` |
| `--nova-surface`   | `bg-surface`   | `#0D1017` | `#F7F9FC` |
| `--nova-surface-2` | `bg-surface-2` | `#141922` | `#EFF3F8` |
| `--nova-surface-3` | `bg-surface-3` | `#1C2230` | `#E4EAF2` |

### Borders

| Token                  | Utility                | Dark      | Light     | Use                        |
| ---------------------- | ---------------------- | --------- | --------- | -------------------------- |
| `--nova-border`        | `border-border-subtle` | `#232B3A` | `#D9E0EA` | Decorative separators only |
| `--nova-border-strong` | `border-border-strong` | `#5A6779` | `#7D8A9E` | Interactive edges (≥3:1)   |

`border-subtle` is intentionally low-contrast and must never be the _only_
boundary of an interactive control — use `border-strong` there.

### Text

| Token              | Utility          | Dark      | Light     |
| ------------------ | ---------------- | --------- | --------- |
| `--nova-fg`        | `text-fg`        | `#F2F5FA` | `#0A0D14` |
| `--nova-fg-muted`  | `text-fg-muted`  | `#A7B0C0` | `#4A5568` |
| `--nova-fg-subtle` | `text-fg-subtle` | `#8A93A5` | `#5B6779` |

All three pass AA for normal text on every surface — "subtle" is de-emphasised,
never low-contrast. Low-contrast grey text is prohibited.

### Accent (electric blue)

The accent fill ladder is **identical in both themes** because white text is
legible on every step, so interactive fills behave the same everywhere. Hover
and active _darken_ rather than lighten.

| Token                  | Utility            | Value     | White text on it |
| ---------------------- | ------------------ | --------- | ---------------- |
| `--nova-accent`        | `bg-accent`        | `#2A63F0` | 5.07:1           |
| `--nova-accent-hover`  | `bg-accent-hover`  | `#2159D8` | 6.03:1           |
| `--nova-accent-active` | `bg-accent-active` | `#1B4FD8` | 6.65:1           |
| `--nova-accent-fg`     | `text-accent-fg`   | `#FFFFFF` | —                |

Accent _text_ (links) is theme-specific for contrast:

| Token                | Utility            | Dark      | Light     |
| -------------------- | ------------------ | --------- | --------- |
| `--nova-accent-text` | `text-accent-text` | `#5B8DFF` | `#1B4FD8` |
| `--nova-focus`       | `outline-focus`    | `#5B8DFF` | `#1B4FD8` |

### Status

| Token                 | Utility             | Dark      | Light     |
| --------------------- | ------------------- | --------- | --------- |
| `--nova-success`      | `text-success`      | `#3DD68C` | `#0F7A44` |
| `--nova-warning`      | `text-warning`      | `#F5B544` | `#8A5A00` |
| `--nova-danger`       | `text-danger`       | `#FF6B6B` | `#C0341D` |
| `--nova-info`         | `text-info`         | `#4FD1E0` | `#0E6E7D` |
| `--nova-experimental` | `text-experimental` | `#A78BFA` | `#6D46C8` |

Status is always carried by a text label as well as colour — never colour alone.

## Measured contrast

Text targets ≥ 4.5:1 (WCAG 1.4.3 AA). Non-text UI boundaries and focus
indicators target ≥ 3:1 (WCAG 1.4.11).

| Pair                           | Dark    | Light   |
| ------------------------------ | ------- | ------- |
| `fg` on canvas                 | 18.43:1 | 19.43:1 |
| `fg-muted` on canvas           | 9.22:1  | 7.53:1  |
| `fg-subtle` on canvas          | 6.52:1  | 5.74:1  |
| `fg-muted` on surface-2        | 8.07:1  | 6.75:1  |
| `accent-text` on canvas        | 6.43:1  | 6.65:1  |
| `success` on surface-2         | 9.39:1  | 4.85:1  |
| `warning` on surface-2         | 9.71:1  | 5.32:1  |
| `danger` on surface-2          | 6.35:1  | 5.03:1  |
| `info` on surface-2            | 9.67:1  | 5.32:1  |
| `experimental` on surface-2    | 6.47:1  | 5.61:1  |
| `border-strong` on canvas (≥3) | 3.50:1  | 3.50:1  |
| focus ring on canvas (≥3)      | 6.43:1  | 6.65:1  |

Every pair passes. When adding a colour, measure it before shipping.

## Typography

`--font-sans` → Geist, `--font-mono` → Geist Mono, loaded with `next/font`
(downloaded at build, self-hosted; **no runtime font CDN**). Fallbacks:
`ui-sans-serif, system-ui, sans-serif`.

| Role         | Classes                                                          |
| ------------ | ---------------------------------------------------------------- |
| Display / h1 | `text-4xl sm:text-5xl font-semibold tracking-tight text-balance` |
| h2           | `text-2xl sm:text-3xl font-semibold tracking-tight`              |
| h3           | `text-lg font-semibold`                                          |
| Body large   | `text-lg leading-relaxed text-fg-muted`                          |
| Body         | `text-base leading-relaxed`                                      |
| Small / meta | `text-sm text-fg-subtle`                                         |
| Code         | `font-mono text-sm`                                              |

Body copy is capped at `max-w-prose` (68ch) for readable line length.

## Spacing

Tailwind's 4px base scale (`--spacing: 0.25rem`). Prefer 4 / 8 / 12 / 16 / 24 /
32 / 48 / 64 / 96px steps (`1 2 3 4 6 8 12 16 24`). Section rhythm: `py-24`
desktop, `py-16` mobile.

## Radius

| Token          | Value | Use                       |
| -------------- | ----- | ------------------------- |
| `--radius-sm`  | 4px   | Tags, small inputs        |
| `--radius-md`  | 6px   | Buttons, inputs (default) |
| `--radius-lg`  | 10px  | Cards                     |
| `--radius-xl`  | 14px  | Panels                    |
| `--radius-2xl` | 20px  | Large surfaces            |
| `rounded-full` | —     | Status badges, avatars    |

## Shadows

Elevation is expressed primarily through the **surface hierarchy and borders**,
not shadows — shadows read poorly on near-black. Use Tailwind's `shadow-sm` /
`shadow-md` sparingly for genuinely floating elements (menus, dialogs) only.

## Focus rings

A single global rule in `globals.css`:

```css
:focus-visible {
  outline: 2px solid var(--nova-focus);
  outline-offset: 2px;
}
```

Rules: never remove a focus style without an equivalent replacement; **never
transition or animate a focus ring** — it must appear instantly. Note that
Tailwind's `transition-colors` includes `outline-color`; components must
therefore list transition properties explicitly (see the `Button` primitive).

## Motion

| Token                     | Value | Use                 |
| ------------------------- | ----- | ------------------- |
| `--nova-duration-instant` | 80ms  | Micro state changes |
| `--nova-duration-fast`    | 120ms | Hover/active        |
| `--nova-duration-normal`  | 160ms | Default             |
| `--nova-duration-slow`    | 240ms | Larger transitions  |

| Easing            | Value                        |
| ----------------- | ---------------------------- |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-entrance` | `cubic-bezier(0, 0, 0, 1)`   |
| `--ease-exit`     | `cubic-bezier(0.3, 0, 1, 1)` |

Animation is minimal and purposeful. A global `prefers-reduced-motion: reduce`
rule reduces animation and transition durations to ~0 and disables smooth
scrolling. Nothing may depend on motion to be understood.

## Breakpoints

Tailwind defaults, mobile-first: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 ·
`2xl` 1536.

## Content widths and grid

| Token                 | Utility         | Value          | Use                |
| --------------------- | --------------- | -------------- | ------------------ |
| `--container-prose`   | `max-w-prose`   | 68ch           | Body copy, docs    |
| `--container-content` | `max-w-content` | 72rem (1152px) | Default page width |
| `--container-wide`    | `max-w-wide`    | 80rem (1280px) | Dense layouts      |

Gutters: `px-6` mobile, `sm:px-8` upward — applied by the `Container` primitive.
Layout uses CSS Grid/Flex on a 12-column mental model; a rigid grid framework is
not warranted yet.

## Icons

Outline style, ~1.5px stroke, 24px grid, `currentColor`, sized `size-4`/`size-5`.
Decorative icons take `aria-hidden="true"`; meaningful icons need an accessible
name. **Emoji must never be used as interface icons.** No icon set is adopted
yet — no dependency has been justified.
