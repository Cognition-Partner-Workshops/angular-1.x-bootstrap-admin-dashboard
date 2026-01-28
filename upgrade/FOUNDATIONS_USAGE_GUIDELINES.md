# FOUNDATIONS_USAGE_GUIDELINES - Shared Platform Capabilities

This document provides usage guidelines for the Foundations phase shared platform capabilities. These components, services, and patterns are designed to be stable and reusable across all screen migrations.

## Table of Contents

1. [App Shell & Layout](#app-shell--layout)
2. [Authentication & Permissions](#authentication--permissions)
3. [Shared UI Primitives](#shared-ui-primitives)
4. [Ports/Interfaces](#portsinterfaces)
5. [Screen Scaffold Template](#screen-scaffold-template)

---

## App Shell & Layout

### Main Layout

The `MainLayoutComponent` provides the application shell with sidebar navigation, header, and content area.

```typescript
// Routes automatically use MainLayoutComponent as parent
{
  path: 'upgrade',
  component: MainLayoutComponent,
  children: [
    { path: 'your-feature', component: YourFeatureComponent }
  ]
}
```

### Page Container

Use `PageContainerComponent` for consistent page structure with breadcrumbs and title:

```html
<app-page-container title="Page Title" subtitle="Optional description">
  <ng-container pageActions>
    <app-button (buttonClick)="onAction()">Action</app-button>
  </ng-container>
  
  <!-- Page content here -->
</app-page-container>
```

### Breadcrumbs

Breadcrumbs are automatically generated from route data. Add `breadcrumb` to your route data:

```typescript
{
  path: 'users',
  component: UsersComponent,
  data: { breadcrumb: 'Users' }
}
```

### Sidebar Navigation

Navigation items are managed via `NavigationService`. To add items dynamically:

```typescript
import { NavigationService } from '@app/core';

constructor(private navService: NavigationService) {}

ngOnInit() {
  this.navService.addNavItem({
    id: 'reports',
    label: 'Reports',
    icon: 'reports',
    path: '/upgrade/reports',
    permission: 'reports.view'
  });
}
```

---

## Authentication & Permissions

### Mock Users

The following deterministic mock users are available for development:

| Email | Password | Roles |
|-------|----------|-------|
| admin@example.com | admin123 | admin, user |
| editor@example.com | editor123 | editor, user |
| viewer@example.com | viewer123 | viewer |
| guest@example.com | guest123 | guest |

By default, the app starts authenticated as `admin@example.com`.

### Auth Guard

Protect routes that require authentication:

```typescript
import { authGuard } from '@app/core';

{
  path: 'protected',
  component: ProtectedComponent,
  canActivate: [authGuard]
}
```

### Permission Guard

Protect routes based on permissions:

```typescript
import { permissionGuard } from '@app/core';

{
  path: 'admin',
  component: AdminComponent,
  canActivate: [permissionGuard],
  data: { permission: 'admin.access' }
}

// Multiple permissions (any)
{
  path: 'reports',
  component: ReportsComponent,
  canActivate: [permissionGuard],
  data: { 
    permissions: ['reports.view', 'reports.export'],
    requireAllPermissions: false  // default: false (any)
  }
}
```

### Using Auth in Components

```typescript
import { AuthPort, User } from '@app/core';

@Component({...})
export class MyComponent {
  constructor(private authPort: AuthPort) {}

  ngOnInit() {
    this.authPort.getCurrentUser().subscribe(user => {
      console.log('Current user:', user);
    });
  }
}
```

### Using Permissions in Components

```typescript
import { PermissionsPort } from '@app/core';

@Component({...})
export class MyComponent {
  canEdit$ = this.permissionsPort.hasPermission('users.edit');

  constructor(private permissionsPort: PermissionsPort) {}
}
```

---

## Shared UI Primitives

### Button Component

```html
<app-button variant="primary" size="medium" (buttonClick)="onClick()">
  Click Me
</app-button>

<app-button variant="secondary" [loading]="isLoading">
  Save
</app-button>

<app-button variant="danger" [disabled]="!canDelete">
  Delete
</app-button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'ghost'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `loading`: boolean
- `fullWidth`: boolean
- `type`: 'button' | 'submit' | 'reset'

### Form Field Component

```html
<app-form-field 
  label="Email" 
  [required]="true"
  [state]="emailValid ? 'valid' : 'invalid'"
  [error]="emailError"
  hint="Enter your work email">
  <input type="email" [(ngModel)]="email" />
</app-form-field>
```

**Props:**
- `label`: string
- `hint`: string
- `error`: string
- `required`: boolean
- `state`: 'default' | 'valid' | 'invalid' | 'disabled'
- `fieldId`: string

### Data Table Component

```typescript
import { TableColumn, DataTableComponent } from '@app/shared/components';

columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status', formatter: (val) => val ? 'Active' : 'Inactive' }
];
```

```html
<app-data-table
  [columns]="columns"
  [data]="users"
  [loading]="isLoading"
  [error]="errorMessage"
  [pagination]="{ page: 1, pageSize: 10, total: 100 }"
  [selectable]="true"
  (sortChange)="onSort($event)"
  (pageChange)="onPageChange($event)"
  (rowClick)="onRowClick($event)"
  (selectionChange)="onSelectionChange($event)">
</app-data-table>
```

### Loading Spinner

```html
<app-loading-spinner size="medium" message="Loading..."></app-loading-spinner>

<!-- Full-page overlay -->
<app-loading-spinner [overlay]="true" message="Please wait..."></app-loading-spinner>
```

### Empty State

```html
<app-empty-state
  icon="search"
  title="No results found"
  message="Try adjusting your search criteria"
  actionLabel="Clear Filters"
  (actionClick)="clearFilters()">
</app-empty-state>
```

### Error State

```html
<app-error-state
  severity="error"
  title="Failed to load data"
  message="Please check your connection and try again"
  errorCode="ERR_NETWORK"
  (retryClick)="retry()">
</app-error-state>
```

### Modal Component

Using the modal service:

```typescript
import { ModalService } from '@app/shared/components';

@Component({...})
export class MyComponent {
  constructor(private modalService: ModalService) {}

  openModal() {
    const ref = this.modalService.open(MyModalContentComponent, {
      title: 'Confirm Action',
      size: 'medium',
      data: { userId: 123 }
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        // Handle confirmation
      }
    });
  }
}
```

Using modal component directly:

```html
<app-modal 
  title="Edit User" 
  size="medium"
  [closable]="true"
  (closeModal)="onClose()">
  <p>Modal content here</p>
  
  <ng-container modalFooter>
    <app-button variant="secondary" (buttonClick)="onClose()">Cancel</app-button>
    <app-button variant="primary" (buttonClick)="onSave()">Save</app-button>
  </ng-container>
</app-modal>
```

### Notification Service

```typescript
import { NotificationService } from '@app/shared/components';

@Component({...})
export class MyComponent {
  constructor(private notifications: NotificationService) {}

  showSuccess() {
    this.notifications.success('Saved!', 'Your changes have been saved.');
  }

  showError() {
    this.notifications.error('Error', 'Failed to save changes.');
  }

  showWarning() {
    this.notifications.warning('Warning', 'This action cannot be undone.');
  }

  showInfo() {
    this.notifications.info('Info', 'New updates available.');
  }
}
```

Add the notification container to your app component:

```html
<router-outlet></router-outlet>
<app-notification-container></app-notification-container>
```

---

## Ports/Interfaces

### Available Ports

| Port | Purpose | Mock Implementation |
|------|---------|---------------------|
| `AuthPort` | Authentication & session | `MockAuthService` |
| `PermissionsPort` | Role-based access control | `MockPermissionsService` |
| `FeatureFlagsPort` | Feature flag management | `MockFeatureFlagsService` |
| `AnalyticsPort` | Event tracking | `MockAnalyticsService` |
| `DataPort` | Generic data operations | `MockDataService` |

### DataPort Usage

```typescript
import { DataPort, PaginatedResponse } from '@app/core';

interface User {
  id: string;
  name: string;
  email: string;
}

@Component({...})
export class UsersComponent {
  constructor(private dataPort: DataPort) {}

  loadUsers() {
    this.dataPort.getList<User>('users', {
      page: 1,
      pageSize: 10,
      sortBy: 'name',
      sortOrder: 'asc'
    }).subscribe((response: PaginatedResponse<User>) => {
      this.users = response.data;
      this.total = response.total;
    });
  }

  createUser(user: Partial<User>) {
    this.dataPort.create<User>('users', user).subscribe(created => {
      console.log('Created:', created);
    });
  }
}
```

### Switching to Real Implementations

When ready to connect to real APIs, update `core.providers.ts`:

```typescript
// From mocks
{ provide: AuthPort, useClass: MockAuthService }

// To real implementation
{ provide: AuthPort, useClass: RealAuthService }
```

---

## Screen Scaffold Template

Use the following template when creating new screens:

### Directory Structure

```
features/
  your-feature/
    your-feature.component.ts
    your-feature.component.html
    your-feature.component.scss
    your-feature.component.spec.ts
    your-feature.service.ts
    your-feature.routes.ts
    index.ts
```

### Component Template

See `FOUNDATIONS_SCREEN_SCAFFOLD.md` for complete templates.

---

## Best Practices

1. **Always use ports** - Never directly call HTTP services; use the port abstractions
2. **Use shared components** - Don't create custom buttons, form fields, etc.
3. **Follow naming conventions** - kebab-case for files, PascalCase for classes
4. **Add breadcrumb data** - Every route should have breadcrumb data
5. **Handle loading/error states** - Use the provided state components
6. **Use notifications** - For user feedback, use the notification service
7. **Protect routes** - Apply appropriate guards to all routes

## Forbidden Actions

- Do NOT implement feature-specific logic in shared components
- Do NOT modify port interfaces without team approval
- Do NOT bypass guards for convenience
- Do NOT create duplicate UI components
- Do NOT couple to AngularJS internals
