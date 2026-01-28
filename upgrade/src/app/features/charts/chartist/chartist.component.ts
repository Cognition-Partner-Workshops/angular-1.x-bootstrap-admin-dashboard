import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../shared/components/ba-panel';
import {
  LineChart,
  BarChart,
  PieChart,
  LineChartData,
  LineChartOptions,
  BarChartData,
  BarChartOptions,
  PieChartData,
  PieChartOptions,
  ResponsiveOptions,
  noop
} from 'chartist';

interface ChartInstance {
  detach(): void;
}

@Component({
  selector: 'app-chartist',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  templateUrl: './chartist.component.html',
  styleUrl: './chartist.component.scss'
})
export class ChartistComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lineChart') lineChartEl!: ElementRef;
  @ViewChild('areaChart') areaChartEl!: ElementRef;
  @ViewChild('biChart') biChartEl!: ElementRef;
  @ViewChild('simpleBar') simpleBarEl!: ElementRef;
  @ViewChild('multiBar') multiBarEl!: ElementRef;
  @ViewChild('stackedBar') stackedBarEl!: ElementRef;
  @ViewChild('simplePie') simplePieEl!: ElementRef;
  @ViewChild('labelPie') labelPieEl!: ElementRef;
  @ViewChild('donut') donutEl!: ElementRef;

  private charts: ChartInstance[] = [];

  private simpleLineData: LineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [
      [20, 20, 12, 45, 50],
      [10, 45, 30, 14, 12],
      [34, 12, 12, 40, 50],
      [10, 43, 25, 22, 16],
      [3, 6, 30, 33, 43]
    ]
  };

  private simpleLineOptions: LineChartOptions = {
    fullWidth: true,
    height: '300px',
    chartPadding: {
      right: 40,
      top: 0,
      bottom: 0,
      left: 0
    }
  };

  private areaLineData: LineChartData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [
      [5, 9, 7, 8, 5, 3, 5, 4]
    ]
  };

  private areaLineOptions: LineChartOptions = {
    fullWidth: true,
    height: '300px',
    low: 0,
    showArea: true
  };

  private biLineData: LineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      [1, 2, 3, 1, -2, 0, 1],
      [-2, -1, -2, -1, -2.5, -1, -2],
      [0, 0, 0, 1, 2, 2.5, 2],
      [2.5, 2, 1, 0.5, 1, 0.5, -1]
    ]
  };

  private biLineOptions: LineChartOptions = {
    height: '300px',
    high: 3,
    low: -3,
    showArea: true,
    showLine: false,
    showPoint: false,
    fullWidth: true,
    axisX: {
      showGrid: false
    }
  };

  private simpleBarData: BarChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      [15, 24, 43, 27, 5, 10, 23, 44, 68, 50, 26, 8],
      [13, 22, 49, 22, 4, 6, 24, 46, 57, 48, 22, 4]
    ]
  };

  private simpleBarOptions: BarChartOptions = {
    height: '300px'
  };

  private multiBarData: BarChartData = {
    labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
    series: [
      [5, 4, 3, 7],
      [3, 2, 9, 5],
      [1, 5, 8, 4],
      [2, 3, 4, 6],
      [4, 1, 2, 1]
    ]
  };

  private multiBarOptions: BarChartOptions = {
    height: '300px',
    stackBars: true,
    axisX: {
      labelInterpolationFnc: (value: string | number) => {
        return String(value).split(/\s+/).map((word: string) => word[0]).join('');
      }
    },
    axisY: {
      offset: 20
    }
  };

  private multiBarResponsive: ResponsiveOptions<BarChartOptions> = [
    ['screen and (min-width: 400px)', {
      reverseData: true,
      horizontalBars: true,
      axisX: {
        labelInterpolationFnc: noop
      },
      axisY: {
        offset: 60
      }
    }],
    ['screen and (min-width: 700px)', {
      stackBars: false,
      reverseData: false,
      horizontalBars: false,
      seriesBarDistance: 15
    }]
  ];

  private stackedBarData: BarChartData = {
    labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
    series: [
      [800000, 1200000, 1400000, 1300000],
      [200000, 400000, 500000, 300000],
      [100000, 200000, 400000, 600000]
    ]
  };

  private stackedBarOptions: BarChartOptions = {
    height: '300px',
    stackBars: true,
    axisY: {
      labelInterpolationFnc: (value: string | number) => {
        return (Number(value) / 1000) + 'k';
      }
    }
  };

  private simplePieData: PieChartData = {
    series: [5, 3, 4]
  };

  private simplePieOptions: PieChartOptions = {
    height: '300px',
    labelInterpolationFnc: (value: string | number) => {
      return Math.round(Number(value) / 12 * 100) + '%';
    }
  };

  private labelsPieData: PieChartData = {
    labels: ['Bananas', 'Apples', 'Grapes'],
    series: [20, 15, 40]
  };

  private labelsPieOptions: PieChartOptions = {
    height: '300px',
    labelDirection: 'explode',
    labelInterpolationFnc: (value: string | number) => {
      return String(value)[0];
    }
  };

  private simpleDonutData: PieChartData = {
    labels: ['Bananas', 'Apples', 'Grapes'],
    series: [20, 15, 40]
  };

  private simpleDonutOptions: PieChartOptions = {
    donut: true,
    height: '300px',
    labelDirection: 'explode',
    labelInterpolationFnc: (value: string | number) => {
      return String(value)[0];
    }
  };

  private getResponsive(padding: number, offset: number): ResponsiveOptions<PieChartOptions> {
    return [
      ['screen and (min-width: 1550px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: (value: string | number) => String(value)
      }],
      ['screen and (max-width: 1200px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: (value: string | number) => String(value)
      }],
      ['screen and (max-width: 600px)', {
        chartPadding: 0,
        labelOffset: 0,
        labelInterpolationFnc: (value: string | number) => String(value)[0]
      }]
    ];
  }

  ngAfterViewInit(): void {
    this.initCharts();
  }

  ngOnDestroy(): void {
    this.charts.forEach(chart => {
      if (chart && typeof chart.detach === 'function') {
        chart.detach();
      }
    });
  }

  private initCharts(): void {
    const lineChart = new LineChart(
      this.lineChartEl.nativeElement,
      this.simpleLineData,
      this.simpleLineOptions
    );
    this.charts.push(lineChart);

    const areaChart = new LineChart(
      this.areaChartEl.nativeElement,
      this.areaLineData,
      this.areaLineOptions
    );
    this.charts.push(areaChart);

    const biChart = new LineChart(
      this.biChartEl.nativeElement,
      this.biLineData,
      this.biLineOptions
    );
    this.charts.push(biChart);

    const simpleBar = new BarChart(
      this.simpleBarEl.nativeElement,
      this.simpleBarData,
      this.simpleBarOptions
    );
    this.charts.push(simpleBar);

    const multiBar = new BarChart(
      this.multiBarEl.nativeElement,
      this.multiBarData,
      this.multiBarOptions,
      this.multiBarResponsive
    );
    this.charts.push(multiBar);

    const stackedBar = new BarChart(
      this.stackedBarEl.nativeElement,
      this.stackedBarData,
      this.stackedBarOptions
    );
    this.charts.push(stackedBar);

    const simplePie = new PieChart(
      this.simplePieEl.nativeElement,
      this.simplePieData,
      this.simplePieOptions,
      this.getResponsive(20, 80)
    );
    this.charts.push(simplePie);

    const labelPie = new PieChart(
      this.labelPieEl.nativeElement,
      this.labelsPieData,
      this.labelsPieOptions
    );
    this.charts.push(labelPie);

    const donut = new PieChart(
      this.donutEl.nativeElement,
      this.simpleDonutData,
      this.simpleDonutOptions,
      this.getResponsive(5, 40)
    );
    this.charts.push(donut);
  }
}
