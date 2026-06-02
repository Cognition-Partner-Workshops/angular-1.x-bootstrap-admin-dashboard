(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
    .directive('formInputsReact', function () {
      return {
        restrict: 'E',
        link: function (scope, element) {
          var lib = window.BlurAdminReact;
          if (!lib || !lib.FormInputsPage) {
            element.html('<p class="text-danger">React bundle not loaded.</p>');
            return;
          }
          var root = lib.mountReactApp(lib.FormInputsPage, element[0], {});
          scope.$on('$destroy', function () {
            setTimeout(function () { root.unmount(); }, 0);
          });
        }
      };
    })
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
    })
    .directive('formWizardReact', function () {
      return {
        restrict: 'E',
        link: function (scope, element) {
          var lib = window.BlurAdminReact;
          if (!lib || !lib.FormWizardPage) {
            element.html('<p class="text-danger">React bundle not loaded.</p>');
            return;
          }
          var root = lib.mountReactApp(lib.FormWizardPage, element[0], {});
          scope.$on('$destroy', function () {
            setTimeout(function () { root.unmount(); }, 0);
          });
        }
      };
    });
})();
