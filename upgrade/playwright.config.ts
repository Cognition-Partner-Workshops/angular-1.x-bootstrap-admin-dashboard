import { defineConfig, devices } from '@playwright/test';

/**
 * Parity QA Configuration for AngularJS to Angular Migration
 * 
 * This configuration enables dual-target E2E testing against:
 * - Legacy AngularJS app (localhost:3000)
 * - Upgrade Angular app (localhost:4200/#/upgrade)
 * 
 * Tests are run against both targets to validate behavioral parity.
 */

const LEGACY_BASE_URL = process.env.LEGACY_BASE_URL || 'http://localhost:3000';
const UPGRADE_BASE_URL = process.env.UPGRADE_BASE_URL || 'http://localhost:4200';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list']
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'legacy',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: LEGACY_BASE_URL,
      },
      testMatch: /.*\.parity\.spec\.ts$/,
    },
    {
      name: 'upgrade',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: UPGRADE_BASE_URL,
      },
      testMatch: /.*\.parity\.spec\.ts$/,
    },
    {
      name: 'upgrade-only',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: UPGRADE_BASE_URL,
      },
      testMatch: /.*\.upgrade\.spec\.ts$/,
    },
  ],
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
});
