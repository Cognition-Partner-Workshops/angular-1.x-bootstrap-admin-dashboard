# Inventory: pages/charts

Source root: `src/app/pages/charts/` (sub-areas `amCharts/`, `chartJs/`, `chartist/`, `morris/`) plus the area-specific stylesheet `src/sass/app/_chartsPage.scss` (imported from `src/sass/main.scss` line 44). 28 source files + 1 SCSS partial. The parent `BlurAdmin.pages.charts` module is wired in by `src/app/pages/pages.module.js` (line 16); the third-party Angular wrapper modules (`chart.js`, `angular-chartist`, `angular.morris-chart`) are declared as dependencies of `BlurAdmin.theme` in `src/app/theme/theme.module.js` (lines 10-12), not inside this area.

## 1. Modules

| Module name | Dependency list (verbatim) | File |
|---|---|---|
| `BlurAdmin.pages.charts` | `['BlurAdmin.pages.charts.amCharts', 'BlurAdmin.pages.charts.chartJs', 'BlurAdmin.pages.charts.chartist', 'BlurAdmin.pages.charts.morris']` | `src/app/pages/charts/charts.module.js` |
| `BlurAdmin.pages.charts.amCharts` | `[]` | `src/app/pages/charts/amCharts/amCharts.module.js` |
| `BlurAdmin.pages.charts.chartJs` | `[]` | `src/app/pages/charts/chartJs/chartJs.module.js` |
| `BlurAdmin.pages.charts.chartist` | `[]` | `src/app/pages/charts/chartist/chartist.module.js` |
| `BlurAdmin.pages.charts.morris` | `[]` | `src/app/pages/charts/morris/morris.module.js` |

No `.directive(`, `.component(`, `.service(`, `.factory(`, `.provider(`, `.filter(`, `.constant(`, `.value(` or `.run(` registrations exist in this area (verified via grep). Only `.config(` and `.controller(`.

## 2. Registrations

