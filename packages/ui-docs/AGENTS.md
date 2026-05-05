# Docs Site (`@aolda/ui-docs`)

Astro documentation site for Aolda. React islands architecture. This package provides documentation, demos, API endpoints, registry metadata inputs, and docs deploy configuration.

**Parent:** See [root AGENTS.md](../../AGENTS.md) for monorepo context.

## STRUCTURE

```
ui-docs/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── components/{name}.mdx    # Component doc pages
│   │   └── api/                     # JSON endpoints
│   ├── components/
│   │   ├── demos/                   # *Demo.tsx files feed registry codegen
│   │   └── docs/                    # Doc components
│   ├── layouts/                     # BaseLayout → MainLayout → DocLayout
│   ├── lib/
│   │   ├── vite-plugin-aolda-colors.ts
│   │   ├── vite-plugin-aolda-registry.ts
│   │   ├── vite-plugin-aolda-hmr.ts
│   │   └── component-registry.ts
│   └── styles/global.css            # Tailwind entry + @source to aolda dist
├── scripts/
│   └── extract-demo-examples.ts     # Parses demos → dist/demo-metadata.json
├── astro.config.mjs
└── wrangler.jsonc
```

## WHERE TO LOOK

| Task               | Location                                        | Notes                                |
| ------------------ | ----------------------------------------------- | ------------------------------------ |
| Component doc page | `src/pages/components/{name}.mdx`               | Uses MdxDocLayout + ComponentExample |
| Demo examples      | `src/components/demos/{Name}Demo.tsx`           | Naming is load-bearing               |
| Props table        | `src/components/docs/PropsTable.astro`          | Server-rendered from registry        |
| Layout/nav         | `src/layouts/`, `src/components/SidebarNav.tsx` | Nav items are hard-coded             |
| Color tokens page  | `src/pages/colors.mdx` + `ColorsDemo.tsx`       | Uses `virtual:aolda-colors`          |
| Registry viewer    | `src/pages/registry.mdx` + `RegistryDemo.tsx`   | Uses `virtual:aolda-registry`        |

## CONVENTIONS

### Demo File Naming

Demo extraction relies on exact naming:

- **File**: `{Component}Demo.tsx`, for example `ButtonDemo.tsx`.
- **Exports**: functions ending in `Demo`, for example `export function ButtonPrimaryDemo()`.
- **Both forms work**: `export function FooDemo()` and `export const FooDemo = () =>`.
- **JSDoc** on demos becomes the `description` field in metadata.

Wrong naming means the function is not extracted and will be missing from component registry examples.

### Hydration Directives

| Directive             | When                                         |
| --------------------- | -------------------------------------------- |
| `client:visible`      | Most component demos                         |
| `client:load`         | Interactive: Dialog, Search, Toast, Registry |
| `client:only="react"` | SSR mismatch: ThemeToggle, HomeGrid          |
| `client:idle`         | Low priority: CopyPageButton                 |

### Registry Access Patterns

- **Server-side** (`.astro` files): import from `~/lib/component-registry.ts`.
- **Client-side** (React demos): use `virtual:aolda-registry`.
- Do not mix them.

## ANTI-PATTERNS

| Pattern                             | Why                             | Instead                                |
| ----------------------------------- | ------------------------------- | -------------------------------------- |
| Demo function without `Demo` suffix | Won't be extracted for registry | Always suffix with `Demo`              |
| Manually updating PropsTable        | Data comes from registry        | Regenerate registry                    |
| Forgetting `@source` in global.css  | Tailwind misses aolda classes   | Keep `@source "../../../ui/dist/**/*"` |
| Using system `prefers-color-scheme` | Site uses `data-mode` attribute | Use ThemeToggle / `localStorage.theme` |

## NOTES

- **Build order**: `codegen:demos` runs first in the docs build and produces `dist/demo-metadata.json` consumed by aolda registry codegen.
- **Deploy**: `deploy-docs.yml` deploys the docs site with `pnpm --filter @aolda/ui-docs run deploy`; this uses `wrangler.jsonc`.
- **`dist/` is gitignored**: if `dist/demo-metadata.json` is missing, registry examples may be incomplete.
- **SidebarNav is manual**: adding a component page requires updating nav arrays.
- **HomeGrid is manual**: new components need adding to the showcase grid and route map.
- **Search uses CommandPalette**: client-side search is powered by the component registry API.
