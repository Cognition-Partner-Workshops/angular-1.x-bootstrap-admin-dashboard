import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/#/dashboard');
    // Wait for dashboard content to render
    await page.waitForSelector('.pie-charts', { timeout: 15000 });
  });

  // --- Pie Charts Section ---
  test('should display four pie chart stat cards', async ({ page }) => {
    const pieItems = page.locator('.pie-chart-item');
    await expect(pieItems).toHaveCount(4);
  });

  test('should show correct pie chart descriptions and stats', async ({ page }) => {
    const descriptions = ['New Visits', 'Purchases', 'Active Users', 'Returned'];
    const stats = ['57,820', '$ 89,745', '178,391', '32,592'];

    for (let i = 0; i < descriptions.length; i++) {
      const item = page.locator('.pie-chart-item').nth(i);
      await expect(item.locator('.description')).toContainText(descriptions[i]);
      await expect(item.locator('.description-stats')).toContainText(stats[i]);
    }
  });

  test('should display pie chart icons', async ({ page }) => {
    await expect(page.locator('.chart-icon.i-person')).toBeVisible();
    await expect(page.locator('.chart-icon.i-money')).toBeVisible();
    await expect(page.locator('.chart-icon.i-face')).toBeVisible();
    await expect(page.locator('.chart-icon.i-refresh')).toBeVisible();
  });

  test('should display percent values in pie charts', async ({ page }) => {
    const percents = page.locator('.pie-chart-item .chart .percent');
    await expect(percents).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      const text = await percents.nth(i).textContent();
      expect(Number(text)).toBeGreaterThanOrEqual(0);
    }
  });

  // --- Traffic Chart Section ---
  test('should display the traffic chart canvas', async ({ page }) => {
    await expect(page.locator('#chart-area')).toBeVisible();
  });

  test('should display traffic chart total views text', async ({ page }) => {
    await expect(page.locator('.traffic-text')).toContainText('1,900,128');
    await expect(page.locator('.traffic-text')).toContainText('Views Total');
  });

  test('should display acquisition channel labels with percentages', async ({ page }) => {
    const channels = [
      { label: 'Other', pct: '+87%' },
      { label: 'Search engines', pct: '+22%' },
      { label: 'Referral Traffic', pct: '+70%' },
      { label: 'Direct Traffic', pct: '+38%' },
      { label: 'Ad Campaigns', pct: '+17%' },
    ];
    const items = page.locator('.channels-info-item');
    await expect(items).toHaveCount(5);

    for (let i = 0; i < channels.length; i++) {
      const item = items.nth(i);
      await expect(item).toContainText(channels[i].label);
      await expect(item.locator('.channel-number')).toContainText(channels[i].pct);
    }
  });

  test('should display legend colors for each channel', async ({ page }) => {
    const legendColors = page.locator('.channels-info-item .legend-color');
    await expect(legendColors).toHaveCount(5);
  });

  // --- Map Section ---
  test('should display the amCharts map container', async ({ page }) => {
    await expect(page.locator('#amChartMap')).toBeVisible();
  });

  // --- Line Chart Section ---
  test('should display the revenue line chart', async ({ page }) => {
    await expect(page.locator('#amchart')).toBeVisible();
  });

  // --- Popular App Section ---
  test('should display the popular app section', async ({ page }) => {
    await expect(page.locator('.popular-app-img')).toBeVisible();
    await expect(page.locator('.logo-text')).toBeVisible();
  });

  test('should show popular app cost and stats', async ({ page }) => {
    await expect(page.locator('.popular-app-cost')).toContainText('Most Popular App');
    await expect(page.locator('.popular-app-cost')).toContainText('175$');
    await expect(page.locator('.popular-app-info')).toContainText('Total Visits');
    await expect(page.locator('.popular-app-info')).toContainText('47,512');
    await expect(page.locator('.popular-app-info')).toContainText('New Visits');
    await expect(page.locator('.popular-app-info')).toContainText('9,217');
    await expect(page.locator('.popular-app-info')).toContainText('Sales');
    await expect(page.locator('.popular-app-info')).toContainText('2,928');
  });

  // --- Feed Section ---
  test('should display feed messages', async ({ page }) => {
    const feedMessages = page.locator('.feed-message');
    const count = await feedMessages.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('should display feed message authors', async ({ page }) => {
    await expect(page.locator('.feed-message').first().locator('.author')).toBeVisible();
  });

  test('should display feed message photo icons', async ({ page }) => {
    const icons = page.locator('.feed-message .photo-icon');
    const count = await icons.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('should expand feed message on click to show time info', async ({ page }) => {
    const firstMessage = page.locator('.feed-message').first();
    // Before click, time should be hidden
    const timeBlock = firstMessage.locator('.message-time');
    await expect(timeBlock).toBeHidden();

    // Click to expand
    await firstMessage.click();
    await expect(timeBlock).toBeVisible();

    // Click again to collapse
    await firstMessage.click();
    await expect(timeBlock).toBeHidden();
  });

  test('should show preview image for expandable feed messages', async ({ page }) => {
    // The second message (video-message by Andrey) has a preview
    const videoMessage = page.locator('.feed-message').nth(1);
    await videoMessage.click();
    await expect(videoMessage.locator('.preview')).toBeVisible();
    await expect(videoMessage.locator('.preview img')).toBeVisible();
  });

  // --- Todo List Section ---
  test('should display todo list items', async ({ page }) => {
    const todoItems = page.locator('.todo-list li');
    const count = await todoItems.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('should display first todo item text', async ({ page }) => {
    await expect(page.locator('.todo-list li').first()).toContainText('Check me out');
  });

  test('should add a new todo item', async ({ page }) => {
    const input = page.locator('input.task-todo');
    const initialCount = await page.locator('.todo-list li').count();

    await input.fill('New test todo item');
    await input.press('Enter');

    // New item should be added at the top
    const newCount = await page.locator('.todo-list li').count();
    expect(newCount).toBe(initialCount + 1);
    await expect(page.locator('.todo-list li').first()).toContainText('New test todo item');
  });

  test('should add a todo item via plus button click', async ({ page }) => {
    const input = page.locator('input.task-todo');
    const initialCount = await page.locator('.todo-list li').count();

    await input.fill('Plus button todo');
    // The plus icon is display:none by default (shown on hover via CSS).
    // Use dispatchEvent to trigger the click handler.
    await page.locator('.add-item-icon').dispatchEvent('click');

    const newCount = await page.locator('.todo-list li').count();
    expect(newCount).toBe(initialCount + 1);
  });

  test('should have checkboxes for todo items', async ({ page }) => {
    const checkboxes = page.locator('.todo-list li input[type="checkbox"]');
    const count = await checkboxes.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('should have remove icons for todo items', async ({ page }) => {
    const removeIcons = page.locator('.todo-list li .remove-todo');
    const count = await removeIcons.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('should have colored marks for todo items', async ({ page }) => {
    const marks = page.locator('.todo-list li .mark');
    const count = await marks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  // --- Calendar Section ---
  test('should display the calendar', async ({ page }) => {
    await expect(page.locator('.blurCalendar')).toBeVisible();
  });

  test('should display calendar navigation buttons', async ({ page }) => {
    await expect(page.locator('.fc-prev-button')).toBeAttached();
    await expect(page.locator('.fc-next-button')).toBeAttached();
  });

  test('should display calendar title', async ({ page }) => {
    // The calendar has a title element (month/year)
    const title = page.locator('.fc-center h2, .fc-toolbar-title');
    await expect(title).toBeVisible();
  });

  // --- Panel Structure ---
  test('should have panels with correct titles', async ({ page }) => {
    await expect(page.locator('.panel-title', { hasText: 'Acquisition Channels' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Users by Country' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Revenue' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Feed' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'To Do List' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Calendar' })).toBeVisible();
  });
});
