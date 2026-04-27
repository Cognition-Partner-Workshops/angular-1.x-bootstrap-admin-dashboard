'use strict';

describe('baSidebarService', function () {
  var baSidebarService;

  beforeEach(module('BlurAdmin'));

  beforeEach(inject(function (_baSidebarService_) {
    baSidebarService = _baSidebarService_;
  }));

  describe('menu collapse state', function () {
    it('should have isMenuCollapsed method', function () {
      expect(baSidebarService.isMenuCollapsed).toBeDefined();
    });

    it('should toggle menu collapsed state', function () {
      var initial = baSidebarService.isMenuCollapsed();
      baSidebarService.toggleMenuCollapsed();
      expect(baSidebarService.isMenuCollapsed()).toBe(!initial);
    });

    it('should set menu collapsed state explicitly', function () {
      baSidebarService.setMenuCollapsed(true);
      expect(baSidebarService.isMenuCollapsed()).toBe(true);
      baSidebarService.setMenuCollapsed(false);
      expect(baSidebarService.isMenuCollapsed()).toBe(false);
    });

    it('should toggle back to original state after double toggle', function () {
      var initial = baSidebarService.isMenuCollapsed();
      baSidebarService.toggleMenuCollapsed();
      baSidebarService.toggleMenuCollapsed();
      expect(baSidebarService.isMenuCollapsed()).toBe(initial);
    });
  });

  describe('getMenuItems', function () {
    it('should return an array of menu items', function () {
      var items = baSidebarService.getMenuItems();
      expect(Array.isArray(items)).toBe(true);
    });

    it('should include dashboard item', function () {
      var items = baSidebarService.getMenuItems();
      var dashboardItem = items.find(function (item) {
        return item.title === 'Dashboard';
      });
      expect(dashboardItem).toBeDefined();
    });

    it('should include static Pages item', function () {
      var items = baSidebarService.getMenuItems();
      var pagesItem = items.find(function (item) {
        return item.title === 'Pages';
      });
      expect(pagesItem).toBeDefined();
    });

    it('menu items should have required properties', function () {
      var items = baSidebarService.getMenuItems();
      var dynamicItems = items.filter(function (item) {
        return item.stateRef;
      });
      dynamicItems.forEach(function (item) {
        expect(item.name).toBeDefined();
        expect(item.title).toBeDefined();
        expect(item.icon).toBeDefined();
      });
    });
  });

  describe('shouldMenuBeCollapsed', function () {
    it('should return a boolean value', function () {
      var result = baSidebarService.shouldMenuBeCollapsed();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('canSidebarBeHidden', function () {
    it('should return a boolean value', function () {
      var result = baSidebarService.canSidebarBeHidden();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('getAllStateRefsRecursive', function () {
    it('should return state refs for items with subMenu', function () {
      var items = baSidebarService.getMenuItems();
      var pagesItem = items.find(function (item) {
        return item.title === 'Pages';
      });
      if (pagesItem) {
        var refs = baSidebarService.getAllStateRefsRecursive(pagesItem);
        expect(Array.isArray(refs)).toBe(true);
        expect(refs).toContain('profile');
      }
    });

    it('should return empty array for items without subMenu', function () {
      var item = { title: 'No Sub', subMenu: null };
      var refs = baSidebarService.getAllStateRefsRecursive(item);
      expect(refs).toEqual([]);
    });
  });
});
