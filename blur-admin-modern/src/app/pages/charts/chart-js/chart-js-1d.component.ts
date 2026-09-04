import { Component, Input, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';
import { BaConfigService } from '../../../theme';
import { chartJsOptions, chartPalette } from './chart-js.defaults';

@Component({
  selector: 'chart-js-1d',
  standalone: true,
  imports: [BaseChartDirective],
  template: `<canvas baseChart class="chart" [id]="canvasId" [type]="chartType" [data]="data"
    [options]="options" (chartClick)="changeData()"></canvas>`,
})
export class ChartJs1DComponent {
  @Input() chartType: 'pie' | 'doughnut' | 'polarArea' = 'pie';
  @Input() canvasId = '';
  readonly labels = ['Sleeping', 'Designing', 'Coding', 'Cycling'];
  dataValues = [20, 40, 5, 35];
  private readonly config = inject(BaConfigService);
  get data(): ChartData<ChartType> {
    const colors = chartPalette(this.config.colors);
    return { labels: this.labels, datasets: [{ data: this.dataValues, backgroundColor: colors, borderColor: colors, borderWidth: 0 }] };
  }
  get options() { return chartJsOptions(this.config.colors, this.chartType); }
  changeData(): void {
    for (let j: number, x: number, i = this.dataValues.length; i; j = Math.floor(Math.random() * i), x = this.dataValues[--i], this.dataValues[i] = this.dataValues[j], this.dataValues[j] = x) {}
  }
}
