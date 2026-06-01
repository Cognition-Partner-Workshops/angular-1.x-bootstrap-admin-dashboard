/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.alerts', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.alerts', {
          url: '/alerts',
          template: '<ui-alerts></ui-alerts>',
          title: 'Alerts',
          sidebarMeta: {
            order: 500,
          },
        });
  }

})();
