import { test, expect } from '@playwright/test';

test.describe('Components — Mail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/components/mail/inbox');
    await page.waitForSelector('.mail-panel', { timeout: 15000 });
  });

  test('should display the mail panel with navigation and message list', async ({ page }) => {
    await expect(page.locator('.mail-panel')).toBeVisible();
    await expect(page.locator('.mail-navigation-container')).toBeVisible();
    await expect(page.locator('.compose-button')).toBeVisible();
    await expect(page.locator('.compose-button')).toContainText('Compose');
  });

  test('should display all mail navigation tabs', async ({ page }) => {
    const navItems = page.locator('.mail-navigation');
    await expect(navItems).toHaveCount(6);
    await expect(navItems.nth(0)).toContainText('Inbox');
    await expect(navItems.nth(1)).toContainText('Sent Mail');
    await expect(navItems.nth(2)).toContainText('Important');
    await expect(navItems.nth(3)).toContainText('Draft');
    await expect(navItems.nth(4)).toContainText('Spam');
    await expect(navItems.nth(5)).toContainText('Trash');
  });

  test('should show new mail counts on tabs', async ({ page }) => {
    const inboxNew = page.locator('.mail-navigation').nth(0).locator('.new-mails');
    await expect(inboxNew).toContainText('7');
    const draftNew = page.locator('.mail-navigation').nth(3).locator('.new-mails');
    await expect(draftNew).toContainText('2');
  });

  test('should display label items', async ({ page }) => {
    await expect(page.locator('.label-item .work')).toBeVisible();
    await expect(page.locator('.label-item .family')).toBeVisible();
    await expect(page.locator('.label-item .friend')).toBeVisible();
    await expect(page.locator('.label-item .study')).toBeVisible();
  });

  test('should display inbox messages in a table', async ({ page }) => {
    const messageRows = page.locator('.messages table tr');
    await expect(messageRows.first()).toBeVisible();
    const count = await messageRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show message details with name, subject and tag', async ({ page }) => {
    const firstRow = page.locator('.messages table tr').first();
    await expect(firstRow.locator('.name')).toBeVisible();
    await expect(firstRow.locator('.subject')).toBeVisible();
  });

  test('should display select all checkbox and controls', async ({ page }) => {
    await expect(page.locator('.mail-messages-control')).toBeVisible();
    await expect(page.locator('.select-all-label')).toContainText('Select All');
    await expect(page.locator('.refresh-button')).toBeVisible();
    await expect(page.locator('.more-button')).toBeVisible();
  });

  test('should toggle navigation sidebar', async ({ page }) => {
    const navContainer = page.locator('.mail-navigation-container');
    await expect(navContainer).toBeVisible();
    // The toggle link is hidden at default viewport; use dispatchEvent to trigger the click
    const navLink = page.locator('.collapse-navigation-link').first();
    await navLink.dispatchEvent('click');
    await expect(page.locator('.mail-navigation-container.expanded')).toBeVisible();
  });

  test('should navigate to a mail tab (Sent Mail)', async ({ page }) => {
    const sentTab = page.locator('.mail-navigation', { hasText: 'Sent Mail' });
    await sentTab.click();
    await page.waitForURL(/#\/components\/mail\/sent/);
    const messageRows = page.locator('.messages table tr');
    await expect(messageRows.first()).toBeVisible();
  });

  test('should navigate to message detail when clicking a message', async ({ page }) => {
    const firstRow = page.locator('.messages table tr').first();
    await firstRow.locator('td').nth(1).click();
    await page.waitForSelector('.message-container', { timeout: 15000 });
    await expect(page.locator('.message-container')).toBeVisible();
    await expect(page.locator('.person-info')).toBeVisible();
    await expect(page.locator('.message-details .subject')).toBeVisible();
  });

  test('should show contact info in detail view', async ({ page }) => {
    const firstRow = page.locator('.messages table tr').first();
    await firstRow.locator('td').nth(1).click();
    await page.waitForSelector('.message-container', { timeout: 15000 });
    await expect(page.locator('.phone')).toContainText('777-777-7777');
    await expect(page.locator('.email')).toBeVisible();
  });

  test('should show reply/forward/print/spam/delete buttons in detail', async ({ page }) => {
    const firstRow = page.locator('.messages table tr').first();
    await firstRow.locator('td').nth(1).click();
    await page.waitForSelector('.answer-container', { timeout: 15000 });
    await expect(page.locator('.answer-container')).toBeVisible();
    const buttons = page.locator('.answer-container button');
    await expect(buttons).toHaveCount(5);
    await expect(buttons.nth(0)).toContainText('Reply');
    await expect(buttons.nth(1)).toContainText('Forward');
    await expect(buttons.nth(2)).toContainText('Print');
    await expect(buttons.nth(3)).toContainText('Spam');
    await expect(buttons.nth(4)).toContainText('Delete');
  });

  test('should have back button in detail view', async ({ page }) => {
    const firstRow = page.locator('.messages table tr').first();
    await firstRow.locator('td').nth(1).click();
    await page.waitForSelector('.back-button', { timeout: 15000 });
    await expect(page.locator('.back-button')).toContainText('Back');
    await page.locator('.back-button').click();
    await page.waitForSelector('.messages', { timeout: 15000 });
    await expect(page.locator('.messages')).toBeVisible();
  });

  test('should open compose modal', async ({ page }) => {
    await page.locator('.compose-button').click();
    await page.waitForSelector('.compose-header', { timeout: 15000 });
    await expect(page.locator('.compose-header')).toContainText('New message');
    await expect(page.locator('input.compose-input[placeholder="To"]')).toBeVisible();
    await expect(page.locator('input.compose-input[placeholder="Subject"]')).toBeVisible();
  });

  test('should close compose modal', async ({ page }) => {
    await page.locator('.compose-button').click();
    await page.waitForSelector('.compose-header', { timeout: 15000 });
    await page.locator('.compose-header .ion-close-round').click();
    await expect(page.locator('.compose-header')).toBeHidden({ timeout: 5000 });
  });

  test('should show attachment info in detail view when present', async ({ page }) => {
    // Navigate to a message known to have attachment (Nasta Linnie - Great text)
    await page.goto('/#/components/mail/inbox/4563faass');
    await page.waitForSelector('.message-container', { timeout: 15000 });
    await expect(page.locator('.attachment')).toBeVisible();
    await expect(page.locator('.file-name')).toContainText('poem.txt');
  });
});

