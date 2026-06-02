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
          template: '<components-mail-react></components-mail-react>',
          title: 'Mail',
          sidebarMeta: {
            order: 0,
          },
        });
  }

})();
