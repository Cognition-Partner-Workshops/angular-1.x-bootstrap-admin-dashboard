import { UI_ROUTES } from './ui.routes';

describe('UI_ROUTES', () => {
  it('defines the UI pages with ordered sidebar metadata', () => {
    const pages = UI_ROUTES.filter((route) => route.path !== '');
    expect(pages.map((route) => route.path)).toEqual(['typography', 'buttons', 'icons', 'grid']);
    expect(pages.map((route) => route.data?.['title'])).toEqual(['Typography', 'Buttons', 'Icons', 'Grid']);
    expect(pages.map((route) => route.data?.['sidebarMeta']?.['order'])).toEqual([0, 100, 200, 400]);
    expect(pages.map((route) => route.data?.['sidebarMeta']?.['order'])).toEqual(
      [...pages.map((route) => route.data?.['sidebarMeta']?.['order'])].sort((a, b) => a - b),
    );
  });
});
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
