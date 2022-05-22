const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices['iPhone SE'];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(iPhone);
  // await page.waitFor(1000);
  await page.goto("https://bot.sannysoft.com/");
  // await page.goto("https://www.baidu.com/");
  // await page.goto("");

  // 截图
  await page.screenshot({
    path: "./output/test.png",
    fullPage: true,
  });

  await browser.close();
})();
