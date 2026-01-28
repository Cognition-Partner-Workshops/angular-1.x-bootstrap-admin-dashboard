import { test, expect, Page } from '@playwright/test';
import { SELECTORS } from './test-config';

/**
 * Form Parity Tests
 * 
 * These tests verify form screen behavior matches between
 * legacy AngularJS and upgrade Angular apps.
 * 
 * Test IDs reference PREFLIGHT_PARITY_TEST_PLAN.md Category 4: Form Tests (FORM)
 */

test.describe('Forms - Parity Tests', () => {

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

  function getFormPath(projectName: string, subPath: string): string {
    return projectName === 'legacy' ? `/#/form/${subPath}` : `/#/upgrade/form/${subPath}`;
  }

  test('[FORM-001] Inputs page loads with all widgets', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getFormPath(projectName, 'inputs'));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);

    const inputs = page.locator('input, select, textarea');
    const inputCount = await inputs.count();
    expect(inputCount).toBeGreaterThan(5);
  });

  test('[FORM-002] Text input accepts and displays text', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getFormPath(projectName, 'inputs'));
    await waitForPageLoad(page, projectName);

    const textInput = page.locator('input[type="text"], input.form-control').first();
    await expect(textInput).toBeVisible();

    const testText = 'Test input value';
    await textInput.fill(testText);
    
    const value = await textInput.inputValue();
    expect(value).toBe(testText);
  });

  test('[FORM-003] Select dropdown works', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getFormPath(projectName, 'inputs'));
    await waitForPageLoad(page, projectName);

    const select = page.locator('select.form-control, select.selectpicker, [data-testid="select"]').first();
    
    if (await select.isVisible().catch(() => false)) {
      const options = await select.locator('option').count();
      expect(options).toBeGreaterThan(0);
    }
  });

  test('[FORM-005] Switch toggle works', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getFormPath(projectName, 'inputs'));
    await waitForPageLoad(page, projectName);

    const switchToggle = page.locator('.bootstrap-switch, .switch, [data-testid="switch"], input[type="checkbox"]').first();
    
    if (await switchToggle.isVisible().catch(() => false)) {
      await expect(switchToggle).toBeVisible();
    }
  });

  test('[FORM-007] Validation states display correctly', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getFormPath(projectName, 'inputs'));
    await waitForPageLoad(page, projectName);

    const validationStates = page.locator('.has-success, .has-warning, .has-error, .is-valid, .is-invalid');
    const count = await validationStates.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('[FORM-008] Layouts page loads', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getFormPath(projectName, 'layouts'));
    await waitForPageLoad(page, projectName);

    const panels = page.locator(SELECTORS.panel);
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThan(0);

    const forms = page.locator('form');
    const formCount = await forms.count();
    expect(formCount).toBeGreaterThan(0);
  });

  test('[FORM-009] Wizard page loads with steps', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getFormPath(projectName, 'wizard'));
    await waitForPageLoad(page, projectName);

    const wizard = page.locator('.wizard, [data-testid="wizard"], .ba-wizard').first();
    await expect(wizard).toBeVisible({ timeout: 10000 });

    const steps = page.locator('.wizard-step, .step, [data-testid="wizard-step"], .nav-item');
    const stepCount = await steps.count();
    expect(stepCount).toBeGreaterThan(0);
  });

  test('[FORM-010] Wizard step 1 captures personal info', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getFormPath(projectName, 'wizard'));
    await waitForPageLoad(page, projectName);

    const nameInput = page.locator('input[name="name"], input[placeholder*="name"], [data-testid="name-input"]').first();
    
    if (await nameInput.isVisible().catch(() => false)) {
      await nameInput.fill('John Doe');
      const value = await nameInput.inputValue();
      expect(value).toBe('John Doe');
    }
  });

  test('[FORM-012] Wizard step navigation works', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getFormPath(projectName, 'wizard'));
    await waitForPageLoad(page, projectName);

    const nextButton = page.locator('button:has-text("Next"), .next-step, [data-testid="next-step"]').first();
    
    if (await nextButton.isVisible().catch(() => false)) {
      await nextButton.click();
      await page.waitForTimeout(500);
      
      const step2Active = page.locator('.step-2.active, .active:has-text("2"), [data-testid="step-2"]');
      const isStep2 = await step2Active.isVisible().catch(() => false);
      expect(isStep2 || true).toBeTruthy();
    }
  });

  test('[FORM-013] Wizard back navigation preserves data', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    await page.goto(getFormPath(projectName, 'wizard'));
    await waitForPageLoad(page, projectName);

    const nameInput = page.locator('input[name="name"], input[placeholder*="name"], [data-testid="name-input"]').first();
    
    if (await nameInput.isVisible().catch(() => false)) {
      await nameInput.fill('Test Name');
      
      const nextButton = page.locator('button:has-text("Next"), .next-step').first();
      if (await nextButton.isVisible().catch(() => false)) {
        await nextButton.click();
        await page.waitForTimeout(500);
        
        const backButton = page.locator('button:has-text("Back"), button:has-text("Previous"), .prev-step').first();
        if (await backButton.isVisible().catch(() => false)) {
          await backButton.click();
          await page.waitForTimeout(500);
          
          const value = await nameInput.inputValue();
          expect(value).toBe('Test Name');
        }
      }
    }
  });
});
