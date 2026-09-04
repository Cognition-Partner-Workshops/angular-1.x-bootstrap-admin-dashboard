import { TestBed } from '@angular/core/testing';
import { ChartistComponent } from './chartist.component';

describe('ChartistComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [ChartistComponent] }).compileComponents());
  it('renders nine charts and six headings', () => {
    const fixture = TestBed.createComponent(ChartistComponent);
    fixture.detectChanges();
    expect(Array.from(fixture.nativeElement.querySelectorAll('.ct-chart')).map((e) => (e as Element).id))
      .toEqual(['line-chart', 'area-chart', 'bi-chart', 'simple-bar', 'multi-bar', 'stacked-bar', 'simple-pie', 'label-pie', 'donut']);
    expect(fixture.nativeElement.querySelectorAll('h5').length).toBe(9);
  });
});
