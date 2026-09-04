import { TestBed } from '@angular/core/testing';
import { BorderedTableComponent } from './bordered-table.component';

describe('BorderedTableComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [BorderedTableComponent] }).compileComponents());
  it('renders the bordered metrics table', () => {
    const fixture = TestBed.createComponent(BorderedTableComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('table')).toHaveClass('table-bordered');
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(5);
  });
});
