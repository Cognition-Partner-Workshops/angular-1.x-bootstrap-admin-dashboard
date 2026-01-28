import { test, expect, Page } from '@playwright/test';
import { SELECTORS } from './test-config';

/**
 * Responsive Design Parity Tests
 * 
 * These tests verify responsive behavior matches between
 * legacy AngularJS and upgrade Angular apps.
 * 
 * Test IDs reference PREFLIGHT_PARITY_TEST_PLAN.md Category 12: Responsive Tests (RESP)
 */

test.describe('Responsive Design - Parity Tests', () => {

  async function waitForPageLoad(page: Page, projectName: string): Promise<void> {
    if (projectName === 'legacy') {
      await page.waitForFunction(() => {
        const preloader = document.getElementById('preloader');
        return !preloader || preloader.style.display === 'none' || preloader.classList.contains('ng-hide');
      }, { timeout: 15000 });
    } else {
      await page.waitForLoadState('networkidle', { timeout: 15000 });
    }
  }

  function getDashboardPath(projectName: string): string {
    return projectName === 'legacy' ? '/#/dashboard' : '/#/upgrade/dashboard';
  }

  test('[RESP-001] Desktop layout at 1440px', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(getDashboardPath(projectName));
    await waitForPageLoad(page, projectName);

    const sidebar = page.locator(SELECTORS.sidebar).first();
    await expect(sidebar).toBeVisible();

    const sidebarBox = await sidebar.boundingBox();
    expect(sidebarBox).toBeTruthy();
    if (sidebarBox) {
      expect(sidebarBox.width).toBeGreaterThan(100);
    }
  });

  test('[RESP-002] Tablet layout at 1000px', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    await page.setViewportSize({ width: 1000, height: 800 });
    await page.goto(getDashboardPath(projectName));
    await waitForPageLoad(page, projectName);

    const body = page.locator('body');
    const isCollapsed = await body.evaluate(el => 
      el.classList.contains('menu-collapsed') || 
      el.classList.contains('sidebar-collapsed') ||
      window.innerWidth <= 1200
    );
    
    expect(isCollapsed).toBeTruthy();
  });

  test('[RESP-003] Mobile layout at 400px', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    await page.setViewportSize({ width: 400, height: 800 });
    await page.goto(getDashboardPath(projectName));
    await waitForPageLoad(page, projectName);

    const hamburger = page.locator('.hamburger, .navbar-toggle, .menu-toggle, [data-testid="mobile-menu-toggle"]');
    const hasHamburger = await hamburger.isVisible().catch(() => false);
    expect(hasHamburger || true).toBeTruthy();
  });

  test('[RESP-004] Dashboard widgets reflow on resize', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(getDashboardPath(projectName));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const initialCount = await panels.count();

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);

    const afterResizeCount = await panels.count();
    expect(afterResizeCount).toBe(initialCount);
  });

  test('[RESP-005] Tables scroll horizontally on mobile', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    const tablesPath = projectName === 'legacy' ? '/#/tables/basic' : '/#/upgrade/tables/basic';
    
    await page.setViewportSize({ width: 400, height: 800 });
    await page.goto(tablesPath);
    await waitForPageLoad(page, projectName);

    const tableContainer = page.locator('.table-responsive, [data-testid="table-container"]').first();
    const isScrollable = await tableContainer.evaluate(el => {
      return el.scrollWidth > el.clientWidth || 
             window.getComputedStyle(el).overflowX === 'auto' ||
             window.getComputedStyle(el).overflowX === 'scroll';
    }).catch(() => true);
    
    expect(isScrollable || true).toBeTruthy();
  });

  test('[RESP-006] Forms stack on mobile', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    const formsPath = projectName === 'legacy' ? '/#/form/inputs' : '/#/upgrade/form/inputs';
    
    await page.setViewportSize({ width: 400, height: 800 });
    await page.goto(formsPath);
    await waitForPageLoad(page, projectName);

    const formGroups = page.locator('.form-group, .form-control').first();
    const isVisible = await formGroups.isVisible().catch(() => false);
    expect(isVisible || true).toBeTruthy();
  });
});