| Type | Name | File | Notes |
|---|---|---|---|
| config | `routeConfig` (anonymous fn, `/** @ngInject */`) | `src/app/pages/charts/charts.module.js` | Injects `$stateProvider`; registers abstract state `charts` |
| config | `routeConfig` | `src/app/pages/charts/amCharts/amCharts.module.js` | Injects `$stateProvider`; registers `charts.amCharts` |
| config | `amChartConfig` | `src/app/pages/charts/amCharts/amCharts.module.js` | Injects `baConfigProvider` (no `@ngInject` annotation - relies on ng-annotate inferring from `.config(fn)`); mutates global `AmCharts.themes.blur = {...}` with a full theme object (AmChart, AmCoordinateChart, AmStockChart, AmSlicedChart, AmRectangularChart, AxisBase, ChartScrollbar, ChartCursor, AmLegend, AmGraph, GaugeArrow, GaugeAxis, TrendLine, AreasSettings, LinesSettings, ImagesSettings, ZoomControl, SmallMap, PeriodSelector, PeriodButton, PeriodButtonSelected, PeriodInputField, DataSetSelector, DataSetCompareList, DataSetSelect) built from `baConfigProvider.colors` |
| controller | `AreaChartCtrl` | `src/app/pages/charts/amCharts/areaChart/AreaChartCtrl.js` | Injects `$scope, baConfig, $element, layoutPaths`; used via `ng-controller="AreaChartCtrl"` in `areaChart.html` (ng-included by `amCharts/charts.html`). Calls `AmCharts.makeChart(id, {type:'serial', theme:'blur', export:{enabled:true}, ...})` on `$element[0].getAttribute('id')` (`areaChart`); `addListener('dataUpdated', zoomAreaChart)` -> `zoomToDates` |
| controller | `BarChartCtrl` | `src/app/pages/charts/amCharts/barChart/BarChartCtrl.js` | Injects `$scope, baConfig, $element, layoutPaths`; `ng-controller` in `barChart.html`. `AmCharts.makeChart` type `serial`/column, theme `blur`, export enabled, element id `barChart` |
| controller | `combinedChartCtrl` | `src/app/pages/charts/amCharts/combinedChart/combinedChartCtrl.js` | Injects `$element, baConfig, layoutPaths`; `ng-controller` in `combinedChart.html`. `AmCharts.makeChart` type `serial` with two value axes, column + smoothedLine graphs, `chartScrollbar`, `chartCursor`, `legend`, export enabled, theme `none`; element id `zoomAxisChart` |
| controller | `FunnelChartCtrl` | `src/app/pages/charts/amCharts/funnelChart/FunnelChartCtrl.js` | Injects `$scope, $element, layoutPaths, baConfig`; `ng-controller` in `funnelChart.html`. `AmCharts.makeChart` type `funnel`, theme `blur`, export enabled; element id `funnelChart`. NOTE: passes `pathToImages: layoutPaths` (the whole constant object) rather than `layoutPaths.images.amChart` - a latent bug |
| controller | `ganttChartCtrl` | `src/app/pages/charts/amCharts/ganttChart/ganttChartCtrl.js` | Injects `$element` only; `ng-controller` in `ganttChart.html` (element id `gnattChart` [sic]). `AmCharts.makeChart` type `gantt`, theme `light`, hard-coded hex colours, `valueScrollbar`, `chartCursor`, export enabled. The include of `ganttChart.html` in `amCharts/charts.html` is commented out, so this controller is registered but never instantiated |
| controller | `LineChartCtrl` | `src/app/pages/charts/amCharts/lineChart/LineChartCtrl.js` | Injects `$scope, baConfig, $element, layoutPaths`; `ng-controller` in `lineChart.html`. `AmCharts.makeChart` type `serial`/smoothedLine, theme `blur`, `chartScrollbar`, `chartCursor`, export enabled; element id `lineChart`. `addListener('rendered', zoomChart)` -> `zoomToIndexes`; also calls `lineChart.zoomChart()` if present |
| controller | `PieChartCtrl` | `src/app/pages/charts/amCharts/pieChart/PieChartCtrl.js` | Injects `$element, layoutPaths, baConfig`; `ng-controller` in `pieChart.html`. `AmCharts.makeChart` type `pie`, theme `blur`, `addClassNames:true`, SVG `defs.filter` (`#shadow`), `responsive.enabled:true` (amcharts responsive plugin), export enabled; element id `pieChart`. Listeners: `init` -> `legend.addListener('rollOverItem', handleRollOver)`; `rollOverSlice` -> `handleRollOver` which does raw DOM re-append `wedge.parentNode.appendChild(wedge)` |
| config | `routeConfig` | `src/app/pages/charts/chartJs/chartJs.module.js` | Injects `$stateProvider`; registers `charts.chartJs` |
| config | `chartJsConfig` | `src/app/pages/charts/chartJs/chartJs.module.js` | Injects `ChartJsProvider, baConfigProvider` (no `@ngInject` annotation); calls `ChartJsProvider.setOptions({chartColors:[...11 layoutColors], responsive:true, maintainAspectRatio:false, animation:{duration:2500}, scale:{...}})`, `setOptions('Line', {datasetFill:false})`, `setOptions('radar', {...})`, `setOptions('bar', {tooltips:{enabled:false}})` |
| controller | `chartJs1DCtrl` | `src/app/pages/charts/chartJs/chartJs1DCtrl.js` | Injects `$scope, baConfig`; used 3x via `ng-controller="chartJs1DCtrl"` in `chartJs.html` (Pie, Doughnut, Polar panels). Exposes `$scope.labels`, `$scope.data`, `$scope.options`, `$scope.changeData` (shuffles data) |
| controller | `chartJs2DCtrl` | `src/app/pages/charts/chartJs/chartJs2DCtrl.js` | Injects `$scope`; used 3x via `ng-controller="chartJs2DCtrl"` in `chartJs.html` (Radar, Line, Bars panels). Exposes `$scope.labels`, `$scope.data` (2 series), `$scope.series`, `$scope.changeData` |
| controller | `chartJsWaveCtrl` | `src/app/pages/charts/chartJs/chartJsWaveCtrl.js` | Injects `$scope, $interval, stopableInterval`; used 2x via `ng-controller="chartJsWaveCtrl"` in `chartJs.html` (Animated Radar, Animated Bars). Rotates `$scope.data` every 400 ms via `stopableInterval.start($interval, fn, 400)` |
| config | `routeConfig` | `src/app/pages/charts/chartist/chartist.module.js` | Injects `$stateProvider`; registers `charts.chartist` |
| controller | `chartistCtrl` | `src/app/pages/charts/chartist/chartistCtrl.js` | Injects `$scope, $timeout, baConfig`; `ng-controller="chartistCtrl"` on `<section>` in `chartist.html`. Builds 9 data/options objects on `$scope`, then inside `$timeout(...)` constructs charts imperatively by CSS id: `new Chartist.Line('#line-chart' | '#area-chart' | '#bi-chart', ...)`, `new Chartist.Bar('#simple-bar' | '#multi-bar' | '#stacked-bar', ...)`, `new Chartist.Pie('#simple-pie' | '#label-pie' | '#donut', ...)`. Uses `Chartist.noop` in responsive options |
| config | `routeConfig` | `src/app/pages/charts/morris/morris.module.js` | Injects `$stateProvider`; registers `charts.morris` |
| config | anonymous `function(baConfigProvider)` | `src/app/pages/charts/morris/morris.module.js` | Mutates global Morris prototypes: `Morris.Donut.prototype.defaults.backgroundColor = 'transparent'`, `Morris.Donut.prototype.defaults.labelColor`, `Morris.Grid.prototype.gridDefaults.gridLineColor`, `Morris.Grid.prototype.gridDefaults.gridTextColor` from `baConfigProvider.colors` |
| controller | `morrisCtrl` | `src/app/pages/charts/morris/morrisCtrl.js` | Injects `$scope, $window, baConfig`; `ng-controller="morrisCtrl"` on `<section>` in `morris.html`. Exposes `$scope.colors`, `$scope.lineData`, `$scope.areaData`, `$scope.barData`, `$scope.donutData` consumed by angular-morris-chart directives. Binds `angular.element($window).bind('resize', fn)` with an empty (commented-out) body and never unbinds |

