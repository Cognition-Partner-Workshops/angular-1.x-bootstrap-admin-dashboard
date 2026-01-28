import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PieChartItem {
  description: string;
  stats: string;
  icon: string;
  percent: number;
  color: string;
}

@Component({
  selector: 'app-pie-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-charts.component.html',
  styleUrl: './pie-charts.component.scss'
})
export class PieChartsComponent implements OnInit, AfterViewInit {
  charts: PieChartItem[] = [];
  animatedPercents: number[] = [];

  ngOnInit(): void {
    const pieColor = 'rgba(51, 51, 51, 0.2)';
    this.charts = [
      { description: 'New Visits', stats: '57,820', icon: 'person', percent: 75, color: pieColor },
      { description: 'Purchases', stats: '$ 89,745', icon: 'money', percent: 68, color: pieColor },
      { description: 'Active Users', stats: '178,391', icon: 'face', percent: 82, color: pieColor },
      { description: 'Returned', stats: '32,592', icon: 'refresh', percent: 61, color: pieColor }
    ];
    this.animatedPercents = this.charts.map(() => 0);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.animateCharts(), 500);
  }

  private animateCharts(): void {
    this.charts.forEach((chart, index) => {
      this.animatePercent(index, chart.percent);
    });
  }

  private animatePercent(index: number, target: number): void {
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        this.animatedPercents[index] = target;
        clearInterval(timer);
      } else {
        this.animatedPercents[index] = Math.round(current);
      }
    }, interval);
  }

  getStrokeDasharray(percent: number): string {
    const circumference = 2 * Math.PI * 38;
    const filled = (percent / 100) * circumference;
    return `${filled} ${circumference}`;
  }

  refreshData(): void {
    this.charts.forEach((chart, index) => {
      const newPercent = Math.floor(Math.random() * 35) + 55;
      chart.percent = newPercent;
      this.animatePercent(index, newPercent);
    });
  }
}
