import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

const AOLDA_LOGO_VIEWBOX = "0 0 60 60";
const AOLDA_FULL_LOGO_VIEWBOX = "0 0 307 76";
const AOLDA_FULL_LOGO_WORDMARK_PATH =
  "M124.854 48.942H104.134L97.696 64.408L89.852 61.152L111.46 9.056H117.528L139.136 61.152L131.292 64.408L124.854 48.942ZM107.686 40.432H121.302L114.494 23.93L107.686 40.432ZM160.234 64.556C157.644 64.556 155.276 64.112 153.056 63.15C150.836 62.188 148.838 60.856 147.21 59.228C145.582 57.6 144.25 55.676 143.288 53.456C142.326 51.236 141.882 48.794 141.882 46.278C141.882 43.762 142.326 41.32 143.288 39.1C144.25 36.88 145.582 34.882 147.21 33.254C148.838 31.626 150.836 30.294 153.056 29.332C155.276 28.37 157.644 27.926 160.234 27.926C162.75 27.926 165.118 28.37 167.338 29.332C169.558 30.294 171.482 31.626 173.11 33.254C174.738 34.882 176.07 36.88 177.032 39.1C177.994 41.32 178.512 43.762 178.512 46.278C178.512 48.794 177.994 51.162 177.032 53.382C176.07 55.602 174.738 57.6 173.11 59.228C171.482 60.856 169.558 62.188 167.338 63.15C165.118 64.112 162.75 64.556 160.234 64.556ZM160.234 36.436C158.828 36.436 157.57 36.658 156.386 37.176C155.202 37.694 154.166 38.434 153.278 39.322C152.39 40.21 151.65 41.246 151.132 42.43C150.614 43.614 150.392 44.946 150.392 46.278C150.392 47.61 150.614 48.868 151.132 50.052C151.65 51.236 152.39 52.346 153.278 53.234C154.166 54.122 155.202 54.788 156.386 55.306C157.57 55.824 158.828 56.12 160.234 56.12C161.566 56.12 162.824 55.824 164.008 55.306C165.192 54.788 166.228 54.122 167.116 53.234C168.004 52.346 168.67 51.236 169.188 50.052C169.706 48.868 170.002 47.61 170.002 46.278C170.002 44.946 169.706 43.614 169.188 42.43C168.67 41.246 168.004 40.21 167.116 39.322C166.228 38.434 165.192 37.694 164.008 37.176C162.824 36.658 161.566 36.436 160.234 36.436ZM186.818 9.056H195.254V63.964H186.818V9.056ZM221.951 27.852C223.727 27.852 225.429 28.148 227.131 28.592C228.759 29.11 230.313 29.85 231.793 30.812V9.13H240.303V64.038H231.793V61.744C230.313 62.706 228.759 63.446 227.131 63.89C225.429 64.334 223.727 64.556 221.951 64.556C219.435 64.556 217.067 64.112 214.847 63.15C212.627 62.188 210.629 60.856 209.001 59.154C207.299 57.526 205.967 55.528 205.005 53.308C204.043 51.088 203.599 48.72 203.599 46.204C203.599 43.688 204.043 41.32 205.005 39.1C205.967 36.88 207.299 34.956 209.001 33.254C210.629 31.626 212.627 30.294 214.847 29.332C217.067 28.37 219.435 27.852 221.951 27.852ZM212.109 46.204C212.109 47.536 212.331 48.868 212.849 50.052C213.367 51.236 214.107 52.272 214.995 53.16C215.883 54.048 216.919 54.788 218.103 55.306C219.287 55.824 220.619 56.046 221.951 56.046C223.283 56.046 224.541 55.824 225.725 55.306C226.909 54.788 228.019 54.048 228.907 53.16C229.795 52.272 230.461 51.236 230.979 50.052C231.497 48.868 231.793 47.536 231.793 46.204C231.793 44.872 231.497 43.614 230.979 42.43C230.461 41.246 229.795 40.136 228.907 39.248C228.019 38.36 226.909 37.694 225.725 37.176C224.541 36.658 223.283 36.362 221.951 36.362C220.619 36.362 219.287 36.658 218.103 37.176C216.919 37.694 215.883 38.36 214.995 39.248C214.107 40.136 213.367 41.246 212.849 42.43C212.331 43.614 212.109 44.872 212.109 46.204ZM267.12 27.852C268.896 27.852 270.598 28.148 272.3 28.592C273.928 29.11 275.482 29.85 276.962 30.812V28.518H285.472V64.038H276.962V61.744C275.482 62.706 273.928 63.446 272.3 63.89C270.598 64.334 268.896 64.556 267.12 64.556C264.604 64.556 262.236 64.112 260.016 63.15C257.796 62.188 255.798 60.856 254.17 59.154C252.468 57.526 251.136 55.528 250.174 53.308C249.212 51.088 248.768 48.72 248.768 46.204C248.768 43.688 249.212 41.32 250.174 39.1C251.136 36.88 252.468 34.956 254.17 33.254C255.798 31.626 257.796 30.294 260.016 29.332C262.236 28.37 264.604 27.852 267.12 27.852ZM257.278 46.204C257.278 47.536 257.5 48.868 258.018 50.052C258.536 51.236 259.276 52.272 260.164 53.16C261.052 54.048 262.088 54.788 263.272 55.306C264.456 55.824 265.788 56.046 267.12 56.046C268.452 56.046 269.71 55.824 270.894 55.306C272.078 54.788 273.188 54.048 274.076 53.16C274.964 52.272 275.63 51.236 276.148 50.052C276.666 48.868 276.962 47.536 276.962 46.204C276.962 44.872 276.666 43.614 276.148 42.43C275.63 41.246 274.964 40.136 274.076 39.248C273.188 38.36 272.078 37.694 270.894 37.176C269.71 36.658 268.452 36.362 267.12 36.362C265.788 36.362 264.456 36.658 263.272 37.176C262.088 37.694 261.052 38.36 260.164 39.248C259.276 40.136 258.536 41.246 258.018 42.43C257.5 43.614 257.278 44.872 257.278 46.204Z";

