# PREFLIGHT_SERVICE_INVENTORY.md

Pre-flight artifact for AngularJS 1.x to Angular LTS migration.
Generated: 2026-01-28

This document provides a comprehensive inventory of all services, factories, providers, directives, filters, and dependencies used in the BlurAdmin application.

---

## Module Hierarchy

```
BlurAdmin (root)
├── BlurAdmin.theme
│   ├── BlurAdmin.theme.components
│   └── BlurAdmin.theme.inputs
└── BlurAdmin.pages
    ├── BlurAdmin.pages.dashboard
    ├── BlurAdmin.pages.form
    ├── BlurAdmin.pages.tables
    ├── BlurAdmin.pages.charts
    │   ├── BlurAdmin.pages.charts.amCharts
    │   ├── BlurAdmin.pages.charts.chartJs
    │   ├── BlurAdmin.pages.charts.chartist
    │   └── BlurAdmin.pages.charts.morris
    ├── BlurAdmin.pages.ui
    │   ├── BlurAdmin.pages.ui.typography
    │   ├── BlurAdmin.pages.ui.buttons
    │   ├── BlurAdmin.pages.ui.icons
    │   ├── BlurAdmin.pages.ui.modals
    │   ├── BlurAdmin.pages.ui.grid
    │   ├── BlurAdmin.pages.ui.alerts
    │   ├── BlurAdmin.pages.ui.progressBars
    │   ├── BlurAdmin.pages.ui.notifications
    │   ├── BlurAdmin.pages.ui.tabs
    │   ├── BlurAdmin.pages.ui.slider
    │   └── BlurAdmin.pages.ui.panels
    ├── BlurAdmin.pages.components
    │   ├── BlurAdmin.pages.components.mail
    │   ├── BlurAdmin.pages.components.timeline
    │   └── BlurAdmin.pages.components.tree
    ├── BlurAdmin.pages.maps
    └── BlurAdmin.pages.profile
```

---

## Third-Party Dependencies (bower.json)

### Core Framework
| Dependency | Version | Purpose |
|------------|---------|---------|
| angular | ~1.5.8 | Core AngularJS framework |
| angular-route | ~1.5.8 | Routing (unused, ui-router used instead) |
| angular-animate | ~1.5.8 | Animation support |
| angular-touch | ~1.5.8 | Touch event support |
| angular-ui-router | ~0.3.2 | State-based routing |
| angular-bootstrap | ~1.3.3 | UI Bootstrap components |

### UI Libraries
| Dependency | Version | Purpose |
|------------|---------|---------|
| jquery | ~3.1.1 | DOM manipulation |
| jquery-ui | ~1.12.1 | UI interactions |
| bootstrap | ~3.3.5 | CSS framework |
| bootstrap-select | ~1.12.1 | Enhanced select dropdowns |
| bootstrap-switch | ~3.3.2 | Toggle switches |
| bootstrap-tagsinput | master | Tag input fields |
| animate.css | ~3.5.2 | CSS animations |

### Chart Libraries
| Dependency | Version | Purpose |
|------------|---------|---------|
| amcharts | ~3.15.2 | AmCharts core |
| amcharts-stock | * | Stock charts |
| ammap | ~3.14.5 | Map visualizations |
| chart.js | ~2.4.0 | Chart.js library |
| angular-chart.js | ~1.0.3 | Angular Chart.js wrapper |
| chartist | 0.9.5 | Chartist library |
| angular-chartist.js | ~3.3.12 | Angular Chartist wrapper |
| angular-morris-chart | ~1.1.0 | Morris charts wrapper |

### Form & Input Libraries
| Dependency | Version | Purpose |
|------------|---------|---------|
| angular-ui-select | ^0.19.6 | Enhanced select component |
| angular-xeditable | ~0.5.0 | Inline editing |
| textAngular | ~1.4.6 | Rich text editor |
| ionrangeslider | 2.1.4 | Range slider |