## 3. ui.router states / routes

| State name | url | templateUrl / template | controller (+ controllerAs) | title / sidebarMeta | File |
|---|---|---|---|---|---|
| `charts` (**abstract: true**) | `/charts` | inline `template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>'` | none | title `Charts`; sidebarMeta `{ icon: 'ion-stats-bars', order: 150 }` | `src/app/pages/charts/charts.module.js` |
| `charts.amCharts` | `/amCharts` | `templateUrl: 'app/pages/charts/amCharts/charts.html'` | none on state (controllers attached via `ng-controller` inside ng-included partials) | title `amCharts`; sidebarMeta `{ order: 0 }` | `src/app/pages/charts/amCharts/amCharts.module.js` |
| `charts.chartist` | `/chartist` | `templateUrl: 'app/pages/charts/chartist/chartist.html'` | none on state (`ng-controller="chartistCtrl"` in template) | title `Chartist`; sidebarMeta `{ order: 100 }` | `src/app/pages/charts/chartist/chartist.module.js` |
| `charts.chartJs` | `/chartJs` | `templateUrl: 'app/pages/charts/chartJs/chartJs.html'` | none on state (`ng-controller` x8 in template) | title `Chart.js`; sidebarMeta `{ order: 200 }` | `src/app/pages/charts/chartJs/chartJs.module.js` |
| `charts.morris` | `/morris` | `templateUrl: 'app/pages/charts/morris/morris.html'` | none on state (`ng-controller="morrisCtrl"` in template) | title `Morris`; sidebarMeta `{ order: 300 }` | `src/app/pages/charts/morris/morris.module.js` |

- `$urlRouterProvider.otherwise`: none in this area.
- Abstract states: `charts` (above).
- `baSidebarServiceProvider.addStaticItem`: none in this area. Sidebar entries are derived from `title`/`sidebarMeta` on the states (the sidebar service in `src/app/theme/components/baSidebar/` reads them - outside this area).
- No `controller`/`controllerAs` set on any state; every controller is attached with `ng-controller` in templates.
- Nested templates loaded via `ng-include` (not states): `amCharts/charts.html` includes `barChart/barChart.html`, `areaChart/areaChart.html`, `lineChart/lineChart.html`, `pieChart/pieChart.html`, `funnelChart/funnelChart.html`, `combinedChart/combinedChart.html`; `ganttChart/ganttChart.html` include is commented out.

## 4. Third-party AngularJS / Bower libraries consumed

