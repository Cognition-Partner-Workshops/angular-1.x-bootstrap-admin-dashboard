'use strict';

describe('baSidebarService', function() {
  var baSidebarService;
  var $state;
  var layoutSizes;

  beforeEach(module('BlurAdmin.theme'));
  beforeEach(module('BlurAdmin.theme.components'));

  beforeEach(function() {
    module(function($stateProvider) {
      $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          title: 'Dashboard',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0
          }
        })
        .state('forms', {
          url: '/forms',
          title: 'Forms',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 100
          }
        })
        .state('forms.inputs', {
          url: '/inputs',
          title: 'Form Inputs',
          sidebarMeta: {
            order: 0
          }
        })
        .state('forms.wizard', {
          url: '/wizard',
          title: 'Form Wizard',
          sidebarMeta: {
            order: 100
          }
        })
        .state('noSidebar', {
          url: '/no-sidebar',
          title: 'No Sidebar'
        });
    });
  });

  beforeEach(inject(function(_baSidebarService_, _$state_, _layoutSizes_) {
    baSidebarService = _baSidebarService_;
    $state = _$state_;
    layoutSizes = _layoutSizes_;
  }));

  describe('getMenuItems', function() {
    it('should return an array of menu items', function() {
      var menuItems = baSidebarService.getMenuItems();
      expect(Array.isArray(menuItems)).toBe(true);
    });

    it('should return top-level menu items with level 0', function() {
      var menuItems = baSidebarService.getMenuItems();
      var topLevelItems = menuItems.filter(function(item) {
        return item.level === 0;
      });
      expect(topLevelItems.length).toBeGreaterThan(0);
    });

    it('should include dashboard in menu items', function() {
      var menuItems = baSidebarService.getMenuItems();
      var dashboard = menuItems.find(function(item) {
        return item.name === 'dashboard';
      });
      expect(dashboard).toBeDefined();
      expect(dashboard.title).toBe('Dashboard');
    });

    it('should include forms with subMenu', function() {
      var menuItems = baSidebarService.getMenuItems();
      var forms = menuItems.find(function(item) {
        return item.name === 'forms';
      });
      expect(forms).toBeDefined();
      expect(forms.subMenu).toBeDefined();
      expect(forms.subMenu.length).toBe(2);
    });

    it('should not include states without sidebarMeta', function() {
      var menuItems = baSidebarService.getMenuItems();
      var noSidebar = menuItems.find(function(item) {
        return item.name === 'noSidebar';
      });
      expect(noSidebar).toBeUndefined();
    });
  });

  describe('menu collapse state', function() {
    it('should have isMenuCollapsed method', function() {
      expect(typeof baSidebarService.isMenuCollapsed).toBe('function');
    });

    it('should have setMenuCollapsed method', function() {
      expect(typeof baSidebarService.setMenuCollapsed).toBe('function');
    });

    it('should have toggleMenuCollapsed method', function() {
      expect(typeof baSidebarService.toggleMenuCollapsed).toBe('function');
    });

    it('should set menu collapsed state', function() {
      baSidebarService.setMenuCollapsed(true);
      expect(baSidebarService.isMenuCollapsed()).toBe(true);

      baSidebarService.setMenuCollapsed(false);
      expect(baSidebarService.isMenuCollapsed()).toBe(false);
    });

    it('should toggle menu collapsed state', function() {
      baSidebarService.setMenuCollapsed(false);
      baSidebarService.toggleMenuCollapsed();
      expect(baSidebarService.isMenuCollapsed()).toBe(true);

      baSidebarService.toggleMenuCollapsed();
      expect(baSidebarService.isMenuCollapsed()).toBe(false);
    });
  });

  describe('shouldMenuBeCollapsed', function() {
    it('should have shouldMenuBeCollapsed method', function() {
      expect(typeof baSidebarService.shouldMenuBeCollapsed).toBe('function');
    });

    it('should return boolean value', function() {
      var result = baSidebarService.shouldMenuBeCollapsed();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('canSidebarBeHidden', function() {
    it('should have canSidebarBeHidden method', function() {
      expect(typeof baSidebarService.canSidebarBeHidden).toBe('function');
    });

    it('should return boolean value', function() {
      var result = baSidebarService.canSidebarBeHidden();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('getAllStateRefsRecursive', function() {
    it('should have getAllStateRefsRecursive method', function() {
      expect(typeof baSidebarService.getAllStateRefsRecursive).toBe('function');
    });

    it('should return array of state refs for item with subMenu', function() {
      var menuItems = baSidebarService.getMenuItems();
      var forms = menuItems.find(function(item) {
        return item.name === 'forms';
      });
      var stateRefs = baSidebarService.getAllStateRefsRecursive(forms);
      expect(Array.isArray(stateRefs)).toBe(true);
      expect(stateRefs.length).toBe(2);
    });

    it('should return empty array for item without subMenu', function() {
      var menuItems = baSidebarService.getMenuItems();
      var dashboard = menuItems.find(function(item) {
        return item.name === 'dashboard';
      });
      var stateRefs = baSidebarService.getAllStateRefsRecursive(dashboard);
      expect(Array.isArray(stateRefs)).toBe(true);
      expect(stateRefs.length).toBe(0);
    });
  });
});
