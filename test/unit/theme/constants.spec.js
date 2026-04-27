'use strict';

describe('Theme Constants', function () {

  beforeEach(module('BlurAdmin'));

  describe('layoutSizes', function () {
    var layoutSizes;

    beforeEach(inject(function (_layoutSizes_) {
      layoutSizes = _layoutSizes_;
    }));

    it('should define resWidthCollapseSidebar', function () {
      expect(layoutSizes.resWidthCollapseSidebar).toBe(1200);
    });

    it('should define resWidthHideSidebar', function () {
      expect(layoutSizes.resWidthHideSidebar).toBe(500);
    });
  });

  describe('layoutPaths', function () {
    var layoutPaths;

    beforeEach(inject(function (_layoutPaths_) {
      layoutPaths = _layoutPaths_;
    }));

    it('should define images root path', function () {
      expect(layoutPaths.images.root).toBe('assets/img/');
    });

    it('should define profile images path', function () {
      expect(layoutPaths.images.profile).toBe('assets/img/app/profile/');
    });

    it('should define amMap images path', function () {
      expect(layoutPaths.images.amMap).toContain('ammap');
    });

    it('should define amChart images path', function () {
      expect(layoutPaths.images.amChart).toContain('amcharts');
    });
  });

  describe('colorHelper', function () {
    var colorHelper;

    beforeEach(inject(function (_colorHelper_) {
      colorHelper = _colorHelper_;
    }));

    it('should have tint function', function () {
      expect(typeof colorHelper.tint).toBe('function');
    });

    it('should have shade function', function () {
      expect(typeof colorHelper.shade).toBe('function');
    });

    it('should tint a color (mix with white)', function () {
      var result = colorHelper.tint('#000000', 50);
      expect(result).toBe('#7f7f7f');
    });

    it('should shade a color (mix with black)', function () {
      var result = colorHelper.shade('#ffffff', 50);
      expect(result).toBe('#7f7f7f');
    });

    it('should return original color with 0% tint', function () {
      var result = colorHelper.tint('#ff0000', 0);
      expect(result).toBe('#ff0000');
    });

    it('should return white with 100% tint', function () {
      var result = colorHelper.tint('#000000', 100);
      expect(result).toBe('#ffffff');
    });
  });
});
