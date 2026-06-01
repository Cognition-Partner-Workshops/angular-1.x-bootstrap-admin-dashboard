/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form', ['ui.select', 'ngSanitize'])
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
          template: '<react-form-inputs></react-form-inputs>',
          title: 'Form Inputs',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('form.layouts', {
          url: '/layouts',
          template: '<react-form-layouts></react-form-layouts>',
          title: 'Form Layouts',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('form.wizard',
        {
          url: '/wizard',
          template: '<react-form-wizard></react-form-wizard>',
          title: 'Form Wizard',
          sidebarMeta: {
            order: 200,
          },
        });
  }
})();
