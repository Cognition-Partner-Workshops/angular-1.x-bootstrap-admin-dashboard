import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaPanelComponent } from '../../../shared/components/ba-panel';
import { ThemeConfigService, StopableIntervalService } from '../../../core/services';

@Component({
  selector: 'app-chartjs',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, BaPanelComponent],
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss'],
})
export class ChartjsComponent implements OnInit, OnDestroy {
  private readonly themeConfig = inject(ThemeConfigService);
  private readonly stopableInterval = inject(StopableIntervalService);

  private animatedRadarIntervalId: number | null = null;
  private animatedBarIntervalId: number | null = null;

  // 1D Chart Data (Pie, Doughnut, Polar)
  chart1DLabels: string[] = ['Sleeping', 'Designing', 'Coding', 'Cycling'];
  chart1DData: number[] = [20, 40, 5, 35];

  // 2D Chart Data (Radar, Line, Bar)
  chart2DLabels: string[] = ['May', 'Jun', 'Jul', 'Aug', 'Sep'];
  chart2DData: number[][] = [
    [65, 59, 90, 81, 56],
    [28, 48, 40, 19, 88],
  ];
  chart2DSeries: string[] = ['Product A', 'Product B'];

  // Animated Chart Data (Wave Radar and Bar)
  animatedLabels: string[] = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  animatedRadarData: number[] = [];
  animatedBarData: number[] = [];

  // Chart colors from theme
  chartColors: string[];

  // Pie Chart Configuration
  pieChartData!: ChartData<'pie'>;
  pieChartOptions!: ChartConfiguration<'pie'>['options'];
  readonly pieChartType = 'pie' as const;

  // Doughnut Chart Configuration
  doughnutChartData!: ChartData<'doughnut'>;
  doughnutChartOptions!: ChartConfiguration<'doughnut'>['options'];
  readonly doughnutChartType = 'doughnut' as const;

  // Polar Area Chart Configuration
  polarChartData!: ChartData<'polarArea'>;
  polarChartOptions!: ChartConfiguration<'polarArea'>['options'];
  readonly polarChartType = 'polarArea' as const;

  // Animated Radar Chart Configuration
  animatedRadarChartData!: ChartData<'radar'>;
  animatedRadarChartOptions!: ChartConfiguration<'radar'>['options'];
  readonly radarChartType = 'radar' as const;

  // Animated Bar Chart Configuration
  animatedBarChartData!: ChartData<'bar'>;
  animatedBarChartOptions!: ChartConfiguration<'bar'>['options'];
  readonly barChartType = 'bar' as const;

  // Static Radar Chart Configuration
  staticRadarChartData!: ChartData<'radar'>;
  staticRadarChartOptions!: ChartConfiguration<'radar'>['options'];

  // Line Chart Configuration
  lineChartData!: ChartData<'line'>;
  lineChartOptions!: ChartConfiguration<'line'>['options'];
  readonly lineChartType = 'line' as const;

  // Static Bar Chart Configuration
  staticBarChartData!: ChartData<'bar'>;
  staticBarChartOptions!: ChartConfiguration<'bar'>['options'];

  constructor() {
    this.chartColors = this.themeConfig.getChartColors();
    this.initializeAnimatedData();
    this.initializeChartConfigurations();
  }

  ngOnInit(): void {
    this.startAnimations();
  }

  ngOnDestroy(): void {
    if (this.animatedRadarIntervalId !== null) {
      this.stopableInterval.stop(this.animatedRadarIntervalId);
    }
    if (this.animatedBarIntervalId !== null) {
      this.stopableInterval.stop(this.animatedBarIntervalId);
    }
  }

  private initializeAnimatedData(): void {
    const baseData = [1, 9, 3, 4, 5, 6, 7, 8, 2];
    this.animatedRadarData = baseData.map((e) => Math.sin(e) * 25 + 25);
    this.animatedBarData = [...this.animatedRadarData];
  }

