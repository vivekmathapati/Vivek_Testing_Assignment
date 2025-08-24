const { test } = require('@playwright/test');
const { injectAxe, checkA11y } = require('axe-playwright');

test('Accessibility check for evinova.com', async ({ page }) => {
  await page.goto('https://evinova.com/');
  await injectAxe(page);
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true }
  });
});
