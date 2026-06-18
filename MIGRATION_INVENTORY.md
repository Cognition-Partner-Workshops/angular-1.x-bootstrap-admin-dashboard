# Migration Inventory — BlurAdmin AngularJS 1.5.8 → Angular 18

## 1. AngularJS Modules

| Module | File | Dependencies |
|--------|------|-------------|
| `BlurAdmin` (root) | `src/app/app.js` | ngAnimate, ui.bootstrap, ui.sortable, ui.router, ngTouch, toastr, smart-table, xeditable, ui.slimscroll, ngJsTree, angular-progress-button-styles, BlurAdmin.theme, BlurAdmin.pages |
| `BlurAdmin.theme` | `src/app/theme/theme.module.js` | BlurAdmin.theme.components, BlurAdmin.theme.inputs |
| `BlurAdmin.theme.components` | `src/app/theme/components/components.module.js` | — |
| `BlurAdmin.theme.inputs` | `src/app/theme/inputs/inputs.module.js` | — |
| `BlurAdmin.pages` | `src/app/pages/pages.module.js` | ui.router, all page sub-modules |
| `BlurAdmin.pages.dashboard` | `src/app/pages/dashboard/dashboard.module.js` | — |
| `BlurAdmin.pages.charts` | `src/app/pages/charts/charts.module.js` | chartJs, amCharts, chartist, morris sub-modules |
| `BlurAdmin.pages.charts.chartJs` | `src/app/pages/charts/chartJs/chartJs.module.js` | — |
| `BlurAdmin.pages.charts.amCharts` | `src/app/pages/charts/amCharts/amCharts.module.js` | — |
| `BlurAdmin.pages.charts.chartist` | `src/app/pages/charts/chartist/chartist.module.js` | — |
| `BlurAdmin.pages.charts.morris` | `src/app/pages/charts/morris/morris.module.js` | — |
| `BlurAdmin.pages.form` | `src/app/pages/form/form.module.js` | — |
| `BlurAdmin.pages.tables` | `src/app/pages/tables/tables.module.js` | — |
| `BlurAdmin.pages.ui` | `src/app/pages/ui/ui.module.js` | alerts, buttons, grid, icons, modals, notifications, panels, progressBars, slider, tabs, typography |
| `BlurAdmin.pages.ui.alerts` | `src/app/pages/ui/alerts/alerts.module.js` | — |
| `BlurAdmin.pages.ui.buttons` | `src/app/pages/ui/buttons/buttons.module.js` | — |
| `BlurAdmin.pages.ui.grid` | `src/app/pages/ui/grid/grid.module.js` | — |
| `BlurAdmin.pages.ui.icons` | `src/app/pages/ui/icons/icons.module.js` | — |
| `BlurAdmin.pages.ui.modals` | `src/app/pages/ui/modals/modals.module.js` | — |
| `BlurAdmin.pages.ui.notifications` | `src/app/pages/ui/notifications/notifications.module.js` | — |
| `BlurAdmin.pages.ui.panels` | `src/app/pages/ui/panels/panels.module.js` | — |
| `BlurAdmin.pages.ui.progressBars` | `src/app/pages/ui/progressBars/progressBars.module.js` | — |
| `BlurAdmin.pages.ui.slider` | `src/app/pages/ui/slider/slider.module.js` | — |
| `BlurAdmin.pages.ui.tabs` | `src/app/pages/ui/tabs/tabs.module.js` | — |
| `BlurAdmin.pages.ui.typography` | `src/app/pages/ui/typography/typography.module.js` | — |
| `BlurAdmin.pages.maps` | `src/app/pages/maps/maps.module.js` | — |
| `BlurAdmin.pages.components` | `src/app/pages/components/components.module.js` | mail, timeline, tree |
| `BlurAdmin.pages.components.mail` | `src/app/pages/components/mail/mail.module.js` | — |
| `BlurAdmin.pages.components.timeline` | `src/app/pages/components/timeline/timeline.module.js` | — |
| `BlurAdmin.pages.components.tree` | `src/app/pages/components/tree/tree.module.js` | — |
| `BlurAdmin.pages.profile` | `src/app/pages/profile/profile.module.js` | — |

## 2. Routes (ui-router State Definitions)

