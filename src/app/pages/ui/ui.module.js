(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui', [
    'BlurAdmin.pages.ui.typography',
    'BlurAdmin.pages.ui.buttons',
    'BlurAdmin.pages.ui.icons',
    'BlurAdmin.pages.ui.modals',
    'BlurAdmin.pages.ui.grid',
    'BlurAdmin.pages.ui.alerts',
    'BlurAdmin.pages.ui.progressBars',
    'BlurAdmin.pages.ui.notifications',
    'BlurAdmin.pages.ui.tabs',
    'BlurAdmin.pages.ui.slider',
    'BlurAdmin.pages.ui.panels',
  ])
      .config(routeConfig)
      .controller('UIBridgeCtrl', UIBridgeCtrl);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui', {
          url: '/ui',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'UI Features',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 200,
          },
        });
  }

  /** @ngInject */
  function UIBridgeCtrl($scope) {
    var el = document.getElementById('react-ui-root');
    if (el && window.mountUIReact) {
      window.mountUIReact(el);
    }
    $scope.$on('$destroy', function() {
      if (window.unmountUIReact) {
        window.unmountUIReact();
      }
    });
  }

})();
