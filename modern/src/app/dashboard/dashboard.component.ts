import { Component } from '@angular/core';

import { BaPanelComponent } from '../shared/ba-panel/ba-panel.component';
import { DashboardPieChartComponent } from '../widgets/dashboardPieChart/dashboard-pie-chart.component';
import { TrafficChartComponent } from '../widgets/trafficChart/traffic-chart.component';
import { DashboardMapComponent } from '../widgets/dashboardMap/dashboard-map.component';
import { DashboardLineChartComponent } from '../widgets/dashboardLineChart/dashboard-line-chart.component';
import { PopularAppComponent } from '../widgets/popularApp/popular-app.component';
import { BlurFeedComponent } from '../widgets/blurFeed/blur-feed.component';
import { DashboardTodoComponent } from '../widgets/dashboardTodo/dashboard-todo.component';
import { DashboardCalendarComponent } from '../widgets/dashboardCalendar/dashboard-calendar.component';

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
    DashboardCalendarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
