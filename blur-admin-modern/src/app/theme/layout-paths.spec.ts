import { LAYOUT_PATHS } from './layout-paths';

describe('LAYOUT_PATHS', () => {
  it('creates', () => {
    expect(LAYOUT_PATHS).toBeTruthy();
  });

  it('preserves the legacy asset paths', () => {
    expect(LAYOUT_PATHS.images.root).toBe('assets/img/');
    expect(LAYOUT_PATHS.images.profile).toBe('assets/img/app/profile/');
    expect(LAYOUT_PATHS.images.amMap).toContain('ammap//dist');
  });
});
