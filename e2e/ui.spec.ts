import { test, expect } from '@playwright/test';

test.describe('Typography Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/ui/typography');
    await page.waitForSelector('.typography-document-samples', { state: 'attached', timeout: 15000 });
  });

  test('should navigate to the typography route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/ui\/typography/);
  });

  test('should display the Text Size panel with headings H1–H5', async ({ page }) => {
    const panel = page.locator('.heading-widget');
    await expect(panel).toBeAttached();
    await expect(panel.locator('h1')).toContainText('H1. Heading 1');
    await expect(panel.locator('h2')).toContainText('H2. Heading 2');
    await expect(panel.locator('h3').filter({ hasText: 'H3. Heading 3' })).toContainText('H3. Heading 3');
    await expect(panel.locator('h4')).toContainText('H4. Heading 4');
    await expect(panel.locator('h5')).toContainText('H5. Heading 5');
  });

  test('should display the Some more text panel with various text styles', async ({ page }) => {
    const panel = page.locator('.more-text-widget');
    await expect(panel).toBeAttached();
    await expect(panel.locator('.light-text')).toBeAttached();
    await expect(panel.locator('.regular-text')).toBeAttached();
    await expect(panel.locator('.upper-text.bold-text')).toBeAttached();
    await expect(panel.locator('.small-text')).toBeAttached();
  });

  test('should display the Lists panel with unordered and ordered lists', async ({ page }) => {
    const panel = page.locator('.lists-widget');
    await expect(panel).toBeAttached();
    await expect(panel.locator('h5', { hasText: 'Unordered list:' })).toBeAttached();
    await expect(panel.locator('ul.blur li').first()).toContainText('Lorem ipsum dolor sit amet');
    await expect(panel.locator('h5', { hasText: 'Ordered Lists:' })).toBeAttached();
    await expect(panel.locator('ol.blur li').first()).toContainText('Eu non nec cursus quis mollis');
  });

  test('should display the Text Color panel with colored sections and links', async ({ page }) => {
    const panel = page.locator('.color-widget');
    await expect(panel).toBeAttached();
    await expect(panel.locator('.red-text')).toBeAttached();
    await expect(panel.locator('.yellow-text')).toBeAttached();
    await expect(panel.locator('.links').first()).toBeAttached();
  });

  test('should display the banner section with heading', async ({ page }) => {
    const banner = page.locator('.banner');
    await expect(banner).toBeAttached();
    await expect(banner.locator('h1')).toContainText('Simple Banner Text');
  });

  test('should display Columns section with three column headings', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Columns' })).toBeAttached();
    const columnHeadings = page.locator('h4');
    await expect(columnHeadings.filter({ hasText: /^Column heading example$/ })).toBeAttached();
    await expect(columnHeadings.filter({ hasText: /^Yet another column heading example$/ })).toBeAttached();
    await expect(columnHeadings.filter({ hasText: /^Third column heading example$/ })).toBeAttached();
  });
});

test.describe('Buttons Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/ui/buttons');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  test('should navigate to the buttons route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/ui\/buttons/);
  });

  test('should display Flat Buttons panel with all variants', async ({ page }) => {
    const flatButtons = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];
    for (const label of flatButtons) {
      const btn = page.locator('.button-panel').first().locator('button', { hasText: label });
      await expect(btn).toBeVisible();
    }
  });

  test('should display Raised Buttons panel with btn-raised class', async ({ page }) => {
    const raisedPanel = page.locator('[ba-panel-title="Raised Buttons"]');
    await expect(raisedPanel).toBeVisible();
    const raisedButtons = raisedPanel.locator('button.btn-raised');
    await expect(raisedButtons).toHaveCount(6);
  });

  test('should display Different sizes panel with varying button sizes', async ({ page }) => {
    const sizePanel = page.locator('[ba-panel-title="Different sizes"]');
    await expect(sizePanel).toBeVisible();
    await expect(sizePanel.locator('button.btn-xs')).toHaveCount(1);
    await expect(sizePanel.locator('button.btn-sm')).toHaveCount(1);
    await expect(sizePanel.locator('button.btn-lg')).toHaveCount(1);
  });

  test('should display Disabled buttons panel with disabled attribute', async ({ page }) => {
    const disabledPanel = page.locator('[ba-panel-title="Disabled"]');
    await expect(disabledPanel).toBeVisible();
    const disabledButtons = disabledPanel.locator('button[disabled]');
    await expect(disabledButtons).toHaveCount(6);
  });

  test('should display Icon Buttons panel', async ({ page }) => {
    const panel = page.locator('[ba-panel-title="Icon Buttons"]');
    await expect(panel).toBeVisible();
  });

  test('should display Large Buttons panel', async ({ page }) => {
    const panel = page.locator('[ba-panel-title="Large Buttons"]');
    await expect(panel).toBeVisible();
  });

  test('should display Button Dropdowns panel', async ({ page }) => {
    const panel = page.locator('[ba-panel-title="Button Dropdowns"]');
    await expect(panel).toBeVisible();
  });

  test('should display Button Groups panel', async ({ page }) => {
    const panel = page.locator('[ba-panel-title="Button Groups"]');
    await expect(panel).toBeVisible();
  });

  test('should display Progress Buttons panel', async ({ page }) => {
    const panel = page.locator('[ba-panel-title="Progress Buttons"]');
    await expect(panel).toBeVisible();
  });
});

