/**
 * @author a.demeshko
 * created on 1/12/16
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.timeline', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('components.timeline', {
        url: '/timeline',
        template: '<div id="react-timeline-root"></div>',
        controller: TimelineBridgeCtrl,
        title: 'Timeline',
        sidebarMeta: {
          icon: 'ion-ios-pulse',
          order: 100,
        },
      });
  }

  /** @ngInject */
  function TimelineBridgeCtrl($scope) {
    var el = document.getElementById('react-timeline-root');
    if (el && window.mountTimelineReact) {
      window.mountTimelineReact(el);
    }
    $scope.$on('$destroy', function() {
      if (window.unmountTimelineReact) {
        window.unmountTimelineReact();
      }
    });
  }
})();
