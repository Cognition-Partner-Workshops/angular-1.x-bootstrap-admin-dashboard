import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ThemeConfigService, shade } from '../../../theme/services/theme-config.service';

Chart.register(...registerables);

@Component({
  selector: 'app-traffic-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #chartCanvas></canvas>`,
  styles: [`:host { display: block; } canvas { max-height: 250px; }`],
})
export class TrafficChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  constructor(private themeConfig: ThemeConfigService) {}

  ngAfterViewInit(): void {
    const colors = this.themeConfig.colors.dashboard;
    const ctx = this.chartCanvas.nativeElement.getContext('2d')!;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Other', 'Search Engines', 'Referral Traffic', 'Direct Traffic', 'Ad Campaigns'],
        datasets: [
          {
            data: [2000, 1500, 1000, 1200, 400],
            backgroundColor: [
              colors.white,
              colors.blueStone,
              colors.surfieGreen,
              colors.silverTree,
              colors.gossip,
            ],
            hoverBackgroundColor: [
              shade(colors.white, 15),
              shade(colors.blueStone, 15),
              shade(colors.surfieGreen, 15),
              shade(colors.silverTree, 15),
              shade(colors.gossip, 15),
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: '64%',
        responsive: true,
        plugins: {
          legend: { position: 'right' },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
