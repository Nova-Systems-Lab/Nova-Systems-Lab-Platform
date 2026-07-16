import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders a native button by default", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button.tagName).toBe("BUTTON");
  });

  it("renders a link with a real destination when href is provided", () => {
    render(<Button href="https://github.com/Nova-Systems-Lab">GitHub</Button>);

    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).toHaveAttribute("href", "https://github.com/Nova-Systems-Lab");
    expect(link.tagName).toBe("A");
  });

  it("is keyboard operable", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Run</Button>);

    await user.tab();
    expect(screen.getByRole("button", { name: "Run" })).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire click handlers while disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Run
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Run" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies variant and size classes from semantic tokens", () => {
    render(
      <Button variant="secondary" size="lg">
        Docs
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Docs" });
    expect(button).toHaveClass("border-border-strong");
    expect(button).toHaveClass("h-11");
  });

  it("does not set inline styles", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).not.toHaveAttribute(
      "style",
    );
  });
});
