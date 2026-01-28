import { test, expect, Page } from '@playwright/test';
import { ROUTE_MAPPINGS, getRoutePath, SELECTORS, RouteMapping } from './test-config';

/**
 * Route Reachability Parity Tests
 * 
 * These tests verify that all migrated screens are reachable via their routes
 * in both the legacy AngularJS app and the upgrade Angular app.
 * 
 * Test IDs reference PREFLIGHT_PARITY_TEST_PLAN.md
 */

test.describe('Route Reachability - Parity Tests', () => {
  
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

  async function verifyPageContent(page: Page, mapping: RouteMapping): Promise<void> {
    const contentArea = page.locator(SELECTORS.contentArea).first();
    await expect(contentArea).toBeVisible({ timeout: 10000 });
    
    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  }

  for (const mapping of ROUTE_MAPPINGS) {
    test(`[${mapping.testId}] ${mapping.screenId}: ${mapping.name} route is reachable`, async ({ page }, testInfo) => {
      const projectName = testInfo.project.name;
      const routePath = getRoutePath(mapping, projectName);
      
      await test.step(`Navigate to ${mapping.name}`, async () => {
        await page.goto(routePath);
        await waitForPageLoad(page, projectName);
      });

      await test.step('Verify page content loaded', async () => {
        await verifyPageContent(page, mapping);
      });

      await test.step('Verify no JavaScript errors', async () => {
        const errors: string[] = [];
        page.on('pageerror', (error) => {
          errors.push(error.message);
        });
        
        await page.waitForTimeout(1000);
        expect(errors.filter(e => !e.includes('ResizeObserver'))).toHaveLength(0);
      });
    });
  }
});

test.describe('Navigation Behavior - Parity Tests', () => {
  
  test('[NAV-001] Default route redirects to dashboard', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    const basePath = projectName === 'legacy' ? '/#/' : '/#/upgrade/';
    
    await page.goto(basePath);
    await page.waitForLoadState('networkidle');
    
    const url = page.url();
    expect(url).toContain('dashboard');
  });

  test('[NAV-002] Unknown route redirects to dashboard', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    const unknownPath = projectName === 'legacy' ? '/#/nonexistent-route-xyz' : '/#/upgrade/nonexistent-route-xyz';
    
    await page.goto(unknownPath);
    await page.waitForLoadState('networkidle');
    
    const url = page.url();
    expect(url).toContain('dashboard');
  });

  test('[NAV-005] Direct URL access works', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    const wizardPath = projectName === 'legacy' ? '/#/form/wizard' : '/#/upgrade/form/wizard';
    
    await page.goto(wizardPath);
    await page.waitForLoadState('networkidle');
    
    const url = page.url();
    expect(url).toContain('wizard');
    
    const wizardContent = page.locator('.wizard, [data-testid="wizard"]').first();
    await expect(wizardContent).toBeVisible({ timeout: 10000 });
  });

  test('[NAV-006] Browser back button works', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    const dashboardPath = projectName === 'legacy' ? '/#/dashboard' : '/#/upgrade/dashboard';
    const formsPath = projectName === 'legacy' ? '/#/form/inputs' : '/#/upgrade/form/inputs';
    
    await page.goto(dashboardPath);
    await page.waitForLoadState('networkidle');
    
    await page.goto(formsPath);
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('form');
    
    await page.goBack();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('dashboard');
  });

  test('[NAV-007] Browser forward button works', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    const dashboardPath = projectName === 'legacy' ? '/#/dashboard' : '/#/upgrade/dashboard';
    const formsPath = projectName === 'legacy' ? '/#/form/inputs' : '/#/upgrade/form/inputs';
    
    await page.goto(dashboardPath);
    await page.waitForLoadState('networkidle');
    
    await page.goto(formsPath);
    await page.waitForLoadState('networkidle');
    
    await page.goBack();
    await page.waitForLoadState('networkidle');
    
    await page.goForward();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('form');
  });

  test('[NAV-008] Page refresh preserves route', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    const buttonsPath = projectName === 'legacy' ? '/#/ui/buttons' : '/#/upgrade/ui/buttons';
    
    await page.goto(buttonsPath);
    await page.waitForLoadState('networkidle');
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    expect(page.url()).toContain('buttons');
  });
});
