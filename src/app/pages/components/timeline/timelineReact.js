/**
 * AngularJS bridge for the React timeline page.
 * Mounts the ComponentsTimelinePage React component into the
 * <components-timeline-react> element used by the components.timeline state.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.timeline')
    .directive('componentsTimelineReact', componentsTimelineReact);

  function componentsTimelineReact() {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var lib = window.BlurAdminReact;
        if (!lib || !lib.ComponentsTimelinePage) {
          element.html('<p class="text-danger">React bundle not loaded.</p>');
          return;
        }
        var root = lib.mountReactApp(lib.ComponentsTimelinePage, element[0], {});
        scope.$on('$destroy', function () {
          setTimeout(function () { root.unmount(); }, 0);
        });
      },
    };
  }
})();
