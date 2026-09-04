# Inventory: pages/form

Source: `src/app/pages/form/` (module `BlurAdmin.pages.form`), plus area-specific SCSS `src/sass/app/_form.scss`. Registered in `src/app/pages/pages.module.js` as a dependency of `BlurAdmin.pages`.

## 1. Modules

| module name | dependency list (verbatim array) | file |
|---|---|---|
| `BlurAdmin.pages.form` | `['ui.select', 'ngSanitize']` | src/app/pages/form/form.module.js |

All other .js files in the area re-open `angular.module('BlurAdmin.pages.form')` (getter form) to register components.

## 2. Registrations

| type | name | file | notes |
|---|---|---|---|
| config | `routeConfig` (`$stateProvider`) | src/app/pages/form/form.module.js | Declares states `form`, `form.inputs`, `form.layouts`, `form.wizard` (see §3). `/** @ngInject */`. |
| controller | `WizardCtrl` | src/app/pages/form/wizard/wizrdCtrl.js | Used by state `form.wizard` (`controllerAs: 'vm'`) → `wizard/wizard.html`. Injects `$scope` (unused). Holds `vm.personalInfo`, `vm.productInfo`, `vm.shipment`; method `arePersonalInfoPasswordsEqual()`. |
| controller | `datepickerCtrl` | src/app/pages/form/inputs/widgets/datePickers/datepickerCtrl.js | `ng-controller="datepickerCtrl"` in `inputs/widgets/datePickers/datePickers.html`. Injects `$scope`; sets `$scope.dt = new Date()`, `$scope.options = {showWeeks:false}`. |
| controller | `datepickerpopupCtrl` | src/app/pages/form/inputs/widgets/datePickers/datepickerpopupCtrl.js | `ng-controller="datepickerpopupCtrl"` in `datePickers.html`. Injects `$scope`; `$scope.open()`, `opened`, `formats[]`, `format`, `options`. |
| controller | `OldSelectpickerPanelCtrl` | src/app/pages/form/inputs/widgets/oldSelect/OldSelectpickerPanelCtrl.js | `ng-controller="OldSelectpickerPanelCtrl as selectpickerVm"` in `inputs/widgets/oldSelect/select.html`. No deps. Marked `@deprecated`. Static option arrays. |
| controller | `SelectpickerPanelCtrl` | src/app/pages/form/inputs/widgets/select/SelectpickerPanelCtrl.js | `ng-controller="SelectpickerPanelCtrl as selectpickerVm"` in `inputs/widgets/select/select.html`. No deps. Static option arrays + `someGroupFn(item)` group-by function. |
| controller | `OldSwitchPanelCtrl` | src/app/pages/form/inputs/widgets/oldSwitches/OldSwitchPanelCtrl.js | `ng-controller="OldSwitchPanelCtrl as switchPanelVm"` in `inputs/widgets/oldSwitches/switch.html`. No deps. `vm.switcherValues{primary,warning,danger,info,success}`. |
| controller | `SwitchDemoPanelCtrl` | src/app/pages/form/inputs/widgets/switches/SwitchDemoPanelCtrl.js | `ng-controller="SwitchDemoPanelCtrl as vm"` in `inputs/widgets/switches/switch.html`. No deps. `vm.switches{s1..s5}`. |
| directive | `selectpicker` (attr `selectpicker`) | src/app/pages/form/inputs/widgets/oldSelect/selectpicker.directive.js | `restrict: 'A'`, `require: '?ngOptions'`, `priority: 1500`, no isolate scope, no template. `link.pre` appends a hidden placeholder `<option>` (uses `attrs.title`); `link.post` calls `elem.selectpicker({dropupAuto:false, hideDisabled:true})` (bootstrap-select jQuery plugin) and `$watch`es `attrs.ngModel` / `attrs.ngDisabled` to call `elem.selectpicker('refresh')`. Marked `@deprecated`. Also used outside the area (profile, tables). |
| directive | `switch` (element/attr `<switch>`) | src/app/pages/form/inputs/widgets/oldSwitches/switch.directive.js | `restrict: 'EA'`, `replace: true`, isolate `scope: { ngModel: '=' }`, `template` function building `<div class="switch-container {color}"><input type="checkbox" ng-model="ngModel"></div>`. Injects `$timeout` (unused). `link` calls `$(elem).find('input').bootstrapSwitch({size:'small', onColor: attr.color})` and listens to `switchChange.bootstrapSwitch` → sets `scope.ngModel` + `scope.$apply()`. Deprecated in favour of `ba-switcher`. Also used in `src/app/pages/profile/profile.html`. |
| directive | `tagInput` (attr `tag-input`) | src/app/pages/form/inputs/widgets/tagsInput/tagsInput.directive.js | `restrict: 'A'`, no scope, no template. `link` calls `$(elem).tagsinput({ tagClass: 'label label-' + attr.tagInput })` (bootstrap-tagsinput jQuery plugin). |
| filter | `groupSelectpickerOptions` | src/app/pages/form/inputs/widgets/select/GroupSelectpickerOptions.js | Pure filter `(items, props)` — case-insensitive substring match on each key of `props`; returns input untouched if not an array. Used in `select.html` (`| groupSelectpickerOptions: {label: $select.search}`). |

