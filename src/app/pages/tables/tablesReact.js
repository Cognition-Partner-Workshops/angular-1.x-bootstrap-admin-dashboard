/**
 * AngularJS → React bridge for the Tables module.
 *
 * Mounts the migrated React page components (BasicTablesPage / SmartTablesPage)
 * from the webpack-built bundle (window.BlurAdminReact) into the AngularJS
 * UI-Router states tables.basic and tables.smart.
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
