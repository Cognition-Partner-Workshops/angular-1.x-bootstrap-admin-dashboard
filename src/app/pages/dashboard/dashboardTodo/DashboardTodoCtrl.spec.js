'use strict';

describe('DashboardTodoCtrl', function() {
  var $controller, $scope, baConfig;

  beforeEach(module('BlurAdmin.theme'));
  beforeEach(module('BlurAdmin.pages.dashboard'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _baConfig_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    baConfig = _baConfig_;
  }));

  function createController() {
    return $controller('DashboardTodoCtrl', {
      $scope: $scope,
      baConfig: baConfig
    });
  }

  describe('initialization', function() {
    beforeEach(function() {
      createController();
    });

    it('should set transparent based on baConfig theme blur', function() {
      expect($scope.transparent).toBe(baConfig.theme.blur);
    });

    it('should initialize todoList with items', function() {
      expect($scope.todoList).toBeDefined();
      expect(Array.isArray($scope.todoList)).toBe(true);
      expect($scope.todoList.length).toBeGreaterThan(0);
    });

    it('should assign colors to each todo item', function() {
      $scope.todoList.forEach(function(item) {
        expect(item.color).toBeDefined();
      });
    });

    it('should initialize newTodoText as empty string', function() {
      expect($scope.newTodoText).toBe('');
    });

    it('should have addToDoItem function', function() {
      expect(typeof $scope.addToDoItem).toBe('function');
    });
  });

  describe('addToDoItem', function() {
    beforeEach(function() {
      createController();
    });

    it('should add new item when Enter key is pressed (keyCode 13)', function() {
      var initialLength = $scope.todoList.length;
      $scope.newTodoText = 'New todo item';
      $scope.addToDoItem({ which: 13 }, false);
      expect($scope.todoList.length).toBe(initialLength + 1);
    });

    it('should add new item at the beginning of the list', function() {
      $scope.newTodoText = 'New todo item';
      $scope.addToDoItem({ which: 13 }, false);
      expect($scope.todoList[0].text).toBe('New todo item');
    });

    it('should clear newTodoText after adding item', function() {
      $scope.newTodoText = 'New todo item';
      $scope.addToDoItem({ which: 13 }, false);
      expect($scope.newTodoText).toBe('');
    });

    it('should add new item when clickPlus is true', function() {
      var initialLength = $scope.todoList.length;
      $scope.newTodoText = 'New todo item';
      $scope.addToDoItem({}, true);
      expect($scope.todoList.length).toBe(initialLength + 1);
    });

    it('should not add item for other key presses', function() {
      var initialLength = $scope.todoList.length;
      $scope.newTodoText = 'New todo item';
      $scope.addToDoItem({ which: 65 }, false);
      expect($scope.todoList.length).toBe(initialLength);
    });

    it('should assign color to new todo item', function() {
      $scope.newTodoText = 'New todo item';
      $scope.addToDoItem({ which: 13 }, false);
      expect($scope.todoList[0].color).toBeDefined();
    });
  });

  describe('todoList default items', function() {
    beforeEach(function() {
      createController();
    });

    it('should have "Check me out" as first default item', function() {
      expect($scope.todoList[0].text).toBe('Check me out');
    });

    it('should have 10 default todo items', function() {
      expect($scope.todoList.length).toBe(10);
    });
  });
});
