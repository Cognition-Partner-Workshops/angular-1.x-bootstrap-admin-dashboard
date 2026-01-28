import { Routes } from '@angular/router';

export const AMCHARTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./amcharts.component').then(m => m.AmchartsComponent),
    data: {
      breadcrumb: 'amCharts'
    }
  }
];
