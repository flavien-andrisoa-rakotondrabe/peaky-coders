import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Compat layer for Next.js configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  // Next.js recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom config
  ...compat.config({
    extends: ["next"],

    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  }),

  // Global ignores (flat config style)
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);
