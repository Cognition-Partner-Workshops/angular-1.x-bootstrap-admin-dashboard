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
   `bootstrap-overrides/_panel`, `components/_baWizard`, `components/_progressRound`, `_switcher`.

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
`src/app/pages/<area>/<area>.routes.ts`, mirroring the legacy `$stateProvider` states: same URL segments
(`/#/ui/buttons` → `/ui/buttons`), same `title`, same `sidebarMeta.icon` and `sidebarMeta.order`.

```ts
// src/app/pages/ui/ui.routes.ts
export const UI_ROUTES: Routes = [
  {
    path: '',
    data: { title: 'UI Features', sidebarMeta: { icon: 'ion-android-laptop', order: 200 } },
    children: [
      { path: '', redirectTo: 'typography', pathMatch: 'full' },
      { path: 'typography', component: TypographyComponent, data: { title: 'Typography', sidebarMeta: { order: 0 } } },
    ],
  },
];
```

Register the area in `src/app/app.routes.ts` with exactly **one** lazy child entry inside the layout route:

```ts
{ path: '<area>', loadChildren: () => import('./pages/<area>/<area>.routes').then(m => m.<AREA>_ROUTES) }
```

That is the only edit an area makes to `app.routes.ts`. The layout shell (next unit) builds the sidebar from
`data.sidebarMeta` and the page title from `data.title`, so route `data` replaces ui-router `sidebarMeta`.

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
