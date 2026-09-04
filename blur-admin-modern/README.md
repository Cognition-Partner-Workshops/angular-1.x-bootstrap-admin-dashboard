# Blur Admin modern workspace

This is the empty modern Angular workspace for phase 1 of the Blur Admin
modernization. No legacy components have been migrated yet; the generated
starter application remains in `src/app/`.

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

## Deferred replacements

The following component-specific replacements were deliberately not installed
yet and are deferred to later phases:

- tables
- editors
- tree
- toastr
- select
- sortable
- slimscroll
- progress buttons
- amCharts, Chartist, and Morris
- FullCalendar
- Google Maps

## Build and serve

Use Node 20:

```sh
source ~/.nvm/nvm.sh
nvm use 20
npm run build
npx ng serve --port 4200
```