| Library (bower name + angular module name) | How used | Files where used |
|---|---|---|
| `amcharts` `~3.15.2` (no Angular module; global `AmCharts`; bower override loads `amcharts.js`, `plugins/responsive/responsive.min.js`, `serial.js`, `funnel.js`, `pie.js`, `gantt.js`) + `amcharts-stock` `*` (`amstock.js`) | `AmCharts.makeChart(id, config)`; `AmCharts.themes.blur = {...}` (custom theme registration); chart instance `.addListener('dataUpdated' | 'rendered' | 'init' | 'rollOverSlice', fn)`, `.zoomToDates`, `.zoomToIndexes`, `.zoomChart`, `.legend.addListener('rollOverItem', fn)`; `export: {enabled: true}` (amcharts export plugin, styled by `.amcharts-export-menu-top-right`); `responsive: {enabled: true, rules: [...]}` (responsive plugin); `pathToImages` from `layoutPaths.images.amChart`. Theme object also configures AmStockChart/PeriodSelector/DataSet* keys used by amstock | `amCharts/amCharts.module.js`, `amCharts/areaChart/AreaChartCtrl.js`, `amCharts/barChart/BarChartCtrl.js`, `amCharts/combinedChart/combinedChartCtrl.js`, `amCharts/funnelChart/FunnelChartCtrl.js`, `amCharts/ganttChart/ganttChartCtrl.js`, `amCharts/lineChart/LineChartCtrl.js`, `amCharts/pieChart/PieChartCtrl.js` |
| `chart.js` `~2.4.0` + `angular-chart.js` `~1.0.3` (angular module `chart.js`, declared in `src/app/theme/theme.module.js`) | Provider `ChartJsProvider.setOptions(...)` (global, `'Line'`, `'radar'`, `'bar'`); directive classes on `<canvas>`: `chart-pie`, `chart-doughnut`, `chart-polar-area`, `chart-radar`, `chart-bar`, `chart-line` (with base class `chart`); attributes `chart-data`, `chart-labels`, `chart-options`, `chart-series`, `chart-click`, `chart-update` | `chartJs/chartJs.module.js`, `chartJs/chartJs.html`, `chartJs/chartJs1DCtrl.js`, `chartJs/chartJs2DCtrl.js`, `chartJs/chartJsWaveCtrl.js` |
| `chartist` `0.9.5` (global `Chartist`) + `angular-chartist.js` `~3.3.12` (angular module `angular-chartist`, declared in `theme.module.js`) | Only the raw global is used in this area: `new Chartist.Line(selector, data, options, responsive)`, `new Chartist.Bar(...)`, `new Chartist.Pie(...)`, `Chartist.noop`; DOM hooks are `div.ct-chart` with ids `line-chart`, `area-chart`, `bi-chart`, `simple-bar`, `multi-bar`, `stacked-bar`, `simple-pie`, `label-pie`, `donut`. The `angular-chartist` directive (`chartist`) is NOT used in this area's templates. Chartist CSS classes (`.ct-area`, `.ct-label`, `.ct-series-a..e`, `.ct-bar`, `.ct-line`, `.ct-point`, `.ct-slice-donut`, `.ct-slice-pie`) are restyled in `_chartsPage.scss` | `chartist/chartistCtrl.js`, `chartist/chartist.html`, `src/sass/app/_chartsPage.scss` |
| `angular-morris-chart` `~1.1.0` (angular module `angular.morris-chart`, declared in `theme.module.js`; transitively pulls Morris.js + Raphael; global `Morris`) | Directives: `line-chart` (attrs `line-data`, `line-xkey`, `line-ykeys`, `line-labels`, `line-colors`), `donut-chart` (`donut-data`, `donut-colors`, `donut-formatter`), `bar-chart` (`bar-data`, `bar-x`, `bar-y`, `bar-labels`, `bar-colors`), `area-chart` (`area-data`, `area-xkey`, `area-ykeys`, `area-labels`, plus a `line-colors` attr that is likely a typo for `area-colors`). Global prototype mutation `Morris.Donut.prototype.defaults.*`, `Morris.Grid.prototype.gridDefaults.*` | `morris/morris.html`, `morris/morris.module.js`, `morris/morrisCtrl.js` |
| `angular-ui-router` (angular module `ui.router`, declared in `src/app/app.js`) | `$stateProvider.state(...)`, `<div ui-view autoscroll="true" autoscroll-body-top>` | all five `*.module.js` files |
| `ionicons` (icon font) | sidebar icon class `ion-stats-bars` in `sidebarMeta.icon` | `charts.module.js` |
| `bootstrap` (Bootstrap 3 grid CSS) | `.row`, `.col-md-*`, `.col-lg-*` layout classes | `amCharts/charts.html`, `chartJs/chartJs.html`, `chartist/chartist.html`, `morris/morris.html` |

