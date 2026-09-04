# Inventory: pages/ui

Area root: `src/app/pages/ui/` (BlurAdmin 1.3.1, AngularJS 1.5.8). 12 JS files, 47 HTML files. This area is almost entirely static demo markup; only 6 controllers carry logic, and no directives/services/filters are defined here.

## 1. Modules

| Module name | Dependency list (verbatim) | File |
|---|---|---|
| `BlurAdmin.pages.ui` | `['BlurAdmin.pages.ui.typography', 'BlurAdmin.pages.ui.buttons', 'BlurAdmin.pages.ui.icons', 'BlurAdmin.pages.ui.modals', 'BlurAdmin.pages.ui.grid', 'BlurAdmin.pages.ui.alerts', 'BlurAdmin.pages.ui.progressBars', 'BlurAdmin.pages.ui.notifications', 'BlurAdmin.pages.ui.tabs', 'BlurAdmin.pages.ui.slider', 'BlurAdmin.pages.ui.panels']` | `src/app/pages/ui/ui.module.js` |
| `BlurAdmin.pages.ui.alerts` | `[]` | `src/app/pages/ui/alerts/alerts.module.js` |
| `BlurAdmin.pages.ui.buttons` | `[]` | `src/app/pages/ui/buttons/buttons.module.js` |
| `BlurAdmin.pages.ui.grid` | `[]` | `src/app/pages/ui/grid/grid.module.js` |
| `BlurAdmin.pages.ui.icons` | `[]` | `src/app/pages/ui/icons/icons.module.js` |
| `BlurAdmin.pages.ui.modals` | `[]` | `src/app/pages/ui/modals/modals.module.js` |
| `BlurAdmin.pages.ui.notifications` | `[]` | `src/app/pages/ui/notifications/notifications.module.js` |
| `BlurAdmin.pages.ui.panels` | `[]` | `src/app/pages/ui/panels/panels.module.js` |
| `BlurAdmin.pages.ui.progressBars` | `[]` | `src/app/pages/ui/progressBars/progressBars.module.js` |
| `BlurAdmin.pages.ui.slider` | `[]` | `src/app/pages/ui/slider/slider.module.js` |
| `BlurAdmin.pages.ui.tabs` | `[]` | `src/app/pages/ui/tabs/tabs.module.js` |
| `BlurAdmin.pages.ui.typography` | `[]` | `src/app/pages/ui/typography/typography.module.js` |

Note: `BlurAdmin.pages.ui` is itself consumed by `BlurAdmin.pages` (`src/app/pages/pages.module.js`). All sub-modules declare `[]` deps and rely on globally-loaded `ui.router`, `ui.bootstrap`, `toastr`, `angular-progress-button-styles` and `BlurAdmin.theme` from `src/app/app.js`.

## 2. Registrations