| State | URL | Template |
|-------|-----|----------|
| `dashboard` | `/dashboard` | `dashboard.html` |
| `charts` | `/charts` | abstract parent |
| `charts.chartJs` | `/chartJs` | `chartJs.html` |
| `charts.amCharts` | `/amCharts` | `charts.html` |
| `charts.chartist` | `/chartist` | `chartist.html` |
| `charts.morris` | `/morris` | `morris.html` |
| `form` | `/form` | abstract parent |
| `form.inputs` | `/inputs` | `inputs.html` |
| `form.layouts` | `/layouts` | `layouts.html` |
| `form.wizard` | `/wizard` | `wizard.html` |
| `tables` | `/tables` | abstract parent |
| `tables.basic` | `/basic` | `basic.html` |
| `tables.smart` | `/smart` | `smart.html` |
| `ui` | `/ui` | abstract parent |
| `ui.typography` | `/typography` | `typography.html` |
| `ui.buttons` | `/buttons` | `buttons.html` |
| `ui.icons` | `/icons` | `icons.html` |
| `ui.modals` | `/modals` | `modals.html` |
| `ui.alerts` | `/alerts` | `alerts.html` |
| `ui.progressBars` | `/progressBars` | `progressBars.html` |
| `ui.notifications` | `/notifications` | `notifications.html` |
| `ui.grid` | `/grid` | `grid.html` |
| `ui.panels` | `/panels` | `panels.html` |
| `ui.slider` | `/slider` | `slider.html` |
| `ui.tabs` | `/tabs` | `tabs.html` |
| `maps` | `/maps` | abstract parent |
| `maps.gmap` | `/gmap` | `gmap.html` |
| `maps.leaflet` | `/leaflet` | `leaflet.html` |
| `maps.bubble` | `/bubble` | `bubble.html` |
| `maps.line` | `/line` | `line.html` |
| `components` | `/components` | abstract parent |
| `components.mail` | `/mail` | `mail.html` |
| `components.mail.label` | `/:label` | nested label view |
| `components.mail.detail` | `/:id/view` | `mailDetail.html` |
| `components.timeline` | `/timeline` | `timeline.html` |
| `components.tree` | `/tree` | `tree.html` |
| `profile` | `/profile` | `profile.html` |

## 3. Directives

### Theme Directives
| Directive | File |
|-----------|------|
| `baPanel` | `src/app/theme/components/baPanel/baPanel.directive.js` |
| `baPanelBlur` | `src/app/theme/components/baPanel/baPanelBlur.directive.js` |
| `baPanelSelf` | `src/app/theme/components/baPanel/baPanelSelf.directive.js` |
| `baSidebar` | `src/app/theme/components/baSidebar/baSidebar.directive.js` |
| `baSidebarHelpers` | `src/app/theme/components/baSidebar/baSidebarHelpers.directive.js` |
| `baWizard` | `src/app/theme/components/baWizard/baWizard.directive.js` |
| `baWizardStep` | `src/app/theme/components/baWizard/baWizardStep.directive.js` |
| `backTop` | `src/app/theme/components/backTop/backTop.directive.js` |
| `contentTop` | `src/app/theme/components/contentTop/contentTop.directive.js` |
| `msgCenter` | `src/app/theme/components/msgCenter/msgCenter.directive.js` |
| `pageTop` | `src/app/theme/components/pageTop/pageTop.directive.js` |
| `progressBarRound` | `src/app/theme/components/progressBarRound/progressBarRound.directive.js` |
| `widgets` | `src/app/theme/components/widgets/widgets.directive.js` |
| `animatedChange` | `src/app/theme/directives/animatedChange.js` |
| `autoExpand` | `src/app/theme/directives/autoExpand.js` |
| `autoFocus` | `src/app/theme/directives/autoFocus.js` |
| `includeWithScope` | `src/app/theme/directives/includeWithScope.js` |
| `ionSlider` | `src/app/theme/directives/ionSlider.js` |
| `ngFileSelect` | `src/app/theme/directives/ngFileSelect.js` |
| `scrollPosition` | `src/app/theme/directives/scrollPosition.js` |
| `trackWidth` | `src/app/theme/directives/trackWidth.js` |
| `zoomIn` | `src/app/theme/directives/zoomIn.js` |
| `baSwitcher` | `src/app/theme/inputs/baSwitcher/baSwitcher.js` |

