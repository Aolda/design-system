// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { aoldaColorsPlugin } from "./src/lib/vite-plugin-aolda-colors.js";
import { aoldaRegistryPlugin } from "./src/lib/vite-plugin-aolda-registry.js";
import { aoldaHmrPlugin } from "./src/lib/vite-plugin-aolda-hmr.js";
import { markdownPages } from "./src/lib/astro-markdown-pages.js";
import { remarkHeadingComponents } from "./src/lib/remark-heading-components.js";

import sitemap from "@astrojs/sitemap";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function getBuildInfo() {
  // Read version from the main aolda package
  const aoldaPkg = JSON.parse(
    readFileSync(resolve(__dirname, "../ui/package.json"), "utf-8"),
  );

  // Read version from the docs-astro package
  const docsPkg = JSON.parse(
    readFileSync(resolve(__dirname, "package.json"), "utf-8"),
  );

  let commitHash = "unknown";
  let commitDate = "unknown";
  let branch = "unknown";

  try {
    commitHash = execSync("git rev-parse --short HEAD", {
      encoding: "utf-8",
    }).trim();
    commitDate = execSync("git log -1 --format=%cI", {
      encoding: "utf-8",
    }).trim();
    branch = execSync("git rev-parse --abbrev-ref HEAD", {
      encoding: "utf-8",
    }).trim();
  } catch (error) {
    console.warn(
      "[ui-docs] Git info unavailable during build:",
      error instanceof Error ? error.message : error,
    );
    console.warn(
      "[ui-docs] This may happen with shallow clones. Set GIT_DEPTH=0 or fetch-depth: 0 in CI.",
    );
  }

  return {
    aoldaVersion: aoldaPkg.version,
    docsVersion: docsPkg.version,
    commitHash,
    commitDate,
    branch,
    buildDate: new Date().toISOString(),
  };
}

const buildInfo = getBuildInfo();

// Detect dev mode: `astro dev` sets this in process.argv
const isDev = process.argv.includes("dev");

// Path to aolda source (used for dev mode CSS aliases)
const aoldaSrc = resolve(__dirname, "../ui/src");

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({ remarkPlugins: [remarkHeadingComponents] }),
    react(),
    sitemap(),
    markdownPages(),
  ],
  site: "https://ui.aoldacloud.com/",
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "vesper",
      },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [
      // In dev mode, resolve @aolda/ui imports to raw source files
      // for instant HMR. In production builds, the normal package.json
      // exports (dist/) are used — preserving the real consumer experience.
      // IMPORTANT: Must come BEFORE tailwindcss() so CSS @import statements
      // like `@import "@aolda/ui/styles"` are aliased to source files
      // before Tailwind processes them.
      // @ts-expect-error - Vite version mismatch between Astro (Vite 6) and @aolda/ui (Vite 7)
      ...(isDev ? [aoldaHmrPlugin()] : []),
      // @ts-expect-error - Vite version mismatch between Astro (Vite 6) and @tailwindcss/vite (Vite 7)
      tailwindcss(),
      // @ts-expect-error - Vite version mismatch between Astro (Vite 6) and @aolda/ui (Vite 7)
      aoldaColorsPlugin(),
      // @ts-expect-error - Vite version mismatch between Astro (Vite 6) and @aolda/ui (Vite 7)
      aoldaRegistryPlugin(),
    ],

    // In dev mode, add resolve.alias for CSS @import statements that may bypass
    // Vite plugins. This ensures `@import "@aolda/ui/styles"` resolves
    // to source files without requiring a build step.
    resolve: isDev
      ? {
          alias: {
            "@aolda/ui/styles/tailwind": resolve(
              aoldaSrc,
              "styles/aolda.css",
            ),
            "@aolda/ui/styles/standalone": resolve(
              aoldaSrc,
              "styles/aolda-standalone.css",
            ),
            "@aolda/ui/styles": resolve(aoldaSrc, "styles/aolda.css"),
          },
        }
      : undefined,

    define: {
      __AOLDA_VERSION__: JSON.stringify(buildInfo.aoldaVersion),
      __DOCS_VERSION__: JSON.stringify(buildInfo.docsVersion),
      __BUILD_VERSION__: JSON.stringify(buildInfo.aoldaVersion), // Alias for backwards compatibility
      __BUILD_COMMIT__: JSON.stringify(buildInfo.commitHash),
      __BUILD_COMMIT_DATE__: JSON.stringify(buildInfo.commitDate),
      __BUILD_BRANCH__: JSON.stringify(buildInfo.branch),
      __BUILD_DATE__: JSON.stringify(buildInfo.buildDate),
    },
  },
});
