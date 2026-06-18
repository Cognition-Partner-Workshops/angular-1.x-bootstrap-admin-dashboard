import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="line-chart-container">
      <canvas baseChart
        [data]="lineData"
        [options]="lineOptions"
        type="line">
      </canvas>
    </div>
  `,
  styles: [`
    .line-chart-container {
      height: 320px;
    }
  `],
})
export class LineChartComponent {
  lineData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55, 72, 90, 85, 88, 95, 105],
        fill: true,
        backgroundColor: 'rgba(32, 158, 145, 0.2)',
        borderColor: '#209e91',
        tension: 0.4,
        pointBackgroundColor: '#209e91',
      },
      {
        label: 'Expenses',
        data: [28, 48, 40, 19, 86, 27, 55, 65, 59, 62, 70, 75],
        fill: true,
        backgroundColor: 'rgba(144, 185, 0, 0.2)',
        borderColor: '#90b900',
        tension: 0.4,
        pointBackgroundColor: '#90b900',
      },
    ],
  };

  lineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 20, font: { size: 12 } },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
      x: {
        grid: { display: false },
      },
    },
  };
}
