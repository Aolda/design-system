# Component Source (`src/components/`)

Public component source for `@aolda/ui`. Base UI primitives + Tailwind v4 styling. Compound component pattern throughout.

**Parent:** See [packages/ui/AGENTS.md](../../AGENTS.md) for library context.

## STRUCTURE

Most components follow: `{name}/{name}.tsx` + optional `{name}.test.tsx`, `{name}.browser.test.tsx`. Index/compound exceptions such as `chart` and `flow` are included in registry generation through explicit source-file overrides.

```
components/
├── button/button.tsx           # Simple component
├── dialog/dialog.tsx           # Compound (Root, Trigger, Title, Description, Close)
├── sidebar/                    # Large compound component with provider/menu behavior
├── command-palette/            # Complex command UI, panel context, keyboard nav
├── date-range-picker/          # Compatibility component
├── combobox/                   # Root, Content, TriggerValue, TriggerInput, Item, Chip
├── flow/                       # diagram/node/parallel files, descendants tracking system
├── chart/                      # EChart.tsx + TimeseriesChart.tsx + Legend.tsx
└── ...
```

## REQUIRED EXPORTS

Every component file MUST export (lint-enforced by `enforce-variant-standard`):

```typescript
// 1. Variants object - machine-readable styling options
export const AOLDA_BUTTON_VARIANTS = {
  variant: {
    primary: { classes: "bg-aolda-brand ...", description: "Primary action" },
    secondary: { classes: "bg-aolda-elevated ...", description: "Secondary action" },
    // ...
  },
  size: { xs: {...}, sm: {...}, base: {...}, lg: {...} },
  shape: { base: {...}, square: {...}, circle: {...} }
} as const;

// 2. Defaults - must reference keys from variants
export const AOLDA_BUTTON_DEFAULT_VARIANTS = {
  variant: "secondary",
  size: "base",
  shape: "base"
} as const;

// 3. Optional: registry styling metadata
export const AOLDA_BUTTON_STYLING = {
  baseClasses: "inline-flex items-center ...",
  iconPosition: "left"
} as const;
```

## COMPONENT PATTERNS

### Simple Component

```typescript
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, shape, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";  // REQUIRED on forwardRef components
```

### Compound Component (Object.assign)

Object.assign is common for compound components:

```typescript
const DialogRoot = forwardRef<...>(...);
const DialogTrigger = forwardRef<...>(...);
const DialogTitle = forwardRef<...>(...);

export const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Title: DialogTitle,
  // ...
});

// displayName with dot notation
DialogRoot.displayName = "Dialog";
DialogTrigger.displayName = "Dialog.Trigger";
```

### Context Hierarchy

```typescript
// Multi-level context for compound components
const DialogRoleContext = createContext<"dialog" | "alertdialog">("dialog");
const ComboboxSizeContext = createContext<Size>("base");
const FlowNodeAnchorContext = createContext<AnchorRegistration | null>(null);
const SwitchGroupContext = createContext<{ controlFirst: boolean }>({
  controlFirst: true,
});
```

### Base UI Adaptation

```typescript
import { Dialog as DialogBase } from "@base-ui/react/dialog";

// Wrap with styling + aolda conventions
const DialogContent = forwardRef<...>(({ className, ...props }, ref) => (
  <DialogBase.Popup
    ref={ref}
    className={cn("bg-aolda-elevated rounded-lg ...", className)}
    {...props}
  />
));
```

### Field Wrapper Integration

Input, Select, Combobox auto-wrap with Field when `label` prop provided:

```typescript
if (label) {
  return <Field label={label} description={description} error={error}>{input}</Field>;
}
return input;
```

### Type Derivation from Variants

```typescript
export type AoldaButtonVariant = keyof typeof AOLDA_BUTTON_VARIANTS.variant;
export type AoldaButtonSize = keyof typeof AOLDA_BUTTON_VARIANTS.size;
// Legacy alias for backwards compatibility
export type ButtonVariant = AoldaButtonVariant;
```

## STYLING CONVENTIONS

### cn() Always

```typescript
// CORRECT
className={cn("base-classes", conditional && "extra", className)}

// WRONG - loses passthrough className
className="base-classes"
```

### State Classes (for Registry Extraction)

Tailwind state prefixes are extractable:

```typescript
classes: "bg-aolda-elevated hover:bg-aolda-base focus:ring-aolda-hairline disabled:opacity-50";
// Parsed into: { default, hover, focus, disabled } state map
```

## ANTI-PATTERNS

| Pattern               | Why                   | Instead                                    |
| --------------------- | --------------------- | ------------------------------------------ |
| Missing `displayName` | Breaks React DevTools | Set after forwardRef                       |
| Raw className string  | Loses passthrough     | Use `cn(base, className)`                  |
| `as any`              | Type safety           | Model types correctly (3 exist, don't add) |
| Hardcoded colors      | Breaks theming        | Use semantic tokens                        |
| `dark:` prefix        | Redundant             | Tokens auto-adapt                          |

## COMPLEXITY HOTSPOTS

| Component         | Notes                                                               |
| ----------------- | ------------------------------------------------------------------- |
| `flow`            | Multi-file diagram/node/parallel system, connector drawing          |
| `input-group`     | Compound input shell plus addon/button/suffix/input files and tests |
| `sidebar`         | Provider, menu, resize, and mobile behavior                         |
| `command-palette` | Compound command UI, panel context, keyboard nav                    |
| `select`          | Base UI wrapping, generic item handling, compatibility props        |
| `chart`           | ECharts passed externally to avoid bundling                         |
| `pagination`      | Multiple layout modes and page-size controls                        |
| `combobox`        | Object values, input/value triggers, chips                          |

## NOTES

- **forwardRef-heavy**: Interactive wrappers generally use forwardRef and must set displayName
- **Discriminated union props**: ButtonWithTextProps vs IconOnlyButtonProps pattern for conditional required props
- **A11y dev warnings**: Components log console.warn in dev if missing accessible name
- **Descendants hook**: `flow/use-children.tsx` uses `claimRenderOrder()` and `measurementEpoch` for deterministic connector drawing
- **LinkProvider**: `utils/link-provider.tsx` abstracts framework-specific links (wrap app with custom Link component)
