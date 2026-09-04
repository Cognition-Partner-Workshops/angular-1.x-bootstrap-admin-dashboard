import { Component, inject } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaConfigService, BaPanelComponent, BaUtilService } from '../../../theme';

type MorrisRow = { y: string; a: number; b: number };

@Component({
  selector: 'app-morris', standalone: true, imports: [BaPanelComponent, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())], templateUrl: './morris.component.html',
})
export class MorrisComponent {
  private readonly config = inject(BaConfigService);
  private readonly util = inject(BaUtilService);
  readonly colors = [this.config.colors.primary, this.config.colors.warning, this.config.colors.danger, this.config.colors.info, this.config.colors.success, this.config.colors.primaryDark];
  readonly lineData: MorrisRow[] = this.rows();
  readonly areaData: MorrisRow[] = this.rows();
  readonly barData: MorrisRow[] = this.rows();
  readonly donutData = [{ label: 'Download Sales', value: 12 }, { label: 'In-Store Sales', value: 30 }, { label: 'Mail-Order Sales', value: 20 }];
  readonly lineChartData: ChartData<'line'> = { labels: this.lineData.map((r) => r.y), datasets: [{ label: 'Serie A', data: this.lineData.map((r) => r.a), borderColor: this.colors[0], fill: false }, { label: 'Serie B', data: this.lineData.map((r) => r.b), borderColor: this.colors[1], fill: false }] };
  readonly areaChartData: ChartData<'line'> = { labels: this.areaData.map((r) => r.y), datasets: [{ label: 'Serie A', data: this.areaData.map((r) => r.a), borderColor: this.colors[0], backgroundColor: this.util.hexToRGB(this.colors[0], 0.5), fill: true }, { label: 'Serie B', data: this.areaData.map((r) => r.b), borderColor: this.colors[1], backgroundColor: this.util.hexToRGB(this.colors[1], 0.5), fill: true }] };
  readonly barChartData: ChartData<'bar'> = { labels: this.barData.map((r) => r.y), datasets: [{ label: 'Series A', data: this.barData.map((r) => r.a), backgroundColor: this.colors[0] }, { label: 'Series B', data: this.barData.map((r) => r.b), backgroundColor: this.colors[1] }] };
  readonly donutChartData: ChartData<'doughnut'> = { labels: this.donutData.map((r) => r.label), datasets: [{ data: this.donutData.map((r) => r.value), backgroundColor: this.colors.slice(0, 3) }] };
  readonly cartesianOptions = { responsive: true, maintainAspectRatio: false, scales: { x: { ticks: { color: this.config.colors.defaultText } }, y: { grid: { color: this.config.colors.borderDark }, ticks: { color: this.config.colors.defaultText } } } };
  readonly donutOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' as const, labels: { color: this.config.colors.defaultText } }, tooltip: { callbacks: { label: (ctx: { parsed: number }) => `$${ctx.parsed}` } } } };
  readonly lineType: ChartType = 'line';
  readonly donutType: ChartType = 'doughnut';
  private rows(): MorrisRow[] { return [{ y: '2006', a: 100, b: 90 }, { y: '2007', a: 75, b: 65 }, { y: '2008', a: 50, b: 40 }, { y: '2009', a: 75, b: 65 }, { y: '2010', a: 50, b: 40 }, { y: '2011', a: 75, b: 65 }, { y: '2012', a: 100, b: 90 }]; }
}
