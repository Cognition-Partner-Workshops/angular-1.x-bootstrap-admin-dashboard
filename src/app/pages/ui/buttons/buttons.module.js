/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.buttons', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.buttons', {
          url: '/buttons',
          template: '<ui-page-react></ui-page-react>',
          title: 'Buttons',
          sidebarMeta: {
            order: 100,
          },
        });
  }

})();
