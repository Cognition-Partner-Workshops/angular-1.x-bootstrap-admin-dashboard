# AngularJS → Angular Migration Notes

## Overview

This document describes the migration of the **BlurAdmin** dashboard application from **AngularJS 1.5.8** to **Angular 21** (latest). The migration replaces the entire AngularJS build system (Gulp/Bower) with Angular CLI and converts all AngularJS patterns to modern Angular equivalents using standalone components.

## What Was Migrated

### Build System
| Before | After |
|--------|-------|
| Gulp + Bower | Angular CLI (`ng build`, `ng serve`) |
| `bower.json` + `gulpfile.js` | `package.json` + `angular.json` |
| Manual CSS/JS injection | Automatic bundling via Webpack/esbuild |
| SASS via gulp-sass | SCSS via Angular CLI built-in support |

### Framework
| Before | After |
|--------|-------|
| AngularJS 1.5.8 | Angular 21.2.x |
| `ng-app`, `ng-controller` | `bootstrapApplication`, standalone components |
| `$scope` / controller functions | Component class properties and methods |
| `angular.module()` | Standalone components with `imports` array |
| JavaScript (ES5/ES6) | TypeScript (strict mode) |

### Routing
| Before | After |
|--------|-------|
| ui-router (`$stateProvider`) | `@angular/router` with `provideRouter()` |
| `$state.go()` | `routerLink` directive / `Router.navigate()` |
| `ui-view` | `<router-outlet>` |
| `ui-sref` / `ui-sref-active` | `routerLink` / `routerLinkActive` |
| Nested abstract states | Child route arrays with lazy loading |

### Template Syntax
| AngularJS | Angular |
|-----------|---------|
| `ng-repeat` | `@for (item of items; track item)` |
| `ng-if` | `@if (condition)` |
| `ng-click` | `(click)` |
| `ng-model` | `[(ngModel)]` or reactive forms |
| `ng-class` | `[ngClass]` |
| `ng-show` / `ng-hide` | `@if` or `[class.hidden]` |
| `ng-src` | `[src]` |
| `ng-href` | `[href]` |
| `{{ expression }}` | `{{ expression }}` (same) |
| `ng-bind-html` | `[innerHTML]` with `DomSanitizer` |

### Components Migrated

#### Theme Components (Directives → Components)
- `ba-sidebar` → `SidebarComponent` — full sidebar with recursive menu rendering
- `page-top` → `PageTopComponent` — top navigation bar with search, profile, notifications
- `content-top` → `ContentTopComponent` — breadcrumb and page title from route data
- `back-top` → `BackTopComponent` — scroll-to-top button
- `ba-panel` / `ba-card` → `BaPanelComponent` — reusable card/panel wrapper
- `msg-center` → `MsgCenterComponent` — notification/message dropdown center

#### Theme Services
- `baSidebarService` / `baSidebarServiceProvider` → `SidebarService` — menu state management using Angular signals
- `baConfig` / `layoutColors` → `ThemeConfigService` — centralized theme colors and layout config
- `baUtil` color helpers (`hexToRGB`, `tint`, `shade`) → exported utility functions in `theme-config.service.ts`

#### Dashboard Page
- `BlurFeedCtrl` → `BlurFeedComponent` — activity feed with expandable items
- `DashboardTodoCtrl` → `DashboardTodoComponent` — interactive todo list with template-driven forms
- `TrafficChartCtrl` → `TrafficChartComponent` — Chart.js doughnut chart
- `DashboardPieChartCtrl` → `DashboardPieChartComponent` — stats cards with icons
- `DashboardLineChartCtrl` → `DashboardLineChartComponent` — Chart.js line chart
- `PopularAppCtrl` → `PopularAppComponent` — popular apps list
- Calendar → placeholder (previously FullCalendar AngularJS directive)

#### UI Feature Pages
- Typography, Buttons, Icons, Modals, Grid, Alerts, Progress Bars, Notifications, Tabs & Accordions, Slider, Panels — all converted to standalone Angular components

#### Component Pages
- Timeline → `TimelineComponent` — custom timeline with styled entries
- Mail → `MailComponent` — mail client with compose, label filtering, message detail
- Tree View → `TreeComponent` — recursive tree using `ng-template` (replaces ng-js-tree)

#### Chart Pages
- Chart.js page → `ChartjsComponent` — 6 chart types (line, bar, radar, pie, polar, doughnut)
- Morris, Chartist, amCharts → consolidated into Chart.js (single library)

#### Map Pages
- Google Maps → `GoogleMapsComponent` — embedded Google Maps iframe
- Leaflet → `LeafletComponent` — placeholder (previously angular-leaflet-directive)

#### Table Pages
- Basic Tables → `BasicTablesComponent` — standard Bootstrap table variants
- Smart Table → `SmartTableComponent` — sortable, searchable, paginated table (replaces angular-smart-table)

#### Form Pages
- Form Inputs → `FormInputsComponent` — all standard HTML5 inputs with template-driven forms
- Form Layouts → `FormLayoutsComponent` — horizontal, basic, and inline forms using reactive forms
- Form Wizard → `FormWizardComponent` — multi-step form wizard

