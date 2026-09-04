import { Routes } from '@angular/router';
import { AmChartsComponent } from './am-charts/am-charts.component';
import { ChartJsComponent } from './chart-js/chart-js.component';
import { ChartistComponent } from './chartist/chartist.component';
import { MorrisComponent } from './morris/morris.component';

export const CHARTS_ROUTES: Routes = [
  { path: '', redirectTo: 'amCharts', pathMatch: 'full' },
  { path: 'amCharts', component: AmChartsComponent, data: { title: 'amCharts', sidebarMeta: { order: 0 } } },
  { path: 'chartist', component: ChartistComponent, data: { title: 'Chartist', sidebarMeta: { order: 100 } } },
  { path: 'chartJs', component: ChartJsComponent, data: { title: 'Chart.js', sidebarMeta: { order: 200 } } },
  { path: 'morris', component: MorrisComponent, data: { title: 'Morris', sidebarMeta: { order: 300 } } },
];
