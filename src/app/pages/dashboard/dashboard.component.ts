import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../theme/components/ba-panel/ba-panel.component';
import { TrafficChartComponent } from './traffic-chart/traffic-chart.component';
import { DashboardTodoComponent } from './dashboard-todo/dashboard-todo.component';
import { BlurFeedComponent } from './blur-feed/blur-feed.component';
import { DashboardPieChartComponent } from './dashboard-pie-chart/dashboard-pie-chart.component';
import { DashboardLineChartComponent } from './dashboard-line-chart/dashboard-line-chart.component';
import { PopularAppComponent } from './popular-app/popular-app.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaPanelComponent,
    TrafficChartComponent,
    DashboardTodoComponent,
    BlurFeedComponent,
    DashboardPieChartComponent,
    DashboardLineChartComponent,
    PopularAppComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