test.describe('Icons Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/ui/icons');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  test('should navigate to the icons route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/ui\/icons/);
  });

  test('should display Kameleon SVG Icons panel', async ({ page }) => {
    const panel = page.locator('[ba-panel-title="Kameleon SVG Icons"]');
    await expect(panel).toBeVisible();
  });

  test('should display Icons With Rounded Background panel', async ({ page }) => {
    const panel = page.locator('[ba-panel-title="Icons With Rounded Background"]');
    await expect(panel).toBeVisible();
  });

  test('should display Socicon panel', async ({ page }) => {
    const panel = page.locator('[ba-panel-title="Socicon"]');
    await expect(panel).toBeVisible();
  });

  test('should display ionicons panel', async ({ page }) => {
    const panel = page.locator('[ba-panel-title="ionicons"]');
    await expect(panel).toBeVisible();
  });

  test('should display Font Awesome Icons panel', async ({ page }) => {
    const panel = page.locator('[ba-panel-title="Font Awesome Icons"]');
    await expect(panel).toBeVisible();
  });
});

test.describe('Modals Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/ui/modals');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  test('should navigate to the modals route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/ui\/modals/);
  });

  test('should display Default modal, Large modal, and Small modal buttons', async ({ page }) => {
    await expect(page.locator('button', { hasText: 'Default modal' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Large modal' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Small modal' })).toBeVisible();
  });

  test('should open a modal dialog when clicking Default modal button', async ({ page }) => {
    await page.locator('button', { hasText: 'Default modal' }).click();
    const dialog = page.locator('.modal-dialog');
    await expect(dialog).toBeVisible({ timeout: 5000 });
  });

  test('should display Message Modals panel with four buttons', async ({ page }) => {
    await expect(page.locator('button', { hasText: 'Success Message' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Info Message' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Warning Message' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Danger Message' })).toBeVisible();
  });

  test('should display Progress dialog button', async ({ page }) => {
    await expect(page.locator('button', { hasText: 'Progress dialog' })).toBeVisible();
  });
});

test.describe('Grid Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/ui/grid');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  test('should navigate to the grid route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/ui\/grid/);
  });

  test('should display grid section headings', async ({ page }) => {
    await expect(page.locator('h4', { hasText: 'Stacked to horizontal' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Mobile and desktop' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Mobile, tablet, desktop' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Column wrapping' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Offsetting columns' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Grid options' })).toBeVisible();
  });

  test('should display 12 col-md-1 columns in stacked to horizontal row', async ({ page }) => {
    const firstRow = page.locator('.show-grid').first();
    const cols = firstRow.locator('.col-md-1');
    await expect(cols).toHaveCount(12);
  });

  test('should display the Grid options table', async ({ page }) => {
    const table = page.locator('table.table-bordered');
    await expect(table).toBeAttached();
  });
});

test.describe('Alerts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/ui/alerts');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  test('should navigate to the alerts route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/ui\/alerts/);
  });

  test('should display Basic alerts panel with four alert types', async ({ page }) => {
    const basicPanel = page.locator('[ba-panel-title="Basic"]');
    await expect(basicPanel).toBeVisible();
    await expect(basicPanel.locator('.alert.bg-success')).toBeVisible();
    await expect(basicPanel.locator('.alert.bg-info')).toBeVisible();
    await expect(basicPanel.locator('.alert.bg-warning')).toBeVisible();
    await expect(basicPanel.locator('.alert.bg-danger')).toBeVisible();
  });

  test('should display Dismissible alerts panel with close buttons', async ({ page }) => {
    const dismissPanel = page.locator('[ba-panel-title="Dismissible alerts"]');
    await expect(dismissPanel).toBeVisible();
    const closeButtons = dismissPanel.locator('button.close');
    await expect(closeButtons).toHaveCount(4);
  });

  test('should display Links in alerts panel with alert-link class', async ({ page }) => {
    const linkPanel = page.locator('[ba-panel-title="Links in alerts"]');
    await expect(linkPanel).toBeVisible();
    const links = linkPanel.locator('a.alert-link');
    await expect(links).toHaveCount(4);
  });

  test('should display Composite alerts panel with Pay Attention and Ignore buttons', async ({ page }) => {
    const compositePanel = page.locator('[ba-panel-title="Composite alerts"]');
    await expect(compositePanel).toBeVisible();
    await expect(compositePanel.locator('button', { hasText: 'Pay Attention' })).toBeVisible();
    await expect(compositePanel.locator('button', { hasText: 'Ignore' })).toBeVisible();
  });
});

