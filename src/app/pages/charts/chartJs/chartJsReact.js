/**
 * AngularJS bridge for the React ChartJsPage component.
 *
 * baConfig is injected via AngularJS DI (never read from window) and passed as
 * a prop. The React root is mounted with React 19's createRoot (via
 * mountReactApp) and unmounted on scope $destroy.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.chartJs')
    .directive('chartsChartjsReact', chartsChartjsReact);

  /** @ngInject */
  function chartsChartjsReact(baConfig) {
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
