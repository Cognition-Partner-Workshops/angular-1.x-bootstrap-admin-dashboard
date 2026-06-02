/**
 * AngularJS bridge for the React mail page.
 *
 * Mounts the ComponentsMailPage React component into the
 * <components-mail-react> element used by the (now consolidated)
 * components.mail state. The current folder/message come from the UI-Router
 * state params and are passed as props; navigation is delegated back to
 * UI-Router via $state.go so the URL stays the single source of truth.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.mail')
    .directive('componentsMailReact', componentsMailReact);

  /** @ngInject */
  function componentsMailReact($state, $stateParams, $timeout) {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var lib = window.BlurAdminReact;
        if (!lib || !lib.ComponentsMailPage) {
          element.html('<p class="text-danger">React bundle not loaded.</p>');
          return;
        }

        var props = {
          label: $stateParams.label || 'inbox',
          id: $stateParams.id || null,
          navigate: function (label, id) {
            $timeout(function () {
              $state.go('components.mail', { label: label, id: id || null });
            });
          },
        };

        var root = lib.mountReactApp(lib.ComponentsMailPage, element[0], props);
        scope.$on('$destroy', function () {
          setTimeout(function () { root.unmount(); }, 0);
        });
      },
    };
  }
})();
