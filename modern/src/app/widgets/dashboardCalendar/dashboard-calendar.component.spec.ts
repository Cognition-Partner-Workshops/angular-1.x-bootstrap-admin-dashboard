import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardCalendarComponent } from './dashboard-calendar.component';

describe('DashboardCalendarComponent', () => {
  let fixture: ComponentFixture<DashboardCalendarComponent>;
  let component: DashboardCalendarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCalendarComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the full-calendar element', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('full-calendar')).toBeTruthy();
  });

  it('should configure four seed events initialized to March 2016', () => {
    const events = component.calendarOptions.events as Array<{ title: string }>;
    expect(events.length).toBe(4);
    expect(events.map((e) => e.title)).toEqual([
      'All Day Event',
      'Long Event',
      'Dinner',
      'Birthday Party',
    ]);
    expect(component.calendarOptions.initialDate).toBe('2016-03-08');
  });

  it('should offer month/week/day views and be selectable', () => {
    const right = (component.calendarOptions.headerToolbar as { right: string }).right;
    expect(right).toContain('dayGridMonth');
    expect(right).toContain('timeGridWeek');
    expect(right).toContain('timeGridDay');
    expect(component.calendarOptions.selectable).toBeTrue();
  });
});
