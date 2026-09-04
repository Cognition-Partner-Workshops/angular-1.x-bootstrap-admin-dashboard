# Legacy build notes (AngularJS 1.5 / Gulp 3 / Bower 1.8)

Reproducible baseline for the legacy app in `src/`. This is the version the hybrid
migration starts from; see `migration/README.md`.

## Working toolchain

| Tool | Version |
|---|---|
| Node | `v10.24.1` (via nvm) |
| npm | `6.14.12` |
| gulp (CLI and local) | `3.9.1` |
| Bower | `1.8.14` (`node_modules/.bin/bower`) |

Node 8 was not tried: nvm on this machine lists `v8.17.0` only as an unavailable (`N/A`)
version. Node 10 is sufficient and is the version the repo's dev environment pins.

## Commands

From the repository root:

```sh
source ~/.nvm/nvm.sh
nvm use 10
npm install          # postinstall runs `bower install`
npx gulp build       # production build -> release/
npx gulp serve       # BrowserSync dev server -> http://localhost:3000 (UI on :3001)
```

## Results

- `npm install` succeeds. The `postinstall` hook runs `bower install` with no interactive
  resolution prompt: `bower.json` resolutions select `angular#1.5.11` (`~1.5.9`) and
  `jquery#3.1.1`. The git-sourced `bootstrap-tagsinput`
  (`TimSchlechter/bootstrap-tagsinput#master`) resolves to commit `7a2ad21d19`. npm warns
  about the missing `repository`/`license` fields and skips the macOS-only optional
  `fsevents@1.2.13`; both are harmless. No manifest changes were required.
- `npx gulp build` (same as the `default` task) succeeds and writes to `release/` (not
  `dist/`): `index.html`, `auth.html`, `reg.html`, `404.html`, hashed CSS/JS with source
  maps, fonts and assets. node-sass prints repeated deprecation warnings for colour
  arithmetic in `src/sass/theme/_buttons.scss`; the build still succeeds.
- `npx gulp serve` starts BrowserSync on port 3000 serving `.tmp/serve`;
  `curl http://localhost:3000` returns `index.html` with `ng-app="BlurAdmin"`.

## Caveats

- Node >= 12 does not work: under Node 20 `npx gulp build` fails before running any task with
  `ReferenceError: primordials is not defined` (Gulp 3 / old `graceful-fs` via `natives`).
  `gulp-sass@4` also depends on `node-sass@4.14`, which only ships a prebuilt binary up to
  Node 14. Stay on Node 10 for the legacy app.
- `npm install` produces an untracked `package-lock.json`; it is intentionally not committed
  so the legacy install stays driven by the `~` ranges in `package.json`, as upstream did.
- The modern Angular workspace in `blur-admin-modern/` requires Node 20 (see its README); use
  `nvm use 10` / `nvm use 20` when switching between the two.
