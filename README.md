# Node.js Test Automation Framework

This project is a comprehensive test automation framework built with Node.js, supporting UI automation (Playwright), API testing (Frisby/Jest), and load testing (k6). It follows the Page Object Model (POM) for UI tests and a modular structure for API tests.

## Features
- **UI Automation**: Playwright with Page Object Model (POM)
- **API Testing**: Frisby (Jest), modular clients, data, and schema validation (Joi, Ajv)
- **Load Testing**: k6 with HTML reporting
- **Reporting**: HTML reports for both API and load tests

## Prerequisites
- Node.js (v18 or later recommended)
- npm (comes with Node.js)
- [k6](https://k6.io/docs/getting-started/installation/) (for load testing)
- Git (for version control)

## Installation
Install all dependencies:
```sh
npm install
```

### Install Playwright and Browsers
```sh
npm install --save-dev @playwright/test
npx playwright install
```

### Install Jest, Frisby, and HTML Reporter
```sh
npm install --save-dev jest frisby jest-html-reporter
```

### Install Ajv (for JSON schema validation)
```sh
npm install ajv
```

### Install k6 (system-wide, not via npm)
Follow instructions at: https://k6.io/docs/getting-started/installation/

### Install k6-html-reporter (for HTML reports from k6)
```sh
npm install --save-dev k6-html-reporter
```

### Install axe-playwright (for accessibility testing)
```sh
npm install --save-dev axe-playwright
```

### Install Faker.js (for dynamic test data)
```sh
npm install --save-dev @faker-js/faker
```

### Install Lighthouse CI (for performance metrics)
```sh
npm install --save-dev @lhci/cli
```

## Project Structure
- `pages/` - Playwright Page Object classes
- `tests/` - Playwright UI test cases
- `api-tests/` - API test suites, clients, data, and validators
- `load-tests/` - k6 load test scripts and reporting utilities
- `playwright.config.js` - Playwright configuration

---

## UI Automation (Playwright)

### Run all UI tests
```sh
npm test
```
Or
```sh
npx playwright test
```

### Run a specific UI test
```sh
npx playwright test tests/example.spec.js
```

### Generate Playwright HTML report
```sh
npx playwright show-report
```
This opens the Playwright HTML report in your browser after a test run.

---

## API Testing (Frisby + Jest)

### Run all API tests
```sh
npx jest api-tests/users.spec.js
```

### Generate API HTML report
After running tests, open `api-test-report.html` in your browser.

---

## Load Testing (k6)

### 1. Run the k6 load test and export summary
```sh
npm run k6:run
```
This runs `load-tests/get-users.k6.js` and generates `load-tests/summary.json`.

### 2. Generate HTML report from k6 summary
```sh
npm run k6:report
```
This creates `load-tests/report.html` with a visual summary of the load test. Open this file in your browser.

---

## Accessibility Testing (axe-playwright)

Accessibility checks are integrated into Playwright UI tests using [axe-playwright](https://www.npmjs.com/package/axe-playwright).

- The test file `tests/accessibility.spec.js` runs an accessibility audit on https://evinova.com/ and fails if violations are found.
- The test uses the axe-core engine for industry-standard accessibility rules.

**Run the accessibility test:**
```sh
npx playwright test tests/accessibility.spec.js
```
- Review the test output for any accessibility violations and details.

---

## Visual Regression Testing (Playwright)

Visual regression testing is supported using Playwright's built-in screenshot comparison.

- Example test: `tests/visual.spec.js` takes a snapshot of https://evinova.com/ and compares it to a baseline image.
- Baseline images are stored in `tests/visual.spec.js-snapshots/`.

**Run the visual regression test:**
```sh
npx playwright test tests/visual.spec.js
```
- On the first run, a baseline image is created. On subsequent runs, Playwright will compare screenshots and report any visual differences.

---

## Code Coverage

### API/Backend Tests (Jest/Frisby)
Jest provides built-in code coverage reporting for your API tests.

**Run API tests with coverage:**
```sh
npx jest api-tests --coverage
```
- This generates a `coverage/` folder with HTML and summary reports.
- Open `coverage/lcov-report/index.html` in your browser for a detailed report.

### Frontend/UI Tests (Playwright)
Playwright can collect browser-side JavaScript coverage, but you must instrument your frontend code (if you have a frontend app) with a tool like Istanbul/nyc.

**For frontend apps (React, Angular, etc.):**
- Use your framework's coverage command (e.g., `react-scripts test --coverage` for Create React App).

**For Playwright browser JS coverage:**
- Instrument your frontend code with Istanbul/nyc.
- Use Playwright's [coverage API](https://playwright.dev/docs/coverage) in your tests:

```js
await page.coverage.startJSCoverage();
// ... run your test steps ...
const coverage = await page.coverage.stopJSCoverage();
// Save or process coverage data
```
- Merge and report using Istanbul/nyc for HTML output.

**Sample Playwright test to save browser JS coverage:**
Create a file like `tests/browser-coverage.spec.js`:

```js
const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('Collect and save browser JS coverage', async ({ page }) => {
  await page.coverage.startJSCoverage();
  await page.goto('http://localhost:3000'); // Update to your app URL
  // ... your test steps ...
  await expect(page).toHaveTitle(/your app/i);
  const coverage = await page.coverage.stopJSCoverage();
  if (!fs.existsSync('coverage')) {
    fs.mkdirSync('coverage');
  }
  fs.writeFileSync('coverage/browser-coverage.json', JSON.stringify(coverage, null, 2));
  console.log('Browser JS coverage saved to coverage/browser-coverage.json');
});
```
- After running this test, process the `coverage/browser-coverage.json` with Istanbul/nyc or a compatible tool to generate an HTML report.

> Note: Playwright does not provide code coverage for test files themselves, only for code running in the browser context.

---

## Dynamic Test Data Generation (Faker.js)

[Faker.js](https://www.npmjs.com/package/@faker-js/faker) is used to generate random, realistic test data for API tests.

- Example usage: The test file `api-tests/users.spec.js` includes a POST test that creates a user with a random name and job title on each run.

**Install Faker.js:**
```sh
npm install --save-dev @faker-js/faker
```

**Sample usage in a test:**
```js
const { faker } = require('@faker-js/faker');
const body = {
  name: faker.name.firstName(),
  job: faker.name.jobTitle()
};
```
- This helps ensure your API can handle a variety of input data and improves test coverage.

---

## Performance Metrics (Lighthouse CI)

Lighthouse CI is used to collect and assert performance metrics for UI tests.

- The configuration file `lighthouserc.json` specifies the URLs to audit and performance thresholds.
- Reports are generated in the `lhci-report/` directory.


**Install Lighthouse CI:**
```sh
npm install --save-dev @lhci/cli
```
**Run Lighthouse CI:**
```sh
npm run lhci:run
```
- You can adjust the URLs and thresholds in `lighthouserc.json` as needed.

---

## Toolchain
- [@playwright/test](https://playwright.dev/)
- [frisby](https://docs.frisbyjs.com/)
- [jest](https://jestjs.io/)
- [ajv](https://ajv.js.org/)
- [k6](https://k6.io/)
- [k6-html-reporter](https://www.npmjs.com/package/k6-html-reporter)
- [jest-html-reporter](https://www.npmjs.com/package/jest-html-reporter)
- [axe-playwright](https://www.npmjs.com/package/axe-playwright)
- [Faker.js](https://www.npmjs.com/package/@faker-js/faker)
- [Lighthouse CI](https://github.com/GoogleCloudPlatform/lighthouse-ci)

---

## Notes
- All reports and test result files are git-ignored by default.
- Update or add new tests in the respective folders as needed.
- For k6, ensure it is installed and available in your PATH.

---

## Version Control
To push your code to GitHub:
```sh
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/vivekmathapati/Vivek_Testing_Assignment.git
git push -u origin main
```

---

For any questions or improvements, feel free to open an issue or pull request.
