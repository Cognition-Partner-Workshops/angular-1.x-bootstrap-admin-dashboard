# PHASE4_WAVE1_ORCHESTRATION - Wave 1 Screen Migration Assignments

Pre-flight artifact for AngularJS 1.x to Angular LTS migration.
Generated: 2026-01-28
Phase: 4 - Screen Migration (Wave 1)

---

## Wave 1 Overview

**Wave Name:** Simple UI Screens
**Description:** UI screens with minimal service dependencies. Only depend on Wave 0 foundations (baPanel, baConfig).
**Priority:** High
**Estimated Complexity:** Low
**Total Screens:** 8
**Parallel Migration:** All 8 screens can be migrated in parallel

---

## Operating Model

- **One task = one screen** (no multi-screen PRs)
- **One worker agent owns exactly one task at a time**
- **All work merges into `angular` branch** via small PRs
- **Branch naming:** `upgrade/ui/<screen-id>-<slug>` or `upgrade/form/<screen-id>-<slug>`
- **Every migrated screen must include parity E2E coverage** (legacy vs `/upgrade`)

---

## Wave 1 Screen Assignments

### TASK-W1-001: Typography Screen (SCR-041)

| Property | Value |
|----------|-------|
| Screen ID | SCR-041 |
| Route Key | `ui.typography` |
| URL (Legacy) | `/ui/typography` |
| URL (Upgrade) | `/upgrade/ui/typography` |
| Branch Name | `upgrade/ui/scr-041-typography` |

**Legacy Entry Points:**
- Module: `BlurAdmin.pages.ui.typography`
- Template: `src/app/pages/ui/typography/typography.html`
- Controller: None (static content)
- Module File: `src/app/pages/ui/typography/typography.module.js`

**Dependencies:**
- baPanel directive (Wave 0 - READY)
- No service dependencies
- No external library dependencies

**Parity Tests Required:**
- Route navigation test: `/ui/typography` loads correctly
- Visual parity: Typography examples render identically
- Responsive behavior: Layout adapts to screen sizes

---

### TASK-W1-002: Grid Screen (SCR-045)

| Property | Value |
|----------|-------|
| Screen ID | SCR-045 |
| Route Key | `ui.grid` |
| URL (Legacy) | `/ui/grid` |
| URL (Upgrade) | `/upgrade/ui/grid` |
| Branch Name | `upgrade/ui/scr-045-grid` |

**Legacy Entry Points:**
- Module: `BlurAdmin.pages.ui.grid`
- Template: `src/app/pages/ui/grid/grid.html`
- Controller: None (static content)
- Module File: `src/app/pages/ui/grid/grid.module.js`

**Dependencies:**
- baPanel directive (Wave 0 - READY)
- No service dependencies
- No external library dependencies

**Parity Tests Required:**
- Route navigation test: `/ui/grid` loads correctly
- Visual parity: Grid layout examples render identically
- Responsive behavior: Grid columns adapt correctly

---

### TASK-W1-003: Alerts Screen (SCR-046)

| Property | Value |
|----------|-------|
| Screen ID | SCR-046 |
| Route Key | `ui.alerts` |
| URL (Legacy) | `/ui/alerts` |
| URL (Upgrade) | `/upgrade/ui/alerts` |
| Branch Name | `upgrade/ui/scr-046-alerts` |

**Legacy Entry Points:**
- Module: `BlurAdmin.pages.ui.alerts`
- Template: `src/app/pages/ui/alerts/alerts.html`
- Controller: None (static content)
- Module File: `src/app/pages/ui/alerts/alerts.module.js`

**Dependencies:**
- baPanel directive (Wave 0 - READY)
- No service dependencies
- No external library dependencies

**Parity Tests Required:**
- Route navigation test: `/ui/alerts` loads correctly
- Visual parity: Alert styles (success, info, warning, danger) render identically
- Dismissible alerts function correctly

---

### TASK-W1-004: Progress Bars Screen (SCR-047)

| Property | Value |
|----------|-------|
| Screen ID | SCR-047 |
| Route Key | `ui.progressBars` |
| URL (Legacy) | `/ui/progressBars` |
| URL (Upgrade) | `/upgrade/ui/progress-bars` |
| Branch Name | `upgrade/ui/scr-047-progress-bars` |

**Legacy Entry Points:**
- Module: `BlurAdmin.pages.ui.progressBars`
- Template: `src/app/pages/ui/progressBars/progressBars.html`
- Controller: None (static content)
- Module File: `src/app/pages/ui/progressBars/progressBars.module.js`

**Dependencies:**
- baPanel directive (Wave 0 - READY)
- progressBarRound directive (simple, self-contained - migrate inline)
- No external library dependencies

**Parity Tests Required:**
- Route navigation test: `/ui/progressBars` loads correctly
- Visual parity: Progress bar styles (basic, label, striped, animated, stacked) render identically
- Animated progress bars animate correctly

---

### TASK-W1-005: Tabs & Accordions Screen (SCR-049)

| Property | Value |
|----------|-------|
| Screen ID | SCR-049 |
| Route Key | `ui.tabs` |
| URL (Legacy) | `/ui/tabs` |
| URL (Upgrade) | `/upgrade/ui/tabs` |
| Branch Name | `upgrade/ui/scr-049-tabs` |

