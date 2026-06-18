import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar-widget',
  standalone: true,
  imports: [FullCalendarModule],
  template: `<full-calendar [options]="calendarOptions"></full-calendar>`,
  styles: [`
    :host { display: block; }
    :host ::ng-deep .fc {
      font-size: 13px;
      .fc-toolbar-title { font-size: 16px; font-weight: 300; }
      .fc-button-primary {
        background-color: #209e91; border-color: #209e91;
        &:hover { background-color: #1a877c; }
      }
      .fc-day-today { background-color: rgba(32, 158, 145, 0.1) !important; }
      .fc-event { background-color: #209e91; border-color: #209e91; }
    }
  `],
})
export class CalendarWidgetComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '',
    },
    editable: true,
    height: 'auto',
    events: [
      { title: 'Conference', start: new Date(), allDay: true },
      { title: 'Meeting', start: new Date(Date.now() + 86400000 * 2) },
      { title: 'Launch', start: new Date(Date.now() + 86400000 * 5) },
      { title: 'Birthday', start: new Date(Date.now() + 86400000 * 8) },
    ],
  };
}
