# BlurAdmin: AngularJS 1.5 -> Angular hybrid migration

**Status: phase 2 (page ports integrated on `devin/phase2-migration`).** The theme shell and all
eight legacy page areas are ported to standalone Angular 20 components under
`blur-admin-modern/src/app/`; every legacy route (`/#/x/y` -> `/x/y`) renders in the modern app
with the same sidebar order and icons. The legacy app under `src/` is unchanged and remains the
reference for visual comparison. See [Phase 2 status](#phase-2-status) below and
[`PHASE2_CONVENTIONS.md`](PHASE2_CONVENTIONS.md) for the coding conventions.

## Phase 2 status

The migration switched from the ngUpgrade hybrid plan below to a **direct rewrite**: each area was
ported in parallel on its own branch and merged into `devin/phase2-migration` (theme shell first,
then charts, components, dashboard, form, maps, profile, tables, ui-a/b/c). Build passes, 262 Karma
specs pass, and all 29 routes were verified against `http://localhost:3000` (console error-free
except the keyless Google Maps `ApiProjectMapError`, which legacy shows too).

### Ported

| Area | Routes | Notes |
|---|---|---|
| theme shell | layout, sidebar, page-top, content-top, msg-center, back-top, `ba-panel`, `ba-wizard`, `ba-slider`, `ba-switcher`, progress modal, pipes/directives/services | see `PHASE2_CONVENTIONS.md` |
| dashboard | `/dashboard` | FullCalendar 6, amCharts 5 map, Chart.js pie/traffic, feed, todo, popular app |
| ui | `/ui/typography`, `buttons`, `icons`, `modals`, `grid`, `alerts`, `progressBars`, `notifications`, `tabs`, `slider`, `panels` | ng-bootstrap modals/tabs/accordion/dropdown, ngx-toastr, ngx-slider, hand-written progress button |
| components | `/components/mail/inbox` (+ label/detail), `timeline`, `tree` | ngx-quill editor, CDK tree + drag-drop |
| form | `/form/inputs`, `layouts`, `wizard` | ng-select, NgbDatepicker, hand-written tags/switch |
| tables | `/tables/basic`, `/tables/smart` | hand-written smart table + pagination + inline editing |
| charts | `/charts/chartJs`, `chartist`, `amCharts`, `morris` | Chart.js 4 / ng2-charts, chartist 1.5 directive, amCharts 5; Morris demos rebuilt with Chart.js |
| maps | `/maps/gmap`, `leaflet`, `bubble`, `line` | google.maps API (keyless), Leaflet 1.9, amCharts 5 map charts |
| profile | `/profile` | NgbModal social connect, BS5 form-switch |

### Deferred / deviations (with reasons)

- **Dropped, not replaced (DROP in baseline):** jQuery, jQuery UI, ui-sortable, slimscroll (native
  `overflow-y: auto`), bootstrap-switch (BS5 `form-switch`), bootstrap-select (native
  `form-select`; multiple selects are listboxes, no search box), bootstrap-tagsinput (hand-written
  chips), angular-xeditable / angular-smart-table (hand-written), angular-progress-button-styles
  (hand-written), sidebar swipe gestures.
- **Replaced by modern packages (LATER in baseline):** amCharts 3 -> `@amcharts/amcharts5` (line
  chart has no `negativeLineColor`, area y-axis shows raw minutes, zoom control bottom-right, pie
  hover brings slice to front); angular-chartist -> `chartist@1.5`; textAngular -> `ngx-quill`
  (raw-HTML toggle approximated by code-block, link/image via `prompt`); ng-js-tree -> CDK tree
  (drop re-parents to the target's parent only); angular-ui-select -> `@ng-select/ng-select`;
  Morris/Raphael -> Chart.js re-implementations; ui-calendar/fullcalendar 2 -> FullCalendar 6.
- **Behaviour intentionally not reproduced:** weather panel stays commented out as in legacy (the
  component exists, API key via input); Birthday Party calendar event uses the default colour
  (legacy referenced an undefined colour); traffic chart binds real percentages (legacy rendered
  0-width bars); legacy `basicTable.html` and `widgets/buttons.html` are orphaned and not ported;
  `includeWithScope` directive is not ported (use `ngTemplateOutlet`); toastr
  `preventOpenDuplicates` is a no-op.
- **Google Maps** loads keyless, so both apps show the "can't load Google Maps correctly" overlay.
- **Known remaining visual differences (theme-level):** Bootstrap 5 base typography/spacing is
  slightly larger than Bootstrap 3 (h2, `.btn` 16px vs 14px, table header weight/striping);
  ngx-slider uses the cyan theme rather than the red IonRangeSlider skin and draws a tick per step;
  Leaflet 1.9 zoom buttons are 30px vs 26px; amCharts 5 default palette differs from amCharts 3
  on the charts pie/funnel; `ba-wizard` shows a 25% fill on step 1 (legacy empty). The build warns
  about `assets/vendor/ionicons/css/ionicons.min.css` even though it is served and icons render.

### Not done in phase 2

- The `auth` pages (`Sign In`, `Sign Up`, `404`) are static sidebar entries only, as in legacy.
- No AngularJS 1.8 bump / `UpgradeModule`: the hybrid steps 2-3 below were superseded by the rewrite.
- Legacy Gulp pipeline untouched; `blur-admin-modern` is built with Angular CLI only.

## Original approach (phase 1 plan)

ngUpgrade-style hybrid migration:

1. **Baseline** (this phase): make the legacy Gulp 3 / Bower build reproducible
   ([`../BUILD_NOTES.md`](../BUILD_NOTES.md)), inventory every AngularJS registration, route
   and third-party dependency, and stand up an empty Angular CLI workspace whose runtime
   dependencies are derived from that inventory.
2. **Prepare legacy**: bump AngularJS 1.5.9 -> 1.8.x (ngUpgrade targets 1.5+ but 1.8 removes
   deprecated APIs that would otherwise be ported), convert `$scope` controllers to
   `.component()`s where the inventory shows they are instantiated via `ng-controller`, and
   remove direct jQuery DOM access from directives that must be downgraded.
3. **Bootstrap hybrid**: bootstrap the AngularJS app from the Angular workspace via
   `@angular/upgrade/static` (`UpgradeModule`), serve the legacy `src/app` bundle from the
   Angular CLI build, and expose the shared theme services (`baConfig`, `baSidebarService`,
   `layoutPaths`, `colorHelper`, ...) to Angular via `downgradeInjectable` / upgrade providers.
4. **Migrate leaf-first**: port the theme shell (`baPanel`, sidebar, top bar), then pages in
   order of dependency weight (profile, tables, form, ui, components, dashboard, charts, maps),
   replacing ui.router states with Angular Router routes one feature at a time. Bootstrap 3
   markup is rewritten to Bootstrap 5 / ng-bootstrap as each feature moves.
5. **Remove AngularJS**: once no `BlurAdmin.*` module remains, drop `UpgradeModule`, jQuery and
   the Bower vendor bundle.

## Artifacts

| Artifact | Purpose |
|---|---|
| [`../BUILD_NOTES.md`](../BUILD_NOTES.md) | Node/npm versions and exact commands that build and serve the legacy app |
| [`inventory/README.md`](inventory/README.md) | Consolidated inventory: module graph, route map, library-by-area matrix, shared theme infrastructure, recurring risks |
| [`inventory/*.md`](inventory/) | Per-area inventories (theme + 8 page areas): modules, registrations, states, libraries, assets, risks, file lists |
| [`DEPENDENCY_BASELINE.md`](DEPENDENCY_BASELINE.md) | Every `bower.json` and `package.json` dependency mapped to carry / later / no-equivalent / drop |
| [`PHASE2_CONVENTIONS.md`](PHASE2_CONVENTIONS.md) | Theme public API, SCSS entry points, route/sidebar conventions, dependency rules for page ports |
| [`../blur-admin-modern/`](../blur-admin-modern/) | Angular 20 workspace containing the ported theme shell and all page areas; see its README for versions and packages |

## Out of scope for phase 1 (now done in phase 2)

- Any port of legacy code into `blur-admin-modern/` — done.
- The AngularJS 1.8 upgrade, `UpgradeModule` wiring — dropped in favour of the direct rewrite.
- Choosing component-specific replacements marked LATER in the dependency baseline — see above.
