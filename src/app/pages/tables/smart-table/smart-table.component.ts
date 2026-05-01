import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

interface TableRow {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
}

@Component({
  selector: 'app-smart-table',
  standalone: true,
  imports: [CommonModule, FormsModule, BaPanelComponent],
  templateUrl: './smart-table.component.html',
  styleUrl: './smart-table.component.scss',
})
export class SmartTableComponent {
  searchQuery = '';
  sortColumn: keyof TableRow = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  pageSize = 10;

  allData: TableRow[] = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo', email: 'mdo@gmail.com', age: 28 },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat', email: 'fat@yandex.ru', age: 45 },
    { id: 3, firstName: 'Larry', lastName: 'Bird', username: '@twitter', email: 'twitter@outlook.com', age: 18 },
    { id: 4, firstName: 'John', lastName: 'Snow', username: '@snow', email: 'snow@gmail.com', age: 20 },
    { id: 5, firstName: 'Jack', lastName: 'Sparrow', username: '@jack', email: 'jack@yandex.ru', age: 30 },
    { id: 6, firstName: 'Ann', lastName: 'Smith', username: '@ann', email: 'ann@gmail.com', age: 21 },
    { id: 7, firstName: 'Barbara', lastName: 'Black', username: '@barbara', email: 'barbara@yandex.ru', age: 43 },
    { id: 8, firstName: 'Sevan', lastName: 'Bagrat', username: '@sevan', email: 'sevan@outlook.com', age: 13 },
    { id: 9, firstName: 'Ruben', lastName: 'Vardan', username: '@ruben', email: 'ruben@gmail.com', age: 22 },
    { id: 10, firstName: 'Karen', lastName: 'Sevan', username: '@karen', email: 'karen@yandex.ru', age: 33 },
    { id: 11, firstName: 'Mark', lastName: 'Otto', username: '@mark', email: 'mark@gmail.com', age: 38 },
    { id: 12, firstName: 'Jacob', lastName: 'Thornton', username: '@jacob', email: 'jacob@yandex.ru', age: 48 },
    { id: 13, firstName: 'Haik', lastName: 'Hakob', username: '@haik', email: 'haik@outlook.com', age: 48 },
    { id: 14, firstName: 'Garegin', lastName: 'Jirair', username: '@garegin', email: 'garegin@gmail.com', age: 40 },
    { id: 15, firstName: 'Krikor', lastName: 'Bedros', username: '@krikor', email: 'krikor@yandex.ru', age: 32 },
  ];

  get filteredData(): TableRow[] {
    let data = this.allData;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      data = data.filter(
        (r) =>
          r.firstName.toLowerCase().includes(q) ||
          r.lastName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.username.toLowerCase().includes(q)
      );
    }
    data = [...data].sort((a, b) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];
      const cmp = valA < valB ? -1 : valA > valB ? 1 : 0;
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
    return data;
  }

  get pagedData(): TableRow[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  sort(column: keyof TableRow): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return 'fa fa-sort';
    return this.sortDirection === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
  }
}
