import { test, expect } from '@playwright/test';

test.describe('Basic Tables', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/tables/basic');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  test('should navigate to Basic Tables page', async ({ page }) => {
    await expect(page).toHaveURL(/.*#\/tables\/basic/);
    const heading = page.locator('h1', { hasText: 'Basic Tables' });
    await expect(heading).toBeVisible();
  });

  test('should display all six panel sections', async ({ page }) => {
    const panels = [
      'Hover Rows',
      'Bordered Table',
      'Condensed Table',
      'Striped Rows',
      'Contextual Table',
      'Responsive Table',
    ];
    for (const title of panels) {
      const heading = page.locator('h3', { hasText: title });
      await expect(heading).toBeVisible();
    }
  });

  test('Hover Rows table should display 5 browser rows with correct data', async ({ page }) => {
    const hoverPanel = page.locator('.table-hover').first();
    const rows = hoverPanel.locator('tbody tr');
    await expect(rows).toHaveCount(5);

    const browsers = ['Google Chrome', 'Mozilla Firefox', 'Internet Explorer', 'Safari', 'Opera'];
    for (const browser of browsers) {
      const row = rows.filter({ hasText: browser });
      await expect(row).toHaveCount(1);
    }

    const chromeRow = rows.filter({ hasText: 'Google Chrome' });
    await expect(chromeRow.locator('td').nth(2)).toHaveText('10,392');
    await expect(chromeRow.locator('td').nth(4)).toHaveText('4,214');
    await expect(chromeRow.locator('td').nth(6)).toHaveText('45%');
  });

  test('Hover Rows table should show browser icons', async ({ page }) => {
    const hoverPanel = page.locator('.table-hover').first();
    const images = hoverPanel.locator('tbody img');
    await expect(images).toHaveCount(5);
    for (let i = 0; i < 5; i++) {
      await expect(images.nth(i)).toHaveAttribute('width', '20');
      await expect(images.nth(i)).toHaveAttribute('height', '20');
    }
  });

  test('Bordered Table should display 5 browser rows', async ({ page }) => {
    const borderedTable = page.locator('.table-bordered').first();
    const rows = borderedTable.locator('tbody tr');
    await expect(rows).toHaveCount(5);

    const operaRow = rows.filter({ hasText: 'Opera' });
    await expect(operaRow.locator('td').nth(2)).toHaveText('1,833');
    await expect(operaRow.locator('td').nth(3)).toHaveText('83');
    await expect(operaRow.locator('td').nth(4)).toHaveText('5%');
  });

  test('Bordered Table headers should include Browser, Visits, Purchases, %', async ({ page }) => {
    const borderedTable = page.locator('.table-bordered').first();
    const headers = borderedTable.locator('thead th');
    await expect(headers.filter({ hasText: 'Browser' })).toHaveCount(1);
    await expect(headers.filter({ hasText: 'Visits' })).toHaveCount(1);
    await expect(headers.filter({ hasText: 'Purchases' })).toHaveCount(1);
    await expect(headers.filter({ hasText: '%' })).toHaveCount(1);
  });

  test('Condensed Table should display 5 people rows with status buttons', async ({ page }) => {
    const condensedTable = page.locator('.table-condensed');
    const rows = condensedTable.locator('tbody tr');
    await expect(rows).toHaveCount(5);

    const statuses = ['info', 'primary', 'success', 'danger', 'warning'];
    const buttons = condensedTable.locator('tbody button');
    await expect(buttons).toHaveCount(5);
    for (const status of statuses) {
      const btn = buttons.filter({ hasText: status });
      await expect(btn).toHaveCount(1);
    }
  });

  test('Condensed Table should show email links', async ({ page }) => {
    const condensedTable = page.locator('.table-condensed');
    const emailLinks = condensedTable.locator('a.email-link');
    await expect(emailLinks).toHaveCount(5);

    await expect(emailLinks.first()).toHaveAttribute('href', 'mailto:mdo@gmail.com');
    await expect(emailLinks.first()).toHaveText('mdo@gmail.com');
  });

  test('Striped Rows table should display all smartTableData rows', async ({ page }) => {
    const stripedTable = page.locator('.table-striped');
    const rows = stripedTable.locator('tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(5);

    const firstRow = rows.first();
    await expect(firstRow.locator('td').first()).toHaveText('1');
    await expect(firstRow.locator('td').nth(1)).toHaveText('Mark');
    await expect(firstRow.locator('td').nth(2)).toHaveText('Otto');
    await expect(firstRow.locator('td').nth(3)).toHaveText('@mdo');
  });

  test('Striped Rows table headers should include #, First Name, Last Name, Username, Email, Age', async ({ page }) => {
    const stripedTable = page.locator('.table-striped');
    const headers = stripedTable.locator('thead th');
    const expectedHeaders = ['#', 'First Name', 'Last Name', 'Username', 'Email', 'Age'];
    await expect(headers).toHaveCount(expectedHeaders.length);
    for (let i = 0; i < expectedHeaders.length; i++) {
      await expect(headers.nth(i)).toHaveText(expectedHeaders[i]);
    }
  });

  test('Contextual Table should display 5 rows with contextual classes', async ({ page }) => {
    const panelHeading = page.locator('h3', { hasText: 'Contextual Table' });
    const panel = panelHeading.locator('xpath=ancestor::div[contains(@class,"panel")]');
    const table = panel.locator('table');
    const dataRows = table.locator('tr.primary, tr.success, tr.warning, tr.danger, tr.info');
    await expect(dataRows).toHaveCount(5);

    const primaryRow = table.locator('tr.primary');
    await expect(primaryRow.locator('td').nth(1)).toHaveText('Mark');
    await expect(primaryRow.locator('td').nth(2)).toHaveText('Otto');
  });

  test('Responsive Table should display 5 data rows', async ({ page }) => {
    const responsiveWrapper = page.locator('.table-responsive');
    const table = responsiveWrapper.locator('table');
    const allRows = table.locator('tr');
    const headerRow = allRows.first();
    await expect(headerRow.locator('th')).toHaveCount(6);

    const dataRows = allRows.filter({ has: page.locator('td') });
    await expect(dataRows).toHaveCount(5);

    const jackRow = dataRows.filter({ hasText: 'Sparrow' });
    await expect(jackRow.locator('td').nth(4)).toHaveText('jack@yandex.ru');
  });
});

