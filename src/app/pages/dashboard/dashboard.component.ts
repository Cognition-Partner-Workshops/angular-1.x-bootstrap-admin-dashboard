import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../theme/components/panel/panel.component';
import { DashboardPieChartComponent } from './pie-chart/pie-chart.component';
import { TrafficChartComponent } from './traffic-chart/traffic-chart.component';
import { DashboardMapComponent } from './dashboard-map/dashboard-map.component';
import { DashboardLineChartComponent } from './line-chart/line-chart.component';
import { PopularAppComponent } from './popular-app/popular-app.component';
import { FeedComponent } from './feed/feed.component';
import { TodoComponent } from './todo/todo.component';
import { DashboardCalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PanelComponent,
    DashboardPieChartComponent,
    TrafficChartComponent,
    DashboardMapComponent,
    DashboardLineChartComponent,
    PopularAppComponent,
    FeedComponent,
    TodoComponent,
    DashboardCalendarComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
