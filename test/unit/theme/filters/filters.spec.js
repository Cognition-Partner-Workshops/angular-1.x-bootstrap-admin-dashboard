'use strict';

describe('Filters', function () {

  beforeEach(module('BlurAdmin'));

  describe('plainText filter', function () {
    var plainTextFilter;

    beforeEach(inject(function ($filter) {
      plainTextFilter = $filter('plainText');
    }));

    it('should strip HTML tags from text', function () {
      expect(plainTextFilter('<p>Hello</p>')).toBe('Hello');
    });

    it('should strip nested HTML tags', function () {
      expect(plainTextFilter('<div><span>World</span></div>')).toBe('World');
    });

    it('should return empty string for null input', function () {
      expect(plainTextFilter(null)).toBe('');
    });

    it('should return empty string for undefined input', function () {
      expect(plainTextFilter(undefined)).toBe('');
    });

    it('should return plain text unchanged', function () {
      expect(plainTextFilter('no tags here')).toBe('no tags here');
    });

    it('should handle multiple tags', function () {
      expect(plainTextFilter('<b>bold</b> and <i>italic</i>')).toBe('bold and italic');
    });

    it('should handle self-closing tags', function () {
      expect(plainTextFilter('line1<br/>line2')).toBe('line1line2');
    });
  });

  describe('appImage filter', function () {
    var appImageFilter;

    beforeEach(inject(function ($filter) {
      appImageFilter = $filter('appImage');
    }));

    it('should prepend images root path', function () {
      var result = appImageFilter('test.png');
      expect(result).toBe('assets/img/test.png');
    });

    it('should handle subdirectory paths', function () {
      var result = appImageFilter('icons/logo.svg');
      expect(result).toBe('assets/img/icons/logo.svg');
    });
  });

  describe('kameleonImg filter', function () {
    var kameleonImgFilter;

    beforeEach(inject(function ($filter) {
      kameleonImgFilter = $filter('kameleonImg');
    }));

    it('should build correct kameleon icon path', function () {
      var result = kameleonImgFilter('Dashboard');
      expect(result).toBe('assets/img/theme/icon/kameleon/Dashboard.svg');
    });
  });

  describe('profilePicture filter', function () {
    var profilePictureFilter;

    beforeEach(inject(function ($filter) {
      profilePictureFilter = $filter('profilePicture');
    }));

    it('should build correct profile picture path with default extension', function () {
      var result = profilePictureFilter('user1');
      expect(result).toBe('assets/img/app/profile/user1.png');
    });

    it('should build correct profile picture path with custom extension', function () {
      var result = profilePictureFilter('user1', 'jpg');
      expect(result).toBe('assets/img/app/profile/user1.jpg');
    });
  });
});
