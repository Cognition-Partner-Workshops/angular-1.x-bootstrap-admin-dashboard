# Inventory: pages/dashboard

Source paths: `src/app/pages/dashboard/` and `src/app/pages/pages.module.js`. Area-specific SCSS: `src/sass/theme/dashboard/*` and `src/sass/app/_dashboard.scss`.

## 1. Modules

| module name | dependency list (verbatim array) | file |
|---|---|---|
| `BlurAdmin.pages` | `['ui.router', 'BlurAdmin.pages.dashboard', 'BlurAdmin.pages.ui', 'BlurAdmin.pages.components', 'BlurAdmin.pages.form', 'BlurAdmin.pages.tables', 'BlurAdmin.pages.charts', 'BlurAdmin.pages.maps', 'BlurAdmin.pages.profile']` | src/app/pages/pages.module.js |
| `BlurAdmin.pages.dashboard` | `[]` | src/app/pages/dashboard/dashboard.module.js |

## 2. Registrations

| type | name | file | notes |
|---|---|---|---|
| config | `routeConfig` (pages) | src/app/pages/pages.module.js | Injects `$urlRouterProvider`, `baSidebarServiceProvider`; sets `otherwise('/dashboard')` and two static sidebar items (see §3) |
| config | `routeConfig` (dashboard) | src/app/pages/dashboard/dashboard.module.js | Injects `$stateProvider`; registers state `dashboard` |
| controller | `BlurFeedCtrl` | src/app/pages/dashboard/blurFeed/BlurFeedCtrl.js | Injects `$scope`. Used by directive `blurFeed` (template blurFeed.html). Hard-coded `$scope.feed` array (11 items), `$scope.expandMessage` |
| directive | `blurFeed` (`<blur-feed>`) | src/app/pages/dashboard/blurFeed/blurFeed.directive.js | restrict `E`; no isolate scope (inherits parent $scope); controller `BlurFeedCtrl`; templateUrl `app/pages/dashboard/blurFeed/blurFeed.html` |
| service | `dashboardCalendar` | src/app/pages/dashboard/calendar/dashboardCalendar.js | Empty service body, no deps. Never injected anywhere (dead code). Note: same name as directive `dashboardCalendar` (different registries, no conflict) |
| controller | `DashboardCalendarCtrl` | src/app/pages/dashboard/dashboardCalendar/DashboardCalendarCtrl.js | Injects `baConfig`. Used by directive `dashboardCalendar`. Calls `$('#calendar').fullCalendar({...})` with hard-coded events, `prompt()` on select |
| directive | `dashboardCalendar` (`<dashboard-calendar>`) | src/app/pages/dashboard/dashboardCalendar/dashboardCalendar.directive.js | restrict `E`; no scope; controller `DashboardCalendarCtrl`; templateUrl `app/pages/dashboard/dashboardCalendar/dashboardCalendar.html` |
| controller | `DashboardLineChartCtrl` | src/app/pages/dashboard/dashboardLineChart/DashboardLineChartCtrl.js | Injects `baConfig`, `layoutPaths`, `baUtil`. Used by directive `dashboardLineChart`. `AmCharts.makeChart('amchart', {type:'serial', theme:'blur', ...})`, `chart.addListener('rendered', zoomChart)`, `chart.zoomToDates` |
| directive | `dashboardLineChart` (`<dashboard-line-chart>`) | src/app/pages/dashboard/dashboardLineChart/dashboardLineChart.directive.js | restrict `E`; no scope; controller `DashboardLineChartCtrl`; templateUrl `app/pages/dashboard/dashboardLineChart/dashboardLineChart.html` |
| controller | `DashboardMapCtrl` | src/app/pages/dashboard/dashboardMap/DashboardMapCtrl.js | Injects `baConfig`, `layoutPaths`. Used by directive `dashboardMap`. `AmCharts.makeChart('amChartMap', {type:'map', theme:'blur', dataProvider:{map:'worldLow', areas:[28 countries]}, legend, export})` |
| directive | `dashboardMap` (`<dashboard-map>`) | src/app/pages/dashboard/dashboardMap/dashboardMap.directive.js | restrict `E`; no scope; controller `DashboardMapCtrl`; templateUrl `app/pages/dashboard/dashboardMap/dashboardMap.html` |
| controller | `DashboardPieChartCtrl` | src/app/pages/dashboard/dashboardPieChart/DashboardPieChartCtrl.js | Injects `$scope`, `$timeout`, `baConfig`, `baUtil`. Used by directive `dashboardPieChart`. `$scope.charts` (4 KPI tiles); `$timeout(…,1000)` then `$('.chart').easyPieChart({...})`, `$('.refresh-data').on('click', …)`, `$(chart).data('easyPieChart').update(...)` |
| directive | `dashboardPieChart` (`<dashboard-pie-chart>`) | src/app/pages/dashboard/dashboardPieChart/dashboardPieChart.directive.js | restrict `E`; no scope; controller `DashboardPieChartCtrl`; templateUrl `app/pages/dashboard/dashboardPieChart/dashboardPieChart.html` |
| controller | `DashboardTodoCtrl` | src/app/pages/dashboard/dashboardTodo/DashboardTodoCtrl.js | Injects `$scope`, `baConfig`. Used by directive `dashboardTodo`. `$scope.transparent`, `$scope.todoList` (10 items, random color from `baConfig.colors.dashboard`), `$scope.newTodoText`, `$scope.addToDoItem(event, clickPlus)` (checks `event.which === 13`) |
| directive | `dashboardTodo` (`<dashboard-todo>` / `dashboard-todo` attr) | src/app/pages/dashboard/dashboardTodo/dashboardTodo.directive.js | restrict `EA`; no scope; controller `DashboardTodoCtrl`; templateUrl `app/pages/dashboard/dashboardTodo/dashboardTodo.html` |
| service | `dashboardPieChart` | src/app/pages/dashboard/pieCharts/dashboardPieChart.js | Empty service body, no deps. Never injected anywhere (dead code). Same name as directive `dashboardPieChart` |
| directive | `popularApp` (`<popular-app>`) | src/app/pages/dashboard/popularApp/popularApp.directive.js | restrict `E`; no scope; no controller; templateUrl `app/pages/dashboard/popularApp/popularApp.html` (static markup) |
| controller | `TrafficChartCtrl` | src/app/pages/dashboard/trafficChart/TrafficChartCtrl.js | Injects `$scope`, `baConfig`, `colorHelper`. Used by directive `trafficChart`. `$scope.transparent`, `$scope.doughnutData`; `document.getElementById('chart-area').getContext('2d')`; `window.myDoughnut = new Chart(ctx, {type:'doughnut', ...})` |
| directive | `trafficChart` (`<traffic-chart>`) | src/app/pages/dashboard/trafficChart/trafficChart.directive.js | restrict `E`; no scope; controller `TrafficChartCtrl`; templateUrl `app/pages/dashboard/trafficChart/trafficChart.html` |
| controller | `WeatherCtrl` | src/app/pages/dashboard/weather/WeatherCtrl.js | Injects `$scope`, `$http`, `$timeout` (unused), `$element`. Used by directive `weather`. `$http.jsonp('http://www.geoplugin.net/json.gp?jsoncallback=JSON_CALLBACK')` → `$http GET http://api.openweathermap.org/data/2.5/forecast` (hard-coded appid); `AmCharts.makeChart('tempChart', {...}).write('tempChart')`; reads `$element.attr('forecast')` |
| directive | `weather` (`<weather>` / `weather` attr) | src/app/pages/dashboard/weather/weather.directive.js | restrict `EA`; no scope; controller `WeatherCtrl`; templateUrl `app/pages/dashboard/weather/weather.html`. NOT rendered: dashboard.html only references it in a commented-out block, and as `<blur-weather>` (a tag that matches no directive) |

