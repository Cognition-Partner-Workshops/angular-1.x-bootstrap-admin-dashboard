import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

/**
 * Modern standalone port of the legacy AngularJS `dashboardCalendar` widget.
 *
 * Legacy source used jQuery fullCalendar v3; this reimplements it with
 * @fullcalendar/angular v6 (daygrid + timegrid + interaction plugins),
 * preserving the exact seed events, dashboard palette and Blur Admin theming.
 */
@Component({
  selector: 'app-dashboard-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './dashboard-calendar.component.html',
  styleUrl: './dashboard-calendar.component.scss',
})
export class DashboardCalendarComponent {
  // Legacy baConfig.colors.dashboard palette.
  private readonly dashboardColors = {
    silverTree: '#6eba8c',
    blueStone: '#005562',
    surfieGreen: '#0e8174',
    // ~15% darker shade of gossip (#b9f2a1).
    gossipDark: '#9dce89',
  };

  private readonly seedEvents: EventInput[] = [
    {
      title: 'All Day Event',
      start: '2016-03-01',
      color: this.dashboardColors.silverTree,
    },
    {
      title: 'Long Event',
      start: '2016-03-07',
      end: '2016-03-10',
      color: this.dashboardColors.blueStone,
    },
    {
      title: 'Dinner',
      start: '2016-03-14T20:00:00',
      color: this.dashboardColors.surfieGreen,
    },
    {
      title: 'Birthday Party',
      start: '2016-04-01T07:00:00',
      color: this.dashboardColors.gossipDark,
    },
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    initialDate: '2016-03-08',
    selectable: true,
    editable: true,
    dayMaxEvents: true,
    events: this.seedEvents,
    select: this.handleDateSelect.bind(this),
  };

  private handleDateSelect(selectInfo: DateSelectArg): void {
    const title = prompt('Event Title:');
    const calendarApi = selectInfo.view.calendar;
    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        allDay: selectInfo.allDay,
      });
    }
    calendarApi.unselect();
  }
}
