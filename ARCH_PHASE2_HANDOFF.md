# ARCH_PHASE2_HANDOFF - Shared Components

Arching handoff document for AngularJS 1.x to Angular LTS migration.
Document Type: Phase 2 - Shared Components
Generated: 2026-01-28

---

## Executive Summary

Phase 2 built the shared component library that provides UI primitives and layout components for all migrated screens. These components replicate the functionality of legacy AngularJS directives while following Angular best practices and maintaining visual parity with the original BlurAdmin theme.

## Objectives Achieved

Phase 2 successfully completed the following objectives:

1. **UI Primitives**: Created reusable button, form field, and input components
2. **Data Display**: Built data table with sorting, pagination, and selection
3. **State Components**: Implemented loading, empty, and error state displays
4. **Modal System**: Created modal component and service for dialogs
5. **Notification System**: Built toast notification service and container
6. **Layout Components**: Implemented page container, sidebar, header, and breadcrumbs
7. **Legacy Parity**: Created baPanel equivalent for panel containers

## Component Inventory

### UI Primitives

| Component | Legacy Equivalent | Purpose |
|-----------|-------------------|---------|
| `ButtonComponent` | Bootstrap buttons | Styled buttons with variants and states |
| `FormFieldComponent` | Form groups | Form field wrapper with label, hint, error |
| `BaPanelComponent` | `baPanel` directive | Panel container with title and content |

### Data Display

| Component | Legacy Equivalent | Purpose |
|-----------|-------------------|---------|
| `DataTableComponent` | `smart-table` | Table with sorting, pagination, selection |

### State Components

| Component | Legacy Equivalent | Purpose |
|-----------|-------------------|---------|
| `LoadingSpinnerComponent` | Preloader | Loading indicator with optional overlay |
| `EmptyStateComponent` | N/A (new) | Empty data state with action |
| `ErrorStateComponent` | N/A (new) | Error display with retry action |

### Modal System

| Component | Legacy Equivalent | Purpose |
|-----------|-------------------|---------|
| `ModalComponent` | `$uibModal` templates | Modal dialog container |
| `ModalService` | `$uibModal` service | Programmatic modal opening |

### Notification System

| Component | Legacy Equivalent | Purpose |
|-----------|-------------------|---------|
| `NotificationContainerComponent` | `toastr` container | Toast notification display |
| `NotificationService` | `toastr` service | Programmatic notifications |

### Layout Components

| Component | Legacy Equivalent | Purpose |
|-----------|-------------------|---------|
| `MainLayoutComponent` | `index.html` layout | Application shell |
| `SidebarComponent` | `baSidebar` directive | Navigation sidebar |
| `HeaderComponent` | `pageTop` directive | Top header bar |
| `BreadcrumbComponent` | `contentTop` directive | Breadcrumb navigation |
| `PageContainerComponent` | Page wrapper | Page structure with title |

## Component Specifications

### ButtonComponent

```typescript
// Inputs
@Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
@Input() size: 'small' | 'medium' | 'large' = 'medium';
@Input() disabled: boolean = false;
@Input() loading: boolean = false;
@Input() fullWidth: boolean = false;
@Input() type: 'button' | 'submit' | 'reset' = 'button';

// Outputs
@Output() buttonClick = new EventEmitter<MouseEvent>();
```

### FormFieldComponent

```typescript
// Inputs
@Input() label: string = '';
@Input() hint: string = '';
@Input() error: string = '';
@Input() required: boolean = false;
@Input() state: 'default' | 'valid' | 'invalid' | 'disabled' = 'default';
@Input() fieldId: string = '';
```

### DataTableComponent

```typescript
// Inputs
@Input() columns: TableColumn[] = [];
@Input() data: T[] = [];
@Input() loading: boolean = false;
@Input() error: string = '';
@Input() pagination: PaginationConfig | null = null;
@Input() selectable: boolean = false;
@Input() sortable: boolean = true;

// Outputs
@Output() sortChange = new EventEmitter<SortEvent>();
@Output() pageChange = new EventEmitter<number>();
@Output() rowClick = new EventEmitter<T>();
@Output() selectionChange = new EventEmitter<T[]>();

// TableColumn interface
interface TableColumn<T = unknown> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  formatter?: (value: unknown, row: T) => string;
}
```

### BaPanelComponent

```typescript
// Inputs
@Input() title: string = '';
@Input() panelClass: string = '';
@Input() transparent: boolean = false;

// Content projection
<ng-content></ng-content>
```

### ModalService

```typescript
// Methods
open<T>(component: Type<T>, config: ModalConfig): ModalRef<T>;

// ModalConfig interface
interface ModalConfig {
  title?: string;
  size?: 'small' | 'medium' | 'large';
  data?: Record<string, unknown>;
  closable?: boolean;
}

// ModalRef interface
interface ModalRef<T> {
  componentInstance: T;
  afterClosed(): Observable<unknown>;
  close(result?: unknown): void;
}
```

### NotificationService

```typescript
// Methods
success(title: string, message?: string, options?: NotificationOptions): void;
error(title: string, message?: string, options?: NotificationOptions): void;
warning(title: string, message?: string, options?: NotificationOptions): void;
info(title: string, message?: string, options?: NotificationOptions): void;

// NotificationOptions interface
interface NotificationOptions {
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
```

## File Structure

