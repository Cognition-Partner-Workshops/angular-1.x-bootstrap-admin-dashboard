# Inventory: theme

Scope: `src/app/theme/**`, `src/app/app.js` (root module), `src/index.html`, plus the theme SCSS under `src/sass/theme/`. All paths are relative to repo root. Every `.js` / `.html` file in the area was read; greps for `angular.module`, `.controller(`, `.directive(`, `.service(`, `.factory(`, `.provider(`, `.filter(`, `.config(`, `.run(`, `.constant(`, `.value(`, `.state(`, `templateUrl`, `$urlRouterProvider`, `addStaticItem`, `$templateCache` were run across the area to confirm completeness.

## 1. Modules

| module name | dependency list (verbatim array) | file |
|---|---|---|
| `BlurAdmin` (root, `ng-app`) | `['ngAnimate', 'ui.bootstrap', 'ui.sortable', 'ui.router', 'ngTouch', 'toastr', 'smart-table', "xeditable", 'ui.slimscroll', 'ngJsTree', 'angular-progress-button-styles', 'BlurAdmin.theme', 'BlurAdmin.pages']` | `src/app/app.js` |
| `BlurAdmin.theme` | `['toastr', 'chart.js', 'angular-chartist', 'angular.morris-chart', 'textAngular', 'BlurAdmin.theme.components', 'BlurAdmin.theme.inputs']` | `src/app/theme/theme.module.js` |
| `BlurAdmin.theme.components` | `[]` | `src/app/theme/components/components.module.js` |
| `BlurAdmin.theme.inputs` | `[]` | `src/app/theme/inputs/inputs.module.js` |

Note: `BlurAdmin.pages` is declared as a dependency of the root module but is defined outside this area (`src/app/pages/pages.module.js`). There is no `.value(` registration anywhere in the area.

## 2. Registrations

