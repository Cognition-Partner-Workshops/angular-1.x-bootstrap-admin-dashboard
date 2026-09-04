# Phase 2 conventions (theme-core)

Everything below lives in `blur-admin-modern/`. The legacy tree under `src/` is read-only reference.

## Theme public API

Import from the barrel only: `import { ... } from './theme'` (`src/app/theme/index.ts`). All components,
directives and pipes are standalone; all services are `providedIn: 'root'`. Every class has a colocated `*.spec.ts`.

### Constants / helpers

| Export | File | Notes |
|---|---|---|
| `LAYOUT_SIZES` | `layout-sizes.ts` | `resWidthCollapseSidebar: 1200`, `resWidthHideSidebar: 500` |
| `LAYOUT_PATHS` | `layout-paths.ts` | `images.root = 'assets/img/'`, `images.profile`, `images.amMap`, `images.amChart` |
| `mix`, `tint`, `shade` | `color-helper.ts` | pure hex functions, identical output to legacy `colorHelper` |

### Services

| Class | Replaces | API |
|---|---|---|
| `BaConfigService` | `baConfig` provider | `theme: { blur }`, `colors` (basic, functional, `*Light`/`*Dark`, `dashboard`), `changeTheme(partial)`, `changeColors(partial)` (deep merge) |
| `ThemeLayoutSettingsService` | `themeLayoutSettings` | `mobile`, `blur`; adds `mobile` / `blur-theme` classes to `<body>` on first injection |
| `BaUtilService` | `baUtil` | `isDescendant(parent, child)`, `hexToRGB(hex, alpha)`, `hasAttr(el, name)` |
| `FileReaderService` | `fileReader` | `readAsDataUrl(file): Promise<string>`, `progress$: Subject<{ total, loaded }>` (replaces `$broadcast('fileProgress')`) |
| `PreloaderService` | `preloader` | `loadImg(src): Promise<void>`, `loadAmCharts(): Promise<void>` (resolves immediately when `window.AmCharts` is absent) |
| `StopableIntervalService` | `stopableInterval` | `start(cb, ms): { stop() }` — pauses on window blur, resumes on focus; `stop()` clears the interval and listeners |
| `BaPageLoadingService` | `$rootScope.$pageFinishedLoading` | `pageFinishedLoading: WritableSignal<boolean>` — the shell sets it to `true` once booted |
| `BaProgressModalService` | `baProgressModal` | `progress` signal, `setProgress(n)` (throws > 100), `getProgress()`, `open()` / `close()` (NgbModal, `size: 'sm'`, static backdrop) |
| `BaPanelBlurHelperService` | `baPanelBlurHelper` | `bodyBgLoad(): Promise<void>`, `getBodyBgImageSizes()` |

### Pipes

| Pipe name | Class | Output |
|---|---|---|
| `appImage` | `AppImagePipe` | `assets/img/<input>` |
| `kameleonImg` | `KameleonImgPipe` | `assets/img/theme/icon/kameleon/<input>.svg` |
| `profilePicture` | `ProfilePicturePipe` | `assets/img/app/profile/<input>.<ext = png>` |
| `plainText` | `PlainTextPipe` | strips HTML tags |

### Directives

| Selector | Class | Inputs / outputs |
|---|---|---|
| `[zoomIn]` | `ZoomInDirective` | removes `full-invisible`, adds `animated zoomIn` after 1000 ms (100 ms once `BaPageLoadingService.pageFinishedLoading()` is true) |
| `[autoFocus]` | `AutoFocusDirective` | `autoFocus: boolean`, `(autoFocusChange)` emits `false` on blur |
| `[autoExpand]` | `AutoExpandDirective` | textarea grows to `scrollHeight` (min 16 px) on keydown |
| `[animatedChange]` | `AnimatedChangeDirective` | `newValue: number`; counts up/down after 3.5 s, then adds `show-arr` to `<i>` in the next sibling |
| `[ngFileSelect]` | `NgFileSelectDirective` | `(fileSelect)` emits the chosen `File` |
| `[scrollPosition]` | `ScrollPositionDirective` | `maxHeight: number`, `(scrollPositionChange): boolean` |
| `[trackWidth]` | `TrackWidthDirective` | `minWidth: number`, `(trackWidthChange): boolean` |
| `[baPanelSelf]` | `BaPanelSelfDirective` | host gets `panel panel-white` + `baPanelClass` |
| `[baPanelBlur]` | `BaPanelBlurDirective` | `baPanelBlur: boolean`; sizes the blurred background (desktop only) |

