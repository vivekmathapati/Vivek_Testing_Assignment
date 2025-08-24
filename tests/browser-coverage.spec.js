const { test, expect } = require('@playwright/test');
const fs = require('fs');

// This test demonstrates how to collect and save browser-side JS coverage using Playwright

test('Collect and save browser JS coverage for evinova.com (Chromium only)', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'JS coverage is only supported in Chromium');

  // Start JS coverage collection
  await page.coverage.startJSCoverage();

  // Navigate to evinova.com
  await page.goto('https://evinova.com/');

  // ... perform your test steps here ...
  await expect(page).toHaveTitle(/Evinova/i);

  // Stop coverage collection
  const coverage = await page.coverage.stopJSCoverage();

  // Save coverage to disk
  if (!fs.existsSync('coverage')) {
    fs.mkdirSync('coverage');
  }
  fs.writeFileSync('coverage/browser-coverage.json', JSON.stringify(coverage, null, 2));

  console.log('Browser JS coverage saved to coverage/browser-coverage.json');
});
