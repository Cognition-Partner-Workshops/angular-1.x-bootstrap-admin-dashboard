import { TestBed } from '@angular/core/testing';
import { SmartTablesComponent } from './smart-tables.component';

describe('SmartTablesComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [SmartTablesComponent] }).compileComponents());
  it('renders the three smart table panels and widgets', () => {
    const fixture = TestBed.createComponent(SmartTablesComponent);
    fixture.detectChanges();
    expect(Array.from(fixture.nativeElement.querySelectorAll('.panel-title') as NodeListOf<HTMLElement>).map((title) => title.textContent.trim())).toEqual([
      'Editable Rows', 'Editable Cells', 'Smart Table With Filtering, Sorting And Pagination',
    ]);
    expect(fixture.nativeElement.querySelector('app-editable-row-table')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-editable-table')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-smart-table')).toBeTruthy();
  });
});
