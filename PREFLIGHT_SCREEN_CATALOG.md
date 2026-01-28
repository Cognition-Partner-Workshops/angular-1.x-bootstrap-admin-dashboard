# PREFLIGHT_SCREEN_CATALOG.md

Pre-flight artifact for AngularJS 1.x to Angular LTS migration.
Generated: 2026-01-28

This document enumerates all navigable URLs/states and maps them to legacy modules, controllers, and templates. Each screen has a unique stable ID for migration tracking.

---

## Route Architecture Overview

The application uses UI-Router for state-based navigation. The root module `BlurAdmin` bootstraps the app with two main sub-modules: `BlurAdmin.theme` (reusable components) and `BlurAdmin.pages` (feature modules). The default route redirects to `/dashboard`.

---

## Screen Catalog

### SCR-001: Dashboard
| Property | Value |
|----------|-------|
| Screen ID | SCR-001 |
| Route Key | `dashboard` |
| URL | `/dashboard` |
| Module | `BlurAdmin.pages.dashboard` |
| Template | `app/pages/dashboard/dashboard.html` |
| Controller | None (widget-based) |
| Sidebar Icon | `ion-android-home` |
| Sidebar Order | 0 |

**Widgets Included:**
- dashboardLineChart (directive, DashboardLineChartCtrl)
- dashboardCalendar (directive, DashboardCalendarCtrl)
- dashboardMap (directive, DashboardMapCtrl)
- trafficChart (directive, TrafficChartCtrl)
- blurFeed (directive, BlurFeedCtrl)
- popularApp (directive)
- dashboardPieChart (directive, DashboardPieChartCtrl)
- dashboardTodo (directive, DashboardTodoCtrl)
- weather (directive, WeatherCtrl)

---

### SCR-010: Form Elements (Abstract Parent)
| Property | Value |
|----------|-------|
| Screen ID | SCR-010 |
| Route Key | `form` |
| URL | `/form` |
| Module | `BlurAdmin.pages.form` |
| Template | `<ui-view>` (abstract) |
| Controller | None |
| Sidebar Icon | `ion-compose` |
| Sidebar Order | 250 |

---

### SCR-011: Form Inputs
| Property | Value |
|----------|-------|
| Screen ID | SCR-011 |
| Route Key | `form.inputs` |
| URL | `/form/inputs` |
| Module | `BlurAdmin.pages.form` |
| Template | `app/pages/form/inputs/inputs.html` |
| Controller | None (widget-based) |
| Sidebar Order | 0 |

**Widgets Included:**
- standardFields
- validationStates
- inputGroups
- checkboxesRadios
- select (SelectpickerPanelCtrl)
- datePickers (datepickerCtrl, datepickerpopupCtrl)
- switches (SwitchDemoPanelCtrl)
- tagsInput (directive)

---

### SCR-012: Form Layouts
| Property | Value |
|----------|-------|
| Screen ID | SCR-012 |
| Route Key | `form.layouts` |
| URL | `/form/layouts` |
| Module | `BlurAdmin.pages.form` |
| Template | `app/pages/form/layouts/layouts.html` |
| Controller | None |
| Sidebar Order | 100 |

**Widgets Included:**
- basicForm
- inlineForm
- formWithoutLabels
- horizontalForm
- blockForm

---

### SCR-013: Form Wizard
| Property | Value |
|----------|-------|
| Screen ID | SCR-013 |
| Route Key | `form.wizard` |
| URL | `/form/wizard` |
| Module | `BlurAdmin.pages.form` |
| Template | `app/pages/form/wizard/wizard.html` |
| Controller | `WizardCtrl` (controllerAs: vm) |
| Sidebar Order | 200 |

---

### SCR-020: Tables (Abstract Parent)
| Property | Value |
|----------|-------|
| Screen ID | SCR-020 |
| Route Key | `tables` |
| URL | `/tables` |
| Module | `BlurAdmin.pages.tables` |
| Template | `<ui-view>` (abstract) |
| Controller | `TablesPageCtrl` |
| Sidebar Icon | `ion-grid` |
| Sidebar Order | 300 |
| Default Redirect | `/tables/basic` |

