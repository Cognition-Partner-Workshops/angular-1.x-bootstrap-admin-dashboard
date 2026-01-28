# ARCH_PHASE1_HANDOFF - Foundation Setup

Arching handoff document for AngularJS 1.x to Angular LTS migration.
Document Type: Phase 1 - Foundation Setup
Generated: 2026-01-28

---

## Executive Summary

Phase 1 established the Angular 17 LTS application foundation within the `/upgrade` directory. This phase created the core infrastructure, routing system, and ports/adapters architecture that enables parallel screen migration without coupling to the legacy AngularJS application.

## Objectives Achieved

Phase 1 successfully completed the following objectives:

1. **Angular CLI Project Bootstrap**: Created standalone Angular 17 application in `/upgrade`
2. **Ports/Adapters Architecture**: Implemented hexagonal architecture with abstract port interfaces
3. **Mock Service Layer**: Created deterministic mock implementations for all ports
4. **Main Layout Shell**: Built application shell with sidebar, header, and content area
5. **Routing Infrastructure**: Configured hash-based routing with `/upgrade/` prefix
6. **Build Configuration**: Set up development and production build pipelines

## Technical Implementation

### Project Structure

```
upgrade/
├── src/
│   ├── app/
│   │   ├── core/                    # Core module with ports and mocks
│   │   │   ├── ports/               # Abstract port interfaces
│   │   │   │   ├── auth.port.ts
│   │   │   │   ├── permissions.port.ts
│   │   │   │   ├── feature-flags.port.ts
│   │   │   │   ├── analytics.port.ts
│   │   │   │   └── data.port.ts
│   │   │   ├── mocks/               # Mock implementations
│   │   │   │   ├── auth.mock.ts
│   │   │   │   ├── permissions.mock.ts
│   │   │   │   ├── feature-flags.mock.ts
│   │   │   │   ├── analytics.mock.ts
│   │   │   │   ├── data.mock.ts
│   │   │   │   └── fixtures.ts
│   │   │   ├── guards/              # Route guards
│   │   │   ├── services/            # Core services
│   │   │   └── core.providers.ts    # DI configuration
│   │   ├── shared/                  # Shared module
│   │   │   ├── components/          # UI primitives
│   │   │   └── layouts/             # Layout components
│   │   ├── features/                # Feature modules
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── styles.scss
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
└── .nvmrc
```

### Ports/Adapters Architecture

The application uses abstract port classes that define interfaces for external dependencies:

| Port | Purpose | Mock Implementation |
|------|---------|---------------------|
| `AuthPort` | Authentication & session management | `MockAuthService` |
| `PermissionsPort` | Role-based access control | `MockPermissionsService` |
| `FeatureFlagsPort` | Feature flag management | `MockFeatureFlagsService` |
| `AnalyticsPort` | Event tracking | `MockAnalyticsService` |
| `DataPort` | Generic data operations | `MockDataService` |

This architecture enables:
- Local development without external services
- Easy switching to real implementations
- Testable components with injectable mocks
- Clear separation of concerns

### Mock Users

Deterministic mock users for development:

| Email | Password | Roles |
|-------|----------|-------|
| admin@example.com | admin123 | admin, user |
| editor@example.com | editor123 | editor, user |
| viewer@example.com | viewer123 | viewer |
| guest@example.com | guest123 | guest |

### Routing Configuration

Hash-based routing with `/upgrade/` prefix:

```typescript
export const routes: Routes = [
  {
    path: 'upgrade',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.routes') },
      // ... additional feature routes
    ]
  },
  { path: '', redirectTo: '/upgrade/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/upgrade/dashboard' }
];
```

### Build Configuration

| Configuration | Value |
|---------------|-------|
| Node Version | 20.x (specified in .nvmrc) |
| Angular Version | 17.x LTS |
| Build Output | `dist/upgrade-app` |
| Dev Server Port | 4200 |
| Hash Routing | Enabled |

