'use strict';

describe('WizardCtrl', function() {
  var $controller, $scope, vm;

  beforeEach(module('BlurAdmin.theme'));
  beforeEach(module('BlurAdmin.pages.form'));

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
  }));

  function createController() {
    return $controller('WizardCtrl', {
      $scope: $scope
    });
  }

  describe('initialization', function() {
    beforeEach(function() {
      vm = createController();
    });

    it('should initialize personalInfo as empty object', function() {
      expect(vm.personalInfo).toBeDefined();
      expect(typeof vm.personalInfo).toBe('object');
    });

    it('should initialize productInfo as empty object', function() {
      expect(vm.productInfo).toBeDefined();
      expect(typeof vm.productInfo).toBe('object');
    });

    it('should initialize shipment as empty object', function() {
      expect(vm.shipment).toBeDefined();
      expect(typeof vm.shipment).toBe('object');
    });

    it('should have arePersonalInfoPasswordsEqual function', function() {
      expect(typeof vm.arePersonalInfoPasswordsEqual).toBe('function');
    });
  });

  describe('arePersonalInfoPasswordsEqual', function() {
    beforeEach(function() {
      vm = createController();
    });

    it('should return false when confirmPassword is not set', function() {
      vm.personalInfo.password = 'password123';
      expect(vm.arePersonalInfoPasswordsEqual()).toBeFalsy();
    });

    it('should return false when passwords do not match', function() {
      vm.personalInfo.password = 'password123';
      vm.personalInfo.confirmPassword = 'differentPassword';
      expect(vm.arePersonalInfoPasswordsEqual()).toBeFalsy();
    });

    it('should return true when passwords match', function() {
      vm.personalInfo.password = 'password123';
      vm.personalInfo.confirmPassword = 'password123';
      expect(vm.arePersonalInfoPasswordsEqual()).toBeTruthy();
    });

    it('should return false when both passwords are empty strings', function() {
      vm.personalInfo.password = '';
      vm.personalInfo.confirmPassword = '';
      expect(vm.arePersonalInfoPasswordsEqual()).toBeFalsy();
    });

    it('should return true for complex matching passwords', function() {
      vm.personalInfo.password = 'C0mpl3x!P@ssw0rd#123';
      vm.personalInfo.confirmPassword = 'C0mpl3x!P@ssw0rd#123';
      expect(vm.arePersonalInfoPasswordsEqual()).toBeTruthy();
    });
  });

  describe('form data storage', function() {
    beforeEach(function() {
      vm = createController();
    });

    it('should store personal info data', function() {
      vm.personalInfo.firstName = 'John';
      vm.personalInfo.lastName = 'Doe';
      vm.personalInfo.email = 'john@example.com';
      
      expect(vm.personalInfo.firstName).toBe('John');
      expect(vm.personalInfo.lastName).toBe('Doe');
      expect(vm.personalInfo.email).toBe('john@example.com');
    });

    it('should store product info data', function() {
      vm.productInfo.name = 'Product A';
      vm.productInfo.quantity = 5;
      
      expect(vm.productInfo.name).toBe('Product A');
      expect(vm.productInfo.quantity).toBe(5);
    });

    it('should store shipment data', function() {
      vm.shipment.address = '123 Main St';
      vm.shipment.city = 'New York';
      
      expect(vm.shipment.address).toBe('123 Main St');
      expect(vm.shipment.city).toBe('New York');
    });
  });
});
