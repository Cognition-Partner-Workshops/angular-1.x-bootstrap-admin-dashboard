import { test, expect } from '@playwright/test';

// ── amCharts page ──────────────────────────────────────────────────────────

test.describe('amCharts page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/charts/amCharts');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  test('should display main panel with chart sections', async ({ page }) => {
    const widgets = page.locator('.widgets');
    await expect(widgets).toBeVisible();
  });

  test('should display Bar Chart panel', async ({ page }) => {
    const barChart = page.locator('#barChart');
    await expect(barChart).toBeVisible();
    await expect(barChart).toHaveClass(/admin-chart/);
  });

  test('should display Area Chart panel', async ({ page }) => {
    const areaChart = page.locator('#areaChart');
    await expect(areaChart).toBeVisible();
    await expect(areaChart).toHaveClass(/admin-chart/);
  });

  test('should display Line Chart panel', async ({ page }) => {
    const lineChart = page.locator('#lineChart');
    await expect(lineChart).toBeVisible();
    await expect(lineChart).toHaveClass(/admin-chart/);
  });

  test('should display Pie Chart panel', async ({ page }) => {
    const pieChart = page.locator('#pieChart');
    await expect(pieChart).toBeVisible();
    await expect(pieChart).toHaveClass(/admin-chart/);
  });

  test('should display Funnel Chart panel', async ({ page }) => {
    const funnelChart = page.locator('#funnelChart');
    await expect(funnelChart).toBeVisible();
    await expect(funnelChart).toHaveClass(/admin-chart/);
  });

  test('should display Combined Chart panel', async ({ page }) => {
    const combinedChart = page.locator('#zoomAxisChart');
    await expect(combinedChart).toBeVisible();
    await expect(combinedChart).toHaveClass(/admin-chart/);
  });

  test('should render amCharts SVG elements inside chart containers', async ({ page }) => {
    // amCharts renders SVG inside each chart div
    await page.waitForSelector('#barChart svg', { timeout: 15000 });
    const barSvg = page.locator('#barChart svg');
    await expect(barSvg.first()).toBeVisible();
  });

  test('should have panel titles for all chart sections', async ({ page }) => {
    // The ba-panel directive renders panel titles
    await expect(page.locator('.panel-title', { hasText: 'Bar Chart' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Area Chart' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Line Chart' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Pie Chart' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Funnel Chart' })).toBeVisible();
  });

  test('should have correct grid layout for first row', async ({ page }) => {
    // First row: 3 charts in col-lg-4 layout
    const firstRow = page.locator('.widgets > .row').first();
    await expect(firstRow).toBeVisible();
    const cols = firstRow.locator('[class*="col-"]');
    await expect(cols).toHaveCount(3);
  });
});

// ── Chart.js page ──────────────────────────────────────────────────────────

test.describe('Chart.js page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/charts/chartJs');
    // Wait for chart canvas elements to appear
    await page.waitForSelector('canvas', { timeout: 15000 });
  });

  test('should display Pie chart canvas', async ({ page }) => {
    const pieCanvas = page.locator('#pie');
    await expect(pieCanvas).toBeVisible();
    await expect(pieCanvas).toHaveClass(/chart chart-pie/);
  });

  test('should display Doughnut chart canvas', async ({ page }) => {
    const doughnutCanvas = page.locator('#doughnut');
    await expect(doughnutCanvas).toBeVisible();
    await expect(doughnutCanvas).toHaveClass(/chart chart-doughnut/);
  });

  test('should display Polar Area chart canvas', async ({ page }) => {
    const polarCanvas = page.locator('#polar-area');
    await expect(polarCanvas).toBeVisible();
    await expect(polarCanvas).toHaveClass(/chart chart-polar-area/);
  });

  test('should display Animated Radar canvas', async ({ page }) => {
    const waveLineCanvas = page.locator('#waveLine');
    await expect(waveLineCanvas).toBeVisible();
    await expect(waveLineCanvas).toHaveClass(/chart chart-radar/);
  });

  test('should display Animated Bars canvas', async ({ page }) => {
    const waveBarsCanvas = page.locator('#waveBars');
    await expect(waveBarsCanvas).toBeVisible();
    await expect(waveBarsCanvas).toHaveClass(/chart chart-bar/);
  });

  test('should display Radar chart canvas', async ({ page }) => {
    const radarCanvas = page.locator('#radar');
    await expect(radarCanvas).toBeVisible();
  });

  test('should display Line chart canvas', async ({ page }) => {
    const lineCanvas = page.locator('#line');
    await expect(lineCanvas).toBeVisible();
    await expect(lineCanvas).toHaveClass(/chart chart-line/);
  });

  test('should display Bar chart canvas', async ({ page }) => {
    const barCanvas = page.locator('#bar');
    await expect(barCanvas).toBeVisible();
    await expect(barCanvas).toHaveClass(/chart chart-bar/);
  });

  test('should have panel titles for chart sections', async ({ page }) => {
    await expect(page.locator('.panel-title', { hasText: 'Pie' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Doughnut' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Polar' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Animated Radar' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Animated Bars' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Radar' }).first()).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Line' })).toBeVisible();
    await expect(page.locator('.panel-title', { hasText: 'Bars' }).first()).toBeVisible();
  });

  test('should have three rows of charts', async ({ page }) => {
    const rows = page.locator('.row');
    // There should be at least 3 rows for chart.js page
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('should have canvas holder containers', async ({ page }) => {
    await expect(page.locator('.chartjs-canvas-holder-first-row').first()).toBeVisible();
    await expect(page.locator('.chartjs-canvas-holder-second-row').first()).toBeVisible();
    await expect(page.locator('.chartjs-canvas-holder-third-row').first()).toBeVisible();
  });
});