### Data & Tables
| Dependency | Version | Purpose |
|------------|---------|---------|
| angular-smart-table | ~2.1.3 | Smart table component |
| angular-ui-sortable | ~0.15.0 | Sortable lists |

### Utilities
| Dependency | Version | Purpose |
|------------|---------|---------|
| angular-toastr | ~2.1.1 | Toast notifications |
| angular-slimscroll | ~1.1.5 | Custom scrollbars |
| angular-progress-button-styles | ~0.1.0 | Progress buttons |
| ng-js-tree | ~0.0.7 | Tree view component |
| fullcalendar | ~3.0.1 | Calendar component |
| moment | ~2.17.0 | Date manipulation |
| leaflet | ~0.7.5 | Leaflet maps |
| highlight | ~8.8.0 | Syntax highlighting |

### Icons & Fonts
| Dependency | Version | Purpose |
|------------|---------|---------|
| font-awesome | ~4.4.0 | Font Awesome icons |
| Ionicons | ~2.0.1 | Ionicons |

---

## Services Inventory

### SVC-001: baConfig (Provider)
| Property | Value |
|----------|-------|
| ID | SVC-001 |
| Name | baConfig |
| Type | Provider |
| Module | BlurAdmin.theme |
| File | `src/app/theme/theme.configProvider.js` |

**Purpose:** Centralized theme configuration providing colors and theme settings.

**API:**
```javascript
// Provider methods (config phase)
baConfigProvider.changeTheme({ blur: true });
baConfigProvider.changeColors({ primary: '#209e91' });

// Service methods (run phase)
baConfig.theme.blur        // Boolean
baConfig.colors.primary    // String (hex color)
baConfig.colors.dashboard  // Object with dashboard colors
```

**Data Contract:**
```javascript
{
  theme: {
    blur: Boolean  // Enable blur theme
  },
  colors: {
    default: String,
    defaultText: String,
    border: String,
    borderDark: String,
    primary: String,
    info: String,
    success: String,
    warning: String,
    danger: String,
    primaryLight: String,
    infoLight: String,
    successLight: String,
    warningLight: String,
    dangerLight: String,
    primaryDark: String,
    infoDark: String,
    successDark: String,
    warningDark: String,
    dangerDark: String,
    dashboard: {
      blueStone: String,
      surfieGreen: String,
      silverTree: String,
      gossip: String,
      white: String
    }
  }
}
```

**Dependencies:** colorHelper (constant)

---

### SVC-002: baSidebarService (Provider)
| Property | Value |
|----------|-------|
| ID | SVC-002 |
| Name | baSidebarService |
| Type | Provider |
| Module | BlurAdmin.theme.components |
| File | `src/app/theme/components/baSidebar/baSidebar.service.js` |

**Purpose:** Manages sidebar navigation state and menu items.

**API:**
```javascript
// Provider methods (config phase)
baSidebarServiceProvider.addStaticItem({
  title: String,
  icon: String,
  stateRef: String,      // Optional: UI-Router state
  fixedHref: String,     // Optional: External URL
  blank: Boolean,        // Optional: Open in new tab
  disabled: Boolean,     // Optional: Disable item
  subMenu: Array         // Optional: Child items
});

// Service methods (run phase)
baSidebarService.getMenuItems()           // Returns combined menu items
baSidebarService.shouldMenuBeCollapsed()  // Check if should collapse
baSidebarService.canSidebarBeHidden()     // Check if can hide
baSidebarService.setMenuCollapsed(bool)   // Set collapsed state
baSidebarService.isMenuCollapsed()        // Get collapsed state
baSidebarService.toggleMenuCollapsed()    // Toggle collapsed
baSidebarService.getAllStateRefsRecursive(item)  // Get all child state refs
```

**Dependencies:** $state, layoutSizes

---

