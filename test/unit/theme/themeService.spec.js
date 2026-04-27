'use strict';

describe('Service: themeLayoutSettings', function () {
  var themeLayoutSettings;

  beforeEach(module('BlurAdmin'));

  beforeEach(inject(function (_themeLayoutSettings_) {
    themeLayoutSettings = _themeLayoutSettings_;
  }));

  it('should be defined', function () {
    expect(themeLayoutSettings).toBeDefined();
  });

  it('should have blur property', function () {
    expect(themeLayoutSettings.blur).toBeDefined();
  });

  it('should default blur to false', function () {
    expect(themeLayoutSettings.blur).toBe(false);
  });

  it('should have mobile property', function () {
    expect(themeLayoutSettings.mobile).toBeDefined();
  });

  it('should detect mobile based on user agent', function () {
    expect(typeof themeLayoutSettings.mobile).toBe('boolean');
  });
});
