# Dependency Baseline: legacy (Bower / Gulp) -> modern Angular

Phase 1 deliverable. Every dependency declared in `bower.json` (runtime) and `package.json`
(tooling) is mapped to its modern replacement. "Where used" columns are derived from the
per-area inventories in `migration/inventory/`.

Legend for the **Disposition** column:

- **CARRY** - installed in the new workspace (`blur-admin-modern/`) in phase 1 as a baseline dependency.
- **LATER** - has a modern replacement but is component-specific; install when the consuming feature is migrated.
- **NONE** - no direct modern equivalent; needs a rewrite or a different library (decision recorded in notes).
- **DROP** - subsumed by Angular / Angular CLI / the browser; not installed.

## 1. Runtime dependencies (`bower.json`)

### 1.1 AngularJS core and framework modules

| Legacy package (version) | Purpose / where used | Modern replacement | Disposition | Migration notes |
|---|---|---|---|---|
| `angular` ~1.5.8 (resolved ~1.5.9) | Framework; every file under `src/app/` | `@angular/core` (Angular 20) | DROP | During the hybrid phase both frameworks run side by side via `@angular/upgrade/static` (`UpgradeModule`). AngularJS 1.5 is below the 1.8 floor ngUpgrade officially supports; plan a 1.5 -> 1.8 bump of the legacy app as phase 2 prerequisite (also closes CVEs). |
| `angular-animate` ~1.5.8 (`ngAnimate`) | Root module dep; CSS transitions in theme (`zoomIn`, panels) | `@angular/animations` | DROP | Angular animations API differs; most legacy usage is class-based CSS animation via `animate.css`, which keeps working. |
| `angular-touch` ~1.5.8 (`ngTouch`) | Root module dep; `ng-click` touch handling | none needed | DROP | Modern browsers dispatch click on touch; no replacement required. |
| `angular-route` ~1.5.8 (`ngRoute`) | Declared in bower but **not loaded** by any module (app uses `ui.router`) | - | DROP | Dead dependency. |
| `angular-ui-router` ~0.3.2 (`ui.router`) | All page routing: `$stateProvider.state(...)` in every `pages/**/*.module.js`, `baSidebarService` builds the menu from state `sidebarMeta` | `@angular/router` | DROP | Angular Router is installed by `ng new --routing`. Nested `pages/ui.*` states map to child routes; `sidebarMeta` (icon/order) becomes route `data`. `$urlRouterProvider.otherwise('/dashboard')` -> `{ path: '**', redirectTo: 'dashboard' }`. |
| `angular-bootstrap` ~1.3.3 (`ui.bootstrap`) | Modals (`$uibModal` in ui/modals, profile, components/mail), tabs/accordion (`uib-tabset`, `uib-accordion` in ui/tabs), datepicker (`uib-datepicker`, form/inputs), dropdowns, progressbars, tooltips/popovers, alerts | `@ng-bootstrap/ng-bootstrap` | CARRY | ng-bootstrap targets Bootstrap 5 CSS (see `bootstrap` row). `NgbModal`, `NgbNav`, `NgbAccordion`, `NgbDatepicker`, `NgbDropdown`, `NgbProgressbar`, `NgbTooltip`, `NgbAlert`. |

### 1.2 AngularJS UI add-ons

