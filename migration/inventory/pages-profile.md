# Inventory: pages/profile

Source path: `src/app/pages/profile/` (4 files) plus area-specific SCSS `src/sass/app/_profile.scss` (imported from `src/sass/main.scss:53`). Module is registered as a dependency of `BlurAdmin.pages` in `src/app/pages/pages.module.js:18`.

## 1. Modules

| module name | dependency list (verbatim array) | file |
|---|---|---|
| `BlurAdmin.pages.profile` | `[]` | src/app/pages/profile/profile.module.js |

## 2. Registrations

| type | name | file | notes |
|---|---|---|---|
| config | `routeConfig` | src/app/pages/profile/profile.module.js | Injects `$stateProvider`; registers the `profile` state (see §3). `/** @ngInject */` annotated. |
| controller | `ProfilePageCtrl` | src/app/pages/profile/ProfilePageCtrl.js | Used by state `profile` (template `app/pages/profile/profile.html`), `$scope`-style (no controllerAs). Injects `$scope, fileReader, $filter, $uibModal`. Exposes `picture`, `noPicture`, `removePicture()`, `uploadPicture()` (DOM `document.getElementById('uploadFile').click()`), `socialProfiles[]`, `unconnect(item)`, `showModal(item)` (opens `$uibModal` with `ProfileModalCtrl`), `getFile()` (reads `$scope.file` via `fileReader.readAsDataUrl`), `switches[]`. |
| controller | `ProfileModalCtrl` | src/app/pages/profile/ProfileModalCtrl.js | Used by the `$uibModal.open({...})` call in `ProfilePageCtrl.showModal`, template `app/pages/profile/profileModal.html`. Injects `$scope, $uibModalInstance`. Exposes `link`, `ok()` → `$uibModalInstance.close($scope.link)`. |

No directives, components, services, factories, providers, filters, constants, values, or `run` blocks are defined in this area.

## 3. ui.router states / routes

| state name | url | templateUrl / template | controller (+ controllerAs) | title / sidebarMeta (icon, order) | file |
|---|---|---|---|---|---|
| `profile` | `/profile` | templateUrl `app/pages/profile/profile.html` | `ProfilePageCtrl` (no controllerAs; `$scope` based) | title `Profile`; **no `sidebarMeta`** on the state | src/app/pages/profile/profile.module.js |

- No `$urlRouterProvider.otherwise` in this area.
- No abstract states in this area.
- No `baSidebarServiceProvider.addStaticItem` calls in this area. The sidebar entry for this page is defined **outside** the area: `src/app/pages/pages.module.js:38-40` adds a sub-item `{ title: 'User Profile', stateRef: 'profile' }` under the static "Pages" sidebar item via `baSidebarServiceProvider.addStaticItem`.

## 4. Third-party AngularJS / Bower libraries consumed

| library (bower name + angular module name) | how used | files where used |
|---|---|---|
| angular-ui-router / `ui.router` | `$stateProvider.state('profile', …)` in config block | src/app/pages/profile/profile.module.js |
| angular-bootstrap / `ui.bootstrap` | `$uibModal.open({animation:false, controller:'ProfileModalCtrl', templateUrl:…}).result.then(…)`; `$uibModalInstance.close(...)`; template uses `$dismiss()` on the modal scope | src/app/pages/profile/ProfilePageCtrl.js, src/app/pages/profile/ProfileModalCtrl.js, src/app/pages/profile/profileModal.html |
| bootstrap-select (jQuery plugin, wrapped by the in-repo `selectpicker` directive from `pages/form`) | `<select class="form-control" selectpicker>` ×2 (Department, Office Location) | src/app/pages/profile/profile.html |
| bootstrap-switch (jQuery plugin, wrapped by the in-repo `switch` directive from `pages/form`) | `<switch color="primary" ng-model="switches[n]">` ×6 | src/app/pages/profile/profile.html |
| Ionicons (bower `Ionicons`, icon font) | classes `ion-ios-close-outline`, `ion-ios-close-empty`, `ion-android-checkmark-circle` | src/app/pages/profile/profile.html, src/app/pages/profile/profileModal.html |
| socicon (icon font shipped in `src/assets/fonts`, styled by `src/sass/theme/_socicon.scss`) | classes `socicon socicon-facebook|twitter|google|linkedin|github|stackoverflow|dribble|behace` (from `socialProfiles[].icon`) | src/app/pages/profile/ProfilePageCtrl.js, src/app/pages/profile/profile.html |
| Bootstrap 3 (CSS) | grid/form/progress/modal/button classes (see §5) | src/app/pages/profile/profile.html, src/app/pages/profile/profileModal.html |

Not used in this area: smart-table, toastr, angular-xeditable, textAngular, js-tree, ui-select, ui-sortable, slimscroll, progress-button, amCharts, Chartist, Morris, Chart.js, leaflet, fullcalendar, ionRangeSlider, bootstrap-tagsinput, easy-pie-chart, moment, highlight.js, font-awesome.

## 5. External non-Angular assets