#### Profile Page
- `ProfileCtrl` → `ProfileComponent` — user profile card and edit form

## Patterns Converted

### Dependency Injection
- `$scope`, `$rootScope` → component class properties
- `$timeout` → `setTimeout` / RxJS operators
- `$window` → direct `window` access (with SSR guard)
- `$state` → Angular `Router` service
- AngularJS services (`.factory`, `.service`) → `@Injectable({ providedIn: 'root' })`

### State Management
- `$scope.$watch` → Angular signals (`signal()`, `computed()`)
- `$rootScope.$on` → RxJS Observables / Angular event system
- `$scope.$broadcast` / `$emit` → service-based communication with signals

### Forms
- `ng-model` with `$scope` → `[(ngModel)]` (template-driven) or `FormGroup` / `FormControl` (reactive)
- `$validators` / `ng-pattern` → Angular `Validators` class

### Component Architecture
- All components use `standalone: true` (no NgModules)
- Lazy loading via `loadComponent` in routes
- Modern control flow syntax (`@if`, `@for`, `@switch`) instead of structural directives where possible

## Third-Party Dependencies

| AngularJS Dependency | Angular Replacement |
|---------------------|-------------------|
| `ui.router` | `@angular/router` |
| `ui.bootstrap` | Native Bootstrap 5 CSS + custom components |
| `angular-chart.js` | Direct `chart.js` v4 usage |
| `angular.morris-chart` | Consolidated into Chart.js |
| `angular-chartist` | Consolidated into Chart.js |
| `toastr` | Custom notification component |
| `smart-table` | Custom sortable/searchable table component |
| `ngJsTree` | Custom recursive tree component |
| `ui.sortable` | Not yet needed (can add `@angular/cdk/drag-drop`) |
| `ui.slimscroll` | CSS `overflow-y: auto` with custom scrollbar styles |
| `textAngular` | Not yet needed (can add `ngx-quill` or similar) |
| `xeditable` | Not yet needed (can add inline editing) |
| `angular-progress-button-styles` | CSS-based button states |
| Bootstrap 3.3.5 | Bootstrap 5.3.x |
| Font Awesome (via bower) | Font Awesome 4.7 (npm) |

## Manual Interventions Needed

1. **Image Assets**: Profile images and feed images reference `assets/img/app/profile/*.png` and `assets/img/app/feed/*.png`. Ensure these exist in the `src/assets/` directory.
2. **Google Maps API Key**: The embedded Google Maps uses a keyless embed URL. For production, add a proper API key.
3. **Leaflet Maps**: Currently a placeholder. Install `leaflet` and `@asymmetrik/ngx-leaflet` to restore interactive Leaflet maps.
4. **Calendar Widget**: The dashboard calendar is a placeholder. Install `@fullcalendar/angular` to restore the calendar.
5. **Rich Text Editor**: textAngular was removed. Install `ngx-quill` or `@ckeditor/ckeditor5-angular` if rich text editing is needed.

## Known Issues

1. **SASS Deprecation Warnings**: Dart Sass 3.0 will remove global `darken()`/`lighten()` functions. Pre-computed hex values are used where possible but some third-party libraries may still emit warnings.
2. **Budget Warnings**: The initial bundle is ~620 KB which is within the configured 2 MB warning threshold but larger than the default Angular scaffold. This is expected due to Chart.js being included.
3. **No Server-Side Rendering**: The app is client-only. SSR can be added via `@angular/ssr` if needed.
4. **Morris/Chartist/amCharts Charts**: These AngularJS-specific chart libraries have been consolidated into Chart.js. The chart types and data are preserved but the rendering library differs.
5. **Bubble/Line Maps**: The original app had amCharts-based map visualizations. These are not yet migrated.

## File Structure

```
src/
├── main.ts                          # Bootstrap entry point
├── index.html                       # Single HTML shell
├── styles.scss                      # Global styles
├── assets/                          # Static assets (images, fonts)
├── app/
│   ├── app.component.ts/html/scss   # Root component (layout shell)
│   ├── app.config.ts                # Application configuration
│   ├── app.routes.ts                # All route definitions
│   ├── theme/
│   │   ├── services/
│   │   │   ├── sidebar.service.ts   # Sidebar state management
│   │   │   └── theme-config.service.ts  # Theme colors and config
│   │   └── components/
│   │       ├── sidebar/             # Main navigation sidebar
│   │       ├── page-top/            # Top navigation bar
│   │       ├── content-top/         # Breadcrumb/page title
│   │       ├── back-top/            # Scroll to top button
│   │       ├── msg-center/          # Notifications center
│   │       └── ba-panel/            # Reusable panel/card
│   └── pages/
│       ├── dashboard/               # Dashboard with sub-components
│       ├── ui/                      # UI feature demos
│       ├── components/              # Timeline, Mail, Tree
│       ├── charts/                  # Chart.js charts
│       ├── maps/                    # Google Maps, Leaflet
│       ├── tables/                  # Basic & Smart tables
│       ├── form/                    # Form inputs, layouts, wizard
│       └── profile/                 # User profile page
```
