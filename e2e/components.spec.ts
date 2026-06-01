import { test, expect } from '@playwright/test';

test.describe('Components - Timeline', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/components/timeline');
    await page.waitForSelector('#cd-timeline', { timeout: 15000 });
  });

  test('should navigate to the timeline page', async ({ page }) => {
    await expect(page).toHaveURL(/.*#\/components\/timeline/);
  });

  test('should display the page heading', async ({ page }) => {
    const heading = page.locator('content-top h1');
    await expect(heading).toHaveText('Timeline');
  });

  test('should render 7 timeline blocks', async ({ page }) => {
    const blocks = page.locator('.cd-timeline-block');
    await expect(blocks).toHaveCount(7);
  });

  test('should display section headings for all blocks', async ({ page }) => {
    const titles = [
      'Title of section 1',
      'Title of section 2',
      'Title of section 3',
      'Title of section 4',
      'Title of section 5',
      'Title of section 6',
      'Title of section 7',
    ];
    for (const title of titles) {
      const heading = page.locator('.cd-timeline-content h5', { hasText: title });
      await expect(heading).toBeAttached();
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    }
  });

  test('should display dates for timeline blocks', async ({ page }) => {
    const dates = ['Jan 14', 'Jan 18', 'Feb 18', 'Feb 20', 'Feb 21', 'Feb 23', 'Feb 24'];
    for (const date of dates) {
      const dateEl = page.locator('.cd-date', { hasText: date });
      await expect(dateEl).toBeAttached();
    }
  });

  test('should display kameleon icons in each block', async ({ page }) => {
    const icons = page.locator('.cd-timeline-img .kameleon-icon img');
    await expect(icons).toHaveCount(7);
  });

  test('should apply color themes to timeline content blocks', async ({ page }) => {
    const warningBlocks = page.locator('.cd-timeline-content.warning');
    const dangerBlocks = page.locator('.cd-timeline-content.danger');
    const primaryBlocks = page.locator('.cd-timeline-content.primary');
    await expect(warningBlocks).toHaveCount(3);
    await expect(dangerBlocks).toHaveCount(2);
    await expect(primaryBlocks).toHaveCount(2);
  });
});

