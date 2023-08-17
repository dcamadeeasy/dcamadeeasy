declare module "eslint-plugin-simple-import-sort" {
  import type { ESLint } from "eslint";

  const plugin: ESLint.Plugin;

  export default plugin;
}

declare module "eslint-plugin-qwik" {
  import type { ESLint, Linter } from "eslint";

  const plugin: ESLint.Plugin & {
    configs: {
      recommended: Linter.FlatConfig;
      strict: Linter.FlatConfig;
    };
  };

  export default plugin;
}
