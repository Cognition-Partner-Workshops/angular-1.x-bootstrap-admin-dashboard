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
      { path: 'maps', loadChildren: () => import('./pages/maps/maps.routes').then((m) => m.MAPS_ROUTES), data: { title: 'Maps', sidebarMeta: { icon: 'ion-ios-location-outline', order: 500 } } },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