`includeWithScope` is **not** ported: there is no `$templateCache` in Angular. Replace
`<div include-with-scope="foo.html">` with an inline `<ng-container *ngTemplateOutlet="tpl">` / `@if` block or a child component.

### Components

| Selector | Class | Inputs / outputs |
|---|---|---|
| `<ba-panel>` / `[baPanel]` | `BaPanelComponent` | `title`, `baPanelClass`, `blur` (defaults to `BaConfigService.theme.blur`); projects content into `.panel > .panel-body`; renders `.panel-heading > h3.panel-title` when `title` is set. Legacy `panel*` class names are kept so the ported SCSS applies |
| `<ba-switcher>` | `BaSwitcherComponent` | `switcherStyle` (`primary`/`success`/`warning`/`danger`/`info`), `[(switcherValue)]` |
| `<ba-wizard>` | `BaWizardComponent` | content children `<ba-wizard-step>`; `tabNum`, `progress()`, `selectTab(i)`, `nextTab()`, `previousTab()`, `isFirstTab()`, `isLastTab()` |
| `<ba-wizard-step>` | `BaWizardStepComponent` | `title`, `form?: NgForm \| FormGroup` — the next step is only reachable when the current form is valid |
| `<ba-slider>` | `BaSliderComponent` | wraps `@angular-slider/ngx-slider`: `min`, `max`, `step`, `type` (`single`/`double`), `from`, `to`, `prefix`, `postfix`, `maxPostfix`, `grid`, `disable`, `hideMinMax`, `hideFromTo`; `(fromChange)`, `(toChange)`, `(onChange)`, `(onFinish)` |
| `<ba-progress-modal>` | `ProgressModalComponent` | opened by `BaProgressModalService`; renders the round SVG progress bar |

### Toastr

`ngx-toastr` (19.1.0) is configured in `src/app/app.config.ts` with the legacy `toastrLibConfig` values
(`closeButton`, `timeOut: 5000`, `autoDismiss: false`, `maxOpened: 0`, `newestOnTop`, `positionClass: 'toast-top-right'`,
`preventDuplicates: false`). Inject `ToastrService` from `ngx-toastr` directly. Legacy keys without an ngx-toastr
equivalent (`closeHtml`, `containerId`, `preventOpenDuplicates`, `target`) were dropped.

## SCSS entry points

`src/styles.scss` import order (do not reorder — the variables must be defined before Bootstrap):

1. `styles/_conf.scss` — legacy `conf/_variables`, `conf/colorScheme/_mint`, `conf/_mixins` (tint/shade, scrollbars,
   bg mixins, `overrideColors`, …) plus the Bootstrap 5 variable mapping (`$primary…$danger`, `$body-bg`, `$body-color`,
   `$border-color`, `$font-family-sans-serif`, `$enable-shadows`).
2. `bootstrap/scss/bootstrap`, Font Awesome, `ngx-toastr/toastr`.
3. `styles/theme/*` partials: `_layout`, `_buttons`, `_icons`, `_socicon`, `_blur-admin-theme`, `_preloader`,
   `bootstrap-overrides/_panel`, `components/_baWizard`, `components/_progressRound`, `components/_sidebar`,
   `components/_pageTop`, `components/_contentTop`, `components/_msgCenter`, `components/_backTop`,
   `components/_widgets`, `_switcher`.

Page areas put page-specific SCSS in their own component `styleUrls` (or, for legacy `src/sass/app/*` files that are
global, add a new `styles/app/_<name>.scss` and one `@import` line at the end of `styles.scss`). Use the variables and
mixins from `_conf.scss` (`$primary`, `$default-text`, `@include bg-nr(...)`, …). Use `$images-root` / `$fonts-root`
(`/assets/img/`, `/assets/fonts/`) for `url()`s.

## Assets

`src/assets/img/**` and `src/assets/fonts/*` were copied to `blur-admin-modern/public/assets/img/` and
`public/assets/fonts/`, so `LAYOUT_PATHS`, the pipes and SCSS `url()`s resolve unchanged (`/assets/img/...`).
Add new static files under `public/assets/`.

