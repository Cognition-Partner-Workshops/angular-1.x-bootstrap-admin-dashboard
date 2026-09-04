import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaConfigService } from '../../../theme';
import { TrafficChartComponent } from './traffic-chart.component';

describe('TrafficChartComponent', () => {
  let fixture: ComponentFixture<TrafficChartComponent>;
  let component: TrafficChartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficChartComponent],
      providers: [provideCharts(withDefaultRegisterables())],
    }).compileComponents();
    fixture = TestBed.createComponent(TrafficChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('creates', () => expect(component).toBeTruthy());

  it('uses the legacy labels, values and percentages', () => {
    expect(component.labels).toEqual(['Other', 'Search engines', 'Referral Traffic', 'Direct Traffic', 'Ad Campaigns']);
    expect(component.doughnutData.datasets[0].data).toEqual([2000, 1500, 1000, 1200, 400]);
    expect(component.percentage).toEqual([87, 22, 70, 38, 17]);
  });

  it('colours segments with the dashboard palette and darker hover colours', () => {
    const dashboard = TestBed.inject(BaConfigService).colors.dashboard;
    expect(component.backgroundColor).toEqual([dashboard.white, dashboard.blueStone, dashboard.surfieGreen, dashboard.silverTree, dashboard.gossip]);
    expect(component.hoverBackgroundColor.length).toBe(5);
    component.hoverBackgroundColor.forEach((c, i) => expect(c).not.toEqual(component.backgroundColor[i]));
  });

  it('renders the doughnut canvas, total views and five legend rows with progress bars', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('canvas#chart-area')).toBeTruthy();
    expect(el.querySelector('.traffic-text')?.textContent).toContain('1,900,128');
    expect(el.querySelector('.traffic-text')?.textContent).toContain('Views Total');
    const rows = el.querySelectorAll('.channels-info-item');
    expect(rows.length).toBe(5);
    expect(rows[0].textContent).toContain('Other');
    expect(rows[0].textContent).toContain('+87%');
    const bars = Array.from(el.querySelectorAll('.progress-bar')) as HTMLElement[];
    expect(bars.map((b) => b.style.width)).toEqual(['87%', '22%', '70%', '38%', '17%']);
    expect(bars.map((b) => b.getAttribute('aria-valuenow'))).toEqual(['87', '22', '70', '38', '17']);
    const legend = Array.from(el.querySelectorAll('.legend-color')) as HTMLElement[];
    expect(legend.length).toBe(5);
    expect(legend[0].style.backgroundColor).not.toBe('');
  });
});
