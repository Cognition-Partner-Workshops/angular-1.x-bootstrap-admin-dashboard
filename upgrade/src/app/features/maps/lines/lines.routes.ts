import { Routes } from '@angular/router';

export const LINES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./lines.component').then(m => m.MapLinesComponent),
    data: {
      breadcrumb: 'Line Maps'
    }
  }
];
