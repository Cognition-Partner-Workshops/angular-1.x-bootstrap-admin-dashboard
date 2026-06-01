(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.grid', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.grid', {
          url: '/grid',
          template: '<div id="react-ui-root"></div>',
          controller: 'UIBridgeCtrl',
          title: 'Grid',
          sidebarMeta: {
            order: 400,
          },
        });
  }

})();