test.describe('Progress Bars Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/ui/progressBars');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  test('should navigate to the progressBars route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/ui\/progressBars/);
  });

  test('should display Basic progress bars with correct aria values', async ({ page }) => {
    const basicPanel = page.locator('[ba-panel-title="Basic"]');
    await expect(basicPanel).toBeVisible();

    const bars = basicPanel.locator('.progress-bar');
    await expect(bars).toHaveCount(4);

    await expect(bars.nth(0)).toHaveAttribute('aria-valuenow', '40');
    await expect(bars.nth(1)).toHaveAttribute('aria-valuenow', '20');
    await expect(bars.nth(2)).toHaveAttribute('aria-valuenow', '60');
    await expect(bars.nth(3)).toHaveAttribute('aria-valuenow', '80');
  });

  test('should display Striped progress bars', async ({ page }) => {
    const stripedPanel = page.locator('[ba-panel-title="Striped"]');
    await expect(stripedPanel).toBeVisible();
    const stripedBars = stripedPanel.locator('.progress-bar-striped');
    await expect(stripedBars).toHaveCount(4);
  });

  test('should display With label progress bars showing text labels', async ({ page }) => {
    const labelPanel = page.locator('[ba-panel-title="With label"]');
    await expect(labelPanel).toBeVisible();

    await expect(labelPanel.locator('.progress-bar').nth(0)).toContainText('40% Complete (success)');
    await expect(labelPanel.locator('.progress-bar').nth(1)).toContainText('20% Complete');
    await expect(labelPanel.locator('.progress-bar').nth(2)).toContainText('60% Complete (warning)');
    await expect(labelPanel.locator('.progress-bar').nth(3)).toContainText('80% Complete (danger)');
  });

  test('should display Animated progress bars with active class', async ({ page }) => {
    const animatedPanel = page.locator('[ba-panel-title="Animated"]');
    await expect(animatedPanel).toBeVisible();
    const activeBars = animatedPanel.locator('.progress-bar.active');
    await expect(activeBars).toHaveCount(4);
  });

  test('should display Stacked progress bar with multiple segments', async ({ page }) => {
    const stackedPanel = page.locator('[ba-panel-title="Stacked"]');
    await expect(stackedPanel).toBeVisible();
    const bars = stackedPanel.locator('.progress-bar');
    await expect(bars).toHaveCount(4);
  });
});

