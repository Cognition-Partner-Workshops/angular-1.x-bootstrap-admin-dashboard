(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.typography', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.typography', {
          url: '/typography',
          template: '<div id="react-ui-root"></div>',
          controller: 'UIBridgeCtrl',
          title: 'Typography',
          sidebarMeta: {
            order: 0,
          },
        });
  }

})();
