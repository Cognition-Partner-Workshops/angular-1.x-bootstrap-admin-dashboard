(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.chartJs')
    .directive('chartJsReact', ['baConfig', function (baConfig) {
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
    }]);
})();
