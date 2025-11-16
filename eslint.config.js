import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  // Next.js Core Web Vitals
  ...nextCoreWebVitals.map(config => ({
    ...config,
    files: ["src/**/*.{js,jsx,ts,tsx}"],
  })),

  // Prettier integration
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    ...prettierConfig,
    rules: {
      ...prettierConfig.rules, // enable Prettier formatting as ESLint rules
    },
  },

  // Ignore build folders
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