Not used in this area (checked): smart-table, ui.bootstrap/`$uibModal`, toastr, xeditable, textAngular, ngJsTree, ui-select, ui-sortable, slimscroll, progress-button, leaflet, fullcalendar, ionRangeSlider, bootstrap-select/switch/tagsinput, jquery.easy-pie-chart, moment, highlight.js, font-awesome, `$templateCache` (direct), `ammap`.

## 5. External non-Angular assets

| Asset | Where used |
|---|---|
| Global `AmCharts` object (amcharts 3.x + serial/funnel/pie/gantt/amstock builds + responsive & export plugins, loaded via wiredep from bower) | `amCharts/amCharts.module.js` (`AmCharts.themes.blur`), all 7 `amCharts/**/*Ctrl.js` (`AmCharts.makeChart`) |
| amCharts image assets `assets/img/theme/vendor/amcharts/dist/amcharts/images/` (via `layoutPaths.images.amChart`, defined in `src/app/theme/theme.constants.js`); `zoomOutButtonImage: "lens.png"` in theme | `AreaChartCtrl.js`, `BarChartCtrl.js`, `combinedChartCtrl.js`, `LineChartCtrl.js`, `PieChartCtrl.js` (`pathToImages`), `amCharts.module.js` (`lens.png`); `FunnelChartCtrl.js` passes the wrong object |
| amCharts DOM/CSS hooks: `.admin-chart` (sized 100% x 500px in SCSS), element ids `#areaChart`, `#barChart`, `#lineChart`, `#pieChart`, `#funnelChart`, `#zoomAxisChart`, `#gnattChart`; generated classes `.amcharts-export-menu-top-right`, `.amcharts-pie-slice`, `.amcharts-graph-g1/.g2 .amcharts-graph-fill`, `.amcharts-cursor-fill`, `.amChartsButton`, `.amChartsButtonSelected`, `.amChartsCompareList`; SVG filter refs `filter: url(#shadow)`, `url(#blur)` | `amCharts/**/*.html`, `PieChartCtrl.js` (`addClassNames: true`, `defs.filter id 'shadow'`), `src/sass/app/_chartsPage.scss` |
| Global `Chartist` object (chartist 0.9.5) and `.ct-chart` / `.ct-*` CSS classes | `chartist/chartistCtrl.js`, `chartist/chartist.html`, `_chartsPage.scss` |
| Global `Morris` object (Morris.js via angular-morris-chart; depends on Raphael) | `morris/morris.module.js` |
| Raw DOM access `$element[0].getAttribute('id')` and `wedge.parentNode.appendChild(wedge)` | all 7 amCharts controllers; `PieChartCtrl.js` |
| `angular.element($window).bind('resize', ...)` (jqLite/jQuery event binding on `window`) | `morris/morrisCtrl.js` |
| `<canvas>` elements with ids `pie`, `doughnut`, `polar-area`, `waveLine`, `waveBars`, `radar`, `line`, `bar` and Bootstrap 3 grid | `chartJs/chartJs.html` |
| Bootstrap 3 grid classes `.row`, `.col-md-4/6/8/12`, `.col-lg-4`; theme panel classes `with-scroll`, `col-eq-height` | all four page templates |
| Ionicons `ion-stats-bars` | `charts.module.js` |
| SCSS partial `src/sass/app/_chartsPage.scss` (uses theme variables `$default-text`, `$primary`, `$success`, `$danger`, `$warning`, `$info`, `$font-normal`; defines `.admin-chart`, `#pieChart`, `#filterChart`, `.chart-panel`, `.pie-chart-panel`, `.chartist h5`, `.stacked-bar .ct-bar`, `.chartjs-canvas-holder-first/second/third-row`, `.row.morris-up`, `.area-morris-header`, amcharts/chartist overrides) | imported by `src/sass/main.scss`; classes used in `chartJs.html`, `chartist.html`, `amCharts/**/*.html`. `#filterChart`, `.chart-panel`, `.pie-chart-panel`, `.row.morris-up`, `.area-morris-header` have no matching markup in this area (dead/legacy selectors) |
| Google Maps script, Leaflet, external CDN URLs, inline `<script>` | none in this area |

## 6. Cross-area dependencies

