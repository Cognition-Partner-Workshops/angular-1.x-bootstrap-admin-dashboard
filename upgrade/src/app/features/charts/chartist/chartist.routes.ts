import { Routes } from '@angular/router';

export const CHARTIST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./chartist.component').then(m => m.ChartistComponent),
    data: {
      breadcrumb: 'Chartist'
    }
  }
];
