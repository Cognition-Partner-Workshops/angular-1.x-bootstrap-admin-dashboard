import { Routes } from '@angular/router';

export const CHARTS_ROUTES: Routes = [
  { path: '', redirectTo: 'chartJs', pathMatch: 'full' },
  { path: 'chartJs', loadComponent: () => import('./chartjs/chartjs.component').then(m => m.ChartJsComponent) },
  { path: 'amCharts', loadComponent: () => import('./amcharts/amcharts.component').then(m => m.AmchartsComponent) },
  { path: 'chartist', loadComponent: () => import('./chartist/chartist.component').then(m => m.ChartistComponent) },
  { path: 'morris', loadComponent: () => import('./morris/morris.component').then(m => m.MorrisComponent) },
];
