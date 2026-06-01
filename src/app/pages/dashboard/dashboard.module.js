/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          template: '<div id="react-dashboard-root"></div>',
          controller: 'DashboardBridgeCtrl',
          title: 'Dashboard',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardBridgeCtrl', DashboardBridgeCtrl);

  /** @ngInject */
  function DashboardBridgeCtrl($scope) {
    var el = document.getElementById('react-dashboard-root');
    if (el && window.mountDashboardReact) {
      window.mountDashboardReact(el);
    }
    $scope.$on('$destroy', function () {
      if (window.unmountDashboardReact) {
        window.unmountDashboardReact();
      }
    });
  }

})();