| Type | Name | File | Notes |
|---|---|---|---|
| config | `routeConfig` (anonymous fn, `/** @ngInject */`) | `src/app/pages/ui/ui.module.js` | Injects `$stateProvider`; registers abstract `ui` state |
| config | `routeConfig` | `src/app/pages/ui/alerts/alerts.module.js` | `$stateProvider` → `ui.alerts` |
| config | `routeConfig` | `src/app/pages/ui/buttons/buttons.module.js` | `$stateProvider` → `ui.buttons` |
| config | `routeConfig` | `src/app/pages/ui/grid/grid.module.js` | `$stateProvider` → `ui.grid` |
| config | `routeConfig` | `src/app/pages/ui/icons/icons.module.js` | `$stateProvider` → `ui.icons` |
| config | `routeConfig` | `src/app/pages/ui/modals/modals.module.js` | `$stateProvider` → `ui.modals` |
| config | `routeConfig` | `src/app/pages/ui/notifications/notifications.module.js` | `$stateProvider` → `ui.notifications` |
| config | `routeConfig` | `src/app/pages/ui/panels/panels.module.js` | `$stateProvider` → `ui.panels` |
| config | `routeConfig` | `src/app/pages/ui/progressBars/progressBars.module.js` | `$stateProvider` → `ui.progressBars` |
| config | `routeConfig` | `src/app/pages/ui/slider/slider.module.js` | `$stateProvider` → `ui.slider` |
| config | `routeConfig` | `src/app/pages/ui/tabs/tabs.module.js` | `$stateProvider` → `ui.tabs` |
| config | `routeConfig` | `src/app/pages/ui/typography/typography.module.js` | `$stateProvider` → `ui.typography` |
| controller | `ButtonPageCtrl` | `src/app/pages/ui/buttons/ButtonPageCtrl.js` | Registered on `BlurAdmin.pages.ui.buttons`. Injects `$scope, $timeout`. Used by state `ui.buttons` (`buttons.html`); exposes `$scope.progressFunction()` returning a 3s `$timeout` promise consumed by `progress-button` in `buttons/widgets/progressButtons.html` (via `ng-include`, inherits scope). |
| controller | `IconsPageCtrl` | `src/app/pages/ui/icons/IconsPageCtrl.js` | Registered on `BlurAdmin.pages.ui.icons`. Injects `$scope`. Used by state `ui.icons` (`icons.html`); populates `$scope.icons.{kameleonIcons,kameleonRoundedIcons,ionicons,fontAwesomeIcons,socicon}` consumed by the 5 `icons/widgets/*.html` partials (via `include-with-scope`). |
| controller | `ModalsPageCtrl` | `src/app/pages/ui/modals/ModalsPageCtrl.js` | **Registered on `BlurAdmin.pages.ui.notifications`** (not `.modals` — module mismatch, file lives in modals/). Injects `$scope, $uibModal, baProgressModal`. Used by state `ui.modals` (`modals.html`); `$scope.open(page, size)` calls `$uibModal.open({animation, templateUrl: page, size, resolve: {items}})`; `$scope.openProgressDialog = baProgressModal.open`. |
| controller | `NotificationsCtrl` | `src/app/pages/ui/modals/notifications/NotificationsCtrl.js` | Registered on `BlurAdmin.pages.ui.modals`. Injects `$scope, toastr`. Used via `ng-controller="NotificationsCtrl"` in `modals/notifications/notifications.html` (ng-included from `modals.html`). 4 toastr calls (success/info/error/warning). |
| controller | `ProgressModalCtrl` | `src/app/pages/ui/modals/progressModal/ProgressModalCtrl.js` | Registered on `BlurAdmin.pages.ui.modals`. Injects `$timeout, baProgressModal` (**no `@ngInject` annotation** — relies on ng-annotate not being required or on non-minified DI). Used via `ng-controller="ProgressModalCtrl"` in `modals/progressModal/progressModal.html` (opened by `baProgressModal.open()` from theme). Recursive `$timeout(changeValue, 300)` increments progress by 10 until 100 then `baProgressModal.close()`. |
| controller | `NotificationsPageCtrl` | `src/app/pages/ui/notifications/NotificationsPageCtrl.js` | Registered on `BlurAdmin.pages.ui.notifications`. Injects `$scope, toastr, toastrConfig`. Used by state `ui.notifications` (`notifications.html`) **and reused by state `ui.panels`** (`panels.module.js`, panels.html doesn't reference any of its scope). Mutates global `toastrConfig` via `angular.extend` on `openToast()`, restores defaults on `$scope.$on('$destroy')`. Exposes `types`, `quotes`, `options`, `optionsStr`, `openToast`, `openRandomToast`, `clearToasts`, `clearLastToast`. |

No `directive`, `component`, `service`, `factory`, `provider`, `filter`, `constant`, `value`, or `run` registrations exist in this area (verified with ripgrep over `src/app/pages/ui/`).

## 3. ui.router states / routes

| State name | url | templateUrl / template | controller (+ controllerAs) | title / sidebarMeta | File |
|---|---|---|---|---|---|
| `ui` (**abstract: true**) | `/ui` | `template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>'` | — | title `UI Features`; sidebarMeta `{ icon: 'ion-android-laptop', order: 200 }` | `src/app/pages/ui/ui.module.js` |
| `ui.typography` | `/typography` | `app/pages/ui/typography/typography.html` | — | title `Typography`; sidebarMeta `{ order: 0 }` | `src/app/pages/ui/typography/typography.module.js` |
| `ui.buttons` | `/buttons` | `app/pages/ui/buttons/buttons.html` | `ButtonPageCtrl` (no controllerAs) | title `Buttons`; sidebarMeta `{ order: 100 }` | `src/app/pages/ui/buttons/buttons.module.js` |
| `ui.icons` | `/icons` | `app/pages/ui/icons/icons.html` | `IconsPageCtrl` | title `Icons`; sidebarMeta `{ order: 200 }` | `src/app/pages/ui/icons/icons.module.js` |
| `ui.modals` | `/modals` | `app/pages/ui/modals/modals.html` | `ModalsPageCtrl` | title `Modals`; sidebarMeta `{ order: 300 }` | `src/app/pages/ui/modals/modals.module.js` |
| `ui.grid` | `/grid` | `app/pages/ui/grid/grid.html` | — | title `Grid`; sidebarMeta `{ order: 400 }` | `src/app/pages/ui/grid/grid.module.js` |
| `ui.alerts` | `/alerts` | `app/pages/ui/alerts/alerts.html` | — | title `Alerts`; sidebarMeta `{ order: 500 }` | `src/app/pages/ui/alerts/alerts.module.js` |
| `ui.progressBars` | `/progressBars` | `app/pages/ui/progressBars/progressBars.html` | — | title `Progress Bars`; sidebarMeta `{ order: 600 }` | `src/app/pages/ui/progressBars/progressBars.module.js` |
| `ui.notifications` | `/notifications` | `app/pages/ui/notifications/notifications.html` | `NotificationsPageCtrl` | title `Notifications`; sidebarMeta `{ order: 700 }` | `src/app/pages/ui/notifications/notifications.module.js` |
| `ui.tabs` | `/tabs` | `app/pages/ui/tabs/tabs.html` | — | title `Tabs & Accordions`; sidebarMeta `{ order: 800 }` | `src/app/pages/ui/tabs/tabs.module.js` |
| `ui.slider` | `/slider` | `app/pages/ui/slider/slider.html` | — | title `Sliders`; sidebarMeta `{ order: 1000 }` | `src/app/pages/ui/slider/slider.module.js` |
| `ui.panels` | `/panels` | `app/pages/ui/panels/panels.html` | `NotificationsPageCtrl` (reused; see §2) | title `Panels`; sidebarMeta `{ order: 1100 }` | `src/app/pages/ui/panels/panels.module.js` |

- `$urlRouterProvider.otherwise`: **none** in this area.
- Abstract states: `ui` only.
- `baSidebarServiceProvider.addStaticItem`: **none** in this area (sidebar entries come from `sidebarMeta` on states, consumed by `baSidebarService` in the theme).
- No state uses `controllerAs`, `resolve`, `params`, or `data`.
- Non-standard state properties used: `title`, `sidebarMeta` (custom, read by theme's sidebar/page-title code).
- Nested partial loading (not routes): `ng-include` in `buttons.html` (6 widgets), `grid.html` (1), `modals.html` (1), `progressBars.html` (5), `tabs.html` (4); `include-with-scope` in `icons.html` (5); `$uibModal templateUrl` for 7 `modals/modalTemplates/*.html` plus `progressModal.html`.

## 4. Third-party AngularJS / Bower libraries consumed

| Library (bower name / angular module) | How used | Files where used |
|---|---|---|
| `angular-ui-router` / `ui.router` | `$stateProvider.state(...)`, `<ui-view autoscroll="true">` | All 12 `*.module.js` files under `src/app/pages/ui/`; `ui.module.js` (template) |
| `angular-bootstrap` (UI Bootstrap ~1.3.3) / `ui.bootstrap` | `$uibModal.open(...)` service; `$dismiss()` in modal templates; `uib-dropdown`, `uib-dropdown-toggle`, `uib-dropdown-menu`, `dropdown-append-to-body`; `uib-tabset`, `uib-tab`, `uib-tab-heading` (`active=` binding); `uib-accordion`, `uib-accordion-group`, `uib-accordion-heading` (`is-open`, `heading`, `panel-class`) | `modals/ModalsPageCtrl.js`; `modals/modalTemplates/*.html` (7 files, `$dismiss()`); `buttons/widgets/dropdowns.html`; `tabs/mainTabs.html`, `tabs/sideTabs.html`, `tabs/sampleAccordion.html`, `tabs/contextualAccordion.html`. Indirectly: `baProgressModal` (theme) uses `$uibModal`. |
| `angular-toastr` / `toastr` | `toastr.success/info/error/warning/clear(...)`, `toastrConfig` constant mutated via `angular.extend`; CSS classes `toast-top-right` etc. as `positionClass` values | `modals/notifications/NotificationsCtrl.js`; `notifications/NotificationsPageCtrl.js`; `notifications/notifications.html` (radio values) |
| `angular-progress-button-styles` / `angular-progress-button-styles` | `progress-button="progressFunction()"` directive with `pb-style` (shrink, rotate-angle-*, rotate-side-*, rotate-back, flip-open, slide-down, move-up, top-line, lateral-lines) and `pb-direction` (vertical) attributes | `buttons/widgets/progressButtons.html` (18 buttons); promise from `buttons/ButtonPageCtrl.js` |
| `ionrangeslider` (jQuery plugin, no angular module) | Consumed through theme directive `<ion-slider>` (`src/app/theme/directives/ionSlider.js`, which calls `$element.ionRangeSlider(...)`) with attrs `type`, `grid`, `min`, `max`, `from`, `to`, `step`, `prefix`, `postfix`, `prettify`, `prettify-separator`, `values`, `disable` | `slider/slider.html` (8 sliders) |
| `bootstrap` ~3.3.5 (CSS + `js/dropdown.js` only) | Grid (`row`, `col-*`, `col-*-offset-*`, `visible-xs-block`), `btn*`, `btn-group`, `btn-toolbar`, `alert`, `progress`/`progress-bar*`, `panel*`, `panel-group`, `modal-*`, `table table-bordered table-striped`, `table-responsive`, `form-control`, `caret`, `sr-only`, `close`, `divider`, `text-*`, `clearfix`, `data-toggle="modal"` attr | Every `.html` in the area |
| `Ionicons` ~2.0.1 (icon font, non-angular) | `ion-*` classes (e.g. `ion-android-download`, `ion-ios-close-empty`, `ion-flame`, `ion-heart`, `ion-settings`, list of 70 in IconsPageCtrl); sidebar icon `ion-android-laptop` | `ui.module.js`; `icons/IconsPageCtrl.js`; `icons/widgets/ionicons.html`; `buttons/widgets/iconButtons.html`; `modals/modalTemplates/*.html`; `tabs/contextualAccordion.html`; `tabs/sampleAccordion.html` |
| `font-awesome` ~4.4.0 (icon font, non-angular) | `fa fa-*` classes (35 listed in IconsPageCtrl); `fa pull-right` | `icons/IconsPageCtrl.js`; `icons/widgets/fontAwesomeIcons.html`; `tabs/sampleAccordion.html` |
| `jquery` ~3.1.1 | No direct `$`/`jQuery` calls in this area; required transitively by ionRangeSlider (via theme `ionSlider`) and Bootstrap dropdown JS | (indirect) `slider/slider.html` |
| `angular-animate` / `ngAnimate` | `$uibModal.open({animation: true})` | `modals/ModalsPageCtrl.js` |

Not used in this area (checked): smart-table, xeditable, textAngular, ng-js-tree, ui-select, ui-sortable, slimscroll, amCharts, Chartist, Morris, Chart.js, leaflet, fullcalendar, bootstrap-select, bootstrap-switch, bootstrap-tagsinput, easy-pie-chart, moment, highlight.js.

## 5. External non-Angular assets

| Asset | Where used |
|---|---|
| Bootstrap 3 CSS classes (grid, buttons, alerts, panels, progress, modal, table, forms) | All 47 `.html` files; `grid/baseGrid.html` is a verbatim copy of Bootstrap 3 grid docs incl. the "Grid options" table |
| Bootstrap 3 `data-toggle="modal"` attribute (inert — dropdown.js is the only Bootstrap JS loaded; modals are driven by `$uibModal`) | `modals/modals.html` (8 buttons) |
| Inline `style="width: NN%"` on progress bars | `progressBars/widgets/animated.html`, `basic.html`, `label.html`, `stacked.html`, `striped.html` |
| Ionicons icon font (`ion-*`) | see §4 |
| Font Awesome icon font (`fa fa-*`) | see §4 |
| Socicon icon font (`<i class="socicon">X</i>`, glyph selected by text content) — **not a bower dependency**; font shipped under theme assets/SCSS | `icons/widgets/socicon.html`; glyph list in `icons/IconsPageCtrl.js` |
| Kameleon SVG icons (`src/assets/img/theme/icon/kameleon/*.svg`) via `kameleonImg` filter | `icons/widgets/kameleon.html`, `icons/widgets/kameleonRounded.html`, `tabs/mainTabs.html` (Shop, Programming, Dna), `tabs/sideTabs.html` (Key, Phone-Booth); names in `icons/IconsPageCtrl.js` |
| Images `src/assets/img/app/typography/{banner,typo01,typo03,typo04,typo05,typo06}.png` via `appImage` filter | `typography/typography.html` |
| Custom theme CSS classes (`ba-panel*`, `with-scroll`, `xsmall-panel`, `medium-panel`, `bootstrap-panel`, `accordion-panel`, `tabs-panel`, `tabs-left`/`tabs-right`, `kameleon-icon`, `with-round-bg`, `custom-checkbox`, `custom-radio`, `btn-raised`, `btn-mm/btn-md/btn-xm`, `btn-icon`, `btn-with-icon`, `light-text`, `blur` lists, `accent`, `red-text`, `yellow-text`, `sn-link-close`, `modal-icon`, `bg-success/info/warning/danger`) | Throughout; defined in `src/sass/theme/**` and area SCSS below |
| Area-specific SCSS partials (under `src/sass/app/`): `_alerts.scss`, `_buttonsPage.scss` (incl. `.progress-buttons-container`), `_grid.scss` (`.show-grid`), `_iconsPage.scss` (`.icons-list`, icon-hover mixin), `_modals.scss`, `_modalNotifications.scss` (`.toast*` toastr colours), `_notifications.scss` (`.control`, `.toastr-radio-setup`), `_slider.scss` (`.slider-box`, `.irs-*` ionRangeSlider overrides), `_tabsPage.scss` (`.tabset-group`, `.panel.tabs-panel`), `_typography.scss` | Styles for `alerts.html`, `buttons/**`, `grid/**`, `icons/**`, `modals/**`, `modals/notifications/**`, `notifications/**`, `slider.html`, `tabs/**`, `typography.html` respectively |
| External URLs (anchor links only, `target="_blank"`, no script loading): `http://fortawesome.github.io/Font-Awesome/icons/`, `http://ionicons.com/`, `http://www.kameleon.pics/` (x2), `http://www.socicon.com/chart.php` | `icons/widgets/fontAwesomeIcons.html`, `ionicons.html`, `kameleon.html`, `kameleonRounded.html`, `socicon.html` |
| CDN scripts / inline `<script>` / Google Maps | **None** in this area |
| Raw jQuery / `$` usage | **None** in this area's JS |

## 6. Cross-area dependencies

All defined in `BlurAdmin.theme` (`src/app/theme/`) unless noted.

| Dependency | Kind / defined in | Used in (this area) |
|---|---|---|
| `baPanel` directive (`ba-panel`, `ba-panel-title`, `ba-panel-class`) | directive, `src/app/theme/components/baPanel/baPanel.directive.js` (+ `baPanel.service.js` factory) | `alerts/alerts.html`, `buttons/buttons.html`, `grid/grid.html`, `icons/icons.html`, `modals/modals.html`, `notifications/notifications.html`, `panels/panels.html`, `progressBars/progressBars.html`, `slider/slider.html`, `tabs/tabs.html`, `tabs/sideTabs.html`, `typography/typography.html` |
| `baProgressModal` | factory, `src/app/theme/services/baProgressModal.js` (wraps `$uibModal`; hard-codes `templateUrl: 'app/pages/ui/modals/progressModal/progressModal.html'` — **reverse dependency: theme → this area**) | `modals/ModalsPageCtrl.js` (`open`), `modals/progressModal/ProgressModalCtrl.js` (`setProgress`, `getProgress`, `close`) |
| `progressBarRound` directive (`<progress-bar-round>`) | directive, `src/app/theme/components/progressBarRound/progressBarRound.directive.js` | `modals/progressModal/progressModal.html` |
| `includeWithScope` directive (`include-with-scope="..."`, restrict `AE`, dynamic `templateUrl`) | directive, `src/app/theme/directives/includeWithScope.js` | `icons/icons.html` (5 uses) |
| `ionSlider` directive (`<ion-slider>`, isolate scope, jQuery ionRangeSlider) | directive, `src/app/theme/directives/ionSlider.js` | `slider/slider.html` |
| `kameleonImg` filter | filter, `src/app/theme/filters/image/kameleonImg.js` | `icons/widgets/kameleon.html`, `icons/widgets/kameleonRounded.html`, `tabs/mainTabs.html`, `tabs/sideTabs.html` |
| `appImage` filter | filter, `src/app/theme/filters/image/appImage.js` | `typography/typography.html` (6 images) |
| `autoscroll-body-top` attribute on `<ui-view>` | handled in `src/app/theme/theme.config.js` (`baUtil.hasAttr(uiViewElement, "autoscroll-body-top")` on `$stateChangeSuccess`) | `ui.module.js` |
| `title` / `sidebarMeta` state properties | consumed by theme sidebar (`baSidebarService`) and page-title logic | all `*.module.js` |
| `$uibModal`, `toastr`, `toastrConfig` | third-party (§4), registered globally in `src/app/app.js` / `src/app/theme/theme.module.js` | `ModalsPageCtrl.js`, `NotificationsCtrl.js`, `NotificationsPageCtrl.js` |
| `progress-button` directive | third-party `angular-progress-button-styles` (module listed in `src/app/app.js`) | `buttons/widgets/progressButtons.html` |
| Global CSS from `src/sass/theme/**` (`bg-*`, `btn-raised`, `custom-checkbox`, `kameleon-icon`, panel sizes, etc.) | theme SCSS | throughout |

Not used in this area: `baConfig`, `baSidebarService` (directly), `layoutPaths`, `baUtil` (directly), `colorHelper`, `profilePicture` filter.

## 7. Migration risk notes

- **Controller/module mismatch**: `ModalsPageCtrl` is registered on `BlurAdmin.pages.ui.notifications` while living in `modals/`; `NotificationsCtrl`/`ProgressModalCtrl` are on `.modals`. Works only because all modules load into one injector; must be untangled when converting to NgModules/standalone components.
- **Controller reuse across states**: `ui.panels` uses `NotificationsPageCtrl` for no functional reason; that controller mutates the global `toastrConfig` on entry/exit — porting panels as a dumb component removes the side effect (probably desirable, but note behavior change).
- **Global mutable config**: `NotificationsPageCtrl` uses `angular.extend(toastrConfig, $scope.options)` and restores on `$destroy` — app-wide toastr config mutation; in Angular this becomes per-call `ToastrService` options / `ToastrModule.forRoot` instead.
- **Missing `@ngInject`** on `ProgressModalCtrl` — minification-unsafe DI (ng-annotate may still infer it; verify build).
- **Reverse dependency theme → pages**: `baProgressModal` (theme) hard-codes `templateUrl` to `app/pages/ui/modals/progressModal/progressModal.html`; the progress dialog logic is split between a theme service and a page controller/template. Move both sides together (service + component) when migrating.
- **Timers**: `$timeout` in `ButtonPageCtrl` (3s fake promise for progress buttons) and recursive `$timeout(changeValue, 300)` in `ProgressModalCtrl` — port to RxJS `timer`/`interval` with teardown.
- **`$scope`-based controllers + `ng-include` scope inheritance**: `buttons/widgets/progressButtons.html`, `icons/widgets/*.html` and `modals/notifications/notifications.html` rely on inherited `$scope` from a parent state controller (`progressFunction`, `icons`) or on `ng-controller` inside an included partial. `include-with-scope` (theme) exists solely to work around `ng-include` child-scope. Convert each partial to a child component with `@Input()`s.
- **Template-prefix `::` one-time bindings** (`{{::( 'Key' | kameleonImg )}}`) — trivial in Angular pipes, but note they're used in 5 files.
- **`$uibModal` templates use `$dismiss()`** on modal scope (7 modal templates) — Angular equivalents (ng-bootstrap `NgbActiveModal.dismiss()`, or Angular Material) require a component per modal or a generic modal component with content projection; `resolve: {items: ...}` in `ModalsPageCtrl.open` resolves `$scope.items` which is never defined (dead code).
- **`$uibModal` / UI Bootstrap widgets**: dropdowns (`uib-dropdown` + `dropdown-append-to-body`), tabset with `active` binding and a dropdown-in-tab-heading hack (`$tabSetStatus.activeTab`, `$dropdownTabActive` set via `ng-init` and `$event.stopPropagation()` in `tabs/mainTabs.html`), accordions with `panel-class`. These need ng-bootstrap/Angular Material rewrites; the dropdown-tab hack has no direct equivalent.
- **jQuery plugin under the hood**: `slider.html` relies on theme `ionSlider` directive which wraps jQuery `ionRangeSlider` with 5 `$scope.$watch` + `$timeout` calls and `replace: true`. Either wrap the same jQuery plugin in an Angular component or replace with a native/Angular slider.
- **`progress-button` directive** (`angular-progress-button-styles`) has no Angular equivalent; CSS-animation-heavy library with 18 `pb-style` variants — likely rewrite as a small Angular directive reusing the library CSS.
- **Bootstrap 3 markup everywhere**: `panel`, `btn-xs`, `col-*-offset-*`, `visible-xs-block`, `progress-bar-striped active`, `caret`, `data-toggle="modal"` (dead attribute). Moving to Bootstrap 4/5 changes most class names; `grid/baseGrid.html` is literally Bootstrap 3 docs.
- **Custom, non-bower Socicon font** and Kameleon SVG assets via `kameleonImg`/`appImage` filters — filters are simple path builders (`layoutPaths`), straightforward to convert to pipes, but asset paths depend on the Gulp build layout.
- **Dead/inert attributes**: `data-toggle="modal"` (no Bootstrap modal JS loaded), `disable="false"` string attrs on `ion-slider` (isolate `=` binding evaluates to boolean, fine), `value="0"` alongside `ng-model` on `#maxOpened`.
- **`$templateCache`**: not referenced directly, but all `templateUrl`/`ng-include` paths (`app/pages/ui/...`) assume the Gulp `templateCache` bundling and root-relative asset layout; Angular CLI build changes this.
- No `$rootScope` events, no `$watch` in area JS, no direct DOM/jQuery, no global `window` objects (AmCharts/google/L), no inline scripts, no CDN scripts — the area is low-risk apart from the UI-Bootstrap/toastr/progress-button/ionRangeSlider wrappers above.

## 8. File list

| File | Description |
|---|---|
| `src/app/pages/ui/ui.module.js` | Parent module `BlurAdmin.pages.ui`; abstract state `ui` (`/ui`) with inline `<ui-view>` template, sidebar icon `ion-android-laptop`, order 200 |
| `src/app/pages/ui/alerts/alerts.module.js` | Module + state `ui.alerts` (`/alerts`, order 500) |
| `src/app/pages/ui/alerts/alerts.html` | 4 `ba-panel`s of Bootstrap 3 alerts (basic, dismissible, with links, composite) — static markup |
| `src/app/pages/ui/buttons/buttons.module.js` | Module + state `ui.buttons` (`/buttons`, `ButtonPageCtrl`, order 100) |
| `src/app/pages/ui/buttons/ButtonPageCtrl.js` | Controller exposing `progressFunction()` → 3s `$timeout` promise for progress buttons |
| `src/app/pages/ui/buttons/buttons.html` | Buttons page: flat/raised/sizes/disabled panels + `ng-include` of 6 widget partials |
| `src/app/pages/ui/buttons/widgets/buttonGroups.html` | Bootstrap `btn-group` / `btn-toolbar` examples |
| `src/app/pages/ui/buttons/widgets/buttons.html` | Default/small/xs/disabled button matrix (partial; **not included anywhere** — orphan) |
| `src/app/pages/ui/buttons/widgets/dropdowns.html` | 12 `uib-dropdown` button dropdowns (6 plain, 6 split) with `dropdown-append-to-body` |
| `src/app/pages/ui/buttons/widgets/iconButtons.html` | Icon-only and icon+text buttons using Ionicons |
| `src/app/pages/ui/buttons/widgets/largeButtons.html` | 6 `btn-lg` buttons |
| `src/app/pages/ui/buttons/widgets/progressButtons.html` | 18 `progress-button` demos with `pb-style` / `pb-direction` variants |
| `src/app/pages/ui/grid/grid.module.js` | Module + state `ui.grid` (`/grid`, order 400) |
| `src/app/pages/ui/grid/grid.html` | Single `ba-panel` (titled "Inline Form" — copy/paste artifact) including `baseGrid.html` |
| `src/app/pages/ui/grid/baseGrid.html` | Bootstrap 3 grid documentation examples + "Grid options" table |
| `src/app/pages/ui/icons/icons.module.js` | Module + state `ui.icons` (`/icons`, `IconsPageCtrl`, order 200) |
| `src/app/pages/ui/icons/IconsPageCtrl.js` | Controller with static icon lists: 30 kameleon, 15 kameleonRounded (with color), 70 ionicons, 35 font-awesome, 85 socicon glyph chars |
| `src/app/pages/ui/icons/icons.html` | 5 `ba-panel`s each using `include-with-scope` for a widget partial |
| `src/app/pages/ui/icons/widgets/fontAwesomeIcons.html` | `ng-repeat` over `icons.fontAwesomeIcons`; link to Font Awesome site |
| `src/app/pages/ui/icons/widgets/ionicons.html` | `ng-repeat` over `icons.ionicons`; link to ionicons.com |
| `src/app/pages/ui/icons/widgets/kameleon.html` | `ng-repeat` over `icons.kameleonIcons` with `kameleonImg` filter; link to kameleon.pics |
| `src/app/pages/ui/icons/widgets/kameleonRounded.html` | `ng-repeat` over `icons.kameleonRoundedIcons` with colored round background |
| `src/app/pages/ui/icons/widgets/socicon.html` | `ng-repeat` over `icons.socicon` glyph characters; link to socicon.com |
| `src/app/pages/ui/modals/modals.module.js` | Module + state `ui.modals` (`/modals`, `ModalsPageCtrl`, order 300) |
| `src/app/pages/ui/modals/ModalsPageCtrl.js` | Controller (registered on `.notifications` module) — `open(page,size)` via `$uibModal`, `openProgressDialog` via `baProgressModal` |
| `src/app/pages/ui/modals/modals.html` | Buttons opening default/large/small modals, 4 message modals, includes notifications partial, progress-dialog button |
| `src/app/pages/ui/modals/modalTemplates/basicModal.html` | Generic modal (header w/ close, body, "Save changes") |
| `src/app/pages/ui/modals/modalTemplates/largeModal.html` | Same as basic, opened with size `lg` |
| `src/app/pages/ui/modals/modalTemplates/smallModal.html` | Same as basic, opened with size `sm` |
| `src/app/pages/ui/modals/modalTemplates/successModal.html` | `bg-success` header with `ion-checkmark`, OK button |
| `src/app/pages/ui/modals/modalTemplates/infoModal.html` | `bg-info` header with `ion-information-circled`, OK button |
| `src/app/pages/ui/modals/modalTemplates/warningModal.html` | `bg-warning` header with `ion-android-warning`, OK button |
| `src/app/pages/ui/modals/modalTemplates/dangerModal.html` | `bg-danger` header with `ion-flame`, OK button |
| `src/app/pages/ui/modals/notifications/NotificationsCtrl.js` | Controller with 4 `toastr.*` demo methods |
| `src/app/pages/ui/modals/notifications/notifications.html` | 4 buttons under `ng-controller="NotificationsCtrl"` |
| `src/app/pages/ui/modals/progressModal/ProgressModalCtrl.js` | Controller driving `baProgressModal` progress 0→100 in steps of 10 every 300ms then closes |
| `src/app/pages/ui/modals/progressModal/progressModal.html` | Modal body with `<progress-bar-round>` under `ng-controller="ProgressModalCtrl"`; opened by theme `baProgressModal` |
| `src/app/pages/ui/notifications/notifications.module.js` | Module + state `ui.notifications` (`/notifications`, `NotificationsPageCtrl`, order 700) |
| `src/app/pages/ui/notifications/NotificationsPageCtrl.js` | Toastr playground controller: options model, random quotes, mutates `toastrConfig`, builds `optionsStr` code sample, restores config on `$destroy` |
| `src/app/pages/ui/notifications/notifications.html` | Toastr option form (title, message, checkboxes, type/position radios, timeouts, maxOpened), result `<pre>`, 4 action buttons |
| `src/app/pages/ui/panels/panels.module.js` | Module + state `ui.panels` (`/panels`, reuses `NotificationsPageCtrl`, order 1100) |
| `src/app/pages/ui/panels/panels.html` | Static demo of `ba-panel` variants and Bootstrap 3 panels (default, heading, footer, contextual, panel-group) |
| `src/app/pages/ui/progressBars/progressBars.module.js` | Module + state `ui.progressBars` (`/progressBars`, order 600) |
| `src/app/pages/ui/progressBars/progressBars.html` | 5 `ba-panel`s including the widget partials |
| `src/app/pages/ui/progressBars/widgets/basic.html` | 4 Bootstrap progress bars (inline width styles) |
| `src/app/pages/ui/progressBars/widgets/striped.html` | 4 striped progress bars |
| `src/app/pages/ui/progressBars/widgets/label.html` | 4 progress bars with visible labels |
| `src/app/pages/ui/progressBars/widgets/animated.html` | 4 striped `active` (animated) progress bars |
| `src/app/pages/ui/progressBars/widgets/stacked.html` | One stacked progress bar with 4 segments |
| `src/app/pages/ui/slider/slider.module.js` | Module + state `ui.slider` (`/slider`, order 1000) |
| `src/app/pages/ui/slider/slider.html` | 8 `<ion-slider>` demos (basic, prefix, postfix, double range, steps, prettify, values array, disabled) |
| `src/app/pages/ui/tabs/tabs.module.js` | Module + state `ui.tabs` (`/tabs`, order 800) |
| `src/app/pages/ui/tabs/tabs.html` | Layout including `mainTabs`, `sideTabs`, `sampleAccordion`, `contextualAccordion` partials |
| `src/app/pages/ui/tabs/mainTabs.html` | `uib-tabset` with `active="$tabSetStatus.activeTab"`, kameleon icons, and a dropdown tab heading hack (`$dropdownTabActive`) |
| `src/app/pages/ui/tabs/sideTabs.html` | Two `ba-panel`s with `uib-tabset` in `tabs-left` / `tabs-right` orientations, kameleon icons |
| `src/app/pages/ui/tabs/sampleAccordion.html` | `uib-accordion` with `is-open`, custom `uib-accordion-heading` markup |
| `src/app/pages/ui/tabs/contextualAccordion.html` | `uib-accordion` with contextual `panel-class` (primary/success/info/warning/danger) and Ionicons |
| `src/app/pages/ui/typography/typography.module.js` | Module + state `ui.typography` (`/typography`, order 0) |
| `src/app/pages/ui/typography/typography.html` | Static typography samples (headings, text styles, lists, colors/links) plus banner and column images via `appImage` filter |

Related SCSS (outside the area root, clearly area-specific): `src/sass/app/_alerts.scss`, `_buttonsPage.scss`, `_grid.scss`, `_iconsPage.scss`, `_modals.scss`, `_modalNotifications.scss`, `_notifications.scss`, `_slider.scss`, `_tabsPage.scss`, `_typography.scss`.
