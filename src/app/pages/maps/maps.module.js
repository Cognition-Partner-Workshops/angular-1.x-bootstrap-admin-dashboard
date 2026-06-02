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
          template: '<gmap-react></gmap-react>',
          title: 'Google Maps',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('maps.leaflet', {
          url: '/leaflet',
          template: '<leaflet-react></leaflet-react>',
          title: 'Leaflet Maps',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('maps.bubble', {
          url: '/bubble',
          template: '<map-bubbles-react></map-bubbles-react>',
          title: 'Bubble Maps',
          sidebarMeta: {
            order: 200,
          },
        })
        .state('maps.line', {
          url: '/line',
          template: '<map-lines-react></map-lines-react>',
          title: 'Line Maps',
          sidebarMeta: {
            order: 300,
          },
        });
  }

})();
