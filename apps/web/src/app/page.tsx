import { Button, Container, StatusBadge } from "@/components/ui";

/**
 * Foundation placeholder. The full homepage (hero, products, momentum, lab
 * notes, ...) is specified in docs/design/WEB_INFORMATION_ARCHITECTURE.md and is
 * intentionally not implemented in this mission. This page exists so the route
 * is honest rather than a framework template, and it exercises the primitives.
 */
export default function Home() {
  return (
    <main className="flex flex-1 items-center py-24">
      <Container as="section" size="prose" className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <span className="text-sm text-fg-subtle">Platform website</span>
          <StatusBadge status="foundation" />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-fg sm:text-5xl">
            Open systems. Better tools. Independent software.
          </h1>

          <p className="text-lg leading-relaxed text-fg-muted">
            Nova Systems Lab builds systems software, developer tools, platform
            integrations, and experimental runtime technologies for modern
            computing.
          </p>

          <p className="text-base leading-relaxed text-fg-muted">
            Currently developing WSL Studio and WinDroid Runtime.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button href="https://github.com/Nova-Systems-Lab" size="lg">
            View on GitHub
          </Button>
        </div>
      </Container>
    </main>
  );
}
