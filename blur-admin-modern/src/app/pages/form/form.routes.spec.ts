import { FORM_ROUTES } from './form.routes';

describe('FORM_ROUTES', () => {
  it('defines the form child routes and metadata', () => {
    expect(FORM_ROUTES.map((route) => route.path)).toEqual(['', 'inputs', 'layouts', 'wizard']);
    expect(FORM_ROUTES.slice(1).map((route) => route.data)).toEqual([
      { title: 'Form Inputs', sidebarMeta: { order: 0 } },
      { title: 'Form Layouts', sidebarMeta: { order: 100 } },
      { title: 'Form Wizard', sidebarMeta: { order: 200 } },
    ]);
  });
});
