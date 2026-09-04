import { Component, NgZone, inject } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import { BaConfigService } from '../../../theme';
import { AmChartBase } from './am-chart-base';

@Component({ selector: 'am-funnel-chart', standalone: true, template: `<div #host id="funnelChart" class="admin-chart"></div>` })
export class FunnelChartComponent extends AmChartBase {
  constructor() { super(inject(BaConfigService), inject(NgZone)); }
  protected createChart(root: am5.Root): void {
    const chart = root.container.children.push(am5percent.SlicedChart.new(root, {}));
    const series = chart.series.push(am5percent.FunnelSeries.new(root, { orientation: 'vertical', valueField: 'value', categoryField: 'title', alignLabels: true, bottomRatio: 0, tooltip: am5.Tooltip.new(root, { labelText: '{category}: {value}' }) }));
    series.slices.template.setAll({ fillOpacity: 0.9 });
    series.data.setAll([{ title: 'Website visits', value: 300 }, { title: 'Downloads', value: 123 }, { title: 'Requested prices', value: 98 }, { title: 'Contaced', value: 72 }, { title: 'Purchased', value: 35 }, { title: 'Asked for support', value: 25 }, { title: 'Purchased more', value: 18 }]);
  }
}
