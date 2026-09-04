import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardPieChartComponent, easeOutBounce } from './dashboard-pie-chart.component';

describe('DashboardPieChartComponent', () => {
  let fixture: ComponentFixture<DashboardPieChartComponent>;
  let component: DashboardPieChartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DashboardPieChartComponent] }).compileComponents();
    fixture = TestBed.createComponent(DashboardPieChartComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('creates', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders the four legacy KPI tiles with descriptions, stats and icons', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const items = el.querySelectorAll('.pie-chart-item');
    expect(items.length).toBe(4);
    const text = el.textContent ?? '';
    for (const expected of ['New Visits', '57,820', 'Purchases', '$ 89,745', 'Active Users', '178,391', 'Returned', '32,592']) {
      expect(text).toContain(expected);
    }
    expect(el.querySelectorAll('svg circle.ring').length).toBe(4);
    expect(el.querySelector('.chart-icon.i-person')).toBeTruthy();
    expect(el.querySelector('.chart-icon.i-money')).toBeTruthy();
    expect(el.querySelector('.chart-icon.i-face')).toBeTruthy();
    expect(el.querySelector('.chart-icon.i-refresh')).toBeTruthy();
  });

  it('starts every ring at 60% like the legacy easy-pie-chart', () => {
    fixture.detectChanges();
    const percents = Array.from(fixture.nativeElement.querySelectorAll('.percent')).map((p) => (p as HTMLElement).textContent?.trim());
    expect(percents).toEqual(['60', '60', '60', '60']);
    expect(component.dashOffset(0)).toBeCloseTo(component.circumference);
    expect(component.dashOffset(100)).toBeCloseTo(0);
    expect(component.dashOffset(50)).toBeCloseTo(component.circumference / 2);
  });

  it('randomises each percentage between 55 and 90 after one second', fakeAsync(() => {
    fixture.detectChanges();
    expect(component.charts.every((c) => c.percent === 60)).toBeTrue();
    tick(1000);
    for (const chart of component.charts) {
      expect(chart.percent).toBeGreaterThanOrEqual(55);
      expect(chart.percent).toBeLessThanOrEqual(90);
    }
  }));

  it('refreshes when a .refresh-data element is clicked', () => {
    fixture.detectChanges();
    const spy = spyOn(component, 'updatePieCharts');
    const trigger = document.createElement('a');
    trigger.className = 'refresh-data';
    document.body.appendChild(trigger);
    trigger.click();
    document.body.removeChild(trigger);
    expect(spy).toHaveBeenCalled();
    component.onDocumentClick(document.body);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('eases with the legacy easeOutBounce curve', () => {
    expect(easeOutBounce(0)).toBe(0);
    expect(easeOutBounce(1)).toBeCloseTo(1);
    expect(easeOutBounce(0.5)).toBeGreaterThan(0.5);
  });
});
