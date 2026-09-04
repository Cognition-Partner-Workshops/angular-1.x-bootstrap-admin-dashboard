import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoFocusDirective } from '../../../../theme';
import { EDITABLE_TABLE_DATA, TableRow } from '../../tables.data';
import { nextSortDirection, paginate, SortDirection, sortRows } from '../../smart-table.utils';
import { StPaginationComponent } from '../st-pagination/st-pagination.component';

type EditableField = 'firstName' | 'lastName' | 'username' | 'age';

@Component({
  selector: 'app-editable-table',
  standalone: true,
  imports: [FormsModule, AutoFocusDirective, StPaginationComponent],
  templateUrl: './editable-table.component.html',
})
export class EditableTableComponent {
  readonly rows = input<TableRow[]>(EDITABLE_TABLE_DATA);
  readonly data = linkedSignal(() => this.rows().map((row) => ({ ...row })));
  readonly columns: { key: keyof TableRow; label: string }[] = [
    { key: 'id', label: '#' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'age', label: 'Age' },
  ];
  readonly editableFields: EditableField[] = ['firstName', 'lastName', 'username'];
  readonly sortKey = signal<keyof TableRow | null>('id');
  readonly sortDir = signal<SortDirection>('asc');
  readonly page = signal(1);
  readonly editing = signal<{ row: TableRow; field: EditableField } | null>(null);
  draft = '';
  readonly sorted = computed(() => sortRows(this.data(), this.sortKey(), this.sortDir()));
  readonly pageRows = computed(() => paginate(this.sorted(), this.page(), 12));

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

  startEdit(row: TableRow, field: EditableField): void {
    this.editing.set({ row, field });
    this.draft = row[field];
  }

  save(): void {
    const current = this.editing();
    if (current) {
      this.data.update((rows) =>
        rows.map((row) => (row === current.row ? { ...row, [current.field]: this.draft } : row)),
      );
    }
    this.editing.set(null);
  }

  cancel(): void {
    this.editing.set(null);
  }

  display(row: TableRow, field: EditableField): string {
    return row[field];
  }
}