---

### SCR-021: Basic Tables
| Property | Value |
|----------|-------|
| Screen ID | SCR-021 |
| Route Key | `tables.basic` |
| URL | `/tables/basic` |
| Module | `BlurAdmin.pages.tables` |
| Template | `app/pages/tables/basic/tables.html` |
| Controller | Inherits `TablesPageCtrl` |
| Sidebar Order | 0 |

**Widgets Included:**
- basicTable
- stripedRows
- borderedTable
- hoverRows
- contextualTable
- responsiveTable
- condensedTable

---

### SCR-022: Smart Tables
| Property | Value |
|----------|-------|
| Screen ID | SCR-022 |
| Route Key | `tables.smart` |
| URL | `/tables/smart` |
| Module | `BlurAdmin.pages.tables` |
| Template | `app/pages/tables/smart/tables.html` |
| Controller | Inherits `TablesPageCtrl` |
| Sidebar Order | 100 |

**Widgets Included:**
- smartTable (uses smart-table library)
- editableTable (uses xeditable)
- editableRowTable

---

### SCR-030: Charts (Abstract Parent)
| Property | Value |
|----------|-------|
| Screen ID | SCR-030 |
| Route Key | `charts` |
| URL | `/charts` |
| Module | `BlurAdmin.pages.charts` |
| Template | `<div ui-view>` (abstract) |
| Controller | None |
| Sidebar Icon | `ion-stats-bars` |
| Sidebar Order | 150 |

---

### SCR-031: amCharts
| Property | Value |
|----------|-------|
| Screen ID | SCR-031 |
| Route Key | `charts.amCharts` |
| URL | `/charts/amCharts` |
| Module | `BlurAdmin.pages.charts.amCharts` |
| Template | `app/pages/charts/amCharts/charts.html` |
| Controller | None (widget-based) |
| Sidebar Order | 0 |

**Widgets Included:**
- lineChart (LineChartCtrl)
- areaChart (AreaChartCtrl)
- barChart (BarChartCtrl)
- pieChart (PieChartCtrl)
- funnelChart (FunnelChartCtrl)
- combinedChart (combinedChartCtrl)
- ganttChart (ganttChartCtrl)

---

### SCR-032: Chartist
| Property | Value |
|----------|-------|
| Screen ID | SCR-032 |
| Route Key | `charts.chartist` |
| URL | `/charts/chartist` |
| Module | `BlurAdmin.pages.charts.chartist` |
| Template | `app/pages/charts/chartist/chartist.html` |
| Controller | `chartistCtrl` |
| Sidebar Order | 100 |

---

### SCR-033: Chart.js
| Property | Value |
|----------|-------|
| Screen ID | SCR-033 |
| Route Key | `charts.chartJs` |
| URL | `/charts/chartJs` |
| Module | `BlurAdmin.pages.charts.chartJs` |
| Template | `app/pages/charts/chartJs/chartJs.html` |
| Controller | None (widget-based) |
| Sidebar Order | 200 |

**Widgets Included:**
- chartJs1D (chartJs1DCtrl)
- chartJs2D (chartJs2DCtrl)
- chartJsWave (chartJsWaveCtrl)

---

### SCR-034: Morris Charts
| Property | Value |
|----------|-------|
| Screen ID | SCR-034 |
| Route Key | `charts.morris` |
| URL | `/charts/morris` |
| Module | `BlurAdmin.pages.charts.morris` |
| Template | `app/pages/charts/morris/morris.html` |
| Controller | `morrisCtrl` |
| Sidebar Order | 300 |

---

