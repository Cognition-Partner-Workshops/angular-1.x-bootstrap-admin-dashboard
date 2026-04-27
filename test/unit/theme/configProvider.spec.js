'use strict';

describe('Provider: baConfig', function () {
  var baConfig;

  beforeEach(module('BlurAdmin'));

  beforeEach(inject(function (_baConfig_) {
    baConfig = _baConfig_;
  }));

  describe('theme configuration', function () {
    it('should have theme property', function () {
      expect(baConfig.theme).toBeDefined();
    });

    it('should default blur to false', function () {
      expect(baConfig.theme.blur).toBe(false);
    });
  });

  describe('colors configuration', function () {
    it('should define default color', function () {
      expect(baConfig.colors.default).toBe('#ffffff');
    });

    it('should define primary color', function () {
      expect(baConfig.colors.primary).toBe('#209e91');
    });

    it('should define info color', function () {
      expect(baConfig.colors.info).toBe('#2dacd1');
    });

    it('should define success color', function () {
      expect(baConfig.colors.success).toBe('#90b900');
    });

    it('should define warning color', function () {
      expect(baConfig.colors.warning).toBe('#dfb81c');
    });

    it('should define danger color', function () {
      expect(baConfig.colors.danger).toBe('#e85656');
    });

    it('should define dashboard colors', function () {
      expect(baConfig.colors.dashboard).toBeDefined();
      expect(baConfig.colors.dashboard.blueStone).toBe('#005562');
      expect(baConfig.colors.dashboard.surfieGreen).toBe('#0e8174');
      expect(baConfig.colors.dashboard.silverTree).toBe('#6eba8c');
      expect(baConfig.colors.dashboard.gossip).toBe('#b9f2a1');
      expect(baConfig.colors.dashboard.white).toBe('#10c4b5');
    });

    it('should define light color variants', function () {
      expect(baConfig.colors.primaryLight).toBeDefined();
      expect(baConfig.colors.infoLight).toBeDefined();
      expect(baConfig.colors.successLight).toBeDefined();
      expect(baConfig.colors.warningLight).toBeDefined();
      expect(baConfig.colors.dangerLight).toBeDefined();
    });

    it('should define dark color variants', function () {
      expect(baConfig.colors.primaryDark).toBeDefined();
      expect(baConfig.colors.infoDark).toBeDefined();
      expect(baConfig.colors.successDark).toBeDefined();
      expect(baConfig.colors.warningDark).toBeDefined();
      expect(baConfig.colors.dangerDark).toBeDefined();
    });
  });

  describe('changeTheme', function () {
    it('should merge new theme settings', function () {
      baConfig.changeTheme({ blur: true });
      expect(baConfig.theme.blur).toBe(true);
    });
  });

  describe('changeColors', function () {
    it('should merge new color settings', function () {
      baConfig.changeColors({ primary: '#ff0000' });
      expect(baConfig.colors.primary).toBe('#ff0000');
    });

    it('should not affect other colors when changing one', function () {
      var originalInfo = baConfig.colors.info;
      baConfig.changeColors({ primary: '#ff0000' });
      expect(baConfig.colors.info).toBe(originalInfo);
    });
  });
});
