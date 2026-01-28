# PREFLIGHT_FLOW_ACCEPTANCE.md

Pre-flight artifact for AngularJS 1.x to Angular LTS migration.
Generated: 2026-01-28

This document identifies critical user flows and records acceptance criteria for each flow, including success, empty, error, and permission states.

---

## Critical Flow Inventory

### FLOW-001: Application Bootstrap and Initial Load

**Description:** User navigates to the application root URL and the app initializes.

**Entry Point:** `/` or `/index.html`

**Expected Behavior:**
1. Preloader displays while app initializes (`#preloader` visible, `main` hidden)
2. `$pageFinishedLoading` flag set to true after initialization
3. Preloader hides, main content displays
4. Default redirect to `/dashboard` occurs
5. Sidebar renders with all menu items
6. Page top header renders with logo and controls

**Acceptance Criteria:**

| State | Condition | Expected Result |
|-------|-----------|-----------------|
| Success | App loads normally | Dashboard displays, sidebar visible, no console errors |
| Loading | Initial page load | Preloader spinner visible until `$pageFinishedLoading` is true |
| Error | JS error during bootstrap | Preloader may persist; console shows error |

**Invariants:**
- Default route MUST redirect to `/dashboard`
- Sidebar MUST be populated from route states + static items
- Theme class (`blur-theme` or none) MUST be applied to body based on `baConfig.theme.blur`

---

### FLOW-002: Sidebar Navigation

**Description:** User clicks sidebar menu items to navigate between screens.

**Entry Points:** Any sidebar menu item

**Expected Behavior:**
1. Click on top-level item with children expands submenu
2. Click on leaf item navigates to that route
3. Active state applied to current route's menu item
4. Sidebar can be collapsed/expanded via toggle button
5. On mobile, sidebar hides completely and shows via hamburger menu

**Acceptance Criteria:**

| State | Condition | Expected Result |
|-------|-----------|-----------------|
| Success | Click menu item | Route changes, content updates, active state applied |
| Collapsed | Sidebar collapsed | Only icons visible, hover shows tooltip/submenu |
| Mobile | Screen width < 600px | Sidebar hidden, hamburger menu visible |
| Expanded Submenu | Click parent item | Children items animate into view |

**Invariants:**
- Menu items MUST be sorted by `sidebarMeta.order`
- Static menu items MUST appear after dynamic route items
- Collapsed state MUST persist during navigation
- `baSidebarService.isMenuCollapsed()` MUST reflect current state

**Data Dependencies:**
- `baSidebarService.getMenuItems()` returns combined dynamic + static items
- `layoutSizes.resWidthCollapseSidebar` (1200px) determines auto-collapse
- `layoutSizes.resWidthHideSidebar` (600px) determines hide threshold

---

### FLOW-003: Dashboard Widget Rendering

**Description:** User views the dashboard with all widgets loading data and rendering charts.

**Entry Point:** `/dashboard`

**Expected Behavior:**
1. Dashboard layout renders with responsive grid
2. All widgets initialize and display:
   - Todo list with items
   - Calendar with events
   - Traffic chart (doughnut)
   - Line chart (revenue)
   - Feed widget with messages
   - Pie chart
   - Weather widget
   - Popular apps widget
   - Map widget

**Acceptance Criteria:**

| State | Condition | Expected Result |
|-------|-----------|-----------------|
| Success | Dashboard loads | All widgets render with data |
| Chart Success | AmCharts/Chart.js load | Charts display with theme colors |
| Empty Todo | No todo items | Empty list, input field visible |
| Calendar Empty | No events | Calendar grid displays, no events |

**Widget-Specific Criteria:**

**Todo Widget (DashboardTodoCtrl):**
- Initial items: 10 predefined todo items
- Each item has random color from `dashboardColors`
- Add item: Enter key or click plus adds to top of list
- Items can be checked/unchecked

**Traffic Chart (TrafficChartCtrl):**
- Doughnut chart with 4 segments: Other, Search engines, Referral, Direct
- Data: [2000, 1500, 1000, 1200]
- Colors from `baConfig.colors`

