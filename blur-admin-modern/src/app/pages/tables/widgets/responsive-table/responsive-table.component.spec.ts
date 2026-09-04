import { TestBed } from '@angular/core/testing';
import { ResponsiveTableComponent } from './responsive-table.component';

describe('ResponsiveTableComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [ResponsiveTableComponent] }).compileComponents());
  it('renders the responsive table wrapper', () => {
    const fixture = TestBed.createComponent(ResponsiveTableComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.table-responsive')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('tr').length).toBe(6);
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(5);
  });
});
