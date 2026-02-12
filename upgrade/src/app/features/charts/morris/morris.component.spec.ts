import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MorrisComponent } from './morris.component';
import { provideRouter } from '@angular/router';

describe('MorrisComponent', () => {
  let component: MorrisComponent;
  let fixture: ComponentFixture<MorrisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MorrisComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MorrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Route Reachability', () => {
    it('should create the morris component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the morris charts page container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const page = compiled.querySelector('[data-testid="morris-charts-page"]');
      expect(page).toBeTruthy();
    });

    it('should render all four chart panels', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panels = compiled.querySelectorAll('app-ba-panel');
      expect(panels.length).toBe(4);
    });
  });

  describe('Chart Data Parity', () => {
    it('should have line data with 7 data points matching legacy', () => {
      expect(component.lineData.length).toBe(7);
      expect(component.lineData[0]).toEqual({ y: '2006', a: 100, b: 90 });
      expect(component.lineData[6]).toEqual({ y: '2012', a: 100, b: 90 });
    });

    it('should have area data with 7 data points matching legacy', () => {
      expect(component.areaData.length).toBe(7);
      expect(component.areaData[0]).toEqual({ y: '2006', a: 100, b: 90 });
      expect(component.areaData[6]).toEqual({ y: '2012', a: 100, b: 90 });
    });

    it('should have bar data with 7 data points matching legacy', () => {
      expect(component.barData.length).toBe(7);
      expect(component.barData[0]).toEqual({ y: '2006', a: 100, b: 90 });
      expect(component.barData[6]).toEqual({ y: '2012', a: 100, b: 90 });
    });

    it('should have donut data with 3 data points matching legacy', () => {
      expect(component.donutData.length).toBe(3);
      expect(component.donutData[0]).toEqual({ label: 'Download Sales', value: 12 });
      expect(component.donutData[1]).toEqual({ label: 'In-Store Sales', value: 30 });
      expect(component.donutData[2]).toEqual({ label: 'Mail-Order Sales', value: 20 });
    });
  });

  describe('Theme Colors', () => {
    it('should initialize colors from theme config', () => {
      component.ngOnInit();
      expect(component.colors.length).toBeGreaterThan(0);
    });

    it('should have 6 chart colors matching legacy baConfig colors', () => {
      component.ngOnInit();
      expect(component.colors.length).toBe(6);
      expect(component.colors[0]).toBe('#209e91');
      expect(component.colors[1]).toBe('#dfb81c');
      expect(component.colors[2]).toBe('#e85656');
    });
  });

  describe('Chart Container Rendering', () => {
    it('should render line chart container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const lineChart = compiled.querySelector('[data-testid="morris-line-chart"]');
      expect(lineChart).toBeTruthy();
      expect(lineChart?.classList.contains('morris-chart')).toBeTrue();
    });

    it('should render donut chart container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const donutChart = compiled.querySelector('[data-testid="morris-donut-chart"]');
      expect(donutChart).toBeTruthy();
      expect(donutChart?.classList.contains('morris-donut')).toBeTrue();
    });

    it('should render bar chart container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const barChart = compiled.querySelector('[data-testid="morris-bar-chart"]');
      expect(barChart).toBeTruthy();
      expect(barChart?.classList.contains('morris-chart')).toBeTrue();
    });

    it('should render area chart container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const areaChart = compiled.querySelector('[data-testid="morris-area-chart"]');
      expect(areaChart).toBeTruthy();
      expect(areaChart?.classList.contains('morris-chart')).toBeTrue();
    });
  });

  describe('Panel Layout Parity', () => {
    it('should have Line Chart panel as first row full width', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const firstRow = compiled.querySelector('.row');
      const colMd12 = firstRow?.querySelector('.col-md-12');
      expect(colMd12).toBeTruthy();
    });

    it('should have Donut panel in second row with col-md-4', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const rows = compiled.querySelectorAll('.row');
      const secondRow = rows[1];
      const colMd4 = secondRow?.querySelector('.col-md-4');
      expect(colMd4).toBeTruthy();
    });

    it('should have Bar Chart panel in second row with col-md-8', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const rows = compiled.querySelectorAll('.row');
      const secondRow = rows[1];
      const colMd8 = secondRow?.querySelector('.col-md-8');
      expect(colMd8).toBeTruthy();
    });

    it('should have Area Chart panel as third row full width', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const rows = compiled.querySelectorAll('.row');
      const thirdRow = rows[2];
      const colMd12 = thirdRow?.querySelector('.col-md-12');
      expect(colMd12).toBeTruthy();
    });
  });
});