| Legacy package (version) | Purpose / where used | Modern replacement | Disposition | Migration notes |
|---|---|---|---|---|
| `angular-smart-table` ~2.1.3 (`smart-table`) | `pages/tables/smart` - `st-table`, `st-sort`, `st-search`, `st-pagination` | Angular Material `mat-table` + `MatSort`/`MatPaginator`, or `ng-bootstrap` `NgbPagination` + `NgbSortableHeader` (ng-bootstrap "complete example" pattern), or `@swimlane/ngx-datatable` | LATER | Recommendation: `ng-bootstrap` table pattern, to avoid adding Angular Material alongside Bootstrap. Client-side sort/filter/paginate becomes a small service. |
| `angular-xeditable` ~0.5.0 (`xeditable`) | `pages/tables/widgets/editableTable.html`, `editableRowTable.html` - `editable-text`, `editable-select`, `e-form` | no direct equivalent | NONE | Rewrite as inline-edit rows with Reactive Forms (toggle edit mode per row). |
| `textAngular` ~1.4.6 (`textAngular`) | Rich-text editor in `pages/components/mail` compose box (`text-angular`) | `ngx-quill` (Quill) or `ngx-editor` (ProseMirror) | LATER | textAngular is unmaintained. Quill is the closest drop-in for a WYSIWYG toolbar. |
| `ng-js-tree` ~0.0.7 (`ngJsTree`) | `pages/components/tree` - `js-tree` directive wrapping jsTree (jQuery) | Angular Material `mat-tree` or `@ali-hm/angular-tree-component` | NONE | No maintained jsTree wrapper for Angular. Rewrite tree demo with `mat-tree` (CDK tree) or a small recursive component. |
| `angular-toastr` ~2.1.1 (`toastr`) | Notifications: `theme/components/toastrLibConfig.js`, `pages/ui/notifications`, dashboard todo/feed | `ngx-toastr` | LATER | Same author lineage and near-identical API (`toastr.success(msg, title, opts)`); config in `toastrLibConfig.js` ports to `provideToastr({...})`. |
| `angular-progress-button-styles` ~0.1.0 | `pages/ui/buttons/widgets/progressButtons.html` (`progress-button`) | no direct equivalent | NONE | Rewrite as a small `ProgressButtonComponent` (button + CSS progress fill); legacy CSS from bower can be copied. |
| `angular-ui-select` ^0.19.6 (`ui.select`) | `pages/form/inputs/widgets/select` (`ui-select` with search / multi) | `@ng-select/ng-select` | LATER | Feature-equivalent (search, multiple, tagging, groups). |
| `angular-slimscroll` ~1.1.5 (`ui.slimscroll`) + `slimScroll` (jquery-slimscroll ~1.3.6) | Sidebar / msgCenter / widgets custom scrollbars (`slimscroll` attribute) | `ngx-scrollbar` or native CSS `overflow-y: auto` + `scrollbar-*` properties | DROP | Prefer native scrollbars with CSS; add `ngx-scrollbar` only if the custom look is required. |
| `angular-ui-sortable` ~0.15.0 (`ui.sortable`) + `jquery-ui` ~1.12.1 | Drag-and-drop reordering (dashboard todo list) | `@angular/cdk/drag-drop` (`cdkDropList`, `cdkDrag`) | LATER | CDK drag-drop removes the jQuery UI dependency entirely. |

### 1.3 Charts

| Legacy package (version) | Purpose / where used | Modern replacement | Disposition | Migration notes |
|---|---|---|---|---|
| `chart.js` ~2.4.0 | Dashboard & `pages/charts/chartJs` (via `angular-chart.js`) | `chart.js` 4 | CARRY | Chart.js 4 has breaking config changes vs 2.x (scales, tooltips, plugins). |
| `angular-chart.js` ~1.0.3 (`chart.js` module) | `chart-*` directives (`canvas class="chart chart-line"`) in `pages/charts/chartJs`, `theme` | `ng2-charts` (`BaseChartDirective`) | CARRY | `ng2-charts` is the maintained Angular wrapper for Chart.js 4. |
| `amcharts` ~3.15.2, `amcharts-stock` `*`, `ammap` ~3.14.5 | `pages/charts/amCharts/*` (area, bar, combined, funnel, gantt, line, pie), `pages/maps/map-bubbles`, `map-lines`, dashboard line/pie charts (`AmCharts.makeChart`) | `@amcharts/amcharts5` (+ `@amcharts/amcharts5-geodata`) | LATER | amCharts 3 is EOL; v5 API is a full rewrite (root/containers). Alternative: consolidate all chart demos onto Chart.js / ECharts (`echarts` + `ngx-echarts`) to reduce library count. Decision deferred to the charts migration phase. |
| `chartist` 0.9.5 + `angular-chartist.js` ~3.3.12 (`angular-chartist`) | `pages/charts/chartist` | `chartist` 1.x (ESM, no wrapper needed) or drop in favour of Chart.js | LATER | Chartist 1.x is maintained again; wrap in a small component. |
| `angular-morris-chart` ~1.1.0 (`angular.morris-chart`) (+ transitive `morris.js`, `raphael`) | `pages/charts/morris` | none - Morris.js is abandoned | NONE | Re-implement Morris demos with Chart.js / ng2-charts. |
| `jquery.easy-pie-chart` ~2.1.6 | Dashboard `pieCharts` / `dashboardPieChart` (`easyPieChart`) | Chart.js doughnut, or a small SVG component | NONE | Trivial to redraw as an SVG ring or Chart.js doughnut with `cutout`. |

