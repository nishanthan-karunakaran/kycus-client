// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      {
        languageOptions: {
          parserOptions: {
            project: "./tsconfig.json",
            tsconfigRootDir: __dirname,
          },
        },
      },
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // "@angular-eslint/directive-selector": [
      //   "error",
      //   {
      //     type: "attribute",
      //     prefix: ["app", "ui"],
      //     style: "camelCase",
      //   },
      // ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: ["app", "ui"],
          style: "kebab-case",
        },
      ],
      "@typescript-eslint/no-empty-function": "off", // Function body should not be empty
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/prefer-as-const": "error",
      // "@typescript-eslint/no-magic-numbers": [
      //   "error",
      //   {
      //     ignoreArrayIndexes: true,
      //   },
      // ],
      "@typescript-eslint/array-type": [
        "error",
        {
          default: "array-simple",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*"],
        },
      ],
      "@typescript-eslint/no-useless-constructor": "error",
      "no-extra-boolean-cast": "error",
      eqeqeq: "error",
      "no-console": "error",
      "no-debugger": "error", // Disallows debugger
      // "no-undef": "error", // Ensures no variables are used without being defined
      "no-duplicate-imports": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
);