No `component`, `service`, `factory`, `provider`, `constant`, `value`, or `run` registrations exist in this area.

## 3. ui.router states / routes

All defined in src/app/pages/form/form.module.js.

| state name | url | templateUrl / template | controller (+ controllerAs) | title / sidebarMeta (icon, order) | file |
|---|---|---|---|---|---|
| `form` (**abstract**) | `/form` | `template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>'` | — | title `Form Elements`; sidebarMeta `{ icon: 'ion-compose', order: 250 }` | src/app/pages/form/form.module.js |
| `form.inputs` | `/inputs` (→ `/form/inputs`) | `templateUrl: 'app/pages/form/inputs/inputs.html'` | — (template uses `ng-controller` per widget) | title `Form Inputs`; sidebarMeta `{ order: 0 }` | src/app/pages/form/form.module.js |
| `form.layouts` | `/layouts` (→ `/form/layouts`) | `templateUrl: 'app/pages/form/layouts/layouts.html'` | — | title `Form Layouts`; sidebarMeta `{ order: 100 }` | src/app/pages/form/form.module.js |
| `form.wizard` | `/wizard` (→ `/form/wizard`) | `templateUrl: 'app/pages/form/wizard/wizard.html'` | `WizardCtrl` as `vm` | title `Form Wizard`; sidebarMeta `{ order: 200 }` | src/app/pages/form/form.module.js |

