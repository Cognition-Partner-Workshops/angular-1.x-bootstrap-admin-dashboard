import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
        data: { title: 'Dashboard', sidebarMeta: { icon: 'ion-android-home', order: 0 } },
      },
      { path: 'charts', loadChildren: () => import('./pages/charts/charts.routes').then((m) => m.CHARTS_ROUTES), data: { title: 'Charts', sidebarMeta: { icon: 'ion-stats-bars', order: 150 } } },
      { path: 'components', loadChildren: () => import('./pages/components/components.routes').then((m) => m.COMPONENTS_ROUTES), data: { title: 'Components', sidebarMeta: { icon: 'ion-gear-a', order: 100 } } },
      { path: 'form', loadChildren: () => import('./pages/form/form.routes').then((m) => m.FORM_ROUTES), data: { title: 'Form Elements', sidebarMeta: { icon: 'ion-compose', order: 250 } } },
      { path: 'maps', loadChildren: () => import('./pages/maps/maps.routes').then((m) => m.MAPS_ROUTES), data: { title: 'Maps', sidebarMeta: { icon: 'ion-ios-location-outline', order: 500 } } },
      { path: 'profile', loadChildren: () => import('./pages/profile/profile.routes').then((m) => m.PROFILE_ROUTES) },
      {
        path: 'tables',
        loadChildren: () => import('./pages/tables/tables.routes').then((m) => m.TABLES_ROUTES),
        data: { title: 'Tables', sidebarMeta: { icon: 'ion-grid', order: 300 } },
      },
      {
        path: 'ui',
        loadChildren: () => import('./pages/ui/ui.routes').then((m) => m.UI_ROUTES),
        data: { title: 'UI Features', sidebarMeta: { icon: 'ion-android-laptop', order: 200 } },
      },
      {
        path: 'ui',
        loadChildren: () => import('./pages/ui/ui.routes').then((m) => m.UI_ROUTES),
        data: { title: 'UI Features', sidebarMeta: { icon: 'ion-android-laptop', order: 200 } },
      },
      {
        path: 'ui',
        loadChildren: () => import('./pages/ui/ui.routes').then((m) => m.UI_ROUTES),
        data: { title: 'UI Features', sidebarMeta: { icon: 'ion-android-laptop', order: 200 } },
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
