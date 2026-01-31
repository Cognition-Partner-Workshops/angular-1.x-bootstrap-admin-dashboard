'use strict';

describe('baConfig Provider', function() {
  var baConfig;

  beforeEach(module('BlurAdmin.theme'));

  beforeEach(inject(function(_baConfig_) {
    baConfig = _baConfig_;
  }));

  describe('initial configuration', function() {
    it('should have theme configuration with blur set to false by default', function() {
      expect(baConfig.theme).toBeDefined();
      expect(baConfig.theme.blur).toBe(false);
    });

    it('should have colors configuration', function() {
      expect(baConfig.colors).toBeDefined();
    });

    it('should have primary color defined', function() {
      expect(baConfig.colors.primary).toBe('#209e91');
    });

    it('should have info color defined', function() {
      expect(baConfig.colors.info).toBe('#2dacd1');
    });

    it('should have success color defined', function() {
      expect(baConfig.colors.success).toBe('#90b900');
    });

    it('should have warning color defined', function() {
      expect(baConfig.colors.warning).toBe('#dfb81c');
    });

    it('should have danger color defined', function() {
      expect(baConfig.colors.danger).toBe('#e85656');
    });

    it('should have default color defined', function() {
      expect(baConfig.colors.default).toBe('#ffffff');
    });

    it('should have defaultText color defined', function() {
      expect(baConfig.colors.defaultText).toBe('#666666');
    });

    it('should have border color defined', function() {
      expect(baConfig.colors.border).toBe('#dddddd');
    });

    it('should have borderDark color defined', function() {
      expect(baConfig.colors.borderDark).toBe('#aaaaaa');
    });
  });

  describe('light color variants', function() {
    it('should have primaryLight color defined', function() {
      expect(baConfig.colors.primaryLight).toBeDefined();
    });

    it('should have infoLight color defined', function() {
      expect(baConfig.colors.infoLight).toBeDefined();
    });

    it('should have successLight color defined', function() {
      expect(baConfig.colors.successLight).toBeDefined();
    });

    it('should have warningLight color defined', function() {
      expect(baConfig.colors.warningLight).toBeDefined();
    });

    it('should have dangerLight color defined', function() {
      expect(baConfig.colors.dangerLight).toBeDefined();
    });
  });

  describe('dark color variants', function() {
    it('should have primaryDark color defined', function() {
      expect(baConfig.colors.primaryDark).toBeDefined();
    });

    it('should have infoDark color defined', function() {
      expect(baConfig.colors.infoDark).toBeDefined();
    });

    it('should have successDark color defined', function() {
      expect(baConfig.colors.successDark).toBeDefined();
    });

    it('should have warningDark color defined', function() {
      expect(baConfig.colors.warningDark).toBeDefined();
    });

    it('should have dangerDark color defined', function() {
      expect(baConfig.colors.dangerDark).toBeDefined();
    });
  });

  describe('dashboard colors', function() {
    it('should have dashboard colors object', function() {
      expect(baConfig.colors.dashboard).toBeDefined();
    });

    it('should have blueStone dashboard color', function() {
      expect(baConfig.colors.dashboard.blueStone).toBe('#005562');
    });

    it('should have surfieGreen dashboard color', function() {
      expect(baConfig.colors.dashboard.surfieGreen).toBe('#0e8174');
    });

    it('should have silverTree dashboard color', function() {
      expect(baConfig.colors.dashboard.silverTree).toBe('#6eba8c');
    });

    it('should have gossip dashboard color', function() {
      expect(baConfig.colors.dashboard.gossip).toBe('#b9f2a1');
    });

    it('should have white dashboard color', function() {
      expect(baConfig.colors.dashboard.white).toBe('#10c4b5');
    });
  });

  describe('changeTheme method', function() {
    it('should have changeTheme method', function() {
      expect(baConfig.changeTheme).toBeDefined();
      expect(typeof baConfig.changeTheme).toBe('function');
    });

    it('should update theme blur setting', function() {
      baConfig.changeTheme({ blur: true });
      expect(baConfig.theme.blur).toBe(true);
    });
  });

  describe('changeColors method', function() {
    it('should have changeColors method', function() {
      expect(baConfig.changeColors).toBeDefined();
      expect(typeof baConfig.changeColors).toBe('function');
    });

    it('should update primary color', function() {
      baConfig.changeColors({ primary: '#ff0000' });
      expect(baConfig.colors.primary).toBe('#ff0000');
    });

    it('should preserve other colors when changing one', function() {
      var originalInfo = baConfig.colors.info;
      baConfig.changeColors({ primary: '#ff0000' });
      expect(baConfig.colors.info).toBe(originalInfo);
    });
  });
});
