/**
 * AngularJS → React bridge directives for the Form module.
 *
 * Each directive mounts a React page component (bundled into
 * window.BlurAdminReact by webpack) into the AngularJS view via the
 * mountReactApp helper (React 19 createRoot under the hood).
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
      .directive('formInputsReact', reactBridge('FormInputsPage'))
      .directive('formLayoutsReact', reactBridge('FormLayoutsPage'))
      .directive('formWizardReact', reactBridge('FormWizardPage'));

  function reactBridge(componentName) {
    return function () {
      return {
        restrict: 'E',
        link: function (scope, element) {
          var lib = window.BlurAdminReact;
          if (!lib || !lib[componentName]) {
            element.html('<p class="text-danger">React bundle not loaded.</p>');
            return;
          }
          var root = lib.mountReactApp(lib[componentName], element[0], {});
          scope.$on('$destroy', function () {
            setTimeout(function () { root.unmount(); }, 0);
          });
        }
      };
    };
  }
})();
