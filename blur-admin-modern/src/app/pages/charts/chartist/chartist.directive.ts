import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { BarChart, LineChart, PieChart } from 'chartist';

type ChartistType = 'line' | 'bar' | 'pie';

@Directive({ selector: '[baChartist]', standalone: true })
export class ChartistDirective implements AfterViewInit, OnDestroy {
  @Input() chartistType: ChartistType = 'line';
  @Input() chartistData: unknown;
  @Input() chartistOptions: unknown;
  @Input() chartistResponsive: unknown;
  private chart?: { detach(): void };
  constructor(private readonly element: ElementRef<HTMLElement>) {}
  ngAfterViewInit(): void {
    const host = this.element.nativeElement;
    const Chart = this.chartistType === 'bar' ? BarChart : this.chartistType === 'pie' ? PieChart : LineChart;
    const ChartConstructor = Chart as unknown as new (
      query: HTMLElement,
      data: unknown,
      options: unknown,
      responsiveOptions?: unknown
    ) => { detach(): void };
    this.chart = new ChartConstructor(
      host,
      this.chartistData as never,
      (this.chartistOptions ?? {}) as never,
      this.chartistResponsive as never
    );
  }
  ngOnDestroy(): void { this.chart?.detach(); }
}
