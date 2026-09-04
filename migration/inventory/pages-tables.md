# Inventory: pages/tables

Source path: `src/app/pages/tables/` (2 JS files, 12 HTML files) plus area-specific SCSS `src/sass/theme/_table.scss` and `src/sass/app/_table.scss`. Module is registered in the parent list at `src/app/pages/pages.module.js:15` (`'BlurAdmin.pages.tables'`).

## 1. Modules

| module name | dependency list (verbatim array) | file |
|---|---|---|
| `BlurAdmin.pages.tables` | `[]` | src/app/pages/tables/tables.module.js |

## 2. Registrations

| type | name | file | notes |
|---|---|---|---|
| config | `routeConfig` (anonymous `.config(routeConfig)`, `/** @ngInject */`) | src/app/pages/tables/tables.module.js | Injects `$stateProvider`, `$urlRouterProvider`. Declares the 3 states below and the `/tables` -> `/tables/basic` redirect. |
| controller | `TablesPageCtrl` | src/app/pages/tables/TablesPageCtrl.js | Injects `$scope`, `$filter`, `editableOptions`, `editableThemes` (both from angular-xeditable). Attached to the **abstract** parent state `tables` (`controller: 'TablesPageCtrl'`, no `controllerAs`), so all child templates (`basic/tables.html`, `smart/tables.html` and the widgets pulled in through `include-with-scope`) read from `$scope` via prototypal scope inheritance. Exposes `$scope.smartTablePageSize` (10), `$scope.smartTableData` (60 rows, inline), `$scope.editableTableData` (`smartTableData.slice(0, 36)`), `$scope.peopleTableData` (5 rows with `status`), `$scope.metricsTableData` (5 browser rows with `image` paths `app/browsers/*.svg`), `$scope.users` (10), `$scope.statuses` (3), `$scope.groups` (4), functions `showGroup(user)`, `showStatus(user)` (both use `$filter('filter')`), `removeUser(index)`, `addUser()` (sets `$scope.inserted`). Side effects at construction: `editableOptions.theme = 'bs3'`, overrides `editableThemes['bs3'].submitTpl` / `.cancelTpl` with ionicons buttons (global mutation of xeditable theme). |

No directives, components, services, factories, providers, filters, constants, values or `.run()` blocks are defined in this area (verified with ripgrep for `.directive(`, `.service(`, `.factory(`, `.provider(`, `.filter(`, `.constant(`, `.value(`, `.run(`, `.component(` — zero hits under `src/app/pages/tables/`).

## 3. ui.router states / routes

| state name | url | templateUrl / template | controller (+ controllerAs) | title / sidebarMeta (icon, order) | file |
|---|---|---|---|---|---|
| `tables` (**abstract: true**) | `/tables` | inline `template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>'` | `TablesPageCtrl` (no controllerAs) | title `Tables`; sidebarMeta `{ icon: 'ion-grid', order: 300 }` | src/app/pages/tables/tables.module.js |
| `tables.basic` | `/basic` (full: `/tables/basic`) | `templateUrl: 'app/pages/tables/basic/tables.html'` | inherits `TablesPageCtrl` scope from parent | title `Basic Tables`; sidebarMeta `{ order: 0 }` | src/app/pages/tables/tables.module.js |
| `tables.smart` | `/smart` (full: `/tables/smart`) | `templateUrl: 'app/pages/tables/smart/tables.html'` | inherits `TablesPageCtrl` scope from parent | title `Smart Tables`; sidebarMeta `{ order: 100 }` | src/app/pages/tables/tables.module.js |

Other routing calls:
- `$urlRouterProvider.when('/tables','/tables/basic');` — src/app/pages/tables/tables.module.js:39 (redirect for the abstract parent).
- `$urlRouterProvider.otherwise(...)`: **none** in this area.
- Abstract states: `tables` (above).
- `baSidebarServiceProvider.addStaticItem(...)`: **none** in this area (sidebar entries come from the `sidebarMeta` on the states, consumed by `baSidebarService` outside this area).
- The parent template's `autoscroll-body-top` attribute is consumed by the `$uiViewScroll` decorator in `src/app/theme/theme.config.js` (`uiViewScrollDecorator`, uses `baUtil.hasAttr`) — cross-area coupling.

