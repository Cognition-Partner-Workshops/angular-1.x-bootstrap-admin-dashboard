import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrafficChartComponent } from './traffic-chart.component';

describe('TrafficChartComponent', () => {
  let fixture: ComponentFixture<TrafficChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficChartComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TrafficChartComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the doughnut canvas and the "Views Total" center overlay', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('canvas')).toBeTruthy();
    const text = el.textContent ?? '';
    expect(text).toContain('1,900,128');
    expect(text).toContain('Views Total');
  });

  it('should render five channel legend rows with the legacy labels', () => {
    const el = fixture.nativeElement as HTMLElement;
    const rows = el.querySelectorAll('.channels-info-item');
    expect(rows.length).toBe(5);
    const text = el.textContent ?? '';
    ['Other', 'Search engines', 'Referral Traffic', 'Direct Traffic', 'Ad Campaigns'].forEach(
      (label) => expect(text).toContain(label),
    );
  });
});
