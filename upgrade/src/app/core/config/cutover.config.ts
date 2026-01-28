/**
 * Cutover Configuration
 * 
 * This configuration controls the routing behavior during the migration cutover.
 * 
 * ROLLBACK INSTRUCTIONS:
 * To rollback to legacy AngularJS, simply set CUTOVER_ENABLED to false.
 * This is a single-switch rollback mechanism.
 */

export interface CutoverConfig {
  /**
   * When true, the Angular upgrade app is the primary routing target.
   * When false, legacy AngularJS routes are primary (rollback mode).
   */
  enabled: boolean;

  /**
   * Legacy routes that should remain accessible during cutover.
   * These routes will redirect to legacy app even when cutover is enabled.
   */
  legacyExceptions: string[];

  /**
   * Route mapping from legacy to upgrade paths.
   * Used for automatic redirects when cutover is enabled.
   */
  routeMapping: Record<string, string>;

  /**
   * Parity requirements that must be met before cutover.
   */
  parityRequirements: {
    minPassRate: number;
    criticalFlowsCovered: string[];
  };
}

/**
 * CUTOVER SWITCH
 * 
 * Set to true to make /upgrade routes primary.
 * Set to false to rollback to legacy AngularJS routes.
 * 
 * This is the SINGLE SWITCH for rollback.
 */
export const CUTOVER_ENABLED = true;

/**
 * Full cutover configuration
 */
export const CUTOVER_CONFIG: CutoverConfig = {
  enabled: CUTOVER_ENABLED,

  legacyExceptions: [
    // Add any routes that should remain on legacy during transition
    // Example: '/admin/special-feature'
  ],

  routeMapping: {
    '/dashboard': '/upgrade/dashboard',
    '/form/inputs': '/upgrade/form/inputs',
    '/form/layouts': '/upgrade/form/layouts',
    '/form/wizard': '/upgrade/form/wizard',
    '/tables/basic': '/upgrade/tables/basic',
    '/tables/smart': '/upgrade/tables/smart',
    '/charts/amCharts': '/upgrade/charts/amcharts',
    '/charts/chartJs': '/upgrade/charts/chartjs',
    '/charts/chartist': '/upgrade/charts/chartist',
    '/charts/morris': '/upgrade/charts/morris',
    '/ui/typography': '/upgrade/ui/typography',
    '/ui/buttons': '/upgrade/ui/buttons',
    '/ui/icons': '/upgrade/ui/icons',
    '/ui/modals': '/upgrade/ui/modals',
    '/ui/grid': '/upgrade/ui/grid',
    '/ui/alerts': '/upgrade/ui/alerts',
    '/ui/progressBars': '/upgrade/ui/progress-bars',
    '/ui/notifications': '/upgrade/ui/notifications',
    '/ui/tabs': '/upgrade/ui/tabs',
    '/ui/slider': '/upgrade/ui/slider',
    '/ui/panels': '/upgrade/ui/panels',
    '/components/mail': '/upgrade/components/mail',
    '/components/timeline': '/upgrade/components/timeline',
    '/components/tree': '/upgrade/components/tree',
    '/maps/gmap': '/upgrade/maps/google-maps',
    '/maps/leaflet': '/upgrade/maps/leaflet',
    '/maps/bubble': '/upgrade/maps/bubble',
    '/maps/line': '/upgrade/maps/lines',
    '/profile': '/upgrade/profile'
  },

  parityRequirements: {
    minPassRate: 95,
    criticalFlowsCovered: [
      'dashboard-load',
      'navigation-sidebar',
      'form-submission',
      'table-sorting',
      'chart-rendering',
      'map-display'
    ]
  }
};

/**
 * Get the upgrade route for a legacy route
 */
export function getUpgradeRoute(legacyRoute: string): string | null {
  return CUTOVER_CONFIG.routeMapping[legacyRoute] || null;
}

/**
 * Check if a route should use legacy app
 */
export function shouldUseLegacy(route: string): boolean {
  if (!CUTOVER_CONFIG.enabled) {
    return true;
  }
  return CUTOVER_CONFIG.legacyExceptions.includes(route);
}

/**
 * Get the default route based on cutover state
 */
export function getDefaultRoute(): string {
  return CUTOVER_CONFIG.enabled ? '/upgrade/dashboard' : '/dashboard';
}
