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
    $stateProvider
        .state('components.mail', {
          url: '/mail',
          abstract: true,
          template: '<mail-page-react></mail-page-react><div ui-view style="display:none"></div>',
          title: 'Mail',
          sidebarMeta: {
            order: 0,
          },
        }).state('components.mail.label', {
          url: '/:label',
          template: '',
          title: 'Mail',
        }).state('components.mail.detail', {
          url: '/:label/:id',
          template: '',
          title: 'Mail',
        });
    $urlRouterProvider.when('/components/mail', '/components/mail/inbox');
  }

})();
