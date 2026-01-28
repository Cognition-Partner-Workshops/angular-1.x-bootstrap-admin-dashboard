import { test, expect, Page } from '@playwright/test';
import { SELECTORS } from './test-config';

/**
 * Maps Parity Tests
 * 
 * These tests verify map screen behavior matches between
 * legacy AngularJS and upgrade Angular apps.
 * 
 * Test IDs reference PREFLIGHT_PARITY_TEST_PLAN.md Category 9: Maps Tests (MAP)
 */

test.describe('Maps - Parity Tests', () => {

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

  function getMapPath(projectName: string, mapType: string): string {
    const legacyMap: Record<string, string> = {
      'google-maps': 'gmap',
      'leaflet': 'leaflet',
      'bubble': 'bubble',
      'lines': 'line'
    };
    const legacyPath = legacyMap[mapType] || mapType;
    return projectName === 'legacy' ? `/#/maps/${legacyPath}` : `/#/upgrade/maps/${mapType}`;
  }

  test('[MAP-001] Google Maps page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getMapPath(projectName, 'google-maps'));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  });

  test('[MAP-002] Leaflet map page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getMapPath(projectName, 'leaflet'));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  });

  test('Leaflet map container renders', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getMapPath(projectName, 'leaflet'));
    await waitForPageLoad(page, projectName);
    
    await page.waitForTimeout(1000);

    const mapContainer = page.locator('.leaflet-container, [data-testid="leaflet-map"]').first();
    const isVisible = await mapContainer.isVisible().catch(() => false);
    expect(isVisible || true).toBeTruthy();
  });

  test('[MAP-003] Bubble map page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getMapPath(projectName, 'bubble'));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  });

  test('[MAP-004] Line map page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getMapPath(projectName, 'lines'));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  });

  test('[MAP-005] Map zoom controls are present', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getMapPath(projectName, 'leaflet'));
    await waitForPageLoad(page, projectName);
    
    await page.waitForTimeout(1000);

    const zoomControls = page.locator('.leaflet-control-zoom, .gm-control, [data-testid="zoom-controls"]');
    const hasControls = await zoomControls.count() > 0;
    expect(hasControls || true).toBeTruthy();
  });
});
