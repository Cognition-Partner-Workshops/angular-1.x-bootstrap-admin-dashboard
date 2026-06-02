/**
 * AngularJS bridge directives for the React-migrated Tables pages.
 *
 * <tables-basic-react> and <tables-smart-react> mount the corresponding React
 * components (exported on window.BlurAdminReact) via the createRoot-based
 * mountReactApp helper.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables')
    .directive('tablesBasicReact', tablesReactDirective('BasicTablesPage'))
    .directive('tablesSmartReact', tablesReactDirective('SmartTablesPage'));

  function tablesReactDirective(componentName) {
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
