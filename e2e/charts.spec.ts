import { test, expect } from '@playwright/test';

test.describe('Charts – amCharts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/charts/amCharts');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  test('should navigate to the amCharts route', async ({ page }) => {
    await expect(page).toHaveURL(/.*#\/charts\/amCharts/);
  });

  test('should display the page heading', async ({ page }) => {
    const heading = page.locator('content-top h1');
    await expect(heading).toHaveText('amCharts');
  });

  test('should display the Bar Chart panel', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Bar Chart' });
    await expect(title).toBeVisible();
    const chart = page.locator('#barChart');
    await expect(chart).toBeAttached();
  });

  test('should display the Area Chart panel', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Area Chart' });
    await expect(title).toBeVisible();
    const chart = page.locator('#areaChart');
    await expect(chart).toBeAttached();
  });

  test('should display the Line Chart panel', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Line Chart' });
    await expect(title).toBeVisible();
    const chart = page.locator('#lineChart');
    await expect(chart).toBeAttached();
  });

  test('should display the Pie Chart panel', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Pie Chart' });
    await expect(title).toBeVisible();
    const chart = page.locator('#pieChart');
    await expect(chart).toBeAttached();
  });

  test('should display the Funnel Chart panel', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Funnel Chart' });
    await expect(title).toBeVisible();
    const chart = page.locator('#funnelChart');
    await expect(chart).toBeAttached();
  });

  test('should display the Combined Chart panel', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Combined bullet/column and line graphs with multiple value axes' });
    await expect(title).toBeAttached();
    const chart = page.locator('#zoomAxisChart');
    await expect(chart).toBeAttached();
  });

  test('should render SVG elements inside each amChart', async ({ page }) => {
    const chartIds = ['#barChart', '#areaChart', '#lineChart', '#pieChart', '#funnelChart', '#zoomAxisChart'];
    for (const id of chartIds) {
      const svg = page.locator(`${id} svg`);
      await expect(svg.first()).toBeAttached();
    }
  });

  test('should display amCharts attribution links', async ({ page }) => {
    const links = page.locator('a[href="http://www.amcharts.com/javascript-charts/"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });
});

test.describe('Charts – Chart.js', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/charts/chartJs');
    await page.waitForSelector('#pie', { timeout: 15000 });
  });

  test('should navigate to the Chart.js route', async ({ page }) => {
    await expect(page).toHaveURL(/.*#\/charts\/chartJs/);
  });

  test('should display the page heading', async ({ page }) => {
    const heading = page.locator('content-top h1');
    await expect(heading).toHaveText('Chart.js');
  });

  test('should display the Pie chart panel with canvas', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Pie' });
    await expect(title).toBeVisible();
    const canvas = page.locator('#pie');
    await expect(canvas).toBeAttached();
  });

  test('should display the Doughnut chart panel with canvas', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Doughnut' });
    await expect(title).toBeVisible();
    const canvas = page.locator('#doughnut');
    await expect(canvas).toBeAttached();
  });

  test('should display the Polar chart panel with canvas', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Polar' });
    await expect(title).toBeVisible();
    const canvas = page.locator('#polar-area');
    await expect(canvas).toBeAttached();
  });

  test('should display the Animated Radar panel with canvas', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Animated Radar' });
    await expect(title).toBeVisible();
    const canvas = page.locator('#waveLine');
    await expect(canvas).toBeAttached();
  });

  test('should display the Animated Bars panel with canvas', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Animated Bars' });
    await expect(title).toBeVisible();
    const canvas = page.locator('#waveBars');
    await expect(canvas).toBeAttached();
  });

  test('should display the Radar chart panel with canvas', async ({ page }) => {
    const title = page.locator('h3', { hasText: /^Radar$/ });
    await expect(title).toBeVisible();
    const canvas = page.locator('#radar');
    await expect(canvas).toBeAttached();
  });

  test('should display the Line chart panel with canvas', async ({ page }) => {
    const title = page.locator('h3', { hasText: /^Line$/ });
    await expect(title).toBeVisible();
    const canvas = page.locator('#line');
    await expect(canvas).toBeAttached();
  });

  test('should display the Bars chart panel with canvas', async ({ page }) => {
    const title = page.locator('h3', { hasText: /^Bars$/ });
    await expect(title).toBeVisible();
    const canvas = page.locator('#bar');
    await expect(canvas).toBeAttached();
  });

  test('should have 8 canvas elements total', async ({ page }) => {
    const canvases = page.locator('canvas.chart');
    await expect(canvases).toHaveCount(8);
  });
});

