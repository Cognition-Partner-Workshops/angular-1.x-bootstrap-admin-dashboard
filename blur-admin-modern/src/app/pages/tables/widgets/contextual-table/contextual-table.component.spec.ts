import { TestBed } from '@angular/core/testing';
import { ContextualTableComponent } from './contextual-table.component';

describe('ContextualTableComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [ContextualTableComponent] }).compileComponents());
  it('renders each contextual row class', () => {
    const fixture = TestBed.createComponent(ContextualTableComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tr').length).toBe(6);
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(5);
    expect(fixture.nativeElement.querySelector('tbody tr.success')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('tr.primary, tr.success, tr.warning, tr.danger, tr.info').length).toBe(5);
  });
});
