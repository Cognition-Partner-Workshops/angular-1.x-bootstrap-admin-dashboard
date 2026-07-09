import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';

Chart.register(...registerables);

/**
 * Modern standalone port of the legacy AngularJS `dashboardLineChart`
 * ("Revenue") widget.
 *
 * The legacy widget rendered an amCharts v3 serial chart with two smoothed
 * area series (`value` and `value0`) over a monthly date axis. This port uses
 * ng2-charts + chart.js with two smoothed (tension 0.4), lightly filled line
 * datasets over the same monthly labels.
 */

// Legacy baConfig.colors palette.
const PRIMARY = '#209e91';
const SURFIE_GREEN = '#0e8174';

interface RevenuePoint {
  date: Date;
  value: number;
  value0: number;
}

// Exact sample data ported from the legacy DashboardLineChartCtrl.
const CHART_DATA: RevenuePoint[] = [
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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatLabel(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${String(date.getFullYear()).slice(-2)}`;
}

@Component({
  selector: 'app-dashboard-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './dashboard-line-chart.component.html',
  styleUrl: './dashboard-line-chart.component.scss',
})
export class DashboardLineChartComponent {
  readonly labels: string[] = CHART_DATA.map((p) => formatLabel(p.date));

  readonly data: ChartData<'line'> = {
    labels: this.labels,
    datasets: [
      {
        label: 'Revenue',
        data: CHART_DATA.map((p) => p.value),
        borderColor: PRIMARY,
        backgroundColor: hexToRgba(PRIMARY, 0.3),
        pointBackgroundColor: PRIMARY,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 1,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Forecast',
        data: CHART_DATA.map((p) => p.value0),
        borderColor: SURFIE_GREEN,
        backgroundColor: hexToRgba(SURFIE_GREEN, 0.3),
        pointBackgroundColor: SURFIE_GREEN,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 1,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  readonly options: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        labels: { color: '#666666' },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#666666', maxRotation: 0, autoSkip: true },
      },
      y: {
        grid: { color: '#dddddd' },
        ticks: {
          color: '#666666',
          callback: (value) => Number(value).toLocaleString(),
        },
      },
    },
  };
}
