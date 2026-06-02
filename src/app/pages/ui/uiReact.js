/**
 * AngularJS bridge for the React-migrated UI page module.
 *
 * Each ui.* child state renders <ui-page-react>. This directive mounts the
 * React UiRoutes component (HashRouter), which reads the current #/ui/... hash
 * and renders the matching migrated page.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui')
      .directive('uiPageReact', uiPageReact);

  /** @ngInject */
  function uiPageReact() {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var lib = window.BlurAdminReact;
        if (!lib || !lib.UiRoutes) {
          element.html('<p class="text-danger">React bundle not loaded.</p>');
          return;
        }
        var root = lib.mountReactApp(lib.UiRoutes, element[0], {});
        scope.$on('$destroy', function () {
          setTimeout(function () { root.unmount(); }, 0);
        });
      }
    };
  }

})();
