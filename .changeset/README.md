# Changesets

This repo uses [Changesets](https://github.com/changesets/changesets) to manage versioning and changelog entries.

## When is a changeset required?

| Package             | Changeset Required?                        | Why                                                   |
| ------------------- | ------------------------------------------ | ----------------------------------------------------- |
| `packages/ui/`      | **Yes** (enforced by pre-push)             | Published to npm as `@aolda/ui`                       |
| `packages/ui-docs/` | Optional (version used for `/api/version`) | Not published, but version exposed in docs site build |

The pre-push hook (`lefthook.yml`) **only enforces** changesets for `packages/ui/` changes.

### How `pnpm changeset version` works

When you run `pnpm changeset version`, it processes **all packages** in the monorepo, so:

- It will bump `ui-docs` version if included in a changeset
- The docs version appears at `/api/version` as `docsVersion` (for debugging deployed builds)
- No automated tooling depends on the docs version number being "correct"

## Version baseline

This repository was reset for the new Aolda design system package line. The public UI package starts at `3.0.0`, docs starts at `0.0.0`, and historical changesets from the source project are intentionally not carried forward.

## Creating a changeset

```bash
pnpm changeset
```

Then:

- Select the package(s) you changed
- Choose the appropriate bump type (patch/minor/major)
- Write a short description of why the change matters

Commit the generated `.md` file in this folder.

## Why this file exists

If `.changeset/config.json` is missing, `pnpm changeset` fails with an `ENOENT` error. Keeping the config committed prevents that.