## 4. Third-party AngularJS / Bower libraries consumed

| library (bower name + angular module name) | how used | files where used |
|---|---|---|
| `angular-smart-table` ~2.1.3 / module `smart-table` (loaded in `src/app/app.js`) | attributes `st-table`, `st-sort`, `st-sort-default`, `st-search`, `st-pagination`, `st-items-by-page`, `st-displayed-pages`; CSS hooks `.st-sort-ascent` / `.st-sort-descent` styled in SCSS | src/app/pages/tables/widgets/smartTable.html, src/app/pages/tables/widgets/editableTable.html, src/sass/theme/_table.scss |
| `angular-xeditable` ~0.5.0 / module `xeditable` (loaded in `src/app/app.js`) | services `editableOptions`, `editableThemes` (controller); directives/attrs `editable-text`, `editable-select`, `editable-form`, `e-name`, `e-form`, `e-required`, `e-ng-options`, `e-selectpicker`, `onshow`, `shown`, `blur="cancel"`; form API `rowform.$visible/$waiting/$show()/$cancel()`, `$form.$cancel()`; CSS hooks `.editable-wrap`, `.editable-controls`, `.editable-input`, `.editable-buttons`, `.editable-click`, `.editable-empty`, `.editable-error`, `.editable-select` | src/app/pages/tables/TablesPageCtrl.js, src/app/pages/tables/widgets/editableRowTable.html, src/app/pages/tables/widgets/editableTable.html, src/sass/theme/_table.scss |
| `bootstrap-select` ~1.12.1 (jQuery plugin, no angular module; wrapped by the `selectpicker` directive in `BlurAdmin.pages.form`) | `<select class="selectpicker show-tick" selectpicker ...>` for "Rows on page"; `e-selectpicker` on xeditable selects (xeditable passes `e-*` attrs through to the generated `<select>`, so the same directive is applied) | src/app/pages/tables/widgets/smartTable.html, src/app/pages/tables/widgets/editableRowTable.html |
| `angular-ui-router` (module `ui.router`, loaded in `src/app/app.js`) | `$stateProvider`, `$urlRouterProvider`, `<ui-view>` | src/app/pages/tables/tables.module.js |
| `Ionicons` ~2.0.1 (icon font, CSS only) | `ion-grid` (sidebar icon), `ion-checkmark-round`, `ion-close-round` (xeditable submit/cancel templates) | src/app/pages/tables/tables.module.js, src/app/pages/tables/TablesPageCtrl.js |
| `bootstrap` 3 (CSS classes; JS not used directly here) | `.table`, `.table-bordered`, `.table-condensed`, `.table-hover`, `.table-striped`, `.table-responsive`, `.row`, `.col-*`, `.btn*`, `.form-control`, `.form-group`, `.form-inline`, `.input-sm`, `.text-center`, `.pagination`, contextual row classes `.primary/.success/.warning/.danger/.info`, `btn-{{item.status}}` | all widget HTML files, src/sass/theme/_table.scss |

Not used in this area (confirmed by grep): uib-*/`$uibModal`, toastr, text-angular, js-tree, ui-select, ui-sortable, slimscroll, progress-button, AmCharts, Chartist, Morris, Chart.js, Leaflet, fullcalendar, ionRangeSlider, bootstrap-switch, bootstrap-tagsinput, easy-pie-chart, moment, highlight.js, font-awesome.

## 5. External non-Angular assets

