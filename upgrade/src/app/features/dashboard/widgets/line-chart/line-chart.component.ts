import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {
  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#666'
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: '#666',
          callback: (value) => '$' + value.toLocaleString()
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 0,
        hoverRadius: 4
      }
    }
  };

  ngOnInit(): void {
    const chartData = [
      { date: 'Dec 2012', value: 0, value0: 0 },
      { date: 'Jan 2013', value: 15000, value0: 19000 },
      { date: 'Feb 2013', value: 30000, value0: 20000 },
      { date: 'Mar 2013', value: 25000, value0: 22000 },
      { date: 'Apr 2013', value: 21000, value0: 25000 },
      { date: 'May 2013', value: 24000, value0: 29000 },
      { date: 'Jun 2013', value: 31000, value0: 26000 },
      { date: 'Jul 2013', value: 40000, value0: 25000 },
      { date: 'Aug 2013', value: 37000, value0: 20000 },
      { date: 'Sep 2013', value: 18000, value0: 22000 },
      { date: 'Oct 2013', value: 5000, value0: 26000 },
      { date: 'Nov 2013', value: 40000, value0: 30000 },
      { date: 'Dec 2013', value: 20000, value0: 25000 },
      { date: 'Jan 2014', value: 5000, value0: 13000 }
    ];

    this.lineChartData = {
      labels: chartData.map(d => d.date),
      datasets: [
        {
          data: chartData.map(d => d.value0),
          fill: true,
          backgroundColor: 'rgba(32, 158, 145, 0.2)',
          borderColor: 'rgba(32, 158, 145, 0.5)',
          borderWidth: 1
        },
        {
          data: chartData.map(d => d.value),
          fill: true,
          backgroundColor: 'rgba(32, 158, 145, 0.4)',
          borderColor: 'rgba(32, 158, 145, 0.8)',
          borderWidth: 1
        }
      ]
    };
  }
}