## Key Deliverables

### Documentation

| Document | Purpose | Location |
|----------|---------|----------|
| BOOTSTRAP_README.md | Quick start and project overview | `upgrade/` |
| FOUNDATIONS_USAGE_GUIDELINES.md | Usage guidelines for shared capabilities | `upgrade/` |
| FOUNDATIONS_SCREEN_SCAFFOLD.md | Template for creating new screens | `upgrade/` |

### Core Services

| Service | Purpose |
|---------|---------|
| `NavigationService` | Manages sidebar navigation items |
| `ThemeConfigService` | Provides theme colors and configuration |
| `StopableIntervalService` | Manages stoppable intervals for animations |

### Route Guards

| Guard | Purpose |
|-------|---------|
| `authGuard` | Protects routes requiring authentication |
| `permissionGuard` | Protects routes based on permissions |

## Configuration Files

### angular.json Key Settings

```json
{
  "projects": {
    "upgrade-app": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/upgrade-app",
            "budgets": [
              { "type": "initial", "maximumWarning": "500kb", "maximumError": "1mb" },
              { "type": "anyComponentStyle", "maximumWarning": "16kb", "maximumError": "32kb" }
            ]
          }
        },
        "serve": {
          "options": {
            "port": 4200
          }
        }
      }
    }
  }
}
```

### Package Dependencies

Key dependencies added:

```json
{
  "dependencies": {
    "@angular/core": "^17.0.0",
    "@angular/router": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "rxjs": "^7.8.0",
    "bootstrap": "^5.3.0"
  }
}
```

## Development Workflow

### Running the Application

```bash
# Navigate to upgrade directory
cd upgrade

# Use correct Node version
nvm use 20

# Install dependencies
npm install

# Start development server
npm start
# Available at http://localhost:4200/#/upgrade/dashboard
```

### Running Both Apps

```bash
# Terminal 1 - Legacy AngularJS
nvm use 8 && gulp serve
# Available at http://localhost:3000

# Terminal 2 - Angular Upgrade
cd upgrade && nvm use 20 && npm start
# Available at http://localhost:4200/#/upgrade/dashboard
```

## Constraints Established

### Forbidden Actions

1. Do NOT couple `/upgrade` to AngularJS internals
2. Do NOT introduce real external services (use mocks)
3. Do NOT fork styling systems without approval
4. Do NOT modify port interfaces without team approval
5. Do NOT bypass guards for convenience

### Coding Standards

1. Use ports for all external dependencies
2. Use shared components for UI primitives
3. Follow kebab-case for files, PascalCase for classes
4. Add breadcrumb data to all routes
5. Handle loading/error states with provided components

## Handoff to Phase 2

Phase 1 concluded with the following handoff items for Phase 2 (Shared Components):

1. **Implement UI primitives**: Button, FormField, DataTable, etc.
2. **Create state components**: LoadingSpinner, EmptyState, ErrorState
3. **Build modal system**: ModalComponent and ModalService
4. **Implement notifications**: NotificationService and container
5. **Create baPanel equivalent**: BaPanelComponent for legacy parity

## Verification Checklist

Phase 1 completion was verified by:

- [x] Angular CLI project builds successfully
- [x] Development server starts on port 4200
- [x] Hash-based routing works correctly
- [x] Main layout renders with sidebar and header
- [x] Mock authentication works with test users
- [x] Route guards protect appropriate routes
- [x] Ports can be injected into components

## Lessons Learned

1. **Ports/adapters pattern is essential**: Enables development without external dependencies
2. **Hash routing required for compatibility**: Prevents conflicts with legacy app
3. **Separate Node versions needed**: Legacy requires Node 8, Angular requires Node 20
4. **Budget configuration important**: Component style budgets needed adjustment during migration

---

**Phase 1 Status: COMPLETE**
**Next Phase: Phase 2 - Shared Components**
