# README

> exceljs 学习（参考文档即可）

- github:
  - https://github.com/exceljs/exceljs
- npm:
  - https://www.npmjs.com/package/exceljs
- 文档:
  - https://github.com/exceljs/exceljs/blob/HEAD/README_zh.md

安装：

```s
npm install exceljs
```

开始使用：

```js
const ExcelJS = require("exceljs");

// 读文件
const workbook = new Excel.Workbook();
await workbook.xlsx.readFile(filename);

// ... 使用 workbook

// 写文件
await workbook.xlsx.writeFile(filename);
```
