/**
 * Parity Test Configuration
 * 
 * Provides route mappings and test utilities for dual-target E2E testing.
 * Routes are mapped between legacy AngularJS and upgrade Angular apps.
 */

export interface RouteMapping {
  screenId: string;
  name: string;
  legacyPath: string;
  upgradePath: string;
  testId: string;
}

/**
 * Route mappings for all migrated screens.
 * Legacy uses hash-based routing: /#/path
 * Upgrade uses hash-based routing under /upgrade: /#/upgrade/path
 */
export const ROUTE_MAPPINGS: RouteMapping[] = [
  // Dashboard
  { screenId: 'SCR-001', name: 'Dashboard', legacyPath: '/#/dashboard', upgradePath: '/#/upgrade/dashboard', testId: 'NAV-001' },
  
  // Form Elements
  { screenId: 'SCR-011', name: 'Form Inputs', legacyPath: '/#/form/inputs', upgradePath: '/#/upgrade/form/inputs', testId: 'FORM-001' },
  { screenId: 'SCR-012', name: 'Form Layouts', legacyPath: '/#/form/layouts', upgradePath: '/#/upgrade/form/layouts', testId: 'FORM-008' },
  { screenId: 'SCR-013', name: 'Form Wizard', legacyPath: '/#/form/wizard', upgradePath: '/#/upgrade/form/wizard', testId: 'FORM-009' },
  
  // Tables
  { screenId: 'SCR-021', name: 'Basic Tables', legacyPath: '/#/tables/basic', upgradePath: '/#/upgrade/tables/basic', testId: 'TBL-001' },
  { screenId: 'SCR-022', name: 'Smart Tables', legacyPath: '/#/tables/smart', upgradePath: '/#/upgrade/tables/smart', testId: 'TBL-002' },
  
  // Charts
  { screenId: 'SCR-031', name: 'amCharts', legacyPath: '/#/charts/amCharts', upgradePath: '/#/upgrade/charts/amcharts', testId: 'CHART-001' },
  { screenId: 'SCR-032', name: 'Chart.js', legacyPath: '/#/charts/chartJs', upgradePath: '/#/upgrade/charts/chartjs', testId: 'CHART-009' },
  { screenId: 'SCR-033', name: 'Chartist', legacyPath: '/#/charts/chartist', upgradePath: '/#/upgrade/charts/chartist', testId: 'CHART-008' },
  { screenId: 'SCR-034', name: 'Morris', legacyPath: '/#/charts/morris', upgradePath: '/#/upgrade/charts/morris', testId: 'CHART-011' },
  
  // UI Features
  { screenId: 'SCR-041', name: 'Typography', legacyPath: '/#/ui/typography', upgradePath: '/#/upgrade/ui/typography', testId: 'UI-001' },
  { screenId: 'SCR-042', name: 'Buttons', legacyPath: '/#/ui/buttons', upgradePath: '/#/upgrade/ui/buttons', testId: 'UI-002' },
  { screenId: 'SCR-043', name: 'Icons', legacyPath: '/#/ui/icons', upgradePath: '/#/upgrade/ui/icons', testId: 'UI-004' },
  { screenId: 'SCR-044', name: 'Modals', legacyPath: '/#/ui/modals', upgradePath: '/#/upgrade/ui/modals', testId: 'UI-005' },
  { screenId: 'SCR-045', name: 'Grid', legacyPath: '/#/ui/grid', upgradePath: '/#/upgrade/ui/grid', testId: 'UI-010' },
  { screenId: 'SCR-046', name: 'Alerts', legacyPath: '/#/ui/alerts', upgradePath: '/#/upgrade/ui/alerts', testId: 'UI-011' },
  { screenId: 'SCR-047', name: 'Progress Bars', legacyPath: '/#/ui/progressBars', upgradePath: '/#/upgrade/ui/progress-bars', testId: 'UI-012' },
  { screenId: 'SCR-048', name: 'Notifications', legacyPath: '/#/ui/notifications', upgradePath: '/#/upgrade/ui/notifications', testId: 'UI-013' },
  { screenId: 'SCR-049', name: 'Tabs', legacyPath: '/#/ui/tabs', upgradePath: '/#/upgrade/ui/tabs', testId: 'UI-016' },
  { screenId: 'SCR-050', name: 'Slider', legacyPath: '/#/ui/slider', upgradePath: '/#/upgrade/ui/slider', testId: 'UI-019' },
  { screenId: 'SCR-051', name: 'Panels', legacyPath: '/#/ui/panels', upgradePath: '/#/upgrade/ui/panels', testId: 'UI-021' },
  
  // Components
  { screenId: 'SCR-061', name: 'Mail', legacyPath: '/#/components/mail/inbox', upgradePath: '/#/upgrade/components/mail', testId: 'COMP-001' },
  { screenId: 'SCR-064', name: 'Timeline', legacyPath: '/#/components/timeline', upgradePath: '/#/upgrade/components/timeline', testId: 'COMP-006' },
  { screenId: 'SCR-065', name: 'Tree', legacyPath: '/#/components/tree', upgradePath: '/#/upgrade/components/tree', testId: 'COMP-007' },
  
  // Maps
  { screenId: 'SCR-071', name: 'Google Maps', legacyPath: '/#/maps/gmap', upgradePath: '/#/upgrade/maps/google-maps', testId: 'MAP-001' },
  { screenId: 'SCR-072', name: 'Leaflet', legacyPath: '/#/maps/leaflet', upgradePath: '/#/upgrade/maps/leaflet', testId: 'MAP-002' },
  { screenId: 'SCR-073', name: 'Bubble Maps', legacyPath: '/#/maps/bubble', upgradePath: '/#/upgrade/maps/bubble', testId: 'MAP-003' },
  { screenId: 'SCR-074', name: 'Line Maps', legacyPath: '/#/maps/line', upgradePath: '/#/upgrade/maps/lines', testId: 'MAP-004' },
  
  // Profile
  { screenId: 'SCR-080', name: 'Profile', legacyPath: '/#/profile', upgradePath: '/#/upgrade/profile', testId: 'PROF-001' },
];

