# Legacy estate inventory (BlurAdmin, AngularJS 1.5.8)

Phase 1 inventory of `src/app/`, produced per feature area. Each area file follows the same
layout: modules, registrations, ui.router states, third-party libraries, non-Angular assets,
cross-area dependencies, migration risks, file list. Counts below are taken from the
"Registrations" table of each file (header rows excluded).

| Area | File | Root module | Registrations | States |
|---|---|---|---|---|
| Theme shell (components, directives, filters, inputs, services, config/run) + `app.js` + `index.html` | [theme.md](theme.md) | `BlurAdmin.theme` (+ `BlurAdmin.theme.components`, `BlurAdmin.theme.inputs`) | 52 | 0 (provides `ui-view`, sidebar, `$uiViewScroll` decorator) |
| pages/dashboard | [pages-dashboard.md](pages-dashboard.md) | `BlurAdmin.pages.dashboard` | 22 | 1 |
| pages/charts | [pages-charts.md](pages-charts.md) | `BlurAdmin.pages.charts` (+ amCharts, chartJs, chartist, morris) | 21 | 5 |
| pages/components | [pages-components.md](pages-components.md) | `BlurAdmin.pages.components` (+ mail, timeline, tree) | 14 | 6 |
| pages/form | [pages-form.md](pages-form.md) | `BlurAdmin.pages.form` | 13 | 4 |
| pages/tables | [pages-tables.md](pages-tables.md) | `BlurAdmin.pages.tables` | 3 | 3 |
| pages/maps | [pages-maps.md](pages-maps.md) | `BlurAdmin.pages.maps` | 6 | 5 |
| pages/profile | [pages-profile.md](pages-profile.md) | `BlurAdmin.pages.profile` | 4 | 1 |
| pages/ui | [pages-ui.md](pages-ui.md) | `BlurAdmin.pages.ui` (+ 11 sub-modules) | 19 | 12 |

## Module graph

```
BlurAdmin  (src/app/app.js)
  deps: ngAnimate, ui.bootstrap, ui.sortable, ui.router, ngTouch, toastr, smart-table,
        xeditable, ui.slimscroll, ngJsTree, angular-progress-button-styles
  ├─ BlurAdmin.theme        deps: toastr, chart.js, angular-chartist, angular.morris-chart, textAngular
  │    ├─ BlurAdmin.theme.components
  │    └─ BlurAdmin.theme.inputs
  └─ BlurAdmin.pages        deps: ui.router          ($urlRouterProvider.otherwise('/dashboard'))
       ├─ BlurAdmin.pages.dashboard
       ├─ BlurAdmin.pages.ui            (+ .alerts .buttons .grid .icons .modals .notifications
       │                                   .panels .progressBars .slider .tabs .typography)
       ├─ BlurAdmin.pages.components    (+ .mail .timeline .tree)
       ├─ BlurAdmin.pages.form
       ├─ BlurAdmin.pages.tables
       ├─ BlurAdmin.pages.charts        (+ .amCharts .chartJs .chartist .morris)
       ├─ BlurAdmin.pages.maps
       └─ BlurAdmin.pages.profile
```

## Route map (ui.router states -> future Angular routes)

| State | URL | Notes |
|---|---|---|
| `dashboard` | `/dashboard` | default route (`otherwise`) |
| `ui` (abstract) | `/ui` | children: `typography`, `buttons`, `icons`, `modals`, `grid`, `alerts`, `progressBars`, `notifications`, `tabs`, `slider`, `panels` |
| `components` (abstract) | `/components` | `components.mail` (abstract, `/mail`) -> `components.mail.label` (`/:label`), `components.mail.detail` (`/:label/:id`); `components.timeline`; `components.tree` |
| `form` (abstract) | `/form` | `form.inputs`, `form.layouts`, `form.wizard` |
| `tables` (abstract) | `/tables` | `tables.basic`, `tables.smart` |
| `charts` (abstract) | `/charts` | `charts.amCharts`, `charts.chartist`, `charts.chartJs`, `charts.morris` |
| `maps` (abstract) | `/maps` | `maps.gmap`, `maps.leaflet`, `maps.bubble`, `maps.line` |
| `profile` | `/profile` | no `sidebarMeta`; linked from a static sidebar item in `pages.module.js` |