// ── Chartist page ──────────────────────────────────────────────────────────

test.describe('Chartist page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/charts/chartist');
    await page.waitForSelector('.chartist', { timeout: 15000 });
  });

  test('should display the chartist section', async ({ page }) => {
    const section = page.locator('.chartist');
    await expect(section).toBeVisible();
  });

  test('should display Lines panel with sub-charts', async ({ page }) => {
    await expect(page.locator('.panel-title', { hasText: 'Lines' })).toBeVisible();
    await expect(page.locator('h5', { hasText: 'Simple line chart' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Line chart with area', exact: true })).toBeVisible();
    await expect(page.locator('h5', { hasText: 'Bi-polar line chart with area only' })).toBeVisible();
  });

  test('should display Bars panel with sub-charts', async ({ page }) => {
    await expect(page.locator('.panel-title', { hasText: 'Bars' })).toBeVisible();
    await expect(page.locator('h5', { hasText: 'Simple bar chart' })).toBeVisible();
    await expect(page.locator('h5', { hasText: 'Multi-line labels bar chart' })).toBeVisible();
    await expect(page.locator('h5', { hasText: 'Stacked bar chart' })).toBeVisible();
  });

  test('should display Pies & Donuts panel with sub-charts', async ({ page }) => {
    await expect(page.locator('.panel-title', { hasText: 'Pies & Donuts' })).toBeVisible();
    await expect(page.locator('h5', { hasText: 'Simple Pie' })).toBeVisible();
    await expect(page.locator('h5', { hasText: 'Pie with labels' })).toBeVisible();
    await expect(page.locator('h5', { hasText: 'Donut' })).toBeVisible();
  });

  test('should render chartist chart containers', async ({ page }) => {
    await expect(page.locator('#line-chart.ct-chart')).toBeVisible();
    await expect(page.locator('#area-chart.ct-chart')).toBeVisible();
    await expect(page.locator('#bi-chart.ct-chart')).toBeVisible();
    await expect(page.locator('#simple-bar.ct-chart')).toBeVisible();
    await expect(page.locator('#multi-bar.ct-chart')).toBeVisible();
    await expect(page.locator('#stacked-bar.ct-chart')).toBeVisible();
    await expect(page.locator('#simple-pie.ct-chart')).toBeVisible();
    await expect(page.locator('#label-pie.ct-chart')).toBeVisible();
    await expect(page.locator('#donut.ct-chart')).toBeVisible();
  });

  test('should render SVG inside chartist containers', async ({ page }) => {
    // Chartist renders SVG inside .ct-chart divs
    await page.waitForSelector('#line-chart svg', { timeout: 15000 });
    await expect(page.locator('#line-chart svg').first()).toBeVisible();
  });
});

// ── Morris page ────────────────────────────────────────────────────────────

test.describe('Morris page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/charts/morris');
    await page.locator('.panel-title', { hasText: 'Line Chart' }).waitFor({ timeout: 15000 });
  });

  test('should display Line Chart panel', async ({ page }) => {
    await expect(page.locator('.panel-title', { hasText: 'Line Chart' }).first()).toBeVisible();
  });

  test('should display Donut panel', async ({ page }) => {
    await expect(page.locator('.panel-title', { hasText: 'Donut' })).toBeVisible();
  });

  test('should display Bar Chart panel', async ({ page }) => {
    await expect(page.locator('.panel-title', { hasText: 'Bar Chart' })).toBeVisible();
  });

  test('should display Area Chart panel', async ({ page }) => {
    await expect(page.locator('.panel-title', { hasText: 'Area Chart' })).toBeVisible();
  });

  test('should render Morris SVG elements', async ({ page }) => {
    // Morris renders SVG inside the chart containers
    await page.waitForSelector('svg', { timeout: 15000 });
    const svgElements = page.locator('svg');
    const count = await svgElements.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should have correct grid layout', async ({ page }) => {
    // First row: col-md-12 for line chart
    // Second row: col-md-4 for donut + col-md-8 for bar
    // Third row: col-md-12 for area chart
    const rows = page.locator('section > .row');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThanOrEqual(3);
  });
});
