import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Resolve once — points at the sibling aolda package root
const aoldaRoot = resolve(__dirname, "../../../ui");
const aoldaSrc = resolve(aoldaRoot, "src");

/**
 * Map every `@aolda/ui` sub-path export to its source equivalent.
 *
 * In dev mode Vite will resolve these to the raw .ts/.tsx source files,
 * which means file-watcher-based HMR works instantly — no rebuild of
 * the aolda package required.
 *
 * In production builds (astro build) this plugin is NOT loaded, so the
 * normal package.json `exports` field is used (dist/), which validates
 * the real consumer experience.
 */
const aliases: Record<string, string> = {
  // Main barrel — resolves to source index.ts
  "@aolda/ui": resolve(aoldaSrc, "index.ts"),

  // CSS styles — resolve to source CSS
  "@aolda/ui/styles/tailwind": resolve(aoldaSrc, "styles/aolda.css"),
  "@aolda/ui/styles/standalone": resolve(
    aoldaSrc,
    "styles/aolda-standalone.css",
  ),
  "@aolda/ui/styles": resolve(aoldaSrc, "styles/aolda.css"),

  // JSON registry — these live outside src/ and are NOT built, so same
  // path works in dev and prod.  We alias anyway so Vite can resolve
  // the workspace:* link correctly and watch the file.
  "@aolda/ui/registry/component-registry.json": resolve(
    aoldaRoot,
    "registry/component-registry.json",
  ),

  // Theme generator — resolve to source TS so the docs color page
  // always reflects the latest config without a aolda build step.
  "@aolda/ui/scripts/theme-generator/config": resolve(
    aoldaRoot,
    "scripts/theme-generator/config.ts",
  ),
  "@aolda/ui/scripts/theme-generator/types": resolve(
    aoldaRoot,
    "scripts/theme-generator/types.ts",
  ),
};

/**
 * Vite plugin that rewires `@aolda/ui` imports to the raw source
 * files of the sibling package during `astro dev`.
 *
 * **Why not just use `resolve.alias`?**
 * `resolve.alias` is a simple prefix match — it can't distinguish
 * `@aolda/ui` sub-path exports cleanly.
 * A plugin gives us exact-match control.
 */
export function aoldaHmrPlugin() {
  return {
    name: "vite-plugin-aolda-hmr",
    enforce: "pre" as const,

    resolveId(source: string) {
      // Exact match first (most imports)
      if (aliases[source]) {
        return aliases[source];
      }

      // Sub-path component imports: @aolda/ui/components/button
      // → packages/ui/src/components/button/index.ts
      if (source.startsWith("@aolda/ui/components/")) {
        const componentName = source.replace("@aolda/ui/components/", "");
        return resolve(aoldaSrc, `components/${componentName}/index.ts`);
      }

      // Primitives: @aolda/ui/primitives/dialog
      // → packages/ui/src/primitives/dialog.ts
      if (source.startsWith("@aolda/ui/primitives/")) {
        const primitiveName = source.replace("@aolda/ui/primitives/", "");
        return resolve(aoldaSrc, `primitives/${primitiveName}.ts`);
      }
      if (source === "@aolda/ui/primitives") {
        return resolve(aoldaSrc, "primitives/index.ts");
      }

      // Utils barrel
      if (source === "@aolda/ui/utils") {
        return resolve(aoldaSrc, "utils/index.ts");
      }

      // Registry barrel
      if (source === "@aolda/ui/registry") {
        return resolve(aoldaSrc, "registry/index.ts");
      }

      // Catch-all for any other @aolda/ui/styles/* CSS imports
      if (source.startsWith("@aolda/ui/styles/")) {
        const styleName = source.replace("@aolda/ui/styles/", "");
        return resolve(aoldaSrc, `styles/${styleName}.css`);
      }

      return undefined;
    },

    configResolved(config: { server: { fs: { allow: string[] } } }) {
      // Append aolda source to the existing allow list rather than replacing it.
      // Using config() would shallow-merge and override Astro/Vite defaults.
      if (config.server?.fs?.allow) {
        config.server.fs.allow.push(aoldaRoot);
      }
    },
  };
}
