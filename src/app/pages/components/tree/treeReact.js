/**
 * AngularJS bridge for the React tree view page.
 * Mounts the ComponentsTreePage React component into the
 * <components-tree-react> element used by the components.tree state.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.tree')
    .directive('componentsTreeReact', componentsTreeReact);

  function componentsTreeReact() {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var lib = window.BlurAdminReact;
        if (!lib || !lib.ComponentsTreePage) {
          element.html('<p class="text-danger">React bundle not loaded.</p>');
          return;
        }
        var root = lib.mountReactApp(lib.ComponentsTreePage, element[0], {});
        scope.$on('$destroy', function () {
          setTimeout(function () { root.unmount(); }, 0);
        });
      },
    };
  }
})();
