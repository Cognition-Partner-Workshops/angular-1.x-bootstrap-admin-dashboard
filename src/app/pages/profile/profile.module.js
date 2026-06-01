/**
 * Profile page module — migrated from AngularJS to React.
 *
 * The ui-router state is kept so the AngularJS shell (sidebar, breadcrumb) still
 * works, but the actual page content is rendered by React (see ProfileReactApp.js).
 * React Router (HashRouter) handles the /profile route inside the React tree.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile', [])
      .config(routeConfig)
      .controller('ProfileBridgeCtrl', ProfileBridgeCtrl);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('profile', {
          url: '/profile',
          title: 'Profile',
          template: '<div id="react-profile-root"></div>',
          controller: 'ProfileBridgeCtrl',
        });
  }

  /** @ngInject */
  function ProfileBridgeCtrl($scope) {
    var el = document.getElementById('react-profile-root');
    if (el && window.mountProfileReact) {
      window.mountProfileReact(el);
    }

    $scope.$on('$destroy', function () {
      if (window.unmountProfileReact) {
        window.unmountProfileReact();
      }
    });
  }

})();
