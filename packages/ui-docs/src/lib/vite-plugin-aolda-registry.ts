import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const VIRTUAL_MODULE_ID = "virtual:aolda-registry";
const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;

/**
 * Vite plugin that provides component registry data as a virtual module.
 * Loads the markdown file at dev time, no build step required.
 * Hot reloads when the registry file changes.
 *
 * @returns Astro/Vite compatible plugin
 */
export function aoldaRegistryPlugin() {
  // Navigate from ui-docs/src/lib to ui/ai/
  const registryFile = resolve(
    __dirname,
    "../../../ui/registry/component-registry.json",
  );

  return {
    name: "vite-plugin-aolda-registry",

    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    async load(id: string) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const json = await readFile(registryFile, "utf8");

        return `
export const aoldaRegistryJson = ${json};
`;
      }
    },

    configureServer(server: {
      watcher: {
        add: (paths: string[]) => void;
        on: (event: string, callback: (file: string) => void) => void;
      };
      moduleGraph: {
        getModuleById: (id: string) => unknown;
        invalidateModule: (mod: any) => void;
      };
      ws: { send: (message: { type: string }) => void };
    }) {
      // Watch registry files and trigger HMR when they change
      server.watcher.add([registryFile]);

      server.watcher.on("change", (file: string) => {
        if (file.endsWith(registryFile.split("/").pop()!)) {
          const mod = server.moduleGraph.getModuleById(
            RESOLVED_VIRTUAL_MODULE_ID,
          );
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: "full-reload" });
          }
        }
      });
    },
  };
}