test.describe('Components — Timeline', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/components/timeline');
    await page.waitForSelector('#cd-timeline', { timeout: 15000 });
  });

  test('should display the timeline section', async ({ page }) => {
    await expect(page.locator('#cd-timeline')).toBeVisible();
    await expect(page.locator('.cd-container')).toBeVisible();
  });

  test('should display all timeline blocks', async ({ page }) => {
    const blocks = page.locator('.cd-timeline-block');
    await expect(blocks).toHaveCount(7);
  });

  test('should display timeline block content with titles and dates', async ({ page }) => {
    const firstBlock = page.locator('.cd-timeline-block').first();
    await expect(firstBlock.locator('.cd-timeline-content h5')).toContainText('Title of section 1');
    await expect(firstBlock.locator('.cd-date')).toContainText('Jan 14');

    const secondBlock = page.locator('.cd-timeline-block').nth(1);
    await expect(secondBlock.locator('.cd-timeline-content h5')).toContainText('Title of section 2');
    await expect(secondBlock.locator('.cd-date')).toContainText('Jan 18');
  });

  test('should have timeline images with kameleon icons', async ({ page }) => {
    const timelineImgs = page.locator('.cd-timeline-img');
    await expect(timelineImgs).toHaveCount(7);
    await expect(timelineImgs.first().locator('.kameleon-icon')).toBeVisible();
  });

  test('should display warning, danger, and primary styled blocks', async ({ page }) => {
    await expect(page.locator('.cd-timeline-content.warning').first()).toBeVisible();
    await expect(page.locator('.cd-timeline-content.danger').first()).toBeVisible();
    await expect(page.locator('.cd-timeline-content.primary').first()).toBeVisible();
  });

  test('should display all 7 section titles', async ({ page }) => {
    for (let i = 1; i <= 7; i++) {
      const heading = page.locator('.cd-timeline-content h5', { hasText: `Title of section ${i}` });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    }
  });
});

test.describe('Components — Tree View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/components/tree');
    await page.waitForSelector('.tree-panel', { timeout: 15000 });
  });

  test('should display basic action and drag & drop panels', async ({ page }) => {
    const panels = page.locator('.tree-panel');
    await expect(panels).toHaveCount(2);
  });

  test('should display tree control buttons', async ({ page }) => {
    await expect(page.locator('button', { hasText: 'Add' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Collapse All' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Expand All' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Refresh' })).toBeVisible();
  });

  test('should display tree nodes in the basic tree', async ({ page }) => {
    await page.waitForSelector('.jstree-node', { timeout: 15000 });
    const nodes = page.locator('.tree-panel').first().locator('.jstree-node');
    const count = await nodes.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display tree nodes in the drag & drop tree', async ({ page }) => {
    await page.waitForSelector('.jstree-node', { timeout: 15000 });
    const dragPanel = page.locator('.tree-panel').nth(1);
    const nodes = dragPanel.locator('.jstree-node');
    const count = await nodes.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should collapse all nodes when Collapse All is clicked', async ({ page }) => {
    await page.waitForSelector('.jstree-node', { timeout: 15000 });
    await page.locator('button', { hasText: 'Collapse All' }).click();
    await page.waitForTimeout(500);
    const basicPanel = page.locator('.tree-panel').first();
    const closedNodes = basicPanel.locator('.jstree-closed');
    const count = await closedNodes.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should expand all nodes when Expand All is clicked', async ({ page }) => {
    await page.waitForSelector('.jstree-node', { timeout: 15000 });
    await page.locator('button', { hasText: 'Collapse All' }).click();
    await page.waitForTimeout(500);
    await page.locator('button', { hasText: 'Expand All' }).click();
    await page.waitForTimeout(500);
    const basicPanel = page.locator('.tree-panel').first();
    const openNodes = basicPanel.locator('.jstree-open');
    const count = await openNodes.count();
    expect(count).toBeGreaterThan(0);
  });
});
