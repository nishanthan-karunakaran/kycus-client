import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";

export default [
  js.configs.recommended,
  {
    ignores: ["dist/**", "node_modules/**", "src/index.html"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
      globals: {

        console: "readonly",
        document: "readonly",
        window: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        navigator: "readonly",
        location: "readonly",
        history: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        fetch: "readonly",


        ng: "readonly",
        injector: "readonly",
        resolver: "readonly",
        appRef: "readonly",
        zone: "readonly",
        bootstrapApplication: "readonly",
        isDevMode: "readonly",


        require: "readonly",
        process: "readonly",
        global: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "@angular-eslint": angular,
    },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: ["app", "ui"],
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: ["app", "ui"],
          style: "kebab-case",
        },
      ],
      "@angular-eslint/no-empty-lifecycle-method": "error",
      "@angular-eslint/no-output-on-prefix": "error",
      "@angular-eslint/component-class-suffix": [
        "error",
        { suffixes: ["Component"] },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^(this\\.|_)",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-trailing-spaces": "error",
      "eol-last": "error",
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
  {
    files: ["**/*.html"],
    plugins: { "@angular-eslint/template": angularTemplate },
    rules: {
      "@angular-eslint/template/no-negated-async": "error",
      "@angular-eslint/template/cyclomatic-complexity": [
        "warn",
        { maxComplexity: 5 },
      ],
    },
  },
];
