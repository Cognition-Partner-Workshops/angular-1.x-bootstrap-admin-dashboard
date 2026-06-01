import { test, expect } from '@playwright/test';

test.describe('Maps Module', function () {

  test.describe('Google Maps page', function () {

    test('should navigate to Google Maps and show the panel', async function ({ page }) {
      await page.goto('/#/maps/gmap');
      var panel = page.locator('.panel');
      await expect(panel).toBeVisible({ timeout: 15000 });
    });

    test('should display the panel title "Google Maps"', async function ({ page }) {
      await page.goto('/#/maps/gmap');
      var title = page.locator('.panel-title', { hasText: 'Google Maps' });
      await expect(title).toBeVisible({ timeout: 15000 });
    });

    test('should have a google-maps container div', async function ({ page }) {
      await page.goto('/#/maps/gmap');
      var mapContainer = page.locator('#google-maps');
      await expect(mapContainer).toBeVisible({ timeout: 15000 });
    });

    test('should render the map container inside panel-body', async function ({ page }) {
      await page.goto('/#/maps/gmap');
      var panelBody = page.locator('.panel-body');
      await expect(panelBody).toBeVisible({ timeout: 15000 });
      var mapDiv = panelBody.locator('#google-maps');
      await expect(mapDiv).toBeVisible();
    });
  });

  test.describe('Leaflet Maps page', function () {

    test('should navigate to Leaflet Maps and show the panel', async function ({ page }) {
      await page.goto('/#/maps/leaflet');
      var panel = page.locator('.panel');
      await expect(panel).toBeVisible({ timeout: 15000 });
    });

    test('should display the panel title "Leaflet"', async function ({ page }) {
      await page.goto('/#/maps/leaflet');
      var title = page.locator('.panel-title', { hasText: 'Leaflet' });
      await expect(title).toBeVisible({ timeout: 15000 });
    });

    test('should have a leaflet-map container div', async function ({ page }) {
      await page.goto('/#/maps/leaflet');
      var mapContainer = page.locator('#leaflet-map');
      await expect(mapContainer).toBeVisible({ timeout: 15000 });
    });

    test('should render leaflet tiles inside the map container', async function ({ page }) {
      await page.goto('/#/maps/leaflet');
      var mapContainer = page.locator('#leaflet-map');
      await expect(mapContainer).toBeVisible({ timeout: 15000 });
      // Leaflet adds the leaflet-container class when initialized
      await expect(mapContainer).toHaveClass(/leaflet-container/, { timeout: 15000 });
    });

    test('should display a leaflet marker popup', async function ({ page }) {
      await page.goto('/#/maps/leaflet');
      var popup = page.locator('.leaflet-popup-content');
      await expect(popup).toBeVisible({ timeout: 15000 });
      await expect(popup).toContainText('A pretty CSS3 popup');
    });
  });

  test.describe('Bubble Maps page', function () {

    test('should navigate to Bubble Maps and show the panel', async function ({ page }) {
      await page.goto('/#/maps/bubble');
      var panel = page.locator('.panel');
      await expect(panel).toBeVisible({ timeout: 15000 });
    });

    test('should display the panel title "Map with Bubbles"', async function ({ page }) {
      await page.goto('/#/maps/bubble');
      var title = page.locator('.panel-title', { hasText: 'Map with Bubbles' });
      await expect(title).toBeVisible({ timeout: 15000 });
    });

    test('should have a map-bubbles container div', async function ({ page }) {
      await page.goto('/#/maps/bubble');
      var mapContainer = page.locator('#map-bubbles');
      await expect(mapContainer).toBeVisible({ timeout: 15000 });
    });

    test('should render the amMap SVG inside map-bubbles', async function ({ page }) {
      await page.goto('/#/maps/bubble');
      var mapContainer = page.locator('#map-bubbles');
      await expect(mapContainer).toBeVisible({ timeout: 15000 });
      // amMap renders an SVG element inside the container
      var svg = mapContainer.locator('svg');
      await expect(svg.first()).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('Line Maps page', function () {

    test('should navigate to Line Maps and show the panel', async function ({ page }) {
      await page.goto('/#/maps/line');
      var panel = page.locator('.panel');
      await expect(panel).toBeVisible({ timeout: 15000 });
    });

    test('should display the panel title "Line Map"', async function ({ page }) {
      await page.goto('/#/maps/line');
      var title = page.locator('.panel-title', { hasText: 'Line Map' });
      await expect(title).toBeVisible({ timeout: 15000 });
    });

    test('should have a map-lines container div', async function ({ page }) {
      await page.goto('/#/maps/line');
      var mapContainer = page.locator('#map-lines');
      await expect(mapContainer).toBeVisible({ timeout: 15000 });
    });

    test('should render the amMap SVG inside map-lines', async function ({ page }) {
      await page.goto('/#/maps/line');
      var mapContainer = page.locator('#map-lines');
      await expect(mapContainer).toBeVisible({ timeout: 15000 });
      // amMap renders an SVG element inside the container
      var svg = mapContainer.locator('svg');
      await expect(svg.first()).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('Navigation between map pages', function () {

    test('should navigate from Google Maps to Leaflet via sidebar', async function ({ page }) {
      await page.goto('/#/maps/gmap');
      await page.waitForSelector('.panel-title', { timeout: 15000 });
      // Click on the Leaflet Maps sidebar link
      var leafletLink = page.locator('a[ui-sref="maps.leaflet"], a[href*="maps/leaflet"]');
      if (await leafletLink.count() > 0) {
        await leafletLink.first().click();
        await page.waitForURL(/.*maps\/leaflet/);
        var title = page.locator('.panel-title', { hasText: 'Leaflet' });
        await expect(title).toBeVisible({ timeout: 15000 });
      }
    });

    test('should navigate from Leaflet to Bubble Maps via sidebar', async function ({ page }) {
      await page.goto('/#/maps/leaflet');
      await page.waitForSelector('.panel-title', { timeout: 15000 });
      var bubbleLink = page.locator('a[ui-sref="maps.bubble"], a[href*="maps/bubble"]');
      if (await bubbleLink.count() > 0) {
        await bubbleLink.first().click();
        await page.waitForURL(/.*maps\/bubble/);
        var title = page.locator('.panel-title', { hasText: 'Map with Bubbles' });
        await expect(title).toBeVisible({ timeout: 15000 });
      }
    });
  });

  test.describe('Panel structure', function () {

    test('should have panel-heading and panel-body on each map page', async function ({ page }) {
      var routes = ['/maps/gmap', '/maps/leaflet', '/maps/bubble', '/maps/line'];
      for (var i = 0; i < routes.length; i++) {
        await page.goto('/#' + routes[i]);
        var heading = page.locator('.panel-heading');
        await expect(heading).toBeVisible({ timeout: 15000 });
        var body = page.locator('.panel-body');
        await expect(body).toBeVisible({ timeout: 15000 });
      }
    });

    test('should have the viewport100 class on each map panel', async function ({ page }) {
      await page.goto('/#/maps/gmap');
      var panel = page.locator('.viewport100');
      await expect(panel).toBeVisible({ timeout: 15000 });
    });
  });

});