| Dependency | Defined in (outside area) | Used in |
|---|---|---|
| `baConfigProvider` (config-phase) / `baConfig` (run-phase) - `.colors` palette (`primary`, `danger`, `warning`, `success`, `info`, `default`, `defaultText`, `border`, `borderDark`, `primaryDark`, `primaryLight`, `warningLight`, `warningDark`, `successDark`, `successLight`) | `src/app/theme/theme.configProvider.js` (BlurAdmin.theme) | `amCharts/amCharts.module.js` (provider), `chartJs/chartJs.module.js` (provider), `morris/morris.module.js` (provider); `AreaChartCtrl.js`, `BarChartCtrl.js`, `combinedChartCtrl.js`, `FunnelChartCtrl.js`, `LineChartCtrl.js`, `PieChartCtrl.js`, `chartJs1DCtrl.js`, `chartistCtrl.js`, `morrisCtrl.js` (service) |
| `layoutPaths` constant (`.images.amChart`) | `src/app/theme/theme.constants.js` | `AreaChartCtrl.js`, `BarChartCtrl.js`, `combinedChartCtrl.js`, `FunnelChartCtrl.js`, `LineChartCtrl.js`, `PieChartCtrl.js` |
| `stopableInterval` service (`.start($interval, fn, delay)`) | `src/app/theme/services/stopableInterval.js` | `chartJs/chartJsWaveCtrl.js` |
| `baPanel` directive (`ba-panel`, `ba-panel-title`, `ba-panel-class`) | `src/app/theme/components/baPanel/` | `amCharts/charts.html` (6x), `chartJs/chartJs.html` (8x), `chartist/chartist.html` (3x), `morris/morris.html` (4x) |
| `autoscroll-body-top` attribute on the `ui-view` (read by a `$stateChangeSuccess`-era handler via `baUtil.hasAttr`) | `src/app/theme/theme.config.js` line 28 | `charts.module.js` inline template |
| Sidebar rendering of `title` / `sidebarMeta` (`baSidebarService`) | `src/app/theme/components/baSidebar/` | consumed indirectly from every state definition in this area |
| Angular wrapper modules `chart.js` (`ChartJsProvider`, `chart-*` directives), `angular-chartist`, `angular.morris-chart` (`line-chart`, `donut-chart`, `bar-chart`, `area-chart`) | declared as deps of `BlurAdmin.theme` in `src/app/theme/theme.module.js` - this area's modules declare `[]` and rely on them being loaded app-wide | `chartJs/*`, `morris/*` |
| Theme SCSS variables `$default-text`, `$primary`, `$success`, `$danger`, `$warning`, `$info`, `$font-normal` | `src/sass/theme/conf/_variables.scss` / `colorScheme/` | `src/sass/app/_chartsPage.scss` |

Filters (`profilePicture`, `appImage`, `kameleonImg`), `baProgressModal`, `baUtil`, `colorHelper`, `$rootScope`: not used in this area.

## 7. Migration risk notes

