import { TestBed } from '@angular/core/testing';
import { ChartJsComponent } from './chart-js.component';

describe('ChartJsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [ChartJsComponent] }).compileComponents());
  it('renders all legacy panels and canvas ids', () => {
    const fixture = TestBed.createComponent(ChartJsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Pie');
    expect(fixture.nativeElement.textContent).toContain('Doughnut');
    expect(fixture.nativeElement.textContent).toContain('Polar');
    expect(fixture.nativeElement.textContent).toContain('Animated Radar');
    expect(fixture.nativeElement.textContent).toContain('Animated Bars');
    expect(fixture.nativeElement.textContent).toContain('Radar');
    expect(fixture.nativeElement.textContent).toContain('Line');
    expect(fixture.nativeElement.textContent).toContain('Bars');
    expect(Array.from(fixture.nativeElement.querySelectorAll('canvas')).map((e) => (e as Element).id))
      .toEqual(['pie', 'doughnut', 'polar-area', 'waveLine', 'waveBars', 'radar', 'line', 'bar']);
  });
});
