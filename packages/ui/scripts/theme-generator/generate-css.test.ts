import { describe, expect, it } from "vitest";
import { THEME_CONFIG } from "./config";
import {
  generateAoldaThemeCSS,
  generateThemeOverrideCSS,
} from "./generate-css";

function countOccurrences(source: string, needle: string): number {
  return source.split(needle).length - 1;
}

describe("theme css generator", () => {
  it("emits aolda runtime fallback selectors inside base layer", () => {
    const css = generateAoldaThemeCSS(THEME_CONFIG);

    expect(css).toContain("@layer base {");
    expect(css).toContain(':root, [data-theme="aolda"] {');
    expect(css).toContain(
      ':root[data-mode="dark"], [data-mode="dark"]:not([data-theme]), [data-mode="dark"] [data-theme="aolda"], [data-theme="aolda"][data-mode="dark"], [data-theme="aolda"] [data-mode="dark"] {',
    );
  });

  it("emits override theme runtime fallbacks in base layers only", () => {
    const css = generateThemeOverrideCSS(THEME_CONFIG, "fedramp");

    expect(countOccurrences(css, "@layer base {")).toBe(2);
    expect(css).toContain('  [data-theme="fedramp"] {');
    expect(css).toContain(
      '  [data-mode="dark"] [data-theme="fedramp"], [data-theme="fedramp"][data-mode="dark"], [data-theme="fedramp"] [data-mode="dark"] {',
    );
    expect(css).not.toMatch(/\n\[data-theme="fedramp"\] \{/);
  });
});
