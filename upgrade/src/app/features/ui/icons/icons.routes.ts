import { Routes } from '@angular/router';

export const ICONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./icons.component').then(m => m.IconsComponent),
    data: {
      breadcrumb: 'Icons'
    }
  }
];
