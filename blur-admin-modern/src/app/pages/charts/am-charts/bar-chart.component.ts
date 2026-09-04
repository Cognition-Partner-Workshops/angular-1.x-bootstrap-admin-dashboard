import { Component, NgZone, inject } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { BaConfigService } from '../../../theme';
import { AmChartBase } from './am-chart-base';

@Component({ selector: 'am-bar-chart', standalone: true, template: `<div #host id="barChart" class="admin-chart"></div>` })
export class BarChartComponent extends AmChartBase {
  constructor() { super(inject(BaConfigService), inject(NgZone)); }
  protected createChart(root: am5.Root): void {
    const c = this.config.colors;
    const chart = root.container.children.push(am5xy.XYChart.new(root, { panX: false, panY: false, wheelX: 'none', wheelY: 'none' }));
    const x = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: 'country', renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }) }));
    const y = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: am5xy.AxisRendererY.new(root, {}) }));
    y.children.unshift(am5.Label.new(root, { text: 'Visitors from country', rotation: -90, y: am5.p50, centerX: am5.p50 }));
    const series = chart.series.push(am5xy.ColumnSeries.new(root, { xAxis: x, yAxis: y, categoryXField: 'country', valueYField: 'visits', tooltip: am5.Tooltip.new(root, { labelText: '{categoryX}: {valueY}' }) }));
    series.columns.template.setAll({ fillOpacity: 0.7, strokeOpacity: 0.2 });
    series.columns.template.adapters.add('fill', (_fill, target) => am5.color(parseInt((target.dataItem?.dataContext as { color: string }).color.slice(1), 16)));
    const data = [{ country: 'USA', visits: 3025, color: c.primary }, { country: 'China', visits: 1882, color: c.danger }, { country: 'Japan', visits: 1809, color: c.info }, { country: 'Germany', visits: 1322, color: c.success }, { country: 'UK', visits: 1122, color: c.warning }, { country: 'France', visits: 1114, color: c.primaryLight }];
    x.data.setAll(data); series.data.setAll(data);
  }
}
