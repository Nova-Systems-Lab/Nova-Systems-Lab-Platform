import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ContainerSize = "prose" | "content" | "wide";

/** Restricted to layout-appropriate elements to keep the primitive semantic. */
export type ContainerElement =
  "div" | "section" | "main" | "header" | "footer" | "article";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Choose the one that is semantically correct. */
  as?: ContainerElement;
  /**
   * `prose` caps line length for readable body copy, `content` is the default
   * page width, `wide` is for dense layouts.
   */
  size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
  prose: "max-w-prose",
  content: "max-w-content",
  wide: "max-w-wide",
};

export function Container({
  as: Component = "div",
  size = "content",
  className,
  ...rest
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 sm:px-8",
        sizeClasses[size],
        className,
      )}
      {...rest}
    />
  );
}
