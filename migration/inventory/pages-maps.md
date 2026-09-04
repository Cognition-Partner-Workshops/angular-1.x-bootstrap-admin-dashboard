# Inventory: pages/maps

Source: `src/app/pages/maps/` (google-maps/, leaflet/, map-bubbles/, map-lines/) plus area-specific SCSS under `src/sass/app/maps/`. Read-only analysis of `Cognition-Partner-Workshops/ts-angularjs-blur-admin` @ `main`.

## 1. Modules

| module name | dependency list (verbatim array) | file |
|---|---|---|
| `BlurAdmin.pages.maps` | `[]` | src/app/pages/maps/maps.module.js |

The module is pulled into the app by `BlurAdmin.pages` (src/app/pages/pages.module.js, entry `'BlurAdmin.pages.maps'`).

## 2. Registrations

| type | name | file | notes |
|---|---|---|---|
| config | `routeConfig` (anonymous `.config(routeConfig)`) | src/app/pages/maps/maps.module.js | Injects `$stateProvider`; registers the 5 states in section 3. `/** @ngInject */`. |
| controller | `GmapPageCtrl` | src/app/pages/maps/google-maps/GmapPageCtrl.js | Injects `$timeout`. Used by state `maps.gmap` / template `google-maps/google-maps.html`. No `controllerAs`; nothing bound to scope – controller only performs a side effect (`new google.maps.Map(...)` on `#google-maps`) inside a 100 ms `$timeout`. |
| controller | `LeafletPageCtrl` | src/app/pages/maps/leaflet/LeafletPageCtrl.js | Injects `$timeout`. Used by state `maps.leaflet` / template `leaflet/leaflet.html`. Sets `L.Icon.Default.imagePath`, creates `L.map` on `#leaflet-map`, adds OSM tile layer and a marker with popup, inside a 100 ms `$timeout`. |
| controller | `MapBubblePageCtrl` | src/app/pages/maps/map-bubbles/MapBubblePageCtrl.js | Injects `baConfig`, `$timeout`, `layoutPaths`. Used by state `maps.bubble` / template `map-bubbles/map-bubbles.html`. Holds a ~240-entry `latlong` country-code table and ~160-entry `mapData` population array; builds `new AmCharts.AmMap()` with circle images sized by value, then `map.write('map-bubbles')` in a 100 ms `$timeout`. |
| controller | `MapLinesPageCtrl` | src/app/pages/maps/map-lines/MapLinesPageCtrl.js | Injects `baConfig`, `$timeout`, `layoutPaths`. Used by state `maps.line` / template `map-lines/map-lines.html`. Calls `AmCharts.makeChart('map-lines', {type:'map', theme:'blur', ...})` with London/Vilnius flight-line dataset inside a 100 ms `$timeout`. |

No directives, components, services, factories, providers, filters, constants, values or `.run` blocks are defined in this area.

## 3. ui.router states / routes

| state name | url | templateUrl / template | controller (+ controllerAs) | title / sidebarMeta (icon, order) | file |
|---|---|---|---|---|---|
| `maps` (**abstract: true**) | `/maps` | templateUrl `app/pages/maps/maps.html` | – | title `Maps`; sidebarMeta `{ icon: 'ion-ios-location-outline', order: 500 }` | src/app/pages/maps/maps.module.js |
| `maps.gmap` | `/gmap` | templateUrl `app/pages/maps/google-maps/google-maps.html` | `GmapPageCtrl` (no controllerAs) | title `Google Maps`; sidebarMeta `{ order: 0 }` | src/app/pages/maps/maps.module.js |
| `maps.leaflet` | `/leaflet` | templateUrl `app/pages/maps/leaflet/leaflet.html` | `LeafletPageCtrl` (no controllerAs) | title `Leaflet Maps`; sidebarMeta `{ order: 100 }` | src/app/pages/maps/maps.module.js |
| `maps.bubble` | `/bubble` | templateUrl `app/pages/maps/map-bubbles/map-bubbles.html` | `MapBubblePageCtrl` (no controllerAs) | title `Bubble Maps`; sidebarMeta `{ order: 200 }` | src/app/pages/maps/maps.module.js |
| `maps.line` | `/line` | templateUrl `app/pages/maps/map-lines/map-lines.html` | `MapLinesPageCtrl` (no controllerAs) | title `Line Maps`; sidebarMeta `{ order: 300 }` | src/app/pages/maps/maps.module.js |

