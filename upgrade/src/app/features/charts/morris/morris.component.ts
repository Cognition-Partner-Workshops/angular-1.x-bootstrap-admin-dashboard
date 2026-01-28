import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BaPanelComponent } from '../../../shared/components/ba-panel';
import { ThemeConfigService } from '../../../core/services/theme-config.service';

interface MorrisChart {
  redraw: () => void;
}

interface MorrisStatic {
  Line: new (options: MorrisLineOptions) => MorrisChart;
  Donut: new (options: MorrisDonutOptions) => MorrisChart;
  Bar: new (options: MorrisBarOptions) => MorrisChart;
  Area: new (options: MorrisAreaOptions) => MorrisChart;
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

declare global {
  interface Window {
    Morris: MorrisStatic;
    jQuery: unknown;
    Raphael: unknown;
  }
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
  private scriptsLoaded = false;

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
      this.loadScriptsAndInitialize();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeHandler && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  private loadScriptsAndInitialize(): void {
    if (window.Morris && window.Morris.Line) {
      this.initializeCharts();
      this.setupResizeHandler();
      return;
    }

    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js')
      .then(() => this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/raphael/2.3.0/raphael.min.js'))
      .then(() => this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js'))
      .then(() => this.loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css'))
      .then(() => {
        this.scriptsLoaded = true;
        this.initializeCharts();
        this.setupResizeHandler();
      })
      .catch((error) => {
        console.error('Failed to load Morris.js dependencies:', error);
      });
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  private loadStylesheet(href: string): Promise<void> {
    return new Promise((resolve) => {
      const existingLink = document.querySelector(`link[href="${href}"]`);
      if (existingLink) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve();
      document.head.appendChild(link);
    });
  }

  private initializeCharts(): void {
    if (!window.Morris || !window.Morris.Line) {
      console.warn('Morris.js is not loaded. Charts will not be rendered.');
      return;
    }

    this.createLineChart();
    this.createDonutChart();
    this.createBarChart();
    this.createAreaChart();
  }

  private createLineChart(): void {
    if (this.lineChartRef?.nativeElement) {
      const chart = new window.Morris.Line({
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
      const chart = new window.Morris.Donut({
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
      const chart = new window.Morris.Bar({
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
      const chart = new window.Morris.Area({
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
