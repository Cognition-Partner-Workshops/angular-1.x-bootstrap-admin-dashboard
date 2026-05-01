import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ThemeConfigService } from '../../../theme/services/theme-config.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-line-chart',
  standalone: true,
  template: `<canvas #chartCanvas></canvas>`,
  styles: [`:host { display: block; } canvas { max-height: 250px; }`],
})
export class DashboardLineChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  constructor(private themeConfig: ThemeConfigService) {}

  ngAfterViewInit(): void {
    const colors = this.themeConfig.colors.dashboard;
    const ctx = this.chartCanvas.nativeElement.getContext('2d')!;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Revenue',
            data: [65, 59, 80, 81, 56, 55, 95],
            borderColor: colors.surfieGreen,
            backgroundColor: colors.surfieGreen + '33',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Expenses',
            data: [28, 48, 40, 19, 86, 27, 50],
            borderColor: colors.blueStone,
            backgroundColor: colors.blueStone + '33',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
