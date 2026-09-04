import { MAPS_ROUTES } from './maps.routes';

describe('MAPS_ROUTES', () => {
  it('keeps map pages at the lazy-route top level', () => {
    const expected = [
      ['gmap', 'Google Maps', 0],
      ['leaflet', 'Leaflet Maps', 100],
      ['bubble', 'Bubble Maps', 200],
      ['line', 'Line Maps', 300],
    ] as const;

    expect(MAPS_ROUTES.find((route) => route.path === '')).toEqual(
      jasmine.objectContaining({ redirectTo: 'gmap', pathMatch: 'full' }),
    );
    expect(MAPS_ROUTES.filter((route) => route.children)).toHaveSize(0);
    expected.forEach(([path, title, order]) => {
      const route = MAPS_ROUTES.find((candidate) => candidate.path === path);
      expect(route).toBeTruthy();
      expect(route?.data).toEqual(jasmine.objectContaining({
        title,
        sidebarMeta: { order },
      }));
    });
  });
});
