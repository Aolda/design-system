/**
 * Type declarations for virtual:aolda-registry module.
 * Provides component registry data from the generated registry JSON.
 */
declare module "virtual:aolda-registry" {
  import type { ComponentRegistry } from "@aolda/ui";

  /** Typed component registry JSON */
  export const aoldaRegistryJson: ComponentRegistry;
}
