type ClassValue = string | false | null | undefined;

/**
 * Minimal class-name joiner. Deliberately not `clsx`/`tailwind-merge`: the
 * primitives compose a fixed set of classes, so a dependency is not justified.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