### SVC-003: themeLayoutSettings (Service)
| Property | Value |
|----------|-------|
| ID | SVC-003 |
| Name | themeLayoutSettings |
| Type | Service |
| Module | BlurAdmin.theme |
| File | `src/app/theme/theme.service.js` |

**Purpose:** Detects device type and applies theme classes to body.

**API:**
```javascript
themeLayoutSettings.blur    // Boolean: blur theme enabled
themeLayoutSettings.mobile  // Boolean: mobile device detected
```

**Side Effects:**
- Adds `mobile` class to body on mobile devices
- Adds `blur-theme` class to body when blur enabled

**Dependencies:** baConfig

---

### SVC-004: baUtil (Service)
| Property | Value |
|----------|-------|
| ID | SVC-004 |
| Name | baUtil |
| Type | Service |
| Module | BlurAdmin.theme |
| File | `src/app/theme/services/baUtil.js` |

**Purpose:** Utility functions for DOM and color operations.

**API:**
```javascript
baUtil.isDescendant(parent, child)  // Check if child is descendant of parent
baUtil.hexToRGB(hex, alpha)         // Convert hex to rgba string
baUtil.hasAttr(elem, attrName)      // Check if element has attribute
```

---

### SVC-005: fileReader (Service)
| Property | Value |
|----------|-------|
| ID | SVC-005 |
| Name | fileReader |
| Type | Service |
| Module | BlurAdmin.theme |
| File | `src/app/theme/services/fileReader.js` |

**Purpose:** Read files as data URLs for image upload.

**API:**
```javascript
fileReader.readAsDataUrl(file, scope)  // Returns promise resolving to data URL
```

**Events Broadcast:**
- `fileProgress`: { total: Number, loaded: Number }

**Dependencies:** $q

---

### SVC-006: preloader (Service)
| Property | Value |
|----------|-------|
| ID | SVC-006 |
| Name | preloader |
| Type | Service |
| Module | BlurAdmin.theme |
| File | `src/app/theme/services/preloader.js` |

**Purpose:** Preload images and wait for AmCharts ready.

**API:**
```javascript
preloader.loadImg(src)     // Returns promise when image loaded
preloader.loadAmCharts()   // Returns promise when AmCharts ready
```

**Dependencies:** $q

---

### SVC-007: baPanelBlurHelper (Service)
| Property | Value |
|----------|-------|
| ID | SVC-007 |
| Name | baPanelBlurHelper |
| Type | Service |
| Module | BlurAdmin.theme |
| File | `src/app/theme/components/baPanel/baPanelBlurHelper.service.js` |

**Purpose:** Calculate background image sizes for blur effect panels.

**API:**
```javascript
baPanelBlurHelper.bodyBgLoad()        // Returns promise when body bg loaded
baPanelBlurHelper.getBodyBgImageSizes()  // Returns { width, height, positionX, positionY }
```

**Dependencies:** $q

---

### SVC-008: mailMessages (Service)
| Property | Value |
|----------|-------|
| ID | SVC-008 |
| Name | mailMessages |
| Type | Service |
| Module | BlurAdmin.pages.components.mail |
| File | `src/app/pages/components/mail/mailMessages.js` |

**Purpose:** Provides mock mail data and filtering.

**API:**
```javascript
mailMessages.getTabs()                  // Returns tabs array
mailMessages.getMessagesByLabel(label)  // Returns filtered messages
mailMessages.getMessageById(id)         // Returns single message
```

**Data Contract:** See PREFLIGHT_FLOW_ACCEPTANCE.md FLOW-006

**Dependencies:** $sce

---

### SVC-009: composeModal (Service)
| Property | Value |
|----------|-------|
| ID | SVC-009 |
| Name | composeModal |
| Type | Service |
| Module | BlurAdmin.pages.components.mail |
| File | `src/app/pages/components/mail/composeBox/composeModal.js` |

**Purpose:** Opens compose email modal.

**API:**
```javascript
composeModal.open({
  subject: String,
  to: String,
  text: String
})  // Returns modal instance
```

