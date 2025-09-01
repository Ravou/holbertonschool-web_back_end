import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"], // règles pour tous les fichiers JS
    languageOptions: {
      globals: {
        process: "readonly",
        module: "readonly",
        require: "readonly",
        console: "readonly",
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: await import("eslint-plugin-react").then(mod => mod.default),
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      semi: "error",
      // autres règles à ajouter selon besoin
    },
  },
]);