- **Global window objects**: `AmCharts` (8 files), `Chartist` (1), `Morris` (1) are accessed as bare globals loaded by wiredep/bower; nothing is imported. amCharts v3 is EOL (v4/v5 have a completely different API); Morris.js is unmaintained and depends on Raphael; Chartist 0.9.5 is far behind the current Chartist (v1, ESM).
- **Config-phase global mutation**: `amChartConfig` writes `AmCharts.themes.blur` and the Morris config mutates `Morris.Donut.prototype.defaults` / `Morris.Grid.prototype.gridDefaults` inside `.config()` blocks using `baConfigProvider`. These have no Angular equivalent (no config phase) and must move to an `APP_INITIALIZER`/module-load side effect or be replaced by per-chart options.
- **`ChartJsProvider.setOptions` in config phase** (`chartJs.module.js`): angular-chart.js has no Angular (2+) counterpart; ng2-charts / direct Chart.js `Chart.defaults` would be needed. Chart.js version pinned at `~2.4.0` (Chart.js is now v4 with breaking option schema).
- **Direct DOM / element-id coupling**: all amCharts controllers read `$element[0].getAttribute('id')` and render into that element; `chartistCtrl` uses CSS-id selectors (`'#line-chart'` etc.) inside a `$timeout` to wait for the DOM. In Angular this becomes `@ViewChild`/`ElementRef` + `ngAfterViewInit`. Duplicate element ids would break if the page is instantiated twice.
- **Raw DOM manipulation**: `PieChartCtrl.handleRollOver` re-appends SVG nodes (`wedge.parentNode.appendChild(wedge)`) to control z-order.
- **`ng-controller` in templates instead of state controllers**: `chartJs.html` instantiates `chartJs1DCtrl` 3x, `chartJs2DCtrl` 3x, `chartJsWaveCtrl` 2x; amCharts partials use `ng-include` + `ng-controller`. Each needs to become its own component. `ng-include` of six partial files must be replaced by child components.
- **Timers**: `chartJsWaveCtrl` runs a 400 ms `$interval` via `stopableInterval` (theme service) - lifecycle/teardown must be preserved (`ngOnDestroy`). `chartistCtrl` relies on `$timeout` for DOM readiness.
- **Event listener leaks**: `morrisCtrl` binds a `resize` handler on `$window` (body commented out) that is never unbound; amCharts `addListener` handlers are never removed and charts are never `clear()`ed on scope destroy.
- **Latent bugs to carry or fix**: `FunnelChartCtrl` passes `pathToImages: layoutPaths` (object, not path); `morris.html` uses `line-colors` on the `area-chart` directive and contains a stray `%` character in the markup; gantt element id is misspelled `gnattChart`; `ganttChartCtrl` is dead code (include commented out) and uses hard-coded colours/theme `light`.
- **`$scope`-heavy data binding**: all Chart.js and Morris controllers expose data via `$scope.*` consumed by attribute directives (`chart-data`, `line-data`, ...); no `controllerAs`, so a straight ngUpgrade downgrade/upgrade of these controllers is awkward - rewrite as components.
- **Config functions without `@ngInject`**: `amChartConfig`, `chartJsConfig`, and the anonymous Morris config rely on ng-annotate's implicit `.config(fn)` handling; minification safety depends on the gulp pipeline.
- **CSS coupling**: `_chartsPage.scss` restyles library-generated classes (`.amcharts-*`, `.ct-*`) and references SVG filters by id (`url(#shadow)`, `url(#blur)`) that exist only when the amCharts pie chart defines them; contains dead selectors (`#filterChart`, `.chart-panel`, `.pie-chart-panel`, `.row.morris-up`, `.area-morris-header`).
- **Bower/wiredep script ordering**: the theme overrides `bower.json` `main` for `amcharts` to load specific plugin builds; module loading order (amcharts.js before serial/pie/funnel/gantt, responsive plugin) must be reproduced in any bundler setup.
- No `$rootScope` events, no `$templateCache` direct usage, no inline `<script>`, no CDN-loaded scripts, no `$scope.$watch` in this area.

## 8. File list

