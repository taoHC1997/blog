// .eslintrc.js
module.exports = {
  // 配置解析
  parser: "@typescript-eslint/parser",
  // 配置插件
  plugins: ["@typescript-eslint"],
  // 使用插件推荐配置 ： https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin#usage
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "@typescript-eslint/no-var-requires": 0,
  },
};