- Abstract states: `maps` only.
- `$urlRouterProvider.otherwise`: none in this area.
- `baSidebarServiceProvider.addStaticItem`: none in this area (sidebar entries come from `sidebarMeta` on the states above).
- `maps.html` hosts the child `<div ui-view autoscroll="true" autoscroll-body-top>` (the `autoscroll-body-top` attribute is consumed by src/app/theme/theme.config.js via `baUtil.hasAttr`).

## 4. Third-party AngularJS / Bower libraries consumed

| library (bower name + angular module name) | how used | files where used |
|---|---|---|
| `angular-ui-router` / `ui.router` | `$stateProvider.state(...)`, `ui-view` attribute directive, `autoscroll` | src/app/pages/maps/maps.module.js, src/app/pages/maps/maps.html |
| `angular` (core) / `ng` | `$timeout` service (100 ms deferred init in every controller) | all four `*PageCtrl.js` files |
| `leaflet` (~0.7.5, non-Angular global `L`) | `L.Icon.Default.imagePath`, `L.map(...)`.setView`, `L.tileLayer(...)`.addTo`, `L.marker(...)`.bindPopup().openPopup()` | src/app/pages/maps/leaflet/LeafletPageCtrl.js; CSS classes `.leaflet-*` in src/sass/app/maps/_leaflet.scss |
| `ammap` (~3.14.5, global `AmCharts`; bower override loads `dist/ammap/ammap.js` + `dist/ammap/maps/js/worldLow.js`) | `new AmCharts.AmMap()`, `AmCharts.maps.worldLow`, `AmCharts.theme = AmCharts.themes.blur`, `map.addTitle`, `map.write('map-bubbles')`, `map.export` | src/app/pages/maps/map-bubbles/MapBubblePageCtrl.js |
| `ammap` / `amcharts` (~3.15.2, global `AmCharts`) | `AmCharts.makeChart('map-lines', { type: 'map', theme: 'blur', dataProvider: { map: 'worldLow', ... }, export: {enabled:true}, pathToImages })` | src/app/pages/maps/map-lines/MapLinesPageCtrl.js |
| `Ionicons` (icon font, not Angular) | `ion-ios-location-outline` in `sidebarMeta.icon` | src/app/pages/maps/maps.module.js |
| Google Maps JS API (not a bower dep; loaded via `<script>` in src/index.html) | `google.maps.LatLng`, `google.maps.MapTypeId.ROADMAP`, `new google.maps.Map(canvas, opts)` | src/app/pages/maps/google-maps/GmapPageCtrl.js |

Not used in this area: smart-table, uib-*/`$uibModal`, toastr, xeditable, textAngular, js-tree, ui-select, ui-sortable, slimscroll, progress-button, Chartist, Morris, Chart.js/angular-chart.js, fullcalendar, ionRangeSlider, bootstrap-select/switch/tagsinput, easy-pie-chart, moment, highlight.js, font-awesome.

## 5. External non-Angular assets

| asset | where used |
|---|---|
| Google Maps JavaScript API `<script src="http://maps.google.com/maps/api/js?sensor=false">` (plain-http CDN, no API key) | src/index.html line 77 (global); consumed by src/app/pages/maps/google-maps/GmapPageCtrl.js |
| OpenStreetMap tile server `http://{s}.tile.osm.org/{z}/{x}/{y}.png` (plain-http external URL) and attribution link `http://osm.org/copyright` | src/app/pages/maps/leaflet/LeafletPageCtrl.js |
| Leaflet marker images copied to `assets/img/theme/vendor/leaflet/dist/images` (gulp/images.js copies `**/leaflet/dist/images/**/*`) | `L.Icon.Default.imagePath` in src/app/pages/maps/leaflet/LeafletPageCtrl.js |
| amMap images `assets/img/theme/vendor/ammap//dist/ammap/images/` (via `layoutPaths.images.amMap`, src/app/theme/theme.constants.js; copied by gulp/images.js) | `pathToImages` in MapBubblePageCtrl.js and MapLinesPageCtrl.js |
| amMap `worldLow` map definition (`ammap/dist/ammap/maps/js/worldLow.js`, injected by wiredep from bower override) | `AmCharts.maps.worldLow` (MapBubblePageCtrl.js), `map: 'worldLow'` (MapLinesPageCtrl.js) |
| Raw DOM access `document.getElementById('google-maps' / 'leaflet-map')` (no jQuery `$` usage in this area) | GmapPageCtrl.js, LeafletPageCtrl.js |
| Inline SVG path strings (`targetSVG`, `planeSVG`) | src/app/pages/maps/map-lines/MapLinesPageCtrl.js |
| Inline HTML in amMap balloon text `<span style="font-size:14px;"><b>[[title]]</b>: [[value]]</span>` and Leaflet popup `'A pretty CSS3 popup.<br> Easily customizable.'` | MapBubblePageCtrl.js, LeafletPageCtrl.js |
| Bootstrap 3 grid classes `row`, `col-md-12` | src/app/pages/maps/maps.html |
| Theme CSS class `widgets`, `viewport100` | maps.html (`widgets`); all four page templates (`viewport100`) |
| SCSS partials `src/sass/app/maps/_google-maps.scss`, `_leaflet.scss`, `_map-bubbles.scss`, `_map-lines.scss` (imported from src/sass/main.scss lines 62-65) | size `#google-maps`, `#leaflet-map`, `#map-bubbles`, `#map-lines` to `calc(100vh - 283px)`; `_leaflet.scss` is a full vendored copy of Leaflet 0.7 core CSS re-skinned with theme vars (`$primary-dark`, `$default-text`, `$danger`, `$disabled-bg`, `$disabled`, `$default`, `$dropdown-text`, `$font-thin`, `$font-bold`) and references `url(../img/layers.png)` / `layers-2x.png`; `_leaflet.scss` also contains IE-only `behavior: url(#default#VML)` and `progid:DXImageTransform` filters |
| Ionicons glyph `ion-ios-location-outline` | src/app/pages/maps/maps.module.js (sidebar) |

