/**
 * AngularJS bridge for the React MorrisPage component.
 *
 * baConfig is injected via AngularJS DI (never read from window) and passed as
 * a prop. The React root is mounted with React 19's createRoot (via
 * mountReactApp) and unmounted on scope $destroy.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.morris')
    .directive('chartsMorrisReact', chartsMorrisReact);

  /** @ngInject */
  function chartsMorrisReact(baConfig) {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var lib = window.BlurAdminReact;
        if (!lib || !lib.MorrisPage) {
          element.html('<p class="text-danger">React bundle not loaded.</p>');
          return;
        }
        var root = lib.mountReactApp(lib.MorrisPage, element[0], {
          baConfig: baConfig
        });
        scope.$on('$destroy', function () {
          setTimeout(function () { root.unmount(); }, 0);
        });
      }
    };
  }
})();
