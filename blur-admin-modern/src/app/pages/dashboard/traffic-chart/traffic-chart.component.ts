import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BaConfigService, shade } from '../../../theme';

@Component({
  selector: 'traffic-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './traffic-chart.component.html',
  styleUrl: './traffic-chart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TrafficChartComponent {
  private readonly config = inject(BaConfigService);

  readonly transparent = this.config.theme.blur;
  readonly labels = ['Other', 'Search engines', 'Referral Traffic', 'Direct Traffic', 'Ad Campaigns'];
  readonly percentage = [87, 22, 70, 38, 17];
  readonly backgroundColor: string[];
  readonly hoverBackgroundColor: string[];

  readonly doughnutData: ChartConfiguration<'doughnut'>['data'];
  readonly options: ChartConfiguration<'doughnut'>['options'] = {
    cutout: '64%',
    responsive: true,
    maintainAspectRatio: true,
    elements: { arc: { borderWidth: 0 } },
    plugins: { legend: { display: false } },
  };

  constructor() {
    const dashboard = this.config.colors.dashboard;
    this.backgroundColor = [dashboard.white, dashboard.blueStone, dashboard.surfieGreen, dashboard.silverTree, dashboard.gossip];
    this.hoverBackgroundColor = this.backgroundColor.map((c) => shade(c, 15));
    this.doughnutData = {
      labels: this.labels,
      datasets: [{
        data: [2000, 1500, 1000, 1200, 400],
        backgroundColor: this.backgroundColor,
        hoverBackgroundColor: this.hoverBackgroundColor,
      }],
    };
  }
}
