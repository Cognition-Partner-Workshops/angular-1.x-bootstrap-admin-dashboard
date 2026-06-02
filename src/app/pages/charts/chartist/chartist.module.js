/**
 * @author a.demeshko
 * created on 12/17/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.chartist', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('charts.chartist', {
          url: '/chartist',
          template: '<charts-chartist-react></charts-chartist-react>',
          title: 'Chartist',
          sidebarMeta: {
            order: 100,
          },
        });
  }

})();