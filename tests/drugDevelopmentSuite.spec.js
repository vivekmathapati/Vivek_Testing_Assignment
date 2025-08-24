const { test, expect } = require('@playwright/test');



test('Fill Contact Us form on Drug Development Suite page (do not submit)', async ({ page }) => {
  await page.goto('https://evinova.com/');
  await page.getByRole('button', { name: /Allow All Cookies|Accept All/i }).click();
  // Open the Our Solutions menu
  const menuBtn = page.getByRole('button', { name: 'Our Solutions' });
  await menuBtn.click();
  await page.waitForTimeout(500); // Wait for dropdown animation
  // Click the Drug Development Suite link in the dropdown
  await page.getByRole('link', { name: 'Drug Development Suite' }).first().click();
  // Click the first visible Contact Us link
  const contactLinks = await page.getByRole('link', { name: 'Contact Us' }).all();
  for (const link of contactLinks) {
    if (await link.isVisible()) {
      await link.click();
      break;
    }
  }
  await page.waitForTimeout(500);
  // Wait for the First Name textbox to be visible (longer timeout)
  await page.getByRole('textbox', { name: 'First Name' }).waitFor({ state: 'visible', timeout: 20000 });
  await page.getByRole('textbox', { name: 'First Name' }).fill('Vivek');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Mathapati');
  await page.getByRole('textbox', { name: 'Email' }).fill('vivekmsnk@gmail.com');
  await page.waitForTimeout(1500);

  // Verify the fields are filled
// Check that the text boxes are not null, not empty, and have some text
await expect(await page.getByRole('textbox', { name: 'First Name' }).inputValue()).not.toBe('');
await expect(await page.getByRole('textbox', { name: 'Last Name' }).inputValue()).not.toBe('');
await expect(await page.getByRole('textbox', { name: 'Email' }).inputValue()).not.toBe('');
});

test('Navigate to About Us and check About Evinova text exists', async ({ page }) => {
  await page.goto('https://evinova.com/');
  await page.getByRole('button', { name: /Allow All Cookies|Accept All/i }).click();
  // Click the About Us link in the main navigation
  await page.getByRole('link', { name: 'About Us' }).first().click();
  // Wait for the About Evinova text to be visible
  await expect(page.getByRole('heading', { name: 'About Evinova', exact: false })).toBeVisible();
});
