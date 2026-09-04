import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SMART_TABLE_DATA, SMART_TABLE_PAGE_SIZES, SMART_TABLE_PAGE_SIZE, TableRow } from '../../tables.data';
import { filterRows, nextSortDirection, paginate, SortDirection, sortRows } from '../../smart-table.utils';
import { StPaginationComponent } from '../st-pagination/st-pagination.component';

@Component({
  selector: 'app-smart-table',
  standalone: true,
  imports: [FormsModule, StPaginationComponent],
  templateUrl: './smart-table.component.html',
})
export class SmartTableComponent {
  readonly rows = input<TableRow[]>(SMART_TABLE_DATA);
  readonly searchColumns: { key: keyof TableRow; label: string }[] = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'age', label: 'Age' },
  ];
  readonly pageSize = signal(SMART_TABLE_PAGE_SIZE);
  readonly sortKey = signal<keyof TableRow | null>('id');
  readonly sortDir = signal<SortDirection>('asc');
  readonly filters = signal<Partial<Record<keyof TableRow, string>>>({});
  readonly page = signal(1);
  readonly pageSizes = SMART_TABLE_PAGE_SIZES;
  readonly filtered = computed(() => filterRows(this.rows(), this.filters()));
  readonly sorted = computed(() => sortRows(this.filtered(), this.sortKey(), this.sortDir()));
  readonly pageRows = computed(() => paginate(this.sorted(), this.page(), this.pageSize()));

  sort(key: keyof TableRow): void {
    if (this.sortKey() === key) {
      const direction = nextSortDirection(this.sortDir());
      this.sortDir.set(direction);
      if (!direction) this.sortKey.set(null);
    } else {
      this.sortKey.set(key);
      this.sortDir.set('asc');
    }
    this.page.set(1);
  }

  setFilter(key: keyof TableRow, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filters.update((filters) => ({ ...filters, [key]: value }));
    this.page.set(1);
  }

  setPageSize(value: number): void {
    this.pageSize.set(value);
    this.page.set(1);
  }
}
