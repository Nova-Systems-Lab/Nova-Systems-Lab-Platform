# Web Information Architecture

Structure of the public Nova Systems Lab website. This is a **specification**:
apart from `/`, none of these routes exist yet.

## Principles

- Products and real progress come first; commercial framing comes later.
- Every route must be backed by real content. A route that would need invented
  content does not ship.
- Navigation only ever links to routes that exist — no `href="#"`, no links to
  unbuilt pages.

## Primary navigation

| Route        | Purpose                                                               | Status                                 |
| ------------ | --------------------------------------------------------------------- | -------------------------------------- |
| `/`          | Home                                                                  | **Foundation placeholder implemented** |
| `/products`  | Flagship products (WSL Studio, WinDroid Runtime) with honest statuses | Not built                              |
| `/projects`  | Smaller/experimental work and repositories                            | Not built                              |
| `/releases`  | Published releases and changelog entries                              | Not built                              |
| `/docs`      | Documentation entry point                                             | Not built                              |
| `/lab-notes` | Engineering writing and progress notes                                | Not built                              |
| `/community` | How to follow, contribute, and participate                            | Not built                              |
| `/about`     | What the organization is, honestly stated                             | Not built                              |
| `/contact`   | How to get in touch                                                   | Not built                              |

Navigation label order: Home · Products · Projects · Releases · Documentation ·
Lab Notes · Community · About · Contact.

`Products` vs `Projects`: a **product** is intended for external users and has an
assigned status; a **project** is other public work. If it has no status, it is
not a product.

## Later authenticated areas (not in scope)

`/account`, `/profile`, `/downloads`, `/notifications`, community badges, and
`/admin` are planned for after authentication exists. They must not be
implemented, stubbed, or linked until an approved security design exists — see
`../DEVELOPMENT_STANDARDS.md`.

## Homepage composition

Section order and hero copy are specified in `UI_UX_FOUNDATION.md`. Sections
backed by data that does not exist yet (products with statuses, momentum,
changelog, client work) are omitted until the data is real.

## Global chrome (not yet built)

- **Header:** wordmark → home, primary nav, GitHub link. Needs a skip-to-content
  link and a keyboard-accessible mobile disclosure menu.
- **Footer:** organization description, navigation groups, GitHub link, and an
  honest legal line. The footer must not claim incorporation, and must not
  include a newsletter signup, donation ask, or fake social proof.

## Page conventions

- One `<h1>` per page; headings in order; content inside `<main>`.
- Body copy in a `prose`-width `Container`; page shells in `content` width.
- Every page sets a title via the metadata template (`%s · Nova Systems Lab`)
  and a truthful description.
- Prefer server components; add client interactivity only where required.

## Content rules

Product and project entries may state only: name, honest description, assigned
`ProductStatus`, real repository/release links, and real documentation links.

They must not state: invented users, downloads, stars, testimonials, customer
logos, funding, team size, or a status without evidence. WinDroid Runtime is
never renamed "WinDroid Studio". The future game studio and RigForge must not
appear as operational.

## Build order (recommendation)

1. Global chrome (header/footer + skip link) — needs the approved wordmark.
2. `/about` — real content, no new data model.
3. `/products` — requires founder-assigned statuses.
4. `/lab-notes` and `/releases` — require a content source.
5. `/docs`, `/community`, `/contact`.
6. Authenticated areas — only after an approved auth security design.
