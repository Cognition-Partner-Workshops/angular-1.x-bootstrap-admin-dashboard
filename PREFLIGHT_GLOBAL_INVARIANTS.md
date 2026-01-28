# PREFLIGHT_GLOBAL_INVARIANTS.md

Pre-flight artifact for AngularJS 1.x to Angular LTS migration.
Generated: 2026-01-28

This document defines global behavioral invariants that must remain true after migration. These are "must not change" semantics that apply across the entire application.

---

## INV-001: Authentication & Permissions

**Current State:** The application has NO authentication or authorization system implemented. All routes are publicly accessible.

**Invariants:**
1. All routes MUST remain publicly accessible (no auth guards)
2. No login/logout flow exists within the SPA
3. External auth pages (auth.html, reg.html) are static HTML files outside the SPA
4. No user session management exists
5. No role-based access control exists

**Migration Note:** If authentication is added during migration, it must be a separate, explicit requirement - not part of parity.

---

## INV-002: Navigation & Routing

### Default Route Behavior
| Invariant | Current Behavior |
|-----------|------------------|
| INV-002-A | Root URL (`/`) redirects to `/dashboard` |
| INV-002-B | Unknown URLs redirect to `/dashboard` |
| INV-002-C | `/tables` redirects to `/tables/basic` |
| INV-002-D | `/components/mail` redirects to `/components/mail/inbox` |

### Browser Navigation
| Invariant | Current Behavior |
|-----------|------------------|
| INV-002-E | Browser back button navigates to previous state |
| INV-002-F | Browser forward button navigates to next state |
| INV-002-G | Direct URL access loads correct state |
| INV-002-H | Page refresh preserves current route |

### Route Parameters
| Invariant | Current Behavior |
|-----------|------------------|
| INV-002-I | `/components/mail/:label` - label param filters messages |
| INV-002-J | `/components/mail/:label/:id` - id param selects message |

### State Hierarchy
| Invariant | Current Behavior |
|-----------|------------------|
| INV-002-K | Abstract states (`form`, `tables`, `charts`, `ui`, `components`, `maps`) serve as parent containers |
| INV-002-L | Child states inherit parent controller when defined |
| INV-002-M | `ui-view` directive renders child state content |

---

## INV-003: Sidebar Navigation

### Menu Generation
| Invariant | Current Behavior |
|-----------|------------------|
| INV-003-A | Menu items generated from routes with `sidebarMeta` property |
| INV-003-B | Menu items sorted by `sidebarMeta.order` (ascending) |
| INV-003-C | Static items appended after dynamic route items |
| INV-003-D | Nested items (level 1) grouped under parent (level 0) |

### Menu State
| Invariant | Current Behavior |
|-----------|------------------|
| INV-003-E | Active state highlighted based on current route |
| INV-003-F | Parent item expands when child is active |
| INV-003-G | Collapsed state persists during navigation |
| INV-003-H | Collapsed state stored in `baSidebarService.isMenuCollapsed()` |

### Responsive Behavior
| Invariant | Current Behavior |
|-----------|------------------|
| INV-003-I | Sidebar collapses when `window.innerWidth <= 1200px` |
| INV-003-J | Sidebar hides when `window.innerWidth <= 500px` |
| INV-003-K | Toggle button shows/hides sidebar on mobile |
| INV-003-L | Collapsed sidebar shows only icons |

### Static Menu Items
| Invariant | Current Behavior |
|-----------|------------------|
| INV-003-M | "Pages" menu contains: Sign In, Sign Up, User Profile, 404 Page |
| INV-003-N | Sign In, Sign Up, 404 Page open in new tab (`blank: true`) |
| INV-003-O | User Profile navigates to `profile` state |
| INV-003-P | "Menu Level 1" demonstrates nested disabled items |

---

## INV-004: Theme & Styling

### Theme Configuration
| Invariant | Current Behavior |
|-----------|------------------|
| INV-004-A | `baConfig.theme.blur` controls blur theme (default: false) |
| INV-004-B | `blur-theme` class added to body when blur enabled |
| INV-004-C | `mobile` class added to body on mobile devices |

