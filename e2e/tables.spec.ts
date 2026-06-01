import { test, expect } from '@playwright/test';

test.describe('Tables — Basic Tables page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/#/tables/basic');
    await page.waitForSelector('.widgets');
  });

  test('should load the basic tables page with six panels', async ({ page }) => {
    const panels = page.locator('.panel');
    await expect(panels).toHaveCount(6);
  });

  test('should display the Hover Rows panel with browser metrics', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Hover Rows' });
    await expect(panel).toBeVisible();

    const table = panel.locator('table.table-hover');
    await expect(table).toBeVisible();

    const headerRow = table.locator('thead tr');
    await expect(headerRow).toHaveCount(1);
    await expect(headerRow.locator('th', { hasText: 'Browser' })).toBeVisible();
    await expect(headerRow.locator('th', { hasText: 'Visits' })).toBeVisible();
    await expect(headerRow.locator('th', { hasText: 'Purchases' })).toBeVisible();

    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(5);

    await expect(rows.nth(0)).toContainText('Google Chrome');
    await expect(rows.nth(0)).toContainText('10,392');
    await expect(rows.nth(1)).toContainText('Mozilla Firefox');
    await expect(rows.nth(2)).toContainText('Internet Explorer');
    await expect(rows.nth(3)).toContainText('Safari');
    await expect(rows.nth(4)).toContainText('Opera');

    // Check up/down arrows
    const firstRowArrows = rows.nth(0).locator('i.icon-up');
    expect(await firstRowArrows.count()).toBeGreaterThanOrEqual(1);
  });

  test('should display the Bordered Table panel', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Bordered Table' });
    await expect(panel).toBeVisible();

    const table = panel.locator('table.table-bordered');
    await expect(table).toBeVisible();

    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(5);

    await expect(rows.nth(0)).toContainText('Google Chrome');
    await expect(rows.nth(0)).toContainText('45%');
  });

  test('should display the Condensed Table panel with people data', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Condensed Table' });
    await expect(panel).toBeVisible();

    const table = panel.locator('table.table-condensed');
    await expect(table).toBeVisible();

    // Check header columns
    const headers = table.locator('thead th');
    await expect(headers.nth(1)).toHaveText('First Name');
    await expect(headers.nth(2)).toHaveText('Last Name');
    await expect(headers.nth(3)).toHaveText('Username');
    await expect(headers.nth(4)).toHaveText('Email');
    await expect(headers.nth(5)).toHaveText('Status');

    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(5);

    // Check first person
    await expect(rows.nth(0)).toContainText('Mark');
    await expect(rows.nth(0)).toContainText('Otto');
    await expect(rows.nth(0)).toContainText('@mdo');

    // Check status buttons exist
    const statusButtons = table.locator('.status-button');
    await expect(statusButtons).toHaveCount(5);

    // Check email links
    const emailLinks = table.locator('a.email-link');
    await expect(emailLinks).toHaveCount(5);
    await expect(emailLinks.nth(0)).toHaveText('mdo@gmail.com');
  });

  test('should display the Striped Rows panel with many rows', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Striped Rows' });
    await expect(panel).toBeVisible();

    const table = panel.locator('table.table-striped');
    await expect(table).toBeVisible();

    const rows = table.locator('tbody tr');
    // smartTableData has 60 rows
    await expect(rows).toHaveCount(60);

    await expect(rows.nth(0)).toContainText('Mark');
    await expect(rows.nth(0)).toContainText('Otto');
    await expect(rows.nth(0)).toContainText('@mdo');
    await expect(rows.nth(0)).toContainText('mdo@gmail.com');
    await expect(rows.nth(0)).toContainText('28');
  });

  test('should display the Contextual Table with colored rows', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Contextual Table' });
    await expect(panel).toBeVisible();

    const table = panel.locator('table.table');
    await expect(table).toBeVisible();

    // Check contextual row classes
    await expect(table.locator('tr.primary')).toHaveCount(1);
    await expect(table.locator('tr.success')).toHaveCount(1);
    await expect(table.locator('tr.warning')).toHaveCount(1);
    await expect(table.locator('tr.danger')).toHaveCount(1);
    await expect(table.locator('tr.info')).toHaveCount(1);

    // Check data in primary row
    const primaryRow = table.locator('tr.primary');
    await expect(primaryRow).toContainText('Mark');
    await expect(primaryRow).toContainText('Otto');
    await expect(primaryRow).toContainText('@mdo');
    await expect(primaryRow).toContainText('mdo@gmail.com');
  });

  test('should display the Responsive Table panel', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Responsive Table' });
    await expect(panel).toBeVisible();

    const wrapper = panel.locator('.table-responsive');
    await expect(wrapper).toBeVisible();

    const table = wrapper.locator('table.table');
    await expect(table).toBeVisible();

    // 1 header row + 5 data rows
    const allRows = table.locator('tr');
    await expect(allRows).toHaveCount(6);

    await expect(allRows.nth(1)).toContainText('Mark');
    await expect(allRows.nth(5)).toContainText('Jack');
  });
});


