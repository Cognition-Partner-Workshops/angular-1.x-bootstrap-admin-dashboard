import { TestBed } from '@angular/core/testing';
import { LayoutsComponent } from './layouts.component';

describe('LayoutsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [LayoutsComponent] }).compileComponents());
  it('renders the five layout panels', () => {
    const fixture = TestBed.createComponent(LayoutsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Inline Form');
    expect(fixture.nativeElement.querySelectorAll('ba-panel').length).toBe(5);
  });
});
