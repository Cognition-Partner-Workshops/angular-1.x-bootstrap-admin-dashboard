'use strict';

describe('Controller: MsgCenterCtrl', function () {
  var $scope, $controller;

  beforeEach(module('BlurAdmin'));

  beforeEach(inject(function (_$rootScope_, _$controller_) {
    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    $controller('MsgCenterCtrl', { $scope: $scope });
  }));

  describe('initialization', function () {
    it('should define users object', function () {
      expect($scope.users).toBeDefined();
      expect(Object.keys($scope.users).length).toBe(4);
    });

    it('should define notifications array', function () {
      expect($scope.notifications).toBeDefined();
      expect(Array.isArray($scope.notifications)).toBe(true);
      expect($scope.notifications.length).toBe(7);
    });

    it('should define messages array', function () {
      expect($scope.messages).toBeDefined();
      expect(Array.isArray($scope.messages)).toBe(true);
      expect($scope.messages.length).toBe(7);
    });

    it('should have correct user names', function () {
      expect($scope.users[0].name).toBe('Vlad');
      expect($scope.users[1].name).toBe('Kostya');
      expect($scope.users[2].name).toBe('Andrey');
      expect($scope.users[3].name).toBe('Nasta');
    });
  });

  describe('getMessage', function () {
    it('should replace &name with user name wrapped in strong tag', function () {
      var notification = $scope.notifications[0];
      var result = $scope.getMessage(notification);
      expect(result.$$unwrapTrustedValue()).toContain('<strong>Vlad</strong>');
    });

    it('should handle notifications without userId', function () {
      var notification = $scope.notifications[2];
      var result = $scope.getMessage(notification);
      expect(result.$$unwrapTrustedValue()).toBe('New orders received.');
    });

    it('should handle userId of 0 correctly', function () {
      var notification = { userId: 0, template: '&name did something.' };
      var result = $scope.getMessage(notification);
      expect(result.$$unwrapTrustedValue()).toContain('<strong>Vlad</strong>');
    });
  });

  describe('notification structure', function () {
    it('each notification should have template and time', function () {
      $scope.notifications.forEach(function (n) {
        expect(n.template).toBeDefined();
        expect(n.time).toBeDefined();
      });
    });

    it('each message should have text and time', function () {
      $scope.messages.forEach(function (m) {
        expect(m.text).toBeDefined();
        expect(m.time).toBeDefined();
      });
    });
  });
});
