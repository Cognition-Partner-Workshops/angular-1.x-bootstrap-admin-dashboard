import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartistComponent } from './chartist.component';

describe('ChartistComponent', () => {
  let component: ChartistComponent;
  let fixture: ComponentFixture<ChartistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartistComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the chartist page container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const pageContainer = compiled.querySelector('[data-testid="chartist-page"]');
    expect(pageContainer).toBeTruthy();
  });

  it('should render line chart containers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="line-chart"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="area-chart"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="bi-chart"]')).toBeTruthy();
  });

  it('should render bar chart containers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="simple-bar"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="multi-bar"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="stacked-bar"]')).toBeTruthy();
  });

  it('should render pie chart containers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="simple-pie"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="label-pie"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="donut"]')).toBeTruthy();
  });

  it('should initialize charts after view init', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const lineChart = compiled.querySelector('[data-testid="line-chart"]');
    expect(lineChart?.querySelector('svg')).toBeTruthy();
  });

  it('should render panel titles', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const panels = compiled.querySelectorAll('app-ba-panel');
    expect(panels.length).toBe(3);
  });
});
