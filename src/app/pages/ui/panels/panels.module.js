/**
 * @author v.lugovsky
 * created on 23.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.panels', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.panels', {
          url: '/panels',
          template: '<ui-page-react></ui-page-react>',
          title: 'Panels',
          sidebarMeta: {
            order: 1100,
          },
        });
  }

})();
