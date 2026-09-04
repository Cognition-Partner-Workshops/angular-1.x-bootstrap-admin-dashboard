import { CHARTS_ROUTES } from './charts.routes';

describe('CHARTS_ROUTES', () => {
  it('defines the redirect and ordered chart pages', () => {
    expect(CHARTS_ROUTES[0]).toEqual({ path: '', redirectTo: 'amCharts', pathMatch: 'full' });
    expect(CHARTS_ROUTES.slice(1).map((route) => route.path)).toEqual(['amCharts', 'chartist', 'chartJs', 'morris']);
    expect(CHARTS_ROUTES.slice(1).map((route) => route.data)).toEqual([
      { title: 'amCharts', sidebarMeta: { order: 0 } },
      { title: 'Chartist', sidebarMeta: { order: 100 } },
      { title: 'Chart.js', sidebarMeta: { order: 200 } },
      { title: 'Morris', sidebarMeta: { order: 300 } },
    ]);
  });
});
