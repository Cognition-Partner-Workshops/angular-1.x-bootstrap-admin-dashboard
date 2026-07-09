import { TestBed } from '@angular/core/testing';
import { Router, provideRouter, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { routes } from './app.routes';

/**
 * Lightweight e2e-style integration spec: routes to `/dashboard` through the
 * real application routes (lazy `loadComponent`) and asserts that all eight
 * ported widget selectors are present in the rendered outlet. No separate e2e
 * framework is required — this exercises the router + lazy dashboard chunk.
 */
@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
class TestHostComponent {}

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

describe('Dashboard route (integration)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('redirects "" to /dashboard', async () => {
    const router = TestBed.inject(Router);
    const location = TestBed.inject(Location);
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await router.navigateByUrl('');
    fixture.detectChanges();
    expect(location.path()).toBe('/dashboard');
    fixture.destroy();
  });

  it('loads all eight widget selectors at /dashboard', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await router.navigateByUrl('/dashboard');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    for (const selector of WIDGET_SELECTORS) {
      expect(el.querySelector(selector)).withContext(selector).toBeTruthy();
    }
    fixture.destroy();
  });
});
