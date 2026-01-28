# Phase 4 Wave 3 Orchestration - Complex Screens with Charts & Maps

## Wave 3 Overview

**Wave Name:** Complex Screens with Charts & Maps  
**Total Screens:** 11  
**Estimated Complexity:** High  
**Status:** In Progress  
**Started:** 2026-01-28

## Prerequisites

Wave 3 screens depend on:
- ✅ Wave 0 foundations (baConfig, baUtil, layoutPaths, colorHelper, baPanel, etc.)
- ✅ Wave 1 completion (8 simple UI screens merged)
- ✅ Wave 2 completion (10 interactive UI screens merged)
- ✅ Build verification passed

## Migration Progress Summary

| Wave | Screens | Status | Completion |
|------|---------|--------|------------|
| Wave 0 | 8 foundations | ✅ Complete | 100% |
| Wave 1 | 8 screens | ✅ Complete | 100% |
| Wave 2 | 10 screens | ✅ Complete | 100% |
| Wave 3 | 11 screens | 🔄 In Progress | 0% |
| **Total** | **37 items** | | **~70%** |

## Wave 2 Completion Summary

All 10 Wave 2 screens successfully merged into `angular` branch:

| Screen ID | Screen Name | PR | Status |
|-----------|-------------|-----|--------|
| SCR-022 | Smart Tables | #14 | ✅ Merged |
| SCR-044 | Slider | #15 | ✅ Merged |
| SCR-021 | Basic Tables | #16 | ✅ Merged |
| SCR-063 | Tree View | #17 | ✅ Merged |
| SCR-013 | Form Wizard | #18 | ✅ Merged |
| SCR-043 | Icons | #19 | ✅ Merged |
| SCR-050 | Notifications | #20 | ✅ Merged |
| SCR-042 | Buttons | #21 | ✅ Merged |
| SCR-048 | Modals | #22 | ✅ Merged |
| SCR-011 | Form Inputs | #23 | ✅ Merged |

**Post-merge fixes applied:**
- Increased component style budget to 16kb (progress-button component exceeded 8kb)
- Ran npm install to install @angular-slider/ngx-slider dependency

## Wave 3 Screen Assignments

### Charts Screens (Can be parallelized)

| Task ID | Screen ID | Screen Name | Legacy Route | Branch | External Dependencies |
|---------|-----------|-------------|--------------|--------|----------------------|
| W3-001 | SCR-001 | Dashboard | `/dashboard` | `upgrade/dashboard/scr-001-dashboard` | AmCharts, Chart.js, fullCalendar, easyPieChart |
| W3-002 | SCR-031 | AmCharts | `/charts/amCharts` | `upgrade/charts/scr-031-amcharts` | AmCharts |
| W3-003 | SCR-032 | Chart.js | `/charts/chartJs` | `upgrade/charts/scr-032-chartjs` | chart.js, angular-chart.js |
| W3-004 | SCR-033 | Chartist | `/charts/chartist` | `upgrade/charts/scr-033-chartist` | angular-chartist, Chartist |
| W3-005 | SCR-034 | Morris | `/charts/morris` | `upgrade/charts/scr-034-morris` | angular.morris-chart, Morris, Raphael |

### Maps Screens (Can be parallelized)

| Task ID | Screen ID | Screen Name | Legacy Route | Branch | External Dependencies |
|---------|-----------|-------------|--------------|--------|----------------------|
| W3-006 | SCR-071 | Google Maps | `/maps/google-maps` | `upgrade/maps/scr-071-google-maps` | Google Maps API |
| W3-007 | SCR-072 | Leaflet | `/maps/leaflet` | `upgrade/maps/scr-072-leaflet` | Leaflet |
| W3-008 | SCR-073 | Bubble Map | `/maps/map-bubbles` | `upgrade/maps/scr-073-bubble` | AmCharts, ammap |
| W3-009 | SCR-074 | Line Map | `/maps/map-lines` | `upgrade/maps/scr-074-lines` | AmCharts, ammap |