**Line Chart (DashboardLineChartCtrl):**
- AmCharts serial chart
- Revenue data over time
- Scrollbar enabled

**Calendar (DashboardCalendarCtrl):**
- FullCalendar integration
- Event display and interaction

**Invariants:**
- `baConfig.theme.blur` determines `$scope.transparent` for widgets
- Chart colors MUST come from `baConfig.colors`

---

### FLOW-004: Form Wizard Multi-Step Flow

**Description:** User completes a multi-step form wizard.

**Entry Point:** `/form/wizard`

**Expected Behavior:**
1. Wizard displays with step indicators
2. User fills personal info (step 1)
3. User fills product info (step 2)
4. User fills shipment info (step 3)
5. User reviews and submits

**Acceptance Criteria:**

| State | Condition | Expected Result |
|-------|-----------|-----------------|
| Success | Complete all steps | Form data captured in vm.personalInfo, vm.productInfo, vm.shipment |
| Validation Error | Passwords don't match | `arePersonalInfoPasswordsEqual()` returns false, cannot proceed |
| Step Navigation | Click step indicator | Navigate to that step if valid |
| Back Navigation | Click back | Return to previous step, data preserved |

**Data Contract (WizardCtrl):**
```javascript
vm.personalInfo = {
  // User fills: firstName, lastName, email, password, confirmPassword
};
vm.productInfo = {
  // User fills: product details
};
vm.shipment = {
  // User fills: shipping details
};
```

**Validation:**
- `vm.arePersonalInfoPasswordsEqual()`: Returns true only if `confirmPassword` exists AND equals `password`

**Invariants:**
- Form data MUST persist across step navigation
- Validation MUST run before step advancement
- `baWizard` directive manages step state

---

### FLOW-005: Smart Table CRUD Operations

**Description:** User views, sorts, filters, and edits data in smart tables.

**Entry Point:** `/tables/smart`

**Expected Behavior:**
1. Table displays paginated data (10 items per page)
2. User can sort by clicking column headers
3. User can filter using search input
4. User can edit cells inline (xeditable)
5. User can add/remove rows

**Acceptance Criteria:**

| State | Condition | Expected Result |
|-------|-----------|-----------------|
| Success | Table loads | 60 rows in `smartTableData`, 10 displayed per page |
| Sort | Click column header | Data sorts ascending/descending |
| Filter | Enter search text | Rows filter to match |
| Edit | Click editable cell | Inline editor appears |
| Save Edit | Confirm edit | Cell value updates in `$scope.smartTableData` |
| Add Row | Click add | New row with default values inserted |
| Delete Row | Click delete | Row removed from data |
| Empty Filter | No matches | Empty table with message |
| Pagination | Click page number | Display corresponding page of data |

**Data Contract (TablesPageCtrl):**
```javascript
$scope.smartTableData = [
  {
    id: Number,
    firstName: String,
    lastName: String,
    username: String,  // Format: @handle
    email: String,
    age: Number|String
  },
  // ... 60 total records
];

$scope.smartTablePageSize = 10;

$scope.editableTableData = $scope.smartTableData.slice(0, 36);

$scope.users = [
  {
    id: Number,
    name: String,
    status: Number,  // 1-4
    group: Number    // 1-4
  }
];

$scope.statuses = [
  { value: 1, text: 'status1' },
  // ... status options
];

$scope.groups = [
  // ... group options
];
```

**Invariants:**
- `smart-table` library handles sorting/filtering
- `xeditable` library handles inline editing
- `editableOptions.theme = 'bs3'` for Bootstrap 3 styling

---

### FLOW-006: Mail Component Navigation

**Description:** User navigates mail folders, views message list, and reads individual messages.

**Entry Point:** `/components/mail` (redirects to `/components/mail/inbox`)

**Expected Behavior:**
1. Mail tabs display (Inbox, Sent, Important, Draft, Spam, Trash)
2. Default view shows Inbox messages
3. Click folder tab filters messages by label
4. Click message opens detail view
5. Compose button opens compose modal

