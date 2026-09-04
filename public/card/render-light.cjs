const puppeteer = require('puppeteer-core');
const path = require('path');

const dir = __dirname;
const htmlFile = path.join(dir, 'light.html');
const pngFile = path.join(dir, '赵国成-数字名片-浅色版.png');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
  await page.goto('file://' + htmlFile, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: pngFile, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  console.log('已渲染:', pngFile);
  await browser.close();
})().catch(e => { console.error('渲染失败:', e); process.exit(1); });