| asset | where used |
|---|---|
| bootstrap-select jQuery plugin (`elem.selectpicker(...)`) — invoked indirectly through the `selectpicker` directive (`src/app/pages/form/inputs/widgets/oldSelect/selectpicker.directive.js`, marked `@deprecated`) | src/app/pages/tables/widgets/smartTable.html (`selectpicker` attr), src/app/pages/tables/widgets/editableRowTable.html (`e-selectpicker`) |
| Raw jQuery / `$` usage | **none** in this area's JS |
| Bootstrap 3 CSS classes (see section 4) | all HTML files |
| Ionicons icon font (`ion-grid`, `ion-checkmark-round`, `ion-close-round`) | tables.module.js, TablesPageCtrl.js |
| Theme icon classes `.icon-up` / `.icon-down` (defined in `src/sass/theme/_layout.scss`, not this area) | widgets/basicTable.html, widgets/borderedTable.html, widgets/hoverRows.html |
| Browser SVG images `src/assets/img/app/browsers/{chrome,firefox,ie,safari,opera}.svg` — referenced as `app/browsers/*.svg` in `metricsTableData` and resolved via `appImage` filter + `layoutPaths.images.root` | src/app/pages/tables/TablesPageCtrl.js, widgets/borderedTable.html, widgets/hoverRows.html |
| Hard-coded `<img src="img/chrome.svg">` etc. (relative path, **not** through `appImage`; will only resolve if served with `img/` at the app root) | src/app/pages/tables/widgets/basicTable.html |
| SCSS partials: `src/sass/theme/_table.scss` (global `.table` overrides, xeditable, smart-table sort arrows, pagination, contextual row mixin `color-row`, `.email-link`, `.search-input`, `.select-page-size-wrap`, `.vertical-scroll`, `.browser-icons`, `.status-button`, `.black-muted-bg`, `.no-top-border`) and `src/sass/app/_table.scss` (`.table-panel { height: 295px }`) — both imported by `src/sass/main.scss` (lines 9 and 55) | basic/tables.html (`table-panel`), all widgets |
| Layout helper classes from theme SCSS: `.horizontal-scroll`, `.vertical-scroll`, `.with-scroll`, `.widgets`, `.align-right`, `.nowrap` | all widget HTML, basic/tables.html, smart/tables.html |
| `mailto:` links (`ng-href="mailto:..."`) | condensedTable, contextualTable, editableTable, responsiveTable, smartTable, stripedRows |
| Google Maps script, external URLs/CDNs, inline `<script>` | **none** in this area |

## 6. Cross-area dependencies

| dependency (defined outside this area) | defined in | used in |
|---|---|---|
| `baPanel` directive (`ba-panel`, `ba-panel-title`, `ba-panel-class`) | src/app/theme/components/baPanel/baPanel.directive.js (module `BlurAdmin.theme`) | src/app/pages/tables/basic/tables.html (6 panels), src/app/pages/tables/smart/tables.html (3 panels) |
| `includeWithScope` directive (`include-with-scope="..."`, restrict `AE`, dynamic `templateUrl` from the attribute, shares parent scope) | src/app/theme/directives/includeWithScope.js (`BlurAdmin.theme`) | basic/tables.html (hoverRows, borderedTable, condensedTable, stripedRows, contextualTable, responsiveTable), smart/tables.html (editableRowTable, editableTable, smartTable) |
| `appImage` filter (`{{:: item.image \| appImage}}`; depends on `layoutPaths` constant) | src/app/theme/filters/image/appImage.js (`BlurAdmin.theme`) | widgets/borderedTable.html, widgets/hoverRows.html |
| `layoutPaths` constant (indirect, via `appImage`) | src/app/theme/theme.constants.js | via `appImage` in borderedTable.html, hoverRows.html |
| `selectpicker` directive (jQuery bootstrap-select wrapper, `@deprecated`, `$scope.$watch` on ngModel) | src/app/pages/form/inputs/widgets/oldSelect/selectpicker.directive.js (module `BlurAdmin.pages.form`) — **another pages area**, not theme | widgets/smartTable.html (`selectpicker`), widgets/editableRowTable.html (`e-selectpicker`) |
| `$uiViewScroll` decorator / `baUtil.hasAttr` (`autoscroll-body-top`) | src/app/theme/theme.config.js, src/app/theme/services/baUtil.js | tables.module.js parent state template |
| `baSidebarService` (reads `title` + `sidebarMeta` from states to build the menu) | src/app/theme/components/baSidebar/baSidebar.service.js | tables.module.js states `tables`, `tables.basic`, `tables.smart` |
| `editableOptions`, `editableThemes` (xeditable services) | bower `angular-xeditable` | TablesPageCtrl.js |
| `$filter('filter')` (core ng) | AngularJS core | TablesPageCtrl.js (`showGroup`, `showStatus`) |
| `.icon-up` / `.icon-down` CSS | src/sass/theme/_layout.scss | basicTable.html, borderedTable.html, hoverRows.html |
| Not used here: `baConfig`, `baProgressModal`, `colorHelper`, `profilePicture`, `kameleonImg`, `baSidebarServiceProvider.addStaticItem` | — | — |

