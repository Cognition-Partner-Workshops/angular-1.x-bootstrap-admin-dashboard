'use strict';

describe('Controller: baWizardCtrl', function () {
  var $scope, ctrl;

  beforeEach(module('BlurAdmin'));

  beforeEach(inject(function (_$rootScope_, $controller) {
    $scope = _$rootScope_.$new();
    ctrl = $controller('baWizardCtrl', { $scope: $scope });
  }));

  describe('initialization', function () {
    it('should initialize tabs as empty array', function () {
      expect(ctrl.tabs).toEqual([]);
    });

    it('should initialize tabNum to 0', function () {
      expect(ctrl.tabNum).toBe(0);
    });

    it('should initialize progress to 0', function () {
      expect(ctrl.progress).toBe(0);
    });
  });

  describe('tab navigation helpers', function () {
    var mockTabs;

    beforeEach(function () {
      mockTabs = [
        {
          setPrev: jasmine.createSpy('setPrev'),
          submit: jasmine.createSpy('submit'),
          select: jasmine.createSpy('select'),
          isAvailiable: jasmine.createSpy('isAvailiable').and.returnValue(true)
        },
        {
          setPrev: jasmine.createSpy('setPrev'),
          submit: jasmine.createSpy('submit'),
          select: jasmine.createSpy('select'),
          isAvailiable: jasmine.createSpy('isAvailiable').and.returnValue(true)
        },
        {
          setPrev: jasmine.createSpy('setPrev'),
          submit: jasmine.createSpy('submit'),
          select: jasmine.createSpy('select'),
          isAvailiable: jasmine.createSpy('isAvailiable').and.returnValue(true)
        }
      ];
      ctrl.tabs = mockTabs;
      ctrl.tabNum = 0;
    });

    it('isFirstTab should return true when on first tab', function () {
      ctrl.tabNum = 0;
      expect(ctrl.isFirstTab()).toBe(true);
    });

    it('isFirstTab should return false when not on first tab', function () {
      ctrl.tabNum = 1;
      expect(ctrl.isFirstTab()).toBe(false);
    });

    it('isLastTab should return true when on last tab', function () {
      ctrl.tabNum = 2;
      expect(ctrl.isLastTab()).toBe(true);
    });

    it('isLastTab should return false when not on last tab', function () {
      ctrl.tabNum = 0;
      expect(ctrl.isLastTab()).toBe(false);
    });

    it('selectTab should call submit on current tab', function () {
      ctrl.selectTab(1);
      expect(mockTabs[0].submit).toHaveBeenCalled();
    });

    it('selectTab should update tabNum when target is available', function () {
      ctrl.selectTab(1);
      expect(ctrl.tabNum).toBe(1);
    });

    it('selectTab should not change tabNum when target is not available', function () {
      mockTabs[2].isAvailiable.and.returnValue(false);
      ctrl.selectTab(2);
      expect(ctrl.tabNum).toBe(0);
    });

    it('nextTab should move to next tab', function () {
      ctrl.nextTab();
      expect(ctrl.tabNum).toBe(1);
    });

    it('previousTab should move to previous tab', function () {
      ctrl.tabNum = 2;
      ctrl.previousTab();
      expect(ctrl.tabNum).toBe(1);
    });
  });
});
