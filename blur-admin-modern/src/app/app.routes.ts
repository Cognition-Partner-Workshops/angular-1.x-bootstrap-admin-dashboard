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
      {
        path: 'tables',
        loadChildren: () => import('./pages/tables/tables.routes').then((m) => m.TABLES_ROUTES),
        data: { title: 'Tables', sidebarMeta: { icon: 'ion-grid', order: 300 } },
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
