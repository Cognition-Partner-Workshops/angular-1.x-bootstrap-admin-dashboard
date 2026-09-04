import { Component, ViewEncapsulation } from '@angular/core';
import { BaPanelComponent } from '../../theme';
import { DashboardPieChartComponent } from './dashboard-pie-chart/dashboard-pie-chart.component';
import { TrafficChartComponent } from './traffic-chart/traffic-chart.component';
import { DashboardMapComponent } from './dashboard-map/dashboard-map.component';
import { DashboardLineChartComponent } from './dashboard-line-chart/dashboard-line-chart.component';
import { PopularAppComponent } from './popular-app/popular-app.component';
import { BlurFeedComponent } from './blur-feed/blur-feed.component';
import { DashboardTodoComponent } from './dashboard-todo/dashboard-todo.component';
import { DashboardCalendarComponent } from './dashboard-calendar/dashboard-calendar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BaPanelComponent,
    DashboardPieChartComponent,
    TrafficChartComponent,
    DashboardMapComponent,
    DashboardLineChartComponent,
    PopularAppComponent,
    BlurFeedComponent,
    DashboardTodoComponent,
    DashboardCalendarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {}
