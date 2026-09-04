import { ProfilePicturePipe } from './profile-picture.pipe';

describe('ProfilePicturePipe', () => {
  it('creates', () => expect(new ProfilePicturePipe()).toBeTruthy());
  it('builds profile paths with default and custom extensions', () => {
    const pipe = new ProfilePicturePipe();
    expect(pipe.transform('bob')).toBe('assets/img/app/profile/bob.png');
    expect(pipe.transform('bob', 'jpg')).toBe('assets/img/app/profile/bob.jpg');
  });
});
