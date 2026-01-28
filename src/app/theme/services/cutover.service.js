/**
 * Cutover Service
 * 
 * Controls routing behavior during migration cutover.
 * 
 * ROLLBACK INSTRUCTIONS:
 * To rollback to legacy AngularJS, set CUTOVER_ENABLED to false below.
 * This is a single-switch rollback mechanism.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .constant('CUTOVER_CONFIG', {
      /**
       * CUTOVER SWITCH
       * 
       * Set to true to redirect to Angular upgrade routes.
       * Set to false to use legacy AngularJS routes (rollback).
       * 
       * This is the SINGLE SWITCH for rollback in the legacy app.
       */
      enabled: true,

      /**
       * Route mapping from legacy to upgrade paths
       */
      routeMapping: {
        'dashboard': 'upgrade/dashboard',
        'form.inputs': 'upgrade/form/inputs',
        'form.layouts': 'upgrade/form/layouts',
        'form.wizard': 'upgrade/form/wizard',
        'tables.basic': 'upgrade/tables/basic',
        'tables.smart': 'upgrade/tables/smart',
        'charts.amCharts': 'upgrade/charts/amcharts',
        'charts.chartJs': 'upgrade/charts/chartjs',
        'charts.chartist': 'upgrade/charts/chartist',
        'charts.morris': 'upgrade/charts/morris',
        'ui.typography': 'upgrade/ui/typography',
        'ui.buttons': 'upgrade/ui/buttons',
        'ui.icons': 'upgrade/ui/icons',
        'ui.modals': 'upgrade/ui/modals',
        'ui.grid': 'upgrade/ui/grid',
        'ui.alerts': 'upgrade/ui/alerts',
        'ui.progressBars': 'upgrade/ui/progress-bars',
        'ui.notifications': 'upgrade/ui/notifications',
        'ui.tabs': 'upgrade/ui/tabs',
        'ui.slider': 'upgrade/ui/slider',
        'ui.panels': 'upgrade/ui/panels',
        'components.mail': 'upgrade/components/mail',
        'components.timeline': 'upgrade/components/timeline',
        'components.tree': 'upgrade/components/tree',
        'maps.gmap': 'upgrade/maps/google-maps',
        'maps.leaflet': 'upgrade/maps/leaflet',
        'maps.bubble': 'upgrade/maps/bubble',
        'maps.line': 'upgrade/maps/lines',
        'profile': 'upgrade/profile'
      },

      /**
       * Routes that should remain on legacy even when cutover is enabled
       */
      legacyExceptions: []
    })
    .service('cutoverService', CutoverService);

  /** @ngInject */
  function CutoverService(CUTOVER_CONFIG, $window) {
    var service = this;

    /**
     * Check if cutover is enabled
     */
    service.isEnabled = function() {
      return CUTOVER_CONFIG.enabled;
    };

    /**
     * Get the upgrade route for a legacy state name
     */
    service.getUpgradeRoute = function(stateName) {
      return CUTOVER_CONFIG.routeMapping[stateName] || null;
    };

    /**
     * Check if a state should use legacy routing
     */
    service.shouldUseLegacy = function(stateName) {
      if (!CUTOVER_CONFIG.enabled) {
        return true;
      }
      return CUTOVER_CONFIG.legacyExceptions.indexOf(stateName) !== -1;
    };

    /**
     * Redirect to upgrade route if cutover is enabled
     * Returns true if redirect happened, false otherwise
     */
    service.redirectIfCutover = function(stateName) {
      if (!service.isEnabled()) {
        return false;
      }

      if (service.shouldUseLegacy(stateName)) {
        return false;
      }

      var upgradeRoute = service.getUpgradeRoute(stateName);
      if (upgradeRoute) {
        $window.location.hash = '#/' + upgradeRoute;
        return true;
      }

      return false;
    };

    /**
     * Get the default route based on cutover state
     */
    service.getDefaultRoute = function() {
      return CUTOVER_CONFIG.enabled ? 'upgrade/dashboard' : 'dashboard';
    };
  }

})();
