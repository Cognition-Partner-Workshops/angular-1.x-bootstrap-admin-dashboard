import { test, expect } from '@playwright/test';

test.describe('Maps - Google Maps', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/maps/gmap');
    await page.waitForSelector('#google-maps', { timeout: 15000 });
  });

  test('should navigate to the Google Maps route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/maps\/gmap/);
  });

  test('should display the page heading', async ({ page }) => {
    const heading = page.locator('h1', { hasText: 'Google Maps' });
    await expect(heading).toBeVisible();
  });

  test('should display the panel title', async ({ page }) => {
    const panelTitle = page.locator('h3', { hasText: 'Google Maps' });
    await expect(panelTitle).toBeVisible();
  });

  test('should render the Google Maps container', async ({ page }) => {
    const mapContainer = page.locator('#google-maps');
    await expect(mapContainer).toBeVisible();
  });

  test('should render map tiles inside the container', async ({ page }) => {
    const mapDiv = page.locator('#google-maps div[aria-label="Map"]');
    await expect(mapDiv).toBeAttached();
  });

  test('should show breadcrumb with correct path', async ({ page }) => {
    const breadcrumb = page.locator('content-top ul li', { hasText: 'Google Maps' });
    await expect(breadcrumb).toBeVisible();
  });
});

test.describe('Maps - Leaflet', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/maps/leaflet');
    await page.waitForSelector('#leaflet-map', { timeout: 15000 });
  });

  test('should navigate to the Leaflet Maps route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/maps\/leaflet/);
  });

  test('should display the page heading', async ({ page }) => {
    const heading = page.locator('h1', { hasText: 'Leaflet Maps' });
    await expect(heading).toBeVisible();
  });

  test('should display the panel title', async ({ page }) => {
    const panelTitle = page.locator('h3', { hasText: 'Leaflet' });
    await expect(panelTitle).toBeVisible();
  });

  test('should render the Leaflet map container', async ({ page }) => {
    const mapContainer = page.locator('#leaflet-map');
    await expect(mapContainer).toBeVisible();
  });

  test('should render OpenStreetMap tiles', async ({ page }) => {
    const tiles = page.locator('#leaflet-map img[src*="tile.osm.org"]');
    await expect(tiles.first()).toBeAttached();
  });

  test('should display zoom controls', async ({ page }) => {
    const zoomIn = page.locator('a[title="Zoom in"]');
    const zoomOut = page.locator('a[title="Zoom out"]');
    await expect(zoomIn).toBeVisible();
    await expect(zoomOut).toBeVisible();
  });

  test('should display the map marker', async ({ page }) => {
    const marker = page.locator('#leaflet-map img[src*="marker"]');
    await expect(marker.first()).toBeAttached();
  });

  test('should display the marker popup with expected text', async ({ page }) => {
    const popup = page.locator('#leaflet-map .leaflet-popup-content');
    await expect(popup).toContainText('A pretty CSS3 popup');
    await expect(popup).toContainText('Easily customizable');
  });

  test('should show Leaflet attribution', async ({ page }) => {
    const attribution = page.locator('a[href*="leafletjs"]');
    await expect(attribution).toBeAttached();
  });

  test('should show OpenStreetMap attribution', async ({ page }) => {
    const attribution = page.locator('a[href*="osm.org/copyright"]');
    await expect(attribution).toBeAttached();
  });

  test('should show breadcrumb with correct path', async ({ page }) => {
    const breadcrumb = page.locator('content-top ul li', { hasText: 'Leaflet Maps' });
    await expect(breadcrumb).toBeVisible();
  });
});