**Acceptance Criteria:**

| State | Condition | Expected Result |
|-------|-----------|-----------------|
| Success | Navigate to mail | Inbox tab active, inbox messages displayed |
| Folder Switch | Click "Sent" tab | URL changes to `/components/mail/sent`, sent messages display |
| Message Detail | Click message | URL changes to `/components/mail/:label/:id`, message body displays |
| Empty Folder | Folder has no messages | Empty state displayed |
| Compose | Click compose | Modal opens with subject, to, text fields |
| Badge Count | Inbox has new mail | Badge shows count (7 for inbox, 2 for draft) |

**Data Contract (mailMessages service):**
```javascript
// Message shape
{
  id: String,           // e.g., "4563faass"
  name: String,         // Sender name
  subject: String,
  date: String,         // ISO date
  body: TrustedHtml,    // $sce.trustAsHtml()
  pic: String,          // Image path
  email: String,
  position: String,
  attachment: String,   // Optional
  tag: String,          // friend, study, work, family
  labels: String[],     // inbox, sent, important, draft, spam, trash
  important: Boolean    // Optional
}

// Tab shape
{
  label: String,        // Route param value
  name: String,         // Display name
  newMails: Number      // Optional badge count
}

// Service methods
mailMessages.getTabs()                    // Returns tabs array
mailMessages.getMessagesByLabel(label)    // Filters messages by label
mailMessages.getMessageById(id)           // Returns single message
```

**Invariants:**
- Messages sorted by date descending
- `/components/mail` MUST redirect to `/components/mail/inbox`
- Message body uses `$sce.trustAsHtml()` for HTML content

---

### FLOW-007: Profile Management

**Description:** User views and edits their profile information.

**Entry Point:** `/profile`

**Expected Behavior:**
1. Profile page displays user picture, info, and social links
2. User can upload new profile picture
3. User can remove profile picture
4. User can connect/disconnect social profiles
5. Notification switches can be toggled

**Acceptance Criteria:**

| State | Condition | Expected Result |
|-------|-----------|-----------------|
| Success | Profile loads | Picture displays, social links show connected status |
| Upload Picture | Select file | Picture updates to uploaded image |
| Remove Picture | Click remove | Picture changes to default no-photo.png |
| Connect Social | Click unconnected social | Modal opens for URL input |
| Disconnect Social | Click connected social | `href` set to undefined |
| Toggle Switch | Click notification switch | Switch state toggles |

**Data Contract (ProfilePageCtrl):**
```javascript
$scope.picture = String;  // Image URL or data URL
$scope.noPicture = Boolean;

$scope.socialProfiles = [
  {
    name: String,       // Facebook, Twitter, etc.
    href: String,       // URL or undefined if not connected
    icon: String        // CSS class for icon
  }
];

$scope.switches = [true, true, false, true, true, false];  // 6 notification toggles
```

**Invariants:**
- `fileReader.readAsDataUrl()` used for image upload
- `$uibModal` used for social link input
- `profilePicture` filter used for initial picture

---

### FLOW-008: Chart Rendering (All Chart Types)

**Description:** User views various chart types across chart pages.

**Entry Points:** `/charts/amCharts`, `/charts/chartJs`, `/charts/chartist`, `/charts/morris`

**Expected Behavior:**
1. Charts render with theme-appropriate colors
2. Charts are responsive to container size
3. Interactive features work (hover, click, zoom)

**Acceptance Criteria:**

| State | Condition | Expected Result |
|-------|-----------|-----------------|
| amCharts Success | Navigate to amCharts | Line, area, bar, pie, funnel, combined, gantt charts render |
| Chart.js Success | Navigate to chartJs | Doughnut, polar, pie, bar, line, radar charts render |
| Chartist Success | Navigate to chartist | Line and bar charts render |
| Morris Success | Navigate to morris | Line, area, donut, bar charts render |
| Responsive | Resize window | Charts resize appropriately |
| Animation | Chart loads | Animation plays (Chart.js: 2500ms duration) |

