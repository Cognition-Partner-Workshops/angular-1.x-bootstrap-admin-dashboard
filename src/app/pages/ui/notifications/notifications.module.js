/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.notifications', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.notifications', {
          url: '/notifications',
          template: '<ui-page-react></ui-page-react>',
          title: 'Notifications',
          sidebarMeta: {
            order: 700,
          },
        });
  }

})();
