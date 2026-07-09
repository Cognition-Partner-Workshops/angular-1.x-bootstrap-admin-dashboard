import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

/** The eight ported widget selectors that must appear on the dashboard. */
const WIDGET_SELECTORS = [
  'app-dashboard-pie-chart',
  'app-traffic-chart',
  'app-dashboard-map',
  'app-dashboard-line-chart',
  'app-popular-app',
  'app-blur-feed',
  'app-dashboard-todo',
  'app-dashboard-calendar',
];

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all eight widget selectors exactly once each', () => {
    const el = fixture.nativeElement as HTMLElement;
    for (const selector of WIDGET_SELECTORS) {
      expect(el.querySelectorAll(selector).length).withContext(selector).toBe(1);
    }
  });

  it('should render the panel titles for the titled widgets', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    [
      'Acquisition Channels',
      'Users by Country',
      'Revenue',
      'Feed',
      'To Do List',
      'Calendar',
    ].forEach((title) => expect(text).toContain(title));
  });
});
