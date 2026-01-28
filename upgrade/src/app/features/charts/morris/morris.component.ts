import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BaPanelComponent } from '../../../shared/components/ba-panel';
import { ThemeConfigService } from '../../../core/services/theme-config.service';

interface MorrisGridPrototype {
  gridDefaults?: {
    gridLineColor?: string;
    gridTextColor?: string;
  };
}

interface MorrisDonutPrototype {
  defaults?: {
    backgroundColor?: string;
    labelColor?: string;
  };
}

interface MorrisConstructor {
  new (options: MorrisLineOptions | MorrisDonutOptions | MorrisBarOptions | MorrisAreaOptions): MorrisChart;
  prototype: MorrisGridPrototype | MorrisDonutPrototype;
}

declare const Morris: {
  Line: MorrisConstructor;
  Donut: MorrisConstructor & { prototype: MorrisDonutPrototype };
  Bar: MorrisConstructor;
  Area: MorrisConstructor;
  Grid: { prototype: MorrisGridPrototype };
};

interface MorrisChart {
  redraw: () => void;
}

interface MorrisLineOptions {
  element: HTMLElement;
  data: Record<string, string | number>[];
  xkey: string;
  ykeys: string[];
  labels: string[];
  lineColors: string[];
  resize: boolean;
}

interface MorrisDonutOptions {
  element: HTMLElement;
  data: { label: string; value: number }[];
  colors: string[];
  formatter?: (value: number) => string;
  backgroundColor?: string;
  labelColor?: string;
  resize: boolean;
}

interface MorrisBarOptions {
  element: HTMLElement;
  data: Record<string, string | number>[];
  xkey: string;
  ykeys: string[];
  labels: string[];
  barColors: string[];
  resize: boolean;
}

interface MorrisAreaOptions {
  element: HTMLElement;
  data: Record<string, string | number>[];
  xkey: string;
  ykeys: string[];
  labels: string[];
  lineColors: string[];
  resize: boolean;
}

@Component({
  selector: 'app-morris',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  templateUrl: './morris.component.html',
  styleUrl: './morris.component.scss'
})
export class MorrisComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLDivElement>;
  @ViewChild('donutChart') donutChartRef!: ElementRef<HTMLDivElement>;
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLDivElement>;
  @ViewChild('areaChart') areaChartRef!: ElementRef<HTMLDivElement>;

  private themeConfig = inject(ThemeConfigService);
  private platformId = inject(PLATFORM_ID);
  private charts: MorrisChart[] = [];
  private resizeHandler: (() => void) | null = null;

  colors: string[] = [];

  lineData = [
    { y: '2006', a: 100, b: 90 },
    { y: '2007', a: 75, b: 65 },
    { y: '2008', a: 50, b: 40 },
    { y: '2009', a: 75, b: 65 },
    { y: '2010', a: 50, b: 40 },
    { y: '2011', a: 75, b: 65 },
    { y: '2012', a: 100, b: 90 }
  ];

  areaData = [
    { y: '2006', a: 100, b: 90 },
    { y: '2007', a: 75, b: 65 },
    { y: '2008', a: 50, b: 40 },
    { y: '2009', a: 75, b: 65 },
    { y: '2010', a: 50, b: 40 },
    { y: '2011', a: 75, b: 65 },
    { y: '2012', a: 100, b: 90 }
  ];

  barData = [
    { y: '2006', a: 100, b: 90 },
    { y: '2007', a: 75, b: 65 },
    { y: '2008', a: 50, b: 40 },
    { y: '2009', a: 75, b: 65 },
    { y: '2010', a: 50, b: 40 },
    { y: '2011', a: 75, b: 65 },
    { y: '2012', a: 100, b: 90 }
  ];

  donutData = [
    { label: 'Download Sales', value: 12 },
    { label: 'In-Store Sales', value: 30 },
    { label: 'Mail-Order Sales', value: 20 }
  ];

  ngOnInit(): void {
    this.colors = this.themeConfig.getChartColors();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeCharts();
      this.setupResizeHandler();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeHandler && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  private initializeCharts(): void {
    const themeColors = this.themeConfig.getColors();

    if (typeof Morris === 'undefined') {
      console.warn('Morris.js is not loaded. Charts will not be rendered.');
      return;
    }

    Morris.Donut.prototype.defaults = Morris.Donut.prototype.defaults || {};
    Morris.Donut.prototype.defaults.backgroundColor = 'transparent';
    Morris.Donut.prototype.defaults.labelColor = themeColors.defaultText;

    Morris.Grid.prototype = Morris.Grid.prototype || {};
    Morris.Grid.prototype.gridDefaults = Morris.Grid.prototype.gridDefaults || {};
    Morris.Grid.prototype.gridDefaults.gridLineColor = themeColors.borderDark;
    Morris.Grid.prototype.gridDefaults.gridTextColor = themeColors.defaultText;

    this.createLineChart();
    this.createDonutChart();
    this.createBarChart();
    this.createAreaChart();
  }

  private createLineChart(): void {
    if (this.lineChartRef?.nativeElement) {
      const chart = new Morris.Line({
        element: this.lineChartRef.nativeElement,
        data: this.lineData,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Serie A', 'Serie B'],
        lineColors: this.colors,
        resize: true
      });
      this.charts.push(chart);
    }
  }

  private createDonutChart(): void {
    if (this.donutChartRef?.nativeElement) {
      const chart = new Morris.Donut({
        element: this.donutChartRef.nativeElement,
        data: this.donutData,
        colors: this.colors,
        formatter: (value: number) => '$' + value,
        resize: true
      });
      this.charts.push(chart);
    }
  }

  private createBarChart(): void {
    if (this.barChartRef?.nativeElement) {
      const chart = new Morris.Bar({
        element: this.barChartRef.nativeElement,
        data: this.barData,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        barColors: this.colors,
        resize: true
      });
      this.charts.push(chart);
    }
  }

  private createAreaChart(): void {
    if (this.areaChartRef?.nativeElement) {
      const chart = new Morris.Area({
        element: this.areaChartRef.nativeElement,
        data: this.areaData,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Serie A', 'Serie B'],
        lineColors: this.colors,
        resize: true
      });
      this.charts.push(chart);
    }
  }

  private setupResizeHandler(): void {
    this.resizeHandler = () => {
      this.charts.forEach(chart => {
        if (chart && typeof chart.redraw === 'function') {
          chart.redraw();
        }
      });
    };
    window.addEventListener('resize', this.resizeHandler);
  }
}
