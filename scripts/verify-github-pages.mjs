import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const root = path.resolve('dist');
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.ttf': 'font/ttf',
};
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (!url.pathname.startsWith('/masaha/')) {
      res.writeHead(404).end();
      return;
    }
    let file = path.resolve(
      root,
      decodeURIComponent(url.pathname.slice('/masaha/'.length)) || 'index.html',
    );
    if (!file.startsWith(root + path.sep)) {
      res.writeHead(404).end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' });
  const page = await browser.newPage();
  const failures = [];
  page.on('response', (response) => {
    if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
  });
  page.on('pageerror', (error) => failures.push(error.message));
  const origin = `http://127.0.0.1:${server.address().port}`;
  for (const route of [
    '',
    'services/',
    'projects/?category=office',
    'projects/al-nour/',
    'quote/?service=renovation',
  ]) {
    const response = await page.goto(`${origin}/masaha/${route}`);
    assert.equal(response.status(), 200, route);
    await page.locator('h1').waitFor();
    await page.locator('brand-loading').waitFor({ state: 'detached' });
    assert.equal(await page.locator('base').getAttribute('href'), '/masaha/');
    assert.equal(
      await page.locator('body').evaluate((e) => getComputedStyle(e).fontFamily.includes('Cairo')),
      true,
    );
    const images = await page.locator('img').evaluateAll(async (images) => {
      await Promise.all(images.map((img) => img.decode().catch(() => {})));
      return images.every((img) => img.naturalWidth > 0 && !img.currentSrc.startsWith('data:'));
    });
    assert.equal(images, true, `Images load on ${route}`);
  }
  await page.reload();
  assert.equal(await page.locator('#service').inputValue(), 'renovation');
  await page.goto(`${origin}/masaha/projects/?category=office`);
  await page.locator('project-card').first().waitFor();
  assert.equal(await page.locator('project-card').count(), 2);
  await page.locator('project-card a').first().click();
  await page.waitForURL(/\/masaha\/projects\/horizon/);
  assert.match(page.url(), /\/masaha\/projects\/horizon/);
  await page.reload();
  await page.locator('h1').waitFor();
  await page.getByRole('link', { name: 'اطلب مشروع مشابه' }).click();
  await page.waitForURL(/\/masaha\/quote/);
  await page.locator('#unit').waitFor();
  assert.match(page.url(), /\/masaha\/quote/);
  assert.equal(await page.locator('#unit').inputValue(), 'office');
  assert.deepEqual(failures, []);
  console.log(
    'GitHub Pages production checks passed: /masaha/ assets, fonts, direct routes, reload, filters and quote preselection.',
  );
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
