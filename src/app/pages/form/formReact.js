/**
 * AngularJS bridges mounting the migrated React form pages into the
 * UI-Router states. Each directive mounts a component exposed by the
 * BlurAdminReact UMD bundle via mountReactApp (React 19 createRoot).
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