| type | name | file | notes |
|---|---|---|---|
| config | (anonymous `config`) on `BlurAdmin.theme` | `src/app/theme/theme.config.js` | Injects `baConfigProvider, colorHelper, $provide`. Decorates `$uiViewScroll` (`$provide.decorator('$uiViewScroll', uiViewScrollDecorator)`); decorator injects `$delegate, $anchorScroll, baUtil` and calls `$anchorScroll()` when the ui-view element has attribute `autoscroll-body-top` (set in `src/index.html`). Contains commented-out `baConfigProvider.changeTheme({blur: true})` / `changeColors(...)` examples. |
| config | `toastrLibConfig` on `BlurAdmin.theme.components` | `src/app/theme/components/toastrLibConfig.js` | Injects `toastrConfig` (angular-toastr); `angular.extend`s it with `closeButton:true, closeHtml:'<button>&times;</button>', timeOut:5000, autoDismiss:false, containerId:'toast-container', maxOpened:0, newestOnTop:true, positionClass:'toast-top-right', preventDuplicates:false, preventOpenDuplicates:false, target:'body'`. |
| run | `themeRun` on `BlurAdmin.theme` | `src/app/theme/theme.run.js` | Injects `$timeout, $rootScope, layoutPaths, preloader, $q, baSidebarService, themeLayoutSettings`. Waits on `preloader.loadAmCharts()` + `$timeout(3000)` (+ blur background images if `theme.blur`), then sets `$rootScope.$pageFinishedLoading = true`; hard fallback at 7000 ms; exposes `$rootScope.$baSidebarService = baSidebarService` (used by `src/index.html` and `ba-sidebar.html`). |
| provider | `baConfig` | `src/app/theme/theme.configProvider.js` | Provider function injects `colorHelper` (constant). Exposes `conf.theme = {blur:false}`, `conf.colors` (default/defaultText/border/borderDark, primary/info/success/warning/danger + `*Light` via `colorHelper.tint(…,30)` + `*Dark` via `colorHelper.shade(…,15)`, `dashboard: {blueStone, surfieGreen, silverTree, gossip, white}`), config-time methods `changeTheme(theme)` / `changeColors(colors)` (`angular.merge`), `$get` returns the same `conf` object (deletes its own `$get`). |
| provider | `baSidebarService` | `src/app/theme/components/baSidebar/baSidebar.service.js` | Config-time `addStaticItem(...items)` pushes into `staticMenuItems`. `$get` injects `$state, layoutSizes`; instance methods: `getMenuItems()` (builds menu from `$state.get()` filtered by `sidebarMeta`, level = dots in state name, sorted by `(level*100)+order`, children attached as `subMenu`, then `concat(staticMenuItems)`), `shouldMenuBeCollapsed()` (`window.innerWidth <= layoutSizes.resWidthCollapseSidebar`), `canSidebarBeHidden()` (`<= resWidthHideSidebar`), `setMenuCollapsed`, `isMenuCollapsed`, `toggleMenuCollapsed`, `getAllStateRefsRecursive(item)`. |
| constant | `layoutSizes` | `src/app/theme/theme.constants.js` | `{resWidthCollapseSidebar: 1200, resWidthHideSidebar: 500}` |
| constant | `layoutPaths` | `src/app/theme/theme.constants.js` | `{images: {root:'assets/img/', profile:'assets/img/app/profile/', amMap:'assets/img/theme/vendor/ammap//dist/ammap/images/', amChart:'assets/img/theme/vendor/amcharts/dist/amcharts/images/'}}` |
| constant | `colorHelper` | `src/app/theme/theme.constants.js` | `{tint(color, weight), shade(color, weight)}` implemented via a JS port of the SASS `mix()` function (hex math). File also defines unused private `shade`/`tint` helper functions. |
| service | `themeLayoutSettings` | `src/app/theme/theme.service.js` | Injects `baConfig`. Sniffs `navigator.userAgent` for mobile, adds `mobile` / `blur-theme` classes to `document.body` at instantiation; returns `{blur, mobile}`. |
| service | `baUtil` | `src/app/theme/services/baUtil.js` | No deps. `isDescendant(parent, child)` (DOM walk), `hexToRGB(hex, alpha)`, `hasAttr(elem, attrName)` (uses jQuery `$(elem).attr`). |
| service | `fileReader` | `src/app/theme/services/fileReader.js` | Injects `$q`. Wraps browser `FileReader`; `readAsDataUrl(file, scope)` returns promise; calls `scope.$apply` and `scope.$broadcast('fileProgress', {total, loaded})`. |
| service | `preloader` | `src/app/theme/services/preloader.js` | Injects `$q`. `loadImg(src)` (new `Image()` onload promise), `loadAmCharts()` (wraps global `AmCharts.ready`). |
| service | `stopableInterval` | `src/app/theme/services/stopableInterval.js` | Injects `$window`. `start(interval, callback, time)` starts an `$interval`-style timer and rebinds on `window` `focus`/`blur` via `angular.element($window).bind`. No stop/cleanup API. |
| service | `baPanelBlurHelper` | `src/app/theme/components/baPanel/baPanelBlurHelper.service.js` | Injects `$q`. At instantiation reads `getComputedStyle(document.body, ':before').backgroundImage`, loads it into an `Image`; `bodyBgLoad()` promise, `getBodyBgImageSizes()` computes cover-size/position from `document.documentElement.clientWidth/Height`. |
| factory | `baPanel` | `src/app/theme/components/baPanel/baPanel.service.js` | No deps. Returns a base *directive definition object* (`restrict:'A', transclude:true, template(elem, attrs)` building `.panel-heading`/`.panel-title` from `ba-panel-title` attr + `.panel-body[ng-transclude]`). Note: same name as the `baPanel` directive (factory `baPanel` vs directive `baPanelDirective` internally). |
| factory | `baProgressModal` | `src/app/theme/services/baProgressModal.js` | Injects `$uibModal`. `setProgress/getProgress/open/close`; `open()` calls `$uibModal.open({animation:true, templateUrl:'app/pages/ui/modals/progressModal/progressModal.html', size:'sm', keyboard:false, backdrop:'static'})` — template lives in the **pages** area. Throws on double open / close when not open. |
| directive | `baPanel` | `src/app/theme/components/baPanel/baPanel.directive.js` | Injects factory `baPanel` and `baConfig`. `angular.extend({}, baPanel, {template})` → restrict `A`, transclude `true`, no isolate scope; template function wraps base template in `<div class="panel [panel-blur] full-invisible {ba-panel-class}" zoom-in [ba-panel-blur]>`. Used widely in pages and in `widgets.html`. |
| directive | `baPanelSelf` | `src/app/theme/components/baPanel/baPanelSelf.directive.js` | Injects factory `baPanel`. Extends base with `link` that adds classes `panel panel-white` + `ba-panel-class` attr to the element itself. restrict `A`, transclude `true`. |
| directive | `baPanelBlur` | `src/app/theme/components/baPanel/baPanelBlur.directive.js` | Injects `baPanelBlurHelper, $window, $rootScope`. restrict `A`, no scope/template. Registers `window.resize` listeners (one at factory level never removed, one per instance removed on `$destroy`); sets `elem.css({backgroundSize, backgroundPosition})`; checks `$rootScope.$isMobile`; uses raw `setTimeout`. |
| directive | `baSidebar` | `src/app/theme/components/baSidebar/baSidebar.directive.js` | Injects `$timeout, baSidebarService, baUtil, layoutSizes`. restrict `E`, `templateUrl:'app/theme/components/baSidebar/ba-sidebar.html'`, `controller:'BaSidebarCtrl'`, no isolate scope. Link: `scope.menuHeight = el[0].childNodes[0].clientHeight - 84`, binds `$(window)` `click`/`resize` (removed on `$destroy`), uses `$evt.originalEvent.$sidebarEventProcessed` flag, `scope.$apply`. |
| controller | `BaSidebarCtrl` | `src/app/theme/components/baSidebar/BaSidebarCtrl.js` | Injects `$scope, baSidebarService`. Used by the `baSidebar` directive (template `ba-sidebar.html`). Sets `$scope.menuItems`, `$scope.defaultSidebarState`, `$scope.hoverItem($event)` (reads `currentTarget.clientHeight` / `getBoundingClientRect()`), listens `$scope.$on('$stateChangeSuccess')` to collapse on small screens. |
| directive | `baSidebarToggleMenu` | `src/app/theme/components/baSidebar/baSidebarHelpers.directive.js` | Injects `baSidebarService`. restrict `A`; click → `toggleMenuCollapsed()` inside `scope.$apply`, sets `$evt.originalEvent.$sidebarEventProcessed`. Used in `pageTop.html`. |
| directive | `baSidebarCollapseMenu` | `src/app/theme/components/baSidebar/baSidebarHelpers.directive.js` | Injects `baSidebarService`. restrict `A`; click → `setMenuCollapsed(true)`. Not referenced by any template in this area. |
| directive | `baSidebarTogglingItem` | `src/app/theme/components/baSidebar/baSidebarHelpers.directive.js` | restrict `A`, `controller:'BaSidebarTogglingItemCtrl'`. Used in `ba-sidebar.html` (`ba-sidebar-toggling-item="item"`). |
| controller | `BaSidebarTogglingItemCtrl` | `src/app/theme/components/baSidebar/baSidebarHelpers.directive.js` | Injects `$scope, $element, $attrs, $state, baSidebarService`. `$scope.$eval($attrs.baSidebarTogglingItem)`; exposes `$expand/$collapse/$toggle`, `$$expandSubmenu/$$collapseSubmenu` hooks (overridden by `baUiSrefTogglingSubmenu`); toggles class `ba-sidebar-item-expanded`; listens `$stateChangeStart` / `$stateChangeSuccess`. |
| directive | `baUiSrefTogglingSubmenu` | `src/app/theme/components/baSidebar/baSidebarHelpers.directive.js` | Injects `$state`. restrict `A`, `require:'^baSidebarTogglingItem'`; overrides parent ctrl hooks with jQuery `el.slideDown()` / `el.slideUp()`. |
| directive | `baUiSrefToggler` | `src/app/theme/components/baSidebar/baSidebarHelpers.directive.js` | Injects `baSidebarService`. restrict `A`, `require:'^baSidebarTogglingItem'`; click expands sidebar if collapsed then `$expand()`, else `$toggle()`. |
| directive | `baWizard` | `src/app/theme/components/baWizard/baWizard.directive.js` | restrict `E`, `transclude:true`, `templateUrl:'app/theme/components/baWizard/baWizard.html'`, `controller:'baWizardCtrl'`, `controllerAs:'$baWizardController'`. |
| controller | `baWizardCtrl` | `src/app/theme/components/baWizard/baWizardCtrl.js` | Injects `$scope`. `vm.tabs/tabNum/progress`, `addTab`, `selectTab`, `isFirstTab`, `isLastTab`, `nextTab`, `previousTab`; `$scope.$watch(vm.tabNum)` → `calcProgress`. Used by `baWizard` directive (template `baWizard.html`). |
| directive | `baWizardStep` | `src/app/theme/components/baWizard/baWizardStep.directive.js` | restrict `E`, `transclude:true`, `require:'^baWizard'`, isolate `scope:{form:'='}`, `templateUrl:'app/theme/components/baWizard/baWizardStep.html'`. Registers a tab object (`title` from `$attrs.title`, `select/submit/isComplete/isAvailiable/setPrev`) with parent wizard; uses `form.$setSubmitted`, `form.$valid`. |
| directive | `backTop` | `src/app/theme/components/backTop/backTop.directive.js` | restrict `E`, `templateUrl:'app/theme/components/backTop/backTop.html'`, inline anonymous controller calling jQuery plugin `$('#backTop').backTop({position:200, speed:100})`. |
| directive | `contentTop` | `src/app/theme/components/contentTop/contentTop.directive.js` | Injects `$location, $state`. restrict `E`, `templateUrl:'app/theme/components/contentTop/contentTop.html'`; link sets `$scope.activePageTitle = $state.current.title` inside a no-expression `$scope.$watch(fn)` (runs every digest). |
| directive | `msgCenter` | `src/app/theme/components/msgCenter/msgCenter.directive.js` | restrict `E`, `templateUrl:'app/theme/components/msgCenter/msgCenter.html'`, `controller:'MsgCenterCtrl'`. |
| controller | `MsgCenterCtrl` | `src/app/theme/components/msgCenter/MsgCenterCtrl.js` | Injects `$scope, $sce`. Hard-coded demo `users`, `notifications`, `messages`; `getMessage(msg)` replaces `&name` and returns `$sce.trustAsHtml`. Used by `msgCenter` directive (template `msgCenter.html`). |
| directive | `pageTop` | `src/app/theme/components/pageTop/pageTop.directive.js` | restrict `E`, `templateUrl:'app/theme/components/pageTop/pageTop.html'`, no controller. |
| directive | `progressBarRound` | `src/app/theme/components/progressBarRound/progressBarRound.directive.js` | Injects `baProgressModal`. restrict `E`, `templateUrl:'app/theme/components/progressBarRound/progressBarRound.html'`; link `$scope.$watch(baProgressModal.getProgress)` → sets SVG `stroke-dasharray` on `element.find('#loader')[0]`. |
| directive | `widgets` | `src/app/theme/components/widgets/widgets.directive.js` | restrict `EA`, isolate `scope:{ngModel:'='}`, `templateUrl:'app/theme/components/widgets/widgets.html'`, `replace:true`. Template nests `ba-panel` + `ng-include="widget.url"`. |
| directive | `baSwitcher` | `src/app/theme/inputs/baSwitcher/baSwitcher.js` | `templateUrl:'app/theme/inputs/baSwitcher/baSwitcher.html'`, isolate `scope:{switcherStyle:'@', switcherValue:'='}`; default restrict (EA). |
| directive | `animatedChange` | `src/app/theme/directives/animatedChange.js` | Injects `$timeout`. No restrict (EA), link-only; reads `element.attr('new-value')`, counts from `parseInt(element.html())` to new value with `$timeout` 30 ms steps after 3500 ms delay; `element.next().find('i').addClass('show-arr')`. |
| directive | `autoExpand` | `src/app/theme/directives/autoExpand.js` | restrict `A`; `keydown` handler and `setTimeout(…,0)` resize textarea via jQuery `$(element).height(...)` / `scrollHeight`. |
| directive | `autoFocus` | `src/app/theme/directives/autoFocus.js` | Injects `$timeout, $parse`. link-only; `scope.$watch($parse(attrs.autoFocus))` → `element[0].focus(); select()`; on `blur` assigns model `false` via `scope.$apply`. |
| directive | `includeWithScope` | `src/app/theme/directives/includeWithScope.js` | restrict `AE`; `templateUrl: function(ele, attrs){ return attrs.includeWithScope; }` (dynamic template include sharing parent scope). |
| directive | `ionSlider` | `src/app/theme/directives/ionSlider.js` | Injects `$timeout`. restrict `EA`, `template:'<div></div>'`, `replace:true`, isolate scope with 20 bindings (`min:'=', max:'=', type:'@', prefix:'@', maxPostfix:'@', prettify:'=', prettifySeparator:'@', grid:'=', gridMargin:'@', postfix:'@', step:'@', hideMinMax:'@', hideFromTo:'@', from:'=', to:'=', disable:'=', onChange:'=', onFinish:'=', values:'=', timeout:'@'`); link calls jQuery plugin `$element.ionRangeSlider({...})` and 5 `$scope.$watch`es (`min` deep, `max`, `from`, `to`, `disable`) → `$element.data("ionRangeSlider").update(...)`. |
| directive | `ngFileSelect` | `src/app/theme/directives/ngFileSelect.js` | link-only; `change` handler sets `$scope.file = (e.srcElement || e.target).files[0]` and calls `$scope.getFile()` (expects parent scope to define it). |
| directive | `scrollPosition` | `src/app/theme/directives/scrollPosition.js` | isolate `scope:{scrollPosition:'=', maxHeight:'='}`; binds `$(window).on('scroll')` (never unbound), `scope.$apply`. Used in `pageTop.html`. |
| directive | `trackWidth` | `src/app/theme/directives/trackWidth.js` | isolate `scope:{trackWidth:'=', minWidth:'='}`; `$(window).resize(...)` (never unbound), compares `$(element).width()` to `minWidth`. |
| directive | `zoomIn` | `src/app/theme/directives/zoomIn.js` | Injects `$timeout, $rootScope`. restrict `A`; after 1000 ms (100 ms if `$rootScope.$pageFinishedLoading`) removes class `full-invisible`, adds `animated zoomIn` (animate.css). Emitted by `baPanel` template. |
| filter | `appImage` | `src/app/theme/filters/image/appImage.js` | Injects `layoutPaths`; returns `layoutPaths.images.root + input`. |
| filter | `kameleonImg` | `src/app/theme/filters/image/kameleonImg.js` | Injects `layoutPaths`; returns `layoutPaths.images.root + 'theme/icon/kameleon/' + input + '.svg'`. |
| filter | `profilePicture` | `src/app/theme/filters/image/profilePicture.js` | Injects `layoutPaths`; `(input, ext='png')` → `layoutPaths.images.profile + input + '.' + ext`. Used in `msgCenter.html`, `pageTop.html`. |
| filter | `plainText` | `src/app/theme/filters/text/removeHtml.js` | No deps; strips HTML tags with regex `/<[^>]+>/gm`. (File name `removeHtml.js` ≠ filter name `plainText`.) |

