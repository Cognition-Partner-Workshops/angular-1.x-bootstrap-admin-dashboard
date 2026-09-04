import { Component, Input, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
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
  private cache?: { type: string; data: ChartData<ChartType>; options: ChartOptions };

  private buildData(): ChartData<ChartType> {
    const colors = chartPalette(this.config.colors);
    return { labels: this.labels, datasets: [{ data: this.dataValues, backgroundColor: colors, borderColor: colors, borderWidth: 0 }] };
  }

  private snapshot() {
    if (!this.cache || this.cache.type !== this.chartType) {
      this.cache = {
        type: this.chartType,
        data: this.buildData(),
        options: chartJsOptions(this.config.colors, this.chartType),
      };
    }
    return this.cache;
  }

  get data() { return this.snapshot().data; }
  get options() { return this.snapshot().options; }

  changeData(): void {
    for (let j: number, x: number, i = this.dataValues.length; i; j = Math.floor(Math.random() * i), x = this.dataValues[--i], this.dataValues[i] = this.dataValues[j], this.dataValues[j] = x) {}
    this.cache = undefined;
  }
}
