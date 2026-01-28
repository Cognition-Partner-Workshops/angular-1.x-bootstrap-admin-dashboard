# PREFLIGHT_PARITY_TEST_PLAN.md

Pre-flight artifact for AngularJS 1.x to Angular LTS migration.
Generated: 2026-01-28

This document provides an initial parity test plan to verify that the migrated Angular application behaves identically to the legacy AngularJS application.

---

## Test Plan Overview

### Objectives
1. Verify all screens render correctly after migration
2. Verify all navigation flows work identically
3. Verify all user interactions produce same results
4. Verify visual appearance matches legacy app
5. Verify responsive behavior matches legacy app

### Test Approach
- Manual testing for visual parity
- Automated E2E tests for navigation and interactions
- Screenshot comparison for visual regression
- Cross-browser testing for compatibility

---

## Test Categories

### Category 1: Navigation Tests (NAV)

These tests verify routing and navigation behavior.

| Test ID | Description | Steps | Expected Result | Screen Ref |
|---------|-------------|-------|-----------------|------------|
| NAV-001 | Default route redirect | Navigate to `/` | Redirects to `/dashboard` | SCR-001 |
| NAV-002 | Unknown route redirect | Navigate to `/nonexistent` | Redirects to `/dashboard` | SCR-001 |
| NAV-003 | Tables default redirect | Navigate to `/tables` | Redirects to `/tables/basic` | SCR-021 |
| NAV-004 | Mail default redirect | Navigate to `/components/mail` | Redirects to `/components/mail/inbox` | SCR-062 |
| NAV-005 | Direct URL access | Navigate directly to `/form/wizard` | Form wizard loads | SCR-013 |
| NAV-006 | Browser back button | Navigate dashboard -> forms -> back | Returns to dashboard | - |
| NAV-007 | Browser forward button | Back then forward | Returns to forms | - |
| NAV-008 | Page refresh | Refresh on `/ui/buttons` | Same page reloads | SCR-042 |
| NAV-009 | Route params - mail label | Navigate to `/components/mail/sent` | Sent messages display | SCR-062 |
| NAV-010 | Route params - mail detail | Navigate to `/components/mail/inbox/4563faass` | Message detail displays | SCR-063 |

---

### Category 2: Sidebar Tests (SB)

These tests verify sidebar navigation component behavior.

| Test ID | Description | Steps | Expected Result | Invariant Ref |
|---------|-------------|-------|-----------------|---------------|
| SB-001 | Menu items render | Load app | All menu items visible in correct order | INV-003-A,B |
| SB-002 | Static items render | Load app | Pages and Menu Level 1 items visible | INV-003-C |
| SB-003 | Submenu expand | Click "Form Elements" | Submenu expands showing child items | INV-003-F |
| SB-004 | Active state | Navigate to `/ui/buttons` | Buttons item highlighted, UI Features expanded | INV-003-E |
| SB-005 | Collapse toggle | Click collapse button | Sidebar collapses to icons only | INV-003-G |
| SB-006 | Collapsed state persist | Collapse, navigate, check | Sidebar remains collapsed | INV-003-G |
| SB-007 | External link - new tab | Click "Sign In" | auth.html opens in new tab | INV-003-N |
| SB-008 | Internal link - same tab | Click "User Profile" | Navigates to profile in same tab | INV-003-O |
| SB-009 | Disabled item | Click "Menu Level 1.1" | No navigation occurs | INV-003-P |
| SB-010 | Responsive collapse | Resize to 1000px | Sidebar auto-collapses | INV-003-I |
| SB-011 | Responsive hide | Resize to 400px | Sidebar hides, hamburger visible | INV-003-J |
| SB-012 | Mobile toggle | On mobile, click hamburger | Sidebar slides in | INV-003-K |

---

### Category 3: Dashboard Tests (DASH)

These tests verify dashboard screen and widgets.