test.describe('Charts – Chartist', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/charts/chartist');
    await page.waitForSelector('.chartist', { timeout: 15000 });
  });

  test('should navigate to the Chartist route', async ({ page }) => {
    await expect(page).toHaveURL(/.*#\/charts\/chartist/);
  });

  test('should display the page heading', async ({ page }) => {
    const heading = page.locator('content-top h1');
    await expect(heading).toHaveText('Chartist');
  });

  test('should display the Lines panel with sub-headings', async ({ page }) => {
    const panel = page.locator('h3', { hasText: 'Lines' });
    await expect(panel).toBeVisible();

    await expect(page.locator('h5', { hasText: 'Simple line chart' })).toBeVisible();
    await expect(page.locator('h5', { hasText: /^Line chart with area$/ })).toBeVisible();
    await expect(page.locator('h5', { hasText: 'Bi-polar line chart with area only' })).toBeVisible();
  });

  test('should render the line chart containers', async ({ page }) => {
    await expect(page.locator('#line-chart')).toBeAttached();
    await expect(page.locator('#area-chart')).toBeAttached();
    await expect(page.locator('#bi-chart')).toBeAttached();
  });

  test('should display the Bars panel with sub-headings', async ({ page }) => {
    const panel = page.locator('h3', { hasText: 'Bars' });
    await expect(panel).toBeVisible();

    const subHeadings = ['Simple bar chart', 'Multi-line labels bar chart', 'Stacked bar chart'];
    for (const text of subHeadings) {
      const h5 = page.locator('h5', { hasText: text });
      await expect(h5).toBeVisible();
    }
  });

  test('should render the bar chart containers', async ({ page }) => {
    await expect(page.locator('#simple-bar')).toBeAttached();
    await expect(page.locator('#multi-bar')).toBeAttached();
    await expect(page.locator('#stacked-bar')).toBeAttached();
  });

  test('should display the Pies & Donuts panel with sub-headings', async ({ page }) => {
    const panel = page.locator('h3', { hasText: 'Pies & Donuts' });
    await expect(panel).toBeAttached();

    const subHeadings = ['Simple Pie', 'Pie with labels', 'Donut'];
    for (const text of subHeadings) {
      const h5 = page.locator('h5', { hasText: text });
      await expect(h5).toBeAttached();
    }
  });

  test('should render the pie/donut chart containers', async ({ page }) => {
    await expect(page.locator('#simple-pie')).toBeAttached();
    await expect(page.locator('#label-pie')).toBeAttached();
    await expect(page.locator('#donut')).toBeAttached();
  });

  test('should render SVG elements inside Chartist charts', async ({ page }) => {
    const chartIds = ['#line-chart', '#area-chart', '#bi-chart', '#simple-bar', '#multi-bar', '#stacked-bar', '#simple-pie', '#label-pie', '#donut'];
    for (const id of chartIds) {
      const svg = page.locator(`${id} svg`);
      await expect(svg).toBeAttached();
    }
  });
});

test.describe('Charts – Morris', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/charts/morris');
    await page.waitForSelector('[line-chart]', { timeout: 15000 });
  });

  test('should navigate to the Morris route', async ({ page }) => {
    await expect(page).toHaveURL(/.*#\/charts\/morris/);
  });

  test('should display the page heading', async ({ page }) => {
    const heading = page.locator('content-top h1');
    await expect(heading).toHaveText('Morris');
  });

  test('should display the Line Chart panel', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Line Chart' });
    await expect(title).toBeVisible();
  });

  test('should display the Donut panel', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Donut' });
    await expect(title).toBeVisible();
  });

  test('should display the Bar Chart panel', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Bar Chart' });
    await expect(title).toBeVisible();
  });

  test('should display the Area Chart panel', async ({ page }) => {
    const title = page.locator('h3', { hasText: 'Area Chart' });
    await expect(title).toBeVisible();
  });

  test('should render SVG elements for Morris charts', async ({ page }) => {
    const svgs = page.locator('svg');
    const count = await svgs.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('should render the line chart with data paths', async ({ page }) => {
    const lineChartDiv = page.locator('[line-chart]');
    const svg = lineChartDiv.locator('svg');
    await expect(svg).toBeAttached();
    const paths = svg.locator('path');
    const pathCount = await paths.count();
    expect(pathCount).toBeGreaterThan(0);
  });

  test('should render the donut chart with segments', async ({ page }) => {
    const donutDiv = page.locator('[donut-chart]');
    const svg = donutDiv.locator('svg');
    await expect(svg).toBeAttached();
    const paths = svg.locator('path');
    const pathCount = await paths.count();
    expect(pathCount).toBeGreaterThan(0);
  });

  test('should render the bar chart with rectangles', async ({ page }) => {
    const barDiv = page.locator('[bar-chart]');
    const svg = barDiv.locator('svg');
    await expect(svg).toBeAttached();
    const rects = svg.locator('rect');
    const rectCount = await rects.count();
    expect(rectCount).toBeGreaterThan(0);
  });
});

test.describe('Charts – Navigation', () => {
  test('should navigate between all chart sub-pages via sidebar', async ({ page }) => {
    await page.goto('/#/charts/amCharts');
    await page.waitForSelector('.widgets', { timeout: 15000 });

    const chartistLink = page.locator('a', { hasText: 'Chartist' });
    await chartistLink.click();
    await page.waitForSelector('.chartist', { timeout: 15000 });
    await expect(page).toHaveURL(/.*#\/charts\/chartist/);

    const chartJsLink = page.locator('a', { hasText: 'Chart.js' });
    await chartJsLink.click();
    await page.waitForSelector('#pie', { timeout: 15000 });
    await expect(page).toHaveURL(/.*#\/charts\/chartJs/);

    const morrisLink = page.locator('a', { hasText: 'Morris' });
    await morrisLink.click();
    await page.waitForSelector('[line-chart]', { timeout: 15000 });
    await expect(page).toHaveURL(/.*#\/charts\/morris/);
  });

  test('should show Charts section in sidebar', async ({ page }) => {
    await page.goto('/#/charts/amCharts');
    await page.waitForSelector('.widgets', { timeout: 15000 });
    const chartsMenu = page.locator('a', { hasText: 'Charts' }).first();
    await expect(chartsMenu).toBeVisible();
  });
});
