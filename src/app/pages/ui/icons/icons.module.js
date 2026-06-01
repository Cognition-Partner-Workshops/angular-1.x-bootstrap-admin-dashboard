/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.icons', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.icons', {
          url: '/icons',
          template: '<ui-icons></ui-icons>',
          title: 'Icons',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
