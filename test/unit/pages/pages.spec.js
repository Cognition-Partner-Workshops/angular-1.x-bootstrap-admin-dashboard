'use strict';

describe('BlurAdmin.pages module', function () {
  var $state;

  beforeEach(module('BlurAdmin'));

  beforeEach(inject(function (_$state_) {
    $state = _$state_;
  }));

  describe('route configuration', function () {
    it('should have dashboard state', function () {
      var state = $state.get('dashboard');
      expect(state).toBeDefined();
      expect(state.url).toBe('/dashboard');
    });

    it('should have profile state', function () {
      var state = $state.get('profile');
      expect(state).toBeDefined();
      expect(state.url).toBe('/profile');
    });

    it('should have tables state', function () {
      var state = $state.get('tables');
      expect(state).toBeDefined();
    });

    it('should have form state', function () {
      var state = $state.get('form');
      expect(state).toBeDefined();
    });

    it('should have charts state', function () {
      var state = $state.get('charts');
      expect(state).toBeDefined();
    });

    it('should have maps state', function () {
      var state = $state.get('maps');
      expect(state).toBeDefined();
    });

    it('should have ui state', function () {
      var state = $state.get('ui');
      expect(state).toBeDefined();
    });

    it('should have components state', function () {
      var state = $state.get('components');
      expect(state).toBeDefined();
    });

    it('dashboard state should have sidebarMeta', function () {
      var state = $state.get('dashboard');
      expect(state.sidebarMeta).toBeDefined();
      expect(state.sidebarMeta.icon).toBe('ion-android-home');
      expect(state.sidebarMeta.order).toBe(0);
    });

    it('dashboard state should have title', function () {
      var state = $state.get('dashboard');
      expect(state.title).toBe('Dashboard');
    });
  });

  describe('default route', function () {
    it('should have $urlRouterProvider configured', inject(function ($urlRouter) {
      expect($urlRouter).toBeDefined();
    }));
  });
});
