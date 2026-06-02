/**
 * Bridge directive — mounts the React ProfilePage into the AngularJS view.
 *
 * The React component is exposed via the BlurAdminReact UMD bundle
 * built by webpack (see webpack.react.config.js).
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile')
    .directive('profilePageReact', profilePageReact);

  function profilePageReact() {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var lib = window.BlurAdminReact;
        if (!lib || !lib.ProfilePage) {
          element.html('<p class="text-danger">React bundle not loaded.</p>');
          return;
        }
        var root = lib.mountReactApp(lib.ProfilePage, element[0], {});

        scope.$on('$destroy', function () {
          setTimeout(function () { root.unmount(); }, 0);
        });
      }
    };
  }
})();
