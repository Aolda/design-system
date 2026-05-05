/**
 * @module @aolda/ui
 *
 * Aolda's React component library built on Base UI and Tailwind CSS v4.
 *
 * **Key rules:**
 * - Use **semantic tokens only** (`bg-aolda-base`, `text-aolda-default`, etc.) — never raw Tailwind colors.
 * - **No `dark:` variant** — light/dark mode is handled automatically via CSS `light-dark()`.
 * - Merge custom classes with the `cn()` utility exported from this package.
 * - Wrap your app with the aolda CSS import: `import "@aolda/ui/styles"`.
 *
 * **Component categories:**
 * - **Action:** Button, ClipboardText
 * - **Display:** Badge, Breadcrumbs, Code, Empty, LayerCard, Meter, Surface (deprecated), Text
 * - **Feedback:** Banner, Loader, Toast
 * - **Input:** Checkbox, Combobox, DateRangePicker, Field, Input, Radio, Select, SensitiveInput, Switch
 * - **Layout:** Grid, Surface
 * - **Navigation:** CommandPalette, MenuBar, Pagination, Tabs
 * - **Overlay:** Dialog, DropdownMenu, Popover, Tooltip
 * - **Other:** Label, Link
 *
 * **Registry resources:** See `@aolda/ui/registry/component-registry.json` for full
 * component metadata including prop descriptions, variant values, and examples.
 *
 * @see {@link https://ui.aoldacloud.com} — Documentation site
 */

// Components
export { Badge, type BadgeVariant } from "./components/badge";
export { Banner, BannerVariant } from "./components/banner";
export {
  Button,
  RefreshButton,
  LinkButton,
  buttonVariants,
  type ButtonProps,
  type LinkButtonProps,
} from "./components/button";
/**
 * @deprecated Use {@link DatePicker} with `mode="range"` instead.
 */
export { DateRangePicker } from "./components/date-range-picker";
export {
  Checkbox,
  type CheckboxProps,
  type CheckboxLegendProps,
  type CheckboxChangeEventDetails,
} from "./components/checkbox";
export { ClipboardText } from "./components/clipboard-text";
export { Code, CodeBlock } from "./components/code";
export { Combobox } from "./components/combobox";
export {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
  type DialogProps,
  type DialogRootProps,
  type DialogTriggerProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
  type DialogCloseProps,
} from "./components/dialog";
export { DropdownMenu } from "./components/dropdown";
export {
  Collapsible,
  type CollapsibleProps,
  type CollapsibleRootProps,
  type CollapsibleTriggerProps,
  type CollapsiblePanelProps,
  type CollapsibleDefaultTriggerProps,
  type CollapsibleDefaultPanelProps,
} from "./components/collapsible";
export {
  Field,
  type FieldProps,
  type FieldErrorMatch,
  fieldVariants,
  AOLDA_FIELD_VARIANTS,
  AOLDA_FIELD_DEFAULT_VARIANTS,
} from "./components/field";
export {
  Label,
  type LabelProps,
  labelVariants,
  labelContentVariants,
  AOLDA_LABEL_VARIANTS,
  AOLDA_LABEL_DEFAULT_VARIANTS,
} from "./components/label";
export {
  Input,
  inputVariants,
  type InputProps,
  InputArea,
  Textarea,
  type InputAreaProps,
} from "./components/input";
export {
  InputGroup,
  type InputGroupRootProps,
  type InputGroupAddonProps,
  type InputGroupSuffixProps,
  type InputGroupInputProps,
  type InputGroupButtonProps,
} from "./components/input-group";
export { LayerCard } from "./components/layer-card";
export { Loader, SkeletonLine } from "./components/loader";
export { MenuBar, useMenuNavigation } from "./components/menubar";
export { Meter } from "./components/meter";
export { Pagination } from "./components/pagination";
export { Select } from "./components/select";
/**
 * @deprecated Use {@link LayerCard} instead.
 */
