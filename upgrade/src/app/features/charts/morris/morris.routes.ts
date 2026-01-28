import { Routes } from '@angular/router';

export const MORRIS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./morris.component').then(m => m.MorrisComponent),
    data: {
      breadcrumb: 'Morris'
    }
  }
];
