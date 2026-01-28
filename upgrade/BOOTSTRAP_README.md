# BOOTSTRAP_README - Angular Upgrade Application

This document describes the Bootstrap phase setup for the Angular LTS upgrade application that coexists with the legacy AngularJS BlurAdmin dashboard.

## Overview

The `/upgrade` directory contains a standalone Angular 17 LTS application that runs independently from the legacy AngularJS app. This establishes the execution environment for parallel screen migration.

## Prerequisites

- Node.js >= 18.13.0 (use nvm to switch versions)
- npm >= 8.0.0

## Quick Start

```bash
# Navigate to the upgrade directory
cd upgrade

# Use the correct Node version (if using nvm)
nvm use 20

# Install dependencies
npm install

# Start the development server
npm start
```

The Angular app will be available at `http://localhost:4200/#/upgrade/dashboard`

## Running Both Apps Locally

The legacy AngularJS app runs on port 3000 (via `gulp serve`), while the Angular upgrade app runs on port 4200. Both can run simultaneously for parallel development.

**Terminal 1 - Legacy AngularJS App:**
```bash
# From repo root
nvm use 8
gulp serve
# Available at http://localhost:3000
```

**Terminal 2 - Angular Upgrade App:**
```bash
# From upgrade directory
cd upgrade
nvm use 20
npm start
# Available at http://localhost:4200/#/upgrade/dashboard
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 4200 |
| `npm run build` | Build production bundle to `dist/upgrade-app` |
| `npm run test` | Run unit tests with Karma/Jasmine |
| `npm run lint` | Run ESLint (requires @angular-eslint setup) |
| `npm run watch` | Build in watch mode for development |

## Project Structure

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
│   │   │   ├── mocks/               # Mock implementations for local dev
│   │   │   │   ├── auth.mock.ts
│   │   │   │   ├── permissions.mock.ts
│   │   │   │   ├── feature-flags.mock.ts
│   │   │   │   ├── analytics.mock.ts
│   │   │   │   ├── data.mock.ts
│   │   │   │   └── fixtures.ts      # Mock data fixtures
│   │   │   └── core.providers.ts    # DI provider configuration
│   │   ├── shared/                  # Shared components and layouts
│   │   │   ├── components/
│   │   │   └── layouts/
│   │   │       └── main-layout/     # Main application layout
│   │   ├── features/                # Feature modules
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   └── settings/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   │   └── mocks/                   # Static mock data files
│   ├── styles.scss                  # Global styles
│   └── index.html
├── angular.json                     # Angular CLI configuration
├── package.json
├── proxy.conf.json                  # API proxy configuration
├── tsconfig.json
└── .nvmrc                           # Node version specification
```

## Routing Boundary

All Angular upgrade routes are prefixed with `/upgrade/` to avoid conflicts with the legacy AngularJS routes:

- `/upgrade/dashboard` - Dashboard view
- `/upgrade/users` - Users management
- `/upgrade/settings` - Settings page

The app uses hash-based routing (`/#/upgrade/...`) for compatibility.

## Ports/Interfaces Architecture

The application uses a ports and adapters (hexagonal) architecture pattern. Abstract port classes define interfaces that can be implemented by:

1. **Mock implementations** (current) - For local development without external services
2. **Real implementations** (future) - For production with actual API calls

### Available Ports

| Port | Purpose |
|------|---------|
| `AuthPort` | Authentication and user session management |
| `PermissionsPort` | Role-based access control |
| `FeatureFlagsPort` | Feature flag management |
| `AnalyticsPort` | Event and page view tracking |
| `DataPort` | Generic data fetching with pagination |

### Switching Implementations

To switch from mock to real implementations, update `core.providers.ts`:

```typescript
// For mocks (current)
{ provide: AuthPort, useClass: MockAuthService }

// For real API (future)
{ provide: AuthPort, useClass: RealAuthService }
```

## Mock Data

Mock data is defined in `src/app/core/mocks/fixtures.ts` and includes:

- Dashboard statistics
- User records
- Notifications
- Activity feed

The `MockDataService` provides simulated API responses with configurable delays.

## Conventions

### Naming
- Components: `kebab-case` for files, `PascalCase` for classes
- Services: `*.service.ts` suffix
- Ports: `*.port.ts` suffix
- Mocks: `*.mock.ts` suffix

### Folder Structure
- Feature modules in `features/`
- Shared components in `shared/components/`
- Layout components in `shared/layouts/`
- Core services and ports in `core/`

### Styling
- SCSS for component styles
- BEM-like naming for CSS classes
- Global styles in `src/styles.scss`

## Forbidden Actions

Per the migration playbook:

- Do NOT couple `/upgrade` to AngularJS internals
- Do NOT introduce real external services (use mocks)
- Do NOT fork styling systems without approval

## Next Steps

This Bootstrap phase establishes the foundation. Subsequent phases will:

1. Migrate individual screens from AngularJS to Angular
2. Implement real service adapters
3. Set up shared authentication between apps
4. Configure production deployment
