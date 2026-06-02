import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForSelector('dashboard-pie-chart', { state: 'attached', timeout: 15000 });
  });

  test('should navigate to the dashboard route', async ({ page }) => {
    await expect(page).toHaveURL(/.*#\/dashboard/);
  });

  test('should display the Dashboard page heading', async ({ page }) => {
    const heading = page.locator('content-top h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Dashboard');
  });

  test('should display the breadcrumb with Home and Dashboard', async ({ page }) => {
    const breadcrumbItems = page.locator('content-top ul li');
    await expect(breadcrumbItems).toHaveCount(2);
    await expect(breadcrumbItems.filter({ hasText: /^Dashboard$/ })).toBeAttached();
  });

  // --- Pie Charts ---
  test('should render four pie chart items', async ({ page }) => {
    const items = page.locator('.pie-chart-item');
    await expect(items).toHaveCount(4);
  });

  test('should display pie chart descriptions and stats', async ({ page }) => {
    const descriptions = [
      { desc: 'New Visits', stats: '57,820' },
      { desc: 'Purchases', stats: '$ 89,745' },
      { desc: 'Active Users', stats: '178,391' },
      { desc: 'Returned', stats: '32,592' },
    ];

    for (const { desc, stats } of descriptions) {
      const container = page.locator('.pie-chart-item').filter({ hasText: desc });
      await expect(container).toBeAttached();
      await expect(container.locator('.description-stats')).toHaveText(stats);
    }
  });

  test('should show a numeric percent inside each pie chart after animation', async ({ page }) => {
    const percents = page.locator('.pie-chart-item .percent');
    await expect(percents).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      await expect(percents.nth(i)).not.toHaveText('', { timeout: 10000 });
      const text = await percents.nth(i).textContent();
      expect(Number(text)).toBeGreaterThan(0);
    }
  });

  // --- Panel headings ---
  test('should display the Acquisition Channels panel', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'Acquisition Channels' })).toBeVisible();
  });

  test('should display the Users by Country panel', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'Users by Country' })).toBeVisible();
  });

  test('should display the Revenue panel', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'Revenue' })).toBeVisible();
  });

  test('should display the Feed panel', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'Feed' })).toBeAttached();
  });

  test('should display the To Do List panel', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'To Do List' })).toBeAttached();
  });

  test('should display the Calendar panel', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'Calendar' })).toBeAttached();
  });

  // --- Traffic Chart / Acquisition Channels ---
  test('should display total views text in the traffic chart', async ({ page }) => {
    const viewsTotal = page.locator('.traffic-text');
    await expect(viewsTotal).toContainText('1,900,128');
    await expect(viewsTotal).toContainText('Views Total');
  });

  test('should render all five channel labels', async ({ page }) => {
    const labels = ['Other', 'Search engines', 'Referral Traffic', 'Direct Traffic', 'Ad Campaigns'];
    for (const label of labels) {
      await expect(page.locator('.channels-info-item', { hasText: label })).toBeAttached();
    }
  });

  test('should display percentage values for each channel', async ({ page }) => {
    const expectedPercentages = ['87', '22', '70', '38', '17'];
    const channelNumbers = page.locator('.channel-number');
    await expect(channelNumbers).toHaveCount(5);
    for (let i = 0; i < 5; i++) {
      await expect(channelNumbers.nth(i)).toContainText(expectedPercentages[i]);
    }
  });

  test('should render progress bars for each channel', async ({ page }) => {
    const progressBars = page.locator('.channels-info-item .progress-bar');
    await expect(progressBars).toHaveCount(5);
  });

  // --- Users by Country (Map) ---
  test('should render the amCharts map container', async ({ page }) => {
    const mapContainer = page.locator('#amChartMap');
    await expect(mapContainer).toBeAttached();
    const svg = mapContainer.locator('svg');
    await expect(svg.first()).toBeAttached();
  });

  // --- Revenue (Line Chart) ---
  test('should render the amCharts line chart container', async ({ page }) => {
    const chartContainer = page.locator('#amchart');
    await expect(chartContainer).toBeAttached();
    const svg = chartContainer.locator('svg');
    await expect(svg.first()).toBeAttached();
  });

  // --- Popular App ---
  test('should display the Popular App widget', async ({ page }) => {
    const popularApp = page.locator('popular-app');
    await expect(popularApp).toBeAttached();
    await expect(popularApp.locator('.logo-text')).toContainText('Super');
    await expect(popularApp.locator('.popular-app-cost')).toContainText('Most Popular App');
    await expect(popularApp.locator('.popular-app-cost')).toContainText('175$');
  });

  test('should display Popular App stats', async ({ page }) => {
    const info = page.locator('.popular-app-info');
    await expect(info).toBeAttached();
    await expect(info).toContainText('Total Visits');
    await expect(info).toContainText('47,512');
    await expect(info).toContainText('New Visits');
    await expect(info).toContainText('9,217');
    await expect(info).toContainText('Sales');
    await expect(info).toContainText('2,928');
  });

  // --- Feed ---
  test('should render all 11 feed messages', async ({ page }) => {
    const feedMessages = page.locator('.feed-message');
    await expect(feedMessages).toHaveCount(11);
  });

  test('should display feed author names', async ({ page }) => {
    const authors = [
      'Kostya Danovsky',
      'Andrey Hrabouski',
      'Vlad Lugovsky',
      'Nasta Linnie',
      'Nick Cat',
    ];
    for (const author of authors) {
      const msg = page.locator('.feed-message', { hasText: author });
      await expect(msg.first()).toBeAttached();
    }
  });

  test('should expand a feed message on click to reveal time info', async ({ page }) => {
    const firstMessage = page.locator('.feed-message').first();
    await firstMessage.click();
    const postTime = firstMessage.locator('.post-time');
    await expect(postTime).toBeVisible();
    await expect(postTime).toContainText('Today 11:55 pm');
  });

  test('should show preview image in expanded video feed message', async ({ page }) => {
    const videoMessage = page.locator('.feed-message').filter({ hasText: 'Andrey Hrabouski' }).first();
    await videoMessage.click();
    const preview = videoMessage.locator('.preview img');
    await expect(preview).toBeVisible();
  });

  // --- To Do List ---
  test('should render 10 default todo items', async ({ page }) => {
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(10);
  });

  test('should display expected todo text content', async ({ page }) => {
    const expectedTexts = ['Check me out', 'Get in touch with akveo team', 'Have fun with blur admin'];
    for (const text of expectedTexts) {
      const item = page.locator('.todo-list li', { hasText: text });
      await expect(item).toBeAttached();
    }
  });

  test('should have a todo input field with correct placeholder', async ({ page }) => {
    const input = page.locator('input.task-todo');
    await expect(input).toBeAttached();
    await expect(input).toHaveAttribute('placeholder', 'Task to do..');
  });

  test('should add a new todo item when typing and pressing Enter', async ({ page }) => {
    const input = page.locator('input.task-todo');
    await input.scrollIntoViewIfNeeded();
    await input.fill('My new test task');
    await input.press('Enter');
    const newItem = page.locator('.todo-list li', { hasText: 'My new test task' });
    await expect(newItem).toBeAttached();
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(11);
  });

  test('should have a checkbox for each todo item', async ({ page }) => {
    const checkboxes = page.locator('.todo-list li input[type="checkbox"]');
    await expect(checkboxes).toHaveCount(10);
  });

  // --- Calendar ---
  test('should render the FullCalendar widget', async ({ page }) => {
    const calendar = page.locator('#calendar');
    await expect(calendar).toBeAttached();
    const title = calendar.locator('.fc-center h2');
    await expect(title).toBeAttached();
  });

  test('should display calendar navigation buttons', async ({ page }) => {
    await expect(page.locator('#calendar .fc-prev-button')).toBeAttached();
    await expect(page.locator('#calendar .fc-next-button')).toBeAttached();
    await expect(page.locator('#calendar .fc-today-button')).toBeAttached();
  });

  test('should display calendar view switcher buttons', async ({ page }) => {
    await expect(page.locator('#calendar .fc-month-button')).toBeAttached();
    await expect(page.locator('#calendar .fc-agendaWeek-button')).toBeAttached();
    await expect(page.locator('#calendar .fc-agendaDay-button')).toBeAttached();
  });

  test('should display calendar events', async ({ page }) => {
    const events = page.locator('#calendar .fc-event');
    await expect(events.first()).toBeAttached();
    const count = await events.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  // --- Doughnut chart canvas ---
  test('should render the traffic doughnut chart canvas', async ({ page }) => {
    const canvas = page.locator('#chart-area');
    await expect(canvas).toBeAttached();
    const width = await canvas.getAttribute('width');
    expect(Number(width)).toBeGreaterThan(0);
    const height = await canvas.getAttribute('height');
    expect(Number(height)).toBeGreaterThan(0);
  });
});