```
shared/
├── components/
│   ├── ba-panel/
│   │   ├── ba-panel.component.ts
│   │   ├── ba-panel.component.html
│   │   ├── ba-panel.component.scss
│   │   └── index.ts
│   ├── breadcrumb/
│   │   ├── breadcrumb.component.ts
│   │   ├── breadcrumb.component.html
│   │   ├── breadcrumb.component.scss
│   │   └── index.ts
│   ├── button/
│   │   ├── button.component.ts
│   │   ├── button.component.html
│   │   ├── button.component.scss
│   │   └── index.ts
│   ├── data-table/
│   │   ├── data-table.component.ts
│   │   ├── data-table.component.html
│   │   ├── data-table.component.scss
│   │   └── index.ts
│   ├── empty-state/
│   │   ├── empty-state.component.ts
│   │   ├── empty-state.component.html
│   │   ├── empty-state.component.scss
│   │   └── index.ts
│   ├── error-state/
│   │   ├── error-state.component.ts
│   │   ├── error-state.component.html
│   │   ├── error-state.component.scss
│   │   └── index.ts
│   ├── form-field/
│   │   ├── form-field.component.ts
│   │   ├── form-field.component.html
│   │   ├── form-field.component.scss
│   │   └── index.ts
│   ├── header/
│   │   ├── header.component.ts
│   │   ├── header.component.html
│   │   ├── header.component.scss
│   │   └── index.ts
│   ├── loading-spinner/
│   │   ├── loading-spinner.component.ts
│   │   ├── loading-spinner.component.html
│   │   ├── loading-spinner.component.scss
│   │   └── index.ts
│   ├── modal/
│   │   ├── modal.component.ts
│   │   ├── modal.component.html
│   │   ├── modal.component.scss
│   │   ├── modal.service.ts
│   │   └── index.ts
│   ├── notification/
│   │   ├── notification-container.component.ts
│   │   ├── notification-container.component.html
│   │   ├── notification-container.component.scss
│   │   ├── notification.service.ts
│   │   └── index.ts
│   ├── page-container/
│   │   ├── page-container.component.ts
│   │   ├── page-container.component.html
│   │   ├── page-container.component.scss
│   │   └── index.ts
│   ├── sidebar/
│   │   ├── sidebar.component.ts
│   │   ├── sidebar.component.html
│   │   ├── sidebar.component.scss
│   │   └── index.ts
│   └── index.ts                    # Barrel export
└── layouts/
    └── main-layout/
        ├── main-layout.component.ts
        ├── main-layout.component.html
        ├── main-layout.component.scss
        └── index.ts
```

## Styling Approach

### Color Palette

Colors are provided by `ThemeConfigService` and match the legacy `baConfig.colors`:

```typescript
colors = {
  primary: '#209e91',
  info: '#2dacd1',
  success: '#90b900',
  warning: '#dfb81c',
  danger: '#e85656',
  default: '#4e4e55',
  defaultText: '#e2e2e2',
  border: '#666666',
  borderDark: '#393939'
};
```

### SCSS Variables

Global SCSS variables in `styles.scss`:

```scss
$primary: #209e91;
$info: #2dacd1;
$success: #90b900;
$warning: #dfb81c;
$danger: #e85656;

$sidebar-width: 180px;
$sidebar-collapsed-width: 52px;
$header-height: 66px;

$breakpoint-xl: 1620px;
$breakpoint-lg: 1200px;
$breakpoint-md: 992px;
$breakpoint-sm: 768px;
$breakpoint-xs: 500px;
```

### Component Style Budgets

Angular CLI style budgets configured in `angular.json`:

```json
{
  "budgets": [
    {
      "type": "anyComponentStyle",
      "maximumWarning": "16kb",
      "maximumError": "32kb"
    }
  ]
}
```

## Usage Guidelines

### Importing Components

All shared components are standalone and can be imported directly:

```typescript
import { 
  ButtonComponent,
  FormFieldComponent,
  DataTableComponent,
  BaPanelComponent
} from '../../shared/components';

@Component({
  standalone: true,
  imports: [ButtonComponent, FormFieldComponent, DataTableComponent, BaPanelComponent]
})
export class MyComponent {}
```

### Using BaPanel

```html
<app-ba-panel title="Panel Title" panelClass="with-scroll">
  <p>Panel content goes here</p>
</app-ba-panel>
```

### Using Notifications

```typescript
import { NotificationService } from '../../shared/components';

@Component({...})
export class MyComponent {
  constructor(private notifications: NotificationService) {}

  onSave() {
    this.notifications.success('Saved!', 'Your changes have been saved.');
  }
}
```

## Handoff to Phase 3

Phase 2 concluded with the following handoff items for Phase 3 (Service Migration):

1. **Migrate theme services**: ThemeConfigService, NavigationService
2. **Migrate utility services**: baUtil equivalent functions
3. **Create chart configuration**: Chart color and theme setup
4. **Implement stopable interval**: For animated charts
5. **Set up mock data fixtures**: For all screen data

## Verification Checklist

Phase 2 completion was verified by:

- [x] All UI primitives render correctly
- [x] DataTable supports sorting and pagination
- [x] Modal service opens and closes dialogs
- [x] Notifications display and auto-dismiss
- [x] Layout components match legacy appearance
- [x] BaPanel replicates legacy directive behavior
- [x] Components are standalone and importable
- [x] Style budgets are not exceeded

## Lessons Learned

1. **Standalone components simplify imports**: No need for shared module declarations
2. **Content projection replaces transclusion**: `<ng-content>` works like `ng-transclude`
3. **Style encapsulation matters**: Some components need `ViewEncapsulation.None`
4. **Budget increases needed**: Complex components like progress-button exceeded initial budgets

---

**Phase 2 Status: COMPLETE**
**Next Phase: Phase 3 - Service Migration**
