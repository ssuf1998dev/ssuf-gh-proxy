import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    semi: true,
    quotes: "double",
    overrides: {
      "style/jsx-self-closing-comp": "warn",
    },
  },
  typescript: {
    tsconfigPath: ["tsconfig.json", "server/tsconfig.json"],
  },
  formatters: {
    html: true,
    css: true,
  },
  rules: {
    "import/order": [
      "error",
      { "newlines-between": "always-and-inside-groups" },
    ],
    "node/prefer-global/process": "off",
    "ts/strict-boolean-expressions": "off",
    "vue/max-attributes-per-line": ["warn", {
      singleline: { max: 3 },
      multiline: { max: 1 },
    }],
  },
  ignores: ["dist"],
});
