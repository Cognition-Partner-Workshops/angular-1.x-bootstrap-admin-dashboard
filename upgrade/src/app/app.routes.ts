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
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'upgrade/dashboard'
  }
];