### Page Directives
| Directive | File |
|-----------|------|
| `blurFeed` | `src/app/pages/dashboard/blurFeed/blurFeed.directive.js` |
| `dashboardCalendar` | `src/app/pages/dashboard/dashboardCalendar/dashboardCalendar.directive.js` |
| `dashboardLineChart` | `src/app/pages/dashboard/dashboardLineChart/dashboardLineChart.directive.js` |
| `dashboardMap` | `src/app/pages/dashboard/dashboardMap/dashboardMap.directive.js` |
| `dashboardPieChart` | `src/app/pages/dashboard/dashboardPieChart/dashboardPieChart.directive.js` |
| `dashboardTodo` | `src/app/pages/dashboard/dashboardTodo/dashboardTodo.directive.js` |
| `popularApp` | `src/app/pages/dashboard/popularApp/popularApp.directive.js` |
| `trafficChart` | `src/app/pages/dashboard/trafficChart/trafficChart.directive.js` |
| `weather` | `src/app/pages/dashboard/weather/weather.directive.js` |
| `selectpicker` | `src/app/pages/form/inputs/widgets/oldSelect/selectpicker.directive.js` |
| `switch` | `src/app/pages/form/inputs/widgets/oldSwitches/switch.directive.js` |
| `tagsInput` | `src/app/pages/form/inputs/widgets/tagsInput/tagsInput.directive.js` |

## 4. Services / Factories / Providers

| Service | Type | File |
|---------|------|------|
| `baPanel` | service | `src/app/theme/components/baPanel/baPanel.service.js` |
| `baPanelBlurHelper` | service | `src/app/theme/components/baPanel/baPanelBlurHelper.service.js` |
| `baSidebarService` | provider | `src/app/theme/components/baSidebar/baSidebar.service.js` |
| `baProgressModal` | service | `src/app/theme/services/baProgressModal.js` |
| `baUtil` | service | `src/app/theme/services/baUtil.js` |
| `fileReader` | service | `src/app/theme/services/fileReader.js` |
| `preloader` | service | `src/app/theme/services/preloader.js` |
| `stopableInterval` | service | `src/app/theme/services/stopableInterval.js` |
| `baThemeConfigProvider` | provider | `src/app/theme/theme.configProvider.js` |
| `baConfig` | service | `src/app/theme/theme.service.js` |
| `composeModal` | service | `src/app/pages/components/mail/composeBox/composeModal.js` |
| `mailMessages` | service | `src/app/pages/components/mail/mailMessages.js` |

## 5. Filters

| Filter | File |
|--------|------|
| `removeHtml` | `src/app/theme/filters/text/removeHtml.js` |
| `kameleonImg` | `src/app/theme/filters/image/kameleonImg.js` |
| `profilePicture` | `src/app/theme/filters/image/profilePicture.js` |
| `appImage` | `src/app/theme/filters/image/appImage.js` |

## 6. Controllers