| asset | where used |
|---|---|
| Raw DOM API: `document.getElementById('uploadFile').click()` | src/app/pages/profile/ProfilePageCtrl.js:21-22 |
| Browser `FileReader` API (indirectly via `fileReader` theme service) | src/app/pages/profile/ProfilePageCtrl.js:80 (`fileReader.readAsDataUrl`) |
| Bootstrap 3 CSS classes: `row`, `col-md-6`, `col-md-3`, `col-sm-3/4/6/9`, `col-xs-4/8`, `form-group`, `form-control`, `control-label`, `clearfix`, `progress`, `progress-bar progress-bar-primary progress-bar-striped active`, `btn btn-primary`, `close` | src/app/pages/profile/profile.html |
| Bootstrap 3 modal markup: `modal-content`, `modal-header`, `modal-title`, `modal-body`, `modal-footer`, `close` | src/app/pages/profile/profileModal.html |
| Bootstrap 3 inline style `style="width: 70%"` on progress bar (static, hard-coded 70%) | src/app/pages/profile/profile.html:6 |
| bootstrap-select jQuery plugin (via `selectpicker` attribute directive) | src/app/pages/profile/profile.html:54,120 |
| bootstrap-switch jQuery plugin (via `<switch>` directive) | src/app/pages/profile/profile.html:164-202 |
| Ionicons icon font | src/app/pages/profile/profile.html:22,151,208; src/app/pages/profile/profileModal.html:4 |
| socicon icon font (`src/assets/fonts/socicon.*`, `src/sass/theme/_socicon.scss`) | src/app/pages/profile/profile.html:144,149; icon names in src/app/pages/profile/ProfilePageCtrl.js:30-61 |
| Image `src/assets/img/app/profile/Nasta.png` (resolved by `profilePicture` filter → `layoutPaths.images.profile + 'Nasta.png'`) | src/app/pages/profile/ProfilePageCtrl.js:13 |
| Image `src/assets/img/theme/no-photo.png` (resolved by `appImage` filter) | src/app/pages/profile/ProfilePageCtrl.js:16 |
| SCSS partial `src/sass/app/_profile.scss` (classes `with-line`, `profile-block`, `notification`, `userpic`, `userpic-wrapper`, `change-userpic`, `save-profile`, `sn-link`, `connected`, `sn-link-close`, `social-profiles`, `profile-page`, `close`; uses theme vars `$border`, `$default-text`, `$font-normal`, `$font-light`, `$default`, `$primary`, `$primary-light`, `$danger`) | imported by src/sass/main.scss:53; classes consumed in src/app/pages/profile/profile.html and profileModal.html |
| External URLs (opened via `target="_blank"` links): `https://www.facebook.com/akveo/`, `https://twitter.com/akveo_inc`, `https://www.linkedin.com/company/akveo`, `https://github.com/akveo` | src/app/pages/profile/ProfilePageCtrl.js:29,34,44,49 |
| Hard-coded demo form values (`Anastasiya`, `Front End Web Developer`, `12345678`, `contact@akveo.com`, `+1 (23) 456 7890`, `303`) via HTML `value=` attributes (not bound to scope) | src/app/pages/profile/profile.html |

No Google Maps script, CDN `<script>` tags, or inline `<script>` blocks in this area.

## 6. Cross-area dependencies

