import { BaUtilService } from './ba-util.service';

describe('BaUtilService', () => {
  it('creates', () => {
    expect(new BaUtilService()).toBeTruthy();
  });

  it('provides DOM utility methods', () => {
    const service = new BaUtilService();
    const parent = document.createElement('div');
    const child = document.createElement('span');
    parent.appendChild(child);
    parent.setAttribute('data-test', '');
    expect(service.isDescendant(parent, child)).toBeTrue();
    expect(service.hexToRGB('#209e91', 0.5)).toBe('rgba(32, 158, 145, 0.5)');
    expect(service.hasAttr(parent, 'data-test')).toBeTrue();
  });
});
