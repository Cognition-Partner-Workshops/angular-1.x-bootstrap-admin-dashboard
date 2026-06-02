import { test, expect } from '@playwright/test';

// ────────────────────────────────────────────────────────────
// Form Inputs page  (#/form/inputs)
// ────────────────────────────────────────────────────────────
test.describe('Form Inputs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/form/inputs');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  // ── Routing ──────────────────────────────────────────────
  test('should navigate to the Form Inputs page', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/form\/inputs/);
    await expect(page.locator('h1', { hasText: 'Form Inputs' })).toBeVisible();
  });

  // ── Standard Fields panel ────────────────────────────────
  test('should render Standard Fields panel with all inputs', async ({ page }) => {
    await expect(page.locator('#input01')).toBeAttached();
    await expect(page.locator('#input01')).toHaveAttribute('placeholder', 'Text');
    await expect(page.locator('#input01')).toHaveAttribute('type', 'text');

    await expect(page.locator('#input02')).toBeAttached();
    await expect(page.locator('#input02')).toHaveAttribute('type', 'password');

    await expect(page.locator('#input03')).toBeAttached();
    await expect(page.locator('#input03')).toHaveAttribute('placeholder', 'Rounded Corners');

    await expect(page.locator('#input04')).toBeAttached();
    const helpText = page.locator('.help-block.sub-little-text');
    await expect(helpText).toContainText('A block of help text');

    await expect(page.locator('#input05')).toBeDisabled();

    await expect(page.locator('#textarea01')).toBeAttached();
    await expect(page.locator('#textarea01')).toHaveAttribute('placeholder', 'Default Input');

    await expect(page.locator('#input2')).toHaveClass(/input-sm/);
    await expect(page.locator('#input4')).toHaveClass(/input-lg/);
  });

  // ── Tags Input panel ─────────────────────────────────────
  test('should render Tags Input panel with pre-populated tags', async ({ page }) => {
    const tagInputs = page.locator('input[data-role="tagsinput"]');
    await expect(tagInputs).toHaveCount(3);

    // First input: Amsterdam, Washington, Sydney, Beijing, Cairo
    await expect(tagInputs.nth(0)).toHaveAttribute('value', 'Amsterdam,Washington,Sydney,Beijing,Cairo');

    // Second input: Minsk, Prague, Vilnius, Warsaw
    await expect(tagInputs.nth(1)).toHaveAttribute('value', 'Minsk,Prague,Vilnius,Warsaw');

    // Third input: London, Berlin, Paris, Rome, Munich
    await expect(tagInputs.nth(2)).toHaveAttribute('value', 'London,Berlin,Paris,Rome,Munich');
  });

  // ── Input Groups panel ───────────────────────────────────
  test('should render Input Groups with addons and button', async ({ page }) => {
    const atAddon = page.locator('#basic-addon1');
    await expect(atAddon).toContainText('@');

    const exampleAddon = page.locator('#basic-addon2');
    await expect(exampleAddon).toContainText('@example.com');

    const dollarAddon = page.locator('.input-group-addon-success').first();
    await expect(dollarAddon).toContainText('$');

    const goButton = page.locator('button.btn-danger', { hasText: 'Go!' });
    await expect(goButton).toBeAttached();
  });

  // ── Checkboxes & Radios panel ────────────────────────────
  test('should render checkboxes and radio buttons', async ({ page }) => {
    await expect(page.locator('#inlineCheckbox01')).toBeAttached();
    await expect(page.locator('#inlineCheckbox02')).toBeAttached();
    await expect(page.locator('#inlineCheckbox03')).toBeAttached();

    await expect(page.locator('#inlineRadio1')).toBeAttached();
    await expect(page.locator('#inlineRadio2')).toBeAttached();
    await expect(page.locator('#inlineRadio3')).toBeAttached();

    const disabledCheckbox = page.locator('.checkbox.disabled input[type="checkbox"]');
    await expect(disabledCheckbox).toBeDisabled();

    const disabledRadio = page.locator('#optionsRadios3');
    await expect(disabledRadio).toBeDisabled();
  });

  // ── On/Off Switches panel (ba-switcher) ──────────────────
  test('should render On/Off Switches with correct initial states', async ({ page }) => {
    const switchers = page.locator('ba-switcher input[type="checkbox"]');
    await expect(switchers).toHaveCount(5);

    // s1=true, s2=false, s3=true, s4=true, s5=false
    await expect(switchers.nth(0)).toBeChecked();
    await expect(switchers.nth(1)).not.toBeChecked();
    await expect(switchers.nth(2)).toBeChecked();
    await expect(switchers.nth(3)).toBeChecked();
    await expect(switchers.nth(4)).not.toBeChecked();
  });

  // ── Old On/Off Switches panel (bootstrap-switch) ─────────
  test('should render Old On/Off Switches (deprecated)', async ({ page }) => {
    const oldSwitchContainer = page.locator('.switches.clearfix');
    await expect(oldSwitchContainer).toBeAttached();

    const oldSwitchInputs = oldSwitchContainer.locator('.bootstrap-switch');
    await expect(oldSwitchInputs).toHaveCount(5);
  });

  // ── Validation States panel ──────────────────────────────
  test('should render Validation States with correct classes', async ({ page }) => {
    await expect(page.locator('#inputSuccess1')).toBeAttached();
    await expect(page.locator('#inputSuccess1').locator('..')).toHaveClass(/has-success/);

    await expect(page.locator('#inputWarning1')).toBeAttached();
    await expect(page.locator('#inputWarning1').locator('..')).toHaveClass(/has-warning/);

    await expect(page.locator('#inputError1')).toBeAttached();
    await expect(page.locator('#inputError1').locator('..')).toHaveClass(/has-error/);

    await expect(page.locator('#checkboxSuccess')).toBeAttached();
    await expect(page.locator('#checkboxWarning')).toBeAttached();
    await expect(page.locator('#checkboxError')).toBeAttached();

    // Feedback icons
    await expect(page.locator('#inputSuccess2')).toBeAttached();
    await expect(page.locator('#inputSuccess2').locator('..').locator('.form-control-feedback')).toBeAttached();

    await expect(page.locator('#inputWarning2')).toBeAttached();
    await expect(page.locator('#inputError2')).toBeAttached();

    // Input group with success
    await expect(page.locator('#inputGroupSuccess1')).toBeAttached();
  });

  // ── Selects panel (ui-select) ────────────────────────────
  test('should render Selects panel with placeholder text', async ({ page }) => {
    const selectsPanel = page.locator('[ba-panel-title="Selects"]');
    await expect(selectsPanel).toBeAttached();

    const placeholders = selectsPanel.locator('.ui-select-placeholder, .select2-chosen');
    const count = await placeholders.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Standard Select placeholder
    await expect(selectsPanel.locator('text=Standard Select').first()).toBeAttached();
  });

  // ── Datepicker panel ─────────────────────────────────────
  test('should render Datepicker panel with inline and popup pickers', async ({ page }) => {
    await expect(page.locator('h4', { hasText: 'Inline' })).toBeAttached();
    await expect(page.locator('h4', { hasText: 'Popup' })).toBeAttached();

    // Inline datepicker table
    const datepickerTable = page.locator('.uib-datepicker-wrap table');
    await expect(datepickerTable).toBeAttached();

    // Popup datepicker input
    const popupInput = page.locator('input[uib-datepicker-popup]');
    await expect(popupInput).toBeAttached();

    // Calendar open button
    const calendarBtn = page.locator('button .glyphicon-calendar');
    await expect(calendarBtn).toBeAttached();

    // Format select
    const formatSelect = page.locator('select[ng-model="format"]');
    await expect(formatSelect).toBeAttached();
  });

  // ── Panel headings ───────────────────────────────────────
  test('should display all panel headings for inputs page', async ({ page }) => {
    const expectedHeadings = [
      'Standard Fields',
      'Tags Input',
      'Input Groups',
      'Checkboxes & Radios',
      'On/Off Switches',
      'Old On/Off Switches (Deprecated)',
      'Datepicker',
      'Validation States',
      'Selects',
      'Old selects(deprecated)',
    ];

    for (const heading of expectedHeadings) {
      await expect(page.locator(`h3`, { hasText: heading }).first()).toBeAttached();
    }
  });
});

