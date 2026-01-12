import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', (msg) => {
    console.log('CONSOLE', msg.type(), msg.text());
  });

  page.on('pageerror', (err) => {
    console.log('PAGEERROR', err.message);
  });

  try {
    const resp = await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle', timeout: 10000 });
    console.log('Response status:', resp && resp.status());

    // Wait a bit for any client JS to run
    await page.waitForTimeout(1000);

    const bodyHTML = await page.evaluate(() => document.documentElement.outerHTML);
    console.log('PAGE HTML snippet (first 1000 chars):', bodyHTML.slice(0, 1000));

    // Capture number of script tags
    const scripts = await page.evaluate(() => Array.from(document.scripts).map(s => s.src || s.innerText.slice(0,50)));
    console.log('Scripts on page:', scripts);
  } catch (err) {
    console.error('Navigation error:', err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();