import { test, expect, Page } from '@playwright/test';

async function navigateAndWait(page: Page, hash: string) {
  await page.goto('/#' + hash);
  // Wait for main element (indicates $pageFinishedLoading is true)
  await page.waitForSelector('main', { timeout: 30000 });
  // Wait for panel animations to complete (full-invisible removal)
  await page.waitForTimeout(3000);
}

test.describe('UI Features - Typography', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page, '/ui/typography');
  });

  test('should display typography page with headings', async ({ page }) => {
    await expect(page.locator('h1', { hasText: 'H1. Heading 1' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'H2. Heading 2' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'H3. Heading 3' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'H4. Heading 4' })).toBeVisible();
    await expect(page.locator('h5', { hasText: 'H5. Heading 5' })).toBeVisible();
  });

  test('should display text style sections', async ({ page }) => {
    await expect(page.locator('.light-text').first()).toBeVisible();
    await expect(page.locator('.regular-text').first()).toBeVisible();
    await expect(page.locator('.bold-text').first()).toBeVisible();
    await expect(page.locator('.small-text').first()).toBeVisible();
  });

  test('should display lists section', async ({ page }) => {
    await expect(page.locator('h5', { hasText: 'Unordered list:' })).toBeVisible();
    await expect(page.locator('h5', { hasText: 'Ordered Lists:' })).toBeVisible();
    await expect(page.locator('ul.blur')).toBeVisible();
    await expect(page.locator('ol.blur')).toBeVisible();
  });
});

test.describe('UI Features - Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page, '/ui/buttons');
  });

  test('should display flat buttons', async ({ page }) => {
    await expect(page.locator('.btn.btn-default', { hasText: 'Default' }).first()).toBeVisible();
    await expect(page.locator('.btn.btn-primary', { hasText: 'Primary' }).first()).toBeVisible();
    await expect(page.locator('.btn.btn-success', { hasText: 'Success' }).first()).toBeVisible();
    await expect(page.locator('.btn.btn-info', { hasText: 'Info' }).first()).toBeVisible();
    await expect(page.locator('.btn.btn-warning', { hasText: 'Warning' }).first()).toBeVisible();
    await expect(page.locator('.btn.btn-danger', { hasText: 'Danger' }).first()).toBeVisible();
  });

  test('should display raised buttons', async ({ page }) => {
    await expect(page.locator('.btn.btn-raised').first()).toBeVisible();
  });

  test('should display disabled buttons', async ({ page }) => {
    const disabledBtn = page.locator('button.btn[disabled]').first();
    await expect(disabledBtn).toBeVisible();
    await expect(disabledBtn).toBeDisabled();
  });

  test('should display different size buttons', async ({ page }) => {
    await expect(page.locator('.btn.btn-xs').first()).toBeVisible();
    await expect(page.locator('.btn.btn-sm').first()).toBeVisible();
    await expect(page.locator('.btn.btn-lg').first()).toBeVisible();
  });
});

test.describe('UI Features - Icons', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page, '/ui/icons');
  });

  test('should display kameleon icons section', async ({ page }) => {
    await expect(page.locator('.kameleon-icon').first()).toBeVisible();
  });

  test('should display icons with rounded background', async ({ page }) => {
    await expect(page.locator('.with-round-bg').first()).toBeVisible();
  });
});

test.describe('UI Features - Modals', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page, '/ui/modals');
  });

  test('should display modal buttons', async ({ page }) => {
    await expect(page.locator('button', { hasText: 'Default modal' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Large modal' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Small modal' })).toBeVisible();
  });

  test('should display message modal buttons', async ({ page }) => {
    await expect(page.locator('button', { hasText: 'Success Message' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Info Message' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Warning Message' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Danger Message' })).toBeVisible();
  });

  test('should open and close default modal', async ({ page }) => {
    await page.locator('button', { hasText: 'Default modal' }).click();
    await expect(page.locator('.modal-dialog')).toBeVisible();
    await expect(page.locator('.modal-title', { hasText: 'Modal title' })).toBeVisible();
    await expect(page.locator('.modal-body')).toBeVisible();
    await page.locator('.modal-footer .btn-primary').click();
    await expect(page.locator('.modal-dialog')).not.toBeVisible();
  });

  test('should display notification buttons', async ({ page }) => {
    await expect(page.locator('button', { hasText: 'Success Notification' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Info Notification' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Warning Notification' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Danger Notification' })).toBeVisible();
  });

  test('should display progress dialog button', async ({ page }) => {
    await expect(page.locator('button', { hasText: 'Progress dialog' })).toBeVisible();
  });
});

test.describe('UI Features - Grid', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page, '/ui/grid');
  });

  test('should display grid layout with columns', async ({ page }) => {
    await expect(page.locator('.col-md-1').first()).toBeVisible();
  });
});