No `component`, `factory`, `provider`, `filter`, `constant`, `value`, or `run` registrations exist in this area.

## 3. ui.router states / routes

| state name | url | templateUrl / template | controller (+ controllerAs) | title / sidebarMeta (icon, order) | file |
|---|---|---|---|---|---|
| `dashboard` | `/dashboard` | templateUrl `app/pages/dashboard/dashboard.html` | none (page composed of element directives, each with its own controller) | title `Dashboard`; sidebarMeta `{ icon: 'ion-android-home', order: 0 }` | src/app/pages/dashboard/dashboard.module.js |

Other routing config:

- `$urlRouterProvider.otherwise('/dashboard')` — src/app/pages/pages.module.js (line 25).
- Abstract states: none in this area.
- `baSidebarServiceProvider.addStaticItem` calls (src/app/pages/pages.module.js):
  1. `{ title: 'Pages', icon: 'ion-document', subMenu: [ {title:'Sign In', fixedHref:'auth.html', blank:true}, {title:'Sign Up', fixedHref:'reg.html', blank:true}, {title:'User Profile', stateRef:'profile'}, {title:'404 Page', fixedHref:'404.html', blank:true} ] }`
  2. `{ title: 'Menu Level 1', icon: 'ion-ios-more', subMenu: [ {title:'Menu Level 1.1', disabled:true}, {title:'Menu Level 1.2', subMenu:[ {title:'Menu Level 1.2.1', disabled:true} ]} ] }`

