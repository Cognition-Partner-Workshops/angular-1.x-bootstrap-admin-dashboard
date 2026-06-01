(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.slider', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.slider', {
          url: '/slider',
          template: '<div id="react-ui-root"></div>',
          controller: 'UIBridgeCtrl',
          title: 'Sliders',
          sidebarMeta: {
            order: 1000,
          },
        });
  }

})();
