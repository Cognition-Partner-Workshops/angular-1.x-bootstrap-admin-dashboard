# Blur Admin — Modern Angular workspace

This is the **Phase 2** modern Angular workspace shell that will host the ported
Blur Admin dashboard. It lives alongside the untouched legacy AngularJS 1.5 app
(at the repo root: `src/`, `gulp/`, etc.). Only files under `modern/` belong to
this workspace.

At this stage the workspace contains **only the app shell**: root component,
routing, a layout placeholder (sidebar + top bar + content area) and a
placeholder `DashboardComponent`. No widgets or the shared `ba-panel` have been
implemented yet — later per-widget sessions add those following the conventions
documented below.

## Toolchain

| Tool           | Version    |
| -------------- | ---------- |
| Node.js        | **20.20.2** (nvm `lts/iron`) |
| npm            | 10.8.2     |
| Angular / CLI  | 20.3.x     |

Modern Angular requires a modern Node — **not** the legacy Node 10 the root app
pins. Angular CLI 20 is the latest stable line that fully supports Node 20; the
very latest Angular (22) requires Node 22+, so this workspace targets Node 20 +
Angular 20.

Select the Node version before running any command:

```bash
source ~/.nvm/nvm.sh && nvm use 20   # nvm install 20 if not present
```

## Getting started

All commands run from this `modern/` directory:

```bash
cd modern
source ~/.nvm/nvm.sh && nvm use 20

npm install     # install dependencies
ng build        # production-style build into dist/blur-admin-modern
ng serve         # dev server at http://localhost:4200
```

`ng serve` serves an empty dashboard shell (fixed left sidebar + top bar +
content area) at the `dashboard` route. `/` redirects to `/dashboard`.

## Architecture

- **Standalone components** throughout — no `NgModule`s.
- **Angular Router** with a single feature route today:
  - `''` → redirect to `dashboard`
  - `dashboard` → lazy-loads the standalone `DashboardComponent`
- SCSS for all styles.
- The root `App` component renders the layout shell (`src/app/app.html` /
  `app.scss`); the routed content renders inside `<router-outlet>` in the content
  area.

## Directory & naming conventions (widget sessions MUST follow these)

Later per-widget migration sessions branch from `modern-angular` and rely on the
following exact layout:

### Widgets

Each ported widget is a **standalone component** with a stable selector, living
at:

```
modern/src/app/widgets/<widgetName>/<widget-name>.component.ts
modern/src/app/widgets/<widgetName>/<widget-name>.component.html
modern/src/app/widgets/<widgetName>/<widget-name>.component.scss
```

The `modern/src/app/widgets/` directory already exists (with a `.gitkeep`).

### Shared `ba-panel`

The legacy `ba-panel` panel wrapper will be ported (in a later session — **not
yet implemented**) to:

```
modern/src/app/shared/ba-panel/ba-panel.component.ts
```

- standalone component
- selector: **`app-ba-panel`**
- inputs: **`@Input() title`** and **`@Input() panelClass`**
- projects content via `<ng-content>`

The `modern/src/app/shared/` directory already exists (with a `.gitkeep`).

## Widget library mapping

Maintained modern replacements for the legacy dashboard widget libraries. Later
sessions **must** use these exact packages/versions.

| Concern | Legacy library | Modern replacement | Version (installed) |
| ------- | -------------- | ------------------ | ------------------- |
| Charts (pie, "Revenue" line, "Acquisition Channels" doughnut) | amCharts / Chart.js / Chartist / Morris | **ng2-charts** + **chart.js** | ng2-charts `8.0.0`, chart.js `4.5.1` |
| Map ("Users by Country" world choropleth) | ammap | **@amcharts/amcharts5** (`/map` module) + **@amcharts/amcharts5-geodata** | amcharts5 `5.19.1`, amcharts5-geodata `5.1.5` |
| Calendar ("Calendar" widget) | fullcalendar 3 | **@fullcalendar/angular** + **@fullcalendar/daygrid** (+ core) | `6.1.21` |

`ng2-charts` transitively requires `@angular/cdk`, pinned to `20.2.14` to match
Angular 20 (its default floats to a version that needs Node 22+).

**Map choice — why amCharts 5:** it ships a first-class `@amcharts/amcharts5/map`
module, and the companion `@amcharts/amcharts5-geodata` package provides ready
world-map geodata (e.g. `@amcharts/amcharts5-geodata/worldLow`) suitable for a
choropleth — closely matching the legacy ammap "Users by Country" widget without
sourcing/maintaining separate GeoJSON as `ngx-leaflet + leaflet` would require.
It builds cleanly (the only note is a benign CommonJS optimization warning from
its transitive `polylabel` dependency, allow-listed in `angular.json`).

The remaining widgets (**popular-app**, **blur-feed**, **dashboard-todo**) are
plain HTML/list widgets and need no special library.