## 4. Third-party AngularJS / Bower libraries consumed

| library (bower name + angular module name) | how used | files where used |
|---|---|---|
| angular-ui-router / `ui.router` | `$stateProvider.state(...)`, `$urlRouterProvider.otherwise(...)`; declared as dependency of `BlurAdmin.pages` (note: `BlurAdmin.pages.dashboard` itself declares `[]` and relies on the parent module having loaded `ui.router`) | src/app/pages/pages.module.js, src/app/pages/dashboard/dashboard.module.js |
| angular-ui-sortable / `ui.sortable` (wraps jquery-ui sortable) | `ui-sortable` attribute with `ng-model="todoList"` on `<ul class="todo-list">` | src/app/pages/dashboard/dashboardTodo/dashboardTodo.html |
| amcharts (`AmCharts` global, serial chart) + amcharts `theme: 'blur'` (custom theme defined outside this area in src/app/pages/charts/amCharts/amCharts.module.js) | `AmCharts.makeChart('amchart', {type:'serial', theme:'blur', export:{enabled:true}, pathToImages: layoutPaths.images.amChart})`, `chart.addListener`, `chart.zoomToDates`, `chart.zoomChart` | src/app/pages/dashboard/dashboardLineChart/DashboardLineChartCtrl.js |
| amcharts (serial, `theme:'blur'`, `handDrawn:true`) | `AmCharts.makeChart('tempChart', {...}).write('tempChart')` | src/app/pages/dashboard/weather/WeatherCtrl.js |
| ammap (`AmCharts.makeChart` with `type:'map'`, `dataProvider.map:'worldLow'` → `ammap/dist/ammap/maps/js/worldLow.js`) | `AmCharts.makeChart('amChartMap', {type:'map', theme:'blur', areasSettings, legend, export, pathToImages})` | src/app/pages/dashboard/dashboardMap/DashboardMapCtrl.js |
| chart.js (~2.4, raw `Chart` global — NOT angular-chart.js) | `new Chart(ctx, {type:'doughnut', data, options:{cutoutPercentage:64, responsive:true}})` on `<canvas id="chart-area">` | src/app/pages/dashboard/trafficChart/TrafficChartCtrl.js, src/app/pages/dashboard/trafficChart/trafficChart.html |
| jquery.easy-pie-chart (jQuery plugin) | `$('.chart').easyPieChart({...})`, `$(chart).data('easyPieChart').update(n)` | src/app/pages/dashboard/dashboardPieChart/DashboardPieChartCtrl.js, src/app/pages/dashboard/dashboardPieChart/dashboardPieChart.html (`.chart[rel][data-percent] > .percent`) |
| fullcalendar (~3.0, jQuery plugin; depends on moment) | `$('#calendar').fullCalendar({header, defaultDate, selectable, selectHelper, select, editable, eventLimit, events})`, `$element.fullCalendar('renderEvent', …)`, `.fullCalendar('unselect')` | src/app/pages/dashboard/dashboardCalendar/DashboardCalendarCtrl.js, src/app/pages/dashboard/dashboardCalendar/dashboardCalendar.html |
| jquery / jquery-ui | `$()` selectors, `.each`, `.on('click')`, `.data()`, `.attr()`, `$element.attr('forecast')`; jquery-ui sortable via ui-sortable | DashboardPieChartCtrl.js, DashboardCalendarCtrl.js, WeatherCtrl.js, dashboardTodo.html |
| Ionicons (icon font) | classes `ion-android-home` (sidebar), `ion-document`, `ion-ios-more` (static sidebar items), `ion-plus-round`, `ion-ios-close-empty` (todo), `ion-thermometer`, `ion-ios-sunny-outline`, `ion-ios-partlysunny-outline`, `ion-ios-cloud-outline`, `ion-ios-cloud`, `ion-ios-rainy`, `ion-ios-rainy-outline`, `ion-ios-thunderstorm-outline`, `ion-ios-thunderstorm`, `ion-ios-snowy`, `ion-ios-cloudy-outline`, `ion-ios-cloudy-night-outline`, `ion-ios-cloudy-night` (weather) | dashboard.module.js, pages.module.js, dashboardTodo.html, weather.html, WeatherCtrl.js |
| bootstrap (~3.3, CSS) | grid `row`, `col-*`, `col-xlg-*` (custom extension), `progress`/`progress-sm`/`progress-bar`, `form-control`, `text-right/center/left` | dashboard.html, trafficChart.html, popularApp.html, dashboardTodo.html |