## 3. ui.router states / routes

No `.state(` registrations, no `$urlRouterProvider.otherwise`, no abstract states, and no `baSidebarServiceProvider.addStaticItem` *calls* exist inside this area. The theme area only **provides the infrastructure** that pages use:

| item | file | notes |
|---|---|---|
| `baSidebarServiceProvider.addStaticItem(...)` (definition) | `src/app/theme/components/baSidebar/baSidebar.service.js` | Config-time API; the two calls are in `src/app/pages/pages.module.js` (lines 26 and 46, outside this area). |
| `$urlRouterProvider.otherwise('/dashboard')` | `src/app/pages/pages.module.js:24` | Outside this area (listed for completeness; the theme references `#/dashboard` in `pageTop.html` and `contentTop.html`). |
| `sidebarMeta` / `title` consumption | `src/app/theme/components/baSidebar/baSidebar.service.js`, `src/app/theme/components/contentTop/contentTop.directive.js` | `defineMenuItemStates()` reads `$state.get()` and uses each state's `sidebarMeta.icon`, `sidebarMeta.order`, `title`, `name`; `contentTop` displays `$state.current.title`. |
| `<div ui-view autoscroll="true" autoscroll-body-top>` (root ui-view) | `src/index.html` | Single root `ui-view`; `autoscroll-body-top` is consumed by the `$uiViewScroll` decorator in `src/app/theme/theme.config.js`. |
| `$uiViewScroll` decorator | `src/app/theme/theme.config.js` | Alters ui-router scrolling behaviour globally. |
| `ui-sref-active`, `ui-state` | `src/app/theme/components/baSidebar/ba-sidebar.html` | ui-router directives used for menu highlighting / dynamic state links (`ui-state="item.stateRef || ''"`). |
| `$stateChangeStart` / `$stateChangeSuccess` listeners | `src/app/theme/components/baSidebar/BaSidebarCtrl.js`, `src/app/theme/components/baSidebar/baSidebarHelpers.directive.js` | ui-router 0.x legacy `$rootScope` events (removed in ui-router 1.x / `@uirouter/angular`). |

