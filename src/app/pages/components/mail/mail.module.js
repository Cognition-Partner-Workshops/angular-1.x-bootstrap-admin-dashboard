/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.mail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/components/mail', '/components/mail/inbox');

    $stateProvider
        .state('components.mail', {
          url: '/mail',
          abstract: true,
          template: '<div id="react-mail-root"></div>',
          controller: MailBridgeCtrl,
          title: 'Mail',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('components.mail.label', {
          url: '/:label',
        })
        .state('components.mail.detail', {
          url: '/:label/:id',
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
