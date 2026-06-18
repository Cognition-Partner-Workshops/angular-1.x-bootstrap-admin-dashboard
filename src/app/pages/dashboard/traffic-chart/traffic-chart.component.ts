import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-traffic-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="traffic-chart-container">
      <canvas baseChart
        [data]="doughnutData"
        [options]="doughnutOptions"
        type="doughnut">
      </canvas>
    </div>
  `,
  styles: [`
    .traffic-chart-container {
      height: 350px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `],
})
export class TrafficChartComponent {
  doughnutData: ChartData<'doughnut'> = {
    labels: ['Other', 'Search engines', 'Referral Traffic', 'Direct Traffic', 'Ad Campaigns'],
    datasets: [{
      data: [2000, 1500, 1000, 1200, 400],
      backgroundColor: ['#ffffff', '#016936', '#209e91', '#63b0a9', '#a4d4ae'],
      hoverBackgroundColor: ['#e6e6e6', '#014d28', '#1a877c', '#539993', '#8dc09a'],
      borderWidth: 0,
    }],
  };

  doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '64%',
    plugins: {
      legend: {
        position: 'right',
        labels: { padding: 20, font: { size: 13 } },
      },
    },
  };
}