### SCR-040: UI Features (Abstract Parent)
| Property | Value |
|----------|-------|
| Screen ID | SCR-040 |
| Route Key | `ui` |
| URL | `/ui` |
| Module | `BlurAdmin.pages.ui` |
| Template | `<ui-view>` (abstract) |
| Controller | None |
| Sidebar Icon | `ion-android-laptop` |
| Sidebar Order | 200 |

---

### SCR-041: Typography
| Property | Value |
|----------|-------|
| Screen ID | SCR-041 |
| Route Key | `ui.typography` |
| URL | `/ui/typography` |
| Module | `BlurAdmin.pages.ui.typography` |
| Template | `app/pages/ui/typography/typography.html` |
| Controller | None |
| Sidebar Order | 0 |

---

### SCR-042: Buttons
| Property | Value |
|----------|-------|
| Screen ID | SCR-042 |
| Route Key | `ui.buttons` |
| URL | `/ui/buttons` |
| Module | `BlurAdmin.pages.ui.buttons` |
| Template | `app/pages/ui/buttons/buttons.html` |
| Controller | `ButtonPageCtrl` |
| Sidebar Order | 100 |

**Widgets Included:**
- buttons
- largeButtons
- iconButtons
- dropdowns

---

### SCR-043: Icons
| Property | Value |
|----------|-------|
| Screen ID | SCR-043 |
| Route Key | `ui.icons` |
| URL | `/ui/icons` |
| Module | `BlurAdmin.pages.ui.icons` |
| Template | `app/pages/ui/icons/icons.html` |
| Controller | `IconsPageCtrl` |
| Sidebar Order | 200 |

**Widgets Included:**
- kameleon
- kameleonRounded
- fontAwesomeIcons
- ionicons
- socicon

---

### SCR-044: Modals
| Property | Value |
|----------|-------|
| Screen ID | SCR-044 |
| Route Key | `ui.modals` |
| URL | `/ui/modals` |
| Module | `BlurAdmin.pages.ui.modals` |
| Template | `app/pages/ui/modals/modals.html` |
| Controller | `ModalsPageCtrl` |
| Sidebar Order | 300 |

**Modal Templates:**
- basicModal
- smallModal
- largeModal
- infoModal
- successModal
- warningModal
- dangerModal
- progressModal (ProgressModalCtrl)
- notifications (NotificationsCtrl)

---

### SCR-045: Grid
| Property | Value |
|----------|-------|
| Screen ID | SCR-045 |
| Route Key | `ui.grid` |
| URL | `/ui/grid` |
| Module | `BlurAdmin.pages.ui.grid` |
| Template | `app/pages/ui/grid/grid.html` |
| Controller | None |
| Sidebar Order | 400 |

---

### SCR-046: Alerts
| Property | Value |
|----------|-------|
| Screen ID | SCR-046 |
| Route Key | `ui.alerts` |
| URL | `/ui/alerts` |
| Module | `BlurAdmin.pages.ui.alerts` |
| Template | `app/pages/ui/alerts/alerts.html` |
| Controller | None |
| Sidebar Order | 500 |

---

### SCR-047: Progress Bars
| Property | Value |
|----------|-------|
| Screen ID | SCR-047 |
| Route Key | `ui.progressBars` |
| URL | `/ui/progressBars` |
| Module | `BlurAdmin.pages.ui.progressBars` |
| Template | `app/pages/ui/progressBars/progressBars.html` |
| Controller | None |
| Sidebar Order | 600 |

**Widgets Included:**
- basic
- label
- striped
- animated
- stacked

---

### SCR-048: Notifications
| Property | Value |
|----------|-------|
| Screen ID | SCR-048 |
| Route Key | `ui.notifications` |
| URL | `/ui/notifications` |
| Module | `BlurAdmin.pages.ui.notifications` |
| Template | `app/pages/ui/notifications/notifications.html` |
| Controller | `NotificationsPageCtrl` |
| Sidebar Order | 700 |

---