**Legacy Entry Points:**
- Module: `BlurAdmin.pages.ui.tabs`
- Template: `src/app/pages/ui/tabs/tabs.html`
- Controller: None (static content)
- Module File: `src/app/pages/ui/tabs/tabs.module.js`

**Dependencies:**
- baPanel directive (Wave 0 - READY)
- ui.bootstrap tabs (replace with ngx-bootstrap or Angular equivalent)
- No service dependencies

**Parity Tests Required:**
- Route navigation test: `/ui/tabs` loads correctly
- Tab switching works correctly
- Accordion expand/collapse works correctly
- Visual parity: Tab and accordion styles match

---

### TASK-W1-006: Panels Screen (SCR-051)

| Property | Value |
|----------|-------|
| Screen ID | SCR-051 |
| Route Key | `ui.panels` |
| URL (Legacy) | `/ui/panels` |
| URL (Upgrade) | `/upgrade/ui/panels` |
| Branch Name | `upgrade/ui/scr-051-panels` |

**Legacy Entry Points:**
- Module: `BlurAdmin.pages.ui.panels`
- Template: `src/app/pages/ui/panels/panels.html`
- Controller: `NotificationsPageCtrl` (minimal usage)
- Module File: `src/app/pages/ui/panels/panels.module.js`

**Dependencies:**
- baPanel directive (Wave 0 - READY)
- No external library dependencies

**Parity Tests Required:**
- Route navigation test: `/ui/panels` loads correctly
- Visual parity: Panel variations render identically
- Panel interactions (if any) work correctly

---

### TASK-W1-007: Form Layouts Screen (SCR-012)

| Property | Value |
|----------|-------|
| Screen ID | SCR-012 |
| Route Key | `form.layouts` |
| URL (Legacy) | `/form/layouts` |
| URL (Upgrade) | `/upgrade/form/layouts` |
| Branch Name | `upgrade/form/scr-012-layouts` |

**Legacy Entry Points:**
- Module: `BlurAdmin.pages.form`
- Template: `src/app/pages/form/layouts/layouts.html`
- Controller: None (static content)

**Dependencies:**
- baPanel directive (Wave 0 - READY)
- No service dependencies
- No external library dependencies

**Parity Tests Required:**
- Route navigation test: `/form/layouts` loads correctly
- Visual parity: Form layout examples (basic, inline, horizontal, block) render identically
- Form validation styling matches

---

### TASK-W1-008: Timeline Screen (SCR-064)

| Property | Value |
|----------|-------|
| Screen ID | SCR-064 |
| Route Key | `components.timeline` |
| URL (Legacy) | `/components/timeline` |
| URL (Upgrade) | `/upgrade/components/timeline` |
| Branch Name | `upgrade/components/scr-064-timeline` |

**Legacy Entry Points:**
- Module: `BlurAdmin.pages.components.timeline`
- Template: `src/app/pages/components/timeline/timeline.html`
- Controller: `TimelineCtrl`
- Module File: `src/app/pages/components/timeline/timeline.module.js`

**Dependencies:**
- baPanel directive (Wave 0 - READY)
- No external library dependencies
- TimelineCtrl has no service dependencies (simple data controller)

**Parity Tests Required:**
- Route navigation test: `/components/timeline` loads correctly
- Visual parity: Timeline items render identically
- Timeline data displays correctly

---

## Worker Instructions

### Before Starting

1. Checkout the `angular` branch: `git checkout angular && git pull origin angular`
2. Create your feature branch: `git checkout -b upgrade/<area>/<screen-id>-<slug>`
3. Verify the upgrade app builds: `cd upgrade && npm run build`

### During Migration

1. Follow the screen scaffold template in `upgrade/FOUNDATIONS_SCREEN_SCAFFOLD.md`
2. Use shared components from `upgrade/src/app/shared/components/`
3. Reference the usage guidelines in `upgrade/FOUNDATIONS_USAGE_GUIDELINES.md`
4. Keep PRs focused on the assigned screen only
5. Do NOT modify shared components without approval

### Before PR

1. Run lint: `cd upgrade && npm run lint`
2. Run tests: `cd upgrade && npm test`
3. Verify build: `cd upgrade && npm run build`
4. Create parity tests for the screen

### PR Requirements

- Branch: `upgrade/<area>/<screen-id>-<slug>`
- Base: `angular`
- Title: `[Phase 4] Migrate <Screen Name> (SCR-XXX)`
- Include parity test results in PR description

---

## Wave 1 Completion Criteria

- [ ] All 8 screens merged into `angular` branch
- [ ] Parity E2E suite passes for both legacy and `/upgrade`
- [ ] No regressions in existing functionality
- [ ] All blockers logged with owners and next actions

---

## Next Wave Preview

**Wave 2: Interactive UI & Forms** (10 screens)
- ui.buttons, ui.icons, ui.slider, ui.modals, ui.notifications
- form.inputs, form.wizard
- components.tree
- tables.basic, tables.smart

Wave 2 will be scheduled after Wave 1 completion.
