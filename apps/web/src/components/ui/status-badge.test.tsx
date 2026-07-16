import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge, type ProductStatus } from "./status-badge";

const allStatuses: ProductStatus[] = [
  "research",
  "concept",
  "planning",
  "foundation",
  "early-development",
  "prototype",
  "private-preview",
  "public-preview",
  "beta",
  "stable",
  "maintenance",
  "paused",
  "archived",
];

describe("StatusBadge", () => {
  it("renders a human-readable label for every approved status", () => {
    for (const status of allStatuses) {
      const { unmount } = render(<StatusBadge status={status} />);
      // The status must never be conveyed by colour alone.
      expect(screen.getByText(/\w/)).toBeInTheDocument();
      unmount();
    }
  });

  it.each([
    ["foundation", "Foundation"],
    ["early-development", "Early development"],
    ["private-preview", "Private preview"],
    ["stable", "Stable"],
    ["archived", "Archived"],
  ] as const)("labels %s as %s", (status, label) => {
    render(<StatusBadge status={status} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("hides the decorative dot from assistive technology", () => {
    const { container } = render(<StatusBadge status="beta" />);

    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).not.toBeNull();
  });

  it("maps tone to a semantic token class rather than a raw colour", () => {
    const { container } = render(<StatusBadge status="stable" />);

    expect(container.firstElementChild).toHaveClass("text-success");
    expect(container.firstElementChild).toHaveClass("bg-surface-2");
  });

  it("does not set inline styles", () => {
    const { container } = render(<StatusBadge status="beta" />);

    expect(container.firstElementChild).not.toHaveAttribute("style");
  });
});
