/**
 * Bridge controller that mounts/unmounts the React tables app.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables')
    .controller('TablesBridgeCtrl', TablesBridgeCtrl);

  /** @ngInject */
  function TablesBridgeCtrl($scope, $timeout) {
    $timeout(function () {
      var el = document.getElementById('react-tables-root');
      if (el && window.mountTablesReact) {
        window.mountTablesReact(el);
      }
    });

    $scope.$on('$destroy', function () {
      if (window.unmountTablesReact) {
        window.unmountTablesReact();
      }
    });
  }

})();