| Test ID | Description | Steps | Expected Result | Screen Ref |
|---------|-------------|-------|-----------------|------------|
| DASH-001 | Dashboard loads | Navigate to `/dashboard` | All widgets render | SCR-001 |
| DASH-002 | Todo list renders | Check todo widget | 10 items with random colors | SCR-001 |
| DASH-003 | Todo add item | Type text, press Enter | New item added to top | SCR-001 |
| DASH-004 | Todo add via button | Type text, click plus | New item added to top | SCR-001 |
| DASH-005 | Traffic chart renders | Check traffic widget | Doughnut chart with 4 segments | SCR-001 |
| DASH-006 | Line chart renders | Check line chart widget | AmCharts line chart displays | SCR-001 |
| DASH-007 | Calendar renders | Check calendar widget | FullCalendar displays | SCR-001 |
| DASH-008 | Feed renders | Check feed widget | Activity feed items display | SCR-001 |
| DASH-009 | Pie chart renders | Check pie chart widget | Pie chart displays | SCR-001 |
| DASH-010 | Map renders | Check map widget | AmMap displays | SCR-001 |

---

### Category 4: Form Tests (FORM)

These tests verify form screens and interactions.

| Test ID | Description | Steps | Expected Result | Screen Ref |
|---------|-------------|-------|-----------------|------------|
| FORM-001 | Inputs page loads | Navigate to `/form/inputs` | All input widgets render | SCR-011 |
| FORM-002 | Text input | Type in text field | Text appears | SCR-011 |
| FORM-003 | Select dropdown | Click select, choose option | Option selected | SCR-011 |
| FORM-004 | Date picker | Click date field | Calendar popup appears | SCR-011 |
| FORM-005 | Switch toggle | Click switch | Switch toggles state | SCR-011 |
| FORM-006 | Tags input | Type tag, press Enter | Tag added | SCR-011 |
| FORM-007 | Validation states | Check validation examples | Success/warning/error styles show | SCR-011 |
| FORM-008 | Layouts page loads | Navigate to `/form/layouts` | All layout examples render | SCR-012 |
| FORM-009 | Wizard page loads | Navigate to `/form/wizard` | Wizard with steps renders | SCR-013 |
| FORM-010 | Wizard step 1 | Fill personal info | Data captured in vm.personalInfo | SCR-013 |
| FORM-011 | Wizard password match | Enter mismatched passwords | Validation fails | SCR-013 |
| FORM-012 | Wizard step navigation | Click step 2 | Navigates to step 2 | SCR-013 |
| FORM-013 | Wizard back | Click back on step 2 | Returns to step 1, data preserved | SCR-013 |

---

### Category 5: Table Tests (TBL)

These tests verify table screens and interactions.

| Test ID | Description | Steps | Expected Result | Screen Ref |
|---------|-------------|-------|-----------------|------------|
| TBL-001 | Basic tables load | Navigate to `/tables/basic` | All table examples render | SCR-021 |
| TBL-002 | Smart tables load | Navigate to `/tables/smart` | Smart table renders with data | SCR-022 |
| TBL-003 | Pagination | Click page 2 | Second page of data displays | SCR-022 |
| TBL-004 | Sort ascending | Click column header | Data sorts ascending | SCR-022 |
| TBL-005 | Sort descending | Click same header again | Data sorts descending | SCR-022 |
| TBL-006 | Filter | Type in search field | Rows filter to match | SCR-022 |
| TBL-007 | Inline edit | Click editable cell | Editor appears | SCR-022 |
| TBL-008 | Save edit | Edit and confirm | Cell value updates | SCR-022 |
| TBL-009 | Add row | Click add button | New row inserted | SCR-022 |
| TBL-010 | Delete row | Click delete button | Row removed | SCR-022 |

---

### Category 6: Chart Tests (CHART)

These tests verify chart screens render correctly.