## 4. Third-party AngularJS / Bower libraries consumed

| library (bower name + angular module) | how used | files where used |
|---|---|---|
| angular (`~1.5.8`) core: `ngAnimate` (angular-animate), `ngTouch` (angular-touch), `ngSanitize`-free | root module deps; `ng-swipe-right` / `ng-swipe-left` (ngTouch); `ng-bind-html` with `$sce.trustAsHtml` | `src/app/app.js`; `src/app/theme/components/baSidebar/ba-sidebar.html`; `src/app/theme/components/msgCenter/MsgCenterCtrl.js`, `msgCenter.html` |
| angular-ui-router (`~0.3.2`) / `ui.router` | `ui-view`, `ui-sref-active`, `ui-state`, `$state`, `$state.get()`, `$state.current`, `$uiViewScroll` decorator, `$stateChangeStart/Success` events, `sidebarMeta` custom state data | `src/app/app.js`, `src/index.html`, `src/app/theme/theme.config.js`, `src/app/theme/components/baSidebar/*`, `src/app/theme/components/contentTop/contentTop.directive.js` |
| angular-bootstrap (`~1.3.3`) / `ui.bootstrap` | `$uibModal.open(...)`; `uib-dropdown`, `uib-dropdown-toggle`, `uib-dropdown-menu` | `src/app/app.js`; `src/app/theme/services/baProgressModal.js`; `src/app/theme/components/msgCenter/msgCenter.html`; `src/app/theme/components/pageTop/pageTop.html` |
| angular-toastr (`~2.1.1`) / `toastr` | module dep; `toastrConfig` extended in config block | `src/app/app.js`, `src/app/theme/theme.module.js`, `src/app/theme/components/toastrLibConfig.js` |
| angular-slimscroll (`~1.1.5`) / `ui.slimscroll` (wraps jquery-slimscroll) | `slimscroll="{height: '{{menuHeight}}px'}" slimscroll-watch="menuHeight"` | `src/app/app.js`; `src/app/theme/components/baSidebar/ba-sidebar.html` |
| angular-ui-sortable (`~0.15.0`) / `ui.sortable` | root module dep only (no usage in theme) | `src/app/app.js` |
| angular-smart-table (`~2.1.3`) / `smart-table` | root module dep only (no usage in theme) | `src/app/app.js` |
| angular-xeditable (`~0.5.0`) / `xeditable` | root module dep only (no usage in theme) | `src/app/app.js` |
| ng-js-tree (`~0.0.7`) / `ngJsTree` | root module dep only (no usage in theme) | `src/app/app.js` |
| angular-progress-button-styles (`~0.1.0`) / `angular-progress-button-styles` | root module dep only (no usage in theme) | `src/app/app.js` |
| angular-chart.js (`~1.0.3`) + chart.js (`~2.4.0`) / `chart.js` | theme module dep only (no usage in theme) | `src/app/theme/theme.module.js` |
| angular-chartist.js (`~3.3.12`) + chartist (`0.9.5`) / `angular-chartist` | theme module dep only (no usage in theme) | `src/app/theme/theme.module.js` |
| angular-morris-chart (`~1.1.0`) / `angular.morris-chart` | theme module dep only (no usage in theme) | `src/app/theme/theme.module.js` |
| textAngular (`~1.4.6`) / `textAngular` | theme module dep only (no usage in theme) | `src/app/theme/theme.module.js` |
| amcharts (`~3.15.2`) (non-angular global) | `AmCharts.ready(cb)` in preloader; `layoutPaths.images.amChart` / `amMap` image paths | `src/app/theme/services/preloader.js`, `src/app/theme/theme.constants.js`, `src/app/theme/theme.run.js` |
| ionrangeslider (`2.1.4`) (jQuery plugin) | `$element.ionRangeSlider({...})`, `$element.data("ionRangeSlider").update(...)` | `src/app/theme/directives/ionSlider.js` |
| jquery (`~3.1.1`) | `$(window)`, `$(elem)`, `el.slideDown/slideUp`, `.height()`, `.width()`, `.attr()`, `.find()` | see Section 5 |
| animate.css (`~3.5.2`) | classes `animated zoomIn` | `src/app/theme/directives/zoomIn.js` |
| font-awesome (`~4.4.0`) | `fa fa-angle-down`, `fa-angle-up`, `fa fa-bell-o`, `fa fa-envelope-o`, `fa fa-user`, `fa fa-cog`, `fa fa-power-off`, `fa fa-angle-up back-top` | `ba-sidebar.html`, `msgCenter.html`, `pageTop.html`, `backTop.html` |
| Ionicons (`~2.0.1`) | `ion-navicon`, `ion-ios-search-strong`, `ion-heart` | `src/app/theme/components/pageTop/pageTop.html`, `src/index.html` |
| bootstrap (`~3.3.5`) CSS | `panel`, `panel-heading`, `panel-title`, `panel-body`, `clearfix`, `row`, `col-md-6`, `progress`, `progress-bar progress-bar-danger active`, `pager`, `btn btn-primary`, `breadcrumb`, `center-block`, `dropdown-*` | `baPanel.service.js`, `baPanel.directive.js`, `widgets.html`, `baWizard.html`, `contentTop.html`, `progressBarRound.html`, `msgCenter.html`, `pageTop.html` |
| Not used in this area (declared in `bower.json` only, consumed by pages): jquery-ui, jquery.easing, jquery.easy-pie-chart, amcharts-stock, ammap, angular-route, bootstrap-select, bootstrap-switch, bootstrap-tagsinput, fullcalendar, highlight, leaflet, moment, angular-ui-select | — | `bower.json` |

