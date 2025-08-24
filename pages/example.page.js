// pages/example.page.js
const { expect } = require('@playwright/test');

class ExamplePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.exampleSelector = 'h1';
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async getTitleText() {
    return this.page.textContent(this.exampleSelector);
  }
}

module.exports = { ExamplePage };