| Test ID | Description | Steps | Expected Result | Screen Ref |
|---------|-------------|-------|-----------------|------------|
| CHART-001 | amCharts page loads | Navigate to `/charts/amCharts` | All amCharts render | SCR-031 |
| CHART-002 | amCharts line | Check line chart | Line chart with data | SCR-031 |
| CHART-003 | amCharts area | Check area chart | Area chart with data | SCR-031 |
| CHART-004 | amCharts bar | Check bar chart | Bar chart with data | SCR-031 |
| CHART-005 | amCharts pie | Check pie chart | Pie chart with data | SCR-031 |
| CHART-006 | amCharts funnel | Check funnel chart | Funnel chart with data | SCR-031 |
| CHART-007 | amCharts gantt | Check gantt chart | Gantt chart with data | SCR-031 |
| CHART-008 | Chartist page loads | Navigate to `/charts/chartist` | Chartist charts render | SCR-032 |
| CHART-009 | Chart.js page loads | Navigate to `/charts/chartJs` | Chart.js charts render | SCR-033 |
| CHART-010 | Chart.js animation | Observe chart load | Animation plays (2.5s) | SCR-033 |
| CHART-011 | Morris page loads | Navigate to `/charts/morris` | Morris charts render | SCR-034 |
| CHART-012 | Chart colors | Check any chart | Colors match baConfig.colors | INV-004-D |

---

### Category 7: UI Components Tests (UI)

These tests verify UI feature screens.

| Test ID | Description | Steps | Expected Result | Screen Ref |
|---------|-------------|-------|-----------------|------------|
| UI-001 | Typography loads | Navigate to `/ui/typography` | Typography examples render | SCR-041 |
| UI-002 | Buttons loads | Navigate to `/ui/buttons` | Button examples render | SCR-042 |
| UI-003 | Button click | Click progress button | Button shows progress animation | SCR-042 |
| UI-004 | Icons loads | Navigate to `/ui/icons` | Icon sets render | SCR-043 |
| UI-005 | Modals loads | Navigate to `/ui/modals` | Modal buttons render | SCR-044 |
| UI-006 | Basic modal | Click basic modal button | Modal opens | SCR-044 |
| UI-007 | Modal close X | Click X button | Modal closes | SCR-044 |
| UI-008 | Modal close backdrop | Click outside modal | Modal closes | SCR-044 |
| UI-009 | Progress modal | Click progress button | Modal with progress bar | SCR-044 |
| UI-010 | Grid loads | Navigate to `/ui/grid` | Grid examples render | SCR-045 |
| UI-011 | Alerts loads | Navigate to `/ui/alerts` | Alert examples render | SCR-046 |
| UI-012 | Progress bars loads | Navigate to `/ui/progressBars` | Progress bar examples render | SCR-047 |
| UI-013 | Notifications loads | Navigate to `/ui/notifications` | Notification controls render | SCR-048 |
| UI-014 | Toast notification | Click info button | Toast appears | SCR-048 |
| UI-015 | Toast dismiss | Click toast | Toast dismisses | SCR-048 |
| UI-016 | Tabs loads | Navigate to `/ui/tabs` | Tab examples render | SCR-049 |
| UI-017 | Tab switch | Click different tab | Tab content changes | SCR-049 |
| UI-018 | Accordion | Click accordion header | Panel expands/collapses | SCR-049 |
| UI-019 | Slider loads | Navigate to `/ui/slider` | Slider examples render | SCR-050 |
| UI-020 | Slider drag | Drag slider handle | Value changes | SCR-050 |
| UI-021 | Panels loads | Navigate to `/ui/panels` | Panel examples render | SCR-051 |

---

### Category 8: Components Tests (COMP)

These tests verify component screens.

