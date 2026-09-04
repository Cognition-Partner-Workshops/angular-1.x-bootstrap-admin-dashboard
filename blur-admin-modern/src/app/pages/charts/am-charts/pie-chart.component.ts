import { Component, NgZone, inject } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import { BaConfigService } from '../../../theme';
import { AmChartBase } from './am-chart-base';

@Component({ selector: 'am-pie-chart', standalone: true, template: `<div #host id="pieChart" class="admin-chart"></div>` })
export class PieChartComponent extends AmChartBase {
  private observer?: ResizeObserver;
  constructor() { super(inject(BaConfigService), inject(NgZone)); }
  protected createChart(root: am5.Root): void {
    const chart = root.container.children.push(am5percent.PieChart.new(root, { layout: root.horizontalLayout }));
    const series = chart.series.push(am5percent.PieSeries.new(root, { valueField: 'litres', categoryField: 'country', innerRadius: am5.percent(40), alignLabels: true }));
    series.slices.template.setAll({ fillOpacity: 0.8 });
    series.slices.template.events.on('pointerover', (event) => event.target.toFront());
    series.data.setAll([{ country: 'Lithuania', litres: 501.9 }, { country: 'Czech Republic', litres: 301.9 }, { country: 'Ireland', litres: 201.1 }, { country: 'Germany', litres: 165.8 }, { country: 'Australia', litres: 139.9 }, { country: 'Austria', litres: 128.3 }, { country: 'UK', litres: 99 }, { country: 'Belgium', litres: 60 }]);
    const legend = chart.children.push(am5.Legend.new(root, { centerY: am5.p50, y: am5.p50, layout: root.verticalLayout }));
    legend.data.setAll(series.dataItems);
    this.observer = new ResizeObserver(() => { legend.set('visible', this.host.nativeElement.clientWidth > 900); });
    this.observer.observe(this.host.nativeElement);
  }
  override ngOnDestroy(): void {
    this.observer?.disconnect();
    super.ngOnDestroy();
  }
}
