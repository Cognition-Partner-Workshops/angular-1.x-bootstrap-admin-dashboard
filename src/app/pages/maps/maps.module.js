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
          template: '<react-google-maps></react-google-maps>',
          title: 'Google Maps',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('maps.leaflet', {
          url: '/leaflet',
          template: '<react-leaflet-map></react-leaflet-map>',
          title: 'Leaflet Maps',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('maps.bubble', {
          url: '/bubble',
          template: '<react-map-bubbles></react-map-bubbles>',
          title: 'Bubble Maps',
          sidebarMeta: {
            order: 200,
          },
        })
        .state('maps.line', {
          url: '/line',
          template: '<react-map-lines></react-map-lines>',
          title: 'Line Maps',
          sidebarMeta: {
            order: 300,
          },
        });
  }

})();