### SCR-049: Tabs & Accordions
| Property | Value |
|----------|-------|
| Screen ID | SCR-049 |
| Route Key | `ui.tabs` |
| URL | `/ui/tabs` |
| Module | `BlurAdmin.pages.ui.tabs` |
| Template | `app/pages/ui/tabs/tabs.html` |
| Controller | None |
| Sidebar Order | 800 |

**Widgets Included:**
- mainTabs
- sideTabs
- sampleAccordion
- contextualAccordion

---

### SCR-050: Sliders
| Property | Value |
|----------|-------|
| Screen ID | SCR-050 |
| Route Key | `ui.slider` |
| URL | `/ui/slider` |
| Module | `BlurAdmin.pages.ui.slider` |
| Template | `app/pages/ui/slider/slider.html` |
| Controller | None |
| Sidebar Order | 1000 |

---

### SCR-051: Panels
| Property | Value |
|----------|-------|
| Screen ID | SCR-051 |
| Route Key | `ui.panels` |
| URL | `/ui/panels` |
| Module | `BlurAdmin.pages.ui.panels` |
| Template | `app/pages/ui/panels/panels.html` |
| Controller | `NotificationsPageCtrl` |
| Sidebar Order | 1100 |

---

### SCR-060: Components (Abstract Parent)
| Property | Value |
|----------|-------|
| Screen ID | SCR-060 |
| Route Key | `components` |
| URL | `/components` |
| Module | `BlurAdmin.pages.components` |
| Template | `<ui-view>` (abstract) |
| Controller | None |
| Sidebar Icon | `ion-gear-a` |
| Sidebar Order | 100 |

---

### SCR-061: Mail (Abstract Parent)
| Property | Value |
|----------|-------|
| Screen ID | SCR-061 |
| Route Key | `components.mail` |
| URL | `/components/mail` |
| Module | `BlurAdmin.pages.components.mail` |
| Template | `app/pages/components/mail/mail.html` |
| Controller | `MailTabCtrl` (controllerAs: tabCtrl) |
| Sidebar Order | 0 |
| Default Redirect | `/components/mail/inbox` |

---

### SCR-062: Mail List
| Property | Value |
|----------|-------|
| Screen ID | SCR-062 |
| Route Key | `components.mail.label` |
| URL | `/components/mail/:label` |
| Module | `BlurAdmin.pages.components.mail` |
| Template | `app/pages/components/mail/list/mailList.html` |
| Controller | `MailListCtrl` (controllerAs: listCtrl) |
| Route Params | `:label` (inbox, sent, drafts, spam, trash) |

---

### SCR-063: Mail Detail
| Property | Value |
|----------|-------|
| Screen ID | SCR-063 |
| Route Key | `components.mail.detail` |
| URL | `/components/mail/:label/:id` |
| Module | `BlurAdmin.pages.components.mail` |
| Template | `app/pages/components/mail/detail/mailDetail.html` |
| Controller | `MailDetailCtrl` (controllerAs: detailCtrl) |
| Route Params | `:label`, `:id` |

---

### SCR-064: Timeline
| Property | Value |
|----------|-------|
| Screen ID | SCR-064 |
| Route Key | `components.timeline` |
| URL | `/components/timeline` |
| Module | `BlurAdmin.pages.components.timeline` |
| Template | `app/pages/components/timeline/timeline.html` |
| Controller | `TimelineCtrl` |
| Sidebar Icon | `ion-ios-pulse` |
| Sidebar Order | 100 |

---

### SCR-065: Tree View
| Property | Value |
|----------|-------|
| Screen ID | SCR-065 |
| Route Key | `components.tree` |
| URL | `/components/tree` |
| Module | `BlurAdmin.pages.components.tree` |
| Template | `app/pages/components/tree/tree.html` |
| Controller | `treeCtrl` |
| Sidebar Order | 200 |

---

### SCR-070: Maps (Abstract Parent)
| Property | Value |
|----------|-------|
| Screen ID | SCR-070 |
| Route Key | `maps` |
| URL | `/maps` |
| Module | `BlurAdmin.pages.maps` |
| Template | `app/pages/maps/maps.html` |
| Controller | None |
| Sidebar Icon | `ion-ios-location-outline` |
| Sidebar Order | 500 |

