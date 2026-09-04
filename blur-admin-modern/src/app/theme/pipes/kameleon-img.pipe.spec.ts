import { KameleonImgPipe } from './kameleon-img.pipe';

describe('KameleonImgPipe', () => {
  it('creates', () => expect(new KameleonImgPipe()).toBeTruthy());
  it('builds a kameleon icon path', () => expect(new KameleonImgPipe().transform('face')).toBe('assets/img/theme/icon/kameleon/face.svg'));
});
