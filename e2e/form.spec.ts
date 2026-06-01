import { test, expect } from '@playwright/test';

// ═══════════════════════════════════════════════════════════════════════
// Form Inputs Page  /#/form/inputs
// ═══════════════════════════════════════════════════════════════════════

test.describe('Form Inputs Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/form/inputs');
    await page.waitForSelector('.widgets', { timeout: 15_000 });
  });

  test('should load the form inputs page', async ({ page }) => {
    await expect(page.locator('.widgets')).toBeVisible();
  });

  // ── Standard Fields ──────────────────────────────────────────────────

  test('should display all standard input fields', async ({ page }) => {
    await expect(page.locator('#input01')).toBeVisible();
    await expect(page.locator('#input02')).toBeVisible();
    await expect(page.locator('#input03')).toBeVisible();
    await expect(page.locator('#input04')).toBeVisible();
    await expect(page.locator('#input05')).toBeVisible();
    await expect(page.locator('#textarea01')).toBeVisible();
  });

  test('should have correct placeholder text on standard fields', async ({ page }) => {
    await expect(page.locator('#input01')).toHaveAttribute('placeholder', 'Text');
    await expect(page.locator('#input02')).toHaveAttribute('placeholder', 'Password');
    await expect(page.locator('#input03')).toHaveAttribute('placeholder', 'Rounded Corners');
    await expect(page.locator('#input05')).toHaveAttribute('placeholder', 'Disabled Input');
  });

  test('should have disabled input field', async ({ page }) => {
    await expect(page.locator('#input05')).toBeDisabled();
  });

  test('should have rounded corners input with form-control-rounded class', async ({ page }) => {
    await expect(page.locator('#input03.form-control-rounded')).toBeVisible();
  });

  test('should have help text block', async ({ page }) => {
    await expect(page.locator('.help-block.sub-little-text')).toBeVisible();
    await expect(page.locator('.help-block.sub-little-text')).toContainText('A block of help text');
  });

  test('should have small and large input sizes', async ({ page }) => {
    await expect(page.locator('input.input-sm')).toBeVisible();
    await expect(page.locator('input.input-lg')).toBeVisible();
  });

  // ── Checkboxes & Radios ──────────────────────────────────────────────

  test('should display checkbox controls', async ({ page }) => {
    await expect(page.locator('#inlineCheckbox01')).toBeAttached();
    await expect(page.locator('#inlineCheckbox02')).toBeAttached();
    await expect(page.locator('#inlineCheckbox03')).toBeAttached();
  });

  test('should display radio controls', async ({ page }) => {
    await expect(page.locator('#inlineRadio1')).toBeAttached();
    await expect(page.locator('#inlineRadio2')).toBeAttached();
    await expect(page.locator('#inlineRadio3')).toBeAttached();
  });

  test('should have disabled checkbox and radio', async ({ page }) => {
    const disabledCheckbox = page.locator('.checkbox.disabled input[type="checkbox"]');
    await expect(disabledCheckbox).toBeDisabled();

    const disabledRadio = page.locator('.radio.disabled input[type="radio"]');
    await expect(disabledRadio).toBeDisabled();
  });

  test('should display checkbox and radio label text', async ({ page }) => {
    await expect(page.locator('.checkbox-demo-row')).toContainText('Check 1');
    await expect(page.locator('.checkbox-demo-row')).toContainText('Check 2');
    await expect(page.locator('.checkbox-demo-row')).toContainText('Check 3');
    await expect(page.locator('.radio-demo')).toContainText('Option 1');
    await expect(page.locator('.radio-demo')).toContainText('Option 2');
  });

  // ── Input Groups ─────────────────────────────────────────────────────

  test('should display input group addons', async ({ page }) => {
    await expect(page.locator('.input-group-addon-primary')).toBeVisible();
    await expect(page.locator('.input-group-addon-primary')).toContainText('@');
    await expect(page.locator('.input-group-addon-warning')).toBeVisible();
    await expect(page.locator('.input-group-addon-warning')).toContainText('@example.com');
    await expect(page.locator('.input-group-addon-success').first()).toContainText('$');
  });

  test('should have Go button in input group', async ({ page }) => {
    await expect(page.locator('button.btn-danger', { hasText: 'Go!' })).toBeVisible();
  });

  // ── Validation States ────────────────────────────────────────────────

  test('should display validation state inputs', async ({ page }) => {
    await expect(page.locator('#inputSuccess1')).toBeVisible();
    await expect(page.locator('#inputWarning1')).toBeVisible();
    await expect(page.locator('#inputError1')).toBeVisible();
  });

  test('should have validation state feedback icons', async ({ page }) => {
    await expect(page.locator('#inputSuccess2')).toBeVisible();
    await expect(page.locator('#inputWarning2')).toBeVisible();
    await expect(page.locator('#inputError2')).toBeVisible();
  });

  test('should have validation state checkboxes', async ({ page }) => {
    await expect(page.locator('#checkboxSuccess')).toBeAttached();
    await expect(page.locator('#checkboxWarning')).toBeAttached();
    await expect(page.locator('#checkboxError')).toBeAttached();
  });

  test('should have input group with success validation', async ({ page }) => {
    await expect(page.locator('#inputGroupSuccess1')).toBeVisible();
  });

  // ── On/Off Switches ─────────────────────────────────────────────────

  test('should display on/off switches with different styles', async ({ page }) => {
    const switcherContainer = page.locator('.switcher-container');
    const count = await switcherContainer.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('should have switches with correct style classes', async ({ page }) => {
    await expect(page.locator('.switcher.primary')).toBeVisible();
    await expect(page.locator('.switcher.success')).toBeVisible();
    await expect(page.locator('.switcher.warning')).toBeVisible();
    await expect(page.locator('.switcher.danger')).toBeVisible();
    await expect(page.locator('.switcher.info')).toBeVisible();
  });

  // ── Old On/Off Switches ──────────────────────────────────────────────

  test('should display old-style switch containers', async ({ page }) => {
    const oldSwitches = page.locator('.switches .switch-container');
    const count = await oldSwitches.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('should have old switches with color classes', async ({ page }) => {
    await expect(page.locator('.switch-container.primary')).toBeVisible();
    await expect(page.locator('.switch-container.warning')).toBeVisible();
    await expect(page.locator('.switch-container.danger')).toBeVisible();
    await expect(page.locator('.switch-container.info')).toBeVisible();
    await expect(page.locator('.switch-container.success')).toBeVisible();
  });

  // ── Tags Input ───────────────────────────────────────────────────────

  test('should display tags input fields', async ({ page }) => {
    const tagsInputs = page.locator('input[data-role="tagsinput"]');
    const count = await tagsInputs.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  // ── Datepicker ───────────────────────────────────────────────────────

  test('should display inline datepicker', async ({ page }) => {
    await expect(page.locator('.datepicker .uib-datepicker-wrap')).toBeVisible();
  });

  test('should have datepicker popup input', async ({ page }) => {
    const popupInput = page.locator('.datepicker input.form-control').first();
    await expect(popupInput).toBeVisible();
  });
});


// ═══════════════════════════════════════════════════════════════════════
// Form Layouts Page  /#/form/layouts
// ═══════════════════════════════════════════════════════════════════════

test.describe('Form Layouts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/form/layouts');
    await page.waitForSelector('.widgets', { timeout: 15_000 });
  });

  test('should load the form layouts page', async ({ page }) => {
    await expect(page.locator('.widgets')).toBeVisible();
  });

  // ── Inline Form ──────────────────────────────────────────────────────

  test('should display inline form with Name and Email inputs', async ({ page }) => {
    await expect(page.locator('#exampleInputName2')).toBeVisible();
    await expect(page.locator('#exampleInputEmail2')).toBeVisible();
  });

  test('should have Send invitation button in inline form', async ({ page }) => {
    await expect(page.locator('button.btn-primary', { hasText: 'Send invitation' })).toBeVisible();
  });

  test('should have Remember me checkbox in inline form', async ({ page }) => {
    await expect(page.locator('.form-inline .custom-checkbox')).toBeVisible();
    await expect(page.locator('.form-inline .custom-checkbox')).toContainText('Remember me');
  });

  // ── Basic Form ───────────────────────────────────────────────────────

  test('should display basic form with email and password', async ({ page }) => {
    await expect(page.locator('#exampleInputEmail1')).toBeVisible();
    await expect(page.locator('#exampleInputPassword1')).toBeVisible();
  });

  test('should have Submit button in basic form', async ({ page }) => {
    await expect(page.locator('button.btn-danger', { hasText: 'Submit' })).toBeVisible();
  });

  test('should have Check me out checkbox', async ({ page }) => {
    const checkbox = page.locator('.custom-checkbox', { hasText: 'Check me out' });
    await expect(checkbox).toBeVisible();
  });

  // ── Horizontal Form ──────────────────────────────────────────────────

  test('should display horizontal form with email and password', async ({ page }) => {
    await expect(page.locator('#inputEmail3')).toBeVisible();
    await expect(page.locator('#inputPassword3')).toBeVisible();
  });

  test('should have Sign in button in horizontal form', async ({ page }) => {
    await expect(page.locator('button.btn-warning', { hasText: 'Sign in' })).toBeVisible();
  });

  // ── Form Without Labels ──────────────────────────────────────────────

  test('should display form without labels with placeholders', async ({ page }) => {
    await expect(page.locator('input[placeholder="Recipients"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Subject"]')).toBeVisible();
    await expect(page.locator('textarea[placeholder="Message"]')).toBeVisible();
  });

  test('should have Send button in form without labels', async ({ page }) => {
    await expect(page.locator('button.btn-success', { hasText: 'Send' })).toBeVisible();
  });

  // ── Block Form ───────────────────────────────────────────────────────

  test('should display block form fields', async ({ page }) => {
    await expect(page.locator('#inputFirstName')).toBeVisible();
    await expect(page.locator('#inputLastName')).toBeVisible();
    await expect(page.locator('#inputEmail')).toBeVisible();
    await expect(page.locator('#inputWebsite')).toBeVisible();
  });

  test('should have Submit button in block form', async ({ page }) => {
    await expect(page.locator('button.btn-primary', { hasText: 'Submit' })).toBeVisible();
  });
});


