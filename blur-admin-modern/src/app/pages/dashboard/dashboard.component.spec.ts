import { TestBed } from '@angular/core/testing';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { DASHBOARD_ROUTES } from './dashboard.routes';

describe('DashboardComponent', () => {
  beforeEach(async () =>
    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideCharts(withDefaultRegisterables())],
    }).compileComponents());

  it('creates', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    fixture.destroy();
  });

  it('renders every legacy dashboard widget with its panel title', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    for (const selector of [
      'dashboard-pie-chart', 'traffic-chart', 'dashboard-map', 'dashboard-line-chart',
      'popular-app', 'blur-feed', 'dashboard-todo', 'dashboard-calendar',
    ]) {
      expect(el.querySelector(selector)).withContext(selector).toBeTruthy();
    }
    const titles = Array.from(el.querySelectorAll('.panel-title')).map((t) => t.textContent?.trim());
    expect(titles).toEqual(jasmine.arrayContaining([
      'Acquisition Channels', 'Users by Country', 'Revenue', 'Feed', 'To Do List', 'Calendar',
    ]));
    expect(el.querySelector('weather')).toBeNull();
    expect(el.textContent).not.toContain('Dashboard placeholder');
    fixture.destroy();
  });

  it('does not leak panel titles into native title tooltips', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const hosts = Array.from(fixture.nativeElement.querySelectorAll('[baPanel]')) as HTMLElement[];
    expect(hosts.length).toBeGreaterThanOrEqual(6);
    hosts.forEach((h) => expect(h.hasAttribute('title')).withContext(h.className).toBeFalse());
    fixture.destroy();
  });

  it('exposes the /dashboard route with legacy sidebar metadata', () => {
    expect(DASHBOARD_ROUTES.length).toBe(1);
    expect(DASHBOARD_ROUTES[0].path).toBe('');
    expect(DASHBOARD_ROUTES[0].component).toBe(DashboardComponent);
    expect(DASHBOARD_ROUTES[0].data).toEqual({ title: 'Dashboard', sidebarMeta: { icon: 'ion-android-home', order: 0 } });
  });
});
