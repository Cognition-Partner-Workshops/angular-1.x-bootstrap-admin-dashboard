/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.ui',
    'BlurAdmin.pages.components',
    'BlurAdmin.pages.form',
    'BlurAdmin.pages.tables',
    'BlurAdmin.pages.charts',
    'BlurAdmin.pages.maps',
    'BlurAdmin.pages.profile',
  ])
      .config(routeConfig)
      .run(cutoverRedirectRun);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider, CUTOVER_CONFIG) {
    // Redirect to upgrade dashboard if cutover is enabled, otherwise legacy dashboard
    var defaultRoute = CUTOVER_CONFIG.enabled ? '/upgrade/dashboard' : '/dashboard';
    $urlRouterProvider.otherwise(defaultRoute);

    baSidebarServiceProvider.addStaticItem({
      title: 'Pages',
      icon: 'ion-document',
      subMenu: [{
        title: 'Sign In',
        fixedHref: 'auth.html',
        blank: true
      }, {
        title: 'Sign Up',
        fixedHref: 'reg.html',
        blank: true
      }, {
        title: 'User Profile',
        stateRef: 'profile'
      }, {
        title: '404 Page',
        fixedHref: '404.html',
        blank: true
      }]
    });
    baSidebarServiceProvider.addStaticItem({
      title: 'Menu Level 1',
      icon: 'ion-ios-more',
      subMenu: [{
        title: 'Menu Level 1.1',
        disabled: true
      }, {
        title: 'Menu Level 1.2',
        subMenu: [{
          title: 'Menu Level 1.2.1',
          disabled: true
        }]
      }]
    });
  }

  /** @ngInject */
  function cutoverRedirectRun($rootScope, cutoverService) {
    // Listen for state changes and redirect to upgrade routes if cutover is enabled
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (cutoverService.redirectIfCutover(toState.name)) {
        event.preventDefault();
      }
    });
  }

})();