### Color Palette
| Invariant | Current Behavior |
|-----------|------------------|
| INV-004-D | All components use colors from `baConfig.colors` |
| INV-004-E | Primary color: `#209e91` |
| INV-004-F | Info color: `#2dacd1` |
| INV-004-G | Success color: `#90b900` |
| INV-004-H | Warning color: `#dfb81c` |
| INV-004-I | Danger color: `#e85656` |

### Light/Dark Variants
| Invariant | Current Behavior |
|-----------|------------------|
| INV-004-J | Light variants: 30% tint toward white |
| INV-004-K | Dark variants: 15% shade toward black |
| INV-004-L | `colorHelper.tint()` and `colorHelper.shade()` compute variants |

### Dashboard Colors
| Invariant | Current Behavior |
|-----------|------------------|
| INV-004-M | Dashboard uses separate color palette in `baConfig.colors.dashboard` |
| INV-004-N | Dashboard colors: blueStone, surfieGreen, silverTree, gossip, white |

---

## INV-005: Loading & Preloader

### Initial Load
| Invariant | Current Behavior |
|-----------|------------------|
| INV-005-A | Preloader (`#preloader`) visible until `$pageFinishedLoading` is true |
| INV-005-B | Main content hidden until `$pageFinishedLoading` is true |
| INV-005-C | `$pageFinishedLoading` set after AmCharts ready AND 3 second timeout |
| INV-005-D | If blur theme: also waits for background images to load |
| INV-005-E | Fallback: `$pageFinishedLoading` set after 7 seconds regardless |

### Loading States
| Invariant | Current Behavior |
|-----------|------------------|
| INV-005-F | No route-level loading indicators exist |
| INV-005-G | No API loading spinners exist (no real API calls) |
| INV-005-H | Chart loading handled by chart libraries internally |

---

## INV-006: Error Handling

### JavaScript Errors
| Invariant | Current Behavior |
|-----------|------------------|
| INV-006-A | No global error handler configured |
| INV-006-B | Errors logged to console only |
| INV-006-C | Errors do not display user-facing messages |
| INV-006-D | Navigation continues to work after errors |

### Route Errors
| Invariant | Current Behavior |
|-----------|------------------|
| INV-006-E | Invalid routes redirect to `/dashboard` |
| INV-006-F | No 404 page within SPA (external 404.html exists) |

### Data Errors
| Invariant | Current Behavior |
|-----------|------------------|
| INV-006-G | No API error handling (no real API calls) |
| INV-006-H | Empty data states show empty containers |
| INV-006-I | Missing images show broken image or fallback |

---

## INV-007: Feature Flags

**Current State:** No feature flag system exists.

| Invariant | Current Behavior |
|-----------|------------------|
| INV-007-A | All features always enabled |
| INV-007-B | No A/B testing infrastructure |
| INV-007-C | No environment-specific feature toggles |

---

## INV-008: Data Persistence

**Current State:** No data persistence exists. All data is in-memory and resets on page refresh.

| Invariant | Current Behavior |
|-----------|------------------|
| INV-008-A | No localStorage usage |
| INV-008-B | No sessionStorage usage |
| INV-008-C | No cookies (except Google Tag Manager) |
| INV-008-D | No IndexedDB usage |
| INV-008-E | Form data lost on navigation |
| INV-008-F | Todo items reset on page refresh |
| INV-008-G | Table edits reset on page refresh |

---

## INV-009: External Integrations

### Google Tag Manager
| Invariant | Current Behavior |
|-----------|------------------|
| INV-009-A | GTM script loaded in `<head>` |
| INV-009-B | GTM container ID: `GTM-KT9L237` |
| INV-009-C | GTM noscript fallback in `<body>` |

### Google Maps
| Invariant | Current Behavior |
|-----------|------------------|
| INV-009-D | Google Maps API loaded via script tag |
| INV-009-E | Maps API URL: `http://maps.google.com/maps/api/js?sensor=false` |
| INV-009-F | No API key configured (uses keyless access) |

### External Fonts
| Invariant | Current Behavior |
|-----------|------------------|
| INV-009-G | Roboto font loaded from Google Fonts |
| INV-009-H | Font weights: 100-900, normal and italic |

---

