# Inventory: pages/components

Source: `src/app/pages/components/` (mail/, timeline/, tree/) plus area-specific SCSS `src/sass/app/_email.scss`, `src/sass/app/_tree.scss`, `src/sass/theme/_tree.scss` (empty), `src/sass/theme/dashboard/_timeline.scss`. Read-only inventory; no repo changes made.

## 1. Modules

| module name | dependency list (verbatim array) | file |
|---|---|---|
| `BlurAdmin.pages.components` | `['BlurAdmin.pages.components.mail', 'BlurAdmin.pages.components.timeline', 'BlurAdmin.pages.components.tree']` | src/app/pages/components/components.module.js |
| `BlurAdmin.pages.components.mail` | `[]` | src/app/pages/components/mail/mail.module.js |
| `BlurAdmin.pages.components.timeline` | `[]` | src/app/pages/components/timeline/timeline.module.js |
| `BlurAdmin.pages.components.tree` | `[]` | src/app/pages/components/tree/tree.module.js |

`BlurAdmin.pages.components` is pulled in by `BlurAdmin.pages` (src/app/pages/pages.module.js:13). The sub-modules declare no deps of their own; `ui.router`, `ui.bootstrap`, `textAngular`, `ngJsTree` are provided transitively via `BlurAdmin` (src/app/app.js) / `BlurAdmin.theme` (src/app/theme/theme.module.js).

## 2. Registrations

| type | name | file | notes |
|---|---|---|---|
| config | `routeConfig` (anonymous fn, `@ngInject`) | src/app/pages/components/components.module.js | injects `$stateProvider`; registers abstract `components` state |
| config | `routeConfig` | src/app/pages/components/mail/mail.module.js | injects `$stateProvider`, `$urlRouterProvider`; registers 3 mail states + `$urlRouterProvider.when` |
| config | `routeConfig` | src/app/pages/components/timeline/timeline.module.js | injects `$stateProvider`; registers `components.timeline` |
| config | `routeConfig` | src/app/pages/components/tree/tree.module.js | injects `$stateProvider`; registers `components.tree` |
| config | (anonymous, no DI) | src/app/pages/components/tree/tree.module.js | mutates global `$.jstree.defaults.core.themes.url = true` and `.themes.dir = "assets/img/theme/vendor/jstree/dist/themes"` |
| controller | `MailTabCtrl` | src/app/pages/components/mail/MailTabCtrl.js | used by state `components.mail` (mail.html) as `tabCtrl`; injects `composeModal`, `mailMessages`; exposes `navigationCollapsed`, `showCompose(subject,to,text)`, `tabs` |
| controller | `composeBoxCtrl` | src/app/pages/components/mail/composeBox/composeBoxCtrl.js | modal controller for compose.html (via `$uibModal.open`, `controllerAs: 'boxCtrl'`); injects resolve locals `subject`, `to`, `text` |
| controller | `MailDetailCtrl` | src/app/pages/components/mail/detail/MailDetailCtrl.js | used by state `components.mail.detail` (mailDetail.html) as `detailCtrl`; injects `$stateParams`, `mailMessages` |
| controller | `MailListCtrl` | src/app/pages/components/mail/list/MailListCtrl.js | used by state `components.mail.label` (mailList.html) as `listCtrl`; injects `$stateParams`, `mailMessages` |
| controller | `TimelineCtrl` | src/app/pages/components/timeline/TimelineCtrl.js | bound via `ng-controller="TimelineCtrl"` in timeline.html (not via state); no DI; pure jQuery scroll animation |
| controller | `treeCtrl` | src/app/pages/components/tree/treeCtrl.js | bound via `ng-controller="treeCtrl"` in tree.html (not via state); injects `$scope`, `$timeout`; `$scope`-style (no controllerAs) |
| service | `composeModal` | src/app/pages/components/mail/composeBox/composeModal.js | injects `$uibModal`; `open(options)` opens compose.html modal (`size: 'compose'`, `animation: false`) with resolves |
| service | `mailMessages` | src/app/pages/components/mail/mailMessages.js | injects `$sce`; returns `{getTabs, getMessagesByLabel(label), getMessageById(id)}` over hard-coded in-memory messages (bodies wrapped with `$sce.trustAsHtml`) |

