import { Routes } from '@angular/router';

export const PROGRESS_BARS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./progress-bars.component').then(m => m.ProgressBarsComponent),
    data: {
      breadcrumb: 'Progress Bars'
    }
  }
];
