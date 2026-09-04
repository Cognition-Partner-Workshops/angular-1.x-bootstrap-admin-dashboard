import { TestBed } from '@angular/core/testing';
import { StripedRowsComponent } from './striped-rows.component';

describe('StripedRowsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [StripedRowsComponent] }).compileComponents());
  it('renders all smart table rows', () => {
    const fixture = TestBed.createComponent(StripedRowsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(60);
  });
});
