'use strict';

describe('baUtil Service', function() {
  var baUtil;

  beforeEach(module('BlurAdmin.theme'));

  beforeEach(inject(function(_baUtil_) {
    baUtil = _baUtil_;
  }));

  describe('isDescendant', function() {
    var parent, child, grandchild, unrelated;

    beforeEach(function() {
      parent = document.createElement('div');
      child = document.createElement('span');
      grandchild = document.createElement('a');
      unrelated = document.createElement('p');

      parent.appendChild(child);
      child.appendChild(grandchild);
    });

    it('should return true when child is a direct descendant of parent', function() {
      expect(baUtil.isDescendant(parent, child)).toBe(true);
    });

    it('should return true when grandchild is a descendant of parent', function() {
      expect(baUtil.isDescendant(parent, grandchild)).toBe(true);
    });

    it('should return false when element is not a descendant', function() {
      expect(baUtil.isDescendant(parent, unrelated)).toBe(false);
    });

    it('should return false when checking parent against itself', function() {
      expect(baUtil.isDescendant(parent, parent)).toBe(false);
    });
  });

  describe('hexToRGB', function() {
    it('should convert hex color to rgba with given alpha', function() {
      expect(baUtil.hexToRGB('#ffffff', 1)).toBe('rgba(255, 255, 255, 1)');
    });

    it('should convert hex color with alpha 0.5', function() {
      expect(baUtil.hexToRGB('#000000', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
    });

    it('should convert primary color hex correctly', function() {
      expect(baUtil.hexToRGB('#209e91', 1)).toBe('rgba(32, 158, 145, 1)');
    });

    it('should handle red color', function() {
      expect(baUtil.hexToRGB('#ff0000', 0.8)).toBe('rgba(255, 0, 0, 0.8)');
    });

    it('should handle green color', function() {
      expect(baUtil.hexToRGB('#00ff00', 0.3)).toBe('rgba(0, 255, 0, 0.3)');
    });

    it('should handle blue color', function() {
      expect(baUtil.hexToRGB('#0000ff', 0.7)).toBe('rgba(0, 0, 255, 0.7)');
    });
  });

  describe('hasAttr', function() {
    var element;

    beforeEach(function() {
      element = document.createElement('div');
      element.setAttribute('data-test', 'value');
      element.setAttribute('disabled', '');
    });

    it('should return true when element has the attribute with value', function() {
      expect(baUtil.hasAttr(element, 'data-test')).toBe(true);
    });

    it('should return true when element has empty attribute', function() {
      expect(baUtil.hasAttr(element, 'disabled')).toBe(true);
    });

    it('should return false when element does not have the attribute', function() {
      expect(baUtil.hasAttr(element, 'nonexistent')).toBe(false);
    });
  });
});
