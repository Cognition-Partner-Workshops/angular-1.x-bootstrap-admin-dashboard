/**
 * Test helpers - provides mock modules for dependencies that are
 * difficult to load in a test environment (e.g., jQuery plugins
 * and UMD libraries that fail under Karma's module-aware context).
 */
(function () {
  'use strict';

  // Mock $.jstree (jQuery plugin) for tree components
  if (typeof jQuery !== 'undefined' && !jQuery.jstree) {
    jQuery.jstree = {
      defaults: {
        core: {
          themes: {
            url: false,
            dir: ''
          }
        },
        alltrigger: null
      },
      plugins: {
        alltrigger: function () {}
      },
      core: { prototype: {} }
    };
    jQuery.fn.jstree = function () { return this; };
  }

  // Mock AmCharts global
  if (typeof window.AmCharts === 'undefined') {
    window.AmCharts = {
      ready: function (callback) {
        if (callback) callback();
      },
      useUTC: false
    };
  }

  // Mock modules that rely on UMD/rangy and are not testable in Karma
  var mockModules = [
    'ngJsTree',
    'ngSanitize',
    'textAngular',
    'textAngularSetup'
  ];

  mockModules.forEach(function (name) {
    try {
      angular.module(name);
    } catch (e) {
      angular.module(name, []);
    }
  });
})();
