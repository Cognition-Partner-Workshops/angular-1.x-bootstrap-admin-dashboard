import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner';
import { EmptyStateComponent } from '../empty-state';
import { ErrorStateComponent } from '../error-state';

export interface TableColumn<T = unknown> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  formatter?: (value: unknown, row: T) => string;
}

export interface SortState {
  column: string;
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, EmptyStateComponent, ErrorStateComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent<T extends Record<string, unknown>> implements OnChanges {
  Math = Math;

  @Input() columns: TableColumn<T>[] = [];
  @Input() data: T[] = [];
  @Input() loading = false;
  @Input() error = '';
  @Input() emptyMessage = 'No data available';
  @Input() sortState: SortState | null = null;
  @Input() pagination: PaginationState | null = null;
  @Input() selectable = false;
  @Input() rowKey = 'id';

  Math = Math;

  @Output() sortChange = new EventEmitter<SortState>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() rowClick = new EventEmitter<T>();
  @Output() selectionChange = new EventEmitter<T[]>();
  @Output() retryClick = new EventEmitter<void>();

  selectedRows = new Set<string>();
  allSelected = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateAllSelectedState();
    }
  }

  onSort(column: TableColumn<T>): void {
    if (!column.sortable) return;

    const newDirection: 'asc' | 'desc' =
      this.sortState?.column === column.key && this.sortState?.direction === 'asc'
        ? 'desc'
        : 'asc';

    this.sortChange.emit({ column: column.key, direction: newDirection });
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  onRowClick(row: T): void {
    this.rowClick.emit(row);
  }

  onRetry(): void {
    this.retryClick.emit();
  }

  toggleRowSelection(row: T): void {
    const key = String(row[this.rowKey]);
    if (this.selectedRows.has(key)) {
      this.selectedRows.delete(key);
    } else {
      this.selectedRows.add(key);
    }
    this.updateAllSelectedState();
    this.emitSelectionChange();
  }

  toggleAllSelection(): void {
    if (this.allSelected) {
      this.selectedRows.clear();
    } else {
      this.data.forEach(row => {
        this.selectedRows.add(String(row[this.rowKey]));
      });
    }
    this.updateAllSelectedState();
    this.emitSelectionChange();
  }

  isRowSelected(row: T): boolean {
    return this.selectedRows.has(String(row[this.rowKey]));
  }

  getCellValue(row: T, column: TableColumn<T>): string {
    const value = row[column.key];
    if (column.formatter) {
      return column.formatter(value, row);
    }
    return String(value ?? '');
  }

  getSortIcon(column: TableColumn<T>): string {
    if (!column.sortable) return '';
    if (this.sortState?.column !== column.key) return '-';
    return this.sortState.direction === 'asc' ? '^' : 'v';
  }

  get totalPages(): number {
    if (!this.pagination) return 1;
    return Math.ceil(this.pagination.total / this.pagination.pageSize);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages;
    const current = this.pagination?.page || 1;
    const maxVisible = 5;

    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    const end = Math.min(total, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  trackByRowKey(_index: number, row: T): string {
    return String(row[this.rowKey]);
  }

  trackByColumnKey(_index: number, column: TableColumn<T>): string {
    return column.key;
  }

  private updateAllSelectedState(): void {
    this.allSelected = this.data.length > 0 && this.data.every(row =>
      this.selectedRows.has(String(row[this.rowKey]))
    );
  }

  private emitSelectionChange(): void {
    const selected = this.data.filter(row =>
      this.selectedRows.has(String(row[this.rowKey]))
    );
    this.selectionChange.emit(selected);
  }
}