- Abstract states: `form`.
- `$urlRouterProvider.otherwise`: none in this area (the app-wide `otherwise('/dashboard')` lives in src/app/pages/pages.module.js).
- `baSidebarServiceProvider.addStaticItem`: none in this area (sidebar entries are derived from `sidebarMeta` on the states by the theme's sidebar service).
- Templates loaded via `ng-include` (not states) — all under `app/pages/form/`: `inputs/widgets/standardFields.html`, `inputs/widgets/tagsInput/tagsInput.html`, `inputs/widgets/inputGroups.html`, `inputs/widgets/checkboxesRadios.html`, `inputs/widgets/switches/switch.html`, `inputs/widgets/oldSwitches/switch.html`, `inputs/widgets/datePickers/datePickers.html`, `inputs/widgets/validationStates.html`, `inputs/widgets/select/select.html`, `inputs/widgets/oldSelect/select.html`, `layouts/widgets/inlineForm.html`, `layouts/widgets/basicForm.html`, `layouts/widgets/horizontalForm.html`, `layouts/widgets/formWithoutLabels.html`, `layouts/widgets/blockForm.html`.

## 4. Third-party AngularJS / Bower libraries consumed

| library (bower name + angular module name) | how used | files where used |
|---|---|---|
| angular-ui-select (`^0.19.6`) / `ui.select` | Module dependency; directives `<ui-select>`, `<ui-select-match>`, `<ui-select-choices>` with attrs `append-to-body`, `search-enabled`, `multiple`, `group-by`, `repeat`; `$select.search`, `$select.selected`, `$item`; `highlight` filter (provided by ui-select) | src/app/pages/form/form.module.js, src/app/pages/form/inputs/widgets/select/select.html |
| angular-sanitize / `ngSanitize` | Module dependency; `ng-bind-html` on select option labels | src/app/pages/form/form.module.js, src/app/pages/form/inputs/widgets/select/select.html |
| angular-bootstrap (`~1.3.3`) / `ui.bootstrap` (declared at app level in src/app/app.js, not in this module) | `<uib-datepicker ng-model datepicker-options>`, `uib-datepicker-popup="{{format}}"` with `is-open`, `close-text`, `alt-input-formats`, `show-button-bar` | src/app/pages/form/inputs/widgets/datePickers/datePickers.html |
| angular-ui-router / `ui.router` (app-level) | `$stateProvider.state(...)`, `<ui-view>` in abstract state template | src/app/pages/form/form.module.js |
| bootstrap-select (`~1.12.1`) — jQuery plugin, no angular module | `elem.selectpicker({...})`, `elem.selectpicker('refresh')` via the local `selectpicker` directive; `data-live-search`, `data-subtext`, `data-icon`, `data-divider`, `data-max-options`, `data-style`, `data-container` attributes; CSS class `bootstrap-select` reused on `<ui-select>` | src/app/pages/form/inputs/widgets/oldSelect/selectpicker.directive.js, src/app/pages/form/inputs/widgets/oldSelect/select.html, src/app/pages/form/wizard/wizard.html, src/app/pages/form/inputs/widgets/select/select.html (class only), src/sass/app/_form.scss |
| bootstrap-switch (`~3.3.2`) — jQuery plugin | `input.bootstrapSwitch({size, onColor})`, event `switchChange.bootstrapSwitch` via local `switch` directive; `.bootstrap-switch*` SCSS overrides | src/app/pages/form/inputs/widgets/oldSwitches/switch.directive.js, src/app/pages/form/inputs/widgets/oldSwitches/switch.html, src/sass/app/_form.scss |
| bootstrap-tagsinput (`TimSchlechter/bootstrap-tagsinput#master`) — jQuery plugin | `$(elem).tagsinput({tagClass})` via local `tagInput` directive; `data-role="tagsinput"`; `.bootstrap-tagsinput` SCSS | src/app/pages/form/inputs/widgets/tagsInput/tagsInput.directive.js, src/app/pages/form/inputs/widgets/tagsInput/tagsInput.html, src/sass/app/_form.scss |
| bootstrap (`~3.3.5`) CSS | Grid/forms/buttons/`glyphicon` classes (see §5) | all .html files in the area |
| ionicons | `ion-compose` (sidebar icon), `ion-checkmark-circled`, `ion-alert-circled`, `ion-android-cancel` | src/app/pages/form/form.module.js, src/app/pages/form/inputs/widgets/validationStates.html |
| jquery (`~3.1.1`) | Global `$(elem)` / jqLite-with-jQuery `elem.selectpicker` etc. | selectpicker.directive.js, switch.directive.js, tagsInput.directive.js |

Not used in this area: smart-table, uib-modal/$uibModal, toastr, angular-xeditable, textAngular, js-tree, ui-sortable, slimscroll, progress-button, amCharts, Chartist, Morris, Chart.js, leaflet, fullcalendar, ionRangeSlider, easy-pie-chart, moment, highlight.js, font-awesome (no `fa-` classes in area).

## 5. External non-Angular assets

| asset | where used |
|---|---|
| jQuery global `$` — `$(elem).find('input')`, `$(elem).tagsinput(...)` | src/app/pages/form/inputs/widgets/oldSwitches/switch.directive.js, src/app/pages/form/inputs/widgets/tagsInput/tagsInput.directive.js |
| jQuery plugin methods called on jqLite element (requires jQuery loaded before Angular): `elem.selectpicker(...)`, `elem.append(html)` | src/app/pages/form/inputs/widgets/oldSelect/selectpicker.directive.js |
| bootstrap-select plugin (JS + CSS) | oldSelect/select.html, wizard/wizard.html, selectpicker.directive.js |
| bootstrap-switch plugin (JS + CSS) | oldSwitches/switch.directive.js, oldSwitches/switch.html |
| bootstrap-tagsinput plugin (JS + CSS) | tagsInput/tagsInput.directive.js, tagsInput/tagsInput.html |
| Bootstrap 3 CSS classes: `row`, `col-md-*`, `col-sm-*`, `col-xs-*`, `col-sm-offset-2`, `col-xlg-6` (theme extension), `form-group`, `form-control`, `form-control-feedback`, `form-horizontal`, `form-inline`, `control-label`, `help-block`, `input-group`, `input-group-addon`, `input-group-btn`, `input-sm`, `input-lg`, `checkbox`, `checkbox-inline`, `radio`, `radio-inline`, `has-success`/`has-warning`/`has-error`, `has-feedback`, `sr-only`, `btn btn-primary/-success/-warning/-danger/-default/-inverse`, `btn-group`, `label label-*`, `glyphicon glyphicon-calendar/-trash/-heart` | all .html files under src/app/pages/form/ |
| Bootstrap 3 JS: none directly invoked (plugins above depend on Bootstrap's dropdown JS for bootstrap-select) | — |
| Ionicons icon font: `ion-compose`, `ion-checkmark-circled`, `ion-alert-circled`, `ion-android-cancel` | form.module.js, inputs/widgets/validationStates.html |
| Theme SCSS classes (BlurAdmin custom): `widgets`, `with-scroll`, `custom-checkbox`, `custom-radio`, `nowrap`, `input-demo`, `checkbox-demo`, `radio-demo`, `checkbox-demo-row`, `switches`, `switch-container`, `with-primary-addon`/`with-*-addon`, `input-group-addon-primary/-warning/-success`, `addon-left`/`addon-right`, `form-control-rounded`, `sub-little-text`, `muted-text`, `error-block`, `basic-block`, `uib-datepicker-wrap`, `datepicker`, `with-search` | src/sass/app/_form.scss (form-specific), src/sass/theme/components/_baWizard.scss (wizard), other theme partials; consumed by all area templates |
| SCSS partials specific to area: `src/sass/app/_form.scss` (imported by `src/sass/main.scss` line 47) — styles `.form-control`, `.form-inline`, `.bootstrap-switch*`, `.switcher-container` (ba-switcher), `.switch-container`, `.switches`, `label.custom-checkbox`, `label.custom-radio`, `.input-demo`, `.bootstrap-select`, `.checkbox-demo-row`, `.bootstrap-tagsinput`, `.ui-select-multiple.ui-select-bootstrap`; `src/sass/theme/components/_baWizard.scss` (theme-owned, used by wizard page) | src/sass/main.scss |
| Images under src/assets | none referenced in this area |
| Google Maps script / external URLs / CDNs / inline `<script>` | none in this area |

## 6. Cross-area dependencies

| dependency (defined outside area) | kind | where used in area |
|---|---|---|
| `baPanel` directive (`ba-panel`, `ba-panel-title`, `ba-panel-class`) — src/app/theme/components/baPanel/ | directive | inputs/inputs.html (10 panels), layouts/layouts.html (5 panels), wizard/wizard.html (1 panel) |
| `baSwitcher` directive (`<ba-switcher switcher-style switcher-value>`) — src/app/theme/inputs/baSwitcher/baSwitcher.js | directive | inputs/widgets/switches/switch.html |
| `baWizard` / `baWizardStep` directives (`<ba-wizard>`, `<ba-wizard-step title form>`) — src/app/theme/components/baWizard/ | directive | wizard/wizard.html |
| `autoscroll-body-top` attribute directive (theme) used in abstract state template `<ui-view autoscroll="true" autoscroll-body-top>` | directive | form.module.js |
| `baSidebarService` (theme) — consumes `sidebarMeta` / `title` on states to build the sidebar menu (indirect) | service | form.module.js state definitions |
| `ui.bootstrap` (`uib-datepicker`, `uib-datepicker-popup`) — registered at app root in src/app/app.js, not in this module | third-party module | inputs/widgets/datePickers/datePickers.html |
| `ui.router` `$stateProvider` | third-party provider | form.module.js |
| Angular built-in `date` filter (`{{dt \| date:'fullDate'}}`), `filter` filter | filter | datePickers.html, select.html |
| `highlight` filter (from ui-select) | filter | select.html |
| Not used here: `baConfig`, `baProgressModal`, `layoutPaths`, `baUtil`, `colorHelper`, `profilePicture`, `appImage`, `kameleonImg`, `$rootScope`, `$templateCache`. |

Reverse dependencies (other areas depending on this module's registrations):
- `selectpicker` directive is used by src/app/pages/profile/profile.html, src/app/pages/tables/widgets/smartTable.html, src/app/pages/tables/widgets/editableRowTable.html.
- `switch` directive is used by src/app/pages/profile/profile.html.
- `ui.select` and `ngSanitize` are only declared as deps by this module; removing it would drop them from the app's injector.

## 7. Migration risk notes

- **jQuery-plugin wrapper directives** (`selectpicker`, `switch`, `tagInput`) do direct DOM manipulation (`elem.append`, `$(elem).find`, plugin init in `link`) and depend on the global `$` and on jQuery being loaded before Angular so jqLite is jQuery. No Angular 2+ equivalents; port to native components (e.g. Angular Material select / slide-toggle / chips) or keep as wrapped legacy elements during hybrid phase.
- **`selectpicker` has `priority: 1500` and `require: '?ngOptions'`** to run before `ngOptions`/`ngRepeat`, plus two `scope.$watch` calls for refresh — ordering-dependent behaviour that is not reproducible in Angular; it is also consumed cross-area (profile, tables) and inside the wizard, so it is a shared retirement item, not local.
- **`switch` directive** uses `replace: true` (deprecated in 1.x) and manual `scope.$apply()` from a jQuery event; `$timeout` injected but unused. Already superseded by theme `ba-switcher` — recommend deleting rather than porting (profile page still uses it).
- **`ui-select` (angular-ui-select 0.19)** templates use `$select`, `$item`, `append-to-body`, `group-by` fn and the `highlight` filter; `ng-bind-html` relies on `ngSanitize`. Needs a replacement select component; the `groupSelectpickerOptions` filter is pure logic and trivially portable to a pipe.
- **angular-ui-bootstrap datepicker** (`uib-datepicker`, `uib-datepicker-popup`) has no Angular 2+ equivalent; replace with ng-bootstrap/Material datepicker. `altInputFormats` is referenced in template but never defined on scope (renders empty).
- **`$scope`-based controllers** (`datepickerCtrl`, `datepickerpopupCtrl`, `WizardCtrl` injecting `$scope`) and `ng-controller` in `ng-include`d partials — the inputs page has 5 nested `ng-controller` scopes inside `ng-include`s; these partials must become components before downgrade/upgrade.
- **`ng-include` heavy templates** (15 partials) — requires `$templateCache` at runtime (gulp templateCache task bundles them); no direct `$templateCache` API usage in area code.
- **Wizard page** relies on theme `baWizard`/`baWizardStep` directives which use `require: '^baWizard'` parent-controller communication and two-way `form: '='` binding to AngularJS `FormController` instances (`vm.personalInfoForm` etc.) — Angular reactive/template forms have a different API; the wizard depends on `$invalid`/`$dirty`/`$submitted` flags.
- **Validation templates** rely on Bootstrap 3 `has-error`/`has-feedback`/`form-control-feedback` markup and BlurAdmin SCSS; Bootstrap 4/5 upgrade would break styling.
- **Global state**: none (no `window`, `AmCharts`, `google.maps`, `L`, `$rootScope` events, timers/intervals, inline scripts, or CDN scripts in this area).
- **Dead/inconsistent bindings**: `select.html` binds `selectpickerVm.selectedItem`, `groupedItems`, `groupedByItems` which are not initialised in `SelectpickerPanelCtrl` (controller defines `standardItem`, `groupedItem`, `groupedByItem`); harmless in AngularJS (auto-created) but will surface as type errors when ported.
- Duplicate/deprecated demos (`oldSelect`, `oldSwitches`) can be dropped during migration; both are flagged deprecated in panel titles and JSDoc.

## 8. File list

| file | description |
|---|---|
| src/app/pages/form/form.module.js | Declares `BlurAdmin.pages.form` (deps `ui.select`, `ngSanitize`) and ui.router states `form` (abstract), `form.inputs`, `form.layouts`, `form.wizard`. |
| src/app/pages/form/inputs/inputs.html | Form Inputs page: two-column grid of `ba-panel`s each `ng-include`-ing a widget partial. |
| src/app/pages/form/inputs/widgets/standardFields.html | Static demo of text/password/rounded/help/disabled/textarea/small/large inputs. |
| src/app/pages/form/inputs/widgets/inputGroups.html | Static Bootstrap input-group demos with coloured addons and a button. |
| src/app/pages/form/inputs/widgets/checkboxesRadios.html | Static custom checkbox / radio demos incl. disabled states. |
| src/app/pages/form/inputs/widgets/validationStates.html | Static Bootstrap validation-state demos (has-success/warning/error, feedback icons via ionicons). |
| src/app/pages/form/inputs/widgets/datePickers/datePickers.html | Inline `uib-datepicker` and popup `uib-datepicker-popup` demos with format selector. |
| src/app/pages/form/inputs/widgets/datePickers/datepickerCtrl.js | `datepickerCtrl` — `$scope.dt`, `$scope.options` for inline datepicker. |
| src/app/pages/form/inputs/widgets/datePickers/datepickerpopupCtrl.js | `datepickerpopupCtrl` — popup open state, formats list. |
| src/app/pages/form/inputs/widgets/select/select.html | `ui-select` demos (standard, search, disabled, grouped, grouped-by-fn, multiple, multiple with clear button). |
| src/app/pages/form/inputs/widgets/select/SelectpickerPanelCtrl.js | `SelectpickerPanelCtrl` — option data sets and `someGroupFn` for ui-select demos. |
| src/app/pages/form/inputs/widgets/select/GroupSelectpickerOptions.js | `groupSelectpickerOptions` filter — property-substring search for grouped ui-select. |
| src/app/pages/form/inputs/widgets/oldSelect/select.html | Deprecated bootstrap-select demos using `selectpicker` directive (styles, groups, dividers, multiple, limits). |
| src/app/pages/form/inputs/widgets/oldSelect/OldSelectpickerPanelCtrl.js | `OldSelectpickerPanelCtrl` (deprecated) — option arrays for bootstrap-select demos. |
| src/app/pages/form/inputs/widgets/oldSelect/selectpicker.directive.js | `selectpicker` attribute directive (deprecated) wrapping bootstrap-select jQuery plugin; also used by profile & tables pages. |
| src/app/pages/form/inputs/widgets/switches/switch.html | New on/off switch demo using theme `ba-switcher`. |
| src/app/pages/form/inputs/widgets/switches/SwitchDemoPanelCtrl.js | `SwitchDemoPanelCtrl` — boolean model for five `ba-switcher`s. |
| src/app/pages/form/inputs/widgets/oldSwitches/switch.html | Deprecated switch demo using local `<switch>` directive. |
| src/app/pages/form/inputs/widgets/oldSwitches/OldSwitchPanelCtrl.js | `OldSwitchPanelCtrl` — `switcherValues` model for deprecated switches. |
| src/app/pages/form/inputs/widgets/oldSwitches/switch.directive.js | `switch` element directive wrapping bootstrap-switch jQuery plugin (`replace: true`, isolate `ngModel: '='`). |
| src/app/pages/form/inputs/widgets/tagsInput/tagsInput.html | Three tags inputs (primary/warning/danger) using `tag-input` attribute. |
| src/app/pages/form/inputs/widgets/tagsInput/tagsInput.directive.js | `tagInput` attribute directive wrapping bootstrap-tagsinput jQuery plugin. |
| src/app/pages/form/layouts/layouts.html | Form Layouts page: `ba-panel`s `ng-include`-ing five static layout partials. |
| src/app/pages/form/layouts/widgets/inlineForm.html | Static Bootstrap `form-inline` demo. |
| src/app/pages/form/layouts/widgets/basicForm.html | Static basic vertical form demo. |
| src/app/pages/form/layouts/widgets/horizontalForm.html | Static Bootstrap `form-horizontal` demo. |
| src/app/pages/form/layouts/widgets/formWithoutLabels.html | Static placeholder-only form demo. |
| src/app/pages/form/layouts/widgets/blockForm.html | Static two-column block form demo. |
| src/app/pages/form/wizard/wizard.html | Form Wizard page: `ba-wizard` with four `ba-wizard-step`s (personal info, product info, shipment, finish) bound to `vm.*Form`; uses `selectpicker` and `custom-checkbox`. |
| src/app/pages/form/wizard/wizrdCtrl.js | `WizardCtrl` (as `vm`) — models `personalInfo`, `productInfo`, `shipment`; `arePersonalInfoPasswordsEqual()`. |
| src/sass/app/_form.scss | Area-specific SCSS: form controls, custom checkbox/radio, bootstrap-switch/switcher, bootstrap-select, bootstrap-tagsinput, ui-select overrides, demo layout classes. |
