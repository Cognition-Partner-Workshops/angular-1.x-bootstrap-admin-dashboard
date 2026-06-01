/**
 * @author a.demeshko
 * created on 12/16/15
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.charts.chartJs', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('charts.chartJs', {
                url: '/chartJs',
                template: '<div id="react-chartjs-root"></div>',
                controller: 'ChartJsBridgeCtrl',
                title: 'Chart.js',
                sidebarMeta: {
                    order: 200
                }
            });
    }

    angular.module('BlurAdmin.pages.charts.chartJs')
      .controller('ChartJsBridgeCtrl', ChartJsBridgeCtrl);

    /** @ngInject */
    function ChartJsBridgeCtrl($scope, baConfig) {
      var el = document.getElementById('react-chartjs-root');
      if (el && window.mountChartJsReact) {
        window.mountChartJsReact(el, baConfig.colors);
      }
      $scope.$on('$destroy', function () {
        if (window.unmountChartJsReact) {
          window.unmountChartJsReact();
        }
      });
    }

})();
