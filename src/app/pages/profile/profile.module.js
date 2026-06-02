/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile', [])
      .config(routeConfig)
      .directive('profilePageReact', profilePageReactDirective);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('profile', {
          url: '/profile',
          title: 'Profile',
          template: '<profile-page-react></profile-page-react>',
        });
  }

  function profilePageReactDirective() {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var root;
        if (window.__mountProfilePage) {
          root = window.__mountProfilePage(element[0]);
        }
        scope.$on('$destroy', function () {
          if (root) {
            root.unmount();
          }
        });
      }
    };
  }

})();
