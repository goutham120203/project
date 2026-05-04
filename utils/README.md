# Utils

This directory contains utility files for the Playwright test framework.

## testData.ts

Centralized test data management for all test scenarios. This file contains:

### Structure

- **clients**: Client names for different profile types (manufacturer, retailer, circana)
- **outlets**: Outlet options for manufacturer and retailer profiles
- **geography**: Geography-related test data (names, versions, summaries, etc.)
- **profiles**: Form data for different profile types
- **search**: Search terms for profiles and geography
- **errors**: Expected error messages
- **success**: Success messages
- **urls**: Base URLs and navigation paths
- **timeouts**: Wait times in milliseconds
- **titles**: Page titles and headings

### Usage

```typescript
import { testData } from '../utils/testData';

// Use in tests
await retailerPage.selectClientName(testData.clients.retailer.valid);
await manufacturerPage.fillClientVisibleName(testData.profiles.manufacturer.clientVisibleName);
expect(await page).toHaveTitle(new RegExp(testData.titles.dashboard, 'i'));
```

### Helper Functions

- **generateTestData**: Functions for generating dynamic test data with timestamps

### Type Definitions

- **ClientType**: Union type for client types
- **OutletType**: Union type for outlet types
- **CccEligible**: Union type for CCC eligible options
- **Freshlook**: Union type for freshlook options
- **ClosedAndSold**: Union type for closed and sold options

### Benefits

- **Maintainability**: All test data in one place
- **Consistency**: Same data used across all tests
- **Reusability**: Easy to reference in multiple test files
- **Type Safety**: TypeScript types for better development experience