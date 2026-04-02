/**
 * Tests for the colorHelper utility functions from theme.constants.js
 * These are pure JavaScript functions that can be tested independently of Angular.
 */

// Extract the pure functions from theme.constants.js
function d2h(d) {
  return d.toString(16);
}

function h2d(h) {
  return parseInt(h, 16);
}

function mix(color1, color2, weight) {
  var result = '#';
  for (var i = 1; i < 7; i += 2) {
    var color1Part = h2d(color1.substr(i, 2));
    var color2Part = h2d(color2.substr(i, 2));
    var resultPart = d2h(Math.floor(color2Part + (color1Part - color2Part) * (weight / 100.0)));
    result += ('0' + resultPart).slice(-2);
  }
  return result;
}

function tint(color, weight) {
  return mix('#ffffff', color, weight);
}

function shade(color, weight) {
  return mix('#000000', color, weight);
}

describe('colorHelper', function () {

  describe('d2h (decimal to hex)', function () {
    it('should convert 0 to "0"', function () {
      expect(d2h(0)).toBe('0');
    });

    it('should convert 255 to "ff"', function () {
      expect(d2h(255)).toBe('ff');
    });

    it('should convert 16 to "10"', function () {
      expect(d2h(16)).toBe('10');
    });

    it('should convert 10 to "a"', function () {
      expect(d2h(10)).toBe('a');
    });

    it('should convert 128 to "80"', function () {
      expect(d2h(128)).toBe('80');
    });
  });

  describe('h2d (hex to decimal)', function () {
    it('should convert "0" to 0', function () {
      expect(h2d('0')).toBe(0);
    });

    it('should convert "ff" to 255', function () {
      expect(h2d('ff')).toBe(255);
    });

    it('should convert "10" to 16', function () {
      expect(h2d('10')).toBe(16);
    });

    it('should convert "a" to 10', function () {
      expect(h2d('a')).toBe(10);
    });

    it('should convert "80" to 128', function () {
      expect(h2d('80')).toBe(128);
    });

    it('should handle uppercase hex', function () {
      expect(h2d('FF')).toBe(255);
    });
  });

  describe('mix', function () {
    it('should return color2 when weight is 0', function () {
      var result = mix('#ffffff', '#000000', 0);
      expect(result).toBe('#000000');
    });

    it('should return color1 when weight is 100', function () {
      var result = mix('#ffffff', '#000000', 100);
      expect(result).toBe('#ffffff');
    });

    it('should mix two colors at 50% weight', function () {
      var result = mix('#ffffff', '#000000', 50);
      // 127 = Math.floor(0 + (255 - 0) * 0.5)
      expect(result).toBe('#7f7f7f');
    });

    it('should mix red and blue at 50%', function () {
      var result = mix('#ff0000', '#0000ff', 50);
      // R: Math.floor(0 + (255-0)*0.5) = 127 = 7f
      // G: Math.floor(0 + (0-0)*0.5) = 0 = 00
      // B: Math.floor(255 + (0-255)*0.5) = 127 = 7f
      expect(result).toBe('#7f007f');
    });

    it('should handle same colors', function () {
      var result = mix('#209e91', '#209e91', 50);
      expect(result).toBe('#209e91');
    });

    it('should handle weight of 30', function () {
      var result = mix('#ffffff', '#209e91', 30);
      // R: Math.floor(0x20 + (0xff - 0x20) * 0.30) = Math.floor(32 + 223*0.3) = Math.floor(32+66.9) = 98 = 62
      // G: Math.floor(0x9e + (0xff - 0x9e) * 0.30) = Math.floor(158 + 97*0.3) = Math.floor(158+29.1) = 187 = bb
      // B: Math.floor(0x91 + (0xff - 0x91) * 0.30) = Math.floor(145 + 110*0.3) = Math.floor(145+33) = 178 = b2
      expect(result).toBe('#62bbb2');
    });
  });

  describe('tint', function () {
    it('should lighten a color by mixing with white', function () {
      var result = tint('#000000', 50);
      expect(result).toBe('#7f7f7f');
    });

    it('should return original color at 0% tint', function () {
      var result = tint('#209e91', 0);
      expect(result).toBe('#209e91');
    });

    it('should return white at 100% tint', function () {
      var result = tint('#000000', 100);
      expect(result).toBe('#ffffff');
    });

    it('should tint the primary color at 30%', function () {
      var result = tint('#209e91', 30);
      expect(result).toBe('#62bbb2');
    });
  });

  describe('shade', function () {
    it('should darken a color by mixing with black', function () {
      var result = shade('#ffffff', 50);
      expect(result).toBe('#7f7f7f');
    });

    it('should return original color at 0% shade', function () {
      var result = shade('#209e91', 0);
      expect(result).toBe('#209e91');
    });

    it('should return black at 100% shade', function () {
      var result = shade('#ffffff', 100);
      expect(result).toBe('#000000');
    });

    it('should shade the primary color at 15%', function () {
      var result = shade('#209e91', 15);
      // R: Math.floor(0x20 + (0x00 - 0x20) * 0.15) = Math.floor(32 + (-32)*0.15) = Math.floor(32-4.8) = 27 = 1b
      // G: Math.floor(0x9e + (0x00 - 0x9e) * 0.15) = Math.floor(158 + (-158)*0.15) = Math.floor(158-23.7) = 134 = 86
      // B: Math.floor(0x91 + (0x00 - 0x91) * 0.15) = Math.floor(145 + (-145)*0.15) = Math.floor(145-21.75) = 123 = 7b
      expect(result).toBe('#1b867b');
    });
  });

  describe('color scheme generation', function () {
    var colorScheme = {
      primary: '#209e91',
      info: '#2dacd1',
      success: '#90b900',
      warning: '#dfb81c',
      danger: '#e85656',
    };

    it('should generate all light variants', function () {
      expect(tint(colorScheme.primary, 30)).toBeDefined();
      expect(tint(colorScheme.info, 30)).toBeDefined();
      expect(tint(colorScheme.success, 30)).toBeDefined();
      expect(tint(colorScheme.warning, 30)).toBeDefined();
      expect(tint(colorScheme.danger, 30)).toBeDefined();
    });

    it('should generate all dark variants', function () {
      expect(shade(colorScheme.primary, 15)).toBeDefined();
      expect(shade(colorScheme.info, 15)).toBeDefined();
      expect(shade(colorScheme.success, 15)).toBeDefined();
      expect(shade(colorScheme.warning, 15)).toBeDefined();
      expect(shade(colorScheme.danger, 15)).toBeDefined();
    });

    it('should produce lighter results for tint than the original', function () {
      // For tint (mix with white), each channel should be >= original
      var original = '#209e91';
      var tinted = tint(original, 30);
      expect(h2d(tinted.substr(1, 2))).toBeGreaterThanOrEqual(h2d(original.substr(1, 2)));
      expect(h2d(tinted.substr(3, 2))).toBeGreaterThanOrEqual(h2d(original.substr(3, 2)));
      expect(h2d(tinted.substr(5, 2))).toBeGreaterThanOrEqual(h2d(original.substr(5, 2)));
    });

    it('should produce darker results for shade than the original', function () {
      var original = '#209e91';
      var shaded = shade(original, 15);
      expect(h2d(shaded.substr(1, 2))).toBeLessThanOrEqual(h2d(original.substr(1, 2)));
      expect(h2d(shaded.substr(3, 2))).toBeLessThanOrEqual(h2d(original.substr(3, 2)));
      expect(h2d(shaded.substr(5, 2))).toBeLessThanOrEqual(h2d(original.substr(5, 2)));
    });
  });
});
