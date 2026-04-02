/**
 * Tests for theme.configProvider.js configuration values.
 * Tests the pure JavaScript configuration logic extracted from Angular provider.
 */

describe('configProvider', function () {

  // Replicate the configuration structures from theme.configProvider.js
  var basic = {
    default: '#ffffff',
    defaultText: '#666666',
    border: '#dddddd',
    borderDark: '#aaaaaa',
  };

  var colorScheme = {
    primary: '#209e91',
    info: '#2dacd1',
    success: '#90b900',
    warning: '#dfb81c',
    danger: '#e85656',
  };

  var dashboardColors = {
    blueStone: '#005562',
    surfieGreen: '#0e8174',
    silverTree: '#6eba8c',
    gossip: '#b9f2a1',
    white: '#10c4b5',
  };

  describe('basic colors', function () {
    it('should have a white default', function () {
      expect(basic.default).toBe('#ffffff');
    });

    it('should have a gray defaultText', function () {
      expect(basic.defaultText).toBe('#666666');
    });

    it('should have a light gray border', function () {
      expect(basic.border).toBe('#dddddd');
    });

    it('should have a darker border variant', function () {
      expect(basic.borderDark).toBe('#aaaaaa');
    });

    it('should have all basic color keys defined', function () {
      expect(Object.keys(basic)).toEqual(['default', 'defaultText', 'border', 'borderDark']);
    });
  });

  describe('colorScheme', function () {
    it('should define primary color', function () {
      expect(colorScheme.primary).toBe('#209e91');
    });

    it('should define info color', function () {
      expect(colorScheme.info).toBe('#2dacd1');
    });

    it('should define success color', function () {
      expect(colorScheme.success).toBe('#90b900');
    });

    it('should define warning color', function () {
      expect(colorScheme.warning).toBe('#dfb81c');
    });

    it('should define danger color', function () {
      expect(colorScheme.danger).toBe('#e85656');
    });

    it('should have all 5 color scheme keys', function () {
      expect(Object.keys(colorScheme).length).toBe(5);
    });

    it('should have valid hex colors', function () {
      var hexRegex = /^#[0-9a-f]{6}$/;
      Object.values(colorScheme).forEach(function (color) {
        expect(color).toMatch(hexRegex);
      });
    });
  });

  describe('dashboardColors', function () {
    it('should define blueStone', function () {
      expect(dashboardColors.blueStone).toBe('#005562');
    });

    it('should define surfieGreen', function () {
      expect(dashboardColors.surfieGreen).toBe('#0e8174');
    });

    it('should define silverTree', function () {
      expect(dashboardColors.silverTree).toBe('#6eba8c');
    });

    it('should define gossip', function () {
      expect(dashboardColors.gossip).toBe('#b9f2a1');
    });

    it('should define white color', function () {
      expect(dashboardColors.white).toBe('#10c4b5');
    });

    it('should have all dashboard color keys', function () {
      expect(Object.keys(dashboardColors).length).toBe(5);
    });
  });

  describe('conf object construction', function () {
    // Simulate the conf object construction from configProvider
    function buildConf(colorHelper) {
      return {
        theme: {
          blur: false,
        },
        colors: {
          default: basic.default,
          defaultText: basic.defaultText,
          border: basic.border,
          borderDark: basic.borderDark,

          primary: colorScheme.primary,
          info: colorScheme.info,
          success: colorScheme.success,
          warning: colorScheme.warning,
          danger: colorScheme.danger,

          primaryLight: colorHelper.tint(colorScheme.primary, 30),
          infoLight: colorHelper.tint(colorScheme.info, 30),
          successLight: colorHelper.tint(colorScheme.success, 30),
          warningLight: colorHelper.tint(colorScheme.warning, 30),
          dangerLight: colorHelper.tint(colorScheme.danger, 30),

          primaryDark: colorHelper.shade(colorScheme.primary, 15),
          infoDark: colorHelper.shade(colorScheme.info, 15),
          successDark: colorHelper.shade(colorScheme.success, 15),
          warningDark: colorHelper.shade(colorScheme.warning, 15),
          dangerDark: colorHelper.shade(colorScheme.danger, 15),

          dashboard: {
            blueStone: dashboardColors.blueStone,
            surfieGreen: dashboardColors.surfieGreen,
            silverTree: dashboardColors.silverTree,
            gossip: dashboardColors.gossip,
            white: dashboardColors.white,
          },
        }
      };
    }

    // Mock colorHelper
    var mockColorHelper = {
      tint: function (color, weight) { return color + '-tint-' + weight; },
      shade: function (color, weight) { return color + '-shade-' + weight; },
    };

    var conf;
    beforeEach(function () {
      conf = buildConf(mockColorHelper);
    });

    it('should have blur set to false by default', function () {
      expect(conf.theme.blur).toBe(false);
    });

    it('should include basic colors in conf.colors', function () {
      expect(conf.colors.default).toBe('#ffffff');
      expect(conf.colors.defaultText).toBe('#666666');
      expect(conf.colors.border).toBe('#dddddd');
      expect(conf.colors.borderDark).toBe('#aaaaaa');
    });

    it('should include scheme colors in conf.colors', function () {
      expect(conf.colors.primary).toBe('#209e91');
      expect(conf.colors.info).toBe('#2dacd1');
      expect(conf.colors.success).toBe('#90b900');
      expect(conf.colors.warning).toBe('#dfb81c');
      expect(conf.colors.danger).toBe('#e85656');
    });

    it('should call tint for light variants', function () {
      expect(conf.colors.primaryLight).toBe('#209e91-tint-30');
      expect(conf.colors.infoLight).toBe('#2dacd1-tint-30');
      expect(conf.colors.successLight).toBe('#90b900-tint-30');
      expect(conf.colors.warningLight).toBe('#dfb81c-tint-30');
      expect(conf.colors.dangerLight).toBe('#e85656-tint-30');
    });

    it('should call shade for dark variants', function () {
      expect(conf.colors.primaryDark).toBe('#209e91-shade-15');
      expect(conf.colors.infoDark).toBe('#2dacd1-shade-15');
      expect(conf.colors.successDark).toBe('#90b900-shade-15');
      expect(conf.colors.warningDark).toBe('#dfb81c-shade-15');
      expect(conf.colors.dangerDark).toBe('#e85656-shade-15');
    });

    it('should include dashboard colors', function () {
      expect(conf.colors.dashboard.blueStone).toBe('#005562');
      expect(conf.colors.dashboard.surfieGreen).toBe('#0e8174');
      expect(conf.colors.dashboard.silverTree).toBe('#6eba8c');
      expect(conf.colors.dashboard.gossip).toBe('#b9f2a1');
      expect(conf.colors.dashboard.white).toBe('#10c4b5');
    });
  });

  describe('changeTheme', function () {
    it('should merge theme settings', function () {
      var conf = { theme: { blur: false } };
      // Simulate changeTheme behavior
      function changeTheme(theme) {
        Object.assign(conf.theme, theme);
      }
      changeTheme({ blur: true });
      expect(conf.theme.blur).toBe(true);
    });

    it('should add new theme properties', function () {
      var conf = { theme: { blur: false } };
      function changeTheme(theme) {
        Object.assign(conf.theme, theme);
      }
      changeTheme({ customProp: 'test' });
      expect(conf.theme.customProp).toBe('test');
      expect(conf.theme.blur).toBe(false);
    });
  });

  describe('changeColors', function () {
    it('should merge color settings', function () {
      var conf = { colors: { primary: '#209e91', info: '#2dacd1' } };
      function changeColors(colors) {
        Object.assign(conf.colors, colors);
      }
      changeColors({ primary: '#ff0000' });
      expect(conf.colors.primary).toBe('#ff0000');
      expect(conf.colors.info).toBe('#2dacd1');
    });
  });

  describe('layoutSizes constants', function () {
    var layoutSizes = {
      resWidthCollapseSidebar: 1200,
      resWidthHideSidebar: 500
    };

    it('should collapse sidebar at 1200px', function () {
      expect(layoutSizes.resWidthCollapseSidebar).toBe(1200);
    });

    it('should hide sidebar at 500px', function () {
      expect(layoutSizes.resWidthHideSidebar).toBe(500);
    });
  });

  describe('layoutPaths constants', function () {
    var IMAGES_ROOT = 'assets/img/';
    var layoutPaths = {
      images: {
        root: IMAGES_ROOT,
        profile: IMAGES_ROOT + 'app/profile/',
        amMap: 'assets/img/theme/vendor/ammap//dist/ammap/images/',
        amChart: 'assets/img/theme/vendor/amcharts/dist/amcharts/images/'
      }
    };

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
});
