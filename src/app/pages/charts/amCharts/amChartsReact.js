/**
 * AngularJS bridge for the React AmChartsPage component.
 * Injects baConfig + layoutPaths (Angular services) and passes them as props,
 * so the React component never reads theme config from window.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.amCharts')
    .directive('amChartsReact', amChartsReact);

  /** @ngInject */
  function amChartsReact(baConfig, layoutPaths) {
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
