# AOLDA KNOWLEDGE BASE

**Updated:** 2026-05-05 | **Scope:** Component library and docs

## OVERVIEW

Aolda's React component library (`@aolda/ui`) and Astro documentation site. The workspace centers on the reusable component package, generated component registry, semantic token system, docs demos, custom lint rules, changesets, release workflow, and docs deploy workflow.

## STRUCTURE

```
ui/
├── packages/
│   ├── ui/                     # Component library → see packages/ui/AGENTS.md
│   └── ui-docs/          # Astro docs site → see packages/ui-docs/AGENTS.md
├── ci/                           # Minimal CI scripts → see ci/AGENTS.md
├── lint/                         # Shared custom oxlint rules
├── .changeset/                   # Changeset files
├── .github/actions/              # Composite GitHub Actions helpers
├── .github/workflows/            # Pull request, release, and docs deploy workflows
├── .opencode/agents/             # Opencode agent profile(s)
└── lefthook.yml                  # Pre-push changeset validation
```

## WHERE TO LOOK

| Task              | Location                                       | Notes                                                                            |
| ----------------- | ---------------------------------------------- | -------------------------------------------------------------------------------- |
| Component API     | `packages/ui/registry/component-registry.json` | Generated registry JSON shipped from package export; not manually edited         |
| Component source  | `packages/ui/src/components/{name}/{name}.tsx` | Standard pattern; `chart` and `flow` use explicit registry source-file overrides |
| Semantic tokens   | `packages/ui/src/styles/theme-aolda.css`       | AUTO-GENERATED; edit `scripts/theme-generator/config.ts`                         |
| Custom lint rules | `lint/`                                        | Shared Aolda oxlint plugin rules                                                 |
| Demo examples     | `packages/ui-docs/src/components/demos/`       | Feed into registry codegen                                                       |
| CI scripts        | `ci/`                                          | Changeset/config validation helpers                                              |
| GitHub workflows  | `.github/workflows/`                           | PR, release, docs deploy                                                         |
| Agent profiles    | `.opencode/agents/`                            | Opencode-specific agent instructions                                             |

## ENVIRONMENT

- **Node**: `^24.12.0`
- **pnpm**: `10.22.0`
- **ESM-only**: `"type": "module"` throughout. No CommonJS.

## CONVENTIONS

### Styling

- **ONLY semantic tokens**: `bg-aolda-base`, `text-aolda-default`, `border-aolda-line`, `ring-aolda-hairline`
- **NEVER raw Tailwind colors**: `bg-blue-500`, `text-gray-900` fail lint
- **NEVER `dark:` variant**: dark mode is automatic via `light-dark()` CSS custom properties
- **Exceptions**: `bg-white`, `bg-black`, `text-white`, `text-black`, `transparent`
- **`cn()` utility**: compose class names with `cn("base", conditional && "extra", className)`
- **Mode/theme**: `data-mode="light"|"dark"` + `data-theme="fedramp"` on parent element

### Components

- **Scaffold new**: `pnpm --filter @aolda/ui new:component`
- **Registry first**: generate/check `component-registry.json` before using component APIs, then edit source files/types as the canonical input
- See `packages/ui/AGENTS.md` for component conventions.

### Imports

- **No cross-package relative imports**: use `@aolda/ui`, not `../../ui/src/...`

### Changesets

- **Enforced for `packages/ui/`**: pre-push hook requires a changeset for npm-published library changes
- **Optional for `ui-docs`**: version appears in `/api/version` but no package depends on it
- **AI agents NEVER**: `pnpm version`, `pnpm release`, or direct publish commands unless explicitly requested

## ANTI-PATTERNS

| Pattern                        | Why                                                  | Instead                                     |
| ------------------------------ | ---------------------------------------------------- | ------------------------------------------- |
| `bg-blue-500`, `text-gray-*`   | Breaks theming, fails lint                           | `bg-aolda-brand`, `text-aolda-default`      |
| `dark:bg-black`                | Redundant; tokens auto-adapt                         | Remove `dark:` prefix                       |
| Missing `displayName`          | Breaks React DevTools                                | Set `.displayName` on forwardRef components |
| Manual component file creation | Misses vite/package.json/index updates               | Use scaffolding tool                        |
| Editing generated files        | Registry/theme CSS are generated from source configs | Edit source configs, run codegen            |

## COMMANDS

```bash
# Cross-cutting
pnpm dev
pnpm build
pnpm build:all
pnpm lint
pnpm typecheck
pnpm test
pnpm changeset
pnpm format
pnpm preview
pnpm lockfile-check

# Package-specific
pnpm --filter @aolda/ui build
pnpm --filter @aolda/ui test
pnpm --filter @aolda/ui test:exports
pnpm --filter @aolda/ui codegen:registry
pnpm --filter @aolda/ui-docs build
pnpm --filter @aolda/ui-docs codegen:demos
```

## BUILD PIPELINE

```
theme config → aolda codegen:themes → src/styles/theme-*.css

ui-docs demos → dist/demo-metadata.json
                              ↓
aolda codegen:registry → registry/component-registry.json
                              ↓
aolda build → dist/* + dist/aolda.css
```

Cross-package dependency: registry codegen requires docs demo metadata. Run docs `codegen:demos` before `@aolda/ui` `codegen:registry` when regenerating manually.

## CI/CD

- `pullrequest.yml`: changeset validation, `@aolda/ui` build, then lint/typecheck/test using uploaded `dist` and registry artifacts.
- `release.yml`: changesets action creates version PRs or publishes npm releases from `main`.
- `deploy-docs.yml`: builds `@aolda/ui-docs` and deploys the docs site with Wrangler on `main` changes or manual dispatch.
- `.github/actions/install-dependencies/action.yml`: shared pnpm/Node setup with pnpm lockfile install.

## NOTES

- `src/primitives/` contains auto-generated Base UI re-exports.
- `src/code/` remains because docs and consumers use syntax highlighting exports.
- `packages/ui/registry/component-registry.json` and `packages/ui-docs/dist/demo-metadata.json` are generated and gitignored.
- `PLOP_INJECT_EXPORT` and `PLOP_INJECT_COMPONENT_ENTRY` markers remain for component scaffolding.