## INV-010: Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| INV-010-A | > 1620px | Extra large grid classes (`col-xlg-*`) |
| INV-010-B | > 1200px | Full sidebar visible |
| INV-010-C | <= 1200px | Sidebar collapses to icons |
| INV-010-D | <= 500px | Sidebar hidden, hamburger menu |
| INV-010-E | <= 640px | Panel blur effect disabled |

---

## INV-011: Accessibility

**Current State:** Limited accessibility support.

| Invariant | Current Behavior |
|-----------|------------------|
| INV-011-A | No ARIA labels on most elements |
| INV-011-B | No skip navigation links |
| INV-011-C | No keyboard navigation for sidebar |
| INV-011-D | Form inputs have labels (via Bootstrap) |
| INV-011-E | Color contrast may not meet WCAG standards |

**Migration Note:** Accessibility improvements should be tracked separately from parity requirements.

---

## INV-012: Internationalization

**Current State:** No internationalization support.

| Invariant | Current Behavior |
|-----------|------------------|
| INV-012-A | All text hardcoded in English |
| INV-012-B | No translation files |
| INV-012-C | No locale-specific formatting |
| INV-012-D | Dates formatted by moment.js (English) |

---

## INV-013: Print Styles

**Current State:** No print-specific styles.

| Invariant | Current Behavior |
|-----------|------------------|
| INV-013-A | No `@media print` rules |
| INV-013-B | Printing shows screen layout |

---

## INV-014: Browser Support

**Current State:** Based on library versions and Bootstrap 3.

| Invariant | Current Behavior |
|-----------|------------------|
| INV-014-A | IE 10+ supported (Bootstrap 3 requirement) |
| INV-014-B | Modern browsers (Chrome, Firefox, Safari, Edge) supported |
| INV-014-C | No explicit mobile browser testing |

---

## INV-015: Performance

**Current State:** No explicit performance optimizations.

| Invariant | Current Behavior |
|-----------|------------------|
| INV-015-A | All scripts loaded synchronously |
| INV-015-B | No lazy loading of routes |
| INV-015-C | No code splitting |
| INV-015-D | All CSS loaded upfront |
| INV-015-E | Images not optimized |
| INV-015-F | No service worker |

---

## INV-016: Security

**Current State:** Minimal security considerations.

| Invariant | Current Behavior |
|-----------|------------------|
| INV-016-A | No CSRF protection (no forms submit to server) |
| INV-016-B | No XSS protection beyond Angular's built-in |
| INV-016-C | `$sce.trustAsHtml()` used for mail message bodies |
| INV-016-D | No Content Security Policy |
| INV-016-E | HTTP used for Google Maps API (not HTTPS) |

---

## Invariant Verification Checklist

For migration parity testing, verify each invariant:

```
[ ] INV-001: No auth required for any route
[ ] INV-002: All route redirects work correctly
[ ] INV-003: Sidebar generates correctly from routes
[ ] INV-004: Theme colors match exactly
[ ] INV-005: Preloader behavior preserved
[ ] INV-006: Error handling unchanged
[ ] INV-007: No feature flags needed
[ ] INV-008: No persistence expected
[ ] INV-009: External integrations work
[ ] INV-010: Responsive breakpoints match
[ ] INV-011: Accessibility unchanged (can improve)
[ ] INV-012: English text preserved
[ ] INV-013: No print styles needed
[ ] INV-014: Browser support maintained
[ ] INV-015: Performance baseline established
[ ] INV-016: Security posture unchanged
```

---

## Behavioral Quirks to Preserve

These are potentially unexpected behaviors that exist in the current app and should be preserved for parity:

1. **Sidebar order calculation**: `(a.level - b.level) * 100 + a.order - b.order` - level takes precedence
2. **Mail messages sorted descending**: Most recent first, sorted by date string comparison
3. **Todo colors random**: Each todo item gets random color from dashboard palette on load
4. **Profile picture filter**: Uses `profilePicture` filter with hardcoded 'Nasta' default
5. **Panels controller reuse**: `ui.panels` uses `NotificationsPageCtrl` (appears intentional)
6. **7-second fallback**: Preloader hides after 7 seconds even if assets not loaded
7. **Google Maps HTTP**: Uses HTTP not HTTPS for maps API
