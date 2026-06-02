/**
 * AngularJS → React bridge for the dashboard module.
 *
 * Mounts the React <DashboardPage> (from the BlurAdminReact webpack bundle) and
 * injects the AngularJS theme services it needs (baConfig, layoutPaths, baUtil)
 * as props, so the React tree never reads them from the global window object.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardReact', dashboardReact);

  /** @ngInject */
  function dashboardReact(baConfig, layoutPaths, baUtil) {
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
          layoutPaths: layoutPaths,
          baUtil: baUtil,
        });

        scope.$on('$destroy', function () {
          setTimeout(function () { root.unmount(); }, 0);
        });
      }
    };
  }
})();