## 7. Migration risk notes

- **Abstract-parent controller + scope inheritance**: `TablesPageCtrl` sits on the abstract `tables` state; child templates and all nine `include-with-scope` partials rely on `$scope` prototypal inheritance (no `controllerAs`). In Angular this must become explicit inputs/services (e.g. a `TablesDataService`) — the partials cannot simply be turned into standalone components without wiring data in.
- **`include-with-scope` partial pattern**: nine widget HTML files are not components; they are raw partials injected with dynamic `templateUrl`. Each needs to become an Angular component with `@Input()`s. Templates are served via `$templateCache` in the production build (`gulp/build.js` `angularTemplatecache`), so the string paths (`app/pages/tables/widgets/*.html`) are build-time contracts.
- **angular-xeditable**: no Angular (2+) equivalent; `editable-text`, `editable-select`, `editable-form`, `rowform.$show()/$cancel()`, `blur="cancel"`, `onshow`, `shown` all need a rewrite (e.g. reactive forms with edit-mode rows or a grid library). The controller also mutates the **global** xeditable theme (`editableThemes['bs3'].submitTpl/cancelTpl`) at construction time — a side effect that leaks to every other xeditable user in the app.
- **smart-table**: `st-table`, `st-sort`, `st-search`, `st-pagination` have no ngUpgrade path; port to Angular Material table / ag-Grid / hand-rolled sort+filter+paginate pipes. SCSS relies on smart-table's `.st-sort-ascent/.st-sort-descent` classes for arrows.
- **jQuery bootstrap-select via deprecated `selectpicker` directive** (`elem.selectpicker(...)`, `$scope.$watch` on ngModel/ngDisabled, `elem.append(<option>)` DOM manipulation) from a *different pages area* (`BlurAdmin.pages.form`); the `e-selectpicker` attr also relies on xeditable's `e-*` attribute pass-through to the generated `<select>`. Replace with a native/Angular select.
- **`$urlRouterProvider.when('/tables','/tables/basic')` and abstract state** must be mirrored as an Angular Router `redirectTo` / parent route with `children`.
- **`sidebarMeta` on states** is a BlurAdmin-specific convention consumed by `baSidebarService`; the Angular router must expose equivalent `data` for the sidebar.
- **`autoscroll-body-top`** custom attribute on `<ui-view>` depends on a `$uiViewScroll` decorator in `theme.config.js`.
- **Hard-coded relative image paths** in `widgets/basicTable.html` (`img/chrome.svg`) bypass `appImage`/`layoutPaths`; that file is also **orphaned** (not referenced by any state, partial or JS — grep for `basicTable` returns nothing outside the file itself).
- **One-time bindings** (`{{::( item.image | appImage )}}`) and `ng-class="nowrap"` (evaluates the undefined scope property `nowrap`, i.e. a bug — likely meant `class="nowrap"`) in borderedTable.html and hoverRows.html.
- **Large inline fixture data** (~700 lines in `TablesPageCtrl.js`) — should move to a JSON/service.
- Low risk: no `$rootScope` events, no `$watch` in this area's own code, no timers/intervals, no `window` globals (AmCharts/google.maps/L), no inline scripts, no CDN scripts, no direct jQuery in area JS.

