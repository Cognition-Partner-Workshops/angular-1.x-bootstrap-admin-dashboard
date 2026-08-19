import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: {
    timeout: 15_000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    navigationTimeout: 15_000,
  },
});