**Dependencies:** $uibModal

---

### SVC-010: baPanel (Factory)
| Property | Value |
|----------|-------|
| ID | SVC-010 |
| Name | baPanel |
| Type | Factory |
| Module | BlurAdmin.theme |
| File | `src/app/theme/components/baPanel/baPanel.service.js` |

**Purpose:** Base directive definition object for panel components.

**Returns:** Directive definition object with transclude and template function.

---

## Constants Inventory

### CONST-001: layoutSizes
| Property | Value |
|----------|-------|
| ID | CONST-001 |
| Name | layoutSizes |
| Module | BlurAdmin.theme |
| File | `src/app/theme/theme.constants.js` |

**Values:**
```javascript
{
  resWidthCollapseSidebar: 1200,  // Collapse sidebar below this width
  resWidthHideSidebar: 500        // Hide sidebar below this width
}
```

---

### CONST-002: layoutPaths
| Property | Value |
|----------|-------|
| ID | CONST-002 |
| Name | layoutPaths |
| Module | BlurAdmin.theme |
| File | `src/app/theme/theme.constants.js` |

**Values:**
```javascript
{
  images: {
    root: 'assets/img/',
    profile: 'assets/img/app/profile/',
    amMap: 'assets/img/theme/vendor/ammap//dist/ammap/images/',
    amChart: 'assets/img/theme/vendor/amcharts/dist/amcharts/images/'
  }
}
```

---

### CONST-003: colorHelper
| Property | Value |
|----------|-------|
| ID | CONST-003 |
| Name | colorHelper |
| Module | BlurAdmin.theme |
| File | `src/app/theme/theme.constants.js` |

**API:**
```javascript
colorHelper.tint(color, weight)   // Lighten color by weight %
colorHelper.shade(color, weight)  // Darken color by weight %
```

---

## Directives Inventory

### Theme Directives

| ID | Name | File | Purpose |
|----|------|------|---------|
| DIR-001 | baSidebar | `theme/components/baSidebar/baSidebar.directive.js` | Main sidebar navigation |
| DIR-002 | baSidebarHelpers | `theme/components/baSidebar/baSidebarHelpers.directive.js` | Sidebar helper directives |
| DIR-003 | baPanel | `theme/components/baPanel/baPanel.directive.js` | Panel container |
| DIR-004 | baPanelSelf | `theme/components/baPanel/baPanelSelf.directive.js` | Self-contained panel |
| DIR-005 | baPanelBlur | `theme/components/baPanel/baPanelBlur.directive.js` | Blur effect panel |
| DIR-006 | baWizard | `theme/components/baWizard/baWizard.directive.js` | Multi-step wizard container |
| DIR-007 | baWizardStep | `theme/components/baWizard/baWizardStep.directive.js` | Wizard step |
| DIR-008 | pageTop | `theme/components/pageTop/pageTop.directive.js` | Top header bar |
| DIR-009 | contentTop | `theme/components/contentTop/contentTop.directive.js` | Page title display |
| DIR-010 | msgCenter | `theme/components/msgCenter/msgCenter.directive.js` | Message center dropdown |
| DIR-011 | backTop | `theme/components/backTop/backTop.directive.js` | Back to top button |
| DIR-012 | widgets | `theme/components/widgets/widgets.directive.js` | Widget container |
| DIR-013 | progressBarRound | `theme/components/progressBarRound/progressBarRound.directive.js` | Circular progress bar |

### Utility Directives