## 8. File list

| file | description |
|---|---|
| src/app/pages/tables/tables.module.js | Declares `BlurAdmin.pages.tables` module; `routeConfig` with abstract `tables` state (+ `TablesPageCtrl`, `ion-grid`, order 300), `tables.basic`, `tables.smart`, and `/tables` -> `/tables/basic` redirect. |
| src/app/pages/tables/TablesPageCtrl.js | `TablesPageCtrl`: inline fixture arrays (`smartTableData` 60 rows, `editableTableData`, `peopleTableData`, `metricsTableData`, `users`, `statuses`, `groups`), helpers `showGroup/showStatus/removeUser/addUser`, xeditable theme configuration. |
| src/app/pages/tables/basic/tables.html | "Basic Tables" page: 3x2 grid of `ba-panel`s (class `with-scroll table-panel`) each including a widget partial via `include-with-scope` (hoverRows, borderedTable, condensedTable, stripedRows, contextualTable, responsiveTable). |
| src/app/pages/tables/smart/tables.html | "Smart Tables" page: 3 full-width `ba-panel`s including editableRowTable, editableTable, smartTable partials. |
| src/app/pages/tables/widgets/basicTable.html | Static browser-metrics table (16 columns with `.icon-up/.icon-down` arrows, hard-coded `img/*.svg`). **Orphaned** — not referenced anywhere. |
| src/app/pages/tables/widgets/borderedTable.html | `table table-bordered` over `metricsTableData` with `appImage`-resolved browser icons. |
| src/app/pages/tables/widgets/condensedTable.html | `table table-condensed` over `peopleTableData`; status rendered as `btn btn-xs btn-{{item.status}}`. |
| src/app/pages/tables/widgets/contextualTable.html | Static table demonstrating Bootstrap contextual row classes (`primary/success/warning/danger/info`), hard-coded rows. |
| src/app/pages/tables/widgets/editableRowTable.html | xeditable row-editing table over `users`: `editable-text`, `editable-select` (+`e-selectpicker`), `editable-form name="rowform"`, Add/Edit/Save/Cancel/Delete buttons bound to `addUser`/`removeUser`. |
| src/app/pages/tables/widgets/editableTable.html | smart-table (`st-table="editableTableData"`, `st-sort`, `st-pagination` 12/page) with xeditable `editable-text` cells (`blur="cancel"`). |
| src/app/pages/tables/widgets/hoverRows.html | `table table-hover` over `metricsTableData` with `black-muted-bg` header, `no-top-border` rows, up/down arrows, `appImage` icons. |
| src/app/pages/tables/widgets/responsiveTable.html | Static `table-responsive` wrapper with 5 hard-coded people rows. |
| src/app/pages/tables/widgets/smartTable.html | Full smart-table demo: `selectpicker` "Rows on page" select bound to `smartTablePageSize`, `st-sort` headers, `st-search` inputs per column, `st-pagination` footer. |
| src/app/pages/tables/widgets/stripedRows.html | `table table-striped` over `smartTableData` inside `.vertical-scroll` (max-height 214px). |
| src/sass/theme/_table.scss | Area-specific theme styles: `.table` overrides, `.table-id`, `.table-arr`, xeditable tweaks, smart-table sort arrows, `.sortable`, `.email-link`, `.search-input`, pagination, contextual `color-row` mixin, `.browser-icons`, `.status-button`, `.select-page-size-wrap`, `.vertical-scroll`, `.table-responsive`. Imported by `src/sass/main.scss:9`. |
| src/sass/app/_table.scss | `.table-panel { height: 295px }` used by basic/tables.html panels. Imported by `src/sass/main.scss:55`. |