export const AOLDA_LOGO_DEFAULT_LABEL = "Aolda logo";

export const AOLDA_AOLDA_LOGO_VARIANTS = {
  variant: {
    mark: {
      description: "Circular Aolda logomark",
    },
    full: {
      description: "Aolda logomark with wordmark",
    },
  },
} as const;

export const AOLDA_AOLDA_LOGO_DEFAULT_VARIANTS = {
  variant: "mark",
} as const;

export type AoldaLogoVariant = keyof typeof AOLDA_AOLDA_LOGO_VARIANTS.variant;

export interface AoldaLogoProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Logo variant.
   * - `"mark"` — Circular Aolda logomark
   * - `"full"` — Aolda logomark with wordmark
   * @default "mark"
   */
  variant?: AoldaLogoVariant;
}

/**
 * Aolda logo component.
 *
 * @example
 * ```tsx
 * <AoldaLogo className="size-12" />
 * ```
 */
export const AoldaLogo = forwardRef<SVGSVGElement, AoldaLogoProps>(
  (
    {
      variant = AOLDA_AOLDA_LOGO_DEFAULT_VARIANTS.variant,
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId().replace(/:/g, "");
    const paint0Id = `aolda-paint0-${id}`;
    const paint1Id = `aolda-paint1-${id}`;
    const paint2Id = `aolda-paint2-${id}`;
    const clipId = `aolda-clip-${id}`;

    if (variant === "full") {
      return (
        <svg
          ref={ref}
          viewBox={AOLDA_FULL_LOGO_VIEWBOX}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={AOLDA_LOGO_DEFAULT_LABEL}
          className={cn("inline-block", className)}
          {...props}
        >
          <g clipPath={`url(#${clipId})`}>
            <circle cx="30" cy="38" r="30" fill={`url(#${paint0Id})`} />
            <ellipse
              cx="26.3979"
              cy="18.8302"
              rx="26.3979"
              ry="18.8302"
              transform="matrix(0.814012 -0.580848 0.580843 0.814016 -23 54.6664)"
              fill={`url(#${paint1Id})`}
            />
            <ellipse
              cx="37.602"
              cy="60.1111"
              rx="26.3979"
              ry="18.8302"
              fill={`url(#${paint2Id})`}
            />
          </g>
          <path d={AOLDA_FULL_LOGO_WORDMARK_PATH} fill="#1572B8" />
          <defs>
            <linearGradient
              id={paint0Id}
              x1="53.9729"
              y1="56.3521"
              x2="9.48081"
              y2="16.8713"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#206CA5" />
              <stop offset="1" stopColor="#0E76C4" />
            </linearGradient>
            <linearGradient
              id={paint1Id}
              x1="31.3592"
              y1="5.17409"
              x2="24.3882"
              y2="31.7603"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#58AEE5" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id={paint2Id}
              x1="18.5931"
              y1="47.3168"
              x2="44.3565"
              y2="82.238"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#A7D7F0" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <clipPath id={clipId}>
              <rect y="8" width="60" height="60" rx="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    }

    return (
      <svg
        ref={ref}
        viewBox={AOLDA_LOGO_VIEWBOX}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={AOLDA_LOGO_DEFAULT_LABEL}
        className={cn("inline-block", className)}
        {...props}
      >
        <circle cx="30" cy="30" r="30" fill={`url(#${paint0Id})`} />
        <g clipPath={`url(#${clipId})`}>
          <ellipse
            cx="26.3979"
            cy="18.8302"
            rx="26.3979"
            ry="18.8302"
            transform="matrix(0.814012 -0.580848 0.580843 0.814016 -23 46.6664)"
            fill={`url(#${paint1Id})`}
          />
          <ellipse
            cx="37.602"
            cy="52.1111"
            rx="26.3979"
            ry="18.8302"
            fill={`url(#${paint2Id})`}
          />
        </g>
        <defs>
          <linearGradient
            id={paint0Id}
            x1="53.9729"
            y1="48.3521"
            x2="9.48081"
            y2="8.87133"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#206CA5" />
            <stop offset="1" stopColor="#0E76C4" />
          </linearGradient>
          <linearGradient
            id={paint1Id}
            x1="31.3592"
            y1="5.17409"
            x2="24.3882"
            y2="31.7603"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#58AEE5" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id={paint2Id}
            x1="18.5931"
            y1="39.3168"
            x2="44.3565"
            y2="74.238"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A7D7F0" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <clipPath id={clipId}>
            <rect width="60" height="60" rx="30" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);

AoldaLogo.displayName = "AoldaLogo";

export type PoweredByAoldaProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * "Powered by Aolda" badge component.
 *
 * @example
 * ```tsx
 * <PoweredByAolda />
 * ```
 */
export const PoweredByAolda = forwardRef<
  HTMLAnchorElement,
  PoweredByAoldaProps
>(({ href = "https://aolda.com", className, ...props }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg bg-aolda-base py-2 pl-2.5 pr-3 text-sm font-medium text-aolda-default ring-1 ring-inset ring-aolda-hairline transition-all hover:shadow-sm",
        className,
      )}
      {...props}
    >
      <AoldaLogo className="size-4" />
      <span>
        Powered by <span className="font-semibold">Aolda</span>
      </span>
    </a>
  );
});

PoweredByAolda.displayName = "PoweredByAolda";

export interface GenerateAoldaLogoSvgOptions {
  /**
   * Logo variant to generate.
   * @default "mark"
   */
  variant?: AoldaLogoVariant;
}

export function generateAoldaLogoSvg({
  variant = AOLDA_AOLDA_LOGO_DEFAULT_VARIANTS.variant,
}: GenerateAoldaLogoSvgOptions = {}): string {
  if (variant === "full") {
    return `<svg width="307" height="76" viewBox="${AOLDA_FULL_LOGO_VIEWBOX}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${AOLDA_LOGO_DEFAULT_LABEL}">
  <g clip-path="url(#clip0_aolda)">
    <circle cx="30" cy="38" r="30" fill="url(#paint0_linear_aolda)"/>
    <ellipse cx="26.3979" cy="18.8302" rx="26.3979" ry="18.8302" transform="matrix(0.814012 -0.580848 0.580843 0.814016 -23 54.6664)" fill="url(#paint1_linear_aolda)"/>
    <ellipse cx="37.602" cy="60.1111" rx="26.3979" ry="18.8302" fill="url(#paint2_linear_aolda)"/>
  </g>
  <path d="${AOLDA_FULL_LOGO_WORDMARK_PATH}" fill="#1572B8"/>
  <defs>
    <linearGradient id="paint0_linear_aolda" x1="53.9729" y1="56.3521" x2="9.48081" y2="16.8713" gradientUnits="userSpaceOnUse">
      <stop stop-color="#206CA5"/>
      <stop offset="1" stop-color="#0E76C4"/>
    </linearGradient>
    <linearGradient id="paint1_linear_aolda" x1="31.3592" y1="5.17409" x2="24.3882" y2="31.7603" gradientUnits="userSpaceOnUse">
      <stop stop-color="#58AEE5"/>
      <stop offset="1" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="paint2_linear_aolda" x1="18.5931" y1="47.3168" x2="44.3565" y2="82.238" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A7D7F0"/>
      <stop offset="1" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="clip0_aolda">
      <rect y="8" width="60" height="60" rx="30" fill="white"/>
    </clipPath>
  </defs>
</svg>`;
  }

  return `<svg width="60" height="60" viewBox="${AOLDA_LOGO_VIEWBOX}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${AOLDA_LOGO_DEFAULT_LABEL}">
  <circle cx="30" cy="30" r="30" fill="url(#paint0_linear_aolda)"/>
  <g clip-path="url(#clip0_aolda)">
    <ellipse cx="26.3979" cy="18.8302" rx="26.3979" ry="18.8302" transform="matrix(0.814012 -0.580848 0.580843 0.814016 -23 46.6664)" fill="url(#paint1_linear_aolda)"/>
    <ellipse cx="37.602" cy="52.1111" rx="26.3979" ry="18.8302" fill="url(#paint2_linear_aolda)"/>
  </g>
  <defs>
    <linearGradient id="paint0_linear_aolda" x1="53.9729" y1="48.3521" x2="9.48081" y2="8.87133" gradientUnits="userSpaceOnUse">
      <stop stop-color="#206CA5"/>
      <stop offset="1" stop-color="#0E76C4"/>
    </linearGradient>
    <linearGradient id="paint1_linear_aolda" x1="31.3592" y1="5.17409" x2="24.3882" y2="31.7603" gradientUnits="userSpaceOnUse">
      <stop stop-color="#58AEE5"/>
      <stop offset="1" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="paint2_linear_aolda" x1="18.5931" y1="39.3168" x2="44.3565" y2="74.238" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A7D7F0"/>
      <stop offset="1" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="clip0_aolda">
      <rect width="60" height="60" rx="30" fill="white"/>
    </clipPath>
  </defs>
</svg>`;
}
