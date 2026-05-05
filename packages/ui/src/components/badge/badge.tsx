import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

/** Base styles applied to all badge variants. */
export const AOLDA_BADGE_BASE_STYLES =
  "inline-flex w-fit flex-none shrink-0 items-center justify-self-start rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap";

/** Badge variant definitions mapping variant names to their Tailwind classes and descriptions. */
export const AOLDA_BADGE_VARIANTS = {
  variant: {
    /** Semantic token badges */
    primary: {
      classes: "bg-aolda-badge-inverted text-aolda-badge-inverted",
      description: "Primary badge",
    },
    secondary: {
      classes: "bg-aolda-fill text-aolda-badge-neutral-subtle",
      description: "Secondary badge",
    },
    error: {
      classes: "bg-aolda-danger-tint/60 text-aolda-danger",
      description: "Error badge",
    },
    warning: {
      classes: "bg-aolda-warning-tint/70 text-aolda-warning",
      description: "Warning badge",
    },
    success: {
      classes: "bg-aolda-success-tint/70 text-aolda-success",
      description: "Success badge",
    },
    destructive: {
      classes: "bg-aolda-badge-red text-white",
      description: "Deprecated. Use red instead.",
    },
    info: {
      classes: "bg-aolda-info-tint/70 text-aolda-info",
      description: "Info badge",
    },
    beta: {
      classes:
        "border border-dashed border-aolda-brand bg-transparent text-aolda-link",
      description: "Indicates beta or experimental features",
    },
    outline: {
      classes: "border border-aolda-fill bg-transparent text-aolda-default",
      description: "Bordered badge with transparent background",
    },

    /** Other color token variants */

    red: {
      classes: "bg-aolda-badge-red text-white",
      description: "Red badge",
    },
    green: {
      classes: "bg-aolda-badge-green text-white",
      description: "Green badge",
    },
    neutral: {
      classes: "bg-aolda-badge-neutral text-white",
      description: "Neutral badge",
    },
    orange: {
      classes: "bg-aolda-badge-orange text-black",
      description: "Orange badge",
    },
    purple: {
      classes: "bg-aolda-badge-purple text-white",
      description: "Purple badge",
    },
    teal: {
      classes: "bg-aolda-badge-teal text-white",
      description: "Teal badge",
    },
    "teal-subtle": {
      classes: "bg-aolda-badge-teal-subtle text-aolda-badge-teal-subtle",
      description: "Subtle teal badge",
    },
    blue: {
      classes: "bg-aolda-badge-blue text-white",
      description: "Blue badge",
    },
  },
} as const;

export const AOLDA_BADGE_DEFAULT_VARIANTS = {
  variant: "primary",
} as const;

// Derived types from AOLDA_BADGE_VARIANTS
export type AoldaBadgeVariant = keyof typeof AOLDA_BADGE_VARIANTS.variant;

export interface AoldaBadgeVariantsProps {
  variant?: AoldaBadgeVariant;
}

export function badgeVariants({
  variant = AOLDA_BADGE_DEFAULT_VARIANTS.variant,
}: AoldaBadgeVariantsProps = {}) {
  const variantConfig = AOLDA_BADGE_VARIANTS.variant[variant];
  return cn(
    // Base styles exported for registry consumers.
    AOLDA_BADGE_BASE_STYLES,
    // Apply variant styles from AOLDA_BADGE_VARIANTS (fallback to primary if variant not found)
    variantConfig?.classes ??
      AOLDA_BADGE_VARIANTS.variant[AOLDA_BADGE_DEFAULT_VARIANTS.variant]
        .classes,
  );
}

// Legacy type alias for backwards compatibility
export type BadgeVariant = AoldaBadgeVariant;

/**
 * Badge component props.
 *
 * @example
 * ```tsx
 * <Badge variant="green">Active</Badge>
 * <Badge variant="red">Error</Badge>
 * <Badge variant="neutral">Inactive</Badge>
 * ```
 */
export interface BadgeProps {
  /**
   * Color variant of the badge.
   * Recommended semantic variants:
   * - `"primary"` — Primary badge
   * - `"secondary"` — Secondary badge
   * - `"error"` — Error badge
   * - `"warning"` — Warning badge
   * - `"success"` — Success badge
   * - `"info"` — Info badge
   *
   * Additional token variants:
   * - `"red"`, `"orange"`, `"green"`, `"teal"`, `"blue"`, `"purple"`, `"neutral"`
   * - `"teal-subtle"`, `"neutral-subtle"`
   * - `"inverted"`
   * - `"outline"` — Bordered badge with transparent background
   * - `"beta"` — Dashed-border badge for beta/experimental features
   * @default "secondary"
   */
  variant?: AoldaBadgeVariant;
  /** Additional CSS classes merged via `cn()`. */
  className?: string;
  /** Content rendered inside the badge. */
  children: ReactNode;
}

/**
 * Small status label for categorizing or highlighting content.
 *
 * @example
 * ```tsx
 * <Badge variant="green">Active</Badge>
 * ```
 */
export function Badge({
  variant = AOLDA_BADGE_DEFAULT_VARIANTS.variant,
  className,
  children,
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  );
}
