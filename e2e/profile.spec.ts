import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/profile');
    // Wait for AngularJS preloader to finish and content to appear
    await page.waitForSelector('.profile-page', { timeout: 15000 });
  });

  test('Test 1: Page loads and displays profile picture', async ({ page }) => {
    const userpic = page.locator('.userpic');
    await expect(userpic).toBeVisible();

    const img = userpic.locator('.userpic-wrapper img');
    await expect(img).toBeVisible();

    const src = await img.getAttribute('src');
    expect(src).toContain('app/profile/Nasta.png');
  });

  test('Test 2: Remove picture button works', async ({ page }) => {
    const userpic = page.locator('.userpic');
    await userpic.hover();

    const removeIcon = userpic.locator('i.ion-ios-close-outline');
    await expect(removeIcon).toBeVisible();
    await removeIcon.click();

    const img = userpic.locator('.userpic-wrapper img');
    const src = await img.getAttribute('src');
    expect(src).toContain('theme/no-photo.png');
  });

  test('Test 3: Social profiles are displayed', async ({ page }) => {
    const socialLinks = page.locator('.social-profiles .sn-link');
    await expect(socialLinks).toHaveCount(8);

    // Connected profiles should have the .connected class
    const connected = page.locator('.social-profiles a.sn-link.connected');
    await expect(connected).toHaveCount(4);

    // Verify the 4 connected ones: Facebook, Twitter, LinkedIn, GitHub
    const connectedNames = await connected.locator('span').allTextContents();
    expect(connectedNames).toContain('Facebook');
    expect(connectedNames).toContain('Twitter');
    expect(connectedNames).toContain('LinkedIn');
    expect(connectedNames).toContain('GitHub');
  });

  test('Test 4: Unconnect a social profile', async ({ page }) => {
    // Facebook should be connected initially
    const facebookLink = page.locator('a.sn-link.connected', { has: page.locator('span', { hasText: 'Facebook' }) });
    await expect(facebookLink).toHaveCount(1);

    // Click the disconnect button
    const closeBtn = facebookLink.locator('em.sn-link-close');
    await closeBtn.dispatchEvent('mousedown');

    // Facebook should no longer be connected
    await expect(page.locator('a.sn-link.connected', { has: page.locator('span', { hasText: 'Facebook' }) })).toHaveCount(0);
    // But it should still be rendered as an unconnected link
    await expect(page.locator('a.sn-link', { has: page.locator('span', { hasText: 'Facebook' }) })).toHaveCount(1);
  });

  test('Test 5: Connect a social profile via modal', async ({ page }) => {
    // Google should NOT be connected initially
    const googleLink = page.locator('a.sn-link:not(.connected)', { has: page.locator('span', { hasText: 'Google' }) });
    await expect(googleLink).toHaveCount(1);

    await googleLink.click();

    // Modal should appear — target the inner modal-content that has the form
    const modal = page.locator('.modal-dialog .modal-content').last();
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Type a link
    const input = modal.locator('input.form-control');
    await input.fill('https://plus.google.com/test');

    // Save
    await modal.locator('button', { hasText: 'Save changes' }).click();

    // Google should now be connected
    await expect(page.locator('a.sn-link.connected', { has: page.locator('span', { hasText: 'Google' }) })).toHaveCount(1, { timeout: 5000 });
  });

  test('Test 6: Toggle switches exist and are interactive', async ({ page }) => {
    const switches = page.locator('.switch-container');
    await expect(switches).toHaveCount(6);

    // The underlying checkbox should exist within each switch
    const firstSwitch = switches.nth(0);
    const checkbox = firstSwitch.locator('input[type="checkbox"]');
    await expect(checkbox).toHaveCount(1);

    // Click the switch wrapper to toggle (bootstrap-switch handles clicks on the container)
    const switchWrapper = firstSwitch.locator('.bootstrap-switch');
    const wasOn = await switchWrapper.evaluate(el => el.classList.contains('bootstrap-switch-on'));
    await switchWrapper.click();

    // Verify state changed
    const isOn = await switchWrapper.evaluate(el => el.classList.contains('bootstrap-switch-on'));
    expect(isOn).not.toBe(wasOn);
  });

  test('Test 7: Form fields are present', async ({ page }) => {
    await expect(page.locator('#inputFirstName')).toBeVisible();
    await expect(page.locator('#inputLastName')).toBeVisible();
    await expect(page.locator('#inputEmail3')).toBeVisible();
    await expect(page.locator('#inputPhone')).toBeVisible();
    await expect(page.locator('#inputOccupation')).toBeVisible();
    await expect(page.locator('#inputPassword')).toBeVisible();
    await expect(page.locator('#inputConfirmPassword')).toBeVisible();

    // Department and Office Location selects
    const selects = page.locator('.profile-page select.form-control');
    await expect(selects).toHaveCount(2);
  });

  test('Test 8: Upload picture interaction', async ({ page }) => {
    // Verify hidden file input exists
    const fileInput = page.locator('#uploadFile');
    await expect(fileInput).toHaveCount(1);
    await expect(fileInput).toHaveAttribute('type', 'file');

    // Verify clicking the profile image opens the file chooser dialog
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('.userpic .userpic-wrapper img').click(),
    ]);
    expect(fileChooser).toBeTruthy();
  });

  test('Test 9: Panel wrapper renders', async ({ page }) => {
    const panel = page.locator('.panel.profile-page');
    await expect(panel).toHaveCount(1);
    await expect(panel).toBeVisible();
  });
});
