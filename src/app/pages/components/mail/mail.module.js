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
          url: '/mail',
          template: '<components-react></components-react>',
          title: 'Mail',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('components.mail.label', {
          url: '/:label',
          title: 'Mail',
        })
        .state('components.mail.detail', {
          url: '/:label/:id',
          title: 'Mail',
        });
  }

})();