Not used in this area (checked via grep): smart-table, angular-bootstrap (`uib-*`/`$uibModal`), toastr, xeditable, textAngular, ng-js-tree, ui-select, slimscroll directive, progress-button, Chartist, Morris, angular-chart.js, leaflet, ionRangeSlider, bootstrap-select, bootstrap-switch, bootstrap-tagsinput, moment (direct), highlight.js, font-awesome (`fa-*`), google maps.

## 5. External non-Angular assets

| asset | where used |
|---|---|
| jQuery `$` global (selectors, `.each`, `.on`, `.data`, `.attr`) | src/app/pages/dashboard/dashboardPieChart/DashboardPieChartCtrl.js; src/app/pages/dashboard/dashboardCalendar/DashboardCalendarCtrl.js; src/app/pages/dashboard/weather/WeatherCtrl.js (`$element.attr`) |
| Raw DOM: `document.getElementById('chart-area').getContext('2d')`, `window.myDoughnut` global | src/app/pages/dashboard/trafficChart/TrafficChartCtrl.js |
| `window.prompt('Event Title:')` | src/app/pages/dashboard/dashboardCalendar/DashboardCalendarCtrl.js |
| jQuery plugins: jquery.easy-pie-chart, fullcalendar, jquery-ui sortable (via ui-sortable) | DashboardPieChartCtrl.js, DashboardCalendarCtrl.js, dashboardTodo.html |
| `AmCharts` global (amcharts serial + ammap + `worldLow` map data + amcharts export plugin via `export:{enabled:true}`; images at `layoutPaths.images.amChart`, copied by gulp/images.js from `ammap/dist/ammap/images`) | DashboardLineChartCtrl.js, DashboardMapCtrl.js, WeatherCtrl.js |
| `Chart` global (chart.js 2.x) | TrafficChartCtrl.js |
| Bootstrap 3 CSS classes (`row`, `col-lg-6`, `col-md-12`, `col-sm-12`, `col-xs-*`, custom `col-xlg-*`, `progress progress-sm`, `progress-bar`, `form-control`) | dashboard.html, trafficChart.html, popularApp.html, dashboardTodo.html |
| Ionicons icon font (`ion-*`) | dashboard.module.js, pages.module.js, dashboardTodo.html, weather.html, WeatherCtrl.js |
| Theme-specific icon classes `chart-icon i-{{chart.icon}}` (`i-person`, `i-money`, `i-face`, `i-refresh`) — sprite/CSS defined in src/sass/theme/dashboard/_pieCharts.scss | dashboardPieChart.html, DashboardPieChartCtrl.js |
| Theme CSS classes: `custom-checkbox custom-input-success`, `cut-with-dots`, `blur-container/blur-box`, `line-clamp line-clamp-2`, `font-x1dot5/x2/x3/x1dot25`, `transparent`, `with-scroll`, `medium-panel/large-panel/xmedium-panel` (ba-panel) | dashboardTodo.html, blurFeed.html, weather.html, dashboard.html |
| SCSS partials (imported from src/sass/main.scss lines 30-39, 45): src/sass/theme/dashboard/_amChart.scss, _amChartMap.scss, _blurFeed.scss, _calendar.scss, _pieCharts.scss, _popularApp.scss, _timeline.scss, _todo.scss, _trafficChart.scss, _weather.scss; src/sass/app/_dashboard.scss (`.row.shift-up` -573px overlap at ≥1620px, `.feed-panel.large-panel` height, `.user-stats-panel`, `.blurCalendar` height 475px) | styles for every dashboard widget |
| Images under src/assets/img/app: `app/feed/vader-and-me-preview.png`, `app/feed/my-little-kitten.png`, `app/feed/new-york-location.png`, `app/feed/genom.png` (via `appImage` filter), `app/my-app-logo.png` (via `appImage`), profile pictures by author name (via `profilePicture` filter → src/assets/img/app/profile) | BlurFeedCtrl.js, blurFeed.html, popularApp.html |
| External URLs (feed links, `target="_blank"`): `https://www.youtube.com/watch?v=IfcpzBbbamk`, `http://api.ning.com/files/.../1082127884.jpeg`, `https://www.google.by/maps/place/New+York,...`, `https://dribbble.com/shots/2504810-Protein-Heroes` | BlurFeedCtrl.js |
| External HTTP APIs (plain http, JSONP): `http://www.geoplugin.net/json.gp?jsoncallback=JSON_CALLBACK`, `http://api.openweathermap.org/data/2.5/forecast` with hard-coded `appid` `2de143494c0b295cca9337e1e96b00e0` | WeatherCtrl.js (widget currently not rendered) |
| Google Maps script / CDN `<script>` tags | none in this area |

