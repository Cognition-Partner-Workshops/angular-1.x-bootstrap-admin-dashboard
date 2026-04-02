/**
 * Tests for Angular filters: plainText, appImage, kameleonImg, profilePicture.
 * These test the pure JavaScript logic extracted from the Angular filter wrappers.
 */

var IMAGES_ROOT = 'assets/img/';
var layoutPaths = {
  images: {
    root: IMAGES_ROOT,
    profile: IMAGES_ROOT + 'app/profile/',
    amMap: 'assets/img/theme/vendor/ammap//dist/ammap/images/',
    amChart: 'assets/img/theme/vendor/amcharts/dist/amcharts/images/'
  }
};

describe('plainText filter', function () {
  function plainText(text) {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }

  it('should remove simple HTML tags', function () {
    expect(plainText('<p>Hello</p>')).toBe('Hello');
  });

  it('should remove nested HTML tags', function () {
    expect(plainText('<div><span>Hello</span></div>')).toBe('Hello');
  });

  it('should remove tags with attributes', function () {
    expect(plainText('<a href="http://example.com">Link</a>')).toBe('Link');
  });

  it('should handle text without HTML', function () {
    expect(plainText('Plain text')).toBe('Plain text');
  });

  it('should return empty string for null input', function () {
    expect(plainText(null)).toBe('');
  });

  it('should return empty string for undefined input', function () {
    expect(plainText(undefined)).toBe('');
  });

  it('should return empty string for empty string input', function () {
    expect(plainText('')).toBe('');
  });

  it('should handle multiple HTML elements', function () {
    expect(plainText('<h1>Title</h1><p>Body</p>')).toBe('TitleBody');
  });

  it('should handle self-closing tags', function () {
    expect(plainText('Hello<br/>World')).toBe('HelloWorld');
  });

  it('should handle tags with multiple attributes', function () {
    expect(plainText('<div class="test" id="main">Content</div>')).toBe('Content');
  });

  it('should handle multiline HTML', function () {
    expect(plainText('<div>\nHello\n</div>')).toBe('\nHello\n');
  });

  it('should handle numeric input converted to string', function () {
    expect(plainText(123)).toBe('123');
  });
});

describe('appImage filter', function () {
  function appImage(input) {
    return layoutPaths.images.root + input;
  }

  it('should prepend images root to input', function () {
    expect(appImage('logo.png')).toBe('assets/img/logo.png');
  });

  it('should handle subdirectory paths', function () {
    expect(appImage('theme/icons/icon.svg')).toBe('assets/img/theme/icons/icon.svg');
  });

  it('should handle empty string', function () {
    expect(appImage('')).toBe('assets/img/');
  });

  it('should handle filenames with spaces', function () {
    expect(appImage('my image.png')).toBe('assets/img/my image.png');
  });
});

describe('kameleonImg filter', function () {
  function kameleonImg(input) {
    return layoutPaths.images.root + 'theme/icon/kameleon/' + input + '.svg';
  }

  it('should generate correct kameleon icon path', function () {
    expect(kameleonImg('mail')).toBe('assets/img/theme/icon/kameleon/mail.svg');
  });

  it('should handle icon names with hyphens', function () {
    expect(kameleonImg('beach-umbrella')).toBe('assets/img/theme/icon/kameleon/beach-umbrella.svg');
  });

  it('should handle single character icon name', function () {
    expect(kameleonImg('a')).toBe('assets/img/theme/icon/kameleon/a.svg');
  });

  it('should generate .svg extension', function () {
    var result = kameleonImg('test');
    expect(result.endsWith('.svg')).toBe(true);
  });
});

describe('profilePicture filter', function () {
  function profilePicture(input, ext) {
    ext = ext || 'png';
    return layoutPaths.images.profile + input + '.' + ext;
  }

  it('should generate profile picture path with default png extension', function () {
    expect(profilePicture('user1')).toBe('assets/img/app/profile/user1.png');
  });

  it('should allow custom extension', function () {
    expect(profilePicture('user1', 'jpg')).toBe('assets/img/app/profile/user1.jpg');
  });

  it('should handle svg extension', function () {
    expect(profilePicture('avatar', 'svg')).toBe('assets/img/app/profile/avatar.svg');
  });

  it('should use png when ext is undefined', function () {
    expect(profilePicture('user2', undefined)).toBe('assets/img/app/profile/user2.png');
  });

  it('should use png when ext is null', function () {
    expect(profilePicture('user3', null)).toBe('assets/img/app/profile/user3.png');
  });

  it('should handle numeric input names', function () {
    expect(profilePicture('12345')).toBe('assets/img/app/profile/12345.png');
  });
});
