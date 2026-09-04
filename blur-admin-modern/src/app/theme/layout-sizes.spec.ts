import { LAYOUT_SIZES } from './layout-sizes';

describe('LAYOUT_SIZES', () => {
  it('creates', () => {
    expect(LAYOUT_SIZES).toBeTruthy();
  });

  it('contains the legacy responsive breakpoints', () => {
    expect(LAYOUT_SIZES).toEqual({ resWidthCollapseSidebar: 1200, resWidthHideSidebar: 500 });
  });
});