Static (non-state) sidebar entries in `src/app/pages/pages.module.js`: "Pages" (links to
`auth.html`, `reg.html`, `404.html` standalone pages + `profile`) and a "Menu Level 1" demo tree.

## Third-party library usage by area

| Library (bower / module) | theme | dashboard | charts | components | form | tables | maps | profile | ui |
|---|---|---|---|---|---|---|---|---|---|
| angular-ui-router | x | x | x | x | x | x | x | x | x |
| angular-bootstrap (ui.bootstrap) | x (modal, dropdown) | x | | x (modal) | x (datepicker, dropdown) | | | x (modal) | x (modal, tabs, accordion, progressbar, alert) |
| angular-toastr | x (config) | | | | | | | | x (notifications) |
| angular-smart-table | | | | | | x | | | |
| angular-xeditable | | | | | | x | | | |
| textAngular | | | | x (mail compose) | | | | | |
| ng-js-tree | | | | x (tree) | | | | | |
| angular-ui-select | | | | | x | | | | |
| angular-ui-sortable / jquery-ui | | x (todo) | | | | | | | |
| angular-slimscroll / jquery-slimscroll | x (sidebar, msg-center) | | | | | | | | |
| angular-progress-button-styles | | | | | | | | | x (buttons) |
| chart.js / angular-chart.js | (dep) | x | x | | | | | | |
| amcharts / amcharts-stock / ammap | x (preloader) | x | x | | | | x (bubble, line) | | |
| chartist / angular-chartist.js | (dep) | | x | | | | | | |
| morris / angular-morris-chart | (dep) | | x | | | | | | |
| jquery.easy-pie-chart | | x | | | | | | | |
| leaflet | | | | | | | x | | |
| Google Maps JS API (script tag) | | | | | | | x (gmap) | | |
| fullcalendar + moment | | x | | | | | | | |
| ionrangeslider | x (`ionSlider` directive) | | | | | | | | x (slider) |
| bootstrap-select | | | | | x (`selectpicker` directive) | x (via form's directive) | | x | |
| bootstrap-switch | | | | | x | | | x | |
| bootstrap-tagsinput | | | | | x | | | | |
| animate.css | x (`zoomIn`) | | | | | | | | |
| font-awesome / Ionicons | x | x | x | x | x | x | x | x | x (icons page) |
| jQuery (direct `$` / `angular.element` DOM usage) | x | x | | x | x | | | | |

`angular-route` and `highlight` are declared in `bower.json` but consumed by no area.

## Cross-cutting theme infrastructure used by pages

Everything under `pages/` depends on the theme shell: `baPanel` / `baPanelBlur` (layout),
`baSidebarService` + `sidebarMeta` state metadata (navigation), `baConfig` / `baConfigProvider`
and `colorHelper` (theme colours consumed by every chart), `layoutPaths` (asset/vendor paths),
`baProgressModal`, `baUtil`, `stopableInterval`, `fileReader`, `preloader`, and the
`appImage` / `profilePicture` / `kameleonImg` / `removeHtml` filters. These must be the first
things exposed to Angular during the hybrid phase (downgraded or rewritten first).

## Recurring migration risks (see section 7 of each file)

- Charts and maps use global `window` objects (`AmCharts`, `Chartist`, `Morris`, `L`, `google.maps`)
  loaded by wiredep; several mutate library defaults in `.config()` blocks.
- Widespread direct jQuery / DOM manipulation in theme directives and page controllers.
- Controllers are mostly `$scope`-based (no `controllerAs`) and are frequently instantiated via
  `ng-controller` / `ng-include` inside templates rather than via states - a straight
  `downgradeComponent` is often not possible; rewrite as components instead.
- ui-router 0.3 `$stateChange*` `$rootScope` events and the `$uiViewScroll` decorator.
- `$templateCache` reliance (gulp `gulp-angular-templatecache`) for all `templateUrl`s.
- Intervals/timeouts without cleanup (`stopableInterval`, `$interval` in chart demos, `$timeout`
  for DOM readiness), resize listeners never unbound.
- Bootstrap 3 markup everywhere (panels, `col-xs-*`, `pull-*`), styled by `src/sass` written against BS3.