No directives, components, factories, providers, filters, constants, values, or `.run()` blocks are defined in this area.

## 3. ui.router states / routes

| state name | url | templateUrl / template | controller (+ controllerAs) | title / sidebarMeta | file |
|---|---|---|---|---|---|
| `components` (abstract) | `/components` | template: `<ui-view  autoscroll="true" autoscroll-body-top></ui-view>` | — | title `Components`; sidebarMeta `{icon: 'ion-gear-a', order: 100}` | src/app/pages/components/components.module.js |
| `components.mail` (abstract) | `/mail` | templateUrl `app/pages/components/mail/mail.html` | `MailTabCtrl` as `tabCtrl` | title `Mail`; sidebarMeta `{order: 0}` (no icon) | src/app/pages/components/mail/mail.module.js |
| `components.mail.label` | `/:label` | templateUrl `app/pages/components/mail/list/mailList.html` | `MailListCtrl` as `listCtrl` | title `Mail`; no sidebarMeta | src/app/pages/components/mail/mail.module.js |
| `components.mail.detail` | `/:label/:id` | templateUrl `app/pages/components/mail/detail/mailDetail.html` | `MailDetailCtrl` as `detailCtrl` | title `Mail`; no sidebarMeta | src/app/pages/components/mail/mail.module.js |
| `components.timeline` | `/timeline` | templateUrl `app/pages/components/timeline/timeline.html` | — (template uses `ng-controller="TimelineCtrl"`) | title `Timeline`; sidebarMeta `{icon: 'ion-ios-pulse', order: 100}` | src/app/pages/components/timeline/timeline.module.js |
| `components.tree` | `/tree` | templateUrl `app/pages/components/tree/tree.html` | — (template uses `ng-controller="treeCtrl"`) | title `Tree View`; sidebarMeta `{order: 200}` (no icon) | src/app/pages/components/tree/tree.module.js |

Other routing declarations:
- `$urlRouterProvider.when('/components/mail', '/components/mail/inbox')` — src/app/pages/components/mail/mail.module.js:407
- Abstract states: `components`, `components.mail`
- `$urlRouterProvider.otherwise`: none in this area
- `baSidebarServiceProvider.addStaticItem`: none in this area (sidebar items derive from `sidebarMeta`)
- In-template navigation: `ui-sref="components.mail.label({label: t.label})"` + `ui-sref-active="active"` (mail.html); `ui-sref="components.mail.detail({id: m.id, label: listCtrl.label})"` on `<td>` elements (mailList.html); `ui-sref="components.mail.label({label : detailCtrl.label})"` (mailDetail.html)
- `$stateParams.label` / `$stateParams.id` consumed in MailListCtrl.js and MailDetailCtrl.js

## 4. Third-party AngularJS / Bower libraries consumed

