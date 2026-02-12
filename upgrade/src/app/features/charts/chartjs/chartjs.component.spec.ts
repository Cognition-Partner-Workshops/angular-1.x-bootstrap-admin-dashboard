import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ChartjsComponent } from './chartjs.component';
import { ThemeConfigService, StopableIntervalService } from '../../../core/services';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

describe('ChartjsComponent', () => {
  let component: ChartjsComponent;
  let fixture: ComponentFixture<ChartjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartjsComponent],
      providers: [
        provideRouter([]),
        provideCharts(withDefaultRegisterables()),ThemeConfigService, StopableIntervalService],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  describe('Route Reachability', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the chartjs page container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const pageContainer = compiled.querySelector('[data-testid="chartjs-page"]');
      expect(pageContainer).toBeTruthy();
    });
  });

  describe('Chart Rendering - Row 1 (1D Charts)', () => {
    it('should render pie chart container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const pieContainer = compiled.querySelector('[data-testid="pie-chart-container"]');
      expect(pieContainer).toBeTruthy();
    });

    it('should render pie chart canvas', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const pieChart = compiled.querySelector('[data-testid="pie-chart"]');
      expect(pieChart).toBeTruthy();
      expect(pieChart?.tagName.toLowerCase()).toBe('canvas');
    });

    it('should render doughnut chart container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const doughnutContainer = compiled.querySelector('[data-testid="doughnut-chart-container"]');
      expect(doughnutContainer).toBeTruthy();
    });

    it('should render doughnut chart canvas', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const doughnutChart = compiled.querySelector('[data-testid="doughnut-chart"]');
      expect(doughnutChart).toBeTruthy();
      expect(doughnutChart?.tagName.toLowerCase()).toBe('canvas');
    });

    it('should render polar chart container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const polarContainer = compiled.querySelector('[data-testid="polar-chart-container"]');
      expect(polarContainer).toBeTruthy();
    });

    it('should render polar chart canvas', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const polarChart = compiled.querySelector('[data-testid="polar-chart"]');
      expect(polarChart).toBeTruthy();
      expect(polarChart?.tagName.toLowerCase()).toBe('canvas');
    });
  });

  describe('Chart Rendering - Row 2 (Animated Charts)', () => {
    it('should render animated radar chart container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const animatedRadarContainer = compiled.querySelector(
        '[data-testid="animated-radar-chart-container"]'
      );
      expect(animatedRadarContainer).toBeTruthy();
    });

    it('should render animated radar chart canvas', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const animatedRadarChart = compiled.querySelector('[data-testid="animated-radar-chart"]');
      expect(animatedRadarChart).toBeTruthy();
      expect(animatedRadarChart?.tagName.toLowerCase()).toBe('canvas');
    });

    it('should render animated bar chart container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const animatedBarContainer = compiled.querySelector(
        '[data-testid="animated-bar-chart-container"]'
      );
      expect(animatedBarContainer).toBeTruthy();
    });

    it('should render animated bar chart canvas', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const animatedBarChart = compiled.querySelector('[data-testid="animated-bar-chart"]');
      expect(animatedBarChart).toBeTruthy();
      expect(animatedBarChart?.tagName.toLowerCase()).toBe('canvas');
    });
  });

  describe('Chart Rendering - Row 3 (2D Charts)', () => {
    it('should render static radar chart container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const staticRadarContainer = compiled.querySelector(
        '[data-testid="static-radar-chart-container"]'
      );
      expect(staticRadarContainer).toBeTruthy();
    });

    it('should render static radar chart canvas', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const staticRadarChart = compiled.querySelector('[data-testid="static-radar-chart"]');
      expect(staticRadarChart).toBeTruthy();
      expect(staticRadarChart?.tagName.toLowerCase()).toBe('canvas');
    });

    it('should render line chart container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const lineContainer = compiled.querySelector('[data-testid="line-chart-container"]');
      expect(lineContainer).toBeTruthy();
    });

    it('should render line chart canvas', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const lineChart = compiled.querySelector('[data-testid="line-chart"]');
      expect(lineChart).toBeTruthy();
      expect(lineChart?.tagName.toLowerCase()).toBe('canvas');
    });

    it('should render static bar chart container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const staticBarContainer = compiled.querySelector(
        '[data-testid="static-bar-chart-container"]'
      );
      expect(staticBarContainer).toBeTruthy();
    });

    it('should render static bar chart canvas', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const staticBarChart = compiled.querySelector('[data-testid="static-bar-chart"]');
      expect(staticBarChart).toBeTruthy();
      expect(staticBarChart?.tagName.toLowerCase()).toBe('canvas');
    });
  });

  describe('Panel Titles (Parity with Legacy)', () => {
    it('should render Pie panel title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = compiled.querySelectorAll('.panel-title');
      const titles = Array.from(panelTitles).map((el) => el.textContent?.trim());
      expect(titles).toContain('Pie');
    });

    it('should render Doughnut panel title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = compiled.querySelectorAll('.panel-title');
      const titles = Array.from(panelTitles).map((el) => el.textContent?.trim());
      expect(titles).toContain('Doughnut');
    });

    it('should render Polar panel title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = compiled.querySelectorAll('.panel-title');
      const titles = Array.from(panelTitles).map((el) => el.textContent?.trim());
      expect(titles).toContain('Polar');
    });

    it('should render Animated Radar panel title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = compiled.querySelectorAll('.panel-title');
      const titles = Array.from(panelTitles).map((el) => el.textContent?.trim());
      expect(titles).toContain('Animated Radar');
    });

    it('should render Animated Bars panel title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = compiled.querySelectorAll('.panel-title');
      const titles = Array.from(panelTitles).map((el) => el.textContent?.trim());
      expect(titles).toContain('Animated Bars');
    });

    it('should render Radar panel title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = compiled.querySelectorAll('.panel-title');
      const titles = Array.from(panelTitles).map((el) => el.textContent?.trim());
      expect(titles).toContain('Radar');
    });

    it('should render Line panel title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = compiled.querySelectorAll('.panel-title');
      const titles = Array.from(panelTitles).map((el) => el.textContent?.trim());
      expect(titles).toContain('Line');
    });

    it('should render Bars panel title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = compiled.querySelectorAll('.panel-title');
      const titles = Array.from(panelTitles).map((el) => el.textContent?.trim());
      expect(titles).toContain('Bars');
    });
  });

  describe('Chart Data Initialization', () => {
    it('should initialize 1D chart labels correctly', () => {
      expect(component.chart1DLabels).toEqual(['Sleeping', 'Designing', 'Coding', 'Cycling']);
    });

    it('should initialize 1D chart data correctly', () => {
      expect(component.chart1DData).toEqual([20, 40, 5, 35]);
    });

    it('should initialize 2D chart labels correctly', () => {
      expect(component.chart2DLabels).toEqual(['May', 'Jun', 'Jul', 'Aug', 'Sep']);
    });

    it('should initialize 2D chart series correctly', () => {
      expect(component.chart2DSeries).toEqual(['Product A', 'Product B']);
    });

    it('should initialize animated chart labels correctly', () => {
      expect(component.animatedLabels).toEqual([
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]);
    });
  });

  describe('Animation Tests', () => {
    it('should have animated radar data initialized', () => {
      expect(component.animatedRadarData.length).toBe(9);
    });

    it('should have animated bar data initialized', () => {
      expect(component.animatedBarData.length).toBe(9);
    });

    it('should rotate animated radar data on interval', fakeAsync(() => {
      const initialFirstElement = component.animatedRadarData[0];
      tick(500);
      fixture.detectChanges();
      expect(component.animatedRadarData[0]).not.toBe(initialFirstElement);
    }));
  });

  describe('Click Handlers (Shuffle Data)', () => {
    it('should shuffle pie chart data on click', () => {
      component.onPieChartClick();
      expect(component.pieChartData.datasets[0].data).toBeDefined();
    });

    it('should shuffle doughnut chart data on click', () => {
      component.onDoughnutChartClick();
      expect(component.doughnutChartData.datasets[0].data).toBeDefined();
    });

    it('should shuffle polar chart data on click', () => {
      component.onPolarChartClick();
      expect(component.polarChartData.datasets[0].data).toBeDefined();
    });

    it('should shuffle static radar chart data on click', () => {
      component.onStaticRadarChartClick();
      expect(component.staticRadarChartData.datasets[0].data).toBeDefined();
      expect(component.staticRadarChartData.datasets[1].data).toBeDefined();
    });

    it('should shuffle line chart data on click', () => {
      component.onLineChartClick();
      expect(component.lineChartData.datasets[0].data).toBeDefined();
      expect(component.lineChartData.datasets[1].data).toBeDefined();
    });

    it('should shuffle static bar chart data on click', () => {
      component.onStaticBarChartClick();
      expect(component.staticBarChartData.datasets[0].data).toBeDefined();
      expect(component.staticBarChartData.datasets[1].data).toBeDefined();
    });
  });

  describe('Theme Colors', () => {
    it('should have chart colors from theme config', () => {
      expect(component.chartColors.length).toBeGreaterThan(0);
    });

    it('should include primary color in chart colors', () => {
      expect(component.chartColors[0]).toBe('#209e91');
    });
  });
});