## 6. Cross-area dependencies

| dependency (defined outside area) | kind / defined in | used in |
|---|---|---|
| `baConfig` | provider/value, src/app/theme/theme.config.js (`baConfig.colors.dashboard.{white,blueStone,surfieGreen,silverTree,gossip,gossipDark}`, `baConfig.colors.{primary,primaryDark,success,successLight,danger,border,defaultText}`, `baConfig.theme.blur`) | DashboardCalendarCtrl.js, DashboardLineChartCtrl.js, DashboardMapCtrl.js, DashboardPieChartCtrl.js, DashboardTodoCtrl.js, TrafficChartCtrl.js |
| `layoutPaths` | constant, src/app/theme/theme.constants.js (`layoutPaths.images.amChart`) | DashboardLineChartCtrl.js, DashboardMapCtrl.js |
| `colorHelper` | constant, src/app/theme/theme.constants.js (`colorHelper.shade(color, 15)`) | TrafficChartCtrl.js |
| `baUtil` | service, src/app/theme/services/baUtil.js (`baUtil.hexToRGB(hex, alpha)`) | DashboardLineChartCtrl.js, DashboardPieChartCtrl.js |
| `baPanel` directive (`ba-panel`, `ba-panel-title`, `ba-panel-class`) | src/app/theme/components/baPanel | dashboard.html (7 panels), dashboardPieChart.html (`<div ba-panel>` per KPI tile) |
| `trackWidth` directive (`track-width="smallContainerWidth" min-width="360"`) | src/app/theme/directives/trackWidth.js (uses `$(element).width()` + `$window` resize) | blurFeed.html |
| `profilePicture` filter | src/app/theme/filters/image/profilePicture.js (depends on `layoutPaths`) | blurFeed.html |
| `appImage` filter | src/app/theme/filters/image/appImage.js (depends on `layoutPaths`) | blurFeed.html, popularApp.html |
| `baSidebarServiceProvider` (`addStaticItem`) and sidebar consumption of state `title`/`sidebarMeta` | src/app/theme/components/baSidebar | pages.module.js, dashboard.module.js |
| AmCharts `theme: 'blur'` (`AmCharts.themes.blur`) | registered in src/app/pages/charts/amCharts/amCharts.module.js (a sibling page area, not theme/) — dashboard charts silently fall back to default theme if that module doesn't load first | DashboardLineChartCtrl.js, DashboardMapCtrl.js, WeatherCtrl.js |
| Sibling page modules listed as deps of `BlurAdmin.pages` | `BlurAdmin.pages.ui`, `.components`, `.form`, `.tables`, `.charts`, `.maps`, `.profile`; sidebar `stateRef: 'profile'` targets the profile area's state | pages.module.js |
| Preloader / `$templateCache` | gulp `templateCache` task bundles all `templateUrl` HTML in this area into JS; the theme preloader waits for AmCharts/images (see knowledge index) | all directive templateUrls |

