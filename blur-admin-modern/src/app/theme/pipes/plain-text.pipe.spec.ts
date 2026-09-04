import { PlainTextPipe } from './plain-text.pipe';

describe('PlainTextPipe', () => {
  it('creates', () => expect(new PlainTextPipe()).toBeTruthy());
  it('removes markup and handles empty text', () => {
    const pipe = new PlainTextPipe();
    expect(pipe.transform('<b>Hello</b>')).toBe('Hello');
    expect(pipe.transform('')).toBe('');
  });
});
