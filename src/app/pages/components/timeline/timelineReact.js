(function () {
  'use strict';
  angular.module('BlurAdmin.pages.components.timeline')
    .directive('timelinePageReact', function () {
      return {
        restrict: 'E',
        link: function (scope, element) {
          var lib = window.BlurAdminReact;
          if (!lib || !lib.TimelinePage) {
            element.html('<p class="text-danger">React bundle not loaded.</p>');
            return;
          }
          var root = lib.mountReactApp(lib.TimelinePage, element[0], {});
          scope.$on('$destroy', function () {
            setTimeout(function () { root.unmount(); }, 0);
          });
        }
      };
    });
})();
