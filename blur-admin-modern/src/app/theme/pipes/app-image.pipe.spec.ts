import { AppImagePipe } from './app-image.pipe';

describe('AppImagePipe', () => {
  it('creates', () => expect(new AppImagePipe()).toBeTruthy());
  it('prepends the application image path', () => expect(new AppImagePipe().transform('foo.png')).toBe('assets/img/foo.png'));
});
