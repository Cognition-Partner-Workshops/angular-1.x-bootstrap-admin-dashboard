import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardLineChartComponent, REVENUE_CHART_DATA, REVENUE_ZOOM_END, REVENUE_ZOOM_START } from './dashboard-line-chart.component';

describe('DashboardLineChartComponent', () => {
  let fixture: ComponentFixture<DashboardLineChartComponent>;
  let component: DashboardLineChartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DashboardLineChartComponent] }).compileComponents();
    fixture = TestBed.createComponent(DashboardLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('creates', () => expect(component).toBeTruthy());

  it('keeps the legacy revenue data (Dec 2012 - Feb 2015) and initial zoom window', () => {
    expect(component.chartData).toBe(REVENUE_CHART_DATA);
    expect(REVENUE_CHART_DATA.length).toBe(27);
    expect(REVENUE_CHART_DATA[0]).toEqual({ date: new Date(2012, 11), value: 0, value0: 0 });
    expect(REVENUE_CHART_DATA[1]).toEqual({ date: new Date(2013, 0), value: 15000, value0: 19000 });
    expect(REVENUE_CHART_DATA[REVENUE_CHART_DATA.length - 1].date).toEqual(new Date(2015, 1));
    expect(REVENUE_ZOOM_START).toEqual(new Date(2013, 3));
    expect(REVENUE_ZOOM_END).toEqual(new Date(2014, 0));
  });

  it('renders the amCharts 5 chart into #amchart with two line series', () => {
    const host = fixture.nativeElement.querySelector('#amchart') as HTMLElement;
    expect(host).toBeTruthy();
    expect(host.querySelector('canvas, svg')).toBeTruthy();
    expect(component.root).toBeTruthy();
    expect(component.chart?.series.length).toBe(2);
    expect(component.chart?.xAxes.length).toBe(1);
    expect(component.chart?.yAxes.length).toBe(1);
  });

  it('disposes the amCharts root on destroy', () => {
    const root = component.root!;
    fixture.destroy();
    expect(root.isDisposed()).toBeTrue();
    expect(component.root).toBeUndefined();
  });
});
