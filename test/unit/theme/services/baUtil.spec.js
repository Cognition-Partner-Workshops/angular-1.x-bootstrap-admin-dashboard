'use strict';

describe('Service: baUtil', function () {
  var baUtil;

  beforeEach(module('BlurAdmin'));

  beforeEach(inject(function (_baUtil_) {
    baUtil = _baUtil_;
  }));

  describe('hexToRGB', function () {
    it('should convert hex color to rgba string', function () {
      var result = baUtil.hexToRGB('#ff0000', 1);
      expect(result).toBe('rgba(255, 0, 0, 1)');
    });

    it('should handle alpha transparency', function () {
      var result = baUtil.hexToRGB('#00ff00', 0.5);
      expect(result).toBe('rgba(0, 255, 0, 0.5)');
    });

    it('should convert black hex correctly', function () {
      var result = baUtil.hexToRGB('#000000', 1);
      expect(result).toBe('rgba(0, 0, 0, 1)');
    });

    it('should convert white hex correctly', function () {
      var result = baUtil.hexToRGB('#ffffff', 0.8);
      expect(result).toBe('rgba(255, 255, 255, 0.8)');
    });

    it('should handle zero alpha', function () {
      var result = baUtil.hexToRGB('#336699', 0);
      expect(result).toBe('rgba(51, 102, 153, 0)');
    });
  });

  describe('isDescendant', function () {
    var parent, child, unrelated;

    beforeEach(function () {
      parent = document.createElement('div');
      var middle = document.createElement('span');
      child = document.createElement('a');
      unrelated = document.createElement('p');

      parent.appendChild(middle);
      middle.appendChild(child);
      document.body.appendChild(parent);
      document.body.appendChild(unrelated);
    });

    afterEach(function () {
      if (parent.parentNode) parent.parentNode.removeChild(parent);
      if (unrelated.parentNode) unrelated.parentNode.removeChild(unrelated);
    });

    it('should return true for a nested descendant', function () {
      expect(baUtil.isDescendant(parent, child)).toBe(true);
    });

    it('should return false for an unrelated element', function () {
      expect(baUtil.isDescendant(parent, unrelated)).toBe(false);
    });

    it('should return true for a direct child', function () {
      var directChild = parent.children[0];
      expect(baUtil.isDescendant(parent, directChild)).toBe(true);
    });
  });

  describe('hasAttr', function () {
    var elem;

    beforeEach(function () {
      elem = document.createElement('div');
      elem.setAttribute('data-test', 'value');
      elem.setAttribute('autoscroll-body-top', '');
    });

    it('should return true when attribute exists with value', function () {
      expect(baUtil.hasAttr(elem, 'data-test')).toBe(true);
    });

    it('should return true when attribute exists without value', function () {
      expect(baUtil.hasAttr(elem, 'autoscroll-body-top')).toBe(true);
    });

    it('should return false when attribute does not exist', function () {
      expect(baUtil.hasAttr(elem, 'nonexistent')).toBe(false);
    });
  });
});
