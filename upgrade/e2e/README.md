# Parity QA E2E Tests

This directory contains end-to-end tests for validating behavioral parity between the legacy AngularJS app and the Angular upgrade app.

## Overview

The parity test suite runs the same tests against both applications to ensure the migration maintains identical behavior. Tests are organized by feature area and reference test IDs from `PREFLIGHT_PARITY_TEST_PLAN.md`.

## Test Structure

```
e2e/
├── parity/
│   ├── test-config.ts       # Route mappings, selectors, and utilities
│   ├── routes.parity.spec.ts    # Route reachability tests (NAV-*)
│   ├── sidebar.parity.spec.ts   # Sidebar navigation tests (SB-*)
│   ├── dashboard.parity.spec.ts # Dashboard widget tests (DASH-*)
│   ├── forms.parity.spec.ts     # Form interaction tests (FORM-*)
│   ├── tables.parity.spec.ts    # Table functionality tests (TBL-*)
│   ├── charts.parity.spec.ts    # Chart rendering tests (CHART-*)
│   ├── ui-components.parity.spec.ts # UI component tests (UI-*)
│   ├── components.parity.spec.ts    # Component tests (COMP-*)
│   ├── maps.parity.spec.ts      # Map rendering tests (MAP-*)
│   ├── profile.parity.spec.ts   # Profile page tests (PROF-*)
│   ├── loading.parity.spec.ts   # Loading state tests (LOAD-*)
│   └── responsive.parity.spec.ts # Responsive design tests (RESP-*)
└── README.md
```

## Running Tests

### Prerequisites

1. Start the legacy AngularJS app on port 3000:
   ```bash
   gulp serve
   ```

2. Start the Angular upgrade app on port 4200:
   ```bash
   cd upgrade && npm start
   ```

### Test Commands

Run all parity tests against both apps:
```bash
npm run e2e:parity
```

Run tests against legacy app only:
```bash
npm run e2e:legacy
```

Run tests against upgrade app only:
```bash
npm run e2e:upgrade
```

View test report:
```bash
npm run e2e:report
```

## Dual-Target Configuration

The Playwright configuration defines two projects:

- **legacy**: Tests run against `http://localhost:3000` (AngularJS app)
- **upgrade**: Tests run against `http://localhost:4200` (Angular app)

Tests use the `getRoutePath()` helper to resolve the correct URL for each target:
- Legacy routes: `/#/path`
- Upgrade routes: `/#/upgrade/path`

## Writing Parity Tests

### Route Mappings

Add new routes to `test-config.ts`:

```typescript
export const ROUTE_MAPPINGS: RouteMapping[] = [
  {
    screenId: 'SCR-XXX',
    name: 'Screen Name',
    legacyPath: '/#/legacy/path',
    upgradePath: '/#/upgrade/path',
    testId: 'TEST-XXX'
  },
  // ...
];
```

### Test Pattern

```typescript
test('[TEST-ID] Description', async ({ page }, testInfo) => {
  const projectName = testInfo.project.name;
  const path = getRoutePath(mapping, projectName);
  
  await page.goto(path);
  await waitForPageLoad(page, projectName);
  
  // Assert behavior
  await expect(page.locator(SELECTORS.panel)).toBeVisible();
});
```

### Selectors

Use stable selectors from `test-config.ts`:
- Prefer `data-testid` attributes
- Fall back to CSS class selectors that exist in both apps
- Avoid implementation-specific selectors

## Failure Triage

When tests fail, classify the failure:

1. **Legacy Ambiguity**: Legacy behavior is unclear or inconsistent
2. **Upgrade Defect**: Upgrade app behavior differs from legacy
3. **Test Issue**: Test itself has a bug or flaky assertion

Document failures in the test report with the appropriate classification.

## Coverage Gates

Each migrated screen must have:
- Route reachability test
- Core functionality tests
- Responsive behavior tests (if applicable)

New screen migrations should add or update parity tests before merging.
