import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * The approved product-status vocabulary. A project must not be described with
 * a status that overstates its maturity — see docs/design/UI_UX_FOUNDATION.md.
 */
export type ProductStatus =
  | "research"
  | "concept"
  | "planning"
  | "foundation"
  | "early-development"
  | "prototype"
  | "private-preview"
  | "public-preview"
  | "beta"
  | "stable"
  | "maintenance"
  | "paused"
  | "archived";

type StatusTone = "neutral" | "info" | "experimental" | "pending" | "ready";

const statusMeta: Record<ProductStatus, { label: string; tone: StatusTone }> = {
  research: { label: "Research", tone: "experimental" },
  concept: { label: "Concept", tone: "experimental" },
  planning: { label: "Planning", tone: "neutral" },
  foundation: { label: "Foundation", tone: "info" },
  "early-development": { label: "Early development", tone: "info" },
  prototype: { label: "Prototype", tone: "experimental" },
  "private-preview": { label: "Private preview", tone: "pending" },
  "public-preview": { label: "Public preview", tone: "pending" },
  beta: { label: "Beta", tone: "pending" },
  stable: { label: "Stable", tone: "ready" },
  maintenance: { label: "Maintenance", tone: "neutral" },
  paused: { label: "Paused", tone: "neutral" },
  archived: { label: "Archived", tone: "neutral" },
};

/**
 * Every tone is a text colour on the `surface-2` badge background, and each pair
 * is verified at >= 4.5:1 in both themes (see docs/design/DESIGN_TOKENS.md).
 */
const toneClasses: Record<StatusTone, string> = {
  neutral: "text-fg-muted",
  info: "text-info",
  experimental: "text-experimental",
  pending: "text-warning",
  ready: "text-success",
};

export interface StatusBadgeProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  status: ProductStatus;
}

/**
 * Status badge primitive. The status is always communicated by its text label,
 * never by colour alone, so it stays readable for colour-blind users and in
 * forced-colours mode.
 */
export function StatusBadge({ status, className, ...rest }: StatusBadgeProps) {
  const { label, tone } = statusMeta[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full",
        "border border-border-subtle bg-surface-2 px-2.5 py-0.5",
        "text-xs font-medium",
        toneClasses[tone],
        className,
      )}
      {...rest}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
