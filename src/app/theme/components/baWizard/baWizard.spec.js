'use strict';

describe('baWizardCtrl', function() {
  var $controller, $scope, vm;

  beforeEach(module('BlurAdmin.theme'));
  beforeEach(module('BlurAdmin.theme.components'));

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
  }));

  function createController() {
    return $controller('baWizardCtrl', {
      $scope: $scope
    });
  }

  function createMockTab(isAvailable) {
    return {
      isAvailiable: function() { return isAvailable !== false; },
      select: jasmine.createSpy('select'),
      submit: jasmine.createSpy('submit'),
      setPrev: jasmine.createSpy('setPrev')
    };
  }

  describe('initialization', function() {
    beforeEach(function() {
      vm = createController();
    });

    it('should initialize tabs as empty array', function() {
      expect(vm.tabs).toBeDefined();
      expect(Array.isArray(vm.tabs)).toBe(true);
      expect(vm.tabs.length).toBe(0);
    });

    it('should initialize tabNum to 0', function() {
      expect(vm.tabNum).toBe(0);
    });

    it('should initialize progress to 0', function() {
      expect(vm.progress).toBe(0);
    });
  });

  describe('addTab', function() {
    beforeEach(function() {
      vm = createController();
    });

    it('should add tab to tabs array', function() {
      var tab = createMockTab();
      vm.addTab(tab);
      expect(vm.tabs.length).toBe(1);
    });

    it('should call setPrev on the new tab', function() {
      var tab = createMockTab();
      vm.addTab(tab);
      expect(tab.setPrev).toHaveBeenCalled();
    });

    it('should select first tab after adding', function() {
      var tab = createMockTab();
      vm.addTab(tab);
      expect(tab.select).toHaveBeenCalledWith(true);
    });
  });

  describe('selectTab', function() {
    beforeEach(function() {
      vm = createController();
      var tab1 = createMockTab();
      var tab2 = createMockTab();
      var tab3 = createMockTab();
      vm.addTab(tab1);
      vm.addTab(tab2);
      vm.addTab(tab3);
    });

    it('should change tabNum when selecting available tab', function() {
      vm.selectTab(1);
      expect(vm.tabNum).toBe(1);
    });

    it('should call submit on current tab', function() {
      vm.selectTab(1);
      expect(vm.tabs[0].submit).toHaveBeenCalled();
    });

    it('should select the new tab and deselect others', function() {
      vm.selectTab(1);
      expect(vm.tabs[1].select).toHaveBeenCalledWith(true);
    });
  });

  describe('isFirstTab', function() {
    beforeEach(function() {
      vm = createController();
      vm.addTab(createMockTab());
      vm.addTab(createMockTab());
    });

    it('should return true when on first tab', function() {
      vm.tabNum = 0;
      expect(vm.isFirstTab()).toBe(true);
    });

    it('should return false when not on first tab', function() {
      vm.tabNum = 1;
      expect(vm.isFirstTab()).toBe(false);
    });
  });

  describe('isLastTab', function() {
    beforeEach(function() {
      vm = createController();
      vm.addTab(createMockTab());
      vm.addTab(createMockTab());
    });

    it('should return false when on first tab', function() {
      vm.tabNum = 0;
      expect(vm.isLastTab()).toBe(false);
    });

    it('should return true when on last tab', function() {
      vm.tabNum = 1;
      expect(vm.isLastTab()).toBe(true);
    });
  });

  describe('nextTab', function() {
    beforeEach(function() {
      vm = createController();
      vm.addTab(createMockTab());
      vm.addTab(createMockTab());
      vm.addTab(createMockTab());
    });

    it('should increment tabNum', function() {
      vm.tabNum = 0;
      vm.nextTab();
      expect(vm.tabNum).toBe(1);
    });
  });

  describe('previousTab', function() {
    beforeEach(function() {
      vm = createController();
      vm.addTab(createMockTab());
      vm.addTab(createMockTab());
      vm.addTab(createMockTab());
    });

    it('should decrement tabNum', function() {
      vm.tabNum = 2;
      vm.previousTab();
      expect(vm.tabNum).toBe(1);
    });
  });

  describe('progress calculation', function() {
    beforeEach(function() {
      vm = createController();
      vm.addTab(createMockTab());
      vm.addTab(createMockTab());
      vm.addTab(createMockTab());
      vm.addTab(createMockTab());
    });

    it('should calculate progress as percentage', function() {
      $scope.$digest();
      expect(vm.progress).toBe(25);
    });

    it('should update progress when tab changes', function() {
      vm.selectTab(1);
      $scope.$digest();
      expect(vm.progress).toBe(50);
    });
  });
});
