# CI Scripts

CI support for the component library and docs workspace.

## Structure

```text
ci/
├── scripts/
│   ├── ensure-changeset-config.ts
│   └── validate-ui-changeset.ts
├── utils/
│   └── git-operations.ts
└── tsconfig.json
```

## Scope

- Keep changeset validation for `packages/ui` changes.
- Keep simple pull request, release, and docs deploy workflows.

## Commands

```bash
pnpm tsx ci/scripts/validate-ui-changeset.ts
pnpm tsx ci/scripts/ensure-changeset-config.ts
```
