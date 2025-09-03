import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs", globals: globals.node } },
  {
    ignores: ["build/*"],
  },
  {
    rules: {
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
      ],
      eqeqeq: 'error',
      indent: [
        'error',
        4
      ],
      'no-console': 0,
    }
  }
]);
