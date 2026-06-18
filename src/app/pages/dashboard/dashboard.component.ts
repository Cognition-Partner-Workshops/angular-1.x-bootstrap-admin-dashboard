import { Component } from '@angular/core';
import { PieChartsComponent } from './pie-charts/pie-charts.component';
import { TrafficChartComponent } from './traffic-chart/traffic-chart.component';
import { MapWidgetComponent } from './map-widget/map-widget.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PopularAppComponent } from './popular-app/popular-app.component';
import { FeedComponent } from './feed/feed.component';
import { TodoComponent } from './todo/todo.component';
import { CalendarWidgetComponent } from './calendar/calendar-widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PieChartsComponent,
    TrafficChartComponent,
    MapWidgetComponent,
    LineChartComponent,
    PopularAppComponent,
    FeedComponent,
    TodoComponent,
    CalendarWidgetComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
