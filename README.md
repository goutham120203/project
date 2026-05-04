# Playwright TypeScript Test Framework

This repository has been migrated from Java + Cucumber to a pure Playwright + TypeScript automation framework.

## Project structure

- `pages/` - Page Object Model classes for application pages
- `tests/` - Playwright test files (`.spec.ts`)
- `fixtures/` - reusable Playwright fixtures
- `utils/` - utility files including test data management
- `playwright.config.ts` - Playwright configuration

## Setup

1. Install dependencies:
   ```bash
   npm install
   npx playwright install
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. View HTML report:
   ```bash
   npm run test:report
   ```

## Notes

- The framework uses `@playwright/test`.
- Tests are written in TypeScript with async/await.
- Page Objects are implemented for reusable application behavior.
