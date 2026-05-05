import {
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ForwardedRef,
  forwardRef,
  useMemo,
} from "react";
import { cn } from "../../utils/cn";

/** Text variant and size definitions mapping names to their Tailwind classes. */
export const AOLDA_TEXT_VARIANTS = {
  variant: {
    heading1: {
      classes: "text-3xl font-semibold",
      description: "Large heading for page titles",
    },
    heading2: {
      classes: "text-2xl font-semibold",
      description: "Medium heading for section titles",
    },
    heading3: {
      classes: "text-lg font-semibold",
      description: "Small heading for subsections",
    },
    body: {
      classes: "text-aolda-default",
      description: "Default body text",
    },
    secondary: {
      classes: "text-aolda-subtle",
      description: "Muted text for secondary information",
    },
    success: {
      classes: "text-aolda-link",
      description: "Success state text",
    },
    error: {
      classes: "text-aolda-danger",
      description: "Error state text",
    },
    mono: {
      classes: "font-mono",
      description: "Monospace text for code",
    },
    "mono-secondary": {
      classes: "font-mono text-aolda-subtle",
      description: "Muted monospace text",
    },
  },
  size: {
    xs: {
      classes: "text-xs",
      description: "Extra small text",
    },
    sm: {
      classes: "text-sm",
      description: "Small text",
    },
    base: {
      classes: "text-base",
      description: "Default text size",
    },
    lg: {
      classes: "text-lg",
      description: "Large text",
    },
  },
} as const;

export const AOLDA_TEXT_DEFAULT_VARIANTS = {
  variant: "body",
  size: "base",
} as const;

/**
 * AOLDA_TEXT_STYLING - Typography metadata for registry consumers
 *
 * This export provides structured styling information extracted from text.tsx
 * for use by docs and design tooling. It documents font sizes, weights, colors,
 * and font families used across all Text variants.
 *
 * Source of truth chain:
 * text.tsx (this file) → component-registry.json → registry consumers
 */
export const AOLDA_TEXT_STYLING = {
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
  },
  baseColor: "text-aolda-default",
  variantColors: {
    body: "text-aolda-default",
    secondary: "text-aolda-subtle",
    success: "text-aolda-link",
    error: "text-aolda-danger",
    mono: "text-aolda-default",
    "mono-secondary": "text-aolda-subtle",
  },
  fontFamilies: {
    default: "sans-serif",
    mono: "monospace",
  },
} as const;

// Derived types from AOLDA_TEXT_VARIANTS
export type AoldaTextVariant = keyof typeof AOLDA_TEXT_VARIANTS.variant;
export type AoldaTextSize = keyof typeof AOLDA_TEXT_VARIANTS.size;

export interface AoldaTextVariantsProps {
  variant?: AoldaTextVariant;
  size?: AoldaTextSize;
}

export function textVariants({
  variant = AOLDA_TEXT_DEFAULT_VARIANTS.variant,
  size = AOLDA_TEXT_DEFAULT_VARIANTS.size,
}: AoldaTextVariantsProps = {}) {
  return cn(
    AOLDA_TEXT_VARIANTS.variant[variant].classes,
    AOLDA_TEXT_VARIANTS.size[size].classes,
  );
}

// Legacy types for backwards compatibility
type Heading = "heading1" | "heading2" | "heading3";
type Copy = "body" | "secondary" | "success" | "error";
type Monospace = "mono" | "mono-secondary";
type TextSize = AoldaTextSize;
type TextVariant = AoldaTextVariant;

/** Valid HTML elements for the Text component's `as` prop. */
export type TextElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span";

type BaseTextProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  DANGEROUS_className?: string;
  DANGEROUS_style?: CSSProperties;
};

type TextPropsInternal<Variant extends TextVariant = "body"> = BaseTextProps &
  (Variant extends Copy
    ? {
        variant?: Variant;
        bold?: boolean;
        size?: TextSize;
        truncate?: boolean;
        /** Optional element override. Defaults to `<p>`. */
        as?: TextElement;
      }
    : Variant extends Monospace
      ? {
          variant?: Variant;
          bold?: never;
          size?: "lg";
          truncate?: boolean;
          /** Optional element override. Defaults to `<span>`. */
          as?: TextElement;
        }
      : Variant extends Heading
        ? {
            variant: Variant;
            bold?: never;
            size?: never;
            truncate?: boolean;
            /**
             * Required for heading variants. Pick the element that reflects
             * this text's place in the document outline (`"h1"` for a page
             * title, `"h2"` for a section title, etc.) or `"span"` for
             * decorative heading-styled text that is NOT a section heading.
             *
             * Previously optional (defaulted to `<span>`), which silently
             * excluded real section headings from the document outline.
             * Making it required surfaces the decision at the type level.
             */
            as: TextElement;
          }
        : never);

