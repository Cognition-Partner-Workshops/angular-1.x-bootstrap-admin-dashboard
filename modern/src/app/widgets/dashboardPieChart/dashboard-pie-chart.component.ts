import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { BaPanelComponent } from '../../shared/ba-panel/ba-panel.component';

/**
 * Modern standalone port of the legacy AngularJS `dashboardPieChart` widget.
 *
 * Renders a responsive row of four small stat cards, each with an animated
 * circular progress ring (~60%), an icon accent, a description and a stat value.
 * The legacy widget used the jQuery `easyPieChart` plugin; here the ring is an
 * SVG arc animated on load while the centre percentage counts up.
 */
interface PieChartItem {
  description: string;
  stats: string;
  icon: 'person' | 'money' | 'face' | 'refresh';
  /** Target percentage the ring animates to (~60, as in the legacy widget). */
  target: number;
}

@Component({
  selector: 'app-dashboard-pie-chart',
  standalone: true,
  imports: [BaPanelComponent],
  templateUrl: './dashboard-pie-chart.component.html',
  styleUrl: './dashboard-pie-chart.component.scss'
})
export class DashboardPieChartComponent implements OnInit, OnDestroy {
  /** Radius of the ring circle (matches legacy size 84px, lineWidth 9). */
  readonly radius = 37.5;
  readonly circumference = 2 * Math.PI * this.radius;

  /** Translucent defaultText tint used by the legacy ring (rgba(102,102,102,0.2)). */
  readonly ringColor = 'rgba(102, 102, 102, 0.2)';

  /** Exact sample data carried over from the legacy DashboardPieChartCtrl. */
  readonly charts: PieChartItem[] = [
    { description: 'New Visits', stats: '57,820', icon: 'person', target: 60 },
    { description: 'Purchases', stats: '$ 89,745', icon: 'money', target: 60 },
    { description: 'Active Users', stats: '178,391', icon: 'face', target: 60 },
    { description: 'Returned', stats: '32,592', icon: 'refresh', target: 60 }
  ];

  /** Live per-item percentage, animated from 0 to the target on load. */
  readonly percents = signal<number[]>(this.charts.map(() => 0));

  private frame = 0;

  ngOnInit(): void {
    // Mirror the legacy 1s delay before the easyPieChart animation kicks off.
    const start = performance.now();
    const delay = 1000;
    const duration = 2000;

    const step = (now: number) => {
      const elapsed = now - start - delay;
      if (elapsed <= 0) {
        this.frame = requestAnimationFrame(step);
        return;
      }
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      this.percents.set(this.charts.map((c) => Math.round(c.target * eased)));
      if (t < 1) {
        this.frame = requestAnimationFrame(step);
      }
    };
    this.frame = requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }

  dashOffset(percent: number): number {
    return this.circumference * (1 - percent / 100);
  }
}
