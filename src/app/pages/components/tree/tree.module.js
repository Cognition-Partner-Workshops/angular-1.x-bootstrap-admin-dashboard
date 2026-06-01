/**
 * @author a.demeshko
 * created on 12.21.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.tree', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('components.tree', {
          url: '/tree',
          template: '<div id="react-tree-root"></div>',
          controller: TreeBridgeCtrl,
          title: 'Tree View',
          sidebarMeta: {
            order: 200,
          },
        });
  }

  /** @ngInject */
  function TreeBridgeCtrl($scope) {
    var el = document.getElementById('react-tree-root');
    if (el && window.mountTreeReact) {
      window.mountTreeReact(el);
    }
    $scope.$on('$destroy', function() {
      if (window.unmountTreeReact) {
        window.unmountTreeReact();
      }
    });
  }

})();
