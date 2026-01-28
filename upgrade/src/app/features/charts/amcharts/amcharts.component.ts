import { Component, OnDestroy, ElementRef, ViewChild, AfterViewInit, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../shared/components/ba-panel';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

interface ThemeColors {
  primary: string;
  danger: string;
  warning: string;
  success: string;
  info: string;
  primaryDark: string;
  primaryLight: string;
  warningLight: string;
  successDark: string;
  successLight: string;
  warningDark: string;
  defaultText: string;
  border: string;
  borderDark: string;
}

@Component({
  selector: 'app-amcharts',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  templateUrl: './amcharts.component.html',
  styleUrl: './amcharts.component.scss'
})
export class AmchartsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('barChartDiv') barChartDiv!: ElementRef;
  @ViewChild('areaChartDiv') areaChartDiv!: ElementRef;
  @ViewChild('lineChartDiv') lineChartDiv!: ElementRef;
  @ViewChild('pieChartDiv') pieChartDiv!: ElementRef;
  @ViewChild('funnelChartDiv') funnelChartDiv!: ElementRef;
  @ViewChild('combinedChartDiv') combinedChartDiv!: ElementRef;

  private readonly zone = inject(NgZone);
  private roots: am5.Root[] = [];
  private layoutColors: ThemeColors = {
    primary: '#209e91',
    danger: '#e85656',
    warning: '#dfb81c',
    success: '#90b900',
    info: '#2dacd1',
    primaryDark: '#1a7e73',
    primaryLight: '#4eb8ad',
    warningLight: '#f0ce4e',
    successDark: '#6d8c00',
    successLight: '#b8e600',
    warningDark: '#b89516',
    defaultText: '#666666',
    border: '#dddddd',
    borderDark: '#aaaaaa'
  };

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.createBarChart();
      this.createAreaChart();
      this.createLineChart();
      this.createPieChart();
      this.createFunnelChart();
      this.createCombinedChart();
    });
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      this.roots.forEach(root => root.dispose());
    });
  }

  private createBarChart(): void {
    const root = am5.Root.new(this.barChartDiv.nativeElement);
    this.roots.push(root);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none'
      })
    );

    const data = [
      { country: 'USA', visits: 3025, color: am5.color(this.layoutColors.primary) },
      { country: 'China', visits: 1882, color: am5.color(this.layoutColors.danger) },
      { country: 'Japan', visits: 1809, color: am5.color(this.layoutColors.info) },
      { country: 'Germany', visits: 1322, color: am5.color(this.layoutColors.success) },
      { country: 'UK', visits: 1122, color: am5.color(this.layoutColors.warning) },
      { country: 'France', visits: 1114, color: am5.color(this.layoutColors.primaryLight) }
    ];

    const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -45,
      centerY: am5.p50,
      centerX: am5.p100
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'country',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    xAxis.data.setAll(data);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        min: 0
      })
    );
    yAxis.children.unshift(
      am5.Label.new(root, {
        text: 'Visitors from country',
        rotation: -90,
        y: am5.p50,
        centerX: am5.p50
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Visits',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'visits',
        categoryXField: 'country',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{categoryX}: {valueY}'
        })
      })
    );

    series.columns.template.setAll({
      fillOpacity: 0.7,
      strokeOpacity: 0.2
    });

    series.columns.template.adapters.add('fill', (fill, target) => {
      const dataItem = target.dataItem;
      if (dataItem) {
        const dataContext = dataItem.dataContext as { color: am5.Color };
        return dataContext.color;
      }
      return fill;
    });

    series.columns.template.adapters.add('stroke', (stroke, target) => {
      const dataItem = target.dataItem;
      if (dataItem) {
        const dataContext = dataItem.dataContext as { color: am5.Color };
        return dataContext.color;
      }
      return stroke;
    });

    series.data.setAll(data);
    series.appear(1000);
    chart.appear(1000, 100);
  }

  private createAreaChart(): void {
    const root = am5.Root.new(this.areaChartDiv.nativeElement);
    this.roots.push(root);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX'
      })
    );

    const data = [
      { date: new Date(2012, 0, 1).getTime(), duration: 408, lineColor: am5.color(this.layoutColors.info) },
      { date: new Date(2012, 0, 2).getTime(), duration: 482, lineColor: am5.color(this.layoutColors.info) },
      { date: new Date(2012, 0, 3).getTime(), duration: 562, lineColor: am5.color(this.layoutColors.info) },
      { date: new Date(2012, 0, 4).getTime(), duration: 379, lineColor: am5.color(this.layoutColors.info) },
      { date: new Date(2012, 0, 5).getTime(), duration: 501, lineColor: am5.color(this.layoutColors.warning) },
      { date: new Date(2012, 0, 6).getTime(), duration: 443, lineColor: am5.color(this.layoutColors.warning) },
      { date: new Date(2012, 0, 7).getTime(), duration: 405, lineColor: am5.color(this.layoutColors.warning) },
      { date: new Date(2012, 0, 8).getTime(), duration: 309, lineColor: am5.color(this.layoutColors.danger) },
      { date: new Date(2012, 0, 9).getTime(), duration: 287, lineColor: am5.color(this.layoutColors.danger) },
      { date: new Date(2012, 0, 10).getTime(), duration: 485, lineColor: am5.color(this.layoutColors.danger) },
      { date: new Date(2012, 0, 11).getTime(), duration: 890, lineColor: am5.color(this.layoutColors.danger) },
      { date: new Date(2012, 0, 12).getTime(), duration: 810, lineColor: am5.color(this.layoutColors.danger) }
    ];

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'day', count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Duration',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'duration',
        valueXField: 'date',
        fill: am5.color(this.layoutColors.info),
        stroke: am5.color(this.layoutColors.info),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY} min'
        })
      })
    );

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.5
    });

    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Rectangle.new(root, {
          width: 8,
          height: 8,
          fill: series.get('fill'),
          centerX: am5.p50,
          centerY: am5.p50
        })
      });
    });

    series.data.setAll(data);

    chart.set('cursor', am5xy.XYCursor.new(root, {
      behavior: 'zoomX'
    }));

    series.appear(1000);
    chart.appear(1000, 100);
  }

  private createLineChart(): void {
    const root = am5.Root.new(this.lineChartDiv.nativeElement);
    this.roots.push(root);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX'
      })
    );

    const data = [
      { year: '1990', value: -0.17 },
      { year: '1991', value: -0.254 },
      { year: '1992', value: 0.019 },
      { year: '1993', value: -0.063 },
      { year: '1994', value: 0.005 },
      { year: '1995', value: 0.077 },
      { year: '1996', value: 0.12 },
      { year: '1997', value: 0.011 },
      { year: '1998', value: 0.177 },
      { year: '1999', value: -0.021 },
      { year: '2000', value: -0.037 },
      { year: '2001', value: 0.03 },
      { year: '2002', value: 0.179 },
      { year: '2003', value: 0.2 },
      { year: '2004', value: 0.180 },
      { year: '2005', value: 0.21 }
    ];

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'year',
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        }),
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    xAxis.data.setAll(data);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'Value',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'year',
        stroke: am5.color(this.layoutColors.danger),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}'
        })
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 1
    });

    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: am5.color(this.layoutColors.danger),
          stroke: root.interfaceColors.get('background'),
          strokeWidth: 2
        })
      });
    });

    series.data.setAll(data);

    const scrollbar = chart.set('scrollbarX', am5xy.XYChartScrollbar.new(root, {
      orientation: 'horizontal',
      height: 50
    }));

    const sbxAxis = scrollbar.chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'year',
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          opposite: false
        })
      })
    );
    sbxAxis.data.setAll(data);

    const sbyAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    const sbSeries = scrollbar.chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: sbxAxis,
        yAxis: sbyAxis,
        valueYField: 'value',
        categoryXField: 'year'
      })
    );
    sbSeries.data.setAll(data);

    chart.set('cursor', am5xy.XYCursor.new(root, {
      behavior: 'zoomX'
    }));

    series.appear(1000);
    chart.appear(1000, 100);
  }

  private createPieChart(): void {
    const root = am5.Root.new(this.pieChartDiv.nativeElement);
    this.roots.push(root);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        innerRadius: am5.percent(40),
        layout: root.verticalLayout
      })
    );

    const data = [
      { country: 'Lithuania', litres: 501.9 },
      { country: 'Czech Republic', litres: 301.9 },
      { country: 'Ireland', litres: 201.1 },
      { country: 'Germany', litres: 165.8 },
      { country: 'Australia', litres: 139.9 },
      { country: 'Austria', litres: 128.3 },
      { country: 'UK', litres: 99 },
      { country: 'Belgium', litres: 60 }
    ];

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Litres',
        valueField: 'litres',
        categoryField: 'country',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{category}: {value}'
        })
      })
    );

    series.slices.template.setAll({
      fillOpacity: 0.8
    });

    series.set('colors', am5.ColorSet.new(root, {
      colors: [
        am5.color(this.layoutColors.primary),
        am5.color(this.layoutColors.danger),
        am5.color(this.layoutColors.warning),
        am5.color(this.layoutColors.success),
        am5.color(this.layoutColors.info),
        am5.color(this.layoutColors.primaryDark),
        am5.color(this.layoutColors.warningLight),
        am5.color(this.layoutColors.successDark)
      ]
    }));

    series.data.setAll(data);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        layout: am5.GridLayout.new(root, {
          maxColumns: 4,
          fixedWidthGrid: true
        })
      })
    );
    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);
  }

  private createFunnelChart(): void {
    const root = am5.Root.new(this.funnelChartDiv.nativeElement);
    this.roots.push(root);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {})
    );

    const data = [
      { title: 'Website visits', value: 300 },
      { title: 'Downloads', value: 123 },
      { title: 'Requested prices', value: 98 },
      { title: 'Contacted', value: 72 },
      { title: 'Purchased', value: 35 },
      { title: 'Asked for support', value: 25 },
      { title: 'Purchased more', value: 18 }
    ];

    const series = chart.series.push(
      am5percent.PyramidSeries.new(root, {
        name: 'Funnel',
        valueField: 'value',
        categoryField: 'title',
        orientation: 'vertical',
        alignLabels: true,
        tooltip: am5.Tooltip.new(root, {
          labelText: '{category}: {value}'
        })
      })
    );

    series.slices.template.setAll({
      fillOpacity: 0.9,
      strokeWidth: 1,
      stroke: am5.color('#ffffff')
    });

    series.labels.template.setAll({
      fontSize: 11,
      text: '{category}',
      fill: am5.color(this.layoutColors.defaultText)
    });

    series.set('colors', am5.ColorSet.new(root, {
      colors: [
        am5.color(this.layoutColors.primary),
        am5.color(this.layoutColors.danger),
        am5.color(this.layoutColors.warning),
        am5.color(this.layoutColors.success),
        am5.color(this.layoutColors.info),
        am5.color(this.layoutColors.primaryDark),
        am5.color(this.layoutColors.warningLight)
      ]
    }));

    series.data.setAll(data);
    series.appear(1000, 100);
  }

  private createCombinedChart(): void {
    const root = am5.Root.new(this.combinedChartDiv.nativeElement);
    this.roots.push(root);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout
      })
    );

    const data = [
      { date: new Date(2013, 0, 16).getTime(), market1: 71, market2: 75, sales1: 5, sales2: 8 },
      { date: new Date(2013, 0, 17).getTime(), market1: 74, market2: 78, sales1: 4, sales2: 6 },
      { date: new Date(2013, 0, 18).getTime(), market1: 78, market2: 88, sales1: 5, sales2: 2 },
      { date: new Date(2013, 0, 19).getTime(), market1: 85, market2: 89, sales1: 8, sales2: 9 },
      { date: new Date(2013, 0, 20).getTime(), market1: 82, market2: 89, sales1: 9, sales2: 6 },
      { date: new Date(2013, 0, 21).getTime(), market1: 83, market2: 85, sales1: 3, sales2: 5 },
      { date: new Date(2013, 0, 22).getTime(), market1: 88, market2: 92, sales1: 5, sales2: 7 },
      { date: new Date(2013, 0, 23).getTime(), market1: 85, market2: 90, sales1: 7, sales2: 6 },
      { date: new Date(2013, 0, 24).getTime(), market1: 85, market2: 91, sales1: 9, sales2: 5 },
      { date: new Date(2013, 0, 25).getTime(), market1: 80, market2: 84, sales1: 5, sales2: 8 },
      { date: new Date(2013, 0, 26).getTime(), market1: 87, market2: 92, sales1: 4, sales2: 8 },
      { date: new Date(2013, 0, 27).getTime(), market1: 84, market2: 87, sales1: 3, sales2: 4 },
      { date: new Date(2013, 0, 28).getTime(), market1: 83, market2: 88, sales1: 5, sales2: 7 },
      { date: new Date(2013, 0, 29).getTime(), market1: 84, market2: 87, sales1: 5, sales2: 8 },
      { date: new Date(2013, 0, 30).getTime(), market1: 81, market2: 85, sales1: 4, sales2: 7 }
    ];

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'day', count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50
        }),
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    const yAxis1 = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );
    yAxis1.children.unshift(
      am5.Label.new(root, {
        text: 'Sales ($M)',
        rotation: -90,
        y: am5.p50,
        centerX: am5.p50
      })
    );

    const yAxis2 = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          opposite: true
        })
      })
    );
    yAxis2.children.push(
      am5.Label.new(root, {
        text: 'Market Days',
        rotation: 90,
        y: am5.p50,
        centerX: am5.p50
      })
    );

    const series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Actual Sales',
        xAxis: xAxis,
        yAxis: yAxis1,
        valueYField: 'sales2',
        valueXField: 'date',
        fill: am5.color(this.layoutColors.primaryLight),
        stroke: am5.color(this.layoutColors.primaryLight),
        clustered: false,
        tooltip: am5.Tooltip.new(root, {
          labelText: 'Actual Sales: ${valueY}M'
        })
      })
    );
    series1.columns.template.setAll({
      width: am5.percent(50),
      fillOpacity: 0.8
    });
    series1.data.setAll(data);

    const series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Target Sales',
        xAxis: xAxis,
        yAxis: yAxis1,
        valueYField: 'sales1',
        valueXField: 'date',
        fill: am5.color(this.layoutColors.primary),
        stroke: am5.color(this.layoutColors.primary),
        clustered: false,
        tooltip: am5.Tooltip.new(root, {
          labelText: 'Target Sales: ${valueY}M'
        })
      })
    );
    series2.columns.template.setAll({
      width: am5.percent(30),
      fillOpacity: 0.9
    });
    series2.data.setAll(data);

    const series3 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'Market Days',
        xAxis: xAxis,
        yAxis: yAxis2,
        valueYField: 'market1',
        valueXField: 'date',
        stroke: am5.color(this.layoutColors.danger),
        tooltip: am5.Tooltip.new(root, {
          labelText: 'Market Days: {valueY}'
        })
      })
    );
    series3.strokes.template.setAll({
      strokeWidth: 2
    });
    series3.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 3,
          fill: am5.color(this.layoutColors.danger)
        })
      });
    });
    series3.data.setAll(data);

    const series4 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'Market Days ALL',
        xAxis: xAxis,
        yAxis: yAxis2,
        valueYField: 'market2',
        valueXField: 'date',
        stroke: am5.color(this.layoutColors.warning),
        tooltip: am5.Tooltip.new(root, {
          labelText: 'Market Days ALL: {valueY}'
        })
      })
    );
    series4.strokes.template.setAll({
      strokeWidth: 2,
      strokeDasharray: [5, 5]
    });
    series4.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 3,
          fill: am5.color(this.layoutColors.warning)
        })
      });
    });
    series4.data.setAll(data);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50)
      })
    );
    legend.data.setAll(chart.series.values);

    const scrollbar = chart.set('scrollbarX', am5xy.XYChartScrollbar.new(root, {
      orientation: 'horizontal',
      height: 50
    }));

    const sbxAxis = scrollbar.chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'day', count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          opposite: false
        })
      })
    );

    const sbyAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    const sbSeries = scrollbar.chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: sbxAxis,
        yAxis: sbyAxis,
        valueYField: 'market1',
        valueXField: 'date'
      })
    );
    sbSeries.data.setAll(data);

    chart.set('cursor', am5xy.XYCursor.new(root, {
      behavior: 'zoomX'
    }));

    chart.appear(1000, 100);
  }
}
