import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewEncapsulation, inject, viewChild } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { BaConfigService, BaUtilService } from '../../../theme';

export interface RevenuePoint {
  date: Date;
  value: number;
  value0: number;
}

export const REVENUE_CHART_DATA: RevenuePoint[] = [
  { date: new Date(2012, 11), value: 0, value0: 0 },
  { date: new Date(2013, 0), value: 15000, value0: 19000 },
  { date: new Date(2013, 1), value: 30000, value0: 20000 },

  { date: new Date(2013, 2), value: 25000, value0: 22000 },
  { date: new Date(2013, 3), value: 21000, value0: 25000 },
  { date: new Date(2013, 4), value: 24000, value0: 29000 },
  { date: new Date(2013, 5), value: 31000, value0: 26000 },
  { date: new Date(2013, 6), value: 40000, value0: 25000 },
  { date: new Date(2013, 7), value: 37000, value0: 20000 },
  { date: new Date(2013, 8), value: 18000, value0: 22000 },
  { date: new Date(2013, 9), value: 5000, value0: 26000 },
  { date: new Date(2013, 10), value: 40000, value0: 30000 },
  { date: new Date(2013, 11), value: 20000, value0: 25000 },
  { date: new Date(2014, 0), value: 5000, value0: 13000 },

  { date: new Date(2014, 1), value: 3000, value0: 13000 },
  { date: new Date(2014, 2), value: 1800, value0: 13000 },
  { date: new Date(2014, 3), value: 10400, value0: 13000 },
  { date: new Date(2014, 4), value: 25500, value0: 13000 },
  { date: new Date(2014, 5), value: 2100, value0: 13000 },
  { date: new Date(2014, 6), value: 6500, value0: 13000 },
  { date: new Date(2014, 7), value: 1100, value0: 13000 },
  { date: new Date(2014, 8), value: 17200, value0: 13000 },
  { date: new Date(2014, 9), value: 26900, value0: 13000 },
  { date: new Date(2014, 10), value: 14100, value0: 13000 },
  { date: new Date(2014, 11), value: 35300, value0: 13000 },
  { date: new Date(2015, 0), value: 54800, value0: 13000 },
  { date: new Date(2015, 1), value: 49800, value0: 13000 },
];

export const REVENUE_ZOOM_START = new Date(2013, 3);
export const REVENUE_ZOOM_END = new Date(2014, 0);

@Component({
  selector: 'dashboard-line-chart',
  standalone: true,
  template: '<div id="amchart" #chart></div>',
  styleUrl: './dashboard-line-chart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardLineChartComponent implements AfterViewInit, OnDestroy {
  private readonly config = inject(BaConfigService);
  private readonly util = inject(BaUtilService);
  private readonly zone = inject(NgZone);
  private readonly chartRef = viewChild.required<ElementRef<HTMLDivElement>>('chart');

  readonly chartData = REVENUE_CHART_DATA;
  root?: am5.Root;
  chart?: am5xy.XYChart;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.createChart());
  }

  ngOnDestroy(): void {
    this.root?.dispose();
    this.root = undefined;
    this.chart = undefined;
  }

  private createChart(): void {
    const layoutColors = this.config.colors;
    const graphColor = this.config.theme.blur ? '#000000' : layoutColors.primary;
    const axisColor = am5.color(layoutColors.defaultText);

    const root = am5.Root.new(this.chartRef().nativeElement);
    root.dateFormatter.set('dateFormat', 'MM yyyy');
    this.root = root;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      paddingTop: 15,
      paddingRight: 15,
      paddingLeft: 0,
      wheelY: 'zoomX',
      panX: true,
    }));
    this.chart = chart;

    const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 50 });
    xRenderer.grid.template.setAll({ strokeOpacity: 0 });
    xRenderer.labels.template.setAll({ fill: axisColor });
    xRenderer.setAll({ stroke: axisColor, strokeOpacity: 1 });
    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: { timeUnit: 'month', count: 1 },
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {}),
      tooltipDateFormat: 'MM yyyy',
    }));

    const yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 50 });
    yRenderer.grid.template.setAll({ strokeOpacity: 0 });
    yRenderer.labels.template.setAll({ fill: axisColor });
    yRenderer.setAll({ stroke: axisColor, strokeOpacity: 1 });
    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: yRenderer }));

    const data = this.chartData.map((p) => ({ date: p.date.getTime(), value: p.value, value0: p.value0 }));

    [{ field: 'value0', alpha: 0.3 }, { field: 'value', alpha: 0.5 }].forEach(({ field, alpha }) => {
      const series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: 'date',
        valueYField: field,
        stroke: am5.color(this.util.hexToRGB(graphColor, alpha)),
        fill: am5.color(this.util.hexToRGB(graphColor, alpha)),
        tooltip: am5.Tooltip.new(root, { labelText: '{valueY}' }),
      }));
      series.strokes.template.setAll({ strokeWidth: 1, strokeOpacity: alpha });
      series.fills.template.setAll({ fillOpacity: alpha, visible: true });
      series.data.setAll(data);
    });

    const cursor = chart.set('cursor', am5xy.XYCursor.new(root, { behavior: 'zoomX' }));
    cursor.lineX.set('visible', false);
    cursor.lineY.setAll({ strokeOpacity: 0.5 });
    xAxis.get('tooltip')?.get('background')?.setAll({ fill: am5.color('#4285F4'), fillOpacity: 0.7 });

    chart.zoomOutButton.set('forceHidden', true);

    chart.appear(0, 0).then(() => xAxis.zoomToDates(REVENUE_ZOOM_START, REVENUE_ZOOM_END));
  }
}
