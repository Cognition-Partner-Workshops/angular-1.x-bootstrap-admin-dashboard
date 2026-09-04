import { mix, shade, tint } from './color-helper';

describe('color helpers', () => {
  it('creates', () => {
    expect(mix).toBeTruthy();
  });

  it('matches the legacy palette calculations and edge cases', () => {
    expect(mix('#ffffff', '#209e91', 30)).toBe('#62bbb2');
    expect(tint('#209e91', 30)).toBe('#62bbb2');
    expect(shade('#209e91', 15)).toBe('#1b867b');
    expect(tint('#2dacd1', 30)).toBe('#6cc4de');
    expect(shade('#2dacd1', 15)).toBe('#2692b1');
    expect(tint('#90b900', 30)).toBe('#b1ce4c');
    expect(shade('#90b900', 15)).toBe('#7a9d00');
    expect(tint('#dfb81c', 30)).toBe('#e8cd60');
    expect(shade('#dfb81c', 15)).toBe('#bd9c17');
    expect(tint('#e85656', 30)).toBe('#ee8888');
    expect(shade('#e85656', 15)).toBe('#c54949');
    expect(tint('#000000', 30)).toBe('#4c4c4c');
    expect(shade('#ffffff', 15)).toBe('#d8d8d8');
  });
});
