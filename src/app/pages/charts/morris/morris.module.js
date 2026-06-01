/**
 * @author a.demeshko
 * created on 12/18/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.morris', [])
    .config(routeConfig).config(function(baConfigProvider){
      var layoutColors = baConfigProvider.colors;
      Morris.Donut.prototype.defaults.backgroundColor = 'transparent';
      Morris.Donut.prototype.defaults.labelColor = layoutColors.defaultText;
      Morris.Grid.prototype.gridDefaults.gridLineColor = layoutColors.borderDark;
      Morris.Grid.prototype.gridDefaults.gridTextColor = layoutColors.defaultText;
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('charts.morris', {
          url: '/morris',
          template: '<div id="react-morris-root"></div>',
          controller: 'MorrisBridgeCtrl',
          title: 'Morris',
          sidebarMeta: {
            order: 300,
          }
        });
  }

  angular.module('BlurAdmin.pages.charts.morris')
    .controller('MorrisBridgeCtrl', MorrisBridgeCtrl);

  /** @ngInject */
  function MorrisBridgeCtrl($scope, baConfig) {
    var el = document.getElementById('react-morris-root');
    if (el && window.mountMorrisReact) {
      window.mountMorrisReact(el, baConfig.colors);
    }
    $scope.$on('$destroy', function () {
      if (window.unmountMorrisReact) {
        window.unmountMorrisReact();
      }
    });
  }

})();