| ID | Name | File | Purpose |
|----|------|------|---------|
| DIR-020 | animatedChange | `theme/directives/animatedChange.js` | Animate value changes |
| DIR-021 | autoExpand | `theme/directives/autoExpand.js` | Auto-expand textarea |
| DIR-022 | autoFocus | `theme/directives/autoFocus.js` | Auto-focus input |
| DIR-023 | includeWithScope | `theme/directives/includeWithScope.js` | Include with scope |
| DIR-024 | ionSlider | `theme/directives/ionSlider.js` | Ion range slider wrapper |
| DIR-025 | ngFileSelect | `theme/directives/ngFileSelect.js` | File input handler |
| DIR-026 | scrollPosition | `theme/directives/scrollPosition.js` | Track scroll position |
| DIR-027 | trackWidth | `theme/directives/trackWidth.js` | Track element width |
| DIR-028 | zoomIn | `theme/directives/zoomIn.js` | Zoom in animation |

### Dashboard Widget Directives

| ID | Name | File | Purpose |
|----|------|------|---------|
| DIR-030 | dashboardLineChart | `pages/dashboard/dashboardLineChart/dashboardLineChart.directive.js` | Revenue line chart |
| DIR-031 | dashboardCalendar | `pages/dashboard/dashboardCalendar/dashboardCalendar.directive.js` | Calendar widget |
| DIR-032 | dashboardMap | `pages/dashboard/dashboardMap/dashboardMap.directive.js` | Map widget |
| DIR-033 | trafficChart | `pages/dashboard/trafficChart/trafficChart.directive.js` | Traffic doughnut chart |
| DIR-034 | blurFeed | `pages/dashboard/blurFeed/blurFeed.directive.js` | Activity feed |
| DIR-035 | popularApp | `pages/dashboard/popularApp/popularApp.directive.js` | Popular apps list |
| DIR-036 | dashboardPieChart | `pages/dashboard/dashboardPieChart/dashboardPieChart.directive.js` | Pie chart widget |
| DIR-037 | dashboardTodo | `pages/dashboard/dashboardTodo/dashboardTodo.directive.js` | Todo list widget |
| DIR-038 | weather | `pages/dashboard/weather/weather.directive.js` | Weather widget |

### Form Directives

| ID | Name | File | Purpose |
|----|------|------|---------|
| DIR-040 | selectpicker | `pages/form/inputs/widgets/oldSelect/selectpicker.directive.js` | Bootstrap select wrapper |
| DIR-041 | switch | `pages/form/inputs/widgets/oldSwitches/switch.directive.js` | Switch toggle |
| DIR-042 | tagsInput | `pages/form/inputs/widgets/tagsInput/tagsInput.directive.js` | Tags input field |

---

## Controllers Inventory

### Theme Controllers

| ID | Name | File | Module |
|----|------|------|--------|
| CTRL-001 | BaSidebarCtrl | `theme/components/baSidebar/BaSidebarCtrl.js` | BlurAdmin.theme.components |
| CTRL-002 | MsgCenterCtrl | `theme/components/msgCenter/MsgCenterCtrl.js` | BlurAdmin.theme.components |
| CTRL-003 | baWizardCtrl | `theme/components/baWizard/baWizardCtrl.js` | BlurAdmin.theme.components |

### Page Controllers

| ID | Name | File | Route |
|----|------|------|-------|
| CTRL-010 | WizardCtrl | `pages/form/wizard/wizrdCtrl.js` | form.wizard |
| CTRL-011 | TablesPageCtrl | `pages/tables/TablesPageCtrl.js` | tables (parent) |
| CTRL-012 | ProfilePageCtrl | `pages/profile/ProfilePageCtrl.js` | profile |
| CTRL-013 | ProfileModalCtrl | `pages/profile/ProfileModalCtrl.js` | (modal) |
| CTRL-014 | ButtonPageCtrl | `pages/ui/buttons/ButtonPageCtrl.js` | ui.buttons |
| CTRL-015 | IconsPageCtrl | `pages/ui/icons/IconsPageCtrl.js` | ui.icons |
| CTRL-016 | ModalsPageCtrl | `pages/ui/modals/ModalsPageCtrl.js` | ui.modals |
| CTRL-017 | NotificationsPageCtrl | `pages/ui/notifications/NotificationsPageCtrl.js` | ui.notifications |
| CTRL-018 | ProgressModalCtrl | `pages/ui/modals/progressModal/ProgressModalCtrl.js` | (modal) |
| CTRL-019 | NotificationsCtrl | `pages/ui/modals/notifications/NotificationsCtrl.js` | (modal) |

