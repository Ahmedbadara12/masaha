import { test, expect } from '@playwright/test';
test('branded startup loading, reduced motion and readable bilingual layouts', async ({ page }) => {
  let releaseFonts!: () => void;
  const fontsReady = new Promise<void>((resolve) => (releaseFonts = resolve));
  await page.route('**/*.ttf', async (route) => {
    await fontsReady;
    await route.continue();
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.brand-loader')).toBeVisible();
  await expect(page.locator('brand-loading')).toContainText('مساحة');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(
    await page.locator('.loader-track span').evaluate((e) => getComputedStyle(e).animationName),
  ).toBe('none');
  releaseFonts();
  await expect(page.locator('brand-loading')).toHaveCount(0);
  await page.unroute('**/*.ttf');
  for (const language of ['ar', 'en']) {
    if (language === 'en') await page.getByRole('button', { name: 'Switch to English' }).click();
    for (const width of [360, 390, 768, 1280, 1536]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${language} at ${width}`,
      ).toBeTruthy();
      for (const selector of ['.service-card p', '.process-grid p', '.faq-item p']) {
        expect(
          await page
            .locator(selector)
            .first()
            .evaluate((e) => parseFloat(getComputedStyle(e).fontSize)),
        ).toBeGreaterThanOrEqual(16);
      }
      for (const selector of [
        '.project-line>span',
        '.project-card>p',
        '.footer-bottom',
        '.service-card .text-link',
      ]) {
        expect(
          await page
            .locator(selector)
            .first()
            .evaluate((e) => parseFloat(getComputedStyle(e).fontSize)),
        ).toBeGreaterThanOrEqual(14);
      }
      const boxes = await page.evaluate(() => {
        const hero = document.querySelector('.hero')!.getBoundingClientRect();
        const content = document.querySelector('.hero-buttons')!.getBoundingClientRect();
        return { hero: hero.bottom, content: content.bottom };
      });
      expect(boxes.content).toBeLessThan(boxes.hero);
      if (width === 390 || width === 1536)
        await page.screenshot({
          path: `artifacts/refined-${language}-${width}.png`,
          fullPage: true,
        });
    }
  }
});
test('FAQ, local Arabic font, image fallback and invalid numeric input', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('400 16px Cairo'))).toBeTruthy();
  const faq = page.locator('.faq-item').first();
  await faq.getByRole('button').click();
  await expect(faq.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(faq.getByRole('button')).toContainText('What information');
  await page.goto('/quote');
  await page.locator('#name').fill('A Name');
  await page.locator('#phone').fill('123');
  await page.locator('#area').fill('٠');
  await page.locator('button[type=submit]').click();
  await expect(page.locator('#phone')).toBeFocused();
  await expect(page.locator('#area')).toHaveAttribute('aria-invalid', 'true');
  await page.goto('/projects/al-nour');
  await page.locator('.gallery-main').click();
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBeTruthy();
  await page.keyboard.press('Escape');
  await page.locator('.gallery-main img').evaluate((img: HTMLImageElement) => {
    img.src = '/missing-image.jpg';
  });
  await expect(page.locator('.gallery-main img')).toHaveAttribute('src', /^data:image\/svg/);
});
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
test('Arabic default, all routes, filters and browser history', async ({ page }) => {
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('h1')).toContainText('مساحات تشبهك');
  await page.goto('/projects');
  await expect(page.locator('project-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'مكاتب', exact: true }).click();
  await expect(page.locator('project-card')).toHaveCount(2);
  await expect(page).toHaveURL(/category=office/);
  await page.locator('project-card a').first().click();
  await expect(page.locator('h1')).toContainText('مكتب أفق');
  await page.getByRole('link', { name: 'العودة للأعمال' }).click();
  await expect(page.locator('project-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'شقق', exact: true }).click();
  await page.goBack();
  await expect(page.getByRole('button', { name: 'مكاتب', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.goto('/projects/invalid');
  await expect(page.locator('h1')).toContainText('غير موجودة');
  await page.goto('/unknown');
  await expect(page.locator('h1')).toContainText('غير موجودة');
  await page.goto('/services#renovation');
  await expect(page.locator('#renovation')).toBeVisible();
});
test('gallery thumbnails, keyboard, focus and project preselection', async ({ page }) => {
  await page.goto('/projects/al-nour?category=apartment');
  await page.getByRole('button', { name: 'اختيار صورة 2' }).click();
  await expect(page.getByRole('button', { name: 'اختيار صورة 2' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.locator('.gallery-main').click();
  await expect(page.locator('dialog')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('dialog p')).toContainText('1 / 2');
  await page.keyboard.press('Tab');
  await expect(page.locator('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog')).not.toBeVisible();
  await expect(page.locator('.gallery-main')).toBeFocused();
  await page.getByRole('link', { name: 'اطلب مشروع مشابه' }).click();
  await expect(page.locator('#unit')).toHaveValue('apartment');
  await expect(page.locator('#service')).toHaveValue('design-finishing');
  await expect(page.locator('.reference')).toContainText('شقة النور');
});
test('form normalization, validation, language persistence and demo submission', async ({
  page,
}) => {
  await page.goto('/quote?service=renovation');
  await expect(page.locator('#service')).toHaveValue('renovation');
  await page.locator('button[type=submit]').click();
  await expect(page.locator('#name')).toBeFocused();
  await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true');
  await page.locator('#name').fill('  أحمد محمد  ');
  await page.locator('#phone').fill('+٢٠ (١٠٠) ١٢٣-٤٥٦٧');
  await page.locator('#unit').selectOption('apartment');
  await page.locator('#area').fill('١٢٠');
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page.locator('#name')).toHaveValue('  أحمد محمد  ');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page).toHaveTitle('Request an inspection | Masaha');
  await page.locator('button[type=submit]').click();
  await expect(page.locator('#success-heading')).toContainText('No data was sent');
  await expect(page.locator('#success-heading')).toBeFocused();
  const stored = await page.evaluate(() => Object.keys(localStorage));
  expect(stored).toEqual(['masaha-language']);
  await page.getByRole('button', { name: 'Start a new request' }).click();
  await expect(page.locator('#name')).toHaveValue('');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});
test('all target widths, loaded images and mobile navigation', async ({ page }) => {
  for (const width of [360, 390, 768, 1280, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/projects', '/services', '/quote', '/projects/al-nour']) {
      await page.goto(route);
      await page.locator('h1').waitFor();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${route} at ${width}`,
      ).toBeTruthy();
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'فتح القائمة' }).click();
  await expect(page.locator('#mobile-nav')).toBeVisible();
  await page.locator('#mobile-nav a').first().focus();
  await page.keyboard.press('Escape');
  await expect(page.locator('#menu-toggle')).toBeFocused();
  await page.getByRole('button', { name: 'فتح القائمة' }).click();
  await page.locator('#mobile-nav').getByRole('link', { name: 'أعمالنا' }).click();
  await expect(page.locator('#mobile-nav')).toHaveCount(0);
  await page.goto('/');
  await page.locator('.hero-photo').evaluate((img: HTMLImageElement) => img.decode());
  expect(
    await page.locator('.hero-photo').evaluate((img: HTMLImageElement) => img.naturalWidth),
  ).toBeGreaterThan(100);
  await page.setViewportSize({ width: 1536, height: 1100 });
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'artifacts/home-mobile.png', fullPage: true });
});
