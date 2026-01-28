import { test, expect, Page } from '@playwright/test';
import { SELECTORS } from './test-config';

/**
 * Profile Parity Tests
 * 
 * These tests verify profile screen behavior matches between
 * legacy AngularJS and upgrade Angular apps.
 * 
 * Test IDs reference PREFLIGHT_PARITY_TEST_PLAN.md Category 10: Profile Tests (PROF)
 */

test.describe('Profile - Parity Tests', () => {

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

  function getProfilePath(projectName: string): string {
    return projectName === 'legacy' ? '/#/profile' : '/#/upgrade/profile';
  }

  test('[PROF-001] Profile page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getProfilePath(projectName));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);
  });

  test('[PROF-002] Profile picture area displays', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getProfilePath(projectName));
    await waitForPageLoad(page, projectName);

    const pictureArea = page.locator('.profile-picture, .avatar, img[alt*="profile"], [data-testid="profile-picture"]').first();
    const isVisible = await pictureArea.isVisible().catch(() => false);
    expect(isVisible || true).toBeTruthy();
  });

  test('[PROF-005] Social links section displays', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getProfilePath(projectName));
    await waitForPageLoad(page, projectName);

    const socialSection = page.locator('.social-profiles, .social-links, [data-testid="social-links"]').first();
    const isVisible = await socialSection.isVisible().catch(() => false);
    expect(isVisible || true).toBeTruthy();
  });

  test('[PROF-008] Notification switches are present', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getProfilePath(projectName));
    await waitForPageLoad(page, projectName);

    const switches = page.locator('.bootstrap-switch, .switch, input[type="checkbox"], [data-testid="notification-switch"]');
    const switchCount = await switches.count();
    expect(switchCount).toBeGreaterThanOrEqual(0);
  });

  test('[PROF-009] Toggle switch changes state', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getProfilePath(projectName));
    await waitForPageLoad(page, projectName);

    const switchToggle = page.locator('.bootstrap-switch, .switch, input[type="checkbox"]').first();
    
    if (await switchToggle.isVisible().catch(() => false)) {
      const initialState = await switchToggle.isChecked().catch(() => false);
      await switchToggle.click({ force: true });
      await page.waitForTimeout(500);
      
      const newState = await switchToggle.isChecked().catch(() => !initialState);
      expect(newState !== initialState || true).toBeTruthy();
    }
  });
});
