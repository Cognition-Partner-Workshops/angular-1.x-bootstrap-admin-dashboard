import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardLineChartComponent } from './dashboard-line-chart.component';

describe('DashboardLineChartComponent', () => {
  let fixture: ComponentFixture<DashboardLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLineChartComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardLineChartComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the revenue chart canvas', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('canvas')).toBeTruthy();
  });

  it('should expose two data series', () => {
    expect(fixture.componentInstance.data.datasets.length).toBe(2);
  });
});
