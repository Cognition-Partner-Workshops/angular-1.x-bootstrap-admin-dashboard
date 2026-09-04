export type SortDirection = 'asc' | 'desc' | null;

function numericValue(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) return Number(value);
  return undefined;
}

export function sortRows<T>(rows: T[], key: keyof T | null, dir: SortDirection): T[] {
  if (!key || !dir) return [...rows];
  return rows
    .map((row, index) => ({ row, index }))
    .sort((a, b) => {
      const left = a.row[key];
      const right = b.row[key];
      const leftNumber = numericValue(left);
      const rightNumber = numericValue(right);
      let result: number;
      if (leftNumber !== undefined && rightNumber !== undefined) {
        result = leftNumber - rightNumber;
      } else {
        result = String(left).localeCompare(String(right));
      }
      return result === 0 ? a.index - b.index : dir === 'asc' ? result : -result;
    })
    .map(({ row }) => row);
}

export function filterRows<T>(rows: T[], filters: Partial<Record<keyof T, string>>): T[] {
  return rows.filter((row) =>
    Object.entries(filters).every(([key, value]) => {
      const query = typeof value === 'string' ? value.trim().toLowerCase() : '';
      return !query || String(row[key as keyof T]).toLowerCase().includes(query);
    }),
  );
}

export function paginate<T>(rows: T[], page: number, pageSize: number): T[] {
  if (pageSize <= 0) return [];
  return rows.slice(Math.max(0, page - 1) * pageSize, Math.max(0, page) * pageSize);
}

export function pageCount(total: number, pageSize: number): number {
  return pageSize > 0 ? Math.ceil(total / pageSize) : 0;
}

export function nextSortDirection(current: SortDirection): SortDirection {
  return current === 'asc' ? 'desc' : current === 'desc' ? null : 'asc';
}

export function displayedPages(current: number, total: number, displayed = 5): number[] {
  if (total <= 0 || displayed <= 0) return [];
  const count = Math.min(displayed, total);
  const half = Math.floor(displayed / 2);
  const start = Math.max(1, Math.min(current - half, total - count + 1));
  return Array.from({ length: count }, (_, index) => start + index);
}
