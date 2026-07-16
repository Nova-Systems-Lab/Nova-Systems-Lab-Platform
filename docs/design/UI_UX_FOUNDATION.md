# UI/UX Foundation

Design principles for every Nova Systems Lab interface. Values live in
`DESIGN_TOKENS.md`; structure lives in `WEB_INFORMATION_ARCHITECTURE.md`; voice
lives in `../BRAND_IDENTITY.md`.

## UI principles

1. **Dark-first, light fully supported.** Dark is the default; light is a
   first-class theme, never an afterthought.
2. **Accessibility-first.** WCAG 2.1 AA is the floor, not the goal.
3. **Responsive from mobile upward.** Design the small screen first.
4. **Keyboard navigable.** Every interactive element is reachable and operable
   by keyboard, in a logical order.
5. **Reduced-motion support.** Honour `prefers-reduced-motion` globally.
6. **Strong visible focus.** A clear, instant focus indicator on every control.
7. **No hover-only interaction.** Hover may enhance; it may never be the only
   way to reveal information or reach an action. This also covers touch.
8. **Semantic HTML.** Use the correct element before reaching for ARIA.
9. **High contrast.** Measured, not assumed.
10. **Readable line lengths.** Body copy capped at ~68ch.
11. **Fast page loads.** Server components by default; minimal client JS.
12. **Low visual clutter.** Remove before adding.
13. **Clear information hierarchy.** One obvious primary action per view.
14. **Honest product status labels.** See the status vocabulary in
    `../PRODUCT_POSITIONING.md`.
15. **Minimal but polished animation.** Motion clarifies; it never decorates.

## Accessibility baseline

- Semantic landmarks (`main`, `header`, `nav`, `footer`) and one `h1` per page,
  with headings in order.
- Text ≥ 4.5:1; non-text UI boundaries and focus indicators ≥ 3:1. Measure new
  colours before shipping.
- Never convey meaning by colour alone — always pair with text.
- Visible `:focus-visible` on all controls; focus must never be removed without
  an equivalent replacement, and **must never animate**.
- Interactive targets ≥ 24px (prefer ≥ 44px on touch).
- Decorative graphics `aria-hidden="true"`; meaningful graphics get an
  accessible name.
- Forms: real `<label>`s; errors described in text, not colour.
- Respect `prefers-reduced-motion`.

## Implementation rules

- **Server components by default.** Add `"use client"` only for genuine
  interactivity.
- **Use semantic tokens, not `dark:` variants** — see `DESIGN_TOKENS.md`.
- **No inline CSS, no inline JavaScript** in authored code.
- **No external CDNs** for fonts, scripts, or styles.
- **No dead links.** `href="#"` is banned; the `Button` primitive has no default
  `href` and no `#` fallback, so a placeholder link cannot be shipped. Do not
  link to a route that does not exist yet.
- **No new UI library** without justification. Prefer native CSS and the
  existing Tailwind v4 setup.
- **No images or illustrations** until real approved assets exist. No product
  screenshots until real product interfaces exist.
- Test primitives (Vitest + Testing Library, `pnpm --filter @nova/web test`).

## Prohibited design practices

Never ship: excessive glassmorphism · excessive gradients · fake 3D globes ·
fake customer logos · fake testimonials · fake usage metrics · fake funding
badges · fake employee photos · stock-office imagery · autoplay video · flashing
animation · excessive parallax · text hidden for visual effect · low-contrast
grey text · emoji as interface icons · decorative terminal windows containing
meaningless commands · dead `href="#"` · external CDN-loaded fonts or scripts ·
inline JavaScript · inline CSS.

More broadly: **the interface must not imply scale, maturity, or credibility the
organization does not have.**

## Component primitives

Implemented in `apps/web/src/components/ui`. Keep this layer small and
composable; promote a component here only when it is genuinely reused.

| Primitive     | Purpose                                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `Container`   | Page width + gutters. `size`: `prose` \| `content` \| `wide`; `as` for the correct semantic element                                    |
| `Button`      | `variant`: `primary` \| `secondary` \| `ghost`; `size`: `sm` \| `md` \| `lg`. Renders `<button>`, or `<a>` when a real `href` is given |
| `StatusBadge` | Renders an approved `ProductStatus` with a text label and tone                                                                         |

Conventions: native elements first; no inline styles; classes from semantic
tokens; focus from the global rule; every primitive keyboard-accessible and
tested.

## Homepage structure (specification — not yet built)

The full homepage is deliberately **not implemented**. When built, it should
follow this order:

1. Hero
2. Current flagship products
3. Why Nova Systems Lab exists
4. Current development momentum
5. Technical capabilities
6. Open-source and future commercial model
7. Latest lab notes or changelog
8. Work with Nova
9. Long-term vision
10. Footer

### Hero messaging

The hero must communicate: Nova Systems Lab builds real systems and developer
products; the organization is early-stage but active; WSL Studio and WinDroid
Runtime are the current focus; and visitors can explore products or view GitHub.

> **Open systems. Better tools. Independent software.**
>
> Nova Systems Lab builds systems software, developer tools, platform
> integrations, and experimental runtime technologies for modern computing.
>
> Currently developing WSL Studio and WinDroid Runtime.
>
> `Explore products` · `View on GitHub`

Sections 2, 4, 7, and 8 must be backed by real data (real products with assigned
statuses, real changelog entries, real releases). Until that data exists, the
section stays out rather than being filled with placeholders.

`Explore products` is not implemented yet because `/products` does not exist and
linking to it would create a dead link.
