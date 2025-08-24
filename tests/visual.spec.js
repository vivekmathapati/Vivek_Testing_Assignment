const { test, expect } = require('@playwright/test');

test('Visual regression: header snapshot', async ({ page }) => {
  await page.goto('https://evinova.com/');
  // Wait for the header to be visible
  const header = await page.locator('header, .header, nav[role="navigation"], [aria-label*="main navigation" i]').first();
  await expect(header).toBeVisible();
  expect(await header.screenshot()).toMatchSnapshot('evinova-header.png', { threshold: 0.2 });
});
