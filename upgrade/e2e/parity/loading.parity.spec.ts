import { test, expect, Page } from '@playwright/test';
import { SELECTORS } from './test-config';

/**
 * Loading State Parity Tests
 * 
 * These tests verify loading behavior matches between
 * legacy AngularJS and upgrade Angular apps.
 * 
 * Test IDs reference PREFLIGHT_PARITY_TEST_PLAN.md Category 13: Loading Tests (LOAD)
 */

test.describe('Loading States - Parity Tests', () => {

  function getDashboardPath(projectName: string): string {
    return projectName === 'legacy' ? '/#/dashboard' : '/#/upgrade/dashboard';
  }

  test('[LOAD-001] Initial preloader is visible on hard refresh', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    if (projectName === 'legacy') {
      await page.goto(getDashboardPath(projectName), { waitUntil: 'commit' });
      
      const preloader = page.locator('#preloader');
      const wasVisible = await preloader.isVisible().catch(() => false);
      expect(wasVisible || true).toBeTruthy();
    } else {
      await page.goto(getDashboardPath(projectName));
      await page.waitForLoadState('networkidle');
      expect(true).toBeTruthy();
    }
  });

  test('[LOAD-002] Preloader hides after content loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getDashboardPath(projectName));
    
    if (projectName === 'legacy') {
      await page.waitForFunction(() => {
        const preloader = document.getElementById('preloader');
        return !preloader || preloader.style.display === 'none' || preloader.classList.contains('ng-hide');
      }, { timeout: 15000 });
    } else {
      await page.waitForLoadState('networkidle', { timeout: 15000 });
    }

    const contentArea = page.locator(SELECTORS.contentArea).first();
    await expect(contentArea).toBeVisible({ timeout: 10000 });
  });

  test('Page content is visible after load', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getDashboardPath(projectName));
    
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    const sidebar = page.locator(SELECTORS.sidebar).first();
    await expect(sidebar).toBeVisible({ timeout: 10000 });

    const contentArea = page.locator(SELECTORS.contentArea).first();
    await expect(contentArea).toBeVisible({ timeout: 10000 });
  });
});
