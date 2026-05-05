import aoldaPlugin from "./aolda-plugin.js";
import { noDeprecatedPropsRule } from "./no-deprecated-props.js";

const plugin = {
  meta: {
    name: "aolda",
  },
  rules: {
    ...aoldaPlugin.rules,
    "no-deprecated-props": noDeprecatedPropsRule,
  },
};

export default plugin;
