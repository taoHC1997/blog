const ExcelJS = require("exceljs");

/**
 * 导出 excel （文档： https://github.com/exceljs/exceljs/blob/HEAD/README_zh.md）
 * @param { Object } config 传入的excel对象
 * @param { Array } config.data excel的数据
 * @param { String } config.filename excel文件名
 * @param { Array } config.header excel的头部
 * @param { String } config.sheetName 表名
 * @param { String } config.creator 创建表的人
 * @param { String } config.lastModifiedBy 最后修改表的人
 * */
async function exportExcel({
  data = [],
  filename = "file",
  header,
  sheetName = "sheet1",
  creator = "me",
  lastModifiedBy = "her",
}) {
  const workbook = new ExcelJS.Workbook();

  // 设置基本属性
  workbook.creator = creator;
  workbook.lastModifiedBy = lastModifiedBy;
  const now = new Date();
  workbook.created = now;
  workbook.modified = now;
  workbook.lastPrinted = now;

  // 创建
  const worksheet = workbook.addWorksheet(sheetName);

  // 设置视图
  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: "visible",
    },
  ];
  worksheet.state = "visible";

  // 设置表头
  worksheet.columns = header;
  for (let i = 1; i <= header.length; i++) {
    // 垂直居中
    worksheet.getColumn(i).alignment = { vertical: "middle", horizontal: "center" };
  }

  worksheet.addRows(data);

  await workbook.xlsx.writeFile(`\output\\${filename}.xlsx`);
}

function test() {
  exportExcel({
    data: [
      [1, 2, 3],
      [4, 5, 6],
    ],
    header: [
      { header: "A", key: "A" },
      { header: "B", key: "B" },
      { header: "C", key: "C" },
    ],
  });
}

test();