test.describe('Tables — Smart Tables page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/#/tables/smart');
    await page.waitForSelector('.widgets');
  });

  test('should load the smart tables page with three panels', async ({ page }) => {
    const panels = page.locator('.panel');
    await expect(panels).toHaveCount(3);
  });

  test('should display the Editable Rows panel with users', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Editable Rows' });
    await expect(panel).toBeVisible();

    // "Add row" button
    const addButton = panel.locator('button', { hasText: 'Add row' });
    await expect(addButton).toBeVisible();
    await expect(addButton).toHaveClass(/btn-primary/);

    const table = panel.locator('table');
    await expect(table).toBeVisible();

    // Check header columns
    const headerCells = table.locator('tr').first().locator('td');
    await expect(headerCells.nth(1)).toHaveText('Name');
    await expect(headerCells.nth(2)).toHaveText('Status');
    await expect(headerCells.nth(3)).toHaveText('Group');
    await expect(headerCells.nth(4)).toHaveText('Actions');

    // Check editable rows (10 users)
    const editableRows = table.locator('tr.editable-row');
    await expect(editableRows).toHaveCount(10);

    // Check first user data
    await expect(editableRows.nth(0)).toContainText('Esther Vang');

    // Check Edit and Delete buttons
    const firstRowButtons = editableRows.nth(0).locator('.buttons');
    await expect(firstRowButtons.locator('button', { hasText: 'Edit' })).toBeVisible();
    await expect(firstRowButtons.locator('button', { hasText: 'Delete' })).toBeVisible();
  });

  test('should add a new user row via Add row button', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Editable Rows' });
    const table = panel.locator('table');

    const initialRows = await table.locator('tr.editable-row').count();

    const addButton = panel.locator('button', { hasText: 'Add row' });
    await addButton.click();

    const newRows = table.locator('tr.editable-row');
    await expect(newRows).toHaveCount(initialRows + 1);
  });

  test('should delete a user row via Delete button', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Editable Rows' });
    const table = panel.locator('table');

    const initialRows = await table.locator('tr.editable-row').count();

    const deleteButton = table.locator('tr.editable-row').first().locator('button', { hasText: 'Delete' });
    await deleteButton.click();

    const newRows = table.locator('tr.editable-row');
    await expect(newRows).toHaveCount(initialRows - 1);
  });

  test('should display the Editable Cells panel with sortable columns', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Editable Cells' });
    await expect(panel).toBeVisible();

    const table = panel.locator('table.table-hover');
    await expect(table).toBeVisible();

    // Check sortable header
    const sortableHeader = table.locator('tr.sortable');
    await expect(sortableHeader).toBeVisible();

    await expect(sortableHeader.locator('th', { hasText: '#' })).toBeVisible();
    await expect(sortableHeader.locator('th', { hasText: 'First Name' })).toBeVisible();
    await expect(sortableHeader.locator('th', { hasText: 'Last Name' })).toBeVisible();
    await expect(sortableHeader.locator('th', { hasText: 'Username' })).toBeVisible();
    await expect(sortableHeader.locator('th', { hasText: 'Email' })).toBeVisible();
    await expect(sortableHeader.locator('th', { hasText: 'Age' })).toBeVisible();

    // Check data rows
    const rows = table.locator('tbody tr');
    expect(await rows.count()).toBeGreaterThanOrEqual(1);

    // Check first row data
    await expect(rows.nth(0)).toContainText('Mark');
    await expect(rows.nth(0)).toContainText('Otto');
  });

  test('should display the Smart Table panel with search inputs', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Smart Table With Filtering, Sorting And Pagination' });
    await expect(panel).toBeVisible();

    // Check page size selector
    const pageSizeSelect = panel.locator('select.form-control');
    await expect(pageSizeSelect).toBeVisible();

    // Check search inputs
    const searchInputs = panel.locator('input.search-input');
    await expect(searchInputs).toHaveCount(5);

    await expect(panel.locator('input[placeholder="Search First Name"]')).toBeVisible();
    await expect(panel.locator('input[placeholder="Search Last Name"]')).toBeVisible();
    await expect(panel.locator('input[placeholder="Search Username"]')).toBeVisible();
    await expect(panel.locator('input[placeholder="Search Email"]')).toBeVisible();
    await expect(panel.locator('input[placeholder="Search Age"]')).toBeVisible();

    // Check sortable headers
    const table = panel.locator('table.table');
    const sortableRow = table.locator('tr.sortable');
    await expect(sortableRow).toBeVisible();

    // Check table has rows
    const dataRows = table.locator('tbody tr');
    expect(await dataRows.count()).toBeGreaterThanOrEqual(1);
  });

  test('should filter smart table by first name', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Smart Table With Filtering, Sorting And Pagination' });
    const table = panel.locator('table.table');

    const searchFirstName = panel.locator('input[placeholder="Search First Name"]');
    await searchFirstName.fill('Mark');

    // Wait for filtering to take effect
    await page.waitForTimeout(500);

    const dataRows = table.locator('tbody tr');
    const count = await dataRows.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // All visible rows should contain "Mark"
    for (let i = 0; i < count; i++) {
      await expect(dataRows.nth(i)).toContainText('Mark');
    }
  });

  test('should have pagination in the smart table', async ({ page }) => {
    const panel = page.locator('.panel', { hasText: 'Smart Table With Filtering, Sorting And Pagination' });

    // Check pagination exists in tfoot
    const pagination = panel.locator('tfoot');
    await expect(pagination).toBeVisible();
  });
});
