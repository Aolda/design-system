# Aolda

Aolda's component library for building modern web applications.

Aolda provides accessible, design-system-compliant UI components built on [Base UI](https://base-ui.com/). It handles keyboard navigation, focus management, and ARIA attributes so you can build accessible applications without thinking through every detail.

> [!NOTE]  
> Aolda Design System is based on the structure of [Cloudflare Kumo](https://github.com/cloudflare/kumo) and is maintained independently for Aolda's component library, design tokens, and documentation.

## Installation

```bash
pnpm add @aolda/ui
```

### Peer Dependencies

```bash
pnpm add react react-dom @phosphor-icons/react
```

## Usage

```tsx
import { Button, Input, Dialog } from "@aolda/ui";
import "@aolda/ui/styles";
```

### Granular Imports (Tree-Shaking)

```tsx
import { Button } from "@aolda/ui/components/button";
```

### Base UI Primitives

Aolda re-exports all Base UI primitives for advanced use cases:

```tsx
import { Popover } from "@aolda/ui/primitives/popover";
```

## Component Registry

Aolda generates machine-readable component metadata for docs and tooling:

```bash
jq '.components.Button.props' packages/ui/registry/component-registry.json
```

## Development

See [AGENTS.md](./AGENTS.md) for comprehensive development documentation including:

- Component patterns and styling system
- Semantic color tokens
- Development workflows
- CI/CD pipeline

### Quick Start

```bash
pnpm install
pnpm dev                    # Start docs site at localhost:4321
pnpm --filter @aolda/ui test
```

### Creating Components

```bash
pnpm --filter @aolda/ui new:component
```

## Documentation

- **Live Docs**: [ui.aoldacloud.com](https://ui.aoldacloud.com)
- **AI/Agent Guide**: [AGENTS.md](./AGENTS.md)

## License

MIT