| library (bower name + angular module) | how used | files where used |
|---|---|---|
| angular-ui-router ~0.3.2 / `ui.router` | `$stateProvider`, `$urlRouterProvider`, `$stateParams`, `<ui-view>`, `ui-sref`, `ui-sref-active`, `autoscroll` | components.module.js, mail/mail.module.js, timeline/timeline.module.js, tree/tree.module.js, mail/MailListCtrl.js, mail/detail/MailDetailCtrl.js, mail/mail.html, mail/list/mailList.html, mail/detail/mailDetail.html |
| angular-bootstrap ~1.3.3 / `ui.bootstrap` | `$uibModal.open(...)` (custom `size: 'compose'` → `.modal-compose` class); `$dismiss()` in modal template; `uib-dropdown`, `uib-dropdown-toggle`, `uib-dropdown-menu` | mail/composeBox/composeModal.js, mail/composeBox/compose.html, mail/list/mailList.html |
| textAngular ~1.4.6 / `textAngular` | `<text-angular>` with `ta-target-toolbars`; `<text-angular-toolbar>` ×2 with `ta-toolbar`, `ta-toolbar-class`, `name`; SCSS overrides `.ta-scroll-window`, `.ta-bind`, `.ta-text.ta-editor`, `.ta-toolbar` | mail/composeBox/compose.html, src/sass/app/_email.scss |
| ng-js-tree ~0.0.7 / `ngJsTree` (wraps jstree jQuery plugin) | `js-tree="basicConfig"` / `js-tree="dragConfig"`, `ng-model`, `should-apply`, `tree="basicTree"`, `tree-events="ready:readyCB"`; `this.basicTree.jstree(true).get_selected()`; jstree config (`core`, `types`, `plugins: ['types']` / `['dnd','types']`, `version` bump to force redraw); global `$.jstree.defaults` mutation; SCSS `.jstree-default a.jstree-clicked/hovered/anchor/wholerow` | tree/tree.html, tree/treeCtrl.js, tree/tree.module.js, src/sass/app/_tree.scss |
| jquery ~3.1.1 (global `$`) | `$('.cd-timeline-block')`, `$(window).on('scroll')`, `.offset()`, `.scrollTop()`, `.height()`, `.find().addClass/removeClass/hasClass`; `$.jstree.defaults`; `.jstree(true)` | timeline/TimelineCtrl.js, tree/tree.module.js, tree/treeCtrl.js |
| Ionicons ~2.0.1 (icon font, `ion-*` classes) | `ion-gear-a`, `ion-ios-pulse` (sidebarMeta); `ion-minus-round`, `ion-arrow-resize`, `ion-close-round`, `ion-arrow-down-b`, `ion-android-delete`, `ion-navicon`, `ion-chevron-left`, `ion-iphone`, `ion-email`, `ion-document`, `ion-reply`, `ion-forward`, `ion-printer`, `ion-android-remove-circle`, `ion-refresh`, `ion-plus-round`; jstree node icons `ion-ios-folder`, `ion-document-text`, `ion-help-buoy` | components.module.js, timeline/timeline.module.js, mail/composeBox/compose.html, mail/detail/mailDetail.html, mail/list/mailList.html, mail/mail.html, tree/treeCtrl.js |
| bootstrap ~3.3.5 (CSS) | grid (`row`, `col-*`), `btn`, `btn-default`, `btn-primary`, `btn-group`, `caret`, `divider`, `label`, `label-primary`, `form-control`, `checkbox-inline`, `text-center`, `clearfix`, `modal`/`modal-dialog`; `$dropdown-text`, `$input-border` etc. SCSS vars | all .html files in the area; _email.scss, _tree.scss |
| angular core `$sce` | `$sce.trustAsHtml` on every message body, rendered with `ng-bind-html` | mail/mailMessages.js, mail/detail/mailDetail.html |

Not used in this area: smart-table, toastr, xeditable, ui-select, ui-sortable, slimscroll, progress-button, amCharts, Chartist, Morris, Chart.js, leaflet, fullcalendar, ionRangeSlider, bootstrap-select, bootstrap-switch, bootstrap-tagsinput (only a CSS selector `.bootstrap-tagsinput input` appears in _email.scss; no markup in the area), easy-pie-chart, moment, highlight.js, font-awesome.

## 5. External non-Angular assets

