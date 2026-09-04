import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BaConfigService } from '../../../theme';

@Component({
  selector: 'dashboard-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  template: '<div id="calendar" class="blurCalendar"><full-calendar [options]="calendarOptions()"></full-calendar></div>',
  styleUrl: './dashboard-calendar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardCalendarComponent {
  private readonly config = inject(BaConfigService);

  readonly events: EventInput[];
  readonly calendarOptions = signal<CalendarOptions>({});

  constructor() {
    const dashboardColors = this.config.colors.dashboard;
    this.events = [
      {
        title: 'All Day Event',
        start: '2016-03-01',
        color: dashboardColors.silverTree,
      },
      {
        title: 'Long Event',
        start: '2016-03-07',
        end: '2016-03-10',
        color: dashboardColors.blueStone,
      },
      {
        title: 'Dinner',
        start: '2016-03-14T20:00:00',
        color: dashboardColors.surfieGreen,
      },
      {
        // legacy referenced the undefined `dashboardColors.gossipDark`, so the event keeps the default colour
        title: 'Birthday Party',
        start: '2016-04-01T07:00:00',
      },
    ];
    this.calendarOptions.set({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
      },
      initialDate: '2016-03-08',
      selectable: true,
      selectMirror: true,
      select: (info) => this.handleSelect(info),
      editable: true,
      dayMaxEvents: true,
      eventDisplay: 'block',
      displayEventTime: true,
      height: 475,
      events: this.events,
    });
  }

  handleSelect(info: DateSelectArg): void {
    const title = prompt('Event Title:');
    if (title) {
      info.view.calendar.addEvent({ title, start: info.start, end: info.end, allDay: info.allDay });
    }
    info.view.calendar.unselect();
  }
}
