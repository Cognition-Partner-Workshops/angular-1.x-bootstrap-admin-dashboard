import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaConfigService, StopableIntervalHandle, StopableIntervalService } from '../../../theme';
import { chartJsOptions, chartPalette } from './chart-js.defaults';

@Component({
  selector: 'chart-js-wave',
  standalone: true,
  imports: [BaseChartDirective],
  template: `<canvas baseChart class="chart" [id]="canvasId" [type]="chartType" [data]="data"
    [options]="options"></canvas>`,
})
export class ChartJsWaveComponent implements OnInit, OnDestroy {
  @Input() chartType: 'radar' | 'bar' = 'radar';
  @Input() canvasId = '';
  readonly labels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dataValues = [1, 9, 3, 4, 5, 6, 7, 8, 2].map((e) => Math.sin(e) * 25 + 25);
  private readonly config = inject(BaConfigService);
  private readonly interval = inject(StopableIntervalService);
  private handle?: StopableIntervalHandle;
  private cache?: { type: string; data: ChartData<ChartType>; options: ChartOptions };

  private buildData(): ChartData<ChartType> {
    const color = chartPalette(this.config.colors)[0];
    return { labels: this.labels, datasets: [{ data: this.dataValues, backgroundColor: `${color}80`, borderColor: color, fill: this.chartType === 'radar' }] };
  }

  private snapshot() {
    if (!this.cache || this.cache.type !== this.chartType) {
      this.cache = {
        type: this.chartType,
        data: this.buildData(),
        options: chartJsOptions(this.config.colors, this.chartType, false),
      };
    }
    return this.cache;
  }

  get data() { return this.snapshot().data; }
  get options() { return this.snapshot().options; }

  ngOnInit(): void {
    this.handle = this.interval.start(() => {
      this.dataValues = [this.dataValues[this.dataValues.length - 1], ...this.dataValues.slice(0, -1)];
      this.cache = undefined;
    }, 400);
  }
  ngOnDestroy(): void { this.handle?.stop(); }
}
