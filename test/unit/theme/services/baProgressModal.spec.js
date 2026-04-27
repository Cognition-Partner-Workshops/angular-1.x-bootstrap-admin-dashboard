'use strict';

describe('Factory: baProgressModal', function () {
  var baProgressModal, $uibModal, mockModalInstance;

  beforeEach(module('BlurAdmin'));

  beforeEach(module(function ($provide) {
    mockModalInstance = {
      close: jasmine.createSpy('close'),
      dismiss: jasmine.createSpy('dismiss')
    };
    $uibModal = {
      open: jasmine.createSpy('open').and.returnValue(mockModalInstance)
    };
    $provide.value('$uibModal', $uibModal);
  }));

  beforeEach(inject(function (_baProgressModal_) {
    baProgressModal = _baProgressModal_;
  }));

  describe('setProgress / getProgress', function () {
    it('should default progress to 0', function () {
      expect(baProgressModal.getProgress()).toBe(0);
    });

    it('should set and get progress value', function () {
      baProgressModal.setProgress(50);
      expect(baProgressModal.getProgress()).toBe(50);
    });

    it('should throw error if progress exceeds max', function () {
      expect(function () {
        baProgressModal.setProgress(101);
      }).toThrow();
    });

    it('should allow setting progress to max (100)', function () {
      baProgressModal.setProgress(100);
      expect(baProgressModal.getProgress()).toBe(100);
    });
  });

  describe('open', function () {
    it('should open a modal', function () {
      baProgressModal.open();
      expect($uibModal.open).toHaveBeenCalled();
    });

    it('should throw error if modal is already open', function () {
      baProgressModal.open();
      expect(function () {
        baProgressModal.open();
      }).toThrow();
    });

    it('should open with correct configuration', function () {
      baProgressModal.open();
      var config = $uibModal.open.calls.mostRecent().args[0];
      expect(config.animation).toBe(true);
      expect(config.size).toBe('sm');
      expect(config.keyboard).toBe(false);
      expect(config.backdrop).toBe('static');
    });
  });

  describe('close', function () {
    it('should close the modal when open', function () {
      baProgressModal.open();
      baProgressModal.close();
      expect(mockModalInstance.close).toHaveBeenCalled();
    });

    it('should throw error if modal is not open', function () {
      expect(function () {
        baProgressModal.close();
      }).toThrow();
    });

    it('should allow reopening after close', function () {
      baProgressModal.open();
      baProgressModal.close();
      baProgressModal.open();
      expect($uibModal.open).toHaveBeenCalledTimes(2);
    });
  });
});