test.describe('Smart Tables', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/tables/smart');
    await page.waitForSelector('.widgets', { timeout: 15000 });
  });

  test('should navigate to Smart Tables page', async ({ page }) => {
    await expect(page).toHaveURL(/.*#\/tables\/smart/);
    const heading = page.locator('h1', { hasText: 'Smart Tables' });
    await expect(heading).toBeVisible();
  });

  test('should display all three panel sections', async ({ page }) => {
    const panels = [
      'Editable Rows',
      'Editable Cells',
      'Smart Table With Filtering, Sorting And Pagination',
    ];
    for (const title of panels) {
      const heading = page.locator('h3', { hasText: title });
      await expect(heading).toBeVisible();
    }
  });

  test('Editable Rows table should display user rows with names', async ({ page }) => {
    const editableRowTable = page.locator('.add-row-editable-table').locator('..').locator('table');
    const rows = editableRowTable.locator('tr.editable-row');
    await expect(rows).toHaveCount(10);

    const names = [
      'Esther Vang', 'Leah Freeman', 'Mathews Simpson', 'Buckley Hopkins',
      'Buckley Schwartz', 'Mathews Hopkins', 'Leah Vang', 'Vang Schwartz',
      'Hopkin Esther', 'Mathews Schwartz'
    ];
    for (const name of names) {
      const row = rows.filter({ hasText: name });
      await expect(row).toHaveCount(1);
    }
  });

  test('Editable Rows should have Edit and Delete buttons for each row', async ({ page }) => {
    const editableRowTable = page.locator('.add-row-editable-table').locator('..').locator('table');
    const rows = editableRowTable.locator('tr.editable-row');

    const editButtons = rows.locator('button', { hasText: 'Edit' });
    await expect(editButtons).toHaveCount(10);

    const deleteButtons = rows.locator('button', { hasText: 'Delete' });
    await expect(deleteButtons).toHaveCount(10);
  });

  test('Editable Rows should have an Add row button', async ({ page }) => {
    const addButton = page.locator('.add-row-editable-table button', { hasText: 'Add row' });
    await expect(addButton).toBeVisible();
  });

  test('Editable Rows table headers should include Name, Status, Group, Actions', async ({ page }) => {
    const editableRowTable = page.locator('.add-row-editable-table').locator('..').locator('table');
    const headerCells = editableRowTable.locator('tr').first().locator('td');
    await expect(headerCells.nth(1)).toHaveText('Name');
    await expect(headerCells.nth(2)).toHaveText('Status');
    await expect(headerCells.nth(3)).toHaveText('Group');
    await expect(headerCells.nth(4)).toHaveText('Actions');
  });

  test('Editable Cells table should display data rows with sortable headers', async ({ page }) => {
    const editableCellsPanel = page.locator('h3', { hasText: 'Editable Cells' }).locator('..').locator('..');
    const table = editableCellsPanel.locator('table');
    const headerRow = table.locator('thead tr.sortable');
    await expect(headerRow).toBeVisible();

    const sortableHeaders = headerRow.locator('th');
    await expect(sortableHeaders).toHaveCount(6);

    const expectedHeaders = ['#', 'First Name', 'Last Name', 'Username', 'Email', 'Age'];
    for (let i = 0; i < expectedHeaders.length; i++) {
      await expect(sortableHeaders.nth(i)).toHaveText(expectedHeaders[i]);
    }

    const rows = table.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    expect(rowCount).toBeLessThanOrEqual(12);
  });

  test('Editable Cells should have pagination', async ({ page }) => {
    const editableCellsPanel = page.locator('h3', { hasText: 'Editable Cells' }).locator('..').locator('..');
    const pagination = editableCellsPanel.locator('tfoot [st-pagination]');
    await expect(pagination).toBeAttached();
  });

  test('Smart Table should display "Rows on page" select dropdown', async ({ page }) => {
    const smartPanel = page.locator('h3', { hasText: 'Smart Table With Filtering, Sorting And Pagination' }).locator('..').locator('..');
    const label = smartPanel.locator('label', { hasText: 'Rows on page' });
    await expect(label).toBeVisible();

    const select = smartPanel.locator('select');
    await expect(select).toBeAttached();

    const selectedValue = await select.evaluate((el: HTMLSelectElement) => el.options[el.selectedIndex]?.text);
    expect(selectedValue).toBe('10');
  });

  test('Smart Table should have search inputs for each column', async ({ page }) => {
    const smartPanel = page.locator('h3', { hasText: 'Smart Table With Filtering, Sorting And Pagination' }).locator('..').locator('..');

    const searchInputs = smartPanel.locator('input.search-input');
    await expect(searchInputs).toHaveCount(5);

    const placeholders = [
      'Search First Name',
      'Search Last Name',
      'Search Username',
      'Search Email',
      'Search Age',
    ];
    for (const placeholder of placeholders) {
      const input = smartPanel.locator(`input[placeholder="${placeholder}"]`);
      await expect(input).toBeAttached();
    }
  });

  test('Smart Table should display sortable column headers', async ({ page }) => {
    const smartPanel = page.locator('h3', { hasText: 'Smart Table With Filtering, Sorting And Pagination' }).locator('..').locator('..');
    const headerRow = smartPanel.locator('thead tr.sortable');
    await expect(headerRow).toBeVisible();

    const headers = headerRow.locator('th');
    await expect(headers).toHaveCount(6);
  });

  test('Smart Table should display paginated rows (default 10)', async ({ page }) => {
    const smartPanel = page.locator('h3', { hasText: 'Smart Table With Filtering, Sorting And Pagination' }).locator('..').locator('..');
    const table = smartPanel.locator('table');
    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(10);
  });

  test('Smart Table should have pagination controls', async ({ page }) => {
    const smartPanel = page.locator('h3', { hasText: 'Smart Table With Filtering, Sorting And Pagination' }).locator('..').locator('..');
    const pagination = smartPanel.locator('tfoot [st-pagination]');
    await expect(pagination).toBeAttached();
  });

  test('Smart Table first row should contain Mark Otto data', async ({ page }) => {
    const smartPanel = page.locator('h3', { hasText: 'Smart Table With Filtering, Sorting And Pagination' }).locator('..').locator('..');
    const table = smartPanel.locator('table');
    const firstRow = table.locator('tbody tr').first();

    await expect(firstRow.locator('td').nth(0)).toHaveText('1');
    await expect(firstRow.locator('td').nth(1)).toHaveText('Mark');
    await expect(firstRow.locator('td').nth(2)).toHaveText('Otto');
    await expect(firstRow.locator('td').nth(3)).toHaveText('@mdo');
    await expect(firstRow.locator('td').nth(5)).toHaveText('28');
  });

  test('Smart Table email cells should be clickable mailto links', async ({ page }) => {
    const smartPanel = page.locator('h3', { hasText: 'Smart Table With Filtering, Sorting And Pagination' }).locator('..').locator('..');
    const emailLinks = smartPanel.locator('tbody a.email-link');
    const count = await emailLinks.count();
    expect(count).toBe(10);

    await expect(emailLinks.first()).toHaveAttribute('href', /^mailto:/);
  });
});

test.describe('Tables Navigation', () => {
  test('should redirect /tables to /tables/basic', async ({ page }) => {
    await page.goto('/#/tables');
    await page.waitForSelector('.widgets', { timeout: 15000 });
    await expect(page).toHaveURL(/.*#\/tables\/basic/);
  });

  test('sidebar should show Tables menu item', async ({ page }) => {
    await page.goto('/#/tables/basic');
    await page.waitForSelector('.widgets', { timeout: 15000 });
    const tablesLink = page.locator('aside a.al-sidebar-list-link', { hasText: 'Tables' });
    await expect(tablesLink).toBeVisible();
  });
});
