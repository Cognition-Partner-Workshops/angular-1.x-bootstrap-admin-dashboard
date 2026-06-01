/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.mail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('components.mail', {
          url: '/mail/{path:.*}',
          template: '<div id="react-mail-root"></div>',
          controller: MailBridgeCtrl,
          title: 'Mail',
          sidebarMeta: {
            order: 0,
          },
        });
  }

  /** @ngInject */
  function MailBridgeCtrl($scope) {
    var el = document.getElementById('react-mail-root');
    if (el && window.mountMailReact) {
      window.mountMailReact(el);
    }
    $scope.$on('$destroy', function() {
      if (window.unmountMailReact) {
        window.unmountMailReact();
      }
    });
  }

})();
