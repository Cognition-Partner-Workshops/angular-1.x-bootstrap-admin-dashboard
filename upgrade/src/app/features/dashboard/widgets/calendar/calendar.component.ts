import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
  color: string;
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  currentMonth = '';
  currentYear = 0;
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: CalendarDay[] = [];
  viewMode: 'month' | 'week' | 'day' = 'month';

  events: CalendarEvent[] = [
    { title: 'All Day Event', start: '2016-03-01', color: '#66bb6a' },
    { title: 'Long Event', start: '2016-03-07', end: '2016-03-10', color: '#4a4a4a' },
    { title: 'Dinner', start: '2016-03-14', color: '#00a5a8' },
    { title: 'Birthday Party', start: '2016-04-01', color: '#8bc34a' }
  ];

  ngOnInit(): void {
    this.currentDate = new Date(2016, 2, 8);
    this.updateCalendar();
  }

  updateCalendar(): void {
    this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendarDays();
  }

  generateCalendarDays(): void {
    this.calendarDays = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      this.calendarDays.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: false,
        events: []
      });
    }

    const today = new Date();
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = this.events.filter(e => {
        if (e.start === dateStr) return true;
        if (e.end) {
          const start = new Date(e.start);
          const end = new Date(e.end);
          const current = new Date(dateStr);
          return current >= start && current <= end;
        }
        return false;
      });

      this.calendarDays.push({
        date: day,
        isCurrentMonth: true,
        isToday: today.getDate() === day && today.getMonth() === month && today.getFullYear() === year,
        events: dayEvents
      });
    }

    const remainingDays = 42 - this.calendarDays.length;
    for (let day = 1; day <= remainingDays; day++) {
      this.calendarDays.push({
        date: day,
        isCurrentMonth: false,
        isToday: false,
        events: []
      });
    }
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.updateCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.updateCalendar();
  }

  goToToday(): void {
    this.currentDate = new Date();
    this.updateCalendar();
  }

  setViewMode(mode: 'month' | 'week' | 'day'): void {
    this.viewMode = mode;
  }
}
