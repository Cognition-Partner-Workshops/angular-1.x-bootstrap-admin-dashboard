import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateSelectArg } from '@fullcalendar/core';
import { BaConfigService } from '../../../theme';
import { DashboardCalendarComponent } from './dashboard-calendar.component';

describe('DashboardCalendarComponent', () => {
  let fixture: ComponentFixture<DashboardCalendarComponent>;
  let component: DashboardCalendarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DashboardCalendarComponent] }).compileComponents();
    fixture = TestBed.createComponent(DashboardCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('creates', () => expect(component).toBeTruthy());

  it('defines the four legacy demo events with dashboard colours', () => {
    const dashboard = TestBed.inject(BaConfigService).colors.dashboard;
    expect(component.events).toEqual([
      { title: 'All Day Event', start: '2016-03-01', color: dashboard.silverTree },
      { title: 'Long Event', start: '2016-03-07', end: '2016-03-10', color: dashboard.blueStone },
      { title: 'Dinner', start: '2016-03-14T20:00:00', color: dashboard.surfieGreen },
      { title: 'Birthday Party', start: '2016-04-01T07:00:00' },
    ]);
    const options = component.calendarOptions();
    expect(options.initialDate).toBe('2016-03-08');
    expect(options.selectable).toBeTrue();
    expect(options.editable).toBeTrue();
    expect(options.initialView).toBe('dayGridMonth');
  });

  it('renders a FullCalendar month view for March 2016 showing the events', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('full-calendar')).toBeTruthy();
    expect(el.querySelector('.fc-toolbar-title')?.textContent).toContain('March 2016');
    expect(el.querySelector('.fc-prev-button')).toBeTruthy();
    expect(el.querySelector('.fc-next-button')).toBeTruthy();
    const eventTitles = Array.from(el.querySelectorAll('.fc-event-title')).map((e) => e.textContent?.trim());
    expect(eventTitles).toEqual(jasmine.arrayContaining(['All Day Event', 'Long Event', 'Dinner', 'Birthday Party']));
  });

  it('prompts for a title on selection and adds the event, then unselects', () => {
    const addEvent = jasmine.createSpy('addEvent');
    const unselect = jasmine.createSpy('unselect');
    const info = {
      start: new Date(2016, 2, 20),
      end: new Date(2016, 2, 21),
      allDay: true,
      view: { calendar: { addEvent, unselect } },
    } as unknown as DateSelectArg;

    spyOn(window, 'prompt').and.returnValue('Team lunch');
    component.handleSelect(info);
    expect(window.prompt).toHaveBeenCalledWith('Event Title:');
    expect(addEvent).toHaveBeenCalledWith({ title: 'Team lunch', start: info.start, end: info.end, allDay: true });
    expect(unselect).toHaveBeenCalledTimes(1);

    (window.prompt as jasmine.Spy).and.returnValue(null);
    component.handleSelect(info);
    expect(addEvent).toHaveBeenCalledTimes(1);
    expect(unselect).toHaveBeenCalledTimes(2);
  });
});
