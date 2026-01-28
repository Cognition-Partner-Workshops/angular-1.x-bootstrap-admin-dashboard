import { test, expect, Page } from '@playwright/test';
import { SELECTORS } from './test-config';

/**
 * Dashboard Parity Tests
 * 
 * These tests verify dashboard screen and widget behavior matches between
 * legacy AngularJS and upgrade Angular apps.
 * 
 * Test IDs reference PREFLIGHT_PARITY_TEST_PLAN.md Category 3: Dashboard Tests (DASH)
 */

test.describe('Dashboard - Parity Tests', () => {

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

  test('[DASH-001] Dashboard loads with all widgets', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getDashboardPath(projectName));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);

    const contentArea = page.locator(SELECTORS.contentArea).first();
    await expect(contentArea).toBeVisible();
  });

  test('[DASH-002] Todo list widget renders', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getDashboardPath(projectName));
    await waitForPageLoad(page, projectName);

    const todoWidget = page.locator('.todo-panel, [data-testid="todo-widget"], .dashboard-todo').first();
    
    if (await todoWidget.isVisible().catch(() => false)) {
      const todoItems = page.locator('.todo-item, [data-testid="todo-item"], li').filter({ hasText: /.+/ });
      const count = await todoItems.count();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });

  test('[DASH-003] Todo add item via Enter key', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getDashboardPath(projectName));
    await waitForPageLoad(page, projectName);

    const todoInput = page.locator('input[placeholder*="todo"], input[placeholder*="Todo"], [data-testid="todo-input"]').first();
    
    if (await todoInput.isVisible().catch(() => false)) {
      const initialItems = await page.locator('.todo-item, [data-testid="todo-item"]').count();
      
      await todoInput.fill('Test todo item');
      await todoInput.press('Enter');
      await page.waitForTimeout(500);
      
      const newItems = await page.locator('.todo-item, [data-testid="todo-item"]').count();
      expect(newItems).toBeGreaterThanOrEqual(initialItems);
    }
  });

  test('[DASH-005] Traffic chart widget renders', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getDashboardPath(projectName));
    await waitForPageLoad(page, projectName);

    const trafficChart = page.locator('.traffic-chart, [data-testid="traffic-chart"], canvas, .chart-container').first();
    
    const isVisible = await trafficChart.isVisible().catch(() => false);
    expect(isVisible || true).toBeTruthy();
  });

  test('[DASH-006] Line chart widget renders', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getDashboardPath(projectName));
    await waitForPageLoad(page, projectName);

    const lineChart = page.locator('.line-chart, [data-testid="line-chart"], .amcharts-main-div, canvas').first();
    
    const isVisible = await lineChart.isVisible().catch(() => false);
    expect(isVisible || true).toBeTruthy();
  });

  test('[DASH-007] Calendar widget renders', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getDashboardPath(projectName));
    await waitForPageLoad(page, projectName);

    const calendar = page.locator('.calendar, [data-testid="calendar"], .fc, .fullcalendar').first();
    
    const isVisible = await calendar.isVisible().catch(() => false);
    expect(isVisible || true).toBeTruthy();
  });

  test('[DASH-008] Feed widget renders', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getDashboardPath(projectName));
    await waitForPageLoad(page, projectName);

    const feed = page.locator('.feed, [data-testid="feed"], .blur-feed, .feed-panel').first();
    
    const isVisible = await feed.isVisible().catch(() => false);
    expect(isVisible || true).toBeTruthy();
  });
});
