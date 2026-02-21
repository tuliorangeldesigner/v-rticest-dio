const fs = require('fs');
const path = require('path');

(async () => {
  const { chromium } = require('playwright');

  const base = 'http://127.0.0.1:4173';
  const routes = [
    '/',
    '/work',
    '/services',
    '/blog',
    '/contact',
    '/portal/excellent-solucoes',
  ];

  const outDir = path.join('.codex-artifacts', 'route-check');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const report = [];

  for (const route of routes) {
    const page = await context.newPage();
    const consoleErrors = [];
    const requestFailures = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('requestfailed', (req) => {
      requestFailures.push(`${req.method()} ${req.url()} :: ${req.failure()?.errorText || 'unknown'}`);
    });

    const url = `${base}${route}`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3500);

    const data = await page.evaluate(() => {
      const title = document.title || '';
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
      const h1 = document.querySelector('h1')?.textContent?.trim() || '';
      const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
      return { title, metaDesc, canonical, h1, robots };
    });

    const fileSafe = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '__');
    const screenshotPath = path.join(outDir, `${fileSafe}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    report.push({
      route,
      url,
      ...data,
      consoleErrorCount: consoleErrors.length,
      requestFailureCount: requestFailures.length,
      consoleErrors,
      requestFailures,
      screenshotPath,
    });

    await page.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
})();

