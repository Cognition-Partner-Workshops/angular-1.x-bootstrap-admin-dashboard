import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/profile');
    await page.waitForSelector('.profile-page', { timeout: 15_000 });
  });

  // ── Navigation & Page Load ──────────────────────────────────────────

  test('should load the profile page at /#/profile', async ({ page }) => {
    await expect(page.locator('.profile-page')).toBeVisible();
  });

  // ── Profile Picture Section ─────────────────────────────────────────

  test('should display the default profile picture', async ({ page }) => {
    const img = page.locator('.userpic img');
    await expect(img).toBeVisible();
    const src = await img.getAttribute('src');
    expect(src).toContain('Nasta');
  });

  test('should reveal remove icon and change link on userpic hover', async ({ page }) => {
    const userpic = page.locator('.userpic');
    await userpic.hover();

    const removeIcon = page.locator('.userpic i.ion-ios-close-outline');
    await expect(removeIcon).toBeVisible();

    const changeLink = page.locator('.change-userpic');
    await expect(changeLink).toBeVisible();
    await expect(changeLink).toContainText('Change Profile Picture');
  });

  test('should switch to no-photo fallback when remove icon is clicked', async ({ page }) => {
    const userpic = page.locator('.userpic');
    await userpic.hover();

    const removeIcon = page.locator('.userpic i.ion-ios-close-outline');
    await removeIcon.click();

    const img = page.locator('.userpic img');
    const src = await img.getAttribute('src');
    expect(src).toContain('no-photo');
  });

  test('should have a hidden file input for picture upload', async ({ page }) => {
    const fileInput = page.locator('.userpic input[type="file"]');
    await expect(fileInput).toBeAttached();
  });

  // ── Form Fields ─────────────────────────────────────────────────────

  test('should display editable form fields for first name, last name, email, phone', async ({ page }) => {
    const firstName = page.locator('#inputFirstName');
    await expect(firstName).toBeVisible();
    await expect(firstName).toHaveValue('Anastasiya');

    const lastName = page.locator('#inputLastName');
    await expect(lastName).toBeVisible();

    const email = page.locator('#inputEmail3');
    await expect(email).toBeVisible();

    const phone = page.locator('#inputPhone');
    await expect(phone).toBeVisible();
  });

  test('should allow editing a form field', async ({ page }) => {
    const firstName = page.locator('#inputFirstName');
    await firstName.clear();
    await firstName.fill('TestUser');
    await expect(firstName).toHaveValue('TestUser');
  });

  test('should have Department select with expected options', async ({ page }) => {
    const selects = page.locator('.profile-page select.form-control');
    const departmentSelect = selects.first();
    await expect(departmentSelect).toBeVisible();

    const options = departmentSelect.locator('option');
    const texts = await options.allTextContents();
    expect(texts).toContain('Web Development');
    expect(texts).toContain('Sales');
    expect(texts).toContain('Human Resources');
  });

  test('should have Office Location select with expected options', async ({ page }) => {
    const selects = page.locator('.profile-page select.form-control');
    // Office Location is the second select on the page
    const officeSelect = selects.nth(1);
    await expect(officeSelect).toBeVisible();

    const options = officeSelect.locator('option');
    const texts = await options.allTextContents();
    expect(texts).toContain('San Francisco');
    expect(texts).toContain('London');
    expect(texts).toContain('Minsk');
    expect(texts).toContain('Tokio');
  });

  // ── Progress Bar ────────────────────────────────────────────────────

  test('should display a progress bar', async ({ page }) => {
    const progressBar = page.locator('.progress-bar');
    await expect(progressBar).toBeVisible();

    const width = await progressBar.evaluate(
      (el) => window.getComputedStyle(el).width
    );
    expect(parseInt(width, 10)).toBeGreaterThan(0);
  });

  // ── Social Profiles Section ─────────────────────────────────────────

  test('should render all 8 social profile links', async ({ page }) => {
    const names = [
      'Facebook', 'Twitter', 'Google', 'LinkedIn',
      'GitHub', 'StackOverflow', 'Dribbble', 'Behance',
    ];
    for (const name of names) {
      await expect(
        page.locator('.social-profiles .sn-link', { hasText: name })
      ).toBeVisible();
    }
  });

  test('should mark connected profiles with .connected class', async ({ page }) => {
    const connectedNames = ['Facebook', 'Twitter', 'LinkedIn', 'GitHub'];
    for (const name of connectedNames) {
      const link = page.locator('.social-profiles .sn-link.connected', { hasText: name });
      await expect(link).toBeVisible();
    }
  });

  test('should NOT mark unconnected profiles with .connected class', async ({ page }) => {
    const unconnectedNames = ['Google', 'StackOverflow', 'Dribbble', 'Behance'];
    for (const name of unconnectedNames) {
      const link = page.locator('.social-profiles .sn-link', { hasText: name });
      await expect(link).toBeVisible();
      await expect(link).not.toHaveClass(/connected/);
    }
  });

  test('should disconnect a connected profile when its close button is clicked', async ({ page }) => {
    // Facebook is connected by default
    const facebookConnected = page.locator('.social-profiles .sn-link.connected', { hasText: 'Facebook' });
    await expect(facebookConnected).toBeVisible();

    const closeBtn = facebookConnected.locator('.sn-link-close');
    await closeBtn.click();

    // After disconnect, Facebook should appear without .connected
    const facebookLink = page.locator('.social-profiles .sn-link', { hasText: 'Facebook' });
    await expect(facebookLink).toBeVisible();
    await expect(facebookLink).not.toHaveClass(/connected/);
  });

  test('should connect a profile via the modal', async ({ page }) => {
    // Google is unconnected by default
    const googleLink = page.locator('.social-profiles .sn-link', { hasText: 'Google' });
    await expect(googleLink).not.toHaveClass(/connected/);
    await googleLink.click();

    // Modal should appear
    const modal = page.locator('.modal-dialog');
    await expect(modal).toBeVisible();

    const modalTitle = modal.locator('.modal-title');
    await expect(modalTitle).toContainText('Add Account');

    const input = modal.locator('input.form-control');
    await input.fill('https://plus.google.com/test');

    const saveBtn = modal.locator('button', { hasText: 'Save changes' });
    await saveBtn.click();

    // Modal should close and Google should become connected
    await expect(modal).not.toBeVisible();
    const googleConnected = page.locator('.social-profiles .sn-link.connected', { hasText: 'Google' });
    await expect(googleConnected).toBeVisible();
  });

  // ── Modal Behavior ──────────────────────────────────────────────────

  test('should open a modal when clicking an unconnected profile', async ({ page }) => {
    const behanceLink = page.locator('.social-profiles .sn-link', { hasText: 'Behance' });
    await behanceLink.click();

    const modal = page.locator('.modal-dialog');
    await expect(modal).toBeVisible();
  });

  test('should have a text input and Save changes button in the modal', async ({ page }) => {
    const drLink = page.locator('.social-profiles .sn-link', { hasText: 'Dribbble' });
    await drLink.click();

    const modal = page.locator('.modal-dialog');
    await expect(modal).toBeVisible();

    await expect(modal.locator('input.form-control')).toBeVisible();
    await expect(modal.locator('button', { hasText: 'Save changes' })).toBeVisible();
  });

  test('should close the modal via the dismiss button without connecting', async ({ page }) => {
    const soLink = page.locator('.social-profiles .sn-link', { hasText: 'StackOverflow' });
    await soLink.click();

    const modal = page.locator('.modal-dialog');
    await expect(modal).toBeVisible();

    // Click close/dismiss button
    const closeBtn = modal.locator('button.close');
    await closeBtn.click();

    await expect(modal).not.toBeVisible();

    // StackOverflow should remain unconnected
    const soAfter = page.locator('.social-profiles .sn-link', { hasText: 'StackOverflow' });
    await expect(soAfter).not.toHaveClass(/connected/);
  });

  // ── Notification Switches ───────────────────────────────────────────

  test('should display 6 notification toggle switches', async ({ page }) => {
    const switches = page.locator('.notification input[type="checkbox"]');
    await expect(switches).toHaveCount(6);
  });

  test('should toggle a notification switch', async ({ page }) => {
    // Target the container wrapping the checkbox for the third switch (index 2, initially off)
    const switchContainer = page.locator('.notification .switch-container').nth(2);
    const checkbox = switchContainer.locator('input[type="checkbox"]');

    const initialChecked = await checkbox.isChecked();

    // Click the visible switch wrapper to toggle it
    await switchContainer.click();

    const newChecked = await checkbox.isChecked();
    expect(newChecked).not.toBe(initialChecked);
  });

  // ── Save Button ─────────────────────────────────────────────────────

  test('should display a save/update profile button', async ({ page }) => {
    const saveBtn = page.locator('.profile-page button.save-profile');
    await expect(saveBtn).toBeVisible();
    await expect(saveBtn).toContainText(/update profile/i);
  });
});