---

### SCR-071: Google Maps
| Property | Value |
|----------|-------|
| Screen ID | SCR-071 |
| Route Key | `maps.gmap` |
| URL | `/maps/gmap` |
| Module | `BlurAdmin.pages.maps` |
| Template | `app/pages/maps/google-maps/google-maps.html` |
| Controller | `GmapPageCtrl` |
| Sidebar Order | 0 |

---

### SCR-072: Leaflet Maps
| Property | Value |
|----------|-------|
| Screen ID | SCR-072 |
| Route Key | `maps.leaflet` |
| URL | `/maps/leaflet` |
| Module | `BlurAdmin.pages.maps` |
| Template | `app/pages/maps/leaflet/leaflet.html` |
| Controller | `LeafletPageCtrl` |
| Sidebar Order | 100 |

---

### SCR-073: Bubble Maps
| Property | Value |
|----------|-------|
| Screen ID | SCR-073 |
| Route Key | `maps.bubble` |
| URL | `/maps/bubble` |
| Module | `BlurAdmin.pages.maps` |
| Template | `app/pages/maps/map-bubbles/map-bubbles.html` |
| Controller | `MapBubblePageCtrl` |
| Sidebar Order | 200 |

---

### SCR-074: Line Maps
| Property | Value |
|----------|-------|
| Screen ID | SCR-074 |
| Route Key | `maps.line` |
| URL | `/maps/line` |
| Module | `BlurAdmin.pages.maps` |
| Template | `app/pages/maps/map-lines/map-lines.html` |
| Controller | `MapLinesPageCtrl` |
| Sidebar Order | 300 |

---

### SCR-080: Profile
| Property | Value |
|----------|-------|
| Screen ID | SCR-080 |
| Route Key | `profile` |
| URL | `/profile` |
| Module | `BlurAdmin.pages.profile` |
| Template | `app/pages/profile/profile.html` |
| Controller | `ProfilePageCtrl` |
| Sidebar | Via static menu item (Pages > User Profile) |

---

## Static Pages (External HTML)

These pages are served as separate HTML files, not part of the SPA routing:

### SCR-090: Sign In
| Property | Value |
|----------|-------|
| Screen ID | SCR-090 |
| URL | `auth.html` |
| Type | Static HTML |
| Sidebar | Via static menu item (Pages > Sign In) |
| Opens In | New tab (blank: true) |

---

### SCR-091: Sign Up
| Property | Value |
|----------|-------|
| Screen ID | SCR-091 |
| URL | `reg.html` |
| Type | Static HTML |
| Sidebar | Via static menu item (Pages > Sign Up) |
| Opens In | New tab (blank: true) |

---

### SCR-092: 404 Page
| Property | Value |
|----------|-------|
| Screen ID | SCR-092 |
| URL | `404.html` |
| Type | Static HTML |
| Sidebar | Via static menu item (Pages > 404 Page) |
| Opens In | New tab (blank: true) |

---

## Route Summary Table