## 5. External non-Angular assets

| asset | where used |
|---|---|
| Raw jQuery `$` / `jQuery` global | `src/app/theme/services/baUtil.js` (`$(elem).attr`), `src/app/theme/components/baSidebar/baSidebar.directive.js` (`$(window).on/off`), `src/app/theme/components/baSidebar/baSidebarHelpers.directive.js` (`el.slideDown()/slideUp()` — jQuery animation on jqLite-wrapped element, requires full jQuery), `src/app/theme/components/backTop/backTop.directive.js` (`$('#backTop').backTop(...)`), `src/app/theme/directives/autoExpand.js` (`$(element).height`), `src/app/theme/directives/scrollPosition.js` (`$(window).on('scroll')`, `$(window).scrollTop()`), `src/app/theme/directives/trackWidth.js` (`$(window).resize`, `$(element).width()`), `src/app/theme/directives/ionSlider.js` (`$element.ionRangeSlider`, `.data(...)`), `src/app/theme/components/progressBarRound/progressBarRound.directive.js` (`element.find('#loader')`), `src/app/theme/directives/animatedChange.js` (`element.next().find('i')`) |
| jQuery BackTop plugin (vendored, minified) | `src/app/theme/components/backTop/lib/jquery.backTop.min.js` — `$.fn.backTop`; binds `$(document).scroll`, `$(window).scrollTop()`, `fadeIn/fadeOut`, `$("html, body").animate({scrollTop:0})` |
| jQuery ionRangeSlider plugin (bower `ionrangeslider`) | `src/app/theme/directives/ionSlider.js` |
| jquery-slimscroll (via angular-slimscroll) | `src/app/theme/components/baSidebar/ba-sidebar.html` |
| Global `AmCharts` object | `src/app/theme/services/preloader.js` (`AmCharts.ready`) |
| Global `window` / `document` / `navigator` / `getComputedStyle` / `Image` / `FileReader` / `setTimeout` | `baSidebar.service.js` (`window.innerWidth`), `theme.service.js` (`navigator.userAgent`, `document.body`), `baPanelBlurHelper.service.js` (`getComputedStyle(document.body, ':before')`, `document.documentElement.clientWidth`, `new Image()`), `baPanelBlur.directive.js` (`$window.addEventListener`, `setTimeout`), `preloader.js` (`new Image()`), `fileReader.js` (`new FileReader()`), `autoExpand.js` (`setTimeout`) |
| Bootstrap 3 CSS classes | see Section 4 row "bootstrap" |
| Icon fonts: font-awesome (`fa-*`), Ionicons (`ion-*`), socicon (`socicon socicon-facebook/twitter/google/github`), kameleon SVG icons | `ba-sidebar.html`, `msgCenter.html`, `pageTop.html`, `backTop.html`, `src/index.html` (footer socicons); kameleon via `kameleonImg` filter → `assets/img/theme/icon/kameleon/*.svg`; SCSS `src/sass/theme/_icons.scss`, `src/sass/theme/_socicon.scss` |
| Images under `src/assets/img` | `assets/img/blur-bg.jpg`, `blur-bg-blurred.jpg`, `blur-bg-mobile.jpg` (`theme.run.js`); `assets/img/app/profile/*.png` (via `profilePicture` filter); `assets/img/shopping-cart.svg`, `assets/img/comments.svg` (`MsgCenterCtrl.js`); `assets/img/favicon-16x16.png`, `-32x32.png`, `-96x96.png` (`src/index.html`); `assets/img/theme/vendor/amcharts/...`, `.../ammap/...` (`layoutPaths`) |
| Google Maps script (CDN, http) | `src/index.html`: `<script src="http://maps.google.com/maps/api/js?sensor=false">` |
| Google Tag Manager (CDN, inline script + noscript iframe) | `src/index.html`: `https://www.googletagmanager.com/gtm.js?id=GTM-KT9L237`, `https://www.googletagmanager.com/ns.html?id=GTM-KT9L237` |
| Google Fonts (CDN) | `src/index.html`: `https://fonts.googleapis.com/css?family=Roboto:...` |
| Gulp build/inject markers (`<!-- bower:css -->`, `<!-- inject:css -->`, `<!-- bower:js -->`, `<!-- inject:js -->`, `<!-- inject:partials -->`, `<!-- build:js -->`) | `src/index.html` — wiredep + gulp-inject fill vendor/app scripts and the `$templateCache` partials bundle at build time |
| Preloader markup `#preloader` + `.body-bg` | `src/index.html`; styled by `src/sass/theme/_preloader.scss`, `_layout.scss` |
| SCSS partials specific to this area | `src/sass/theme/_blur-admin-theme.scss`, `_buttons.scss`, `_datePicker.scss`, `_icons.scss`, `_layout.scss`, `_preloader.scss`, `_socicon.scss`, `_table.scss`, `_tree.scss`; `src/sass/theme/bootstrap-overrides/_panel.scss`, `_tabs.scss`; `src/sass/theme/components/_accordion.scss`, `_baWizard.scss`, `_backTop.scss`, `_contentTop.scss`, `_msgCenter.scss`, `_pageTop.scss`, `_progressRound.scss`, `_sidebar.scss`, `_widgets.scss`; `src/sass/theme/conf/_mixins.scss`, `_variables.scss`, `conf/colorScheme/*`; (`src/sass/theme/dashboard/*` styles dashboard page widgets — pages area) |

