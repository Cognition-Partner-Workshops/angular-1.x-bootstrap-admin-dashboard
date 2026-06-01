/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('form', {
          url: '/form',
          template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Form Elements',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
        })
        .state('form.inputs', {
          url: '/inputs',
          template: '<div id="react-form-root"></div>',
          controller: 'FormBridgeCtrl',
          title: 'Form Inputs',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('form.layouts', {
          url: '/layouts',
          template: '<div id="react-form-root"></div>',
          controller: 'FormBridgeCtrl',
          title: 'Form Layouts',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('form.wizard', {
          url: '/wizard',
          template: '<div id="react-form-root"></div>',
          controller: 'FormBridgeCtrl',
          title: 'Form Wizard',
          sidebarMeta: {
            order: 200,
          },
        });
  }

  angular.module('BlurAdmin.pages.form').controller('FormBridgeCtrl', FormBridgeCtrl);

  /** @ngInject */
  function FormBridgeCtrl($scope) {
    var el = document.getElementById('react-form-root');
    if (el && window.mountFormReact) {
      window.mountFormReact(el);
    }
    $scope.$on('$destroy', function () {
      if (window.unmountFormReact) {
        window.unmountFormReact();
      }
    });
  }
})();