test.describe('Maps - Bubble Maps', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/maps/bubble');
    await page.waitForSelector('#map-bubbles', { timeout: 15000 });
  });

  test('should navigate to the Bubble Maps route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/maps\/bubble/);
  });

  test('should display the page heading', async ({ page }) => {
    const heading = page.locator('h1', { hasText: 'Bubble Maps' });
    await expect(heading).toBeVisible();
  });

  test('should display the panel title', async ({ page }) => {
    const panelTitle = page.locator('h3', { hasText: 'Map with Bubbles' });
    await expect(panelTitle).toBeVisible();
  });

  test('should render the bubble map container', async ({ page }) => {
    const mapContainer = page.locator('#map-bubbles');
    await expect(mapContainer).toBeVisible();
  });

  test('should render the amCharts SVG map', async ({ page }) => {
    const svg = page.locator('#map-bubbles svg');
    await expect(svg).toBeAttached();
  });

  test('should show amCharts attribution link', async ({ page }) => {
    const link = page.locator('#map-bubbles a[href*="ammap.com"]');
    await expect(link).toBeAttached();
  });

  test('should show breadcrumb with correct path', async ({ page }) => {
    const breadcrumb = page.locator('content-top ul li', { hasText: 'Bubble Maps' });
    await expect(breadcrumb).toBeVisible();
  });
});

test.describe('Maps - Line Maps', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/maps/line');
    await page.waitForSelector('#map-lines', { timeout: 15000 });
  });

  test('should navigate to the Line Maps route', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/maps\/line/);
  });

  test('should display the page heading', async ({ page }) => {
    const heading = page.locator('h1', { hasText: 'Line Maps' });
    await expect(heading).toBeVisible();
  });

  test('should display the panel title', async ({ page }) => {
    const panelTitle = page.locator('h3', { hasText: 'Line Map' });
    await expect(panelTitle).toBeVisible();
  });

  test('should render the line map container', async ({ page }) => {
    const mapContainer = page.locator('#map-lines');
    await expect(mapContainer).toBeVisible();
  });

  test('should render the amCharts SVG map', async ({ page }) => {
    const svg = page.locator('#map-lines svg');
    await expect(svg).toBeAttached();
  });

  test('should show amCharts attribution link', async ({ page }) => {
    const link = page.locator('#map-lines a[href*="ammap.com"]');
    await expect(link).toBeAttached();
  });

  test('should show breadcrumb with correct path', async ({ page }) => {
    const breadcrumb = page.locator('content-top ul li', { hasText: 'Line Maps' });
    await expect(breadcrumb).toBeVisible();
  });
});

test.describe('Maps - Sidebar Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/maps/gmap');
    await page.waitForSelector('#google-maps', { timeout: 15000 });
  });

  test('should display Maps section in sidebar', async ({ page }) => {
    const mapsLink = page.locator('aside .al-sidebar-list-link').filter({ hasText: 'Maps' });
    await expect(mapsLink).toBeVisible();
  });

  test('should display all map sub-menu items', async ({ page }) => {
    const googleMaps = page.locator('aside a', { hasText: 'Google Maps' });
    const leafletMaps = page.locator('aside a', { hasText: 'Leaflet Maps' });
    const bubbleMaps = page.locator('aside a', { hasText: 'Bubble Maps' });
    const lineMaps = page.locator('aside a', { hasText: 'Line Maps' });
    await expect(googleMaps).toBeVisible();
    await expect(leafletMaps).toBeVisible();
    await expect(bubbleMaps).toBeVisible();
    await expect(lineMaps).toBeVisible();
  });

  test('should navigate to Leaflet Maps via sidebar', async ({ page }) => {
    const leafletLink = page.locator('aside a', { hasText: 'Leaflet Maps' });
    await leafletLink.click();
    await page.waitForSelector('#leaflet-map', { timeout: 15000 });
    await expect(page).toHaveURL(/\/#\/maps\/leaflet/);
  });

  test('should navigate to Bubble Maps via sidebar', async ({ page }) => {
    const bubbleLink = page.locator('aside a', { hasText: 'Bubble Maps' });
    await bubbleLink.click();
    await page.waitForSelector('#map-bubbles', { timeout: 15000 });
    await expect(page).toHaveURL(/\/#\/maps\/bubble/);
  });

  test('should navigate to Line Maps via sidebar', async ({ page }) => {
    const lineLink = page.locator('aside a', { hasText: 'Line Maps' });
    await lineLink.click();
    await page.waitForSelector('#map-lines', { timeout: 15000 });
    await expect(page).toHaveURL(/\/#\/maps\/line/);
  });
});
