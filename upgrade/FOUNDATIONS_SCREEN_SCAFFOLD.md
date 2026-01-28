# FOUNDATIONS_SCREEN_SCAFFOLD - Screen Template for Migration Workers

This document provides a complete scaffold template for creating new screens during the migration phase. Copy these templates when creating new feature screens.

## Directory Structure

```
features/
  [feature-name]/
    [feature-name].component.ts
    [feature-name].component.html
    [feature-name].component.scss
    [feature-name].component.spec.ts
    [feature-name].service.ts
    [feature-name].routes.ts
    index.ts
```

---

## Component Template

### `[feature-name].component.ts`

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { 
  PageContainerComponent,
  ButtonComponent,
  DataTableComponent,
  LoadingSpinnerComponent,
  EmptyStateComponent,
  ErrorStateComponent,
  TableColumn
} from '../../shared/components';
import { FeatureNameService } from './feature-name.service';

interface FeatureItem {
  id: string;
  name: string;
  // Add your fields here
}

@Component({
  selector: 'app-feature-name',
  standalone: true,
  imports: [
    CommonModule,
    PageContainerComponent,
    ButtonComponent,
    DataTableComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ErrorStateComponent
  ],
  templateUrl: './feature-name.component.html',
  styleUrl: './feature-name.component.scss'
})
export class FeatureNameComponent implements OnInit, OnDestroy {
  items: FeatureItem[] = [];
  loading = false;
  error = '';
  
  columns: TableColumn<FeatureItem>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true }
  ];

  private destroy$ = new Subject<void>();

  constructor(private featureService: FeatureNameService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.loading = true;
    this.error = '';

    this.featureService.getItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (items) => {
          this.items = items;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to load data';
          this.loading = false;
        }
      });
  }

  onRetry(): void {
    this.loadData();
  }

  onRowClick(item: FeatureItem): void {
    console.log('Row clicked:', item);
  }

  onAction(): void {
    // Handle action button click
  }
}
```

---

## Template File

### `[feature-name].component.html`

```html
<app-page-container 
  title="Feature Name" 
  subtitle="Description of this feature">
  <ng-container pageActions>
    <app-button variant="primary" (buttonClick)="onAction()">
      Add New
    </app-button>
  </ng-container>

  @if (loading) {
    <app-loading-spinner message="Loading data..."></app-loading-spinner>
  } @else if (error) {
    <app-error-state
      title="Failed to load data"
      [message]="error"
      (retryClick)="onRetry()">
    </app-error-state>
  } @else if (items.length === 0) {
    <app-empty-state
      title="No items found"
      message="Get started by creating your first item"
      actionLabel="Create Item"
      (actionClick)="onAction()">
    </app-empty-state>
  } @else {
    <app-data-table
      [columns]="columns"
      [data]="items"
      (rowClick)="onRowClick($event)">
    </app-data-table>
  }
</app-page-container>
```

---

## Styles File

### `[feature-name].component.scss`

```scss
:host {
  display: block;
  height: 100%;
}

// Add feature-specific styles here
// Prefer using shared component styles when possible
```

---

## Service Template

### `[feature-name].service.ts`

```typescript
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataPort, PaginatedResponse, QueryOptions } from '../../core/ports/data.port';

export interface FeatureItem {
  id: string;
  name: string;
  // Add your fields here
}

@Injectable({ providedIn: 'root' })
export class FeatureNameService {
  private readonly endpoint = 'feature-items';

  constructor(private dataPort: DataPort) {}

  getItems(options?: QueryOptions): Observable<FeatureItem[]> {
    return this.dataPort.getList<FeatureItem>(this.endpoint, options).pipe(
      map((response: PaginatedResponse<FeatureItem>) => response.data)
    );
  }

  getItemsPaginated(options?: QueryOptions): Observable<PaginatedResponse<FeatureItem>> {
    return this.dataPort.getList<FeatureItem>(this.endpoint, options);
  }

  getItem(id: string): Observable<FeatureItem> {
    return this.dataPort.get<FeatureItem>(`${this.endpoint}/${id}`);
  }

