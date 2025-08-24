// pages/drugDevelopmentSuite.page.js
const { expect } = require('@playwright/test');

class DrugDevelopmentSuitePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  this.acceptCookiesButton = 'button:has-text("Accept All")';
  this.ourSolutionsMenu = 'role=button[name="Our Solutions"]';
  this.drugDevelopmentSuiteLink = 'nav .navbar-dropdown-link:has-text("Drug Development Suite")';
  this.contactUsButton = 'a:has-text("Contact Us")';
  this.form = 'form[action*="contact"]';
  this.nameInput = 'input[name*="name"], input[placeholder*="Name"]';
  this.emailInput = 'input[type="email"], input[placeholder*="Email"]';
  this.messageInput = 'textarea, textarea[placeholder*="Message"]';
  this.submitButton = 'form button[type="submit"]';
  }

  async goto() {
    await this.page.goto('https://evinova.com');
    // Robustly handle cookie banner
    for (let i = 0; i < 3; i++) {
      const acceptBtn = this.page.locator(this.acceptCookiesButton);
      if (await acceptBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await acceptBtn.click({ force: true });
      }
      // Wait for banner to disappear and not block pointer events
      const gone = await this.page.waitForSelector('div#CookieReportsPanel', { state: 'detached', timeout: 5000 }).then(() => true).catch(() => false);
      if (gone) break;
      // If still present, wait and try to click close if available
      await this.page.waitForTimeout(500);
    }
    // Extra wait to ensure no overlays block pointer events
    await this.page.waitForSelector('div#CookieReportsPanel', { state: 'detached', timeout: 5000 }).catch(() => {});
  }

  async navigateToDrugDevelopmentSuite() {
    // Hover or click on the menu depending on site behavior
    const menu = this.page.locator(this.ourSolutionsMenu);
    // Try hover, if pointer events are blocked, use force
    try {
      await menu.hover({ timeout: 10000 });
    } catch (e) {
      await menu.hover({ timeout: 10000, force: true });
    }
    // Try clicking the menu to open dropdown if needed
    await menu.click({ timeout: 10000 });
    await this.page.waitForTimeout(500);
    await this.page.waitForSelector(this.drugDevelopmentSuiteLink, { timeout: 10000 });
    const links = await this.page.$$(this.drugDevelopmentSuiteLink);
    for (const link of links) {
      if (await link.isVisible()) {
        await link.click();
        break;
      }
    }
  }

  async clickContactUs() {
    await this.page.waitForSelector(this.contactUsButton, { timeout: 10000 });
    await this.page.click(this.contactUsButton);
  }

  async fillContactForm({ name, email, message }) {
    await this.page.waitForSelector(this.nameInput, { timeout: 10000 });
    await this.page.fill(this.nameInput, name);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.messageInput, message);
  }

  async verifyFormFilled({ name, email, message }) {
    expect(await this.page.inputValue(this.nameInput)).toBe(name);
    expect(await this.page.inputValue(this.emailInput)).toBe(email);
    expect(await this.page.inputValue(this.messageInput)).toBe(message);
  }
}

module.exports = { DrugDevelopmentSuitePage };
