import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/profile');
    await page.waitForSelector('.profile-page', { timeout: 15000 });
  });

  test('should navigate to the profile page', async ({ page }) => {
    await expect(page).toHaveURL(/\/#\/profile/);
  });

  test('should display the progress bar at 70%', async ({ page }) => {
    const progressBar = page.locator('.progress-bar');
    await expect(progressBar).toHaveAttribute('aria-valuenow', '70');
    const width = await progressBar.evaluate(el => el.style.width);
    expect(width).toBe('70%');
  });

  test('should display the progress info text', async ({ page }) => {
    const progressInfo = page.locator('.progress-info');
    await expect(progressInfo).toContainText('70% Complete');
  });

  test('should display section headings', async ({ page }) => {
    const headings = [
      'General Information',
      'Change Password',
      'Contact Information',
      'Social Profiles',
      'Send Email Notifications',
    ];
    for (const heading of headings) {
      await expect(page.locator('h3', { hasText: heading })).toBeAttached();
    }
  });

  test('should display First Name field with default value', async ({ page }) => {
    const input = page.locator('#inputFirstName');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue('Anastasiya');
  });

  test('should display Last Name field (empty by default)', async ({ page }) => {
    const input = page.locator('#inputLastName');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue('');
  });

  test('should display Occupation field with default value', async ({ page }) => {
    const input = page.locator('#inputOccupation');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue('Front End Web Developer');
  });

  test('should display Department select with Web Development selected', async ({ page }) => {
    const select = page.locator('select[selectpicker]').first();
    const selectedText = await select.evaluate(
      (el: HTMLSelectElement) => el.options[el.selectedIndex].text
    );
    expect(selectedText).toBe('Web Development');
  });

  test('should display Password field as password type', async ({ page }) => {
    const input = page.locator('#inputPassword');
    await expect(input).toBeAttached();
    await expect(input).toHaveAttribute('type', 'password');
    const valueLength = await input.evaluate((el: HTMLInputElement) => el.value.length);
    expect(valueLength).toBeGreaterThan(0);
  });

  test('should display Confirm Password field', async ({ page }) => {
    const input = page.locator('#inputConfirmPassword');
    await expect(input).toBeAttached();
    await expect(input).toHaveAttribute('type', 'password');
  });

  test('should display Email field with default value', async ({ page }) => {
    const input = page.locator('#inputEmail3');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue('contact@akveo.com');
  });

  test('should display Phone field with default value', async ({ page }) => {
    const input = page.locator('#inputPhone');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue('+1 (23) 456 7890');
  });

  test('should display Office Location select with expected options', async ({ page }) => {
    const select = page.locator('select[selectpicker]').nth(1);
    await expect(select).toBeAttached();
    const optionTexts = await select.evaluate((el: HTMLSelectElement) =>
      Array.from(el.options).map(o => o.text)
    );
    const locations = ['San Francisco', 'London', 'Minsk', 'Tokio'];
    for (const loc of locations) {
      expect(optionTexts).toContain(loc);
    }
  });

  test('should display Room field with default value', async ({ page }) => {
    const input = page.locator('#inputRoom');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue('303');
  });

  test('should display 4 connected social links', async ({ page }) => {
    const connectedLinks = page.locator('.sn-link.connected');
    await expect(connectedLinks).toHaveCount(4);
  });

  test('should have correct hrefs on connected social links', async ({ page }) => {
    const expectedLinks = [
      { name: 'Facebook', href: 'https://www.facebook.com/akveo/' },
      { name: 'Twitter', href: 'https://twitter.com/akveo_inc' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/company/akveo' },
      { name: 'GitHub', href: 'https://github.com/akveo' },
    ];
    for (const link of expectedLinks) {
      const el = page.locator('.sn-link.connected').filter({ hasText: link.name });
      await expect(el).toHaveAttribute('href', link.href);
    }
  });

  test('should display 4 unconnected social links', async ({ page }) => {
    const unconnectedLinks = page.locator('.sn-link:not(.connected)');
    await expect(unconnectedLinks).toHaveCount(4);
    const expectedNames = ['Google', 'StackOverflow', 'Dribbble', 'Behance'];
    for (const name of expectedNames) {
      await expect(
        page.locator('.sn-link:not(.connected)').filter({ hasText: name })
      ).toBeAttached();
    }
  });

  test('should open modal when clicking an unconnected social link', async ({ page }) => {
    const googleLink = page.locator('.sn-link:not(.connected)').filter({ hasText: 'Google' });
    await googleLink.click();
    const modal = page.locator('.modal-dialog');
    await expect(modal).toBeVisible({ timeout: 5000 });
    await expect(modal.locator('input[type="text"]')).toBeVisible();
    await expect(modal.locator('button', { hasText: 'Save changes' })).toBeVisible();
  });

  test('should display 6 toggle switches', async ({ page }) => {
    const switches = page.locator('.bootstrap-switch input[type="checkbox"]');
    await expect(switches).toHaveCount(6);
  });

  test('should have correct default toggle switch states', async ({ page }) => {
    const expectedStates = [true, true, false, true, true, false];
    const switches = page.locator('.bootstrap-switch input[type="checkbox"]');
    for (let i = 0; i < expectedStates.length; i++) {
      const isChecked = await switches.nth(i).isChecked();
      expect(isChecked).toBe(expectedStates[i]);
    }
  });

  test('should display the Update Profile button', async ({ page }) => {
    const button = page.locator('button', { hasText: 'Update Profile' });
    await expect(button).toBeAttached();
  });

  test('should display the profile picture', async ({ page }) => {
    const img = page.locator('.userpic img');
    await expect(img).toBeVisible();
    const src = await img.getAttribute('src');
    expect(src).toContain('Nasta');
  });

  test('should have a close icon on connected social links on hover', async ({ page }) => {
    const facebookLink = page.locator('.sn-link.connected').filter({ hasText: 'Facebook' });
    const closeIcon = facebookLink.locator('.sn-link-close');
    await expect(closeIcon).toBeAttached();
    await facebookLink.hover();
    await expect(closeIcon).toBeVisible();
  });
});
