/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.modals', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.modals', {
          url: '/modals',
          template: '<ui-modals></ui-modals>',
          title: 'Modals',
          sidebarMeta: {
            order: 300,
          },
        });
  }

})();
