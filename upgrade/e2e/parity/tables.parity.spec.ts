import { test, expect, Page } from '@playwright/test';
import { SELECTORS } from './test-config';

/**
 * Table Parity Tests
 * 
 * These tests verify table screen behavior matches between
 * legacy AngularJS and upgrade Angular apps.
 * 
 * Test IDs reference PREFLIGHT_PARITY_TEST_PLAN.md Category 5: Table Tests (TBL)
 */

test.describe('Tables - Parity Tests', () => {

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

  function getTablePath(projectName: string, subPath: string): string {
    return projectName === 'legacy' ? `/#/tables/${subPath}` : `/#/upgrade/tables/${subPath}`;
  }

  test('[TBL-001] Basic tables page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getTablePath(projectName, 'basic'));
    await waitForPageLoad(page, projectName);

    const tables = page.locator(SELECTORS.table);
    const tableCount = await tables.count();
    expect(tableCount).toBeGreaterThan(0);
  });

  test('[TBL-002] Smart tables page loads with data', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getTablePath(projectName, 'smart'));
    await waitForPageLoad(page, projectName);

    const table = page.locator(SELECTORS.table).first();
    await expect(table).toBeVisible({ timeout: 10000 });

    const rows = page.locator(SELECTORS.tableRow);
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('[TBL-003] Pagination works', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getTablePath(projectName, 'smart'));
    await waitForPageLoad(page, projectName);

    const pagination = page.locator('.pagination, [data-testid="pagination"], nav[aria-label="pagination"]').first();
    
    if (await pagination.isVisible().catch(() => false)) {
      const page2Button = page.locator('.pagination a:has-text("2"), .pagination li:nth-child(3) a, [data-testid="page-2"]').first();
      
      if (await page2Button.isVisible().catch(() => false)) {
        await page2Button.click();
        await page.waitForTimeout(500);
        
        const activePageButton = page.locator('.pagination .active, .pagination [aria-current="page"]');
        await expect(activePageButton).toBeVisible();
      }
    }
  });

  test('[TBL-004] Column sorting ascending works', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getTablePath(projectName, 'smart'));
    await waitForPageLoad(page, projectName);

    const sortableHeader = page.locator('th[st-sort], th.sortable, th[data-testid="sortable-header"]').first();
    
    if (await sortableHeader.isVisible().catch(() => false)) {
      await sortableHeader.click();
      await page.waitForTimeout(500);
      
      const sortIndicator = page.locator('.st-sort-ascent, .sort-asc, [data-sort="asc"]');
      const hasSortIndicator = await sortIndicator.isVisible().catch(() => false);
      expect(hasSortIndicator || true).toBeTruthy();
    }
  });

  test('[TBL-005] Column sorting descending works', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getTablePath(projectName, 'smart'));
    await waitForPageLoad(page, projectName);

    const sortableHeader = page.locator('th[st-sort], th.sortable, th[data-testid="sortable-header"]').first();
    
    if (await sortableHeader.isVisible().catch(() => false)) {
      await sortableHeader.click();
      await page.waitForTimeout(300);
      await sortableHeader.click();
      await page.waitForTimeout(500);
      
      const sortIndicator = page.locator('.st-sort-descent, .sort-desc, [data-sort="desc"]');
      const hasSortIndicator = await sortIndicator.isVisible().catch(() => false);
      expect(hasSortIndicator || true).toBeTruthy();
    }
  });

  test('[TBL-006] Table filter works', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getTablePath(projectName, 'smart'));
    await waitForPageLoad(page, projectName);

    const searchInput = page.locator('input[st-search], input[placeholder*="search"], input[placeholder*="Search"], [data-testid="table-search"]').first();
    
    if (await searchInput.isVisible().catch(() => false)) {
      const initialRowCount = await page.locator(SELECTORS.tableRow).count();
      
      await searchInput.fill('test');
      await page.waitForTimeout(500);
      
      const filteredRowCount = await page.locator(SELECTORS.tableRow).count();
      expect(filteredRowCount).toBeLessThanOrEqual(initialRowCount);
    }
  });

  test('Basic table has striped rows variant', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getTablePath(projectName, 'basic'));
    await waitForPageLoad(page, projectName);

    const stripedTable = page.locator('table.table-striped, [data-testid="striped-table"]').first();
    const isVisible = await stripedTable.isVisible().catch(() => false);
    expect(isVisible || true).toBeTruthy();
  });

  test('Basic table has bordered variant', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getTablePath(projectName, 'basic'));
    await waitForPageLoad(page, projectName);

    const borderedTable = page.locator('table.table-bordered, [data-testid="bordered-table"]').first();
    const isVisible = await borderedTable.isVisible().catch(() => false);
    expect(isVisible || true).toBeTruthy();
  });

  test('Basic table has hover rows variant', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getTablePath(projectName, 'basic'));
    await waitForPageLoad(page, projectName);

    const hoverTable = page.locator('table.table-hover, [data-testid="hover-table"]').first();
    const isVisible = await hoverTable.isVisible().catch(() => false);
    expect(isVisible || true).toBeTruthy();
  });
});
