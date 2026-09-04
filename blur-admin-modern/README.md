# Blur Admin modern workspace

Angular 20 (standalone components, SCSS, Bootstrap 5) port of the Blur Admin
template. After phase 2 the theme shell (`src/app/theme/`, `src/app/layout/`)
and every page area (`src/app/pages/{dashboard,ui,components,form,tables,charts,maps,profile}`)
are ported; see `../migration/README.md` for status and `../migration/PHASE2_CONVENTIONS.md`
for conventions.

## Toolchain

- Node: `v20.20.2`
- Angular CLI: `20.3.36`
- Angular core: `20.3.30`

The current `@angular/cli@latest` resolved to CLI 22.1.7, which requires
Node 22.22.3 or newer. Because this phase specifies Node 20, the workspace
was generated with the latest Node-20-compatible CLI major,
`@angular/cli@20`, and the exact version above is recorded here.

## Baseline dependencies

| Package | Installed version | Purpose |
| --- | ---: | --- |
| `bootstrap` | 5.3.8 | Bootstrap 5 replacement for the legacy Bootstrap 3 bower package |
| `@ng-bootstrap/ng-bootstrap` | 19.0.1 | Angular-native replacement for `angular-bootstrap` / `ui.bootstrap` |
| `@popperjs/core` | 2.11.8 | Peer dependency wired by `ng add @ng-bootstrap/ng-bootstrap` |
| `@fortawesome/fontawesome-free` | 7.3.1 | Replacement for the Font Awesome 4 bower package |
| `ionicons` | 8.1.0 | Replacement for the Ionicons 2 bower package |
| `chart.js` | 4.5.1 | Modern charting library replacing Chart.js 2.4 |
| `ng2-charts` | 9.0.0 | Angular integration replacing `angular-chart.js` |
| `@angular/cdk` | 20.2.14 | Peer dependency required by `ng2-charts` |
| `leaflet` | 1.9.4 | Modern Leaflet replacement for Leaflet 0.7 |
| `@types/leaflet` | 1.9.22 | TypeScript types for Leaflet |

Bootstrap SCSS and Font Awesome CSS are imported from `src/styles.scss` so
the production build verifies that both style packages resolve.

## Packages added in phase 2

All pinned to exact versions that were at least 7 days old when installed, per
`../migration/DEPENDENCY_BASELINE.md` (LATER items).

| Package | Version | Replaces | Why |
| --- | ---: | --- | --- |
| `ngx-toastr` | 19.1.0 | `angular-toastr` | Angular-native toasts for the notifications page and demos |
| `@angular-slider/ngx-slider` | 20.0.0 | `ion.rangeSlider` (jQuery) | Slider widget behind `ba-slider` and the sliders page |
| `@angular/animations` | 20.3.x | ngAnimate | required by ng-bootstrap / ngx-toastr animations |
| `@fullcalendar/{angular,core,daygrid,timegrid,interaction}` | 6.1.21 | `angular-ui-calendar` + fullcalendar 2 (jQuery) | dashboard calendar |
| `@amcharts/amcharts5` | 5.20.3 | amCharts 3 / amMap | charts page (bar/area/line/pie/funnel) and dashboard/maps map charts |
| `@amcharts/amcharts5-geodata` | 5.1.6 | ammap `worldLow` | world geometry for bubble/line/dashboard maps |
| `chartist` | 1.5.0 | `angular-chartist.js` + chartist 0.9 | chartist page (hand-written `ChartistDirective`) |
| `ngx-quill` + `quill` | 28.0.2 / 2.0.3 | `textAngular` | mail compose rich-text editor |
| `@ng-select/ng-select` | 15.2.0 | `angular-ui-select` | form inputs "ui-select" demos |
| `@angular/google-maps` | 20.2.14 | `ngmap` | Google Maps loader for `/maps/gmap` (map created via the plain `google.maps` API, keyless) |
| `@types/google.maps` (dev) | 3.65.5 | - | typings for the `google.maps` globals (`compilerOptions.types` in tsconfig.app/spec) |

Not installed (baseline NONE/DROP, hand-written instead): smart-table, xeditable,
bootstrap-select, bootstrap-switch, bootstrap-tagsinput, progress-button-styles,
ng-js-tree (CDK tree), Morris/Raphael (Chart.js), slimscroll, jQuery and all
jQuery plugins.

`angular.json` budgets were raised to `initial` 1.1 MB warning / 2 MB error and
`anyComponentStyle` 5 kB / 8 kB to accommodate the merged areas; the production
build is ~1.09 MB raw / ~220 kB transferred.

## Build and serve

Use Node 20:

```sh
source ~/.nvm/nvm.sh
nvm use 20
npm run build
npx ng serve --port 4200
```
