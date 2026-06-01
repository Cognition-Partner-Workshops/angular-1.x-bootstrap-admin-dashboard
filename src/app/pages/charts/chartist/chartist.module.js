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
          template: '<div id="react-chartist-root"></div>',
          controller: 'ChartistBridgeCtrl',
          title: 'Chartist',
          sidebarMeta: {
            order: 100,
          },
        });
  }

  angular.module('BlurAdmin.pages.charts.chartist')
    .controller('ChartistBridgeCtrl', ChartistBridgeCtrl);

  /** @ngInject */
  function ChartistBridgeCtrl($scope, baConfig) {
    var el = document.getElementById('react-chartist-root');
    if (el && window.mountChartistReact) {
      window.mountChartistReact(el, baConfig.colors);
    }
    $scope.$on('$destroy', function () {
      if (window.unmountChartistReact) {
        window.unmountChartistReact();
      }
    });
  }

})();