// ────────────────────────────────────────────────────────────
// Form Layouts page  (#/form/layouts)
// ────────────────────────────────────────────────────────────
test.describe('Form Layouts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/form/layouts');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  test('should navigate to the Form Layouts page', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/form\/layouts/);
    await expect(page.locator('h1', { hasText: 'Form Layouts' })).toBeVisible();
  });

  test('should display all layout panel headings', async ({ page }) => {
    const expectedHeadings = [
      'Inline Form',
      'Basic Form',
      'Horizontal Form',
      'Form Without Labels',
      'Block Form',
    ];

    for (const heading of expectedHeadings) {
      await expect(page.locator('h3', { hasText: heading }).first()).toBeAttached();
    }
  });

  // ── Inline Form ──────────────────────────────────────────
  test('should render Inline Form with name, email, checkbox, and button', async ({ page }) => {
    await expect(page.locator('#exampleInputName2')).toBeAttached();
    await expect(page.locator('#exampleInputName2')).toHaveAttribute('placeholder', 'Name');

    await expect(page.locator('#exampleInputEmail2')).toBeAttached();
    await expect(page.locator('#exampleInputEmail2')).toHaveAttribute('type', 'email');

    const rememberMe = page.locator('.form-inline .custom-checkbox span', { hasText: 'Remember me' });
    await expect(rememberMe).toBeAttached();

    const sendBtn = page.locator('button', { hasText: 'Send invitation' });
    await expect(sendBtn).toBeAttached();
  });

  // ── Basic Form ───────────────────────────────────────────
  test('should render Basic Form with email, password, checkbox, and submit', async ({ page }) => {
    const basicPanel = page.locator('[ba-panel-title="Basic Form"]');

    const emailInput = basicPanel.locator('input[type="email"]');
    await expect(emailInput).toBeAttached();

    const passwordInput = basicPanel.locator('input[type="password"]');
    await expect(passwordInput).toBeAttached();

    const checkMeOut = basicPanel.locator('.custom-checkbox span', { hasText: 'Check me out' });
    await expect(checkMeOut).toBeAttached();

    const submitBtn = basicPanel.locator('button', { hasText: 'Submit' });
    await expect(submitBtn).toBeAttached();
    await expect(submitBtn).toHaveClass(/btn-danger/);
  });

  // ── Horizontal Form ──────────────────────────────────────
  test('should render Horizontal Form with labeled fields', async ({ page }) => {
    await expect(page.locator('#inputEmail3')).toBeAttached();
    await expect(page.locator('#inputEmail3')).toHaveAttribute('type', 'email');

    await expect(page.locator('#inputPassword3')).toBeAttached();
    await expect(page.locator('#inputPassword3')).toHaveAttribute('type', 'password');

    const signInBtn = page.locator('button', { hasText: 'Sign in' });
    await expect(signInBtn).toBeAttached();
    await expect(signInBtn).toHaveClass(/btn-warning/);
  });

  // ── Form Without Labels ──────────────────────────────────
  test('should render Form Without Labels with placeholder-only fields', async ({ page }) => {
    const panel = page.locator('[ba-panel-title="Form Without Labels"]');

    const recipientsInput = panel.locator('input[placeholder="Recipients"]');
    await expect(recipientsInput).toBeAttached();

    const subjectInput = panel.locator('input[placeholder="Subject"]');
    await expect(subjectInput).toBeAttached();

    const messageArea = panel.locator('textarea[placeholder="Message"]');
    await expect(messageArea).toBeAttached();

    const sendBtn = panel.locator('button', { hasText: 'Send' });
    await expect(sendBtn).toBeAttached();
    await expect(sendBtn).toHaveClass(/btn-success/);
  });

  // ── Block Form ───────────────────────────────────────────
  test('should render Block Form with first name, last name, email, and website', async ({ page }) => {
    await expect(page.locator('#inputFirstName')).toBeAttached();
    await expect(page.locator('#inputFirstName')).toHaveAttribute('placeholder', 'First Name');

    await expect(page.locator('#inputLastName')).toBeAttached();
    await expect(page.locator('#inputLastName')).toHaveAttribute('placeholder', 'Last Name');

    await expect(page.locator('#inputEmail')).toBeAttached();
    await expect(page.locator('#inputEmail')).toHaveAttribute('type', 'email');

    await expect(page.locator('#inputWebsite')).toBeAttached();
    await expect(page.locator('#inputWebsite')).toHaveAttribute('placeholder', 'Website');

    const submitBtn = page.locator('[ba-panel-title="Block Form"] button', { hasText: 'Submit' });
    await expect(submitBtn).toBeAttached();
    await expect(submitBtn).toHaveClass(/btn-primary/);
  });
});

