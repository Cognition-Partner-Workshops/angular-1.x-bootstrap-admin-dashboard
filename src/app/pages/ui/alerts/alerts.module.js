(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.alerts', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.alerts', {
          url: '/alerts',
          template: '<div id="react-ui-root"></div>',
          controller: 'UIBridgeCtrl',
          title: 'Alerts',
          sidebarMeta: {
            order: 500,
          },
        });
  }

})();
