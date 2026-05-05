/**
 * Aolda Theme Configuration
 *
 * Single source of truth for all semantic color tokens and typography.
 * This config is used to generate:
 * - theme-aolda.css (base theme)
 * - theme-fedramp.css (fedramp overrides)
 * - Any future theme files
 *
 * Token naming:
 * - Key = current token name used in codebase
 * - newName = future name (empty string = no migration planned)
 */

import type { ThemeConfig } from "./types.js";

export const AOLDA_PRIMITIVE_COLORS = {
  white: "#FFFFFF",
  black: "#181818",
  primary: {
    900: "#051C2E",
    800: "#0A395C",
    700: "#105589",
    600: "#1572B8",
    500: "#1A8EE5",
    400: "#48A4EA",
    300: "#76BBEF",
    200: "#A3D2F5",
    100: "#D1E8FA",
    50: "#E8F4FC",
  },
  secondary: {
    900: "#131720",
    800: "#252D41",
    700: "#384461",
    600: "#4A5B82",
    500: "#5D72A2",
    400: "#7D8EB5",
    300: "#9EAAC7",
    200: "#BEC6DA",
    100: "#DFE3EC",
    50: "#EFF1F6",
  },
  gray: {
    900: "#232527",
    800: "#444444",
    700: "#636363",
    600: "#777777",
    500: "#A0A0A0",
    400: "#BFBFBF",
    300: "#E2E2E2",
    200: "#EFEFEF",
    100: "#F5F5F5",
    50: "#FAFAFA",
  },
  status: {
    negative: "#E15651",
    warning: "#F7C96E",
    positive: "#44BBA1",
  },
} as const;

type AoldaScale = keyof typeof AOLDA_PRIMITIVE_COLORS.primary;

const primary = (step: AoldaScale) =>
  `var(--color-aolda-primary-${step}, ${AOLDA_PRIMITIVE_COLORS.primary[step]})`;
const secondary = (step: AoldaScale) =>
  `var(--color-aolda-secondary-${step}, ${AOLDA_PRIMITIVE_COLORS.secondary[step]})`;
const gray = (step: AoldaScale) =>
  `var(--color-aolda-gray-${step}, ${AOLDA_PRIMITIVE_COLORS.gray[step]})`;
const status = (name: keyof typeof AOLDA_PRIMITIVE_COLORS.status) =>
  `var(--color-aolda-status-${name}, ${AOLDA_PRIMITIVE_COLORS.status[name]})`;
const white = `var(--color-aolda-white, ${AOLDA_PRIMITIVE_COLORS.white})`;
const black = `var(--color-aolda-black, ${AOLDA_PRIMITIVE_COLORS.black})`;

