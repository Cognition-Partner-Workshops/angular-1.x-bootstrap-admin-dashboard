import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmartTableComponent } from './smart-table.component';
import { provideRouter } from '@angular/router';

describe('SmartTableComponent', () => {
  let component: SmartTableComponent;
  let fixture: ComponentFixture<SmartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartTableComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SmartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Route Reachability', () => {
    it('should render the smart table panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitle = compiled.querySelector('.panel-title');
      expect(panelTitle?.textContent).toContain('Smart Table With Filtering, Sorting And Pagination');
    });

    it('should display the table with correct columns', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headers = compiled.querySelectorAll('thead tr:first-child th');
      expect(headers.length).toBe(6);
      expect(headers[0].textContent?.trim()).toBe('#');
      expect(headers[1].textContent?.trim()).toBe('First Name');
      expect(headers[2].textContent?.trim()).toBe('Last Name');
      expect(headers[3].textContent?.trim()).toBe('Username');
      expect(headers[4].textContent?.trim()).toBe('Email');
      expect(headers[5].textContent?.trim()).toBe('Age');
    });

    it('should have 60 total rows of data', () => {
      expect(component.rawData.length).toBe(60);
    });
  });

  describe('Table Sorting', () => {
    it('should sort by id ascending by default', () => {
      expect(component.sortColumn).toBe('id');
      expect(component.sortDirection).toBe('asc');
    });

    it('should toggle sort direction when clicking same column', () => {
      component.onSort('id');
      expect(component.sortDirection).toBe('desc');

      component.onSort('id');
      expect(component.sortDirection).toBe('asc');
    });

    it('should change sort column and reset to asc when clicking different column', () => {
      component.onSort('firstName');
      expect(component.sortColumn).toBe('firstName');
      expect(component.sortDirection).toBe('asc');
    });

    it('should sort data alphabetically by firstName', () => {
      component.onSort('firstName');
      fixture.detectChanges();

      const firstRow = component.displayedData[0];
      expect(firstRow.firstName).toBe('Alyce');
    });

    it('should sort data numerically by age', () => {
      component.sortColumn = null;
      component.sortDirection = null;
      component.onSort('age');
      fixture.detectChanges();

      const firstRow = component.displayedData[0];
      expect(firstRow.age).toBe(11);
    });

    it('should return correct sort class for active column', () => {
      component.sortColumn = 'firstName';
      component.sortDirection = 'asc';
      expect(component.getSortClass('firstName')).toBe('st-sort-ascent');

      component.sortDirection = 'desc';
      expect(component.getSortClass('firstName')).toBe('st-sort-descent');
    });

    it('should return empty string for inactive column', () => {
      component.sortColumn = 'firstName';
      expect(component.getSortClass('lastName')).toBe('');
    });
  });

  describe('Table Filtering', () => {
    it('should filter by firstName', () => {
      component.filters.firstName = 'Mark';
      component.onFilterChange();
      fixture.detectChanges();

      expect(component.filteredData.length).toBe(2);
      expect(component.filteredData.every(row => row.firstName.toLowerCase().includes('mark'))).toBeTrue();
    });

    it('should filter by lastName', () => {
      component.filters.lastName = 'Otto';
      component.onFilterChange();
      fixture.detectChanges();

      expect(component.filteredData.length).toBe(2);
      expect(component.filteredData.every(row => row.lastName.toLowerCase().includes('otto'))).toBeTrue();
    });

    it('should filter by username', () => {
      component.filters.username = '@mdo';
      component.onFilterChange();
      fixture.detectChanges();

      expect(component.filteredData.length).toBe(1);
      expect(component.filteredData[0].username).toBe('@mdo');
    });

    it('should filter by email', () => {
      component.filters.email = 'gmail';
      component.onFilterChange();
      fixture.detectChanges();

      expect(component.filteredData.every(row => row.email.toLowerCase().includes('gmail'))).toBeTrue();
    });

    it('should filter by age', () => {
      component.filters.age = '28';
      component.onFilterChange();
      fixture.detectChanges();

      expect(component.filteredData.every(row => String(row.age).includes('28'))).toBeTrue();
    });

    it('should be case-insensitive', () => {
      component.filters.firstName = 'MARK';
      component.onFilterChange();
      fixture.detectChanges();

      expect(component.filteredData.length).toBe(2);
    });

    it('should reset to page 1 when filter changes', () => {
      component.currentPage = 3;
      component.filters.firstName = 'Mark';
      component.onFilterChange();

      expect(component.currentPage).toBe(1);
    });

    it('should combine multiple filters', () => {
      component.filters.firstName = 'Mark';
      component.filters.lastName = 'Otto';
      component.onFilterChange();
      fixture.detectChanges();

      expect(component.filteredData.length).toBe(2);
    });
  });

  describe('Pagination', () => {
    it('should have default page size of 10', () => {
      expect(component.pageSize).toBe(10);
    });

    it('should have page size options [5, 10, 15, 20, 25]', () => {
      expect(component.pageSizeOptions).toEqual([5, 10, 15, 20, 25]);
    });

    it('should display correct number of rows per page', () => {
      expect(component.displayedData.length).toBe(10);
    });

    it('should calculate total pages correctly', () => {
      expect(component.totalPages).toBe(6);
    });

    it('should navigate to next page', () => {
      component.goToPage(2);
      expect(component.currentPage).toBe(2);
      expect(component.displayedData[0].id).not.toBe(1);
    });

    it('should not navigate to invalid page', () => {
      component.goToPage(0);
      expect(component.currentPage).toBe(1);

      component.goToPage(100);
      expect(component.currentPage).toBe(1);
    });

    it('should reset to page 1 when page size changes', () => {
      component.currentPage = 3;
      component.pageSize = 5;
      component.onPageSizeChange();

      expect(component.currentPage).toBe(1);
    });

    it('should update displayed data when page size changes', () => {
      component.pageSize = 5;
      component.onPageSizeChange();
      fixture.detectChanges();

      expect(component.displayedData.length).toBe(5);
      expect(component.totalPages).toBe(12);
    });

    it('should generate correct page numbers', () => {
      const pages = component.pageNumbers;
      expect(pages.length).toBeLessThanOrEqual(5);
      expect(pages[0]).toBe(1);
    });

    it('should show correct page numbers when on middle page', () => {
      component.goToPage(3);
      const pages = component.pageNumbers;
      expect(pages).toContain(3);
    });
  });

  describe('Data Display', () => {
    it('should display first 10 rows on initial load', () => {
      expect(component.displayedData.length).toBe(10);
    });

    it('should have trackByRowId function', () => {
      const row = { id: 1, firstName: 'Test', lastName: 'User', username: '@test', email: 'test@test.com', age: 25 };
      expect(component.trackByRowId(0, row)).toBe(1);
    });
  });
});
