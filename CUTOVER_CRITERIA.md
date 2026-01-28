# Cutover Criteria and Rollback Plan

## Overview

This document defines the criteria for cutting over from the legacy AngularJS application to the Angular 17 upgrade, along with the rollback procedure and stabilization monitoring plan.

## Cutover Criteria

### 1. Parity Pass Rate

**Requirement: 95% minimum pass rate**

All migrated screens must demonstrate functional parity with their legacy counterparts:

| Category | Screens | Parity Status |
|----------|---------|---------------|
| Dashboard | 1 | Complete |
| UI Elements | 11 | Complete |
| Forms | 3 | Complete |
| Tables | 2 | Complete |
| Charts | 4 | Complete |
| Maps | 4 | Complete |
| Components | 3 | Complete |
| Profile | 1 | Complete |
| **Total** | **29** | **100% Complete** |

### 2. Critical Flow Coverage

The following critical user flows must be verified before cutover:

| Flow ID | Flow Name | Description | Status |
|---------|-----------|-------------|--------|
| CF-001 | Dashboard Load | Dashboard renders with all widgets | Verified |
| CF-002 | Navigation Sidebar | Sidebar navigation works, collapses correctly | Verified |
| CF-003 | Form Submission | Form wizard completes all steps | Verified |
| CF-004 | Table Sorting | Smart table sorting and filtering works | Verified |
| CF-005 | Chart Rendering | All chart types render with data | Verified |
| CF-006 | Map Display | Google Maps and Leaflet maps display | Verified |

### 3. Rollback Readiness

**Single-Switch Rollback Mechanism**

The cutover is controlled by a single configuration flag:

```typescript
// File: upgrade/src/app/core/config/cutover.config.ts

// ROLLBACK: Set to false to revert to legacy AngularJS
export const CUTOVER_ENABLED = true;
```

**Rollback Procedure:**

1. Open `upgrade/src/app/core/config/cutover.config.ts`
2. Change `CUTOVER_ENABLED` from `true` to `false`
3. Rebuild and deploy the application
4. Verify legacy routes are accessible

**Rollback Time Estimate:** < 5 minutes (configuration change + rebuild)

## Route Mapping

When cutover is enabled, the following route redirects are active:

| Legacy Route | Upgrade Route |
|--------------|---------------|
| `/dashboard` | `/upgrade/dashboard` |
| `/form/inputs` | `/upgrade/form/inputs` |
| `/form/layouts` | `/upgrade/form/layouts` |
| `/form/wizard` | `/upgrade/form/wizard` |
| `/tables/basic` | `/upgrade/tables/basic` |
| `/tables/smart` | `/upgrade/tables/smart` |
| `/charts/amCharts` | `/upgrade/charts/amcharts` |
| `/charts/chartJs` | `/upgrade/charts/chartjs` |
| `/charts/chartist` | `/upgrade/charts/chartist` |
| `/charts/morris` | `/upgrade/charts/morris` |
| `/ui/typography` | `/upgrade/ui/typography` |
| `/ui/buttons` | `/upgrade/ui/buttons` |
| `/ui/icons` | `/upgrade/ui/icons` |
| `/ui/modals` | `/upgrade/ui/modals` |
| `/ui/grid` | `/upgrade/ui/grid` |
| `/ui/alerts` | `/upgrade/ui/alerts` |
| `/ui/progressBars` | `/upgrade/ui/progress-bars` |
| `/ui/notifications` | `/upgrade/ui/notifications` |
| `/ui/tabs` | `/upgrade/ui/tabs` |
| `/ui/slider` | `/upgrade/ui/slider` |
| `/ui/panels` | `/upgrade/ui/panels` |
| `/components/mail` | `/upgrade/components/mail` |
| `/components/timeline` | `/upgrade/components/timeline` |
| `/components/tree` | `/upgrade/components/tree` |
| `/maps/gmap` | `/upgrade/maps/google-maps` |
| `/maps/leaflet` | `/upgrade/maps/leaflet` |
| `/maps/bubble` | `/upgrade/maps/bubble` |
| `/maps/line` | `/upgrade/maps/lines` |
| `/profile` | `/upgrade/profile` |

## Stabilization Monitoring

### Metrics to Monitor Post-Cutover

1. **Error Rates**
   - JavaScript console errors
   - HTTP request failures
   - Routing errors

2. **Performance Metrics**
   - Page load times
   - Time to interactive
   - Bundle size impact

3. **User Experience**
   - Navigation success rate
   - Form completion rate
   - Chart rendering success

### Monitoring Period

- **Phase 1 (Days 1-3):** Intensive monitoring, immediate rollback if critical issues
- **Phase 2 (Days 4-7):** Standard monitoring, rollback for major issues
- **Phase 3 (Days 8-14):** Reduced monitoring, rollback only for severe regressions

### Rollback Triggers

Immediate rollback if any of the following occur:

1. Error rate exceeds 5% of page loads
2. Critical flow failure (dashboard, navigation, forms)
3. Data loss or corruption
4. Security vulnerability discovered
5. Performance degradation > 50%

## Legacy Decommissioning Plan

**Important:** Do not delete legacy code prematurely. Follow this incremental approach:

### Phase 1: Parallel Running (Current)
- Both legacy and upgrade apps accessible
- Cutover flag controls default routing
- Legacy accessible at original routes for rollback

### Phase 2: Gradual Deprecation (After 2 weeks stable)
- Add deprecation notices to legacy routes
- Monitor legacy route usage
- Document any remaining legacy dependencies

### Phase 3: Legacy Removal (After 4 weeks stable)
- Remove legacy routes in batches
- Delete replaced templates and controllers
- Clean up legacy build pipeline components
- Remove legacy-specific dependencies from bower.json

### Files to Remove in Phase 3

```
src/app/pages/dashboard/
src/app/pages/form/
src/app/pages/tables/
src/app/pages/charts/
src/app/pages/ui/
src/app/pages/maps/
src/app/pages/components/
src/app/pages/profile/
```

**Note:** Only remove files with corresponding test coverage in the upgrade app.

## Cutover Checklist

### Pre-Cutover
- [x] All screens migrated (29/29)
- [x] Parity tests passing (95%+ required)
- [x] Critical flows verified
- [x] Rollback mechanism tested
- [x] Monitoring in place
- [x] Team notified of cutover schedule

### Cutover Execution
- [ ] Set `CUTOVER_ENABLED = true`
- [ ] Deploy to staging environment
- [ ] Verify all routes work
- [ ] Deploy to production
- [ ] Monitor error rates

### Post-Cutover
- [ ] Monitor for 24 hours
- [ ] Address any reported issues
- [ ] Document lessons learned
- [ ] Plan legacy decommissioning timeline

## Configuration Reference

### Cutover Configuration File

Location: `upgrade/src/app/core/config/cutover.config.ts`

```typescript
export const CUTOVER_ENABLED = true;  // THE SINGLE SWITCH

export const CUTOVER_CONFIG: CutoverConfig = {
  enabled: CUTOVER_ENABLED,
  legacyExceptions: [],  // Routes that stay on legacy
  routeMapping: { ... },  // Legacy to upgrade route mapping
  parityRequirements: {
    minPassRate: 95,
    criticalFlowsCovered: [...]
  }
};
```

### Feature Flag Integration

The cutover state is also available as a feature flag:

```typescript
// Check cutover status programmatically
featureFlagsService.isEnabled('cutover-enabled').subscribe(enabled => {
  console.log('Cutover enabled:', enabled);
});
```

---

**Document Version:** 1.0
**Last Updated:** January 28, 2026
**Status:** Ready for Cutover
