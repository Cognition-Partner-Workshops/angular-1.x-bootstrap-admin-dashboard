import { Component, NgZone, inject } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { BaConfigService } from '../../../theme';
import { AmChartBase } from './am-chart-base';

@Component({ selector: 'am-line-chart', standalone: true, template: `<div #host id="lineChart" class="admin-chart"></div>` })
export class LineChartComponent extends AmChartBase {
  constructor() { super(inject(BaConfigService), inject(NgZone)); }
  protected createChart(root: am5.Root): void {
    const c = this.config.colors;
    const chart = root.container.children.push(am5xy.XYChart.new(root, { panX: true, wheelX: 'panX', wheelY: 'zoomX' }));
    const x = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: 'year', renderer: am5xy.AxisRendererX.new(root, {}) }));
    const y = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: am5xy.AxisRendererY.new(root, {}) }));
    const series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, { xAxis: x, yAxis: y, categoryXField: 'year', valueYField: 'value', stroke: am5.color(parseInt(c.danger.slice(1), 16)), tooltip: am5.Tooltip.new(root, { labelText: '{valueY}' }) }));
    series.bullets.push(() => am5.Bullet.new(root, { sprite: am5.Circle.new(root, { radius: 4 }) }));
    const values = [-0.17, -0.254, 0.019, -0.063, 0.005, 0.077, 0.12, 0.011, 0.177, -0.021, -0.037, 0.03, 0.179, 0.2, 0.18, 0.21];
    const data = values.map((value, i) => ({ year: String(1990 + i), value }));
    x.data.setAll(data); series.data.setAll(data);
    const scrollbar = chart.set('scrollbarX', am5xy.XYChartScrollbar.new(root, { orientation: 'horizontal', height: 40 }));
    (scrollbar as unknown as { set(key: string, value: unknown): void }).set('series', series); chart.set('cursor', am5xy.XYCursor.new(root, { xAxis: x, yAxis: y }));
    x.zoomToIndexes(Math.round(values.length * 0.4), Math.round(values.length * 0.55));
  }
}