/**
 * Text component props.
 *
 * @example
 * ```tsx
 * <Text variant="heading1" as="h1">Page Title</Text>
 * <Text variant="body">Default paragraph text.</Text>
 * <Text variant="secondary" size="sm">Muted helper text</Text>
 * <Text variant="error">Something went wrong</Text>
 * <Text variant="mono">console.log("code")</Text>
 * ```
 */
export interface TextProps {
  /**
   * Text style variant. Determines color, font, and weight.
   * - `"heading1"` — Large page title (30px, semibold)
   * - `"heading2"` — Section title (24px, semibold)
   * - `"heading3"` — Subsection title (18px, semibold)
   * - `"body"` — Default body text
   * - `"secondary"` — Muted text for secondary information
   * - `"success"` — Success state text
   * - `"error"` — Error state text
   * - `"mono"` — Monospace text for code
   * - `"mono-secondary"` — Muted monospace text
   * @default "body"
   */
  variant?: AoldaTextVariant;
  /**
   * Text size (only applies to body/secondary/success/error variants).
   * - `"xs"` — 12px
   * - `"sm"` — 14px
   * - `"base"` — 16px
   * - `"lg"` — 18px
   * @default "base"
   */
  size?: AoldaTextSize;
  /** Whether to use bold font weight (only applies to body variants). */
  bold?: boolean;
  /** Whether to truncate overflowing text with an ellipsis. Adds `truncate min-w-0` classes. */
  truncate?: boolean;
  /**
   * The HTML element to render (`"h1"`–`"h6"`, `"p"`, or `"span"`).
   *
   * - **Required** for heading variants (`"heading1"`, `"heading2"`,
   *   `"heading3"`) — pick the element that reflects this text's place in
   *   the document outline, or `"span"` for decorative heading-styled text
   *   that is not a section heading.
   * - **Optional** for body variants (defaults to `"p"`) and monospace
   *   variants (defaults to `"span"`).
   */
  as?: TextElement;
  /** Text content. */
  children?: React.ReactNode;
}

/**
 * Typography component for rendering text with consistent styling.
 * Renders as `<p>` for body variants and `<span>` for headings/mono.
 * Use the `as` prop to set semantic HTML elements for proper document outlines.
 *
 * @example
 * ```tsx
 * <Text variant="heading1" as="h1">Page Title</Text>
 * <Text variant="heading2" as="h2">Section Title</Text>
 * <Text>Default body text</Text>
 * ```
 */
function _Text<Variant extends TextVariant = "body">(
  {
    variant = "body" as Variant,
    bold = false,
    size = "base",
    truncate = false,
    children,
    DANGEROUS_className,
    DANGEROUS_style,
    as,
    ...props
  }: TextPropsInternal<Variant>,
  ref: ForwardedRef<HTMLHeadingElement>,
) {
  const isCopy = ["body", "secondary", "success", "error"].includes(variant);
  const isMono = ["mono", "mono-secondary"].includes(variant);

  // Heading variants no longer auto-select h1/h2/h3 to avoid coupling visual
  // presentation to semantic HTML. Use the `as` prop to set the appropriate
  // heading level for your document outline (e.g., as="h2").
  const Component = useMemo(() => {
    if (as) return as;
    if (["mono", "mono-secondary"].includes(variant)) return "span";
    // Headings and body text default to span; use `as` for semantic elements
    if (["heading1", "heading2", "heading3"].includes(variant)) return "span";
    return "p";
  }, [variant, as]);

  return (
    <Component
      ref={ref}
      className={cn(
        "text-aolda-default",
        AOLDA_TEXT_VARIANTS.variant[variant].classes,
        isCopy ? AOLDA_TEXT_VARIANTS.size[size].classes : "",
        isCopy && bold ? "font-medium" : "",
        // Monospace fonts need to be 1pt smaller than body text to optically match
        isMono &&
          (size === "lg"
            ? AOLDA_TEXT_VARIANTS.size.base.classes
            : AOLDA_TEXT_VARIANTS.size.sm.classes),
        truncate && "truncate min-w-0",
        DANGEROUS_className,
      )}
      style={DANGEROUS_style}
      {...props}
    >
      {children}
    </Component>
  );
}

export const Text = forwardRef(_Text) as <Variant extends TextVariant = "body">(
  props: TextPropsInternal<Variant> & {
    ref?: ForwardedRef<ElementRef<"span">>;
  },
) => React.ReactElement;
