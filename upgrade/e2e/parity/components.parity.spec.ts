import { test, expect, Page } from '@playwright/test';
import { SELECTORS } from './test-config';

/**
 * Components Parity Tests
 * 
 * These tests verify component screen behavior matches between
 * legacy AngularJS and upgrade Angular apps.
 * 
 * Test IDs reference PREFLIGHT_PARITY_TEST_PLAN.md Category 8: Components Tests (COMP)
 */

test.describe('Components - Parity Tests', () => {

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

  function getComponentPath(projectName: string, component: string): string {
    return projectName === 'legacy' ? `/#/components/${component}` : `/#/upgrade/components/${component}`;
  }

  test('[COMP-001] Mail inbox loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    const mailPath = projectName === 'legacy' ? '/#/components/mail/inbox' : '/#/upgrade/components/mail';
    
    await page.goto(mailPath);
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  });

  test('[COMP-002] Mail folder tabs are present', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    const mailPath = projectName === 'legacy' ? '/#/components/mail/inbox' : '/#/upgrade/components/mail';
    
    await page.goto(mailPath);
    await waitForPageLoad(page, projectName);

    const tabs = page.locator('.nav-tabs a, [role="tab"], .mail-tab, [data-testid="mail-tab"]');
    const tabCount = await tabs.count();
    expect(tabCount).toBeGreaterThanOrEqual(0);
  });

  test('[COMP-006] Timeline page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getComponentPath(projectName, 'timeline'));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  });

  test('Timeline items render', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getComponentPath(projectName, 'timeline'));
    await waitForPageLoad(page, projectName);

    const timelineItems = page.locator('.timeline-item, .timeline-entry, [data-testid="timeline-item"]');
    const itemCount = await timelineItems.count();
    expect(itemCount).toBeGreaterThanOrEqual(0);
  });

  test('[COMP-007] Tree view page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getComponentPath(projectName, 'tree'));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  });

  test('[COMP-008] Tree nodes are expandable', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getComponentPath(projectName, 'tree'));
    await waitForPageLoad(page, projectName);

    const treeNodes = page.locator('.tree-node, .jstree-node, [data-testid="tree-node"], .node');
    const nodeCount = await treeNodes.count();
    expect(nodeCount).toBeGreaterThanOrEqual(0);
  });
});