  createItem(item: Partial<FeatureItem>): Observable<FeatureItem> {
    return this.dataPort.create<FeatureItem>(this.endpoint, item);
  }

  updateItem(id: string, item: Partial<FeatureItem>): Observable<FeatureItem> {
    return this.dataPort.update<FeatureItem>(this.endpoint, id, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.dataPort.delete(this.endpoint, id);
  }
}
```

---

## Routes Template

### `[feature-name].routes.ts`

```typescript
import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '../../core/guards';

export const FEATURE_NAME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature-name.component').then(m => m.FeatureNameComponent),
    canActivate: [authGuard, permissionGuard],
    data: {
      breadcrumb: 'Feature Name',
      permission: 'feature.view'
    }
  },
  {
    path: ':id',
    loadComponent: () => import('./feature-name-detail.component').then(m => m.FeatureNameDetailComponent),
    canActivate: [authGuard, permissionGuard],
    data: {
      breadcrumb: 'Details',
      permission: 'feature.view'
    }
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./feature-name-edit.component').then(m => m.FeatureNameEditComponent),
    canActivate: [authGuard, permissionGuard],
    data: {
      breadcrumb: 'Edit',
      permission: 'feature.edit'
    }
  }
];
```

---

## Index Export

### `index.ts`

```typescript
export * from './feature-name.component';
export * from './feature-name.service';
export { FEATURE_NAME_ROUTES } from './feature-name.routes';
```

---

## Test Template

### `[feature-name].component.spec.ts`

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FeatureNameComponent } from './feature-name.component';
import { FeatureNameService } from './feature-name.service';

describe('FeatureNameComponent', () => {
  let component: FeatureNameComponent;
  let fixture: ComponentFixture<FeatureNameComponent>;
  let mockService: jasmine.SpyObj<FeatureNameService>;

  const mockItems = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' }
  ];

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('FeatureNameService', ['getItems']);
    mockService.getItems.and.returnValue(of(mockItems));

    await TestBed.configureTestingModule({
      imports: [FeatureNameComponent],
      providers: [
        { provide: FeatureNameService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureNameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load items on init', () => {
    fixture.detectChanges();
    expect(mockService.getItems).toHaveBeenCalled();
    expect(component.items).toEqual(mockItems);
    expect(component.loading).toBeFalse();
  });

  it('should handle loading state', () => {
    expect(component.loading).toBeFalse();
    component.loadData();
    // Loading state is set synchronously
    expect(component.loading).toBeTrue();
  });

  it('should handle error state', () => {
    mockService.getItems.and.returnValue(throwError(() => new Error('Test error')));
    fixture.detectChanges();
    expect(component.error).toBe('Test error');
    expect(component.loading).toBeFalse();
  });

  it('should retry loading on retry click', () => {
    fixture.detectChanges();
    mockService.getItems.calls.reset();
    component.onRetry();
    expect(mockService.getItems).toHaveBeenCalled();
  });
});
```

---

## Integration with App Routes

Add your feature routes to `app.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts';

export const routes: Routes = [
  {
    path: 'upgrade',
    component: MainLayoutComponent,
    children: [
      // ... existing routes
      {
        path: 'feature-name',
        loadChildren: () => import('./features/feature-name/feature-name.routes')
          .then(m => m.FEATURE_NAME_ROUTES)
      }
    ]
  }
];
```

---

## Adding Mock Data

Add mock data to `core/mocks/fixtures.ts`:

```typescript
export const MOCK_DATA: Record<string, unknown[]> = {
  // ... existing data
  'feature-items': [
    { id: 'item-1', name: 'First Item' },
    { id: 'item-2', name: 'Second Item' },
    { id: 'item-3', name: 'Third Item' }
  ] as FeatureItem[]
};
```

---

## Checklist for New Screens

- [ ] Create feature directory under `features/`
- [ ] Create component with proper imports
- [ ] Create service using DataPort
- [ ] Create routes with guards and breadcrumb data
- [ ] Create index.ts exports
- [ ] Add mock data to fixtures.ts
- [ ] Add routes to app.routes.ts
- [ ] Add navigation item if needed
- [ ] Write unit tests
- [ ] Verify loading/error/empty states work
