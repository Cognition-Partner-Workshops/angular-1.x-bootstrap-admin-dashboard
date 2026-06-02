/**
 * AngularJS bridge for the React ChartistPage component.
 *
 * baConfig is injected via AngularJS DI (never read from window) and passed as
 * a prop. The React root is mounted with React 19's createRoot (via
 * mountReactApp) and unmounted on scope $destroy.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.chartist')
    .directive('chartsChartistReact', chartsChartistReact);

  /** @ngInject */
  function chartsChartistReact(baConfig) {
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