| Screen ID | Route Key | URL | Has Controller |
|-----------|-----------|-----|----------------|
| SCR-001 | dashboard | /dashboard | No (widgets) |
| SCR-011 | form.inputs | /form/inputs | No (widgets) |
| SCR-012 | form.layouts | /form/layouts | No |
| SCR-013 | form.wizard | /form/wizard | Yes |
| SCR-021 | tables.basic | /tables/basic | Yes (parent) |
| SCR-022 | tables.smart | /tables/smart | Yes (parent) |
| SCR-031 | charts.amCharts | /charts/amCharts | No (widgets) |
| SCR-032 | charts.chartist | /charts/chartist | Yes |
| SCR-033 | charts.chartJs | /charts/chartJs | No (widgets) |
| SCR-034 | charts.morris | /charts/morris | Yes |
| SCR-041 | ui.typography | /ui/typography | No |
| SCR-042 | ui.buttons | /ui/buttons | Yes |
| SCR-043 | ui.icons | /ui/icons | Yes |
| SCR-044 | ui.modals | /ui/modals | Yes |
| SCR-045 | ui.grid | /ui/grid | No |
| SCR-046 | ui.alerts | /ui/alerts | No |
| SCR-047 | ui.progressBars | /ui/progressBars | No |
| SCR-048 | ui.notifications | /ui/notifications | Yes |
| SCR-049 | ui.tabs | /ui/tabs | No |
| SCR-050 | ui.slider | /ui/slider | No |
| SCR-051 | ui.panels | /ui/panels | Yes |
| SCR-062 | components.mail.label | /components/mail/:label | Yes |
| SCR-063 | components.mail.detail | /components/mail/:label/:id | Yes |
| SCR-064 | components.timeline | /components/timeline | Yes |
| SCR-065 | components.tree | /components/tree | Yes |
| SCR-071 | maps.gmap | /maps/gmap | Yes |
| SCR-072 | maps.leaflet | /maps/leaflet | Yes |
| SCR-073 | maps.bubble | /maps/bubble | Yes |
| SCR-074 | maps.line | /maps/line | Yes |
| SCR-080 | profile | /profile | Yes |

---

## Sidebar Navigation Structure

The sidebar is dynamically generated from route states with `sidebarMeta` plus static items added via `baSidebarServiceProvider.addStaticItem()`.

**Dynamic Menu (from routes, ordered by sidebarMeta.order):**
1. Dashboard (order: 0)
2. Components (order: 100)
   - Mail (order: 0)
   - Timeline (order: 100)
   - Tree View (order: 200)
3. Charts (order: 150)
   - amCharts (order: 0)
   - Chartist (order: 100)
   - Chart.js (order: 200)
   - Morris (order: 300)
4. UI Features (order: 200)
   - Typography (order: 0)
   - Buttons (order: 100)
   - Icons (order: 200)
   - Modals (order: 300)
   - Grid (order: 400)
   - Alerts (order: 500)
   - Progress Bars (order: 600)
   - Notifications (order: 700)
   - Tabs & Accordions (order: 800)
   - Sliders (order: 1000)
   - Panels (order: 1100)
5. Form Elements (order: 250)
   - Form Inputs (order: 0)
   - Form Layouts (order: 100)
   - Form Wizard (order: 200)
6. Tables (order: 300)
   - Basic Tables (order: 0)
   - Smart Tables (order: 100)
7. Maps (order: 500)
   - Google Maps (order: 0)
   - Leaflet Maps (order: 100)
   - Bubble Maps (order: 200)
   - Line Maps (order: 300)

**Static Menu Items (added programmatically):**
- Pages
  - Sign In (auth.html, blank)
  - Sign Up (reg.html, blank)
  - User Profile (stateRef: profile)
  - 404 Page (404.html, blank)
- Menu Level 1 (demo nested menu)
  - Menu Level 1.1 (disabled)
  - Menu Level 1.2
    - Menu Level 1.2.1 (disabled)

---

## Migration Notes

1. **Abstract States**: Routes marked as abstract (`form`, `tables`, `charts`, `ui`, `components`, `maps`) serve as parent containers and must be migrated as Angular router parent routes with child outlets.

2. **Default Redirects**: The following redirects must be preserved:
   - `/` -> `/dashboard`
   - `/tables` -> `/tables/basic`
   - `/components/mail` -> `/components/mail/inbox`

3. **Route Parameters**: The mail module uses dynamic route parameters (`:label`, `:id`) that must be preserved.

4. **External Pages**: Static HTML pages (auth.html, reg.html, 404.html) are outside the SPA and may need separate migration consideration.

5. **Controller Inheritance**: Some child routes inherit parent controllers (e.g., tables.basic inherits TablesPageCtrl).
