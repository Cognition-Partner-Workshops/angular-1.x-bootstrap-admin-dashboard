import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts';
import { DashboardComponent } from './features/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'upgrade/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'upgrade',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'ui/grid',
        loadChildren: () => import('./features/ui/grid/grid.routes').then(m => m.GRID_ROUTES),
        data: {
          breadcrumb: 'UI'
        }
      },
      {
        path: 'ui/alerts',
        loadChildren: () => import('./features/ui/alerts/alerts.routes').then(m => m.ALERTS_ROUTES),
        data: {
          breadcrumb: 'UI'
        }
      },
      {
        path: 'form/layouts',
        loadChildren: () => import('./features/form/layouts/layouts.routes').then(m => m.LAYOUTS_ROUTES),
        data: {
          breadcrumb: 'Form'
        }
      },
      {
        path: 'ui/panels',
        loadChildren: () => import('./features/ui/panels/panels.routes').then(m => m.PANELS_ROUTES),
        data: {
          breadcrumb: 'UI'
        }
      },
      {
        path: 'ui/typography',
        loadChildren: () => import('./features/ui/typography/typography.routes').then(m => m.TYPOGRAPHY_ROUTES),
        data: {
          breadcrumb: 'UI'
        }
      },
      {
        path: 'ui/progress-bars',
        loadChildren: () => import('./features/ui/progress-bars/progress-bars.routes').then(m => m.PROGRESS_BARS_ROUTES),
        data: {
          breadcrumb: 'UI'
        }
      },
      {
        path: 'components/timeline',
        loadChildren: () => import('./features/components/timeline/timeline.routes').then(m => m.TIMELINE_ROUTES),
        data: {
          breadcrumb: 'Components'
        }
      },
      {
        path: 'ui/tabs',
        loadChildren: () => import('./features/ui/tabs/tabs.routes').then(m => m.TABS_ROUTES),
        data: { breadcrumb: 'UI Elements' }
      },
      {
        path: 'tables/smart',
        loadChildren: () => import('./features/tables/smart/smart.routes').then(m => m.SMART_TABLE_ROUTES),
        data: { breadcrumb: 'Tables' }
      },
      {
        path: 'ui/slider',
        loadChildren: () => import('./features/ui/slider/slider.routes').then(m => m.SLIDER_ROUTES),
        data: { breadcrumb: 'UI' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'upgrade/dashboard'
  }
];