export { Surface } from "./components/surface";
export { Switch, type SwitchLegendProps } from "./components/switch";
export { Tabs, type TabsProps, type TabsItem } from "./components/tabs";
export { Table } from "./components/table";
export { Text } from "./components/text";
export {
  Toasty,
  ToastProvider,
  Toast,
  useAoldaToastManager,
} from "./components/toast";
export { Tooltip, TooltipProvider } from "./components/tooltip";
export {
  Popover,
  AOLDA_POPOVER_VARIANTS,
  AOLDA_POPOVER_DEFAULT_VARIANTS,
  type PopoverRootProps,
  type PopoverTriggerProps,
  type PopoverContentProps,
  type PopoverTitleProps,
  type PopoverDescriptionProps,
  type PopoverCloseProps,
} from "./components/popover";
export {
  SensitiveInput,
  type SensitiveInputProps,
  AOLDA_SENSITIVE_INPUT_VARIANTS,
  AOLDA_SENSITIVE_INPUT_DEFAULT_VARIANTS,
} from "./components/sensitive-input";
export {
  Radio,
  RadioGroup,
  AOLDA_RADIO_VARIANTS,
  AOLDA_RADIO_DEFAULT_VARIANTS,
  radioVariants,
  type RadioGroupProps,
  type RadioLegendProps,
  type RadioItemProps,
  type RadioControlPosition,
  type AoldaRadioVariant,
  type AoldaRadioAppearance,
  type AoldaRadioVariantsProps,
  type RadioVariant,
} from "./components/radio";
export {
  CommandPalette,
  AOLDA_COMMAND_PALETTE_VARIANTS,
  AOLDA_COMMAND_PALETTE_DEFAULT_VARIANTS,
  type CommandPaletteRootProps,
  type CommandPaletteItemProps,
  type CommandPaletteResultItemProps,
  type CommandPaletteFooterProps,
  type CommandPaletteListProps,
  type CommandPaletteGroupProps,
  type CommandPaletteGroupLabelProps,
  type CommandPaletteEmptyProps,
  type CommandPaletteLoadingProps,
  type HighlightRange,
} from "./components/command-palette";
export {
  Link,
  linkVariants,
  AOLDA_LINK_VARIANTS,
  AOLDA_LINK_DEFAULT_VARIANTS,
  type LinkProps,
  type AoldaLinkVariant,
  type AoldaLinkVariantsProps,
} from "./components/link";
export { Breadcrumbs, type BreadcrumbsProps } from "./components/breadcrumbs";
export { Empty, type EmptyProps } from "./components/empty";
export {
  Grid,
  GridItem,
  gridVariants,
  gridItemVariants,
  AOLDA_GRID_VARIANTS,
  AOLDA_GRID_DEFAULT_VARIANTS,
  type GridProps,
  type GridItemProps,
  type AoldaGridVariant,
  type AoldaGridGap,
} from "./components/grid";
export {
  AoldaLogo,
  AOLDA_AOLDA_LOGO_VARIANTS,
  AOLDA_AOLDA_LOGO_DEFAULT_VARIANTS,
  type AoldaLogoProps,
  type AoldaLogoVariant,
  PoweredByAolda,
  type PoweredByAoldaProps,
  generateAoldaLogoSvg,
  type GenerateAoldaLogoSvgOptions,
} from "./components/aolda-logo";

// DatePicker
export {
  DatePicker,
  datePickerVariants,
  AOLDA_DATE_PICKER_VARIANTS,
  AOLDA_DATE_PICKER_DEFAULT_VARIANTS,
  type DatePickerProps,
  type AoldaDatePickerVariant,
  type AoldaDatePickerVariantsProps,
  type DateRange,
  type DayPickerProps,
} from "./components/date-picker";

export { Flow } from "./components/flow";
export {
  Chart,
  ChartPalette,
  TimeseriesChart,
  ChartLegend,
  type AoldaChartOption,
} from "./components/chart";
export {
  Autocomplete,
  type AutocompleteProps,
  type AoldaAutocompleteSize,
  autocompleteVariants,
  AOLDA_AUTOCOMPLETE_VARIANTS,
  AOLDA_AUTOCOMPLETE_DEFAULT_VARIANTS,
} from "./components/autocomplete";

// Sidebar
export {
  Sidebar,
  SidebarProvider,
  SidebarRoot,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  SidebarInput,
  SidebarTrigger,
  SidebarRail,
  SidebarResizeHandle,
  SidebarMenuChevron,
  SidebarCollapsible,
  SidebarCollapsibleTrigger,
  SidebarCollapsibleContent,
  useSidebar,
  AOLDA_SIDEBAR_VARIANTS,
  AOLDA_SIDEBAR_DEFAULT_VARIANTS,
  AOLDA_SIDEBAR_STYLING,
  type SidebarSide,
  type SidebarVariant,
  type SidebarCollapsible as SidebarCollapsibleType,
  type SidebarContextValue,
  type SidebarProviderProps,
  type SidebarRootProps,
  type SidebarMenuButtonSize,
  type SidebarMenuButtonProps,
  type SidebarMenuSubButtonProps,
  type SidebarInputProps,
} from "./components/sidebar";
export {
  TableOfContents,
  type TableOfContentsProps,
  type TableOfContentsTitleProps,
  type TableOfContentsListProps,
  type TableOfContentsItemProps,
  type TableOfContentsGroupProps,
  AOLDA_TABLE_OF_CONTENTS_VARIANTS,
  AOLDA_TABLE_OF_CONTENTS_DEFAULT_VARIANTS,
  type AoldaTableOfContentsState,
} from "./components/table-of-contents";
// PLOP_INJECT_EXPORT

// Utils
export { cn, safeRandomId } from "./utils/cn";
export {
  LinkProvider,
  useLinkComponent,
  type LinkComponentProps,
} from "./utils/link-provider";
export {
  AoldaPortalProvider,
  type PortalContainer,
} from "./utils/portal-provider";

// Registry types (for consuming packages to type registry JSON)
export type {
  ComponentRegistry,
  ComponentSchema,
  ComponentStyling,
  ComponentType,
  PropSchema,
  SubComponentSchema,
} from "./registry/types";
