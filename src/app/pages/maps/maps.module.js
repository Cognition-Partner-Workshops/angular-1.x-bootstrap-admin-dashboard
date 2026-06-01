/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.maps', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('maps', {
          url: '/maps',
          templateUrl: 'app/pages/maps/maps.html',
          abstract: true,
          title: 'Maps',
          sidebarMeta: {
            icon: 'ion-ios-location-outline',
            order: 500,
          },
        })
        .state('maps.gmap', {
          url: '/gmap',
          template: '<div id="react-maps-gmap-root"></div>',
          controller: 'GmapBridgeCtrl',
          title: 'Google Maps',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('maps.leaflet', {
          url: '/leaflet',
          template: '<div id="react-maps-leaflet-root"></div>',
          controller: 'LeafletBridgeCtrl',
          title: 'Leaflet Maps',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('maps.bubble', {
          url: '/bubble',
          template: '<div id="react-maps-bubble-root"></div>',
          controller: 'BubbleBridgeCtrl',
          title: 'Bubble Maps',
          sidebarMeta: {
            order: 200,
          },
        })
        .state('maps.line', {
          url: '/line',
          template: '<div id="react-maps-line-root"></div>',
          controller: 'LineBridgeCtrl',
          title: 'Line Maps',
          sidebarMeta: {
            order: 300,
          },
        });
  }

  angular.module('BlurAdmin.pages.maps')
    .controller('GmapBridgeCtrl', function ($scope) {
      var el = document.getElementById('react-maps-gmap-root');
      if (el && window.mountMapsReact) {
        window.mountMapsReact(el);
      }
      $scope.$on('$destroy', function () {
        if (window.unmountMapsReact) {
          window.unmountMapsReact();
        }
      });
    })
    .controller('LeafletBridgeCtrl', function ($scope) {
      var el = document.getElementById('react-maps-leaflet-root');
      if (el && window.mountMapsReact) {
        window.mountMapsReact(el);
      }
      $scope.$on('$destroy', function () {
        if (window.unmountMapsReact) {
          window.unmountMapsReact();
        }
      });
    })
    .controller('BubbleBridgeCtrl', function ($scope) {
      var el = document.getElementById('react-maps-bubble-root');
      if (el && window.mountMapsReact) {
        window.mountMapsReact(el);
      }
      $scope.$on('$destroy', function () {
        if (window.unmountMapsReact) {
          window.unmountMapsReact();
        }
      });
    })
    .controller('LineBridgeCtrl', function ($scope) {
      var el = document.getElementById('react-maps-line-root');
      if (el && window.mountMapsReact) {
        window.mountMapsReact(el);
      }
      $scope.$on('$destroy', function () {
        if (window.unmountMapsReact) {
          window.unmountMapsReact();
        }
      });
    });

})();