test.describe('Components - Tree View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/components/tree');
    await page.waitForSelector('.tree-panel', { timeout: 15000 });
  });

  test('should navigate to the tree view page', async ({ page }) => {
    await expect(page).toHaveURL(/.*#\/components\/tree/);
  });

  test('should display the page heading', async ({ page }) => {
    const heading = page.locator('content-top h1');
    await expect(heading).toHaveText('Tree View');
  });

  test('should display Basic Action panel heading', async ({ page }) => {
    const panelTitle = page.locator('h3', { hasText: 'Basic Action' });
    await expect(panelTitle).toBeVisible();
  });

  test('should display Drag & Drop panel heading', async ({ page }) => {
    const panelTitle = page.locator('h3', { hasText: 'Drag & Drop' });
    await expect(panelTitle).toBeVisible();
  });

  test('should display Add, Collapse All, Expand All, and Refresh buttons', async ({ page }) => {
    for (const label of ['Add', 'Collapse All', 'Expand All', 'Refresh']) {
      const btn = page.locator('button.btn-primary', { hasText: label });
      await expect(btn).toBeVisible();
    }
  });

  test('should render tree nodes in Basic Action panel', async ({ page }) => {
    const basicTree = page.locator('[js-tree="basicConfig"]');
    await basicTree.waitFor({ state: 'attached', timeout: 10000 });
    await page.waitForSelector('[js-tree="basicConfig"] .jstree-node', { timeout: 10000 });

    const rootNodes = ['Node 1', 'Node 2', 'Node 3'];
    for (const name of rootNodes) {
      const node = basicTree.locator('.jstree-anchor', { hasText: name }).first();
      await expect(node).toBeVisible();
    }
  });

  test('should render tree nodes in Drag & Drop panel', async ({ page }) => {
    const dragTree = page.locator('[js-tree="dragConfig"]');
    await dragTree.waitFor({ state: 'attached', timeout: 10000 });
    await page.waitForSelector('[js-tree="dragConfig"] .jstree-node', { timeout: 10000 });

    const rootNodes = ['Node 1', 'Node 2', 'Node 3', 'Node 4'];
    for (const name of rootNodes) {
      const node = dragTree.locator('.jstree-anchor', { hasText: name }).first();
      await expect(node).toBeVisible();
    }
  });

  test('should collapse all nodes when Collapse All is clicked', async ({ page }) => {
    const basicTree = page.locator('[js-tree="basicConfig"]');
    await page.waitForSelector('[js-tree="basicConfig"] .jstree-node', { timeout: 10000 });

    await page.locator('button.btn-primary', { hasText: 'Collapse All' }).click();
    await page.waitForTimeout(500);

    const openNodes = basicTree.locator('.jstree-open');
    await expect(openNodes).toHaveCount(0);
  });

  test('should expand all nodes when Expand All is clicked after collapse', async ({ page }) => {
    const basicTree = page.locator('[js-tree="basicConfig"]');
    await page.waitForSelector('[js-tree="basicConfig"] .jstree-node', { timeout: 10000 });

    await page.locator('button.btn-primary', { hasText: 'Collapse All' }).click();
    await page.waitForTimeout(500);
    await page.locator('button.btn-primary', { hasText: 'Expand All' }).click();
    await page.waitForTimeout(500);

    const openNodes = basicTree.locator('.jstree-open');
    const count = await openNodes.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Components - Mail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/components/mail/inbox');
    await page.waitForSelector('.mail-panel', { timeout: 15000 });
  });

  test('should navigate to the mail inbox page', async ({ page }) => {
    await expect(page).toHaveURL(/.*#\/components\/mail\/inbox/);
  });

  test('should display the page heading', async ({ page }) => {
    const heading = page.locator('content-top h1');
    await expect(heading).toHaveText('Mail');
  });

  test('should display the Compose button', async ({ page }) => {
    const composeBtn = page.locator('button.compose-button', { hasText: 'Compose' });
    await expect(composeBtn).toBeVisible();
  });

  test('should display mail navigation tabs', async ({ page }) => {
    const tabs = ['Inbox', 'Sent Mail', 'Important', 'Draft', 'Spam', 'Trash'];
    for (const tab of tabs) {
      const tabEl = page.locator('.mail-navigation', { hasText: tab });
      await expect(tabEl).toBeAttached();
    }
  });

  test('should show new mail count badges', async ({ page }) => {
    const inboxBadge = page.locator('.mail-navigation', { hasText: 'Inbox' }).locator('.new-mails');
    await expect(inboxBadge).toHaveText('7');

    const draftBadge = page.locator('.mail-navigation', { hasText: 'Draft' }).locator('.new-mails');
    await expect(draftBadge).toHaveText('2');
  });

  test('should display label tags', async ({ page }) => {
    const labels = ['Work', 'Family', 'Friend', 'Study'];
    for (const label of labels) {
      const labelEl = page.locator('.labels-container .label', { hasText: label });
      await expect(labelEl).toBeVisible();
    }
  });

  test('should show Add new label element', async ({ page }) => {
    const addLabel = page.locator('.add-label-container', { hasText: 'Add new label' });
    await expect(addLabel).toBeAttached();
  });

  test('should display inbox messages in a table', async ({ page }) => {
    const messageRows = page.locator('.messages table tr');
    const count = await messageRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display sender names in inbox messages', async ({ page }) => {
    const names = ['Kostya Danovsky', 'Nasta Linnie', 'Nick Cat'];
    for (const name of names) {
      const nameEl = page.locator('.messages .name', { hasText: name }).first();
      await expect(nameEl).toBeVisible();
    }
  });

  test('should display subjects in inbox messages', async ({ page }) => {
    const subjects = ['Street Art', 'Lores ipsum', 'Some news'];
    for (const subject of subjects) {
      const subjectEl = page.locator('.messages .subject', { hasText: subject }).first();
      await expect(subjectEl).toBeVisible();
    }
  });

  test('should display Select All checkbox and controls', async ({ page }) => {
    const selectAll = page.locator('.select-all-label', { hasText: 'Select All' });
    await expect(selectAll).toBeVisible();

    const refreshBtn = page.locator('button.refresh-button');
    await expect(refreshBtn).toBeVisible();

    const moreBtn = page.locator('button', { hasText: 'More' });
    await expect(moreBtn).toBeVisible();
  });

  test('should open compose modal when Compose is clicked', async ({ page }) => {
    await page.locator('button.compose-button', { hasText: 'Compose' }).click();
    const modal = page.locator('.modal-dialog');
    await expect(modal).toBeVisible({ timeout: 5000 });

    const toInput = modal.locator('input[placeholder="To"]');
    await expect(toInput).toBeVisible();

    const subjectInput = modal.locator('input[placeholder="Subject"]');
    await expect(subjectInput).toBeVisible();

    const sendBtn = modal.locator('button', { hasText: 'Send' });
    await expect(sendBtn).toBeVisible();
  });

  test('should navigate to a different mail tab', async ({ page }) => {
    await page.locator('.mail-navigation', { hasText: 'Sent Mail' }).click();
    await expect(page).toHaveURL(/.*#\/components\/mail\/sent/);
  });
});

test.describe('Components - Mail Detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/components/mail/inbox');
    await page.waitForSelector('.messages table tr', { timeout: 15000 });
  });

  test('should navigate to mail detail when a message row is clicked', async ({ page }) => {
    const firstRow = page.locator('.messages table tr').first();
    await firstRow.locator('td').nth(1).click();
    await page.waitForSelector('.message-container', { timeout: 10000 });
    await expect(page).toHaveURL(/.*#\/components\/mail\/inbox\/.+/);
  });

  test('should display sender info on detail page', async ({ page }) => {
    const firstRow = page.locator('.messages table tr').first();
    await firstRow.locator('td').nth(1).click();
    await page.waitForSelector('.message-container', { timeout: 10000 });

    const nameHeading = page.locator('.person-info .name-h').first();
    await expect(nameHeading).toBeVisible();

    const email = page.locator('.person-info .email');
    await expect(email).toBeVisible();
  });

  test('should display action buttons on detail page', async ({ page }) => {
    const firstRow = page.locator('.messages table tr').first();
    await firstRow.locator('td').nth(1).click();
    await page.waitForSelector('.answer-container', { timeout: 10000 });

    for (const label of ['Reply', 'Forward', 'Print', 'Spam', 'Delete']) {
      const btn = page.locator('.answer-container button', { hasText: label });
      await expect(btn).toBeVisible();
    }
  });

  test('should display Back button on detail page', async ({ page }) => {
    const firstRow = page.locator('.messages table tr').first();
    await firstRow.locator('td').nth(1).click();
    await page.waitForSelector('.back-button', { timeout: 10000 });

    const backBtn = page.locator('.back-button', { hasText: 'Back' });
    await expect(backBtn).toBeVisible();
  });

  test('should navigate back to list when Back is clicked', async ({ page }) => {
    const firstRow = page.locator('.messages table tr').first();
    await firstRow.locator('td').nth(1).click();
    await page.waitForSelector('.back-button', { timeout: 10000 });

    await page.locator('.back-button', { hasText: 'Back' }).click();
    await page.waitForSelector('.messages table', { timeout: 10000 });
    await expect(page).toHaveURL(/.*#\/components\/mail\/inbox$/);
  });
});