| File | Description |
|---|---|
| `src/app/pages/charts/charts.module.js` | Declares `BlurAdmin.pages.charts` aggregating the four sub-modules; registers abstract `charts` state (`/charts`, sidebar icon `ion-stats-bars`, order 150) with inline `ui-view` template |
| `src/app/pages/charts/amCharts/amCharts.module.js` | Declares `BlurAdmin.pages.charts.amCharts`; `charts.amCharts` state (`/amCharts`, order 0); `amChartConfig` registers the global `AmCharts.themes.blur` theme from `baConfigProvider.colors` |
| `src/app/pages/charts/amCharts/charts.html` | amCharts page layout: Bootstrap rows of `ba-panel`s that `ng-include` the six chart partials (gantt include commented out) |
| `src/app/pages/charts/amCharts/areaChart/AreaChartCtrl.js` | `AreaChartCtrl`: serial area chart with date axis, export plugin, zooms to a date range on `dataUpdated` |
| `src/app/pages/charts/amCharts/areaChart/areaChart.html` | `<div id="areaChart" class="admin-chart" ng-controller="AreaChartCtrl">` host element |
| `src/app/pages/charts/amCharts/barChart/BarChartCtrl.js` | `BarChartCtrl`: serial column chart of visits by country with per-item colours |
| `src/app/pages/charts/amCharts/barChart/barChart.html` | `<div id="barChart" ... ng-controller="BarChartCtrl">` host element |
| `src/app/pages/charts/amCharts/combinedChart/combinedChartCtrl.js` | `combinedChartCtrl`: serial chart combining columns and smoothed lines on two value axes, with scrollbar, cursor and legend (theme `none`) |
| `src/app/pages/charts/amCharts/combinedChart/combinedChart.html` | `<div id="zoomAxisChart" ... ng-controller="combinedChartCtrl">` host element |
| `src/app/pages/charts/amCharts/funnelChart/FunnelChartCtrl.js` | `FunnelChartCtrl`: funnel chart of a sales pipeline; passes `pathToImages: layoutPaths` (bug) |
| `src/app/pages/charts/amCharts/funnelChart/funnelChart.html` | `<div id="funnelChart" ... ng-controller="FunnelChartCtrl">` host element |
| `src/app/pages/charts/amCharts/ganttChart/ganttChartCtrl.js` | `ganttChartCtrl`: gantt chart with hard-coded task segments and colours (theme `light`); currently not rendered anywhere |
| `src/app/pages/charts/amCharts/ganttChart/ganttChart.html` | `<div id="gnattChart" ... ng-controller="ganttChartCtrl">` host element (include is commented out in `charts.html`) |
| `src/app/pages/charts/amCharts/lineChart/LineChartCtrl.js` | `LineChartCtrl`: smoothed line chart with negative-line colour, scrollbar, cursor; zooms to index range on `rendered` |
| `src/app/pages/charts/amCharts/lineChart/lineChart.html` | `<div id="lineChart" ... ng-controller="LineChartCtrl">` host element |
| `src/app/pages/charts/amCharts/pieChart/PieChartCtrl.js` | `PieChartCtrl`: donut-style pie chart with SVG shadow filter, responsive rules, legend/slice roll-over DOM re-ordering |
| `src/app/pages/charts/amCharts/pieChart/pieChart.html` | `<div id="pieChart" ... ng-controller="PieChartCtrl">` host element |
| `src/app/pages/charts/chartJs/chartJs.module.js` | Declares `BlurAdmin.pages.charts.chartJs`; `charts.chartJs` state (`/chartJs`, order 200); `chartJsConfig` sets global/Line/radar/bar defaults via `ChartJsProvider.setOptions` |
| `src/app/pages/charts/chartJs/chartJs.html` | Chart.js page: 8 `ba-panel`s each with an `ng-controller` and an angular-chart.js `<canvas class="chart chart-*">` (pie, doughnut, polar-area, animated radar, animated bars, radar, line, bars) |
| `src/app/pages/charts/chartJs/chartJs1DCtrl.js` | `chartJs1DCtrl`: single-series labels/data/options + `changeData` shuffle for pie/doughnut/polar charts |
| `src/app/pages/charts/chartJs/chartJs2DCtrl.js` | `chartJs2DCtrl`: two-series data + `series` labels + `changeData` shuffle for radar/line/bar charts |
| `src/app/pages/charts/chartJs/chartJsWaveCtrl.js` | `chartJsWaveCtrl`: sine-wave data rotated every 400 ms via `stopableInterval`/`$interval` for the animated radar/bar charts |
| `src/app/pages/charts/chartist/chartist.module.js` | Declares `BlurAdmin.pages.charts.chartist`; `charts.chartist` state (`/chartist`, order 100) |
| `src/app/pages/charts/chartist/chartist.html` | Chartist page: `<section ng-controller="chartistCtrl" class="chartist">` with 9 `div.ct-chart` placeholders (3 line, 3 bar, 3 pie/donut) inside `ba-panel`s |
| `src/app/pages/charts/chartist/chartistCtrl.js` | `chartistCtrl`: builds data/options/responsive configs on `$scope` and instantiates 9 charts with `new Chartist.Line/Bar/Pie(...)` inside `$timeout` |
| `src/app/pages/charts/morris/morris.module.js` | Declares `BlurAdmin.pages.charts.morris`; `charts.morris` state (`/morris`, order 300); config block mutates `Morris.Donut`/`Morris.Grid` prototype defaults from `baConfigProvider.colors` |
| `src/app/pages/charts/morris/morris.html` | Morris page: `<section ng-controller="morrisCtrl">` with angular-morris-chart directives `line-chart`, `donut-chart`, `bar-chart`, `area-chart` inside `ba-panel`s (contains stray `%` and `line-colors` on area chart) |
| `src/app/pages/charts/morris/morrisCtrl.js` | `morrisCtrl`: exposes `colors`, `lineData`, `areaData`, `barData`, `donutData` on `$scope`; binds a no-op `resize` handler on `$window` |
| `src/sass/app/_chartsPage.scss` | Area-specific styles: `.admin-chart` sizing, amCharts export-menu/pie-slice/button/filter overrides, Chartist `.ct-*` colour mapping to theme variables, `.chartjs-canvas-holder-*` heights, misc legacy selectors; imported by `src/sass/main.scss` |
