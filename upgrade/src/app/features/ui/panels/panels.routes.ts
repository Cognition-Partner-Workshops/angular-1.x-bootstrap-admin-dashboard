import { Routes } from '@angular/router';

export const PANELS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./panels.component').then(m => m.PanelsComponent),
    data: {
      breadcrumb: 'Panels'
    }
  }
];