### 1.4 Maps and calendar

| Legacy package (version) | Purpose / where used | Modern replacement | Disposition | Migration notes |
|---|---|---|---|---|
| `leaflet` ~0.7.5 | `pages/maps/leaflet` (`L.map`) | `leaflet` 1.9 + `@types/leaflet` (optionally `@bluehalo/ngx-leaflet`) | CARRY | 0.7 -> 1.x has minor API changes; tile URL scheme unchanged. |
| (script tag) Google Maps JS API `http://maps.google.com/maps/api/js?sensor=false` in `src/index.html` | `pages/maps/google-maps`, `dashboard/dashboardMap` | `@angular/google-maps` (+ API key) | LATER | Legacy uses a keyless HTTP URL that no longer works without an API key. |
| `fullcalendar` ~3.0.1 (+ `moment`) | `dashboard/dashboardCalendar` (jQuery `$().fullCalendar`) | `@fullcalendar/angular` + `@fullcalendar/core`, `@fullcalendar/daygrid`, `@fullcalendar/interaction` | LATER | FullCalendar 6 has an official Angular component; drops the moment dependency. |
| `moment` ~2.17.0 | Peer of fullcalendar 3; date formatting | `date-fns` or native `Intl` / Angular `DatePipe` | DROP | Only needed by fullcalendar 3; not needed with v6. |

### 1.5 Bootstrap, jQuery and jQuery plugins

| Legacy package (version) | Purpose / where used | Modern replacement | Disposition | Migration notes |
|---|---|---|---|---|
| `bootstrap` ~3.3.5 (CSS + `js/dropdown.js` + fonts) | Global grid/utilities/components; all SCSS in `src/sass` is written against BS3 variables & mixins | `bootstrap` 5 (SCSS) | CARRY | Biggest styling effort of the migration: BS3 -> BS5 class renames (`panel`->`card`, `col-xs-*`->`col-*`, `pull-left`->`float-start`, `hidden-*`->`d-none`, `glyphicon` removed, forms rewritten). Bootstrap JS is not used (ng-bootstrap replaces it). |
| `jquery` ~3.1.1 (resolution) | Loaded globally; used directly in theme directives (`baPanelBlur`, `backTop`, `slimscroll`, `ionSlider`, `scrollPosition`, `trackWidth`) and by all jQuery plugins below | none - Angular `Renderer2` / `ElementRef` / `@angular/cdk` | DROP | jQuery-dependent code is rewritten; no jQuery in the new workspace. |
| `jquery-ui` ~1.12.1 | Peer of `angular-ui-sortable` (draggable/sortable) | `@angular/cdk/drag-drop` | DROP | See `angular-ui-sortable`. |
| `jquery.easing` ~1.3.1 | `backTop` smooth scroll animation | CSS `scroll-behavior: smooth` / `window.scrollTo({behavior:'smooth'})` | DROP | |
| `bootstrap-select` ~1.12.1 | `pages/form/inputs/widgets/select` & `oldSelect` (`selectpicker` directive) | `@ng-select/ng-select` (or native `<select>` + BS5 `form-select`) | LATER | Same replacement as `angular-ui-select`; consolidate onto one select library. |
| `bootstrap-switch` ~3.3.2 | `pages/form/inputs/widgets/oldSwitches` (`bootstrapSwitch`) | Bootstrap 5 `form-switch` (CSS only) | DROP | Legacy also has a pure-CSS `baSwitcher`; BS5 switch covers both. |
| `bootstrap-tagsinput` (git: `TimSchlechter/bootstrap-tagsinput#master`) | `pages/form/inputs/widgets/tagsInput` (`tagsinput` directive) | `@ng-select/ng-select` with `[addTag]=true`, or `ngx-chips` | LATER | Git-sourced Bower dep with no versioned release - replacing it also removes the git checkout at install time. |
| `ionrangeslider` 2.1.4 | `theme/directives/ionSlider.js` (`ionRangeSlider`), `pages/ui/slider` | `ngx-slider` (`@angular-slider/ngx-slider`) or native `<input type="range">` + BS5 `form-range` | LATER | |
| `highlight` ~8.8.0 (highlight.js) | Declared in bower; **no usage found** in `src/app` | `highlight.js` / `ngx-highlightjs` if ever needed | DROP | Dead dependency. |

