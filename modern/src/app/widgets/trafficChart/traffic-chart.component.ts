import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';

Chart.register(...registerables);

/**
 * Modern standalone port of the legacy AngularJS "Acquisition Channels"
 * doughnut widget (`trafficChart`).
 *
 * Legacy source (main branch):
 *   src/app/pages/dashboard/trafficChart/TrafficChartCtrl.js
 *   src/app/pages/dashboard/trafficChart/trafficChart.html
 *   src/sass/theme/dashboard/_trafficChart.scss
 *
 * Renders a doughnut chart (ng2-charts + chart.js) with a centered
 * "Views Total" overlay plus a per-channel legend list with progress bars.
 * Only the widget's inner content is rendered — the surrounding `app-ba-panel`
 * is added by the dashboard integration step.
 */

// Legacy baConfig.colors.dashboard palette (hardcoded).
const dashboardColors = {
  blueStone: '#005562',
  surfieGreen: '#0e8174',
  silverTree: '#6eba8c',
  gossip: '#b9f2a1',
  white: '#10c4b5'
};

// hover = colorHelper.shade(color, 15) === each channel ~15% darker.
const hover = {
  blueStone: '#004853',
  surfieGreen: '#0b6d62',
  silverTree: '#5d9e77',
  gossip: '#9dcd88',
  white: '#0da699'
};

interface Channel {
  label: string;
  color: string;
  percentage: number;
}

@Component({
  selector: 'app-traffic-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './traffic-chart.component.html',
  styleUrl: './traffic-chart.component.scss'
})
export class TrafficChartComponent {
  readonly viewsTotal = '1,900,128';

  readonly channels: Channel[] = [
    { label: 'Other', color: dashboardColors.white, percentage: 87 },
    { label: 'Search engines', color: dashboardColors.blueStone, percentage: 22 },
    { label: 'Referral Traffic', color: dashboardColors.surfieGreen, percentage: 70 },
    { label: 'Direct Traffic', color: dashboardColors.silverTree, percentage: 38 },
    { label: 'Ad Campaigns', color: dashboardColors.gossip, percentage: 17 }
  ];

  readonly doughnutData: ChartData<'doughnut'> = {
    labels: ['Other', 'Search engines', 'Referral Traffic', 'Direct Traffic', 'Ad Campaigns'],
    datasets: [
      {
        data: [2000, 1500, 1000, 1200, 400],
        backgroundColor: [
          dashboardColors.white,
          dashboardColors.blueStone,
          dashboardColors.surfieGreen,
          dashboardColors.silverTree,
          dashboardColors.gossip
        ],
        hoverBackgroundColor: [
          hover.white,
          hover.blueStone,
          hover.surfieGreen,
          hover.silverTree,
          hover.gossip
        ],
        borderWidth: 0
      }
    ]
  };

  readonly doughnutOptions: ChartConfiguration<'doughnut'>['options'] = {
    cutout: '64%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    elements: {
      arc: { borderWidth: 0 }
    }
  };
}
