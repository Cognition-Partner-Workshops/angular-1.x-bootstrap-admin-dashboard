/**
 * AngularJS bridge for the React AmChartsPage component.
 *
 * baConfig and layoutPaths are injected via AngularJS DI (never read from
 * window) and passed as props. The React root is mounted with React 19's
 * createRoot (via mountReactApp) and unmounted on scope $destroy.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.amCharts')
    .directive('chartsAmReact', chartsAmReact);

  /** @ngInject */
  function chartsAmReact(baConfig, layoutPaths) {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var lib = window.BlurAdminReact;
        if (!lib || !lib.AmChartsPage) {
          element.html('<p class="text-danger">React bundle not loaded.</p>');
          return;
        }
        var root = lib.mountReactApp(lib.AmChartsPage, element[0], {
          baConfig: baConfig,
          layoutPaths: layoutPaths
        });
        scope.$on('$destroy', function () {
          setTimeout(function () { root.unmount(); }, 0);
        });
      }
    };
  }
})();
