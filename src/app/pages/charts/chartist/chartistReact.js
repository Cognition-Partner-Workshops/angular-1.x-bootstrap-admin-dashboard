/**
 * AngularJS bridge for the React ChartistPage component.
 * Injects baConfig (Angular service) and passes it as a prop.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.chartist')
    .directive('chartistReact', chartistReact);

  /** @ngInject */
  function chartistReact(baConfig) {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var lib = window.BlurAdminReact;
        if (!lib || !lib.ChartistPage) {
          element.html('<p class="text-danger">React bundle not loaded.</p>');
          return;
        }
        var root = lib.mountReactApp(lib.ChartistPage, element[0], {
          baConfig: baConfig
        });
        scope.$on('$destroy', function () {
          setTimeout(function () { root.unmount(); }, 0);
        });
      }
    };
  }
})();
