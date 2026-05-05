# Component Library (`@aolda/ui`)

React component library: Base UI + Tailwind v4 + Vite library mode. ESM-only, tree-shakeable per-component exports.

**Parent:** See [root AGENTS.md](../../AGENTS.md) for monorepo context.

## STRUCTURE

```
aolda/
├── src/
│   ├── components/          # UI components → see src/components/AGENTS.md
│   ├── primitives/          # AUTO-GENERATED Base UI re-exports
│   ├── code/                # Shiki-based code highlighting
│   ├── styles/              # CSS: aolda-binding.css + generated theme files
│   ├── utils/               # cn(), safeRandomId, LinkProvider
│   ├── registry/            # Types for registry metadata
│   └── index.ts             # Main barrel export
├── registry/                # AUTO-GENERATED component-registry.json
├── scripts/
│   ├── component-registry/  # Registry codegen
│   ├── theme-generator/     # Theme CSS codegen from config.ts
│   ├── generate-primitives.ts
│   └── css-build.ts         # Post-Vite CSS processing
├── tests/imports/           # Structural validation: exports/package/build
├── vite.config.ts           # Library mode, dynamic primitive discovery
└── vitest.config.ts         # happy-dom, v8 coverage, path aliases
```

## WHERE TO LOOK

| Task                     | Location                                         | Notes                                                                            |
| ------------------------ | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| Component implementation | `src/components/{name}/{name}.tsx`               | Standard source location; `chart` and `flow` are index/override-based exceptions |
| Component API reference  | `registry/component-registry.json`               | Generated API contract for props/variants; do not edit manually                  |
| Variant definitions      | `AOLDA_{NAME}_VARIANTS` export in component file | Machine-readable + lint-enforced                                                 |
| Code highlighting        | `src/code/`                                      | ShikiProvider, lazy-loaded highlighter                                           |
| Scaffold new component   | `plopfile.js`                                    | Injects into index.ts, vite.config.ts, package.json                              |
| Token definitions        | `scripts/theme-generator/config.ts`              | Source of truth; generates theme CSS                                             |
| Registry codegen         | `scripts/component-registry/index.ts`            | Discovery → type extraction → enrichment → JSON                                  |

## CONVENTIONS

### Build System

- **Build**: `codegen:registry` → `vite build` → `css-build.ts`
- **Bundled deps**: `@base-ui/react`, `clsx`, `tailwind-merge`
- **External peers**: `react`, `react-dom`, `@phosphor-icons/react`
- **`"use client"` banner**: injected on output chunks for RSC compatibility
- **`sideEffects: ["*.css"]`**: only CSS is side-effectful
- **Manual chunks**: `vendor-styling`, `vendor-floating-ui`, `vendor-base-ui`, `vendor-utils`

### Registry Codegen Pipeline

```
ui-docs demos → dist/demo-metadata.json
                              ↓
ts-json-schema-generator → TypeScript type extraction
                              ↓
Enrichment: variants + examples + sub-components + styling metadata
                              ↓
Output: registry/component-registry.json
```

- **Cache**: hash-based at `.cache/component-registry-cache.json`. Bypass with `--no-cache`.
- **Parallel**: processes components in batches.
- **Fallback**: if type extraction fails, falls back to variants-only props.
- **Source-file overrides**: `scripts/component-registry/discovery.ts` covers index/compound exceptions such as `chart` and `flow`.
- **Metadata overrides**: `scripts/component-registry/metadata.ts`.

### Testing

- **Vitest** with `happy-dom`, globals enabled.
- **Path aliases**: `@/` → `src/`, `@aolda/ui` → `src/index.ts`.
- **Structural tests** in `tests/imports/`: validate export paths and package.json alignment.
- **`describe.skipIf(!isBuilt)`**: export validation tests skip gracefully when `dist/` is missing.

## ANTI-PATTERNS

| Pattern                             | Why                                    | Instead                           |
| ----------------------------------- | -------------------------------------- | --------------------------------- |
| Editing `src/primitives/`           | Auto-generated from Base UI            | Run `pnpm codegen:primitives`     |
| Editing registry JSON manually      | Auto-generated at build time           | Edit source files and run codegen |
| Creating component files manually   | Misses index/vite/package.json updates | `pnpm new:component`              |
| `as any` in component code          | Weakens component API guarantees       | Model types correctly             |
| Dynamic Tailwind class construction | JIT can't detect generated classes     | Use static class strings          |

## NOTES

- **Compound components**: CommandPalette, Dialog, Select use two-level contexts.
- **Deprecated props** are lint-enforced via `no-deprecated-props`, which reads registry data.
- **LinkProvider** is a framework-agnostic link abstraction for custom router links.