## 7. Migration risk notes

- **Every widget is DOM-imperative, not data-bound.** Line chart, map, weather (AmCharts), traffic doughnut (chart.js), KPI tiles (easyPieChart), calendar (fullCalendar) all render into hard-coded element IDs (`#amchart`, `#amChartMap`, `#tempChart`, `#chart-area`, `#calendar`) from the controller constructor. Duplicate IDs would collide; nothing is destroyed on scope `$destroy` (memory leaks / stale globals on re-navigation). In Angular these must become `@ViewChild` + `ngAfterViewInit` + `ngOnDestroy` cleanup.
- **Controllers run before templates are linked** in some cases: `TrafficChartCtrl` calls `document.getElementById('chart-area')` synchronously in the constructor and `DashboardCalendarCtrl` calls `$('#calendar')` synchronously; these only work because templates are pre-bundled into `$templateCache` (gulp templateCache task) so link is synchronous. Removing `$templateCache` bundling breaks them.
- **Global window objects:** `AmCharts` (amcharts + ammap + `worldLow` + export plugin + custom `AmCharts.themes.blur` defined in the *charts* page area), `Chart`, `$`/jQuery, `window.myDoughnut` (written by TrafficChartCtrl). Need typings/shims or replacement (amCharts 4/5, ng2-charts, FullCalendar Angular).
- **jQuery plugins with no Angular equivalent in repo:** jquery.easy-pie-chart, fullcalendar 3, jquery-ui sortable (through angular-ui-sortable). `$('.refresh-data').on('click')` binds to an element that does not exist in dashboard templates (dead listener). `.chart`/`.pie-charts .chart` selectors are document-global, not scoped to the directive element.
- **Timers:** `$timeout(…, 1000)` in DashboardPieChartCtrl to defer easyPieChart init; never cancelled.
- **Native dialogs:** `prompt('Event Title:')` in DashboardCalendarCtrl.
- **Non-isolate directive scopes:** none of the 9 directives declare `scope`/`bindToController`; controllers write to inherited `$scope` (e.g. `transparent`, `feed`, `todoList`, `charts`, `doughnutData`). `blurFeed.html` uses `track-width="smallContainerWidth"` which writes into the same shared scope. Porting requires making inputs/outputs explicit.
- **Directive/service name collisions:** `dashboardCalendar` and `dashboardPieChart` exist as both a directive and an (empty, unused) service — safe to delete the services.
- **Dead / inconsistent code:** `weather` directive is registered but only referenced from a commented-out block as `<blur-weather>` (wrong tag). It uses plain-`http` JSONP to geoplugin and a hard-coded OpenWeatherMap API key, `console.log`, and `$http.jsonp` with `JSON_CALLBACK` (AngularJS ≥1.6 disallows this pattern). `$timeout` injected but unused. Decide to drop or rewrite with `HttpClient` + HTTPS keys before porting.
- **Template quirks:** `trafficChart.html` uses `style="width: {{item.percentage}}%"` where `item` is undefined (bar width always 0/empty), and interpolates `style="background-color: {{…}}"` (Angular needs `[style.backgroundColor]`); `dashboardTodo.html` uses `ng-init` per-row state (`activeItem`, `isChecked` on child scope — checkbox state is per-repeat-scope, not on the item) and `ng-if="!item.deleted"` soft-delete; `weather.html` has a stray `</td>` and an extra closing `</div>`; `popularApp.html` has `&nbsp` without semicolon. One-time bindings (`::`) are used heavily.
- **Layout coupling:** `src/sass/app/_dashboard.scss` uses a negative-margin `.row.shift-up` hack (-573px at ≥1620px) and fixed panel heights that depend on `ba-panel` class names (`medium-panel`, `large-panel`, `xmedium-panel`, `feed-panel`, `with-scroll`). Bootstrap 3 grid plus custom `col-xlg-*` breakpoint.
- **Cross-module load order:** `BlurAdmin.pages.dashboard` declares `[]` deps but needs `ui.router` (from parent module) and `AmCharts.themes.blur` (from `BlurAdmin.pages.charts`); the state is also the app default route (`otherwise('/dashboard')`) so it's the first thing a hybrid bootstrap must serve.
- **Assets:** amCharts images copied by `gulp/images.js` to `layoutPaths.images.amChart`; feed/logo images resolved via `appImage`/`profilePicture` filters that depend on `layoutPaths` — asset path strategy changes under Angular CLI.
- No `$scope.$watch`, `$rootScope` events, `$interval`, inline `<script>` tags, or CDN `<script>` loads exist in this area.

