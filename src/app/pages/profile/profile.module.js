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
          template: '<div id="profile-react-mount"></div>',
          controller: 'ProfileReactBridgeCtrl',
        });
  }

  /** @ngInject */
  function ProfileReactBridgeCtrl($scope, layoutPaths) {
    var mountElement = document.getElementById('profile-react-mount');

    window.mountProfileReact(mountElement, {
      layoutPaths: layoutPaths
    });

    $scope.$on('$destroy', function () {
      window.unmountProfileReact();
    });
  }

})();