### Dashboard Widget Controllers

| ID | Name | File |
|----|------|------|
| CTRL-020 | DashboardLineChartCtrl | `pages/dashboard/dashboardLineChart/DashboardLineChartCtrl.js` |
| CTRL-021 | DashboardCalendarCtrl | `pages/dashboard/dashboardCalendar/DashboardCalendarCtrl.js` |
| CTRL-022 | DashboardMapCtrl | `pages/dashboard/dashboardMap/DashboardMapCtrl.js` |
| CTRL-023 | TrafficChartCtrl | `pages/dashboard/trafficChart/TrafficChartCtrl.js` |
| CTRL-024 | BlurFeedCtrl | `pages/dashboard/blurFeed/BlurFeedCtrl.js` |
| CTRL-025 | DashboardPieChartCtrl | `pages/dashboard/dashboardPieChart/DashboardPieChartCtrl.js` |
| CTRL-026 | DashboardTodoCtrl | `pages/dashboard/dashboardTodo/DashboardTodoCtrl.js` |
| CTRL-027 | WeatherCtrl | `pages/dashboard/weather/WeatherCtrl.js` |

### Chart Controllers

| ID | Name | File |
|----|------|------|
| CTRL-030 | LineChartCtrl | `pages/charts/amCharts/lineChart/LineChartCtrl.js` |
| CTRL-031 | AreaChartCtrl | `pages/charts/amCharts/areaChart/AreaChartCtrl.js` |
| CTRL-032 | BarChartCtrl | `pages/charts/amCharts/barChart/BarChartCtrl.js` |
| CTRL-033 | PieChartCtrl | `pages/charts/amCharts/pieChart/PieChartCtrl.js` |
| CTRL-034 | FunnelChartCtrl | `pages/charts/amCharts/funnelChart/FunnelChartCtrl.js` |
| CTRL-035 | combinedChartCtrl | `pages/charts/amCharts/combinedChart/combinedChartCtrl.js` |
| CTRL-036 | ganttChartCtrl | `pages/charts/amCharts/ganttChart/ganttChartCtrl.js` |
| CTRL-037 | chartistCtrl | `pages/charts/chartist/chartistCtrl.js` |
| CTRL-038 | chartJs1DCtrl | `pages/charts/chartJs/chartJs1DCtrl.js` |
| CTRL-039 | chartJs2DCtrl | `pages/charts/chartJs/chartJs2DCtrl.js` |
| CTRL-040 | chartJsWaveCtrl | `pages/charts/chartJs/chartJsWaveCtrl.js` |
| CTRL-041 | morrisCtrl | `pages/charts/morris/morrisCtrl.js` |

### Map Controllers

| ID | Name | File |
|----|------|------|
| CTRL-050 | GmapPageCtrl | `pages/maps/google-maps/GmapPageCtrl.js` |
| CTRL-051 | LeafletPageCtrl | `pages/maps/leaflet/LeafletPageCtrl.js` |
| CTRL-052 | MapBubblePageCtrl | `pages/maps/map-bubbles/MapBubblePageCtrl.js` |
| CTRL-053 | MapLinesPageCtrl | `pages/maps/map-lines/MapLinesPageCtrl.js` |

### Component Controllers

| ID | Name | File |
|----|------|------|
| CTRL-060 | MailTabCtrl | `pages/components/mail/MailTabCtrl.js` |
| CTRL-061 | MailListCtrl | `pages/components/mail/list/MailListCtrl.js` |
| CTRL-062 | MailDetailCtrl | `pages/components/mail/detail/MailDetailCtrl.js` |
| CTRL-063 | composeBoxCtrl | `pages/components/mail/composeBox/composeBoxCtrl.js` |
| CTRL-064 | TimelineCtrl | `pages/components/timeline/TimelineCtrl.js` |
| CTRL-065 | treeCtrl | `pages/components/tree/treeCtrl.js` |

