'use strict';

describe('baPanel Factory', function() {
  var baPanel;

  beforeEach(module('BlurAdmin.theme'));

  beforeEach(inject(function(_baPanel_) {
    baPanel = _baPanel_;
  }));

  describe('directive configuration', function() {
    it('should have restrict set to "A" (attribute)', function() {
      expect(baPanel.restrict).toBe('A');
    });

    it('should have transclude enabled', function() {
      expect(baPanel.transclude).toBe(true);
    });

    it('should have template function', function() {
      expect(typeof baPanel.template).toBe('function');
    });
  });

  describe('template function', function() {
    it('should return panel-body div without title when no baPanelTitle', function() {
      var elem = {};
      var attrs = {};
      var template = baPanel.template(elem, attrs);
      expect(template).toContain('panel-body');
      expect(template).toContain('ng-transclude');
      expect(template).not.toContain('panel-heading');
    });

    it('should include panel-heading when baPanelTitle is provided', function() {
      var elem = {};
      var attrs = { baPanelTitle: 'Test Title' };
      var template = baPanel.template(elem, attrs);
      expect(template).toContain('panel-heading');
      expect(template).toContain('panel-title');
      expect(template).toContain('Test Title');
    });

    it('should place title before body', function() {
      var elem = {};
      var attrs = { baPanelTitle: 'Test Title' };
      var template = baPanel.template(elem, attrs);
      var headingIndex = template.indexOf('panel-heading');
      var bodyIndex = template.indexOf('panel-body');
      expect(headingIndex).toBeLessThan(bodyIndex);
    });

    it('should include clearfix class in heading', function() {
      var elem = {};
      var attrs = { baPanelTitle: 'Test Title' };
      var template = baPanel.template(elem, attrs);
      expect(template).toContain('clearfix');
    });
  });
});