| asset | where used |
|---|---|
| jQuery global `$` — DOM query, scroll listener on `window`, class toggling | src/app/pages/components/timeline/TimelineCtrl.js |
| jQuery global `$.jstree.defaults` (jstree plugin config) and `.jstree(true)` instance API | src/app/pages/components/tree/tree.module.js, src/app/pages/components/tree/treeCtrl.js |
| `window.requestAnimationFrame` / `setTimeout` fallback | src/app/pages/components/timeline/TimelineCtrl.js |
| jstree theme images copied by gulp to `assets/img/theme/vendor/jstree/dist/themes` (gulp/images.js) and referenced by `$.jstree.defaults.core.themes.dir` | src/app/pages/components/tree/tree.module.js |
| Bootstrap 3 CSS classes (grid, buttons, labels, form-control, dropdown, modal) | mail/mail.html, mail/list/mailList.html, mail/detail/mailDetail.html, mail/composeBox/compose.html, tree/tree.html |
| Ionicons icon font (`ion-*`) | all area templates, treeCtrl.js, components.module.js, timeline.module.js |
| Kameleon icon images via `kameleonImg` filter (`Euro-Coin`, `Laptop-Signal`, `Checklist`, `Boss-3`, `Online-Shopping`, `Money-Increase`, `Vector`) + CSS `kameleon-icon with-round-bg warning/danger/primary` | src/app/pages/components/timeline/timeline.html |
| Profile pictures via `profilePicture` filter (first name → image under src/assets) | mail/list/mailList.html, mail/detail/mailDetail.html |
| Unused `pic` fields `img/Nasta.png`, `img/Nick.png`, `img/Kostya.png`, `img/Andrey.png`, `img/Vlad.png` in data (not referenced by templates) | src/app/pages/components/mail/mailMessages.js |
| SCSS partials: `src/sass/app/_email.scss` (mail layout, compose modal `.modal-compose`, textAngular overrides, `@include placeholderStyle`, `@include overrideColors`), `src/sass/app/_tree.scss` (`.tree-node`, `.jstree-default` overrides, `#tree-root`, `.tree-panel`), `src/sass/theme/dashboard/_timeline.scss` (`#cd-timeline`, `.cd-timeline-*`, `cd-bounce-*` keyframes, `.cssanimations .is-hidden/.bounce-in`), `src/sass/theme/_tree.scss` (empty file) — all imported from src/sass/main.scss | referenced by area templates |
| Theme CSS classes defined outside the area: `shineHover`, `custom-checkbox`, `xmedium-panel`, `with-scroll`, `transparent`, `btn-with-icon`, `btn-icon`, `nowrap` | mail/*.html, tree/tree.html |
| Google Maps script, CDN scripts, inline `<script>` tags, external URLs | none in this area |

## 6. Cross-area dependencies

| dependency (defined outside area) | kind | defined in | used in |
|---|---|---|---|
| `ba-panel` (+ `ba-panel-class`, `ba-panel-title`) | directive | src/app/theme/components/baPanel/ | mail/mail.html, timeline/timeline.html, tree/tree.html |
| `autoscroll-body-top` attribute on `<ui-view>` | handled by `baUtil.hasAttr` in src/app/theme/theme.config.js | theme | components.module.js (abstract state template) |
| `profilePicture` | filter | src/app/theme/filters/image/profilePicture.js | mail/list/mailList.html, mail/detail/mailDetail.html |
| `kameleonImg` | filter | src/app/theme/filters/image/kameleonImg.js | timeline/timeline.html (one-time bindings `{{::(... | kameleonImg)}}`) |
| `plainText` | filter | src/app/theme/filters/text/removeHtml.js | mail/list/mailList.html |
| `sidebarMeta` / `title` state data | consumed by `baSidebarService` (theme sidebar) | src/app/theme/components/baSidebar/ | all four `*.module.js` route configs |
| `$uibModal` | ui.bootstrap service | vendor | mail/composeBox/composeModal.js |
| `$sce`, `$stateParams`, `$timeout`, `$scope` | angular / ui.router | vendor | mailMessages.js, MailListCtrl.js, MailDetailCtrl.js, treeCtrl.js |
| jstree theme asset path `assets/img/theme/vendor/jstree/dist/themes` | gulp pipeline (gulp/images.js, gulp/build.js) | build | tree/tree.module.js |
| Theme SCSS variables/mixins (`$primary`, `$warning`, `$danger`, `$success`, `$default-text`, `$dropdown-text`, `$input-border`, `$border`, `$border-light`, `$mail-box`, `$github-color`, `$dribble-color`, `$help-text`, `$primary-light`, `$font-light`, `$resXL`, `placeholderStyle()`, `overrideColors()`) | SCSS | src/sass/conf/, src/sass/theme/ | _email.scss, _tree.scss, _timeline.scss |
| `.modal-compose` modal size class produced from `size: 'compose'` | relies on ui.bootstrap `modal-{size}` convention + area SCSS | _email.scss | composeModal.js |

Not used in this area: `baConfig`, `baSidebarService` (direct injection), `baProgressModal`, `layoutPaths`, `baUtil` (direct), `colorHelper`, `appImage` filter.

## 7. Migration risk notes

- **TimelineCtrl is pure jQuery/DOM**: queries `.cd-timeline-block` at controller construction (races with digest — relies on elements already being in DOM because `ng-controller` sits on the container), attaches a `$(window).on('scroll')` handler that is **never removed** (leak / duplicate handlers on every route re-entry), uses `requestAnimationFrame`/`setTimeout`. Port to an Angular directive/component with `HostListener('window:scroll')` + `OnDestroy`, or drop the animation (template carries a `<!-- todo: remove whole block -->` comment).
- **Tree page depends on the jQuery `jstree` plugin via `ngJsTree`**: global `$.jstree.defaults` mutation in a `.config()` block, direct instance access `this.basicTree.jstree(true).get_selected()` (note `this` is the scope, i.e. relies on `tree="basicTree"` binding into `$scope`), config `version++` hack to force re-render, `ignoreChanges` flag + `$timeout` in `readyCB` to suppress model echo. No Angular (2+) wrapper for ng-js-tree exists; would need a new wrapper around jstree or a replacement tree component (e.g. Angular CDK tree / Material tree).
- **`$scope`-based controller (`treeCtrl`) + `ng-controller` in template** rather than controllerAs/state controller; timeline also uses `ng-controller`. ngUpgrade downgrade/upgrade works on components, so both should be refactored to components first.
- **`$uibModal` compose modal** with custom `size: 'compose'` (CSS `.modal-dialog.modal-compose` fixed bottom-right) and `$dismiss()` in template; resolves passed as injected locals into `composeBoxCtrl`. Needs a replacement modal (ngx-bootstrap / Angular Material dialog) and re-implementation of the positioning CSS.
- **textAngular** rich-text editor (`<text-angular>`, two detached toolbars via `ta-target-toolbars`) has no Angular 2+ port; replace with a modern editor (e.g. ngx-quill, ngx-editor) and rewrite `.ta-*` SCSS overrides.
- **`$sce.trustAsHtml` + `ng-bind-html`** for message bodies — translate to `DomSanitizer.bypassSecurityTrustHtml` / `[innerHTML]`.
- **Hard-coded in-memory data** in `mailMessages` (no HTTP); duplicate message id `9391xdsff` appears twice (getMessageById returns the first). Fine for port but note when writing tests.
- **Template bugs / dead bindings**: `ng-click="selectTab(t.label)"` in mail.html calls a function that does not exist on any controller (silent no-op in AngularJS, would be a compile error in Angular). `ng-class="text-center"` in mailDetail.html is a mis-used ng-class. Extra stray `</div>` at end of tree.html. Print/Spam/Delete/refresh/checkbox controls have no handlers.
- **ui.router specifics**: abstract parent states with a `template` string containing `autoscroll-body-top` (custom theme hook), nested `<ui-view>` inside mail.html, `$urlRouterProvider.when` redirect `/components/mail` → `/components/mail/inbox`, `ui-sref` on `<td>` elements (non-anchor navigation), `ui-sref-active`. Map to Angular Router: `redirectTo` for the `when`, child routes for label/detail, `routerLinkActive`.
- **Sidebar metadata coupling**: `title` and `sidebarMeta` custom state properties are consumed by `baSidebarService`; the sidebar port must preserve these (order 100 for Components group, mail 0 / timeline 100 / tree 200).
- **Theme filters used in templates** (`profilePicture`, `kameleonImg`, `plainText`) must be ported to Angular pipes before these templates can move.
- **CSS-driven behaviour**: timeline `is-hidden`/`bounce-in`/`cssanimations` classes and `:nth-child(even)` layout; mail layout uses `expanded`/`collapsed` width toggles and heavy media queries in `_email.scss`; `_tree.scss` styles `.jstree-default` internals. These SCSS partials are global (imported in main.scss), not component-scoped.
- **Build-time asset path**: jstree theme dir `assets/img/theme/vendor/jstree/dist/themes` is produced by a gulp copy task; an Angular CLI build must replicate it or configure jstree themes differently.
- No `$rootScope` events, `$watch`, `$interval`, `$templateCache` usage, `window.AmCharts`/`google.maps`/`L` globals, inline scripts, or CDN scripts in this area.

## 8. File list

| file | description |
|---|---|
| src/app/pages/components/components.module.js | Defines `BlurAdmin.pages.components` aggregating mail/timeline/tree; abstract `components` state (`/components`, sidebar icon `ion-gear-a`, order 100) |
| src/app/pages/components/mail/mail.module.js | Defines `BlurAdmin.pages.components.mail`; states `components.mail` (abstract), `components.mail.label`, `components.mail.detail`; redirect `/components/mail` → `/components/mail/inbox` |
| src/app/pages/components/mail/MailTabCtrl.js | `MailTabCtrl` (`tabCtrl`): navigation collapse flag, `showCompose()` → `composeModal.open`, `tabs` from `mailMessages.getTabs()` |
| src/app/pages/components/mail/mail.html | Mail shell: `ba-panel`, Compose button, folder navigation (`ui-sref`/`ui-sref-active`), static label chips, nested `<ui-view>` |
| src/app/pages/components/mail/mailMessages.js | `mailMessages` service: hard-coded messages (`$sce.trustAsHtml` bodies) sorted by date desc, tab definitions, `getTabs`/`getMessagesByLabel`/`getMessageById` |
| src/app/pages/components/mail/list/MailListCtrl.js | `MailListCtrl` (`listCtrl`): messages filtered by `$stateParams.label` |
| src/app/pages/components/mail/list/mailList.html | Message list: select-all checkbox, refresh, `uib-dropdown` "More" menu, table of messages with `profilePicture` and `plainText` filters, `ui-sref` to detail |
| src/app/pages/components/mail/detail/MailDetailCtrl.js | `MailDetailCtrl` (`detailCtrl`): loads message by `$stateParams.id`, keeps `label` for Back link |
| src/app/pages/components/mail/detail/mailDetail.html | Message detail: back button, sender card (`profilePicture`), subject/date, `ng-bind-html` body, attachment block, Reply/Forward (open compose modal), Print/Spam/Delete buttons |
| src/app/pages/components/mail/composeBox/composeModal.js | `composeModal` service wrapping `$uibModal.open` for compose.html (`controller: 'composeBoxCtrl'`, `size: 'compose'`, resolves subject/to/text) |
| src/app/pages/components/mail/composeBox/composeBoxCtrl.js | `composeBoxCtrl` (`boxCtrl`): copies resolved `subject`, `to`, `text` onto vm |
| src/app/pages/components/mail/composeBox/compose.html | Compose modal template: To/Subject inputs, textAngular editor with two detached toolbars, Send/dismiss controls |
| src/app/pages/components/timeline/timeline.module.js | Defines `BlurAdmin.pages.components.timeline`; state `components.timeline` (`/timeline`, icon `ion-ios-pulse`, order 100) |
| src/app/pages/components/timeline/TimelineCtrl.js | `TimelineCtrl`: jQuery scroll-reveal animation for `.cd-timeline-block` (hide/show `is-hidden`/`bounce-in`) |
| src/app/pages/components/timeline/timeline.html | Static vertical timeline (7 blocks) inside `ba-panel`, `ng-controller="TimelineCtrl"`, kameleon icons via `kameleonImg` filter |
| src/app/pages/components/tree/tree.module.js | Defines `BlurAdmin.pages.components.tree`; state `components.tree` (`/tree`, order 200); config block setting global `$.jstree.defaults` theme dir |
| src/app/pages/components/tree/treeCtrl.js | `treeCtrl` (`$scope`): jstree configs (`basicConfig` types plugin, `dragConfig` dnd plugin), add/refresh/expand/collapse actions, `ignoreChanges`/`readyCB`/`applyModelChanges` change-suppression, default and drag data sets |
| src/app/pages/components/tree/tree.html | Two `ba-panel`s: "Basic Action" (buttons + `js-tree="basicConfig"`) and "Drag & Drop" (`js-tree="dragConfig"`); `ng-controller="treeCtrl"` |
| src/sass/app/_email.scss | Mail client layout, navigation, message list/detail, compose modal (`.modal-compose`), textAngular overrides, responsive breakpoints |
| src/sass/app/_tree.scss | Tree page styles: `.tree-node`, `.jstree-default` hover/selected overrides, `.control-side`, `#tree-root`, `.tree-panel` |
| src/sass/theme/_tree.scss | Empty file (imported by main.scss) |
| src/sass/theme/dashboard/_timeline.scss | Timeline styles: `#cd-timeline`, `.cd-timeline-block/-img/-content`, colour variants, `cd-bounce-*` keyframes, `$resXL` two-column layout |