## 6. Cross-area dependencies

Things this area **consumes** that are defined outside it:

| dependency | defined in | used in (theme area) |
|---|---|---|
| `BlurAdmin.pages` module | `src/app/pages/pages.module.js` | `src/app/app.js` (root module dep) |
| `app/pages/ui/modals/progressModal/progressModal.html` template | `src/app/pages/ui/modals/progressModal/` | `src/app/theme/services/baProgressModal.js` (`$uibModal.open templateUrl`) |
| State `title` + `sidebarMeta {icon, order}` data | every `.state()` in `src/app/pages/**` | `baSidebar.service.js`, `contentTop.directive.js` |
| `$rootScope.$isMobile` | not set anywhere in this area (grep shows no writer in theme; checked in `baPanelBlur.directive.js`) | `src/app/theme/components/baPanel/baPanelBlur.directive.js` |
| `$scope.getFile()` | expected on the consuming controller scope (pages) | `src/app/theme/directives/ngFileSelect.js` |
| `#/dashboard` route | `src/app/pages/dashboard/` | `pageTop.html`, `contentTop.html` |

Things this area **provides** that pages consume (for the parent's cross-reference; pages files found via grep):

| theme item | consumers outside this area |
|---|---|
| `baConfig` (colors/theme) | `src/app/pages/charts/amCharts/*/…Ctrl.js`, `src/app/pages/charts/chartJs/*.js`, `src/app/pages/charts/chartist/chartistCtrl.js`, `src/app/pages/charts/morris/morrisCtrl.js`, `src/app/pages/dashboard/dashboardLineChart/DashboardLineChartCtrl.js`, `dashboardMap/DashboardMapCtrl.js`, `dashboardPieChart/DashboardPieChartCtrl.js`, `trafficChart/TrafficChartCtrl.js`, `src/app/pages/maps/map-bubbles/MapBubblePageCtrl.js`, `map-lines/MapLinesPageCtrl.js`, `src/app/pages/ui/modals/ModalsPageCtrl.js` |
| `layoutPaths` | `src/app/pages/charts/amCharts/*`, `src/app/pages/dashboard/dashboardMap/DashboardMapCtrl.js`, `src/app/pages/maps/*` |
| `baUtil` | `src/app/pages/charts/chartJs/*`, `src/app/pages/dashboard/*` |
| `baProgressModal` | `src/app/pages/ui/modals/ModalsPageCtrl.js`, `src/app/pages/ui/modals/progressModal/ProgressModalCtrl.js` |
| `baSidebarServiceProvider.addStaticItem` | `src/app/pages/pages.module.js` |
| `ba-panel` / `ba-panel-self` / `ba-panel-class` / `ba-panel-title` | virtually every page template under `src/app/pages/**` |
| `ba-wizard` / `ba-wizard-step` | `src/app/pages/form/wizard/wizard.html` |
| `ba-switcher` | `src/app/pages/form/inputs/widgets/switches/switch.html` |
| `ion-slider` | `src/app/pages/ui/slider/slider.html` |
| `profilePicture`, `appImage`, `kameleonImg`, `plainText` filters | `src/app/pages/components/mail/*`, `components/timeline/timeline.html`, `dashboard/blurFeed/blurFeed.html`, `dashboard/popularApp/popularApp.html`, `profile/profile.html`, `tables/**`, `ui/icons/**`, `ui/typography/typography.html` |
| `include-with-scope`, `zoom-in`, `auto-expand`, `auto-focus`, `ng-file-select`, `track-width`, `scroll-position`, `animated-change`, `widgets`, `fileReader`, `stopableInterval` | `src/app/pages/dashboard/**`, `src/app/pages/profile/**`, `src/app/pages/ui/tabs/*.html`, `src/app/pages/tables/**` (see grep list; exact per-file mapping belongs to the pages inventory) |

## 7. Migration risk notes

- **Legacy ui-router 0.3 `$rootScope` events** (`$stateChangeStart`, `$stateChangeSuccess`) in `BaSidebarCtrl.js` and `baSidebarHelpers.directive.js` — removed in ui-router 1.x; must move to `TransitionService` hooks. `$state.get()`-driven menu building with custom `sidebarMeta` on state definitions needs an equivalent (route `data`).
- **`$provide.decorator('$uiViewScroll')`** (`theme.config.js`) — global ui-router internals decoration; no Angular Router analogue (use `scrollPositionRestoration`/`ViewportScroller`).
- **Directive-definition inheritance via a factory** (`baPanel` factory returned as DDO, `angular.extend`ed by `baPanel` / `baPanelSelf` directives, with string-concatenated `template` functions reading `attrs`) — no component-level equivalent; rewrite as a component with `ng-content` + inputs.
- **Heavy direct DOM / jQuery manipulation**: `$(window)` scroll/resize/click listeners (`scrollPosition`, `trackWidth`, `baSidebar`, `baPanelBlur`), several never removed (leaks on destroy); `el.slideDown()/slideUp()` (jQuery-only, breaks under jqLite); `.height()`, `.width()`, `.css()`, `addClass` animations; SVG attribute mutation in `progressBarRound`; `element.html()` counter in `animatedChange`; `element.next().find('i')` sibling traversal.
- **jQuery plugins**: `ionRangeSlider` (`ionSlider.js`), vendored `jquery.backTop.min.js` (`backTop`), `slimscroll` (via angular-slimscroll in `ba-sidebar.html`). Need Angular wrappers or replacement components.
- **Global window objects**: `AmCharts.ready` in `preloader.js` (app boot is gated on it — `themeRun` waits for AmCharts + 3 s before rendering `<main ng-if="$pageFinishedLoading">`); `window.innerWidth` in `baSidebarService`; `navigator.userAgent` sniff in `themeLayoutSettings`; `getComputedStyle(document.body, ':before')` in `baPanelBlurHelper`.
- **`$rootScope` as global state bus**: `$rootScope.$pageFinishedLoading`, `$rootScope.$baSidebarService` (referenced directly from `src/index.html` and `ba-sidebar.html`), `$rootScope.$isMobile` (read but never set in this area). `index.html` binds to root scope expressions (`ng-if`, `ng-class`) outside any controller — in a hybrid, the bootstrap shell must be re-hosted in an Angular `AppComponent`.
- **Timers**: `$timeout(3000)` and `$timeout(…,7000)` boot gates in `theme.run.js`; `$timeout` chains in `animatedChange` (one `$timeout` per counter step), `zoomIn` (1000/100 ms), `autoFocus`; raw `setTimeout` in `autoExpand` and `baPanelBlur`; `stopableInterval` rebinds an interval on window focus/blur with no stop API.
- **`$scope.$watch`-heavy code**: `ionSlider` (5 watches incl. deep), `contentTop` (watch with no expression = runs every digest), `progressBarRound` (function watch), `autoFocus`, `baWizardCtrl`. `$scope.$apply` called from raw DOM handlers in 6+ files (risk of `$digest already in progress` when mixed with zone.js).
- **`scope.$broadcast('fileProgress')` and `scope.$apply` inside `fileReader` service** — service takes a `scope` argument (tight coupling to AngularJS scopes).
- **`$templateCache` / `templateUrl` strings** (`app/theme/components/...html`, `app/theme/inputs/...html`, and cross-area `app/pages/ui/modals/progressModal/progressModal.html`) rely on gulp `inject:partials` bundling into `$templateCache`; 11 `templateUrl` usages plus `includeWithScope`'s dynamic `templateUrl` function and `widgets.html` `ng-include="widget.url"`.
- **Config-time provider APIs** (`baConfigProvider.changeTheme/changeColors`, `baSidebarServiceProvider.addStaticItem`) — config-phase patterns don't exist in Angular; replace with `InjectionToken`s / `provideX()` helpers. `baConfig` provider's `$get` returns the provider object itself (deleting `$get`) — unusual pattern.
- **Same-name factory and directive `baPanel`** — collision risk when upgrading via `downgradeInjectable`/`UpgradeComponent`.
- **Inline scripts / CDNs in `src/index.html`**: Google Tag Manager inline script + noscript iframe; `http://` (non-TLS) Google Maps script with deprecated `sensor=false` param; Google Fonts. GTM ID `GTM-KT9L237` is hard-coded. Wiredep/gulp-inject comment markers drive script ordering — Angular CLI build replaces this entirely.
- **`$sce.trustAsHtml` with string-replaced user names** in `MsgCenterCtrl.js` (XSS surface if data becomes dynamic); demo data hard-coded in the controller.
- **`ngFileSelect` mutates parent scope** (`$scope.file`, calls `$scope.getFile()`) — implicit contract with consumers.
- **Mobile detection by UA string + body class side effects at service instantiation** (`themeLayoutSettings`) — side effects in a service constructor.
- **Deprecated/unmaintained libs**: angular-slimscroll, angular-toastr, ionrangeslider 2.1.4, AmCharts 3, Bootstrap 3 (`.panel`, `.pager`, `.breadcrumb` markup all removed/changed in Bootstrap 4/5), animate.css 3 class names.
- `src/app/theme/theme.constants.js` `layoutPaths.images.amMap` has a double slash (`ammap//dist`) — pre-existing path quirk.

## 8. File list

| file | description |
|---|---|
| `src/app/app.js` | Root module `BlurAdmin` declaration with 11 third-party deps + `BlurAdmin.theme` + `BlurAdmin.pages`. |
| `src/index.html` | App shell: `ng-app="BlurAdmin"`, GTM scripts, Google Fonts, favicons, wiredep/inject markers, `<main ng-if="$pageFinishedLoading">` with `<ba-sidebar>`, `<page-top>`, `<content-top>`, root `ui-view`, footer with socicons, `<back-top>`, `#preloader`, Google Maps script tag. |
| `src/app/theme/theme.module.js` | Declares `BlurAdmin.theme` module (toastr, chart.js, angular-chartist, angular.morris-chart, textAngular, components, inputs). |
| `src/app/theme/theme.config.js` | Config block: decorates `$uiViewScroll` to honour `autoscroll-body-top`; commented theme/colour overrides. |
| `src/app/theme/theme.configProvider.js` | `baConfig` provider: theme flags and colour palette (tint/shade derived), `changeTheme`/`changeColors`. |
| `src/app/theme/theme.constants.js` | Constants `layoutSizes`, `layoutPaths`, `colorHelper` (SASS `mix()` port). |
| `src/app/theme/theme.run.js` | Run block: preloader gating (`AmCharts.ready`, 3 s, blur bg images, 7 s fallback) → `$rootScope.$pageFinishedLoading`; exposes `$rootScope.$baSidebarService`. |
| `src/app/theme/theme.service.js` | `themeLayoutSettings` service: UA mobile sniff, adds `mobile`/`blur-theme` body classes. |
| `src/app/theme/components/components.module.js` | Declares empty `BlurAdmin.theme.components` module. |
| `src/app/theme/components/toastrLibConfig.js` | Config block extending angular-toastr `toastrConfig`. |
| `src/app/theme/components/baPanel/baPanel.service.js` | `baPanel` factory returning the base panel DDO (transclude, title/body template). |
| `src/app/theme/components/baPanel/baPanel.directive.js` | `baPanel` attribute directive wrapping content in `.panel` (+ blur class, `zoom-in`, `ba-panel-class`). |
| `src/app/theme/components/baPanel/baPanelSelf.directive.js` | `baPanelSelf` attribute directive adding `panel panel-white` classes to host element. |
| `src/app/theme/components/baPanel/baPanelBlur.directive.js` | `baPanelBlur` directive: syncs panel background-size/position to body bg on resize (blur theme). |
| `src/app/theme/components/baPanel/baPanelBlurHelper.service.js` | `baPanelBlurHelper` service: loads body `:before` bg image, computes cover dimensions. |
| `src/app/theme/components/baSidebar/baSidebar.service.js` | `baSidebarService` provider: static items, menu built from ui-router states' `sidebarMeta`, collapse state logic. |
| `src/app/theme/components/baSidebar/baSidebar.directive.js` | `<ba-sidebar>` element directive: template + `BaSidebarCtrl`, window click/resize handling, menu height. |
| `src/app/theme/components/baSidebar/BaSidebarCtrl.js` | Sidebar controller: menu items, hover indicator, collapse on `$stateChangeSuccess`. |
| `src/app/theme/components/baSidebar/ba-sidebar.html` | Sidebar template: 3-level `ng-repeat` menu with `ui-sref-active`, `ui-state`, slimscroll, swipe gestures, hover element. |
| `src/app/theme/components/baSidebar/baSidebarHelpers.directive.js` | Helper directives `baSidebarToggleMenu`, `baSidebarCollapseMenu`, `baSidebarTogglingItem` (+ `BaSidebarTogglingItemCtrl`), `baUiSrefTogglingSubmenu`, `baUiSrefToggler`. |
| `src/app/theme/components/baWizard/baWizard.directive.js` | `<ba-wizard>` element directive (transclude, `baWizardCtrl as $baWizardController`). |
| `src/app/theme/components/baWizard/baWizardCtrl.js` | Wizard controller: tab registry, navigation, progress %. |
| `src/app/theme/components/baWizard/baWizard.html` | Wizard template: step nav, Bootstrap progress bar, transcluded steps, prev/next pager. |
| `src/app/theme/components/baWizard/baWizardStep.directive.js` | `<ba-wizard-step>` directive (requires `^baWizard`, `form` binding, validity-gated availability). |
| `src/app/theme/components/baWizard/baWizardStep.html` | Step template: `<section ng-show="selected" ng-transclude>`. |
| `src/app/theme/components/backTop/backTop.directive.js` | `<back-top>` directive invoking jQuery `backTop` plugin on `#backTop`. |
| `src/app/theme/components/backTop/backTop.html` | `<i class="fa fa-angle-up back-top" id="backTop">` template. |
| `src/app/theme/components/backTop/lib/jquery.backTop.min.js` | Vendored minified jQuery BackTop plugin (`$.fn.backTop`). |
| `src/app/theme/components/contentTop/contentTop.directive.js` | `<content-top>` directive: watches `$state.current.title` into `activePageTitle`. |
| `src/app/theme/components/contentTop/contentTop.html` | Page title `<h1>` + Bootstrap breadcrumb (Home → current). |
| `src/app/theme/components/msgCenter/msgCenter.directive.js` | `<msg-center>` directive with `MsgCenterCtrl`. |
| `src/app/theme/components/msgCenter/MsgCenterCtrl.js` | Hard-coded users/notifications/messages; `$sce.trustAsHtml` message rendering. |
| `src/app/theme/components/msgCenter/msgCenter.html` | Two `uib-dropdown` lists (notifications, messages) with `profilePicture` filter. |
| `src/app/theme/components/pageTop/pageTop.directive.js` | `<page-top>` directive (template only). |
| `src/app/theme/components/pageTop/pageTop.html` | Header bar: logo, `ba-sidebar-toggle-menu`, search input, profile `uib-dropdown`, `<msg-center>`; uses `scroll-position`. |
| `src/app/theme/components/progressBarRound/progressBarRound.directive.js` | `<progress-bar-round>` directive: SVG circle progress driven by `baProgressModal.getProgress()`. |
| `src/app/theme/components/progressBarRound/progressBarRound.html` | SVG template with `#loader` circle and `{{progress}}%` text. |
| `src/app/theme/components/widgets/widgets.directive.js` | `widgets` directive (isolate `ngModel` binding, replace) rendering widget grid. |
| `src/app/theme/components/widgets/widgets.html` | Nested `ng-repeat` grid of `ba-panel`s with `ng-include="widget.url"`. |
| `src/app/theme/directives/animatedChange.js` | `animatedChange` directive: animated numeric counter via `$timeout` steps. |
| `src/app/theme/directives/autoExpand.js` | `autoExpand` directive: auto-size textarea with jQuery `.height()`. |
| `src/app/theme/directives/autoFocus.js` | `autoFocus` directive: focus/select element when bound model becomes true. |
| `src/app/theme/directives/includeWithScope.js` | `includeWithScope` directive: dynamic `templateUrl` from attribute sharing parent scope. |
| `src/app/theme/directives/ionSlider.js` | `ionSlider` directive: wrapper around jQuery ionRangeSlider with 20 bindings and 5 watches. |
| `src/app/theme/directives/ngFileSelect.js` | `ngFileSelect` directive: on `change` sets `$scope.file` and calls `$scope.getFile()`. |
| `src/app/theme/directives/scrollPosition.js` | `scrollPosition` directive: two-way bool set from `$(window).scrollTop() > maxHeight`. |
| `src/app/theme/directives/trackWidth.js` | `trackWidth` directive: two-way bool set from element width < `minWidth` on resize. |
| `src/app/theme/directives/zoomIn.js` | `zoomIn` directive: delayed removal of `full-invisible`, adds `animated zoomIn`. |
| `src/app/theme/filters/image/appImage.js` | `appImage` filter → `assets/img/<input>`. |
| `src/app/theme/filters/image/kameleonImg.js` | `kameleonImg` filter → `assets/img/theme/icon/kameleon/<input>.svg`. |
| `src/app/theme/filters/image/profilePicture.js` | `profilePicture` filter → `assets/img/app/profile/<input>.<ext>`. |
| `src/app/theme/filters/text/removeHtml.js` | `plainText` filter: strips HTML tags via regex. |
| `src/app/theme/inputs/inputs.module.js` | Declares empty `BlurAdmin.theme.inputs` module. |
| `src/app/theme/inputs/baSwitcher/baSwitcher.js` | `baSwitcher` directive (isolate `switcherStyle` / `switcherValue`). |
| `src/app/theme/inputs/baSwitcher/baSwitcher.html` | Checkbox-based CSS switcher markup (ON/OFF handles). |
| `src/app/theme/services/baProgressModal.js` | `baProgressModal` factory: progress state + `$uibModal` open/close (template in pages area). |
| `src/app/theme/services/baUtil.js` | `baUtil` service: `isDescendant`, `hexToRGB`, `hasAttr` (jQuery). |
| `src/app/theme/services/fileReader.js` | `fileReader` service: promise wrapper over `FileReader.readAsDataURL` with scope broadcast. |
| `src/app/theme/services/preloader.js` | `preloader` service: image preload and `AmCharts.ready` promises. |
| `src/app/theme/services/stopableInterval.js` | `stopableInterval` service: interval that pauses/restarts on window blur/focus. |
| `src/sass/theme/**` (SCSS) | Theme styling: `_blur-admin-theme.scss` (entry), `_layout.scss`, `_preloader.scss`, `_icons.scss`, `_socicon.scss`, `_buttons.scss`, `_table.scss`, `_tree.scss`, `_datePicker.scss`, `bootstrap-overrides/_panel.scss`, `_tabs.scss`, `components/_sidebar.scss`, `_pageTop.scss`, `_contentTop.scss`, `_msgCenter.scss`, `_backTop.scss`, `_baWizard.scss`, `_progressRound.scss`, `_widgets.scss`, `_accordion.scss`, `conf/_variables.scss`, `_mixins.scss`, `conf/colorScheme/*`; `dashboard/*` partials style pages-area dashboard widgets. |