/**
 * Get the appropriate route path based on the test project (legacy or upgrade)
 */
export function getRoutePath(mapping: RouteMapping, projectName: string): string {
  return projectName === 'legacy' ? mapping.legacyPath : mapping.upgradePath;
}

/**
 * Common data-testid selectors used across both apps
 */
export const SELECTORS = {
  // Layout
  sidebar: '[data-testid="sidebar"], .al-sidebar',
  sidebarMenu: '[data-testid="sidebar-menu"], .al-sidebar-list',
  pageTop: '[data-testid="page-top"], .al-header',
  contentArea: '[data-testid="content-area"], .al-content',
  
  // Navigation
  menuItem: '[data-testid="menu-item"], .al-sidebar-list-item',
  activeMenuItem: '[data-testid="menu-item-active"], .al-sidebar-list-item.selected',
  
  // Panels
  panel: '[data-testid="panel"], .panel',
  panelTitle: '[data-testid="panel-title"], .panel-heading',
  panelBody: '[data-testid="panel-body"], .panel-body',
  
  // Forms
  formInput: '[data-testid="form-input"], input.form-control',
  formSelect: '[data-testid="form-select"], select.form-control',
  formButton: '[data-testid="form-button"], button.btn',
  
  // Tables
  table: '[data-testid="table"], table.table',
  tableRow: '[data-testid="table-row"], tbody tr',
  
  // Charts
  chart: '[data-testid="chart"], .chart-container, .amcharts-main-div, canvas',
  
  // Loading
  preloader: '[data-testid="preloader"], #preloader',
  spinner: '[data-testid="spinner"], .spinner',
};

/**
 * Failure classification for parity test triage
 */
export enum FailureType {
  LEGACY_AMBIGUITY = 'legacy_ambiguity',
  UPGRADE_DEFECT = 'upgrade_defect',
  TEST_ISSUE = 'test_issue',
}

export interface FailureReport {
  testId: string;
  screenId: string;
  failureType: FailureType;
  description: string;
  legacyBehavior?: string;
  upgradeBehavior?: string;
}
