import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';
import { ThemeConfigService } from '../../../theme/services/theme-config.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chartjs',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  templateUrl: './chartjs.component.html',
  styles: [`:host { display: block; } canvas { max-height: 300px; }`],
})
export class ChartjsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('radarChart') radarChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('polarChart') polarChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart') doughnutChart!: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];

  constructor(private themeConfig: ThemeConfigService) {}

  ngAfterViewInit(): void {
    const colors = this.themeConfig.colors;

    this.charts.push(
      new Chart(this.lineChart.nativeElement, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Series A',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: colors.primary,
            backgroundColor: colors.primary + '33',
            fill: true,
            tension: 0.4,
          }, {
            label: 'Series B',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: colors.danger,
            backgroundColor: colors.danger + '33',
            fill: true,
            tension: 0.4,
          }],
        },
        options: { responsive: true },
      }),
      new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016'],
          datasets: [{
            label: 'Series A',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: colors.primary,
          }, {
            label: 'Series B',
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: colors.warning,
          }],
        },
        options: { responsive: true },
      }),
      new Chart(this.radarChart.nativeElement, {
        type: 'radar',
        data: {
          labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
          datasets: [{
            label: 'Series A',
            data: [65, 59, 90, 81, 56, 55, 40],
            borderColor: colors.primary,
            backgroundColor: colors.primary + '33',
          }, {
            label: 'Series B',
            data: [28, 48, 40, 19, 96, 27, 100],
            borderColor: colors.warning,
            backgroundColor: colors.warning + '33',
          }],
        },
        options: { responsive: true },
      }),
      new Chart(this.pieChart.nativeElement, {
        type: 'pie',
        data: {
          labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
          datasets: [{
            data: [300, 500, 100],
            backgroundColor: [colors.primary, colors.warning, colors.danger],
          }],
        },
        options: { responsive: true },
      }),
      new Chart(this.polarChart.nativeElement, {
        type: 'polarArea',
        data: {
          labels: ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'],
          datasets: [{
            data: [300, 500, 100, 40, 120],
            backgroundColor: [colors.primary, colors.warning, colors.danger, colors.info, colors.success],
          }],
        },
        options: { responsive: true },
      }),
      new Chart(this.doughnutChart.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
          datasets: [{
            data: [350, 450, 100],
            backgroundColor: [colors.primary, colors.warning, colors.danger],
          }],
        },
        options: { responsive: true },
      }),
    );
  }

  ngOnDestroy(): void {
    this.charts.forEach((c) => c.destroy());
  }
}
