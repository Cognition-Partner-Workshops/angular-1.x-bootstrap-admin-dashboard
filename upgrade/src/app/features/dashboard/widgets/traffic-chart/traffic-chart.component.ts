import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-traffic-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './traffic-chart.component.html',
  styleUrl: './traffic-chart.component.scss'
})
export class TrafficChartComponent {
  doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Other', 'Search engines', 'Referral Traffic', 'Direct Traffic', 'Ad Campaigns'],
    datasets: [{
      data: [2000, 1500, 1000, 1200, 400],
      backgroundColor: [
        '#ffffff',
        '#4a4a4a',
        '#00a5a8',
        '#66bb6a',
        '#c5e1a5'
      ],
      hoverBackgroundColor: [
        '#e6e6e6',
        '#3a3a3a',
        '#008b8e',
        '#4caf50',
        '#aed581'
      ],
      borderWidth: 0
    }]
  };

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '64%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  channelData = [
    { label: 'Other', percentage: 87, color: '#ffffff' },
    { label: 'Search engines', percentage: 22, color: '#4a4a4a' },
    { label: 'Referral Traffic', percentage: 70, color: '#00a5a8' },
    { label: 'Direct Traffic', percentage: 38, color: '#66bb6a' },
    { label: 'Ad Campaigns', percentage: 17, color: '#c5e1a5' }
  ];

  totalViews = '1,900,128';
}
