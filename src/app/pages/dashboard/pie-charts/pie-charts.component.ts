import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie-charts',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie-charts.component.html',
  styleUrl: './pie-charts.component.scss',
})
export class PieChartsComponent {
  charts = [
    {
      title: 'New Visits',
      value: '8,382',
      color: '#209e91',
      data: {
        labels: ['New Visits'],
        datasets: [{
          data: [70, 30],
          backgroundColor: ['#209e91', 'rgba(0,0,0,0.07)'],
          borderWidth: 0,
        }],
      } as ChartData<'doughnut'>,
    },
    {
      title: 'Purchases',
      value: '7,456',
      color: '#90b900',
      data: {
        labels: ['Purchases'],
        datasets: [{
          data: [55, 45],
          backgroundColor: ['#90b900', 'rgba(0,0,0,0.07)'],
          borderWidth: 0,
        }],
      } as ChartData<'doughnut'>,
    },
    {
      title: 'Active Users',
      value: '3,720',
      color: '#dfb81c',
      data: {
        labels: ['Active Users'],
        datasets: [{
          data: [40, 60],
          backgroundColor: ['#dfb81c', 'rgba(0,0,0,0.07)'],
          borderWidth: 0,
        }],
      } as ChartData<'doughnut'>,
    },
  ];

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };
}
