# BlurAdmin: AngularJS 1.5 -> Angular hybrid migration

**Status: phase 1 (baseline + inventory + empty target). No components, routes, services,
templates or styles have been migrated.** The legacy app under `src/` is unchanged and remains
the only runnable product.

## Approach

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
| [`../blur-admin-modern/`](../blur-admin-modern/) | Empty Angular CLI workspace (routing + SCSS) with only the carried baseline packages installed; see its README for versions |

## Out of scope for phase 1

- Any port of legacy code into `blur-admin-modern/`.
- The AngularJS 1.8 upgrade, `UpgradeModule` wiring, and any change to the legacy Gulp pipeline.
- Choosing component-specific replacements marked LATER in the dependency baseline.
