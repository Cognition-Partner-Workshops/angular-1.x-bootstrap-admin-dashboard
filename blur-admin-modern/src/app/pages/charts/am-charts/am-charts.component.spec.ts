import { TestBed } from '@angular/core/testing';
import { AmChartsComponent } from './am-charts.component';

describe('AmChartsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [AmChartsComponent] }).compileComponents());
  it('renders all six chart panels', () => {
    const fixture = TestBed.createComponent(AmChartsComponent);
    fixture.detectChanges();
    for (const title of ['Bar Chart', 'Area Chart', 'Line Chart', 'Pie Chart', 'Funnel Chart', 'Combined bullet/column and line graphs with multiple value axes']) {
      expect(fixture.nativeElement.textContent).toContain(title);
    }
  });
});