| Controller | File |
|-----------|------|
| `DashboardCtrl` (implied) | `src/app/pages/dashboard/` |
| `TrafficChartCtrl` | `src/app/pages/dashboard/trafficChart/TrafficChartCtrl.js` |
| `DashboardPieChartCtrl` | `src/app/pages/dashboard/dashboardPieChart/DashboardPieChartCtrl.js` |
| `DashboardTodoCtrl` | `src/app/pages/dashboard/dashboardTodo/DashboardTodoCtrl.js` |
| `DashboardCalendarCtrl` | `src/app/pages/dashboard/dashboardCalendar/DashboardCalendarCtrl.js` |
| `BlurFeedCtrl` | `src/app/pages/dashboard/blurFeed/BlurFeedCtrl.js` |
| `DashboardLineChartCtrl` | `src/app/pages/dashboard/dashboardLineChart/DashboardLineChartCtrl.js` |
| `DashboardMapCtrl` | `src/app/pages/dashboard/dashboardMap/DashboardMapCtrl.js` |
| `WeatherCtrl` | `src/app/pages/dashboard/weather/WeatherCtrl.js` |
| `ChartJs1DCtrl` | `src/app/pages/charts/chartJs/chartJs1DCtrl.js` |
| `ChartJs2DCtrl` | `src/app/pages/charts/chartJs/chartJs2DCtrl.js` |
| `ChartJsWaveCtrl` | `src/app/pages/charts/chartJs/chartJsWaveCtrl.js` |
| `AreaChartCtrl` | `src/app/pages/charts/amCharts/areaChart/AreaChartCtrl.js` |
| `BarChartCtrl` | `src/app/pages/charts/amCharts/barChart/BarChartCtrl.js` |
| `CombinedChartCtrl` | `src/app/pages/charts/amCharts/combinedChart/combinedChartCtrl.js` |
| `FunnelChartCtrl` | `src/app/pages/charts/amCharts/funnelChart/FunnelChartCtrl.js` |
| `GanttChartCtrl` | `src/app/pages/charts/amCharts/ganttChart/ganttChartCtrl.js` |
| `LineChartCtrl` | `src/app/pages/charts/amCharts/lineChart/LineChartCtrl.js` |
| `PieChartCtrl` | `src/app/pages/charts/amCharts/pieChart/PieChartCtrl.js` |
| `ChartistCtrl` | `src/app/pages/charts/chartist/chartistCtrl.js` |
| `MorrisCtrl` | `src/app/pages/charts/morris/morrisCtrl.js` |
| `MailTabCtrl` | `src/app/pages/components/mail/MailTabCtrl.js` |
| `ComposeBoxCtrl` | `src/app/pages/components/mail/composeBox/composeBoxCtrl.js` |
| `MailDetailCtrl` | `src/app/pages/components/mail/detail/MailDetailCtrl.js` |
| `MailListCtrl` | `src/app/pages/components/mail/list/MailListCtrl.js` |
| `TimelineCtrl` | `src/app/pages/components/timeline/TimelineCtrl.js` |
| `TreeCtrl` | `src/app/pages/components/tree/treeCtrl.js` |
| `TablesPageCtrl` | `src/app/pages/tables/TablesPageCtrl.js` |
| `GmapPageCtrl` | `src/app/pages/maps/google-maps/GmapPageCtrl.js` |
| `LeafletPageCtrl` | `src/app/pages/maps/leaflet/LeafletPageCtrl.js` |
| `MapBubblePageCtrl` | `src/app/pages/maps/map-bubbles/MapBubblePageCtrl.js` |
| `MapLinesPageCtrl` | `src/app/pages/maps/map-lines/MapLinesPageCtrl.js` |
| `ProfilePageCtrl` | `src/app/pages/profile/ProfilePageCtrl.js` |
| `ProfileModalCtrl` | `src/app/pages/profile/ProfileModalCtrl.js` |
| `ButtonPageCtrl` | `src/app/pages/ui/buttons/ButtonPageCtrl.js` |
| `IconsPageCtrl` | `src/app/pages/ui/icons/IconsPageCtrl.js` |
| `ModalsPageCtrl` | `src/app/pages/ui/modals/ModalsPageCtrl.js` |
| `NotificationsPageCtrl` | `src/app/pages/ui/notifications/NotificationsPageCtrl.js` |
| `BaSidebarCtrl` | `src/app/theme/components/baSidebar/BaSidebarCtrl.js` |
| `MsgCenterCtrl` | `src/app/theme/components/msgCenter/MsgCenterCtrl.js` |
| `BaWizardCtrl` | `src/app/theme/components/baWizard/baWizardCtrl.js` |
| `DatepickerCtrl` | `src/app/pages/form/inputs/widgets/datePickers/datepickerCtrl.js` |
| `DatepickerPopupCtrl` | `src/app/pages/form/inputs/widgets/datePickers/datepickerpopupCtrl.js` |
| `OldSelectpickerPanelCtrl` | `src/app/pages/form/inputs/widgets/oldSelect/OldSelectpickerPanelCtrl.js` |
| `OldSwitchPanelCtrl` | `src/app/pages/form/inputs/widgets/oldSwitches/OldSwitchPanelCtrl.js` |
| `SelectpickerPanelCtrl` | `src/app/pages/form/inputs/widgets/select/SelectpickerPanelCtrl.js` |
| `SwitchDemoPanelCtrl` | `src/app/pages/form/inputs/widgets/switches/SwitchDemoPanelCtrl.js` |
| `WizardCtrl` | `src/app/pages/form/wizard/wizrdCtrl.js` |

## 7. Third-Party Dependencies (bower.json → Angular 18 Equivalents)