### Other Complex Screens

| Task ID | Screen ID | Screen Name | Legacy Route | Branch | External Dependencies |
|---------|-----------|-------------|--------------|--------|----------------------|
| W3-010 | SCR-061 | Mail | `/components/mail` | `upgrade/components/scr-061-mail` | textAngular |
| W3-011 | SCR-081 | Profile | `/profile` | `upgrade/profile/scr-081-profile` | ngFileSelect, fileReader |

## Worker Session Links

| Task ID | Session URL |
|---------|-------------|
| W3-001 | https://partner-workshops.devinenterprise.com/sessions/290740cf6bc240e791c5d0fc9c2308d1 |
| W3-002 | https://partner-workshops.devinenterprise.com/sessions/ddf531cd07644394890cf65c04a9d47a |
| W3-003 | https://partner-workshops.devinenterprise.com/sessions/ee24fb1e8f554b4fb4583321a2a23b52 |
| W3-004 | https://partner-workshops.devinenterprise.com/sessions/d923e89547934012bb02a737ecab8d28 |
| W3-005 | https://partner-workshops.devinenterprise.com/sessions/1a70ab859ca74d1dbeea428c32a446a5 |
| W3-006 | https://partner-workshops.devinenterprise.com/sessions/822e5715b13c4de2b76860488aece4ab |
| W3-007 | https://partner-workshops.devinenterprise.com/sessions/2677652b8cfe495ea3752794a03f5890 |
| W3-008 | https://partner-workshops.devinenterprise.com/sessions/e596c3e629c743fb8a75cf476e7d993f |
| W3-009 | https://partner-workshops.devinenterprise.com/sessions/25757324a8134d8caf91cc2344561eea |
| W3-010 | https://partner-workshops.devinenterprise.com/sessions/4c92f94ff5dc4e40b81a847f078463f5 |
| W3-011 | https://partner-workshops.devinenterprise.com/sessions/e5af8022107e44279fea08162b63f080 |

## Parallelization Notes

All 11 Wave 3 screens can be migrated in parallel because:
- No inter-dependencies between Wave 3 screens
- All depend only on Wave 0 foundations (already available)
- Each screen has isolated external library dependencies

**Recommended groupings for parallel work:**
- Charts group: W3-001 to W3-005 (5 screens)
- Maps group: W3-006 to W3-009 (4 screens)
- Components group: W3-010 to W3-011 (2 screens)

## Merge Strategy

1. **Routing conflicts expected:** All PRs will modify `app.routes.ts`
2. **Merge order:** Merge PRs as they complete; rebase subsequent PRs on latest `angular`
3. **Shared styles:** Watch for conflicts in `styles.scss` - merge carefully
4. **External libraries:** Each screen may add new npm dependencies - run `npm install` after merging

## Complexity Notes

- **Dashboard (W3-001):** Most complex screen with 8 widgets, each with chart library integration
- **AmCharts screens:** Require custom theme configuration from baConfig
- **Maps screens:** May require API keys (Google Maps) or external script loading
- **Mail component:** Has nested routes and multiple controllers

## Orchestrator Actions

- [ ] Monitor Wave 3 worker sessions for completion
- [ ] Merge completed PRs into `angular` branch (serialize routing changes)
- [ ] Resolve any merge conflicts centrally
- [ ] Run `npm install` after each merge to install new dependencies
- [ ] Verify build after each merge
- [ ] Create PHASE4_COMPLETION.md when all screens merged
- [ ] Final parity testing across all migrated screens

## Post-Wave 3: Migration Complete

After Wave 3 completes, the migration will be **100% complete**:
- All 37 items (8 foundations + 8 Wave 1 + 10 Wave 2 + 11 Wave 3) migrated
- Full parity E2E suite should pass for both legacy and `/upgrade`
- Ready for production cutover planning
