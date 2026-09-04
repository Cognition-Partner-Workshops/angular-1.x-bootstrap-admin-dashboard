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
        path: 'ui',
        loadChildren: () => import('./pages/ui/ui.routes').then((m) => m.UI_ROUTES),
        data: { title: 'UI Features', sidebarMeta: { icon: 'ion-android-laptop', order: 200 } },
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
