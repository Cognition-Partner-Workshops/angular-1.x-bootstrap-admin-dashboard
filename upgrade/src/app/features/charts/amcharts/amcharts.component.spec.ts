import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AmchartsComponent } from './amcharts.component';

describe('AmchartsComponent', () => {
  let component: AmchartsComponent;
  let fixture: ComponentFixture<AmchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmchartsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AmchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the amcharts page container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const pageContainer = compiled.querySelector('[data-testid="amcharts-page"]');
    expect(pageContainer).toBeTruthy();
  });

  it('should render bar chart panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const barChart = compiled.querySelector('[data-testid="bar-chart"]');
    expect(barChart).toBeTruthy();
  });

  it('should render area chart panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const areaChart = compiled.querySelector('[data-testid="area-chart"]');
    expect(areaChart).toBeTruthy();
  });

  it('should render line chart panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const lineChart = compiled.querySelector('[data-testid="line-chart"]');
    expect(lineChart).toBeTruthy();
  });

  it('should render pie chart panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const pieChart = compiled.querySelector('[data-testid="pie-chart"]');
    expect(pieChart).toBeTruthy();
  });

  it('should render funnel chart panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const funnelChart = compiled.querySelector('[data-testid="funnel-chart"]');
    expect(funnelChart).toBeTruthy();
  });

  it('should render combined chart panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const combinedChart = compiled.querySelector('[data-testid="combined-chart"]');
    expect(combinedChart).toBeTruthy();
  });

  it('should render six ba-panel components for all chart types', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const panels = compiled.querySelectorAll('app-ba-panel');
    expect(panels.length).toBe(6);
  });

  it('should have correct panel titles matching legacy', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const panelTitles = compiled.querySelectorAll('.panel-title');
    const titles = Array.from(panelTitles).map(el => el.textContent?.trim());
    expect(titles).toContain('Bar Chart');
    expect(titles).toContain('Area Chart');
    expect(titles).toContain('Line Chart');
    expect(titles).toContain('Pie Chart');
    expect(titles).toContain('Funnel Chart');
    expect(titles).toContain('Combined bullet/column and line graphs with multiple value axes');
  });

  it('should have chart containers with admin-chart class', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const chartContainers = compiled.querySelectorAll('.admin-chart');
    expect(chartContainers.length).toBe(6);
  });

  it('should render charts in correct grid layout - first row has 3 charts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('.row');
    expect(rows.length).toBe(3);

    const firstRowCharts = rows[0].querySelectorAll('app-ba-panel');
    expect(firstRowCharts.length).toBe(3);
  });

  it('should render charts in correct grid layout - second row has 2 charts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('.row');
    const secondRowCharts = rows[1].querySelectorAll('app-ba-panel');
    expect(secondRowCharts.length).toBe(2);
  });

  it('should render charts in correct grid layout - third row has 1 chart', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('.row');
    const thirdRowCharts = rows[2].querySelectorAll('app-ba-panel');
    expect(thirdRowCharts.length).toBe(1);
  });

  it('should initialize chart roots after view init', fakeAsync(() => {
    tick(1100);
    expect((component as unknown as { roots: unknown[] }).roots.length).toBe(6);
  }));
});