| Test ID | Description | Steps | Expected Result | Screen Ref |
|---------|-------------|-------|-----------------|------------|
| COMP-001 | Mail loads | Navigate to `/components/mail/inbox` | Inbox messages display | SCR-062 |
| COMP-002 | Mail folder switch | Click "Sent" tab | Sent messages display | SCR-062 |
| COMP-003 | Mail message click | Click message row | Message detail displays | SCR-063 |
| COMP-004 | Mail compose | Click compose button | Compose modal opens | SCR-061 |
| COMP-005 | Mail badge count | Check inbox tab | Badge shows "7" | SCR-061 |
| COMP-006 | Timeline loads | Navigate to `/components/timeline` | Timeline renders | SCR-064 |
| COMP-007 | Tree loads | Navigate to `/components/tree` | Tree view renders | SCR-065 |
| COMP-008 | Tree expand | Click tree node | Node expands | SCR-065 |

---

### Category 9: Maps Tests (MAP)

These tests verify map screens.

| Test ID | Description | Steps | Expected Result | Screen Ref |
|---------|-------------|-------|-----------------|------------|
| MAP-001 | Google Maps loads | Navigate to `/maps/gmap` | Google Map renders | SCR-071 |
| MAP-002 | Leaflet loads | Navigate to `/maps/leaflet` | Leaflet map renders | SCR-072 |
| MAP-003 | Bubble map loads | Navigate to `/maps/bubble` | AmMap with bubbles renders | SCR-073 |
| MAP-004 | Line map loads | Navigate to `/maps/line` | AmMap with lines renders | SCR-074 |
| MAP-005 | Map zoom | Use zoom controls | Map zooms in/out | SCR-071 |
| MAP-006 | Map pan | Drag map | Map pans | SCR-071 |

---

### Category 10: Profile Tests (PROF)

These tests verify profile screen.

| Test ID | Description | Steps | Expected Result | Screen Ref |
|---------|-------------|-------|-----------------|------------|
| PROF-001 | Profile loads | Navigate to `/profile` | Profile page renders | SCR-080 |
| PROF-002 | Profile picture | Check picture area | Default picture displays | SCR-080 |
| PROF-003 | Remove picture | Click remove | Picture changes to no-photo.png | SCR-080 |
| PROF-004 | Upload picture | Select file | Picture updates to uploaded image | SCR-080 |
| PROF-005 | Social links | Check social section | 8 social profiles display | SCR-080 |
| PROF-006 | Connect social | Click unconnected social | Modal opens for URL | SCR-080 |
| PROF-007 | Disconnect social | Click connected social | Link removed | SCR-080 |
| PROF-008 | Notification switches | Check switches | 6 switches with correct states | SCR-080 |
| PROF-009 | Toggle switch | Click switch | State toggles | SCR-080 |

---

### Category 11: Theme Tests (THEME)

These tests verify theme and styling.

| Test ID | Description | Steps | Expected Result | Invariant Ref |
|---------|-------------|-------|-----------------|---------------|
| THEME-001 | Default theme | Load app | No blur-theme class on body | INV-004-A |
| THEME-002 | Primary color | Check primary elements | Color is #209e91 | INV-004-E |
| THEME-003 | Panel styling | Check any panel | Panel has correct styling | - |
| THEME-004 | Button colors | Check button variants | Colors match palette | INV-004-D |
| THEME-005 | Chart colors | Check any chart | Colors from baConfig.colors | INV-004-D |

---

### Category 12: Responsive Tests (RESP)

These tests verify responsive behavior.

| Test ID | Description | Steps | Expected Result | Invariant Ref |
|---------|-------------|-------|-----------------|---------------|
| RESP-001 | Desktop layout | View at 1440px | Full sidebar, multi-column | INV-010-B |
| RESP-002 | Tablet layout | View at 1000px | Collapsed sidebar | INV-010-C |
| RESP-003 | Mobile layout | View at 400px | Hidden sidebar, hamburger | INV-010-D |
| RESP-004 | Dashboard responsive | Resize dashboard | Widgets reflow correctly | - |
| RESP-005 | Tables responsive | Resize tables page | Tables scroll horizontally | - |
| RESP-006 | Forms responsive | Resize forms page | Form fields stack | - |

