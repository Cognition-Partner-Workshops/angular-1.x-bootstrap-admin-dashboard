import { displayedPages, filterRows, nextSortDirection, pageCount, paginate, sortRows } from './smart-table.utils';

describe('smart table utilities', () => {
  const rows = [{ id: 2, name: 'b' }, { id: 1, name: 'a' }, { id: 3, name: 'a' }];

  it('sorts stably and numerically', () => {
    expect(sortRows(rows, 'id', 'asc').map((row) => row.id)).toEqual([1, 2, 3]);
    expect(sortRows(rows, 'name', 'asc').map((row) => row.id)).toEqual([1, 3, 2]);
    expect(sortRows(rows, null, null)).not.toBe(rows);
  });

  it('filters using case-insensitive AND substring matching', () => {
    expect(filterRows(rows, { name: ' A ' })).toEqual([{ id: 1, name: 'a' }, { id: 3, name: 'a' }]);
    expect(filterRows(rows, { name: 'a', id: '3' })).toEqual([{ id: 3, name: 'a' }]);
  });

  it('paginates and counts pages', () => {
    expect(paginate([1, 2, 3, 4, 5], 2, 2)).toEqual([3, 4]);
    expect(pageCount(36, 12)).toBe(3);
  });

  it('cycles sort directions', () => {
    expect(nextSortDirection('asc')).toBe('desc');
    expect(nextSortDirection('desc')).toBeNull();
    expect(nextSortDirection(null)).toBe('asc');
  });

  it('creates a centered page window clamped to total', () => {
    expect(displayedPages(5, 10)).toEqual([3, 4, 5, 6, 7]);
    expect(displayedPages(10, 10)).toEqual([6, 7, 8, 9, 10]);
  });
});