## 6. Cross-area dependencies

| dependency (defined outside this area) | kind | used in |
|---|---|---|
| `baConfig` (src/app/theme/theme.config.js / theme provider) – `.colors` (`primaryDark`, `primary`, `warning`, `warningDark`, `warningLight`, `danger`, `success`, `info`, `defaultText`) | provider/service | MapBubblePageCtrl.js, MapLinesPageCtrl.js |
| `layoutPaths` (src/app/theme/theme.constants.js) – `.images.amMap` | constant | MapBubblePageCtrl.js, MapLinesPageCtrl.js |
| `ba-panel` / `ba-panel-title` (src/app/theme/components/baPanel) | directive | google-maps.html, leaflet.html, map-bubbles.html, map-lines.html |
| `autoscroll-body-top` attribute handled in src/app/theme/theme.config.js (`baUtil.hasAttr`) | ui-view hook | maps.html |
| `AmCharts.themes.blur` – defined in src/app/pages/charts/amCharts/amCharts.module.js (`.config` of `BlurAdmin.pages.charts.amCharts`) | global set by another area | MapBubblePageCtrl.js (`AmCharts.theme = AmCharts.themes.blur`), MapLinesPageCtrl.js (`theme: 'blur'`) – **implicit load-order dependency on the charts area** |
| `sidebarMeta` / `title` state data consumed by `baSidebarService` (src/app/theme/components/baSidebar) and page-title logic | convention | maps.module.js |
| Theme SCSS variables (`$primary-dark`, `$default`, `$danger`, `$disabled*`, `$default-text`, `$dropdown-text`, `$font-thin`, `$font-bold`) from src/sass/theme/conf | SCSS | src/sass/app/maps/_leaflet.scss |
| CSS classes `widgets`, `viewport100` from theme SCSS | SCSS | maps.html and all page templates |

## 7. Migration risk notes