  private initializeChartConfigurations(): void {
    const layoutColors = this.themeConfig.colors;

    // Common options for 1D charts
    const common1DOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2500,
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom' as const,
          labels: {
            color: layoutColors.defaultText,
          },
        },
      },
      elements: {
        arc: {
          borderWidth: 0,
        },
      },
    };

    // Pie Chart
    this.pieChartData = {
      labels: this.chart1DLabels,
      datasets: [
        {
          data: this.chart1DData,
          backgroundColor: this.chartColors.slice(0, 4),
        },
      ],
    };
    this.pieChartOptions = { ...common1DOptions };

    // Doughnut Chart
    this.doughnutChartData = {
      labels: this.chart1DLabels,
      datasets: [
        {
          data: this.chart1DData,
          backgroundColor: this.chartColors.slice(0, 4),
        },
      ],
    };
    this.doughnutChartOptions = { ...common1DOptions };

    // Polar Area Chart
    this.polarChartData = {
      labels: this.chart1DLabels,
      datasets: [
        {
          data: this.chart1DData,
          backgroundColor: this.chartColors.slice(0, 4),
        },
      ],
    };
    this.polarChartOptions = {
      ...common1DOptions,
      scales: {
        r: {
          grid: {
            color: layoutColors.border,
          },
          ticks: {
            color: layoutColors.defaultText,
            backdropColor: 'transparent',
          },
          pointLabels: {
            color: layoutColors.defaultText,
          },
        },
      },
    };

    // Animated Radar Chart
    this.animatedRadarChartData = {
      labels: this.animatedLabels,
      datasets: [
        {
          data: this.animatedRadarData,
          backgroundColor: this.hexToRgba(this.chartColors[0], 0.2),
          borderColor: this.chartColors[0],
          pointBackgroundColor: this.chartColors[0],
        },
      ],
    };
    this.animatedRadarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      scales: {
        r: {
          grid: {
            color: layoutColors.border,
          },
          ticks: {
            display: false,
            maxTicksLimit: 5,
          },
          pointLabels: {
            color: layoutColors.defaultText,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    // Animated Bar Chart
    this.animatedBarChartData = {
      labels: this.animatedLabels,
      datasets: [
        {
          data: this.animatedBarData,
          backgroundColor: this.chartColors[0],
          borderColor: this.chartColors[0],
        },
      ],
    };
    this.animatedBarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      scales: {
        x: {
          grid: {
            color: layoutColors.border,
          },
          ticks: {
            color: layoutColors.defaultText,
          },
        },
        y: {
          grid: {
            color: layoutColors.border,
          },
          ticks: {
            color: layoutColors.defaultText,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    };

    // Static Radar Chart (2D data)
    this.staticRadarChartData = {
      labels: this.chart2DLabels,
      datasets: [
        {
          label: this.chart2DSeries[0],
          data: this.chart2DData[0],
          backgroundColor: this.hexToRgba(this.chartColors[0], 0.2),
          borderColor: this.chartColors[0],
          pointBackgroundColor: this.chartColors[0],
        },
        {
          label: this.chart2DSeries[1],
          data: this.chart2DData[1],
          backgroundColor: this.hexToRgba(this.chartColors[1], 0.2),
          borderColor: this.chartColors[1],
          pointBackgroundColor: this.chartColors[1],
        },
      ],
    };
    this.staticRadarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2500,
      },
      scales: {
        r: {
          grid: {
            color: layoutColors.border,
          },
          ticks: {
            display: false,
            maxTicksLimit: 5,
          },
          pointLabels: {
            color: layoutColors.defaultText,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom' as const,
          labels: {
            color: layoutColors.defaultText,
          },
        },
      },
    };

    // Line Chart (2D data)
    this.lineChartData = {
      labels: this.chart2DLabels,
      datasets: [
        {
          label: this.chart2DSeries[0],
          data: this.chart2DData[0],
          borderColor: this.chartColors[0],
          backgroundColor: 'transparent',
          fill: false,
          tension: 0,
        },
        {
          label: this.chart2DSeries[1],
          data: this.chart2DData[1],
          borderColor: this.chartColors[1],
          backgroundColor: 'transparent',
          fill: false,
          tension: 0,
        },
      ],
    };
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2500,
      },
      scales: {
        x: {
          grid: {
            color: layoutColors.border,
          },
          ticks: {
            color: layoutColors.defaultText,
          },
        },
        y: {
          grid: {
            color: layoutColors.border,
          },
          ticks: {
            color: layoutColors.defaultText,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom' as const,
          labels: {
            color: layoutColors.defaultText,
          },
        },
      },
    };

    // Static Bar Chart (2D data)
    this.staticBarChartData = {
      labels: this.chart2DLabels,
      datasets: [
        {
          label: this.chart2DSeries[0],
          data: this.chart2DData[0],
          backgroundColor: this.chartColors[0],
          borderColor: this.chartColors[0],
        },
        {
          label: this.chart2DSeries[1],
          data: this.chart2DData[1],
          backgroundColor: this.chartColors[1],
          borderColor: this.chartColors[1],
        },
      ],
    };
    this.staticBarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2500,
      },
      scales: {
        x: {
          grid: {
            color: layoutColors.border,
          },
          ticks: {
            color: layoutColors.defaultText,
          },
        },
        y: {
          grid: {
            color: layoutColors.border,
          },
          ticks: {
            color: layoutColors.defaultText,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom' as const,
          labels: {
            color: layoutColors.defaultText,
          },
        },
        tooltip: {
          enabled: false,
        },
      },
    };
  }

  private startAnimations(): void {
    // Animated Radar - rotate data every 400ms
    this.animatedRadarIntervalId = this.stopableInterval.start(() => {
      this.rotateAnimatedData('radar');
    }, 400);

    // Animated Bar - rotate data every 400ms
    this.animatedBarIntervalId = this.stopableInterval.start(() => {
      this.rotateAnimatedData('bar');
    }, 400);
  }

  private rotateAnimatedData(chartType: 'radar' | 'bar'): void {
    if (chartType === 'radar') {
      const lastElement = this.animatedRadarData[this.animatedRadarData.length - 1];
      const tempArray: number[] = [];
      for (let i = this.animatedRadarData.length - 1; i > 0; i--) {
        tempArray[i] = this.animatedRadarData[i - 1];
      }
      tempArray[0] = lastElement;
      this.animatedRadarData = tempArray;
      this.animatedRadarChartData = {
        ...this.animatedRadarChartData,
        datasets: [
          {
            ...this.animatedRadarChartData.datasets[0],
            data: this.animatedRadarData,
          },
        ],
      };
    } else {
      const lastElement = this.animatedBarData[this.animatedBarData.length - 1];
      const tempArray: number[] = [];
      for (let i = this.animatedBarData.length - 1; i > 0; i--) {
        tempArray[i] = this.animatedBarData[i - 1];
      }
      tempArray[0] = lastElement;
      this.animatedBarData = tempArray;
      this.animatedBarChartData = {
        ...this.animatedBarChartData,
        datasets: [
          {
            ...this.animatedBarChartData.datasets[0],
            data: this.animatedBarData,
          },
        ],
      };
    }
  }

  private hexToRgba(hex: string, alpha: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return hex;
  }

  // Click handlers to shuffle data (matching legacy behavior)
  onPieChartClick(): void {
    this.shuffleChart1DData();
    this.pieChartData = {
      ...this.pieChartData,
      datasets: [{ ...this.pieChartData.datasets[0], data: [...this.chart1DData] }],
    };
  }

  onDoughnutChartClick(): void {
    this.shuffleChart1DData();
    this.doughnutChartData = {
      ...this.doughnutChartData,
      datasets: [{ ...this.doughnutChartData.datasets[0], data: [...this.chart1DData] }],
    };
  }

  onPolarChartClick(): void {
    this.shuffleChart1DData();
    this.polarChartData = {
      ...this.polarChartData,
      datasets: [{ ...this.polarChartData.datasets[0], data: [...this.chart1DData] }],
    };
  }

  onStaticRadarChartClick(): void {
    this.shuffleChart2DData();
    this.staticRadarChartData = {
      ...this.staticRadarChartData,
      datasets: [
        { ...this.staticRadarChartData.datasets[0], data: [...this.chart2DData[0]] },
        { ...this.staticRadarChartData.datasets[1], data: [...this.chart2DData[1]] },
      ],
    };
  }

  onLineChartClick(): void {
    this.shuffleChart2DData();
    this.lineChartData = {
      ...this.lineChartData,
      datasets: [
        { ...this.lineChartData.datasets[0], data: [...this.chart2DData[0]] },
        { ...this.lineChartData.datasets[1], data: [...this.chart2DData[1]] },
      ],
    };
  }

  onStaticBarChartClick(): void {
    this.shuffleChart2DData();
    this.staticBarChartData = {
      ...this.staticBarChartData,
      datasets: [
        { ...this.staticBarChartData.datasets[0], data: [...this.chart2DData[0]] },
        { ...this.staticBarChartData.datasets[1], data: [...this.chart2DData[1]] },
      ],
    };
  }

  private shuffleChart1DData(): void {
    this.chart1DData = this.shuffle([...this.chart1DData]);
  }

  private shuffleChart2DData(): void {
    this.chart2DData[0] = this.shuffle([...this.chart2DData[0]]);
    this.chart2DData[1] = this.shuffle([...this.chart2DData[1]]);
  }

  private shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
