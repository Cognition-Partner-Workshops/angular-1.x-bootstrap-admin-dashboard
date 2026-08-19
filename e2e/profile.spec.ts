import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/#/profile');
  await expect(page.locator('.profile-page')).toBeVisible();
});

test('loads the profile page with completion progress', async ({ page }) => {
  await expect(page.locator('.profile-page')).toBeVisible();
  await expect(page.locator('.progress-info')).toHaveText('Your profile is 70% Complete');
  await expect(page.locator('.progress-bar')).toHaveCount(1);
  await expect(page.locator('.progress-bar')).toHaveAttribute('style', /width:\s*70%/);
});

test('shows all profile section headings', async ({ page }) => {
  const headings = page.locator('h3.with-line');

  await expect(headings).toHaveCount(5);
  for (const heading of [
    'General Information',
    'Change Password',
    'Contact Information',
    'Social Profiles',
    'Send Email Notifications',
  ]) {
    await expect(headings.filter({ hasText: heading })).toBeVisible();
  }
});

test('shows the profile picture block', async ({ page }) => {
  await page.locator('.userpic').hover();
  await expect(page.locator('.userpic img')).toBeVisible();
  await expect(page.locator('.userpic img')).toHaveAttribute('src', /Nasta\.png/);
  await expect(page.locator('a.change-userpic')).toHaveText('Change Profile Picture');
  await expect(page.locator('#uploadFile')).toHaveCount(1);
  await expect(page.locator('.userpic i.ion-ios-close-outline')).toBeVisible();
});

test('removes the profile picture', async ({ page }) => {
  const picture = page.locator('.userpic img');
  const removeIcon = page.locator('.userpic i.ion-ios-close-outline');

  await page.locator('.userpic').hover();
  await removeIcon.click();
  await expect(picture).toHaveAttribute('src', /no-photo\.png/);
  await expect(removeIcon).toHaveCount(0);
});

test('has the expected form defaults', async ({ page }) => {
  await expect(page.locator('#inputFirstName')).toHaveValue('Anastasiya');
  await expect(page.locator('#inputLastName')).toHaveValue('');
  await expect(page.locator('#inputOccupation')).toHaveValue('Front End Web Developer');
  await expect(page.locator('#inputPassword')).toHaveValue('12345678');
  await expect(page.locator('#inputConfirmPassword')).toHaveValue('');
  await expect(page.locator('#inputEmail3')).toHaveValue('contact@akveo.com');
  await expect(page.locator('#inputPhone')).toHaveValue('+1 (23) 456 7890');
  await expect(page.locator('#inputRoom')).toHaveValue('303');
});

test('allows editing profile fields', async ({ page }) => {
  await page.locator('#inputFirstName').fill('Anastasiya Updated');
  await expect(page.locator('#inputFirstName')).toHaveValue('Anastasiya Updated');

  await page.locator('#inputPassword').fill('new-password');
  await expect(page.locator('#inputPassword')).toHaveValue('new-password');
});

test('provides department and office location selects', async ({ page }) => {
  const selects = page.locator('select.form-control');
  const departmentOptions = selects.nth(0).locator('option:not([disabled])');
  const officeOptions = selects.nth(1).locator('option:not(.bs-title-option):not([disabled])');

  await expect(selects).toHaveCount(2);
  await expect(departmentOptions).toHaveText([
    'Web Development',
    'System Development',
    'Sales',
    'Human Resources',
  ]);
  await expect(officeOptions).toHaveText([
    'San Francisco',
    'London',
    'Minsk',
    'Tokio',
  ]);

  await selects.nth(0).selectOption({ label: 'System Development' });
  await expect(selects.nth(0).locator('option:checked')).toHaveText('System Development');
  await selects.nth(1).selectOption({ label: 'London' });
  await expect(selects.nth(1).locator('option:checked')).toHaveText('London');
});

test('renders connected and unconnected social profiles', async ({ page }) => {
  const links = page.locator('.social-profiles a.sn-link');
  const connectedLinks = page.locator('.social-profiles a.sn-link.connected');

  await expect(links).toHaveCount(8);
  for (const name of ['Facebook', 'Twitter', 'LinkedIn', 'GitHub']) {
    const link = links.filter({ hasText: name });

    await expect(link).toHaveClass(/connected/);
    await expect(link).toHaveAttribute('href', /.+/);
    await expect(link.locator('em.sn-link-close')).toHaveCount(1);
  }
  for (const name of ['Google', 'StackOverflow', 'Dribbble', 'Behance']) {
    await expect(links.filter({ hasText: name })).not.toHaveClass(/connected/);
  }
  await expect(connectedLinks).toHaveCount(4);
});

test('disconnects the Facebook profile', async ({ page }) => {
  const links = page.locator('.social-profiles a.sn-link');
  const facebook = links.filter({ hasText: 'Facebook' });

  await facebook.locator('em.sn-link-close').click();
  await expect(facebook).not.toHaveClass(/connected/);
  await expect(page.locator('.social-profiles a.sn-link.connected')).toHaveCount(3);
});

test('opens and saves a social profile modal', async ({ page }) => {
  const links = page.locator('.social-profiles a.sn-link');
  const google = links.filter({ hasText: 'Google' });
  const modal = page.locator('.modal');

  await google.click();
  await expect(modal).toBeVisible();
  await expect(modal.locator('.modal-title')).toHaveText('Add Account');
  const linkInput = modal.locator('input.form-control');
  await expect(linkInput).toHaveAttribute('placeholder', 'Link to Profile');
  await linkInput.fill('https://plus.google.com/test');
  await modal.locator('button').filter({ hasText: 'Save changes' }).click();
  await expect(modal).toBeHidden();
  await expect(google).toHaveClass(/connected/);
  await expect(google).toHaveAttribute('href', 'https://plus.google.com/test');
});

test('dismisses a social profile modal without connecting it', async ({ page }) => {
  const links = page.locator('.social-profiles a.sn-link');
  const stackOverflow = links.filter({ hasText: 'StackOverflow' });
  const modal = page.locator('.modal');

  await stackOverflow.click();
  await expect(modal).toBeVisible();
  await modal.locator('.modal-header button.close').click();
  await expect(modal).toBeHidden();
  await expect(stackOverflow).not.toHaveClass(/connected/);
});

test('handles email notification switches', async ({ page }) => {
  const switches = page.locator('.notification .switch-container');
  const checkedState = async (index: number) =>
    switches.nth(index).locator('input[type="checkbox"]').evaluate(
      (element) => (element as HTMLInputElement).checked,
    );

  await expect(switches).toHaveCount(6);
  for (const [index, expected] of [true, true, false, true, true, false].entries()) {
    await expect.poll(() => checkedState(index)).toBe(expected);
  }

  await switches.nth(2).click();
  await expect.poll(() => checkedState(2)).toBe(true);
  await switches.nth(2).click();
  await expect.poll(() => checkedState(2)).toBe(false);
});

test('shows the update profile button', async ({ page }) => {
  await expect(page.locator('button.save-profile')).toBeVisible();
  await expect(page.locator('button.save-profile')).toContainText('Update Profile');
});