test.describe('UI Features - Alerts', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page, '/ui/alerts');
  });

  test('should display basic alerts', async ({ page }) => {
    await expect(page.locator('.alert.bg-success').first()).toBeVisible();
    await expect(page.locator('.alert.bg-info').first()).toBeVisible();
    await expect(page.locator('.alert.bg-warning').first()).toBeVisible();
    await expect(page.locator('.alert.bg-danger').first()).toBeVisible();
  });

  test('should display dismissible alerts with close buttons', async ({ page }) => {
    await expect(page.locator('.alert.closeable').first()).toBeVisible();
    await expect(page.locator('.alert.closeable .close').first()).toBeVisible();
  });

  test('should display alerts with links', async ({ page }) => {
    await expect(page.locator('.alert-link').first()).toBeVisible();
  });

  test('should display composite alerts', async ({ page }) => {
    await expect(page.locator('.control-alert').first()).toBeVisible();
    await expect(page.locator('.control-alert .btn-danger', { hasText: 'Pay Attention' })).toBeVisible();
    await expect(page.locator('.control-alert .btn-primary', { hasText: 'Ignore' })).toBeVisible();
  });
});

test.describe('UI Features - Progress Bars', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page, '/ui/progressBars');
  });

  test('should display basic progress bars', async ({ page }) => {
    await expect(page.locator('.progress-bar-success').first()).toBeVisible();
    await expect(page.locator('.progress-bar-info').first()).toBeVisible();
    await expect(page.locator('.progress-bar-warning').first()).toBeVisible();
    await expect(page.locator('.progress-bar-danger').first()).toBeVisible();
  });

  test('should display striped progress bars', async ({ page }) => {
    await expect(page.locator('.progress-bar-striped').first()).toBeVisible();
  });

  test('should display progress bars with labels', async ({ page }) => {
    await expect(page.locator('.progress-bar', { hasText: '%' }).first()).toBeVisible();
  });
});

test.describe('UI Features - Notifications', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page, '/ui/notifications');
  });

  test('should display notification form controls', async ({ page }) => {
    await expect(page.locator('#title')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
  });

  test('should display toast type radio buttons', async ({ page }) => {
    await expect(page.locator('#toastTypeGroup')).toBeVisible();
    await expect(page.locator('label.custom-radio', { hasText: 'Success' }).first()).toBeVisible();
    await expect(page.locator('label.custom-radio', { hasText: 'Info' }).first()).toBeVisible();
    await expect(page.locator('label.custom-radio', { hasText: 'Warning' }).first()).toBeVisible();
    await expect(page.locator('label.custom-radio', { hasText: 'Error' }).first()).toBeVisible();
  });

  test('should display position radio buttons', async ({ page }) => {
    await expect(page.locator('#positionGroup')).toBeVisible();
    await expect(page.locator('label.custom-radio', { hasText: 'Top Right' })).toBeVisible();
    await expect(page.locator('label.custom-radio', { hasText: 'Top Full Width' })).toBeVisible();
    await expect(page.locator('label.custom-radio', { hasText: 'Bottom Full Width' })).toBeVisible();
  });

  test('should display checkbox options', async ({ page }) => {
    await expect(page.locator('label.custom-checkbox', { hasText: 'Close Button' })).toBeVisible();
    await expect(page.locator('label.custom-checkbox', { hasText: 'Progress bar' })).toBeVisible();
    await expect(page.locator('label.custom-checkbox', { hasText: 'Newest on top' })).toBeVisible();
  });

  test('should display action buttons', async ({ page }) => {
    await expect(page.locator('button', { hasText: 'Open Toast' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Random Toast' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Clear Toasts' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Clear Last Toast' })).toBeVisible();
  });

  test('should display timeout inputs', async ({ page }) => {
    await expect(page.locator('#timeOut')).toBeVisible();
    await expect(page.locator('#extendedTimeOut')).toBeVisible();
    await expect(page.locator('#maxOpened')).toBeVisible();
  });

  test('should display result area', async ({ page }) => {
    await expect(page.locator('#toastrOptions')).toBeVisible();
  });
});

test.describe('UI Features - Tabs', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page, '/ui/tabs');
  });

  test('should display tab navigation', async ({ page }) => {
    await expect(page.locator('.nav-tabs').first()).toBeVisible();
  });

  test('should display tab content', async ({ page }) => {
    await expect(page.locator('.tab-content').first()).toBeVisible();
  });
});

test.describe('UI Features - Slider', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page, '/ui/slider');
  });

  test('should display slider boxes with labels', async ({ page }) => {
    await expect(page.locator('.slider-box h5', { hasText: 'Basic' })).toBeVisible();
    await expect(page.locator('.slider-box h5', { hasText: 'With prefix' })).toBeVisible();
    await expect(page.locator('.slider-box h5', { hasText: 'With postfix' })).toBeVisible();
    await expect(page.locator('.slider-box h5', { hasText: 'Two way range' })).toBeVisible();
    await expect(page.locator('.slider-box h5', { hasText: 'Disabled' })).toBeVisible();
  });
});

test.describe('UI Features - Panels', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page, '/ui/panels');
  });

  test('should display default panels section', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Default panels' })).toBeVisible();
  });

  test('should display bootstrap panels section', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Bootstrap panels' })).toBeVisible();
    await expect(page.locator('.panel.panel-default').first()).toBeVisible();
    await expect(page.locator('.panel-body').first()).toBeVisible();
  });

  test('should display panels with contextual classes', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Panels with Contextual Classes' })).toBeVisible();
  });

  test('should display panel with heading', async ({ page }) => {
    await expect(page.locator('.panel-heading', { hasText: 'Panel Heading' })).toBeVisible();
  });

  test('should display panel with footer', async ({ page }) => {
    await expect(page.locator('.panel-footer', { hasText: 'Panel Footer' })).toBeVisible();
  });
});
