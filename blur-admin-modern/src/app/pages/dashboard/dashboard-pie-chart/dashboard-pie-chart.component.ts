import { DecimalPipe } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation, inject, signal } from '@angular/core';
import { BaConfigService, BaPanelComponent, BaUtilService } from '../../../theme';

export interface DashboardKpiChart {
  color: string;
  description: string;
  stats: string;
  icon: string;
  percent: number;
}

const SIZE = 84;
const LINE_WIDTH = 9;
const ANIMATION_MS = 2000;

export const easeOutBounce = (t: number): number => {
  if (t < 1 / 2.75) return 7.5625 * t * t;
  if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
  if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
  return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
};

@Component({
  selector: 'dashboard-pie-chart',
  standalone: true,
  imports: [BaPanelComponent, DecimalPipe],
  templateUrl: './dashboard-pie-chart.component.html',
  styleUrl: './dashboard-pie-chart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardPieChartComponent implements OnInit, OnDestroy {
  private readonly config = inject(BaConfigService);
  private readonly util = inject(BaUtilService);

  readonly size = SIZE;
  readonly lineWidth = LINE_WIDTH;
  readonly radius = (SIZE - LINE_WIDTH) / 2;
  readonly circumference = 2 * Math.PI * this.radius;

  readonly charts: DashboardKpiChart[];
  readonly displayed = signal<number[]>([60, 60, 60, 60]);

  private timer?: ReturnType<typeof setTimeout>;
  private frame?: number;

  constructor() {
    const pieColor = this.util.hexToRGB(this.config.colors.defaultText, 0.2);
    this.charts = [
      { color: pieColor, description: 'New Visits', stats: '57,820', icon: 'person', percent: 60 },
      { color: pieColor, description: 'Purchases', stats: '$ 89,745', icon: 'money', percent: 60 },
      { color: pieColor, description: 'Active Users', stats: '178,391', icon: 'face', percent: 60 },
      { color: pieColor, description: 'Returned', stats: '32,592', icon: 'refresh', percent: 60 },
    ];
  }

  ngOnInit(): void {
    this.timer = setTimeout(() => this.updatePieCharts(), 1000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: EventTarget | null): void {
    if (target instanceof Element && target.closest('.refresh-data')) this.updatePieCharts();
  }

  dashOffset(percent: number): number {
    return this.circumference * (1 - percent / 100);
  }

  updatePieCharts(): void {
    this.charts.forEach((chart) => (chart.percent = this.getRandomArbitrary(55, 90)));
    this.animateTo(this.charts.map((c) => c.percent));
  }

  private animateTo(targets: number[]): void {
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
    const from = this.displayed();
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ANIMATION_MS);
      const eased = easeOutBounce(t);
      this.displayed.set(targets.map((to, i) => from[i] + (to - from[i]) * eased));
      if (t < 1) this.frame = requestAnimationFrame(step);
      else this.frame = undefined;
    };
    this.frame = requestAnimationFrame(step);
  }

  private getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
