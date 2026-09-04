import { TestBed } from '@angular/core/testing';
import { MorrisComponent } from './morris.component';
import { BaConfigService } from '../../../theme';

describe('MorrisComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [MorrisComponent] }).compileComponents());
  it('renders four panels and four canvases', () => {
    const fixture = TestBed.createComponent(MorrisComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('canvas').length).toBe(4);
    expect(fixture.nativeElement.textContent).toContain('Line Chart');
    expect(fixture.nativeElement.textContent).toContain('Donut');
    expect(fixture.nativeElement.textContent).toContain('Bar Chart');
    expect(fixture.nativeElement.textContent).toContain('Area Chart');
  });
  it('keeps the donut total and six legacy colors', () => {
    const component = TestBed.createComponent(MorrisComponent).componentInstance;
    expect(component.donutData.reduce((total, item) => total + item.value, 0)).toBe(62);
    const colors = TestBed.inject(BaConfigService).colors;
    expect(component.colors).toEqual([colors.primary, colors.warning, colors.danger, colors.info, colors.success, colors.primaryDark]);
  });
});
