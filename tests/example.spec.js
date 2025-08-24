// tests/example.spec.js
const { test, expect } = require('@playwright/test');
const { ExamplePage } = require('../pages/example.page');

test('should display the correct title on Playwright homepage', async ({ page }) => {
  const examplePage = new ExamplePage(page);
  await examplePage.goto();
  const title = await examplePage.getTitleText();
  expect(title).toContain('Playwright');
});
