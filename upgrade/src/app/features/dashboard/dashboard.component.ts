import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../shared/components/ba-panel';
import { TrafficChartComponent } from './widgets/traffic-chart';
import { PieChartsComponent } from './widgets/pie-charts';
import { TodoListComponent } from './widgets/todo-list';
import { BlurFeedComponent } from './widgets/blur-feed';
import { PopularAppComponent } from './widgets/popular-app';
import { LineChartComponent } from './widgets/line-chart';
import { CalendarComponent } from './widgets/calendar';
import { UsersMapComponent } from './widgets/users-map';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaPanelComponent,
    TrafficChartComponent,
    PieChartsComponent,
    TodoListComponent,
    BlurFeedComponent,
    PopularAppComponent,
    LineChartComponent,
    CalendarComponent,
    UsersMapComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
