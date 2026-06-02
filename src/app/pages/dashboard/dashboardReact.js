/**
 * AngularJS bridge for the React-migrated dashboard page.
 *
 * Mounts the React <DashboardPage> component into the <dashboard-react> element
 * and injects the theme services (baConfig, colorHelper, layoutPaths, baUtil)
 * as props — these must come from AngularJS DI, never from window.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .directive('dashboardReact', dashboardReact);

  /** @ngInject */
  function dashboardReact(baConfig, colorHelper, layoutPaths, baUtil) {
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
          colorHelper: colorHelper,
          layoutPaths: layoutPaths,
          baUtil: baUtil,
        });
        scope.$on('$destroy', function () {
          setTimeout(function () { root.unmount(); }, 0);
        });
      },
    };
  }
})();
