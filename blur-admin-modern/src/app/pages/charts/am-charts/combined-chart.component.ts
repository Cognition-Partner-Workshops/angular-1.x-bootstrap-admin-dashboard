import { Component, NgZone, inject } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { BaConfigService } from '../../../theme';
import { AmChartBase } from './am-chart-base';

@Component({ selector: 'am-combined-chart', standalone: true, template: `<div #host id="zoomAxisChart" class="admin-chart"></div>` })
export class CombinedChartComponent extends AmChartBase {
  protected override readonly useBlurTheme: boolean = false;
  constructor() { super(inject(BaConfigService), inject(NgZone)); }
  protected createChart(root: am5.Root): void {
    const c = this.config.colors;
    const chart = root.container.children.push(am5xy.XYChart.new(root, { panX: true, wheelX: 'panX', wheelY: 'zoomX' }));
    const x = chart.xAxes.push(am5xy.DateAxis.new(root, { baseInterval: { timeUnit: 'day', count: 1 }, renderer: am5xy.AxisRendererX.new(root, {}) }));
    const v1 = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: am5xy.AxisRendererY.new(root, {}) }));
    const v2 = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: am5xy.AxisRendererY.new(root, { opposite: true, pan: 'zoom' }) }));
    const rows = [[71, 75, 5, 8], [74, 78, 4, 6], [78, 88, 5, 2], [85, 89, 8, 9], [82, 89, 9, 6], [83, 85, 3, 5], [88, 92, 5, 7], [85, 90, 7, 6], [85, 91, 9, 5], [80, 84, 5, 8], [87, 92, 4, 8], [84, 87, 3, 4], [83, 88, 5, 7], [84, 87, 5, 8], [81, 85, 4, 7]];
    const data = rows.map((r, i) => ({ date: Date.UTC(2013, 0, i + 16), market1: r[0], market2: r[1], sales1: r[2], sales2: r[3] }));
    const column = (field: string, name: string, color: string, width: number) => {
      const s = chart.series.push(am5xy.ColumnSeries.new(root, { name, xAxis: x, yAxis: v1, valueXField: 'date', valueYField: field, clustered: false, width: am5.percent(width), fill: am5.color(parseInt(color.slice(1), 16)), stroke: am5.color(parseInt(color.slice(1), 16)) }));
      s.data.setAll(data); return s;
    };
    column('sales2', 'Actual Sales', c.primaryLight, 50); column('sales1', 'Target Sales', c.primary, 30);
    const line = (field: string, name: string, color: string, dash?: number[]) => {
      const s = chart.series.push(am5xy.SmoothedXLineSeries.new(root, { name, xAxis: x, yAxis: v2, valueXField: 'date', valueYField: field, stroke: am5.color(parseInt(color.slice(1), 16)), fill: am5.color(parseInt(color.slice(1), 16)), ...(dash ? { strokeDasharray: dash } : {}) } as never));
      s.bullets.push(() => am5.Bullet.new(root, { sprite: am5.Circle.new(root, { radius: 5 }) })); s.data.setAll(data); return s;
    };
    const m1 = line('market1', 'Market Days', c.danger); line('market2', 'Market Days ALL', c.warning, [5]);
    const scrollbar = chart.set('scrollbarX', am5xy.XYChartScrollbar.new(root, { orientation: 'horizontal', height: 40 })); (scrollbar as unknown as { set(key: string, value: unknown): void }).set('series', m1);
    chart.set('cursor', am5xy.XYCursor.new(root, { xAxis: x, behavior: 'none' })); chart.children.push(am5.Legend.new(root, { centerX: am5.p50, x: am5.p50, y: 0 }));
  }
}