### Form Controllers

| ID | Name | File |
|----|------|------|
| CTRL-070 | SelectpickerPanelCtrl | `pages/form/inputs/widgets/select/SelectpickerPanelCtrl.js` |
| CTRL-071 | OldSelectpickerPanelCtrl | `pages/form/inputs/widgets/oldSelect/OldSelectpickerPanelCtrl.js` |
| CTRL-072 | datepickerCtrl | `pages/form/inputs/widgets/datePickers/datepickerCtrl.js` |
| CTRL-073 | datepickerpopupCtrl | `pages/form/inputs/widgets/datePickers/datepickerpopupCtrl.js` |
| CTRL-074 | SwitchDemoPanelCtrl | `pages/form/inputs/widgets/switches/SwitchDemoPanelCtrl.js` |
| CTRL-075 | OldSwitchPanelCtrl | `pages/form/inputs/widgets/oldSwitches/OldSwitchPanelCtrl.js` |

---

## Run Blocks

### theme.run.js
| Property | Value |
|----------|-------|
| Module | BlurAdmin.theme |
| File | `src/app/theme/theme.run.js` |

**Purpose:** Application initialization and preloading.

**Behavior:**
1. Waits for AmCharts ready
2. Waits for 3 second timeout
3. If blur theme: waits for background images to load
4. Sets `$rootScope.$pageFinishedLoading = true`
5. Fallback: Sets flag after 7 seconds regardless
6. Exposes `baSidebarService` on `$rootScope`

**Dependencies:** $timeout, $rootScope, layoutPaths, preloader, $q, baSidebarService, themeLayoutSettings

---

## Config Blocks

### pages.module.js
- Sets default route: `$urlRouterProvider.otherwise('/dashboard')`
- Adds static sidebar items (Pages, Menu Level 1)

### tables.module.js
- Redirect: `/tables` -> `/tables/basic`

### mail.module.js
- Redirect: `/components/mail` -> `/components/mail/inbox`

### amCharts.module.js
- Configures `AmCharts.themes.blur` custom theme

### chartJs.module.js
- Configures `ChartJsProvider` global options

### morris.module.js
- Configures Morris prototype defaults

### tree.module.js
- Configures jstree themes path

---

## Filters (Located in theme/filters/)

| Directory | Purpose |
|-----------|---------|
| image/ | Image-related filters (appImage, profilePicture) |
| text/ | Text-related filters |

---

## Migration Considerations

### High-Priority Services (Core Functionality)
1. **baConfig** - Central to all theming, must be migrated first
2. **baSidebarService** - Navigation depends on this
3. **themeLayoutSettings** - Device detection and theme application

### Services with External Dependencies
1. **mailMessages** - Uses `$sce.trustAsHtml()` - needs Angular DomSanitizer
2. **composeModal** - Uses `$uibModal` - needs Angular Material Dialog or similar
3. **fileReader** - Uses FileReader API - can use native Angular approach

### Directives Requiring Rewrite
1. All dashboard widget directives - Convert to Angular components
2. baWizard/baWizardStep - Convert to Angular stepper or custom component
3. baSidebar - Convert to Angular component with routing integration

### Third-Party Library Replacements
| AngularJS Library | Angular Replacement |
|-------------------|---------------------|
| angular-ui-router | @angular/router |
| angular-bootstrap | @ng-bootstrap/ng-bootstrap or Angular Material |
| angular-toastr | ngx-toastr |
| angular-chart.js | ng2-charts |
| angular-smart-table | Angular Material Table or ngx-datatable |
| angular-xeditable | Custom implementation or ngx-inline-editor |
| textAngular | ngx-quill or similar |
| ng-js-tree | angular-tree-component |
