import { UI_ROUTES } from './ui.routes';

describe('UI routes', () => {
  it('exports the requested child routes and metadata', () => {
    expect(UI_ROUTES.map((route) => route.path)).toEqual(['', 'modals', 'alerts', 'progressBars', 'notifications']);
    expect(UI_ROUTES.slice(1).map((route) => route.data)).toEqual([
      { title: 'Modals', sidebarMeta: { order: 300 } },
      { title: 'Alerts', sidebarMeta: { order: 500 } },
      { title: 'Progress Bars', sidebarMeta: { order: 600 } },
      { title: 'Notifications', sidebarMeta: { order: 700 } },
    ]);
  });
});
