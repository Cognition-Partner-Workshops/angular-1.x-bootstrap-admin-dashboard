import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPieChartComponent } from './dashboard-pie-chart.component';

describe('DashboardPieChartComponent', () => {
  let fixture: ComponentFixture<DashboardPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPieChartComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardPieChartComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render four stat cards', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.pie-chart-item').length).toBe(4);
  });

  it('should render the four legacy descriptions and stats', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('New Visits');
    expect(text).toContain('57,820');
    expect(text).toContain('Purchases');
    expect(text).toContain('$ 89,745');
    expect(text).toContain('Active Users');
    expect(text).toContain('178,391');
    expect(text).toContain('Returned');
    expect(text).toContain('32,592');
  });
});
