import { UI_ROUTES } from './ui.routes';

describe('UI_ROUTES', () => {
  it('redirects the empty path to typography', () => {
    expect(UI_ROUTES[0]).toEqual({ path: '', redirectTo: 'typography', pathMatch: 'full' });
  });

  it('defines every UI page with ordered sidebar metadata', () => {
    const pages = UI_ROUTES.filter((route) => route.path !== '');
    expect(pages.map((route) => route.path)).toEqual([
      'typography',
      'buttons',
      'icons',
      'modals',
      'grid',
      'alerts',
      'progressBars',
      'notifications',
      'tabs',
      'slider',
      'panels',
    ]);
    expect(pages.map((route) => route.data?.['title'])).toEqual([
      'Typography',
      'Buttons',
      'Icons',
      'Modals',
      'Grid',
      'Alerts',
      'Progress Bars',
      'Notifications',
      'Tabs & Accordions',
      'Sliders',
      'Panels',
    ]);
    const orders = pages.map((route) => route.data?.['sidebarMeta']?.['order']);
    expect(orders).toEqual([0, 100, 200, 300, 400, 500, 600, 700, 800, 1000, 1100]);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });
});
