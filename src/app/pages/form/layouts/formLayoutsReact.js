(function () {
  'use strict';
  angular.module('BlurAdmin.pages.form')
    .directive('formLayoutsReact', function () {
      return {
        restrict: 'E',
        link: function (scope, element) {
          var lib = window.BlurAdminReact;
          if (!lib || !lib.FormLayoutsPage) {
            element.html('<p class="text-danger">React bundle not loaded.</p>');
            return;
          }
          var root = lib.mountReactApp(lib.FormLayoutsPage, element[0], {});
          scope.$on('$destroy', function () {
            setTimeout(function () { root.unmount(); }, 0);
          });
        }
      };
    });
})();
