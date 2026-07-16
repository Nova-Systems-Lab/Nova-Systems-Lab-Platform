import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    /**
     * Rendering as a link requires a real destination. There is deliberately no
     * default and no `#` fallback, so a placeholder link cannot be shipped.
     */
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClasses = [
  "inline-flex items-center justify-center gap-2",
  "rounded-md font-medium whitespace-nowrap",
  // Deliberately not `transition-colors`: that list includes `outline-color`,
  // which makes the focus ring fade in from `currentColor` instead of appearing
  // instantly. A focus indicator must never animate.
  "transition-[color,background-color,border-color] duration-150 ease-standard",
  // Disabled controls are exempt from the contrast minimum (WCAG 1.4.3), but
  // they must not remain clickable.
  "disabled:pointer-events-none disabled:opacity-50",
  "aria-disabled:pointer-events-none aria-disabled:opacity-50",
].join(" ");

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-hover active:bg-accent-active",
  secondary:
    "border border-border-strong text-fg hover:bg-surface-2 active:bg-surface-3",
  ghost: "text-fg hover:bg-surface-2 active:bg-surface-3",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

/**
 * Button primitive. Renders a native `<button>`, or an `<a>` when `href` is
 * provided, so semantics and keyboard behaviour stay native. Focus styling comes
 * from the global `:focus-visible` rule in globals.css.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
