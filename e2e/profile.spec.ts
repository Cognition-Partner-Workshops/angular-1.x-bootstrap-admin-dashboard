import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/profile');
    await page.waitForSelector('.profile-page', { timeout: 15000 });
  });

  test('Page loads at /profile', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/profile/);
    await expect(page.locator('.profile-page')).toBeVisible();
  });

  test('Progress bar renders at 70%', async ({ page }) => {
    const progressBar = page.locator('.progress-bar');
    await expect(progressBar).toHaveAttribute('aria-valuenow', '70');
    const style = await progressBar.getAttribute('style');
    expect(style).toContain('width: 70%');
  });

  test('"General Information" section renders', async ({ page }) => {
    const heading = page.locator('h3', { hasText: 'General Information' });
    await expect(heading).toBeVisible();
  });

  test('First Name field has value "Anastasiya"', async ({ page }) => {
    await expect(page.locator('#inputFirstName')).toHaveValue('Anastasiya');
  });

  test('Occupation field has value "Front End Web Developer"', async ({ page }) => {
    await expect(page.locator('#inputOccupation')).toHaveValue('Front End Web Developer');
  });

  test('Email field has value "contact@akveo.com"', async ({ page }) => {
    await expect(page.locator('#inputEmail3')).toHaveValue('contact@akveo.com');
  });

  test('Phone field has value "+1 (23) 456 7890"', async ({ page }) => {
    await expect(page.locator('#inputPhone')).toHaveValue('+1 (23) 456 7890');
  });

  test('Room field has value "303"', async ({ page }) => {
    await expect(page.locator('#inputRoom')).toHaveValue('303');
  });

  test('Department dropdown defaults to "Web Development"', async ({ page }) => {
    const select = page.locator('.profile-page select').first();
    await expect(select).toBeAttached();
    const selectedText = await select.evaluate(
      (el: HTMLSelectElement) => el.options[el.selectedIndex].text,
    );
    expect(selectedText).toBe('Web Development');
  });

  test('Password field exists with placeholder value', async ({ page }) => {
    const passwordField = page.locator('#inputPassword');
    await expect(passwordField).toBeAttached();
    await expect(passwordField).toHaveAttribute('type', 'password');
    const value = await passwordField.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  test('4 connected social profiles render (Facebook, Twitter, LinkedIn, GitHub)', async ({ page }) => {
    const connected = page.locator('.social-profiles a.sn-link.connected');
    await expect(connected).toHaveCount(4);

    const expectedProfiles = [
      { name: 'Facebook', href: 'https://www.facebook.com/akveo/' },
      { name: 'Twitter', href: 'https://twitter.com/akveo_inc' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/company/akveo' },
      { name: 'GitHub', href: 'https://github.com/akveo' },
    ];

    for (const profile of expectedProfiles) {
      const link = connected.filter({ hasText: profile.name });
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute('href', profile.href);
    }
  });

  test('4 unconnected social profiles render (Google, StackOverflow, Dribbble, Behance)', async ({ page }) => {
    const unconnected = page.locator('.social-profiles a.sn-link:not(.connected)');
    await expect(unconnected).toHaveCount(4);

    const expectedNames = ['Google', 'StackOverflow', 'Dribbble', 'Behance'];
    for (const name of expectedNames) {
      const link = unconnected.filter({ hasText: name });
      await expect(link).toHaveCount(1);
    }
  });

  test('Clicking unconnected social profile opens a modal', async ({ page }) => {
    const googleLink = page.locator('.social-profiles a.sn-link:not(.connected)', { hasText: 'Google' });
    await googleLink.click();

    const modal = page.locator('.modal-dialog');
    await expect(modal).toBeVisible({ timeout: 5000 });

    const modalTitle = modal.locator('.modal-title');
    await expect(modalTitle).toHaveText('Add Account');

    const input = modal.locator('input.form-control');
    await expect(input).toBeVisible();
  });

  test('6 notification toggle switches render', async ({ page }) => {
    const switches = page.locator('.notification .bootstrap-switch');
    await expect(switches).toHaveCount(6);
  });

  test('Notification switches have correct default states', async ({ page }) => {
    const expectedStates = [true, true, false, true, true, false];
    const switches = page.locator('.notification .bootstrap-switch input[type="checkbox"]');
    await expect(switches).toHaveCount(6);

    for (let i = 0; i < expectedStates.length; i++) {
      const isChecked = await switches.nth(i).isChecked();
      expect(isChecked, `Switch ${i} should be ${expectedStates[i]}`).toBe(expectedStates[i]);
    }
  });

  test('"Update Profile" button exists', async ({ page }) => {
    const button = page.locator('button', { hasText: 'Update Profile' });
    await expect(button).toBeVisible();
  });

  test('"Change Profile Picture" link exists and is clickable', async ({ page }) => {
    const link = page.locator('a.change-userpic', { hasText: 'Change Profile Picture' });
    await expect(link).toBeAttached();
    await page.locator('.userpic').hover();
    await expect(link).toBeVisible();
  });
});