// ────────────────────────────────────────────────────────────
// Form Wizard page  (#/form/wizard)
// ────────────────────────────────────────────────────────────
test.describe('Form Wizard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/form/wizard');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  test('should navigate to the Form Wizard page', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/form\/wizard/);
    await expect(page.locator('h1', { hasText: 'Form Wizard' })).toBeVisible();
  });

  test('should display wizard step tabs', async ({ page }) => {
    const stepTitles = ['Personal info', 'Product Info', 'Shipment', 'Finish'];
    for (const title of stepTitles) {
      await expect(page.locator('text=' + title).first()).toBeAttached();
    }
  });

  // ── Step 1: Personal Info ────────────────────────────────
  test('should render Personal Info step with username, email, and password fields', async ({ page }) => {
    await expect(page.locator('#exampleUsername1')).toBeAttached();
    await expect(page.locator('#exampleUsername1')).toHaveAttribute('placeholder', 'Username');

    await expect(page.locator('#exampleInputEmail1')).toBeAttached();
    await expect(page.locator('#exampleInputEmail1')).toHaveAttribute('type', 'email');

    await expect(page.locator('#exampleInputPassword1')).toBeAttached();
    await expect(page.locator('#exampleInputPassword1')).toHaveAttribute('type', 'password');

    await expect(page.locator('#exampleInputConfirmPassword1')).toBeAttached();
    await expect(page.locator('#exampleInputConfirmPassword1')).toHaveAttribute('placeholder', 'Confirm Password');
  });

  // ── Step navigation ──────────────────────────────────────
  test('should navigate through wizard steps', async ({ page }) => {
    // Step 1 should be active on load
    const nextBtn = page.locator('button', { hasText: 'Next' });

    // Fill required fields to navigate
    await page.locator('#exampleUsername1').fill('testuser');
    await page.locator('#exampleInputEmail1').fill('test@test.com');
    await page.locator('#exampleInputPassword1').fill('password123');
    await page.locator('#exampleInputConfirmPassword1').fill('password123');
    await nextBtn.click();

    // Step 2: Product Info
    await expect(page.locator('#productName')).toBeAttached();
    await expect(page.locator('#productId')).toBeAttached();

    await page.locator('#productName').fill('TestProduct');
    await page.locator('#productId').fill('PROD-001');
    await nextBtn.click();

    // Step 3: Shipment
    await expect(page.locator('#address')).toBeAttached();
    await expect(page.locator('#address')).toHaveAttribute('placeholder', 'Shipment address');

    // Save shipment info checkbox
    const saveCheckbox = page.locator('span', { hasText: 'Save shipment info' });
    await expect(saveCheckbox).toBeAttached();

    await page.locator('#address').fill('123 Test St');
    await nextBtn.click();

    // Step 4: Finish
    await expect(page.locator('text=Congratulations')).toBeVisible();
  });
});
