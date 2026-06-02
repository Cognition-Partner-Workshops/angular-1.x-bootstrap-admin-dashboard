/**
 * @author a.demeshko
 * created on 12/22/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.slider', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.slider', {
          url: '/slider',
          template: '<slider-react></slider-react>',
          title: 'Sliders',
          sidebarMeta: {
            order: 1000,
          },
        });
  }

})();