**Color Configuration:**
- All charts use colors from `baConfig.colors`
- AmCharts uses custom `AmCharts.themes.blur` theme
- Chart.js configured via `ChartJsProvider.setOptions()`
- Morris configured via prototype defaults

**Invariants:**
- `layoutColors = baConfig.colors` pattern used in all chart controllers
- Chart libraries must be loaded before controllers initialize

---

### FLOW-009: Modal Dialogs

**Description:** User triggers and interacts with modal dialogs.

**Entry Point:** `/ui/modals`

**Expected Behavior:**
1. Various modal types can be opened (basic, small, large, contextual)
2. Modals display with correct styling
3. Modals can be closed via X button, backdrop click, or cancel
4. Progress modal shows animated progress

**Acceptance Criteria:**

| State | Condition | Expected Result |
|-------|-----------|-----------------|
| Basic Modal | Click basic button | Modal opens with title and body |
| Small Modal | Click small button | Smaller modal opens |
| Large Modal | Click large button | Larger modal opens |
| Info Modal | Click info button | Blue-themed modal |
| Success Modal | Click success button | Green-themed modal |
| Warning Modal | Click warning button | Yellow-themed modal |
| Danger Modal | Click danger button | Red-themed modal |
| Progress Modal | Click progress button | Modal with animated progress bar |
| Close | Click X or backdrop | Modal closes |

**Invariants:**
- `$uibModal` service from angular-ui-bootstrap
- Modal templates in `app/pages/ui/modals/modalTemplates/`

---

### FLOW-010: Notifications (Toastr)

**Description:** User triggers toast notifications.

**Entry Point:** `/ui/notifications`

**Expected Behavior:**
1. User can trigger different notification types
2. Notifications appear in configured position
3. Notifications auto-dismiss after timeout
4. Notifications can be manually dismissed

**Acceptance Criteria:**

| State | Condition | Expected Result |
|-------|-----------|-----------------|
| Info | Trigger info | Blue toast appears |
| Success | Trigger success | Green toast appears |
| Warning | Trigger warning | Yellow toast appears |
| Error | Trigger error | Red toast appears |
| Position | Configure position | Toast appears in selected corner |
| Dismiss | Click toast | Toast dismisses immediately |
| Auto-dismiss | Wait timeout | Toast fades out |

**Invariants:**
- `toastr` service from angular-toastr
- Configuration via `toastrConfig`

---

## Global Acceptance Criteria

These criteria apply across all flows:

### Navigation
- Browser back/forward buttons MUST work correctly with UI-Router states
- Direct URL access MUST load correct state
- Invalid URLs MUST redirect to `/dashboard` (via `$urlRouterProvider.otherwise`)

### Responsive Behavior
- All screens MUST be usable at viewport widths: 320px, 768px, 1024px, 1440px
- Sidebar MUST collapse at 1200px width
- Sidebar MUST hide at 600px width

### Theme Consistency
- All components MUST use colors from `baConfig.colors`
- Blur theme MUST apply when `baConfig.theme.blur = true`
- Mobile class MUST apply on mobile devices

### Error States
- JavaScript errors MUST NOT break navigation
- Failed chart renders MUST NOT crash the page
- Missing data MUST show appropriate empty states

---

## Test Data Fixtures

The following mock data is embedded in the application and should be preserved for parity testing:

### Tables Data
- `smartTableData`: 60 user records (id, firstName, lastName, username, email, age)
- `peopleTableData`: 5 user records with status field
- `metricsTableData`: 5 browser metrics records
- `users`: User records with status and group for editable table

### Mail Data
- 14 message records across labels (inbox, sent, draft, spam, trash, important)
- 6 folder tabs with badge counts

### Todo Data
- 10 initial todo items with random colors

### Profile Data
- 8 social profile entries (Facebook, Twitter, Google, LinkedIn, GitHub, StackOverflow, Dribbble, Behance)
- 6 notification switch states
