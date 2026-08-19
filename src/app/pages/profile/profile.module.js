/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile', [])
      .controller('ProfileReactBridgeCtrl', ProfileReactBridgeCtrl)
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('profile', {
          url: '/profile',
          title: 'Profile',
          template: '<div ba-panel ba-panel-class="profile-page"><div id="profile-react-mount"></div></div>',
          controller: 'ProfileReactBridgeCtrl',
        });
  }

  /** @ngInject */
  function ProfileReactBridgeCtrl($scope, layoutPaths) {
    var destroyed = false;

    $scope.$evalAsync(function () {
      if (destroyed) {
        return;
      }

      var mountElement = document.getElementById('profile-react-mount');

      if (!mountElement) {
        return;
      }

      window.mountProfileReact(mountElement, {
        layoutPaths: layoutPaths
      });
    });

    $scope.$on('$destroy', function () {
      destroyed = true;
      window.unmountProfileReact();
    });
  }

})();
