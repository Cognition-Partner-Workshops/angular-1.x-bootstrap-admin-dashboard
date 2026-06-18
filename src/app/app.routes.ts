import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: 'charts',
    loadChildren: () => import('./pages/charts/charts.routes').then(m => m.CHARTS_ROUTES),
  },
  {
    path: 'form',
    loadChildren: () => import('./pages/forms/forms.routes').then(m => m.FORMS_ROUTES),
  },
  {
    path: 'tables',
    loadChildren: () => import('./pages/tables/tables.routes').then(m => m.TABLES_ROUTES),
  },
  {
    path: 'ui',
    loadChildren: () => import('./pages/ui/ui.routes').then(m => m.UI_ROUTES),
  },
  {
    path: 'maps',
    loadChildren: () => import('./pages/maps/maps.routes').then(m => m.MAPS_ROUTES),
  },
  {
    path: 'components',
    loadChildren: () => import('./pages/components/components.routes').then(m => m.COMPONENTS_ROUTES),
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.routes').then(m => m.PROFILE_ROUTES),
  },
  { path: '**', redirectTo: 'dashboard' },
];
