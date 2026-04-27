'use strict';

describe('BlurAdmin Application', function () {

  beforeEach(module('BlurAdmin'));

  describe('module registration', function () {
    it('should be registered', function () {
      expect(function () {
        angular.module('BlurAdmin');
      }).not.toThrow();
    });

    it('should have BlurAdmin.theme dependency', function () {
      var module = angular.module('BlurAdmin');
      expect(module.requires).toContain('BlurAdmin.theme');
    });

    it('should have BlurAdmin.pages dependency', function () {
      var module = angular.module('BlurAdmin');
      expect(module.requires).toContain('BlurAdmin.pages');
    });

    it('should have ui.router dependency', function () {
      var module = angular.module('BlurAdmin');
      expect(module.requires).toContain('ui.router');
    });

    it('should have ngAnimate dependency', function () {
      var module = angular.module('BlurAdmin');
      expect(module.requires).toContain('ngAnimate');
    });

    it('should have ui.bootstrap dependency', function () {
      var module = angular.module('BlurAdmin');
      expect(module.requires).toContain('ui.bootstrap');
    });

    it('should have smart-table dependency', function () {
      var module = angular.module('BlurAdmin');
      expect(module.requires).toContain('smart-table');
    });

    it('should have toastr dependency', function () {
      var module = angular.module('BlurAdmin');
      expect(module.requires).toContain('toastr');
    });
  });

  describe('BlurAdmin.theme module', function () {
    it('should be registered', function () {
      expect(function () {
        angular.module('BlurAdmin.theme');
      }).not.toThrow();
    });
  });

  describe('BlurAdmin.pages module', function () {
    it('should be registered', function () {
      expect(function () {
        angular.module('BlurAdmin.pages');
      }).not.toThrow();
    });

    it('should depend on BlurAdmin.pages.dashboard', function () {
      var module = angular.module('BlurAdmin.pages');
      expect(module.requires).toContain('BlurAdmin.pages.dashboard');
    });

    it('should depend on BlurAdmin.pages.charts', function () {
      var module = angular.module('BlurAdmin.pages');
      expect(module.requires).toContain('BlurAdmin.pages.charts');
    });

    it('should depend on BlurAdmin.pages.tables', function () {
      var module = angular.module('BlurAdmin.pages');
      expect(module.requires).toContain('BlurAdmin.pages.tables');
    });

    it('should depend on BlurAdmin.pages.form', function () {
      var module = angular.module('BlurAdmin.pages');
      expect(module.requires).toContain('BlurAdmin.pages.form');
    });

    it('should depend on BlurAdmin.pages.ui', function () {
      var module = angular.module('BlurAdmin.pages');
      expect(module.requires).toContain('BlurAdmin.pages.ui');
    });

    it('should depend on BlurAdmin.pages.components', function () {
      var module = angular.module('BlurAdmin.pages');
      expect(module.requires).toContain('BlurAdmin.pages.components');
    });

    it('should depend on BlurAdmin.pages.maps', function () {
      var module = angular.module('BlurAdmin.pages');
      expect(module.requires).toContain('BlurAdmin.pages.maps');
    });

    it('should depend on BlurAdmin.pages.profile', function () {
      var module = angular.module('BlurAdmin.pages');
      expect(module.requires).toContain('BlurAdmin.pages.profile');
    });
  });
});