## Routes

Each page area lives in `src/app/pages/<area>/` and exports `<AREA>_ROUTES: Routes` from
`src/app/pages/<area>/<area>.routes.ts`, mirroring the legacy `$stateProvider` states: preserve URL segments
(`/\#/ui/buttons` → `/ui/buttons`), `title`, and `sidebarMeta.icon` / `sidebarMeta.order`.

The lazy entry in `src/app/app.routes.ts` carries the area's top-level `data` (including its title and
`sidebarMeta`), while the area's routes file carries its child route data:

```ts
// app.routes.ts
{
  path: 'ui',
  loadChildren: () => import('./pages/ui/ui.routes').then(m => m.UI_ROUTES),
  data: { title: 'UI Features', sidebarMeta: { icon: 'ion-android-laptop', order: 200 } },
}

// src/app/pages/ui/ui.routes.ts
export const UI_ROUTES: Routes = [
  { path: '', redirectTo: 'typography', pathMatch: 'full' },
  { path: 'typography', component: TypographyComponent,
    data: { title: 'Typography', sidebarMeta: { order: 0 } } },
];
```

Register each area with exactly one lazy child entry inside the layout route; that is the only edit an area
makes to `app.routes.ts`. `BaSidebarService` builds menu items from `data.sidebarMeta`: direct children of
the layout are level 0 and descendants of those entries are level 1 (and level 2 where needed). The lazy
entry's metadata is therefore available before its module is loaded; loaded lazy routes are also walked when
available. The content title comes from the deepest activated route with `data.title`.

## Layout shell

`LayoutComponent` owns the page shell and calls `ThemeRunService.run()`. The shell uses
`BaPageLoadingService`, `ThemeLayoutSettingsService`, and these standalone components:

| Selector | Class | Notes |
|---|---|---|
| `<ba-sidebar>` | `BaSidebarComponent` | Three-level menu, responsive collapse, router/fixed links |
| `<page-top>` | `PageTopComponent` | Logo, menu toggle, search, profile dropdown, message center |
| `<content-top>` | `ContentTopComponent` | Deepest activated route title and breadcrumb |
| `<back-top>` | `BackTopComponent` | Scroll-to-top control shown past 200px |
| `<msg-center>` | `MsgCenterComponent` | Notification and message dropdown demo data |
| `<widgets>` | `WidgetsComponent` | Renders widget columns using `TemplateRef`s |
| `<progress-bar-round>` | `ProgressBarRoundComponent` | Signal-backed round progress SVG |

`BaSidebarService` is root-provided and exposes `menuCollapsed`, `isMenuCollapsed()`, `setMenuCollapsed()`,
`toggleMenuCollapsed()`, `shouldMenuBeCollapsed()`, `canSidebarBeHidden()`, `addStaticItem(...)`,
`getAllStateRefsRecursive(item)`, and `getMenuItems()`. Its `BaMenuItem` shape includes `title`, optional
`icon`, `stateRef`, `fixedHref`, `blank`, `disabled`, `level`, `order`, `subMenu`, `expanded`, and
`slideRight`. Swipe gestures are intentionally dropped; native `overflow-y: auto` replaces slimscroll.

`ThemeRunService` waits for AmCharts and the legacy blur background assets (when applicable), with a
seven-second fallback. Static demo menu entries live in `src/app/app.static-menu.ts` as `STATIC_MENU_ITEMS`
and are registered through an app initializer.

The dashboard unit replaces the placeholder in `src/app/pages/dashboard/`: delete the placeholder component
when implementing the real page, but keep `dashboard.routes.ts`, its `DASHBOARD_ROUTES` export, and the
`app.routes.ts` lazy entry.

## Dependencies

New packages: `npm install <pkg>@<exact version>` (≥ 7 days old) inside `blur-admin-modern/`; committing the
`package-lock.json` change is expected. Follow `migration/DEPENDENCY_BASELINE.md`; never add DROP packages
(jQuery, jQuery plugins, AngularJS libraries). Added in this unit: `ngx-toastr@19.1.0`,
`@angular-slider/ngx-slider@20.0.0`, `@angular/animations`.

## Verification

```
cd blur-admin-modern
npm run build
npx ng test --watch=false --browsers=ChromeHeadless
```