test.describe('Notifications Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/ui/notifications');
    await page.waitForSelector('.notification-panel', { timeout: 15000 });
  });

  test('should navigate to the notifications route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/ui\/notifications/);
  });

  test('should display Title and Message input fields with defaults', async ({ page }) => {
    const titleInput = page.locator('#title');
    await expect(titleInput).toBeVisible();
    await expect(titleInput).toHaveValue('Some title here');

    const messageTextarea = page.locator('#message');
    await expect(messageTextarea).toBeVisible();
    await expect(messageTextarea).toHaveValue('Type your message here');
  });

  test('should display checkbox options', async ({ page }) => {
    const checkboxIds = ['closeButton', 'html', 'progressBar', 'preventDuplicates', 'preventOpenDuplicates', 'tapToDismiss', 'newestOnTop', 'autoDismiss'];
    for (const id of checkboxIds) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test('should display Toast Type radio group', async ({ page }) => {
    const toastTypes = ['success', 'info', 'warning', 'error'];
    for (const val of toastTypes) {
      await expect(page.locator(`input[name="toasts"][value="${val}"]`)).toBeAttached();
    }
  });

  test('should display Position radio group', async ({ page }) => {
    const positions = [
      'toast-top-right', 'toast-bottom-right', 'toast-bottom-left',
      'toast-top-left', 'toast-top-full-width', 'toast-bottom-full-width',
      'toast-top-center', 'toast-bottom-center'
    ];
    for (const pos of positions) {
      await expect(page.locator(`input[name="positions"][value="${pos}"]`)).toBeAttached();
    }
  });

  test('should display Time out and Extended time out inputs', async ({ page }) => {
    await expect(page.locator('#timeOut')).toBeVisible();
    await expect(page.locator('#extendedTimeOut')).toBeVisible();
  });

  test('should display toast action buttons', async ({ page }) => {
    await expect(page.locator('button', { hasText: 'Open Toast' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Random Toast' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Clear Toasts' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Clear Last Toast' })).toBeVisible();
  });
});

test.describe('Tabs & Accordions Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/ui/tabs');
    await page.waitForSelector('.horizontal-tabs', { timeout: 15000 });
  });

  test('should navigate to the tabs route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/ui\/tabs/);
  });

  test('should display horizontal tabs with Start, Getting Done, and Dropdown tab', async ({ page }) => {
    const tabSet = page.locator('.horizontal-tabs');
    await expect(tabSet.locator('a', { hasText: 'Start' })).toBeVisible();
    await expect(tabSet.locator('a', { hasText: 'Getting Done' })).toBeVisible();
    await expect(tabSet.locator('.nav-link', { hasText: 'Dropdown tab' })).toBeVisible();
  });

  test('should switch horizontal tab content on click', async ({ page }) => {
    const tabSet = page.locator('.horizontal-tabs');
    await tabSet.locator('a', { hasText: 'Getting Done' }).click();
    await expect(page.locator('.horizontal-tabs .tab-pane.active')).toContainText("connect the dots looking forward");
  });

  test('should display left-aligned side tabs', async ({ page }) => {
    const leftTabs = page.locator('.tabs-left');
    await expect(leftTabs).toBeVisible();
    await expect(leftTabs.locator('a', { hasText: 'Start' })).toBeVisible();
    await expect(leftTabs.locator('a', { hasText: 'Get it done' })).toBeVisible();
    await expect(leftTabs.locator('a', { hasText: 'Achieve' })).toBeVisible();
  });

  test('should display right-aligned side tabs', async ({ page }) => {
    const rightTabs = page.locator('.tabs-right');
    await expect(rightTabs).toBeVisible();
    await expect(rightTabs.locator('a', { hasText: 'Start' })).toBeVisible();
    await expect(rightTabs.locator('a', { hasText: 'Get it done' })).toBeVisible();
    await expect(rightTabs.locator('a', { hasText: 'Achieve' })).toBeVisible();
  });

  test('should display sample accordion with four panels', async ({ page }) => {
    const accordion = page.locator('.accordions-row .col-md-6').first();
    await expect(accordion.locator('.accordion-panel')).toHaveCount(4);
    await expect(accordion.locator('.panel-heading', { hasText: 'Static Header, initially expanded' })).toBeVisible();
    await expect(accordion.locator('.panel-heading', { hasText: 'Dynamic Body Content' })).toBeVisible();
  });

  test('should display contextual accordion with five panels', async ({ page }) => {
    const accordion = page.locator('.accordions-row .col-md-6').nth(1);
    await expect(accordion.locator('.accordion-panel')).toHaveCount(5);
    const headings = ['Primary', 'Success', 'Info', 'Warning', 'Danger'];
    for (const h of headings) {
      await expect(accordion.locator('.panel-heading', { hasText: h })).toBeAttached();
    }
  });
});

test.describe('Slider Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/ui/slider');
    await page.waitForSelector('.slider-box', { timeout: 15000 });
  });

  test('should navigate to the slider route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/ui\/slider/);
  });

  test('should display eight slider sections', async ({ page }) => {
    const sliderBoxes = page.locator('.slider-box');
    await expect(sliderBoxes).toHaveCount(8);
  });

  test('should display slider headings', async ({ page }) => {
    const headings = ['Basic', 'With prefix', 'With postfix', 'Two way range', 'With Steps', 'Decorating numbers', 'Using custom values array', 'Disabled'];
    for (const h of headings) {
      await expect(page.locator('.slider-box h5', { hasText: h })).toBeAttached();
    }
  });
});

test.describe('Panels Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/ui/panels');
    await page.waitForSelector('h2', { timeout: 15000 });
  });

  test('should navigate to the panels route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/ui\/panels/);
  });

  test('should display Default panels section heading', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Default panels' })).toBeVisible();
  });

  test('should display Bootstrap panels section with Panel Heading and Panel Footer', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Bootstrap panels' })).toBeVisible();
    await expect(page.locator('.panel-heading', { hasText: 'Panel Heading' })).toBeVisible();
    await expect(page.locator('.panel-footer', { hasText: 'Panel Footer' })).toBeVisible();
  });

  test('should display Panels with Contextual Classes section', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Panels with Contextual Classes' })).toBeVisible();
    const contextualClasses = ['panel-default', 'panel-primary', 'panel-success', 'panel-info', 'panel-warning', 'panel-danger'];
    for (const cls of contextualClasses) {
      await expect(page.locator(`.contextual-example-panel.${cls}`)).toBeAttached();
    }
  });

  test('should display Panel Group section with two grouped panels', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Panel Group' })).toBeVisible();
    const panelGroup = page.locator('.panel-group');
    await expect(panelGroup).toBeVisible();
    await expect(panelGroup.locator('.panel-heading', { hasText: 'Panel group 1' })).toBeVisible();
    await expect(panelGroup.locator('.panel-heading', { hasText: 'Panel group 2' })).toBeVisible();
  });
});
