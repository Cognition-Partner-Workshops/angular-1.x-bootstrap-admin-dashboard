import { Component } from '@angular/core';
import { BaPanelComponent } from '../../../theme';
import { AreaChartComponent } from './area-chart.component';
import { BarChartComponent } from './bar-chart.component';
import { CombinedChartComponent } from './combined-chart.component';
import { FunnelChartComponent } from './funnel-chart.component';
import { LineChartComponent } from './line-chart.component';
import { PieChartComponent } from './pie-chart.component';

@Component({
  selector: 'app-am-charts', standalone: true,
  imports: [BaPanelComponent, BarChartComponent, AreaChartComponent, LineChartComponent, PieChartComponent, FunnelChartComponent, CombinedChartComponent],
  templateUrl: './am-charts.component.html',
})
export class AmChartsComponent {}