---

### Category 13: Loading Tests (LOAD)

These tests verify loading behavior.

| Test ID | Description | Steps | Expected Result | Invariant Ref |
|---------|-------------|-------|-----------------|---------------|
| LOAD-001 | Initial preloader | Hard refresh | Preloader visible initially | INV-005-A |
| LOAD-002 | Preloader hides | Wait for load | Preloader hides, content shows | INV-005-B |
| LOAD-003 | Fallback timeout | Block assets, wait 7s | Preloader hides anyway | INV-005-E |

---

## Visual Regression Test Points

For screenshot comparison testing, capture these specific views:

| ID | Screen | Viewport | State |
|----|--------|----------|-------|
| VR-001 | Dashboard | 1440x900 | Default |
| VR-002 | Dashboard | 768x1024 | Tablet |
| VR-003 | Dashboard | 375x667 | Mobile |
| VR-004 | Form Inputs | 1440x900 | Default |
| VR-005 | Form Wizard | 1440x900 | Step 1 |
| VR-006 | Smart Tables | 1440x900 | Default |
| VR-007 | amCharts | 1440x900 | Charts loaded |
| VR-008 | Modals | 1440x900 | Modal open |
| VR-009 | Mail Inbox | 1440x900 | Messages listed |
| VR-010 | Profile | 1440x900 | Default |
| VR-011 | Sidebar | 1440x900 | Expanded |
| VR-012 | Sidebar | 1440x900 | Collapsed |

---

## Test Data Requirements

### Mock Data to Preserve
1. **smartTableData**: 60 user records (see TablesPageCtrl.js)
2. **mailMessages**: 14 email records (see mailMessages.js)
3. **todoList**: 10 initial items (see DashboardTodoCtrl.js)
4. **socialProfiles**: 8 social links (see ProfilePageCtrl.js)

### Test Fixtures Location
All mock data is embedded in controllers/services. For migration, extract to:
- `fixtures/tables.json`
- `fixtures/mail.json`
- `fixtures/todo.json`
- `fixtures/profile.json`

---

## Cross-Browser Test Matrix

| Browser | Version | Priority |
|---------|---------|----------|
| Chrome | Latest | High |
| Firefox | Latest | High |
| Safari | Latest | Medium |
| Edge | Latest | Medium |
| IE 11 | 11 | Low (if required) |

---

## Test Execution Phases

### Phase 1: Smoke Tests
Run NAV-001 through NAV-005, SB-001, DASH-001, FORM-001, TBL-001, CHART-001

### Phase 2: Functional Tests
Run all tests in categories NAV, SB, DASH, FORM, TBL

### Phase 3: Visual Tests
Run all VR tests with screenshot comparison

### Phase 4: Component Tests
Run all tests in categories CHART, UI, COMP, MAP, PROF

### Phase 5: Responsive Tests
Run all RESP tests

### Phase 6: Cross-Browser Tests
Run Phase 1 tests on all browsers in matrix

---

## Acceptance Criteria for Migration Parity

Migration is considered at parity when:

1. All NAV tests pass (100%)
2. All SB tests pass (100%)
3. All functional tests pass (95%+)
4. Visual regression within 5% pixel difference
5. No JavaScript console errors
6. All responsive breakpoints work correctly
7. Cross-browser smoke tests pass

---

## Known Limitations

1. **Chart animations**: Exact animation timing may vary
2. **Font rendering**: Minor differences across browsers
3. **Map tiles**: External tile servers may change
4. **Date/time**: Calendar may show different current date
5. **Random colors**: Todo item colors will differ on each load

---

## Test Automation Recommendations

### E2E Framework
- Cypress or Playwright recommended
- Page Object Model for maintainability

### Visual Regression
- Percy or Chromatic for screenshot comparison
- Baseline from legacy app before migration

### CI Integration
- Run smoke tests on every PR
- Run full suite nightly
- Visual regression on release branches
