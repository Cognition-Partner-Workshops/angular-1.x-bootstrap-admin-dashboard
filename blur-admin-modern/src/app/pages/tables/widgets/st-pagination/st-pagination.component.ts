import { Component, computed, input, model } from '@angular/core';
import { pageCount, displayedPages } from '../../smart-table.utils';

@Component({
  selector: 'st-pagination',
  standalone: true,
  templateUrl: './st-pagination.component.html',
})
export class StPaginationComponent {
  readonly page = model(1);
  readonly totalItems = input(0);
  readonly pageSize = input(10);
  readonly displayedPageCount = input(5, { alias: 'displayedPages' });
  readonly totalPages = computed(() => pageCount(this.totalItems(), this.pageSize()));
  readonly pages = computed(() => displayedPages(this.page(), this.totalPages(), this.displayedPageCount()));

  setPage(page: number): void {
    const total = this.totalPages();
    this.page.set(Math.max(1, Math.min(total || 1, page)));
  }
}