| AngularJS Dependency (bower) | Version | Angular 18 Equivalent | npm Package |
|------------------------------|---------|----------------------|-------------|
| angular | ~1.5.8 | Angular 18 | `@angular/core@18` |
| angular-route | ~1.5.8 | Angular Router | `@angular/router@18` |
| angular-ui-router | ~0.3.2 | Angular Router | `@angular/router@18` |
| angular-animate | ~1.5.8 | Angular Animations | `@angular/animations@18` |
| angular-touch | ~1.5.8 | (not needed) | — |
| angular-bootstrap | ~1.3.3 | ng-bootstrap | `@ng-bootstrap/ng-bootstrap` |
| angular-chart.js | ~1.0.3 | ng2-charts + Chart.js | `ng2-charts`, `chart.js` |
| angular-chartist.js | ~3.3.12 | ngx-chartist or ng2-charts | `ng2-charts` (Chartist replacement) |
| angular-morris-chart | ~1.1.0 | ng2-charts (replacement) | `ng2-charts` |
| angular-smart-table | ~2.1.3 | Custom Angular Material Table | Custom implementation |
| angular-toastr | ~2.1.1 | ngx-toastr | `ngx-toastr` |
| angular-xeditable | ~0.5.0 | Custom inline editing | Custom implementation |
| angular-ui-select | ^0.19.6 | ng-select | `@ng-select/ng-select` |
| angular-ui-sortable | ~0.15.0 | Angular CDK Drag & Drop | `@angular/cdk` |
| angular-slimscroll | ~1.1.5 | CSS overflow-y: auto | Native CSS |
| angular-progress-button-styles | ~0.1.0 | Custom CSS | Custom implementation |
| ng-js-tree | ~0.0.7 | Angular CDK Tree | `@angular/cdk` |
| textAngular | ~1.4.6 | (rich text not heavily used) | — |
| jquery | ~3.1.1 | (removed) | — |
| jquery-ui | ~1.12.1 | Angular CDK | `@angular/cdk` |
| jquery.easing | ~1.3.1 | CSS animations | — |
| jquery.easy-pie-chart | ~2.1.6 | ng2-charts (doughnut) | `ng2-charts` |
| bootstrap | ~3.3.5 | Bootstrap 5 | `bootstrap@5` |
| bootstrap-select | ~1.12.1 | ng-bootstrap / ng-select | `@ng-select/ng-select` |
| bootstrap-switch | ~3.3.2 | Bootstrap 5 form-check | Native Bootstrap 5 |
| bootstrap-tagsinput | master | ngx-chips or custom | Custom implementation |
| chart.js | ~2.4.0 | Chart.js 4 | `chart.js@4` |
| chartist | 0.9.5 | ng2-charts (replacement) | — |
| amcharts | ~3.15.2 | amCharts 5 | `@amcharts/amcharts5` |
| amcharts-stock | * | amCharts 5 Stock | `@amcharts/amcharts5` |
| ammap | ~3.14.5 | amCharts 5 Map | `@amcharts/amcharts5`, `@amcharts/amcharts5-geodata` |
| fullcalendar | ~3.0.1 | FullCalendar Angular | `@fullcalendar/angular`, `@fullcalendar/core`, `@fullcalendar/daygrid`, `@fullcalendar/interaction` |
| leaflet | ~0.7.5 | Leaflet + ngx-leaflet | `leaflet`, `@asymmetrik/ngx-leaflet` |
| font-awesome | ~4.4.0 | Font Awesome 6 Free | `@fortawesome/fontawesome-free` |
| Ionicons | ~2.0.1 | Ionicons 7 | `ionicons` |
| animate.css | ~3.5.2 | animate.css | `animate.css` |
| highlight | ~8.8.0 | (code highlighting) | — |
| moment | ~2.17.0 | date-fns (or native Date) | — |
| ionrangeslider | 2.1.4 | ngx-slider | `@angular-slider/ngx-slider` |

## 8. SCSS/Sass File Inventory

| Category | Files | Path Pattern |
|----------|-------|-------------|
| Theme variables & mixins | 2 | `src/sass/theme/conf/` |
| Color schemes (blur, mint) | 2 | `src/sass/theme/conf/colorScheme/` |
| Theme core (buttons, layout, icons, etc.) | 8 | `src/sass/theme/` |
| Theme components (sidebar, pageTop, etc.) | 7 | `src/sass/theme/components/` |
| Dashboard widgets | 10 | `src/sass/theme/dashboard/` |
| Bootstrap overrides | 2 | `src/sass/theme/bootstrap-overrides/` |
| App page styles | 19 | `src/sass/app/` |
| Entry points (main, auth, 404, common) | 4 | `src/sass/` |
| **Total** | **60** | |

## 9. File Count Summary

| Category | Count |
|----------|-------|
| JavaScript (.js) | 139 |
| HTML templates (.html) | 119 |
| SCSS (.scss) | 60 |
| Images (.png, .jpg, .svg, .gif) | 108 |
| Fonts (.ttf, .woff, .woff2, .eot) | 4 |
| **Total source files** | **431** |

## 10. Build System Migration

| Aspect | AngularJS (Before) | Angular 18 (After) |
|--------|-------------------|-------------------|
| Package manager | npm + Bower | npm only |
| Build tool | Gulp 3.9 | Angular CLI (ng) |
| Module system | IIFE + script concatenation | ES Modules + TypeScript |
| CSS preprocessor | node-sass via gulp-sass | Sass via Angular CLI |
| Node version | Node 10 | Node 18+ |
| Template caching | gulp-angular-templatecache | Component templates (inline/file) |
| Dependency injection | string annotation + ngAnnotate | TypeScript constructor injection |
| Routing | ui-router (hash-based) | @angular/router (path-based) |
