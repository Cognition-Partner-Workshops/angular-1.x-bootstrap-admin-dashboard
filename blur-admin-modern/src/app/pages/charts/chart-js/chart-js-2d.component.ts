import { Component, Input, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';
import { BaConfigService } from '../../../theme';
import { chartJsOptions, chartPalette } from './chart-js.defaults';

@Component({
  selector: 'chart-js-2d',
  standalone: true,
  imports: [BaseChartDirective],
  template: `<canvas baseChart class="chart" [id]="canvasId" [type]="chartType" [data]="data"
    [options]="options" (chartClick)="changeData()"></canvas>`,
})
export class ChartJs2DComponent {
  @Input() chartType: 'radar' | 'line' | 'bar' = 'line';
  @Input() canvasId = '';
  readonly labels = ['May', 'Jun', 'Jul', 'Aug', 'Sep'];
  readonly series = ['Product A', 'Product B'];
  dataValues = [[65, 59, 90, 81, 56], [28, 48, 40, 19, 88]];
  private readonly config = inject(BaConfigService);
  get data(): ChartData<ChartType> {
    const colors = chartPalette(this.config.colors);
    return { labels: this.labels, datasets: this.dataValues.map((data, i) => ({
      label: this.series[i], data, backgroundColor: `${colors[i]}80`, borderColor: colors[i], fill: this.chartType !== 'line',
    })) };
  }
  get options() { return chartJsOptions(this.config.colors, this.chartType); }
  changeData(): void {
    this.dataValues = this.dataValues.map((values) => {
      const shuffled = [...values];
      for (let j: number, x: number, i = shuffled.length; i; j = Math.floor(Math.random() * i), x = shuffled[--i], shuffled[i] = shuffled[j], shuffled[j] = x) {}
      return shuffled;
    });
  }
}