export const THEME_CONFIG: ThemeConfig = {
  /**
   * Text color tokens
   * Used with: text-{token}
   * CSS variable: --text-color-{token}
   */
  text: {
    "aolda-default": {
      newName: "",
      theme: {
        aolda: {
          light: gray(900),
          dark: gray(50),
        },
      },
    },
    "aolda-inverse": {
      newName: "",
      theme: {
        aolda: {
          light: white,
          dark: black,
        },
      },
    },
    "aolda-strong": {
      newName: "",
      theme: {
        aolda: {
          light: gray(800),
          dark: gray(200),
        },
      },
    },
    "aolda-subtle": {
      newName: "",
      theme: {
        aolda: {
          light: gray(600),
          dark: gray(400),
        },
      },
    },
    "aolda-inactive": {
      newName: "",
      theme: {
        aolda: {
          light: gray(500),
          dark: gray(700),
        },
      },
    },
    "aolda-placeholder": {
      newName: "",
      theme: {
        aolda: {
          light: gray(500),
          dark: gray(600),
        },
      },
    },
    "aolda-brand": {
      newName: "",
      theme: {
        aolda: {
          light: primary(600),
          dark: primary(400),
        },
      },
    },
    "aolda-link": {
      newName: "",
      theme: {
        aolda: {
          light: primary(700),
          dark: primary(400),
        },
      },
    },
    "aolda-info": {
      newName: "",
      theme: {
        aolda: {
          light: primary(700),
          dark: primary(400),
        },
      },
    },
    "aolda-success": {
      newName: "",
      theme: {
        aolda: {
          light: status("positive"),
          dark: status("positive"),
        },
      },
    },
    "aolda-danger": {
      newName: "",
      theme: {
        aolda: {
          light: status("negative"),
          dark: "#F08B87",
        },
      },
    },
    "aolda-warning": {
      newName: "",
      theme: {
        aolda: {
          light: "#8B5E00",
          dark: status("warning"),
        },
      },
    },

    /*
     * Badge text color tokens
     * Subtle variants need colored text; inverted needs flipping text
     */
    "aolda-badge-orange-subtle": {
      newName: "",
      description: "Text color for subtle orange badge",
      theme: {
        aolda: {
          light: "#8B5E00",
          dark: status("warning"),
        },
      },
    },
    "aolda-badge-teal-subtle": {
      newName: "",
      description: "Text color for subtle teal badge",
      theme: {
        aolda: {
          light: "#216B5D",
          dark: "#8DDAC9",
        },
      },
    },
    "aolda-badge-neutral-subtle": {
      newName: "",
      description: "Text color for subtle neutral badge",
      theme: {
        aolda: {
          light: gray(800),
          dark: gray(200),
        },
      },
    },
    "aolda-badge-inverted": {
      newName: "",
      description:
        "Text color for inverted badge (white in light, black in dark)",
      theme: {
        aolda: {
          light: white,
          dark: black,
        },
      },
    },
  },

  /**
   * Color tokens
   * Used with: bg-{token}, border-{token}, ring-{token}, etc.
   * CSS variable: --color-{token}
   */
  color: {
    "aolda-canvas": {
      newName: "",
      theme: {
        aolda: {
          light: gray(50),
          dark: black,
        },
        fedramp: {
          light: "#5b697c",
          dark: "#5b697c",
        },
      },
    },
    "aolda-elevated": {
      newName: "",
      theme: {
        aolda: {
          light: gray(100),
          dark: secondary(900),
        },
      },
    },
    "aolda-recessed": {
      newName: "",
      theme: {
        aolda: {
          light: gray(100),
          dark: gray(900),
        },
      },
    },
    "aolda-base": {
      newName: "",
      theme: {
        aolda: {
          light: white,
          dark: gray(900),
        },
        fedramp: {
          light: "#5b697c",
          dark: "#5b697c",
        },
      },
    },
    "aolda-tint": {
      newName: "",
      theme: {
        aolda: {
          light: primary(50),
          dark: secondary(800),
        },
      },
    },
    "aolda-contrast": {
      newName: "",
      theme: {
        aolda: {
          light: black,
          dark: white,
        },
      },
    },
    "aolda-overlay": {
      newName: "",
      theme: {
        aolda: {
          light: gray(100),
          dark: secondary(800),
        },
      },
    },
    "aolda-control": {
      newName: "",
      theme: {
        aolda: {
          light: white,
          dark: gray(800),
        },
      },
    },
    "aolda-interact": {
      newName: "",
      theme: {
        aolda: {
          light: gray(300),
          dark: gray(700),
        },
      },
    },
    "aolda-fill": {
      newName: "",
      theme: {
        aolda: {
          light: gray(200),
          dark: gray(700),
        },
      },
    },
    "aolda-fill-hover": {
      newName: "",
      theme: {
        aolda: {
          light: gray(100),
          dark: gray(600),
        },
      },
    },
    "aolda-brand": {
      newName: "",
      theme: {
        aolda: {
          light: primary(600),
          dark: primary(500),
        },
      },
    },
    "aolda-brand-hover": {
      newName: "",
      theme: {
        aolda: {
          light: primary(700),
          dark: primary(400),
        },
      },
    },
    "aolda-line": {
      newName: "",
      theme: {
        aolda: {
          light: gray(300),
          dark: gray(700),
        },
      },
    },
    "aolda-hairline": {
      newName: "",
      theme: {
        aolda: {
          light: gray(300),
          dark: gray(800),
        },
        fedramp: {
          light: "#c8d4e5",
          dark: "#c8d4e5",
        },
      },
    },
    "aolda-focus": {
      newName: "",
      description: "Primary focus ring/border color",
      theme: {
        aolda: {
          light: primary(600),
          dark: primary(400),
        },
      },
    },
    "aolda-shadow-edge": {
      newName: "",
      description: "Tight spread shadow color for control thumbs/knobs",
      theme: {
        aolda: {
          light: "rgb(24 24 24 / 0.12)",
          dark: "rgb(255 255 255 / 0.1)",
        },
      },
    },
    "aolda-shadow-drop": {
      newName: "",
      description: "Drop shadow color for control thumbs/knobs",
      theme: {
        aolda: {
          light: "rgb(24 24 24 / 0.08)",
          dark: "rgb(0 0 0 / 0.3)",
        },
      },
    },
    "aolda-tip-shadow": {
      newName: "",
      theme: {
        aolda: {
          light: gray(200),
          dark: "transparent",
        },
      },
    },
    "aolda-tip-stroke": {
      newName: "",
      theme: {
        aolda: {
          light: "transparent",
          dark: gray(800),
        },
      },
    },
    "aolda-info-tint": {
      newName: "",
      theme: {
        aolda: {
          light: primary(100),
          dark: secondary(800),
        },
      },
    },
    "aolda-info": {
      newName: "",
      theme: {
        aolda: {
          light: primary(300),
          dark: primary(800),
        },
      },
    },
    "aolda-warning-tint": {
      newName: "",
      theme: {
        aolda: {
          light: "#FEF5DF",
          dark: "#60420B",
        },
      },
    },
    "aolda-warning": {
      newName: "",
      theme: {
        aolda: {
          light: status("warning"),
          dark: "#8B5E00",
        },
      },
    },
    "aolda-danger-tint": {
      newName: "",
      theme: {
        aolda: {
          light: "#FCE6E4",
          dark: "#5D1E1D",
        },
      },
    },
    "aolda-danger": {
      newName: "",
      theme: {
        aolda: {
          light: status("negative"),
          dark: "#8F302D",
        },
      },
    },
    "aolda-success-tint": {
      newName: "",
      theme: {
        aolda: {
          light: "#E4F7F3",
          dark: "#153F37",
        },
      },
    },
    "aolda-success": {
      newName: "",
      theme: {
        aolda: {
          light: status("positive"),
          dark: "#257A69",
        },
      },
    },

    /*
     * Badge color tokens
     * Solid variants: vivid background, white text
     * Subtle variants: tinted background, darker text (flips in dark mode)
     */

    // Red
    "aolda-badge-red": {
      newName: "",
      description: "Red badge background",
      theme: {
        aolda: {
          light: status("negative"),
          dark: "#B8423E",
        },
      },
    },

    // Orange
    "aolda-badge-orange": {
      newName: "",
      description: "Orange badge background",
      theme: {
        aolda: {
          light: status("warning"),
          dark: status("warning"),
        },
      },
    },
    "aolda-badge-orange-subtle": {
      newName: "",
      description: "Subtle orange badge background",
      theme: {
        aolda: {
          light: "#FEF5DF",
          dark: "#60420B",
        },
      },
    },

    "aolda-badge-purple": {
      newName: "",
      description: "Purple badge background",
      theme: {
        aolda: {
          light: secondary(500),
          dark: secondary(400),
        },
      },
    },

    // Green (emerald scale)
    "aolda-badge-green": {
      newName: "",
      description: "Green badge background",
      theme: {
        aolda: {
          light: status("positive"),
          dark: "#339B86",
        },
      },
    },

    // Teal
    "aolda-badge-teal": {
      newName: "",
      description: "Teal badge background",
      theme: {
        aolda: {
          light: status("positive"),
          dark: "#339B86",
        },
      },
    },
    "aolda-badge-teal-subtle": {
      newName: "",
      description: "Subtle teal badge background",
      theme: {
        aolda: {
          light: "#E4F7F3",
          dark: "#153F37",
        },
      },
    },

    // Blue
    "aolda-badge-blue": {
      newName: "",
      description: "Blue badge background",
      theme: {
        aolda: {
          light: primary(600),
          dark: primary(500),
        },
      },
    },

    // Neutral
    "aolda-badge-neutral": {
      newName: "",
      description: "Neutral badge background",
      theme: {
        aolda: {
          light: gray(700),
          dark: gray(600),
        },
      },
    },
    // NOTE: aolda-badge-neutral-subtle omitted — same pair as aolda-fill.
    // Badge uses bg-aolda-fill instead.

    // Inverted
    "aolda-badge-inverted": {
      newName: "",
      description:
        "Inverted badge background (near-black in light, white in dark)",
      theme: {
        aolda: {
          light: black,
          dark: white,
        },
      },
    },
  },

  /**
   * Typography tokens
   * Used with: text-{size} utilities
   * CSS variables: --text-{size}, --text-{size}--line-height
   *
   * Note: Typography is NOT theme-dependent (no light/dark mode).
   * Values are the same across color modes but may differ per theme.
   */
  typography: {
    xs: {
      newName: "",
      theme: {
        aolda: "12px",
      },
    },
    "xs--line-height": {
      newName: "",
      theme: {
        aolda: "calc(1 / 0.75)",
      },
    },
    sm: {
      newName: "",
      theme: {
        aolda: "13px",
      },
    },
    "sm--line-height": {
      newName: "",
      theme: {
        aolda: "calc(1 / 0.85)",
      },
    },
    base: {
      newName: "",
      theme: {
        aolda: "14px",
      },
    },
    "base--line-height": {
      newName: "",
      theme: {
        aolda: "calc(1.25 / 0.875)",
      },
    },
    lg: {
      newName: "",
      theme: {
        aolda: "16px",
      },
    },
    "lg--line-height": {
      newName: "",
      theme: {
        aolda: "calc(1.25 / 1)",
      },
    },
  },
};

/** List of all available themes */
export const AVAILABLE_THEMES = ["aolda", "fedramp"] as const;
export type AvailableTheme = (typeof AVAILABLE_THEMES)[number];
