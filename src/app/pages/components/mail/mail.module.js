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
          url: '/mail/{label}/{id}',
          params: {
            label: { value: 'inbox', squash: false },
            id: { value: null, squash: true }
          },
          template: '<components-mail-react></components-mail-react>',
          title: 'Mail',
          sidebarMeta: {
            order: 0,
          },
        });
    // The consolidated React state serves /components/mail/inbox directly;
    // redirect the bare /components/mail URL to the default inbox folder.
    $urlRouterProvider.when('/components/mail', '/components/mail/inbox');
  }

})();