| dependency | defined in | used in this area |
|---|---|---|
| `fileReader` service (`BlurAdmin.theme`) | src/app/theme/services/fileReader.js | ProfilePageCtrl.js:12,80 — `readAsDataUrl($scope.file, $scope)` |
| `profilePicture` filter (`BlurAdmin.theme`; depends on `layoutPaths`) | src/app/theme/filters/image/profilePicture.js | ProfilePageCtrl.js:13 via `$filter('profilePicture')('Nasta')` |
| `appImage` filter (`BlurAdmin.theme`; depends on `layoutPaths`) | src/app/theme/filters/image/appImage.js | ProfilePageCtrl.js:16 via `$filter('appImage')('theme/no-photo.png')` |
| `layoutPaths` constant (transitively, `images.profile`) | src/app/theme/theme.constants.js:18 | via the two filters above |
| `baPanel` directive (`ba-panel`, `ba-panel-class`) | src/app/theme/components/baPanel/baPanel.directive.js | profile.html:1 |
| `ngFileSelect` directive (`ng-file-select`) — binds `change` on the hidden file input, sets `$scope.file`, calls `$scope.getFile()` | src/app/theme/directives/ngFileSelect.js | profile.html:24 (attribute value `onFileSelect($files)` is ignored by the directive; it calls `getFile()` directly) |
| `switch` directive (bootstrap-switch wrapper) | src/app/pages/form/inputs/widgets/oldSwitches/switch.directive.js (module `BlurAdmin.pages.form.inputs`) | profile.html:164-202 |
| `selectpicker` directive (bootstrap-select wrapper) | src/app/pages/form/inputs/widgets/oldSelect/selectpicker.directive.js (module `BlurAdmin.pages.form.inputs`) | profile.html:54,120 |
| `$uibModal` / `$uibModalInstance` / `$dismiss()` (`ui.bootstrap`, loaded at app level) | bower dep angular-bootstrap | ProfilePageCtrl.js, ProfileModalCtrl.js, profileModal.html |
| `baSidebarServiceProvider.addStaticItem` sidebar entry `{ title: 'User Profile', stateRef: 'profile' }` (inverse dependency: another area links to this state) | src/app/pages/pages.module.js:38-40 | — |
| Theme SCSS variables (`$border`, `$default-text`, `$font-normal`, `$font-light`, `$default`, `$primary`, `$primary-light`, `$danger`) | src/sass/theme/conf/* | src/sass/app/_profile.scss |

Note: the area's module declares `[]` deps yet relies on `ui.router`, `ui.bootstrap`, `BlurAdmin.theme` and `BlurAdmin.pages.form.inputs` being loaded by the root/pages modules — an implicit-global-injector dependency.

## 7. Migration risk notes

- **Direct DOM manipulation**: `document.getElementById('uploadFile').click()` in `ProfilePageCtrl.uploadPicture` — replace with `@ViewChild` / template ref in Angular.
- **Implicit module dependencies**: `BlurAdmin.pages.profile` declares `[]` but injects `$stateProvider`, `$uibModal`, `fileReader`, `$filter` and uses `baPanel`, `ngFileSelect`, `switch`, `selectpicker` directives from other modules (incl. `pages/form/inputs` — a cross-*page* dependency). Must be made explicit when downgrading/upgrading.
- **`$scope`-based controllers, no controllerAs**: both controllers write to `$scope`; template relies on scope inheritance (`link` on the modal, `$dismiss()` from ui.bootstrap). Requires rewrite to component classes.
- **Scope coupling with `ngFileSelect` + `fileReader`**: the theme directive mutates `$scope.file` and calls `$scope.getFile()` on the *parent* scope; `fileReader` calls `scope.$apply` and `scope.$broadcast('fileProgress', …)`. Tight `$scope` contract — replace with `(change)` handler + a `FileReader` service returning an Observable/Promise.
- **`$filter` used programmatically** (`profilePicture`, `appImage`) — convert to injected services/pipes; both depend on the `layoutPaths` constant (asset path resolution).
- **ui.bootstrap `$uibModal`** with string `controller` name and `templateUrl` (resolved from `$templateCache` populated by the gulp templateCache task) — needs ng-bootstrap/CDK dialog; `.result` promise → `afterClosed()`.
- **jQuery-plugin-backed widgets**: `selectpicker` (bootstrap-select) and `switch` (bootstrap-switch) directives wrap jQuery plugins that operate on the DOM; there are no Angular equivalents without adding libs (or plain `<select>`/`mat-slide-toggle`).
- **Static/unbound form**: most inputs use raw HTML `value=` attributes and no `ng-model`, no form submit handler ("Update Profile" button does nothing); progress bar hard-coded to 70%. Behaviour to define, not port.
- **`ng-mousedown="unconnect(item)"`** on a link inside an `<a target=_blank>` — event ordering quirk to preserve or redesign.
- **Icon fonts** (Ionicons 2, socicon) and Bootstrap 3 grid/form classes: styling depends on global SCSS (`_profile.scss` imported into `main.scss`, with unscoped selectors like `.close`, `h3.with-line`, `.notification` that leak globally).
- **`templateUrl` paths** (`app/pages/profile/*.html`) rely on the build-time `$templateCache` bundle.
- No `$watch`, `$rootScope` events, timers/intervals, global chart/map objects, inline scripts, or CDN scripts in this area — overall **low-to-medium** complexity.

## 8. File list

| file | description |
|---|---|
| src/app/pages/profile/profile.module.js | Declares `BlurAdmin.pages.profile` module (no deps) and `routeConfig` registering ui.router state `profile` (`/profile`, `ProfilePageCtrl`, title "Profile"). |
| src/app/pages/profile/ProfilePageCtrl.js | Page controller: profile picture (load via `profilePicture` filter, remove via `appImage`, upload via hidden file input + `fileReader`), `socialProfiles` list with connect (`$uibModal` → `ProfileModalCtrl`) / unconnect, notification `switches` array. |
| src/app/pages/profile/ProfileModalCtrl.js | Modal controller: holds `$scope.link`, `ok()` closes `$uibModalInstance` with the link. |
| src/app/pages/profile/profile.html | Profile page template inside `ba-panel`: progress bar, general info form (userpic, names, `selectpicker` department/location), change password, contact info, social profiles grid (socicon), email-notification `<switch>` toggles, "Update Profile" button. |
| src/app/pages/profile/profileModal.html | "Add Account" Bootstrap modal template: link text input bound to `link`, Save (`ok(link)`) and close (`$dismiss()`). |
| src/sass/app/_profile.scss | Area-specific styles: `.with-line` headings, `.profile-block`, `.notification`, `.userpic` hover overlay, `.sn-link`/`.connected` social buttons, `.social-profiles`, `.save-profile`, `.close`, `.profile-page` form typography. Imported from `src/sass/main.scss`. |
