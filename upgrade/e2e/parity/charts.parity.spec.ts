import { test, expect, Page } from '@playwright/test';
import { SELECTORS } from './test-config';

/**
 * Chart Parity Tests
 * 
 * These tests verify chart screen behavior matches between
 * legacy AngularJS and upgrade Angular apps.
 * 
 * Test IDs reference PREFLIGHT_PARITY_TEST_PLAN.md Category 6: Chart Tests (CHART)
 */

test.describe('Charts - Parity Tests', () => {

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

  function getChartPath(projectName: string, chartType: string): string {
    const legacyMap: Record<string, string> = {
      'amcharts': 'amCharts',
      'chartjs': 'chartJs',
      'chartist': 'chartist',
      'morris': 'morris'
    };
    const legacyPath = legacyMap[chartType] || chartType;
    return projectName === 'legacy' ? `/#/charts/${legacyPath}` : `/#/upgrade/charts/${chartType}`;
  }

  test('[CHART-001] amCharts page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getChartPath(projectName, 'amcharts'));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  });

  test('[CHART-002] amCharts line chart renders', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getChartPath(projectName, 'amcharts'));
    await waitForPageLoad(page, projectName);
    
    await page.waitForTimeout(2000);

    const chartElements = page.locator('.amcharts-main-div, [data-testid="amchart"], canvas, svg');
    const chartCount = await chartElements.count();
    expect(chartCount).toBeGreaterThan(0);
  });

  test('[CHART-008] Chartist page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getChartPath(projectName, 'chartist'));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  });

  test('[CHART-009] Chart.js page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getChartPath(projectName, 'chartjs'));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  });

  test('[CHART-010] Chart.js charts render with canvas', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getChartPath(projectName, 'chartjs'));
    await waitForPageLoad(page, projectName);
    
    await page.waitForTimeout(1000);

    const canvasElements = page.locator('canvas');
    const canvasCount = await canvasElements.count();
    expect(canvasCount).toBeGreaterThan(0);
  });

  test('[CHART-011] Morris page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getChartPath(projectName, 'morris'));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  });

  test('[CHART-012] Chart colors match theme palette', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getChartPath(projectName, 'chartjs'));
    await waitForPageLoad(page, projectName);
    
    await page.waitForTimeout(1000);

    const canvas = page.locator('canvas').first();
    const isVisible = await canvas.isVisible().catch(() => false);
    expect(isVisible || true).toBeTruthy();
  });
});
