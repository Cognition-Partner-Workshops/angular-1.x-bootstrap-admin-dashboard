import { TestBed } from '@angular/core/testing';
import { CondensedTableComponent } from './condensed-table.component';

describe('CondensedTableComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [CondensedTableComponent] }).compileComponents());
  it('renders statuses and condensed people rows', () => {
    const fixture = TestBed.createComponent(CondensedTableComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('table')).toHaveClass('table-condensed');
    expect(fixture.nativeElement.querySelector('button')).toHaveClass('btn-info');
  });
});
