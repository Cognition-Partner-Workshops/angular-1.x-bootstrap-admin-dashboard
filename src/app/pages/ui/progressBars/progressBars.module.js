/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.progressBars', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.progressBars', {
          url: '/progressBars',
          template: '<ui-progress-bars></ui-progress-bars>',
          title: 'Progress Bars',
          sidebarMeta: {
            order: 600,
          },
        });
  }

})();
