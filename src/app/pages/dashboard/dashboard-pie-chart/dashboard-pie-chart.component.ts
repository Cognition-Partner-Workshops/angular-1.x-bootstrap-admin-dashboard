import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeConfigService } from '../../../theme/services/theme-config.service';

interface PieChartItem {
  color: string;
  description: string;
  stats: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-pie-chart.component.html',
  styleUrl: './dashboard-pie-chart.component.scss',
})
export class DashboardPieChartComponent {
  charts: PieChartItem[];

  constructor(private themeConfig: ThemeConfigService) {
    const colors = this.themeConfig.colors.dashboard;
    this.charts = [
      { color: colors.blueStone, description: 'New Visits', stats: '3,774', icon: 'fa fa-user' },
      { color: colors.surfieGreen, description: 'Purchases', stats: '1,250', icon: 'fa fa-money' },
      { color: colors.silverTree, description: 'Active Users', stats: '4,521', icon: 'fa fa-group' },
      { color: colors.gossip, description: 'Returned', stats: '10,295', icon: 'fa fa-refresh' },
    ];
  }
}