- **Global window objects**: `google.maps`, `L` (Leaflet 0.7), `AmCharts` / `AmCharts.maps.worldLow` / `AmCharts.themes.blur` are all accessed as untyped globals; nothing is injected. Angular versions will need `declare const` typings or wrapper services, and Leaflet 0.7 → 1.x has breaking API/CSS changes.
- **Direct DOM manipulation**: `document.getElementById('google-maps' | 'leaflet-map')` and `map.write('map-bubbles')` / `AmCharts.makeChart('map-lines', ...)` bind to hard-coded element IDs in the template; port to `@ViewChild`/`ElementRef` + `ngAfterViewInit`.
- **`$timeout(…, 100)` race hacks** in all four controllers to wait for the template DOM to exist; no cleanup/`destroy` of maps on state exit (memory leak / duplicate-instance risk when re-entering the state, and a problem for hybrid `downgradeComponent`).
- **Implicit cross-area load order**: `AmCharts.themes.blur` is defined in `pages/charts/amCharts/amCharts.module.js`; the maps area assumes it has run (not declared as a module dependency—`BlurAdmin.pages.maps` has `[]`).
- **Script/asset loading via `index.html` + wiredep**: Google Maps is a plain-`http://` CDN `<script>` without an API key (`sensor=false`, deprecated param; will show "For development purposes only"/fail on HTTPS); amMap + `worldLow.js` and Leaflet come from Bower via wiredep. Mixed-content risk for OSM tiles (`http://{s}.tile.osm.org`).
- **Hard-coded asset paths**: `L.Icon.Default.imagePath` and `layoutPaths.images.amMap` depend on the gulp `images` task copying vendor images into `assets/img/theme/vendor/...`.
- **Vendored CSS**: `_leaflet.scss` is a copy of Leaflet core CSS mixed with theme variables (and legacy IE VML filters); upgrading Leaflet requires re-vendoring or dropping this file.
- **Large inline data**: ~400 lines of static lat/long and population arrays live inside `MapBubblePageCtrl`; should move to a JSON/data service.
- **Bare `$scope`-less controllers with no `controllerAs`**: nothing to bind—easy to convert to components, but the templates are pure `ba-panel` wrappers so every page depends on the theme `baPanel` directive.
- No `$scope.$watch`, `$rootScope` events, `$templateCache`, `setInterval`, jQuery or inline `<script>` usage inside this area.

## 8. File list

| file | description |
|---|---|
| src/app/pages/maps/maps.module.js | Declares `BlurAdmin.pages.maps` module and `routeConfig` with abstract `maps` state + 4 child states and sidebar metadata. |
| src/app/pages/maps/maps.html | Parent template: `.widgets > .row > .col-md-12[ui-view autoscroll autoscroll-body-top]`. |
| src/app/pages/maps/google-maps/GmapPageCtrl.js | `GmapPageCtrl`: creates a Google Map (center 44.5403,-78.5463, zoom 8, ROADMAP) in `#google-maps` after 100 ms. |
| src/app/pages/maps/google-maps/google-maps.html | `ba-panel` "Google Maps" containing `<div id="google-maps">`. |
| src/app/pages/maps/leaflet/LeafletPageCtrl.js | `LeafletPageCtrl`: Leaflet map on `#leaflet-map` (London, zoom 13), OSM tiles, one marker with popup. |
| src/app/pages/maps/leaflet/leaflet.html | `ba-panel` "Leaflet" containing `<div id="leaflet-map">`. |
| src/app/pages/maps/map-bubbles/MapBubblePageCtrl.js | `MapBubblePageCtrl`: amMap world bubble map of 2011 population (static latlong + mapData arrays), colours from `baConfig`, written to `#map-bubbles`. |
| src/app/pages/maps/map-bubbles/map-bubbles.html | `ba-panel` "Map with Bubbles" containing `<div id="map-bubbles">`. |
| src/app/pages/maps/map-lines/MapLinesPageCtrl.js | `MapLinesPageCtrl`: amMap `makeChart` line map of flights from London/Vilnius with SVG icons, colours from `baConfig`, rendered to `#map-lines`. |
| src/app/pages/maps/map-lines/map-lines.html | `ba-panel` "Line Map" containing `<div id="map-lines">`. |
| src/sass/app/maps/_google-maps.scss | Sizes `#google-maps` (100% × `calc(100vh - 283px)`). |
| src/sass/app/maps/_leaflet.scss | Sizes `#leaflet-map` and vendors full Leaflet 0.7 CSS re-themed with BlurAdmin SCSS variables. |
| src/sass/app/maps/_map-bubbles.scss | Sizes `#map-bubbles`; contains commented-out legacy `#chartdiv1` rule. |
| src/sass/app/maps/_map-lines.scss | Sizes `#map-lines`. |
