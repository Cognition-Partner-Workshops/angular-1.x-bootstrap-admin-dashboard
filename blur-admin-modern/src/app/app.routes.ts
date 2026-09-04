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
      { path: 'form', loadChildren: () => import('./pages/form/form.routes').then((m) => m.FORM_ROUTES), data: { title: 'Form Elements', sidebarMeta: { icon: 'ion-compose', order: 250 } } },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
