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
```sh
npm install
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
This creates `load-tests/report.html` with a visual summary of the load test.

---

## Toolchain
- [@playwright/test](https://playwright.dev/)
- [frisby](https://docs.frisbyjs.com/)
- [jest](https://jestjs.io/)
- [ajv](https://ajv.js.org/)
- [k6](https://k6.io/)
- [k6-html-reporter](https://www.npmjs.com/package/k6-html-reporter)
- [jest-html-reporter](https://www.npmjs.com/package/jest-html-reporter)

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
