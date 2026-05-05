import { type FC, useState, useMemo } from "react";
import { aoldaRegistryJson } from "virtual:aolda-registry";

// Types for the registry
interface PropInfo {
  type: string;
  optional?: boolean;
  required?: boolean;
  values?: string[];
  descriptions?: Record<string, string>;
  default?: string;
  description?: string;
}

interface SubComponent {
  description?: string;
  props?: Record<string, PropInfo>;
  renderElement?: string;
}

interface ComponentInfo {
  name: string;
  description: string;
  importPath: string;
  category: string;
  props: Record<string, PropInfo>;
  examples: string[];
  colors: string[];
  subComponents?: Record<string, SubComponent>;
}

interface ComponentRegistry {
  version: string;
  components: Record<string, ComponentInfo>;
  search: {
    byName: string[];
    byCategory: Record<string, string[]>;
  };
}

const registry = aoldaRegistryJson as unknown as ComponentRegistry;

const ComponentCard: FC<{
  component: ComponentInfo;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ component, isExpanded, onToggle }) => {
  // Get variant props (props with values array)
  const variantProps = Object.entries(component.props).filter(
    ([, prop]) => prop.values && prop.values.length > 0,
  );

  return (
    <div className="rounded-lg border border-aolda-hairline bg-aolda-base">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-aolda-overlay"
      >
        <div>
          <h3 className="font-semibold text-aolda-default">{component.name}</h3>
          <p className="mt-1 text-sm text-aolda-subtle">
            {component.description}
          </p>
        </div>
        <span className="ml-4 text-aolda-subtle">{isExpanded ? "−" : "+"}</span>
      </button>

      {isExpanded && (
        <div className="border-t border-aolda-hairline p-4">
          {/* Import */}
          <div className="mb-4">
            <h4 className="mb-2 text-xs font-medium text-aolda-subtle uppercase">
              Import
            </h4>
            <code className="block rounded bg-aolda-overlay p-2 text-xs">
              import {"{"} {component.name} {"}"} from "{component.importPath}";
            </code>
          </div>

          {/* Variants */}
          {variantProps.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-xs font-medium text-aolda-subtle uppercase">
                Variants
              </h4>
              <div className="space-y-2">
                {variantProps.map(([propName, prop]) => (
                  <div key={propName}>
                    <span className="font-mono text-sm text-aolda-default">
                      {propName}
                    </span>
                    {prop.default && (
                      <span className="ml-2 text-xs text-aolda-subtle">
                        (default: {prop.default})
                      </span>
                    )}
                    <div className="mt-1 flex flex-wrap gap-1">
                      {prop.values?.map((value) => (
                        <span
                          key={value}
                          className="rounded bg-aolda-overlay px-2 py-0.5 text-xs text-aolda-default"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-components */}
          {component.subComponents &&
            Object.keys(component.subComponents).length > 0 && (
              <div className="mb-4">
                <h4 className="mb-2 text-xs font-medium text-aolda-subtle uppercase">
                  Sub-components
                </h4>
                <div className="flex flex-wrap gap-1">
                  {Object.keys(component.subComponents).map((subName) => (
                    <span
                      key={subName}
                      className="rounded bg-aolda-overlay px-2 py-0.5 text-xs text-aolda-default"
                    >
                      {component.name}.{subName}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Colors */}
          {component.colors && component.colors.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-medium text-aolda-subtle uppercase">
                Semantic Tokens
              </h4>
              <div className="flex flex-wrap gap-1">
                {component.colors.map((color) => (
                  <span
                    key={color}
                    className="rounded bg-aolda-overlay px-2 py-0.5 text-xs text-aolda-default"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ComponentRegistryView: FC = () => {
  const [expandedComponent, setExpandedComponent] = useState<string | null>(
    null,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    return Object.keys(registry.search.byCategory).sort();
  }, []);

  const filteredComponents = useMemo(() => {
    const components = Object.values(registry.components);
    if (!selectedCategory)
      return components.sort((a, b) => a.name.localeCompare(b.name));
    return components
      .filter((c) => c.category === selectedCategory)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [selectedCategory]);

  const toggleComponent = (name: string) => {
    setExpandedComponent((current) => (current === name ? null : name));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="rounded-lg border border-aolda-hairline bg-aolda-base px-4 py-2">
          <span className="font-semibold text-aolda-default">
            {Object.keys(registry.components).length}
          </span>
          <span className="ml-1 text-aolda-subtle">components</span>
        </div>
        <div className="rounded-lg border border-aolda-hairline bg-aolda-base px-4 py-2">
          <span className="font-semibold text-aolda-default">
            {categories.length}
          </span>
          <span className="ml-1 text-aolda-subtle">categories</span>
        </div>
        <div className="rounded-lg border border-aolda-hairline bg-aolda-base px-4 py-2">
          <span className="text-aolda-subtle">v</span>
          <span className="font-semibold text-aolda-default">
            {registry.version}
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            selectedCategory === null
              ? "bg-aolda-brand text-white"
              : "bg-aolda-overlay text-aolda-default hover:bg-aolda-recessed"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              selectedCategory === category
                ? "bg-aolda-brand text-white"
                : "bg-aolda-overlay text-aolda-default hover:bg-aolda-recessed"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Component List */}
      <div className="space-y-2">
        {filteredComponents.map((component) => (
          <ComponentCard
            key={component.name}
            component={component}
            isExpanded={expandedComponent === component.name}
            onToggle={() => toggleComponent(component.name)}
          />
        ))}
      </div>
    </div>
  );
};
