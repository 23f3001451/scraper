const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=6',
  'https://sanand0.github.io/tdsdata/js_table/?seed=7',
  'https://sanand0.github.io/tdsdata/js_table/?seed=8',
  'https://sanand0.github.io/tdsdata/js_table/?seed=9',
  'https://sanand0.github.io/tdsdata/js_table/?seed=10',
  'https://sanand0.github.io/tdsdata/js_table/?seed=11',
  'https://sanand0.github.io/tdsdata/js_table/?seed=12',
  'https://sanand0.github.io/tdsdata/js_table/?seed=13',
  'https://sanand0.github.io/tdsdata/js_table/?seed=14',
  'https://sanand0.github.io/tdsdata/js_table/?seed=15',
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for table to appear (it's dynamically generated)
    await page.waitForSelector('table');

    // Grab all table cell text, parse numbers, and sum them
    const pageSum = await page.evaluate(() => {
      let sum = 0;
      document.querySelectorAll('table td').forEach(cell => {
        const num = parseFloat(cell.innerText.replace(/,/g, ''));
        if (!isNaN(num)) sum += num;
      });
      return sum;
    });

    console.log(`Seed URL: ${url} → Sum: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log(`Total sum across all pages: ${grandTotal}`);
  await browser.close();
})();
