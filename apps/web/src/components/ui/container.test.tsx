import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "./container";

describe("Container", () => {
  it("renders a div by default", () => {
    render(<Container data-testid="c">content</Container>);

    expect(screen.getByTestId("c").tagName).toBe("DIV");
  });

  it("renders the requested semantic element", () => {
    render(
      <Container as="section" data-testid="c">
        content
      </Container>,
    );

    expect(screen.getByTestId("c").tagName).toBe("SECTION");
  });

  it("uses the content width by default", () => {
    render(<Container data-testid="c">content</Container>);

    expect(screen.getByTestId("c")).toHaveClass("max-w-content");
  });

  it("supports the prose width for readable line lengths", () => {
    render(
      <Container size="prose" data-testid="c">
        content
      </Container>,
    );

    expect(screen.getByTestId("c")).toHaveClass("max-w-prose");
  });

  it("merges caller class names without dropping its own", () => {
    render(
      <Container className="py-24" data-testid="c">
        content
      </Container>,
    );

    const el = screen.getByTestId("c");
    expect(el).toHaveClass("py-24");
    expect(el).toHaveClass("mx-auto");
  });
});
