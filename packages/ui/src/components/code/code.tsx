import { type CSSProperties } from "react";
import { cn } from "../../utils/cn";

/** Code language variant definitions. */
export const AOLDA_CODE_VARIANTS = {
  lang: {
    ts: {
      classes: "",
      description: "TypeScript code",
    },
    tsx: {
      classes: "",
      description: "TypeScript JSX code",
    },
    jsonc: {
      classes: "",
      description: "JSON with comments",
    },
    bash: {
      classes: "",
      description: "Shell/Bash commands",
    },
    css: {
      classes: "",
      description: "CSS styles",
    },
  },
} as const;

export const AOLDA_CODE_DEFAULT_VARIANTS = {
  lang: "ts",
} as const;

/**
 * Styling metadata for Code component registry consumers.
 */
export const AOLDA_CODE_STYLING = {
  /** Base semantic tokens used */
  baseTokens: ["text-aolda-strong"],
  /** Typography and layout */
  typography: {
    fontFamily: "font-mono",
    fontSize: "text-sm",
    lineHeight: "leading-[20px]",
  },
  /** Container dimensions */
  dimensions: {
    margin: "m-0",
    padding: "p-0",
    width: "w-auto",
  },
  /** Border and background */
  appearance: {
    borderRadius: "rounded-none",
    border: "border-none",
    background: "bg-transparent",
  },
} as const;

/**
 * Styling metadata for CodeBlock component registry consumers.
 */
export const AOLDA_CODEBLOCK_STYLING = {
  /** Base semantic tokens used */
  baseTokens: ["bg-aolda-base", "border-aolda-fill"],
  /** Container styling */
  container: {
    minWidth: "min-w-0",
    borderRadius: "rounded-md",
    border: "border border-aolda-fill",
    background: "bg-aolda-base",
  },
  /** Inner code element padding */
  innerPadding: "[&>pre]:p-2.5",
  /** Parsed dimensions */
  dimensions: {
    borderRadius: 6, // md = 6px
    padding: 10, // p-2.5 = 10px
  },
} as const;

// Derived types from AOLDA_CODE_VARIANTS
export type AoldaCodeLang = keyof typeof AOLDA_CODE_VARIANTS.lang;

export interface AoldaCodeVariantsProps {
  /**
   * Language hint for the code content.
   * - `"ts"` — TypeScript code
   * - `"tsx"` — TypeScript JSX code
   * - `"jsonc"` — JSON with comments
   * - `"bash"` — Shell/Bash commands
   * - `"css"` — CSS styles
   * @default "ts"
   */
  lang?: AoldaCodeLang;
}

export function codeVariants({
  lang = AOLDA_CODE_DEFAULT_VARIANTS.lang,
}: AoldaCodeVariantsProps = {}) {
  return cn(
    // Base styles
    "m-0 w-auto rounded-none border-none bg-transparent p-0 font-mono text-sm leading-[20px] text-aolda-strong",
    // Apply lang-specific styles (fallback to default if lang not in map)
    AOLDA_CODE_VARIANTS.lang[lang]?.classes ??
      AOLDA_CODE_VARIANTS.lang[AOLDA_CODE_DEFAULT_VARIANTS.lang].classes,
  );
}

// Legacy type alias for backwards compatibility
export type CodeLang = AoldaCodeLang;

/** @deprecated Use CodeLang instead */
export type BundledLanguage = CodeLang;

/**
 * Code component props.
 *
 * @example
 * ```tsx
 * <Code code="const x = 1;" lang="ts" />
 * <Code code="export API_KEY={{apiKey}}" lang="bash"
 *   values={{ apiKey: { value: "sk_live_123", highlight: true } }}
 * />
 * ```
 */
export interface CodeProps extends AoldaCodeVariantsProps {
  /** The code string to display. */
  code: string;
  /** Template values for `{{key}}` interpolation. Values with `highlight: true` are visually emphasized. */
  values?: Record<
    string,
    {
      value: string;
      highlight?: boolean;
    }
  >;
  /** Additional CSS classes merged via `cn()`. */
  className?: string;
  /** Inline styles. */
  style?: CSSProperties;
}

/**
 * Simple code component without syntax highlighting.
 *
 * Renders code in a monospace font with customizable language metadata.
 * For a bordered container version, use `Code.Block` or `CodeBlock`.
 *
 * **Styling:**
 * - Typography: `font-mono text-sm leading-[20px]`
 * - Colors: `text-aolda-strong` with `bg-transparent`
 * - No borders or padding (use CodeBlock for styled container)
 * - Supports all semantic tokens via className prop
 *
 * @deprecated Use `CodeHighlighted` from `@aolda/ui/code` for syntax highlighting.
 * This component will be removed in v2.0.
 *
 * @example Migration:
 * ```tsx
 * // Before
 * import { Code } from "@aolda/ui";
 * <Code code="const x = 1;" lang="ts" />
 *
 * // After
 * import { ShikiProvider, CodeHighlighted } from "@aolda/ui/code";
 * <ShikiProvider engine="javascript" languages={['tsx']} themes={{ light: 'github-light', dark: 'github-dark' }}>
 *   <CodeHighlighted code="const x = 1;" lang="tsx" />
 * </ShikiProvider>
 * ```
 */
function CodeComponent({
  code,
  lang = AOLDA_CODE_DEFAULT_VARIANTS.lang,
  className,
  style,
}: CodeProps) {
  return (
    <pre className={cn(codeVariants({ lang }), className)} style={style}>
      {code}
    </pre>
  );
}

CodeComponent.displayName = "Code";

/**
 * CodeBlock component props — code inside a bordered container.
 *
 * @example
 * ```tsx
 * <CodeBlock lang="tsx" code={`const greeting = "Hello!";`} />
 * ```
 */
export interface CodeBlockProps {
  /** The code string to display. */
  code: string;
  /**
   * Language hint for the code content.
   * @default "ts"
   */
  lang?: CodeLang;
}

/**
 * Code block with border and background container.
 *
 * A styled wrapper around Code that adds a bordered container with surface background.
 * Useful for displaying code snippets with visual separation from surrounding content.
 *
 * **Styling:**
 * - Container: `min-w-0 rounded-md border border-aolda-fill bg-aolda-base`
 * - Inner padding: `p-2.5` (10px)
 * - Uses semantic tokens: `bg-aolda-base`, `border-aolda-fill`
 *
 * @deprecated Use `CodeHighlighted` from `@aolda/ui/code` for syntax highlighting.
 * This component will be removed in v2.0.
 */
function CodeBlockComponent({ code, lang }: CodeBlockProps) {
  return (
    <div className="min-w-0 rounded-md border border-aolda-fill bg-aolda-base [&>pre]:p-2.5!">
      <CodeComponent lang={lang} code={code} />
    </div>
  );
}

CodeBlockComponent.displayName = "CodeBlock";

// Export Code with Block sub-component (for registry detection)
export const Code = Object.assign(CodeComponent, {
  Block: CodeBlockComponent,
});

// Backward-compatible standalone export
export const CodeBlock = CodeBlockComponent;
