import { COMPONENTS_ROUTES } from './components.routes';

describe('COMPONENTS_ROUTES', () => {
  it('defines the mail, timeline, and tree routes', () => {
    expect(COMPONENTS_ROUTES.map((route) => route.path)).toEqual(['mail', 'timeline', 'tree']);
    expect(COMPONENTS_ROUTES[0].data?.['title']).toBe('Mail');
    expect(COMPONENTS_ROUTES[0].children?.[0].redirectTo).toBe('inbox');
    expect(COMPONENTS_ROUTES[1].data?.['title']).toBe('Timeline');
    expect(COMPONENTS_ROUTES[2].data?.['title']).toBe('Tree View');
  });
});
