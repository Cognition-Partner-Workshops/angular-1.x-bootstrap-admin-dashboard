(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .directive('dashboardReact', ['baConfig', 'layoutPaths', function (baConfig, layoutPaths) {
      return {
        restrict: 'E',
        link: function (scope, element) {
          var lib = window.BlurAdminReact;
          if (!lib || !lib.DashboardPage) {
            element.html('<p class="text-danger">React bundle not loaded.</p>');
            return;
          }
          var root = lib.mountReactApp(lib.DashboardPage, element[0], {
            baConfig: baConfig,
            layoutPaths: layoutPaths
          });
          scope.$on('$destroy', function () {
            setTimeout(function () { root.unmount(); }, 0);
          });
        }
      };
    }]);
})();
