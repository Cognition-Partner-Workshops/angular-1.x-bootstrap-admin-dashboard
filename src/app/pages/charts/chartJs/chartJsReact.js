/**
 * AngularJS bridge for the React ChartJsPage component.
 * Injects baConfig (Angular service) and passes it as a prop.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.chartJs')
    .directive('chartJsReact', chartJsReact);

  /** @ngInject */
  function chartJsReact(baConfig) {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var lib = window.BlurAdminReact;
        if (!lib || !lib.ChartJsPage) {
          element.html('<p class="text-danger">React bundle not loaded.</p>');
          return;
        }
        var root = lib.mountReactApp(lib.ChartJsPage, element[0], {
          baConfig: baConfig
        });
        scope.$on('$destroy', function () {
          setTimeout(function () { root.unmount(); }, 0);
        });
      }
    };
  }
})();
