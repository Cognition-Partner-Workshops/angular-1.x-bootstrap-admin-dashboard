import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

interface TableRow {
  name: string;
  email: string;
  age: number;
  city: string;
}

@Component({
  selector: 'app-smart-tables',
  standalone: true,
  imports: [CommonModule, FormsModule, PanelComponent],
  templateUrl: './smart-tables.component.html',
})
export class SmartTablesComponent {
  searchText = '';
  sortColumn = '';
  sortDirection = 1;

  data: TableRow[] = [
    { name: 'Mark Otto', email: 'mark@email.com', age: 28, city: 'New York' },
    { name: 'Jacob Thornton', email: 'jacob@email.com', age: 32, city: 'Los Angeles' },
    { name: 'Larry Bird', email: 'larry@email.com', age: 45, city: 'Chicago' },
    { name: 'John Smith', email: 'john@email.com', age: 25, city: 'Houston' },
    { name: 'Peter Parker', email: 'peter@email.com', age: 30, city: 'Queens' },
    { name: 'Bruce Wayne', email: 'bruce@email.com', age: 35, city: 'Gotham' },
    { name: 'Clark Kent', email: 'clark@email.com', age: 33, city: 'Metropolis' },
    { name: 'Diana Prince', email: 'diana@email.com', age: 28, city: 'Themyscira' },
  ];

  get filteredData(): TableRow[] {
    let result = this.data;
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(search) ||
          r.email.toLowerCase().includes(search) ||
          r.city.toLowerCase().includes(search)
      );
    }
    if (this.sortColumn) {
      result = [...result].sort((a, b) => {
        const aVal = a[this.sortColumn as keyof TableRow];
        const bVal = b[this.sortColumn as keyof TableRow];
        if (aVal < bVal) return -1 * this.sortDirection;
        if (aVal > bVal) return 1 * this.sortDirection;
        return 0;
      });
    }
    return result;
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection *= -1;
    } else {
      this.sortColumn = column;
      this.sortDirection = 1;
    }
  }
}