### 1.6 Icons, fonts, animation CSS

| Legacy package (version) | Purpose / where used | Modern replacement | Disposition | Migration notes |
|---|---|---|---|---|
| `font-awesome` ~4.4.0 (`fa fa-*`) | Sidebar/menu/buttons throughout; `pages/ui/icons/widgets/fontAwesomeIcons.html` | `@fortawesome/fontawesome-free` 6 | CARRY | FA4 -> FA6 renames (`fa` -> `fas`/`far`/`fab`, many icon names). Optionally keep FA4 shim CSS (`v4-shims.css`) during hybrid phase. |
| `Ionicons` ~2.0.1 (`ion-*`) | Sidebar icons (`sidebarMeta.icon`), page-top, widgets; `pages/ui/icons/widgets/ionicons.html` | `ionicons` 7 (web components / SVG) | CARRY | Ionicons 2 font -> 7 SVG web component (`<ion-icon name="...">`); icon names changed. Alternative: vendor the v2 font under `src/assets` for pixel parity. |
| Kameleon & Socicon icon sets (local files under `src/assets/img/theme/icon/kameleon`, `src/assets/fonts/socicon`) | `pages/ui/icons/widgets/kameleon*.html`, `socicon.html`, `kameleonImg` filter | copy as static assets | CARRY (assets) | Not Bower deps; copied verbatim into `blur-admin-modern/src/assets`. |
| `animate.css` ~3.5.2 | Entry animations (`zoomIn`, panel fade-in classes) | `animate.css` 4 | LATER | Class prefix changed to `animate__*` in v4. Install when the theme shell is migrated. |
| Google Fonts Roboto (`<link>` in `index.html`) | Base typography | same `<link>` in new `index.html`, or self-host via `@fontsource/roboto` | CARRY (link) | |
| Google Tag Manager snippet (`GTM-KT9L237`, `index.html`) | Analytics on the demo site | remove or re-add to new `index.html` | DROP | Template-vendor analytics; not part of the app. |

## 2. Tooling dependencies (`package.json` devDependencies)

All build tooling is replaced by the Angular CLI (`@angular/cli`, `@angular-devkit/build-angular`,
esbuild/Vite dev server) which `ng new` installs. Nothing in this table is carried over.

