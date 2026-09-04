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
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