// ═══════════════════════════════════════════════════════════════════════
// Form Wizard Page  /#/form/wizard
// ═══════════════════════════════════════════════════════════════════════

test.describe('Form Wizard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/form/wizard');
    await page.waitForSelector('.ba-wizard', { timeout: 15_000 });
  });

  test('should load the wizard page with navigation tabs', async ({ page }) => {
    await expect(page.locator('.ba-wizard')).toBeVisible();
    await expect(page.locator('.ba-wizard-navigation-container')).toBeVisible();
  });

  test('should display all 4 wizard step tabs', async ({ page }) => {
    const navTabs = page.locator('.ba-wizard-navigation');
    await expect(navTabs).toHaveCount(4);
    await expect(navTabs.nth(0)).toContainText('Personal info');
    await expect(navTabs.nth(1)).toContainText('Product Info');
    await expect(navTabs.nth(2)).toContainText('Shipment');
    await expect(navTabs.nth(3)).toContainText('Finish');
  });

  test('should have progress bar', async ({ page }) => {
    await expect(page.locator('.ba-wizard-progress')).toBeAttached();
    await expect(page.locator('.ba-wizard-progress .progress-bar')).toBeAttached();
  });

  test('should show Personal info step by default', async ({ page }) => {
    await expect(page.locator('#exampleUsername1')).toBeVisible();
    await expect(page.locator('#exampleInputEmail1')).toBeVisible();
    await expect(page.locator('#exampleInputPassword1')).toBeVisible();
    await expect(page.locator('#exampleInputConfirmPassword1')).toBeVisible();
  });

  test('should have previous and next pager buttons', async ({ page }) => {
    const prevBtn = page.locator('.ba-wizard-pager .previous button');
    const nextBtn = page.locator('.ba-wizard-pager .next button');
    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();
    await expect(prevBtn).toContainText('previous');
    await expect(nextBtn).toContainText('next');
  });

  test('should disable previous button on first step', async ({ page }) => {
    const prevBtn = page.locator('.ba-wizard-pager .previous button');
    await expect(prevBtn).toBeDisabled();
  });

  test('should navigate to Product Info step when next is clicked after filling required fields', async ({ page }) => {
    await page.fill('#exampleUsername1', 'testuser');
    await page.fill('#exampleInputEmail1', 'test@example.com');
    await page.fill('#exampleInputPassword1', 'password123');
    await page.fill('#exampleInputConfirmPassword1', 'password123');

    const nextBtn = page.locator('.ba-wizard-pager .next button');
    await nextBtn.click();

    await expect(page.locator('#productName')).toBeVisible();
    await expect(page.locator('#productId')).toBeVisible();
  });

  test('should navigate through all wizard steps', async ({ page }) => {
    // Fill step 1
    await page.fill('#exampleUsername1', 'testuser');
    await page.fill('#exampleInputEmail1', 'test@example.com');
    await page.fill('#exampleInputPassword1', 'password123');
    await page.fill('#exampleInputConfirmPassword1', 'password123');

    const nextBtn = page.locator('.ba-wizard-pager .next button');
    await nextBtn.click();

    // Step 2 - Product Info
    await expect(page.locator('#productName')).toBeVisible();
    await page.fill('#productName', 'Test Product');
    await page.fill('#productId', 'TP-001');
    await nextBtn.click();

    // Step 3 - Shipment
    await expect(page.locator('#address')).toBeVisible();
    await page.fill('#address', '123 Test St');
    await nextBtn.click();

    // Step 4 - Finish
    await expect(page.locator('.step', { hasText: 'Congratulations' })).toBeVisible();
  });

  test('should disable next button on last step', async ({ page }) => {
    await page.fill('#exampleUsername1', 'testuser');
    await page.fill('#exampleInputEmail1', 'test@example.com');
    await page.fill('#exampleInputPassword1', 'password123');
    await page.fill('#exampleInputConfirmPassword1', 'password123');

    const nextBtn = page.locator('.ba-wizard-pager .next button');
    await nextBtn.click();

    await page.fill('#productName', 'Test Product');
    await page.fill('#productId', 'TP-001');
    await nextBtn.click();

    await page.fill('#address', '123 Test St');
    await nextBtn.click();

    await expect(nextBtn).toBeDisabled();
  });

  test('should navigate back with previous button', async ({ page }) => {
    await page.fill('#exampleUsername1', 'testuser');
    await page.fill('#exampleInputEmail1', 'test@example.com');
    await page.fill('#exampleInputPassword1', 'password123');
    await page.fill('#exampleInputConfirmPassword1', 'password123');

    const nextBtn = page.locator('.ba-wizard-pager .next button');
    const prevBtn = page.locator('.ba-wizard-pager .previous button');
    await nextBtn.click();

    await expect(page.locator('#productName')).toBeVisible();

    await prevBtn.click();
    await expect(page.locator('#exampleUsername1')).toBeVisible();
  });
});