| Legacy package (version) | Purpose | Replacement in `blur-admin-modern/` | Disposition |
|---|---|---|---|
| `gulp` ~3.9.0 | Task runner (`gulpfile.js` + `gulp/*.js`) | `ng build` / `ng serve` / `ng test` | DROP |
| `wrench` ~1.5.8 | Recursive loading of `gulp/*.js` tasks | - | DROP |
| `gulp-load-plugins` ~1.4.0, `gulp-util` ~3.0.6, `chalk` ~1.1.1, `lodash` ~4.17.2, `del` ~2.2.2 | Gulp plumbing / logging / cleanup | Angular CLI internals | DROP |
| `bower` ~1.8.4 | Frontend package manager (`bower.json`, `postinstall`) | `npm` (`package.json` in new workspace) | DROP |
| `wiredep` ~4.0.0, `main-bower-files` ~2.13.1 | Inject `bower_components` `<script>`/`<link>` tags into `index.html` and Sass | `angular.json` `styles` / `scripts` arrays + ES module imports | DROP |
| `gulp-inject` ~4.1.0, `gulp-angular-filesort` ~1.1.1 | Inject app scripts in dependency order | ES modules / bundler | DROP |
| `gulp-angular-templatecache` ~2.0.0 | Bundle HTML partials into `$templateCache` | Component templates compiled by AOT | DROP |
| `gulp-ng-annotate` ~2.0.0 | Add `$inject` annotations for minification | Angular DI + decorators | DROP |
| `gulp-sass` ^4.0.1 (node-sass 4.14) | Compile `src/sass` | Angular CLI built-in `sass` (Dart Sass) via `--style=scss` | DROP |
| `gulp-autoprefixer` ~3.1.1 | Vendor prefixes | Angular CLI (autoprefixer via `.browserslistrc`) | DROP |
| `gulp-sourcemaps` ~1.6.0 | Source maps | Angular CLI `sourceMap` option | DROP |
| `gulp-useref` ~1.3.0, `gulp-filter` ~4.0.0, `gulp-flatten` ~0.3.1, `gulp-rename` ^1.2.2, `gulp-replace` ~0.5.4 | Concatenate build blocks from `index.html`, asset shuffling | Angular CLI bundling | DROP |
| `gulp-uglify` ~2.0.0, `uglify-save-license` ~0.4.1, `gulp-minify-css` ~1.2.1, `gulp-minify-html` ~1.0.4 | Minification | Angular CLI production build (esbuild) | DROP |
| `gulp-rev` ~7.1.2, `gulp-rev-replace` ~0.4.2 | Cache-busting hashes | Angular CLI `outputHashing` | DROP |
| `gulp-size` ~2.1.0 | Bundle size report | Angular CLI build output / budgets | DROP |
| `browser-sync` ~2.18.2, `browser-sync-spa` ~1.0.3, `http-proxy-middleware` ~0.17.2 | Dev server with live reload / SPA fallback / API proxy | `ng serve` (+ `proxy.conf.json`) | DROP |
| `gulp-eslint` ~1.0.0, `eslint-plugin-angular` ~0.12.0, `estraverse` ~4.2.0 | Linting | `angular-eslint` (`ng add angular-eslint`, later phase) | DROP |
| `gulp-protractor` ~3.0.0 | E2E tests (Protractor is EOL) | Playwright or Cypress (later phase) | DROP |
| `gulp-gh-pages` ^0.5.4, `gulp-zip` ^3.0.2, `gulp-shell` ^0.5.2, `gulp-prompt` ^0.2.0 | Demo-site deploy, marketplace zip, dev release tasks (`gulp/docs.js`, `marketplace.js`, `devRelease.js`) | CI pipeline / npm scripts if still needed | DROP |

## 3. Summary: carried over vs. dropped

### Installed in `blur-admin-modern/` in phase 1 (CARRY)

| npm package | Replaces |
|---|---|
| `bootstrap` 5 | `bootstrap` 3.3 |
| `@ng-bootstrap/ng-bootstrap` (+ `@popperjs/core`) | `angular-bootstrap` (ui.bootstrap) |
| `@fortawesome/fontawesome-free` | `font-awesome` 4.4 |
| `ionicons` | `Ionicons` 2.0 |
| `chart.js` + `ng2-charts` (+ `@angular/cdk`, peer dep of ng2-charts) | `chart.js` 2.4 + `angular-chart.js` |
| `leaflet` + `@types/leaflet` | `leaflet` 0.7 |
| `@angular/router` (from `ng new --routing`) | `angular-ui-router` |

Exact installed versions are recorded in `../blur-admin-modern/README.md`.

### Deferred to feature-migration phases (LATER / NONE)

`ngx-toastr`, `@ng-select/ng-select`, `ngx-quill`, `@angular/cdk` drag-drop / tree usage (the package itself is already present as an ng2-charts peer), `@fullcalendar/angular`,
`@angular/google-maps`, `@amcharts/amcharts5` (or an ECharts consolidation), `chartist` 1.x,
`@angular-slider/ngx-slider`, `animate.css` 4, and the hand-written replacements for
`angular-xeditable`, `angular-progress-button-styles`, `ng-js-tree`, Morris and easy-pie-chart.

### Dropped entirely (DROP)

AngularJS core modules (after the hybrid phase ends), jQuery + jQuery UI + jQuery plugins
(`jquery.easing`, `slimScroll`, `bootstrap-switch`), `angular-route`, `highlight`, `moment`,
Google Tag Manager, and the whole Gulp 3 / Bower / wiredep toolchain.
