/**
 * Tests for baUtil service functions.
 * Tests the pure JavaScript logic extracted from the Angular service wrapper.
 */

describe('baUtil', function () {

  describe('isDescendant', function () {
    // Simulate DOM-like parent/child relationship with plain objects
    function createNode(parent) {
      return { parentNode: parent };
    }

    it('should return true when child is a direct descendant of parent', function () {
      var parent = { parentNode: null };
      var child = createNode(parent);

      // Implement the logic from baUtil.isDescendant
      function isDescendant(parent, child) {
        var node = child.parentNode;
        while (node != null) {
          if (node == parent) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      }

      expect(isDescendant(parent, child)).toBe(true);
    });

    it('should return true when child is a nested descendant of parent', function () {
      var grandparent = { parentNode: null };
      var parent = createNode(grandparent);
      var child = createNode(parent);

      function isDescendant(parent, child) {
        var node = child.parentNode;
        while (node != null) {
          if (node == parent) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      }

      expect(isDescendant(grandparent, child)).toBe(true);
    });

    it('should return false when child is not a descendant of parent', function () {
      var parent1 = { parentNode: null };
      var parent2 = { parentNode: null };
      var child = createNode(parent2);

      function isDescendant(parent, child) {
        var node = child.parentNode;
        while (node != null) {
          if (node == parent) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      }

      expect(isDescendant(parent1, child)).toBe(false);
    });

    it('should return false when child has no parent', function () {
      var parent = { parentNode: null };
      var child = { parentNode: null };

      function isDescendant(parent, child) {
        var node = child.parentNode;
        while (node != null) {
          if (node == parent) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      }

      expect(isDescendant(parent, child)).toBe(false);
    });

    it('should handle deeply nested DOM structures', function () {
      var root = { parentNode: null };
      var level1 = createNode(root);
      var level2 = createNode(level1);
      var level3 = createNode(level2);
      var level4 = createNode(level3);

      function isDescendant(parent, child) {
        var node = child.parentNode;
        while (node != null) {
          if (node == parent) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      }

      expect(isDescendant(root, level4)).toBe(true);
      expect(isDescendant(level1, level4)).toBe(true);
      expect(isDescendant(level3, level4)).toBe(true);
      expect(isDescendant(level4, root)).toBe(false);
    });
  });

  describe('hexToRGB', function () {
    function hexToRGB(hex, alpha) {
      var r = parseInt(hex.slice(1, 3), 16);
      var g = parseInt(hex.slice(3, 5), 16);
      var b = parseInt(hex.slice(5, 7), 16);
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }

    it('should convert white hex to rgba', function () {
      expect(hexToRGB('#ffffff', 1)).toBe('rgba(255, 255, 255, 1)');
    });

    it('should convert black hex to rgba', function () {
      expect(hexToRGB('#000000', 1)).toBe('rgba(0, 0, 0, 1)');
    });

    it('should convert primary color with alpha', function () {
      expect(hexToRGB('#209e91', 0.5)).toBe('rgba(32, 158, 145, 0.5)');
    });

    it('should handle alpha of 0', function () {
      expect(hexToRGB('#ff0000', 0)).toBe('rgba(255, 0, 0, 0)');
    });

    it('should handle pure red', function () {
      expect(hexToRGB('#ff0000', 1)).toBe('rgba(255, 0, 0, 1)');
    });

    it('should handle pure green', function () {
      expect(hexToRGB('#00ff00', 1)).toBe('rgba(0, 255, 0, 1)');
    });

    it('should handle pure blue', function () {
      expect(hexToRGB('#0000ff', 1)).toBe('rgba(0, 0, 255, 1)');
    });

    it('should handle decimal alpha values', function () {
      expect(hexToRGB('#209e91', 0.75)).toBe('rgba(32, 158, 145, 0.75)');
    });

    it('should handle info color', function () {
      expect(hexToRGB('#2dacd1', 1)).toBe('rgba(45, 172, 209, 1)');
    });

    it('should handle success color', function () {
      expect(hexToRGB('#90b900', 0.8)).toBe('rgba(144, 185, 0, 0.8)');
    });
  });
});
