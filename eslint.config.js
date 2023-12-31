import javascript from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import qwik from "eslint-plugin-qwik";
import importSort from "eslint-plugin-simple-import-sort";

export default [
  {
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
  },
  {
    ignores: ["dist/*", "server/*"],
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      "import-sort": importSort,
      qwik,
    },
    rules: {
      ...javascript.configs.recommended.rules,
      ...typescript.configs["recommended-type-checked"]?.rules,
      ...typescript.configs["strict-type-checked"]?.rules,
      ...typescript.configs["stylistic-type-checked"]?.rules,
      ...qwik.configs.recommended.rules,
      ...qwik.configs.strict.rules,

      "import-sort/imports": "error",
      "import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
      "no-redeclare": "off",
    },
  },
];
