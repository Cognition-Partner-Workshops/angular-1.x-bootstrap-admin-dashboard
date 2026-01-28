import { Routes } from '@angular/router';

export const GRID_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./grid.component').then(m => m.GridComponent),
    data: {
      breadcrumb: 'Grid'
    }
  }
];
