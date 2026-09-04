import { Component, NgZone, inject } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { BaConfigService } from '../../../theme';
import { AmChartBase } from './am-chart-base';

@Component({ selector: 'am-area-chart', standalone: true, template: `<div #host id="areaChart" class="admin-chart"></div>` })
export class AreaChartComponent extends AmChartBase {
  constructor() { super(inject(BaConfigService), inject(NgZone)); }
  protected createChart(root: am5.Root): void {
    const c = this.config.colors;
    const chart = root.container.children.push(am5xy.XYChart.new(root, { panX: true, panY: false, wheelX: 'panX', wheelY: 'zoomX' }));
    const x = chart.xAxes.push(am5xy.DateAxis.new(root, { baseInterval: { timeUnit: 'day', count: 1 }, renderer: am5xy.AxisRendererX.new(root, {}) }));
    const y = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: am5xy.AxisRendererY.new(root, {}) }));
    const series = chart.series.push(am5xy.LineSeries.new(root, { xAxis: x, yAxis: y, valueXField: 'date', valueYField: 'duration', tooltip: am5.Tooltip.new(root, { labelText: '{valueY} min' }), stroke: am5.color(parseInt(c.primary.slice(1), 16)), fill: am5.color(parseInt(c.primary.slice(1), 16)) }));
    series.fills.template.setAll({ visible: true, fillOpacity: 0.5 });
    series.bullets.push(() => am5.Bullet.new(root, { sprite: am5.Rectangle.new(root, { width: 7, height: 7, centerX: am5.p50, centerY: am5.p50 }) }));
    const overrides: Record<number, string> = { 0: c.info, 4: c.warning, 7: c.danger };
    series.strokes.template.adapters.add('stroke', (stroke, target) => {
      const item = target.dataItem?.dataContext as { color?: string } | undefined;
      return item?.color ? am5.color(parseInt(item.color.slice(1), 16)) : stroke;
    });
    const data = [408, 482, 562, 379, 501, 443, 405, 309, 287, 485, 890, 810].map((duration, i) => ({ date: Date.UTC(2012, 0, i + 1), duration, color: overrides[i] }));
    series.data.setAll(data); x.zoomToDates(new Date(Date.UTC(2012, 0, 3)), new Date(Date.UTC(2012, 0, 11)));
    chart.set('cursor', am5xy.XYCursor.new(root, { xAxis: x }));
  }
}
