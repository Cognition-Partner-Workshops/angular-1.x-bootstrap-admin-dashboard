import { TestBed } from '@angular/core/testing';
import { HoverRowsComponent } from './hover-rows.component';

describe('HoverRowsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [HoverRowsComponent] }).compileComponents());

  it('renders metrics rows and directional icons', () => {
    const fixture = TestBed.createComponent(HoverRowsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(5);
    expect(fixture.nativeElement.querySelector('img').getAttribute('src')).toBe('assets/img/app/browsers/chrome.svg');
    expect(fixture.nativeElement.querySelector('tbody tr td.table-arr i').classList).toContain('icon-up');
  });
});