## 8. File list

| file | description |
|---|---|
| src/app/pages/pages.module.js | Declares `BlurAdmin.pages` (aggregates all page modules incl. dashboard); default route `/dashboard`; two static sidebar menu groups |
| src/app/pages/dashboard/dashboard.module.js | Declares `BlurAdmin.pages.dashboard`; registers ui.router state `dashboard` (url `/dashboard`, sidebar icon `ion-android-home`, order 0) |
| src/app/pages/dashboard/dashboard.html | Dashboard page template: composes `<dashboard-pie-chart>`, `<traffic-chart>`, `<dashboard-map>`, `<dashboard-line-chart>`, `<popular-app>`, `<blur-feed>`, `<dashboard-todo>`, `<dashboard-calendar>` inside `ba-panel` grid; weather block commented out |
| src/app/pages/dashboard/blurFeed/BlurFeedCtrl.js | Controller with hard-coded 11-item activity feed and `expandMessage` toggle |
| src/app/pages/dashboard/blurFeed/blurFeed.directive.js | `<blur-feed>` element directive → BlurFeedCtrl + blurFeed.html |
| src/app/pages/dashboard/blurFeed/blurFeed.html | Feed list template; uses `track-width`, `profilePicture` and `appImage` filters, line-clamp expand/collapse |
| src/app/pages/dashboard/calendar/dashboardCalendar.js | Empty `dashboardCalendar` service (unused) |
| src/app/pages/dashboard/dashboardCalendar/DashboardCalendarCtrl.js | Controller initialising jQuery fullCalendar on `#calendar` with hard-coded events colored from `baConfig.colors.dashboard`; `prompt()`-based event creation |
| src/app/pages/dashboard/dashboardCalendar/dashboardCalendar.directive.js | `<dashboard-calendar>` element directive → DashboardCalendarCtrl + template |
| src/app/pages/dashboard/dashboardCalendar/dashboardCalendar.html | `<div id='calendar' class="blurCalendar">` mount point |
| src/app/pages/dashboard/dashboardLineChart/DashboardLineChartCtrl.js | Controller building AmCharts serial "Revenue" chart (`#amchart`) with hard-coded 2012-2015 data, zoom-to-dates, export |
| src/app/pages/dashboard/dashboardLineChart/dashboardLineChart.directive.js | `<dashboard-line-chart>` element directive → DashboardLineChartCtrl + template |
| src/app/pages/dashboard/dashboardLineChart/dashboardLineChart.html | `<div id="amchart">` mount point |
| src/app/pages/dashboard/dashboardMap/DashboardMapCtrl.js | Controller building ammap "Users by Country" world map (`#amChartMap`) with 28 hard-coded European areas + legend |
| src/app/pages/dashboard/dashboardMap/dashboardMap.directive.js | `<dashboard-map>` element directive → DashboardMapCtrl + template |
| src/app/pages/dashboard/dashboardMap/dashboardMap.html | `<div id="amChartMap">` mount point |
| src/app/pages/dashboard/dashboardPieChart/DashboardPieChartCtrl.js | Controller with 4 KPI tiles; after 1s `$timeout` initialises jquery.easy-pie-chart on `.chart` and randomises values |
| src/app/pages/dashboard/dashboardPieChart/dashboardPieChart.directive.js | `<dashboard-pie-chart>` element directive → DashboardPieChartCtrl + template |
| src/app/pages/dashboard/dashboardPieChart/dashboardPieChart.html | KPI tile row: `ng-repeat` over charts, each in `ba-panel` with `.chart[rel][data-percent]` and `chart-icon i-*` |
| src/app/pages/dashboard/dashboardTodo/DashboardTodoCtrl.js | Controller with hard-coded todo list, random colors from `baConfig.colors.dashboard`, `addToDoItem` (Enter key / plus icon) |
| src/app/pages/dashboard/dashboardTodo/dashboardTodo.directive.js | `dashboard-todo` element/attribute directive → DashboardTodoCtrl + template |
| src/app/pages/dashboard/dashboardTodo/dashboardTodo.html | Todo input + `ui-sortable` list with custom checkbox, soft delete, hover state |
| src/app/pages/dashboard/pieCharts/dashboardPieChart.js | Empty `dashboardPieChart` service (unused) |
| src/app/pages/dashboard/popularApp/popularApp.directive.js | `<popular-app>` element directive, template only (no controller) |
| src/app/pages/dashboard/popularApp/popularApp.html | Static "Most Popular App" card with logo via `appImage` filter and hard-coded stats |
| src/app/pages/dashboard/trafficChart/TrafficChartCtrl.js | Controller building chart.js doughnut "Acquisition Channels" on `#chart-area`; colors from `baConfig`/`colorHelper`; sets `window.myDoughnut` |
| src/app/pages/dashboard/trafficChart/trafficChart.directive.js | `<traffic-chart>` element directive → TrafficChartCtrl + template |
| src/app/pages/dashboard/trafficChart/trafficChart.html | Canvas + legend list with Bootstrap progress bars |
| src/app/pages/dashboard/weather/WeatherCtrl.js | Controller fetching geolocation (geoplugin JSONP) and OpenWeatherMap forecast, rendering AmCharts temp chart on `#tempChart`; unit/day switching |
| src/app/pages/dashboard/weather/weather.directive.js | `weather` element/attribute directive → WeatherCtrl + template (not used by dashboard.html) |
| src/app/pages/dashboard/weather/weather.html | Weather card template (city, icon, temp with °C/°F toggle, day selector) |
| src/sass/app/_dashboard.scss | Page-level layout tweaks: `.row.shift-up`, `.feed-panel.large-panel` height, `.user-stats-panel`, `.blurCalendar` height |
| src/sass/theme/dashboard/_amChart.scss | Styles for the AmCharts revenue line chart panel |
| src/sass/theme/dashboard/_amChartMap.scss | Styles for the ammap users-by-country panel |
| src/sass/theme/dashboard/_blurFeed.scss | Styles for the feed widget |
| src/sass/theme/dashboard/_calendar.scss | fullCalendar theme overrides |
| src/sass/theme/dashboard/_pieCharts.scss | KPI easy-pie-chart tiles and `chart-icon i-*` icon sprites |
| src/sass/theme/dashboard/_popularApp.scss | Popular app card styles |
| src/sass/theme/dashboard/_timeline.scss | Timeline styles (imported under dashboard group; no matching dashboard template uses it) |
| src/sass/theme/dashboard/_todo.scss | Todo list styles |
| src/sass/theme/dashboard/_trafficChart.scss | Traffic doughnut / channels legend styles |
| src/sass/theme/dashboard/_weather.scss | Weather card styles |
