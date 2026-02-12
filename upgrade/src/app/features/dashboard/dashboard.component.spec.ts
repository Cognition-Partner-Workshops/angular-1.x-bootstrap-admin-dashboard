import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideRouter([]), provideCharts(withDefaultRegisterables())]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Route Reachability', () => {
    it('should create the dashboard component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the dashboard page container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const dashboardPage = compiled.querySelector('[data-testid="dashboard-page"]');
      expect(dashboardPage).toBeTruthy();
    });
  });

  describe('Widget Rendering - Pie Charts', () => {
    it('should render the pie charts widget', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const pieCharts = compiled.querySelector('[data-testid="pie-charts-widget"]');
      expect(pieCharts).toBeTruthy();
    });

    it('should render 4 pie chart items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const pieChartItems = compiled.querySelectorAll('.pie-chart-item-container');
      expect(pieChartItems.length).toBe(4);
    });
  });

  describe('Widget Rendering - Traffic Chart', () => {
    it('should render the traffic chart widget', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const trafficChart = compiled.querySelector('[data-testid="traffic-chart-widget"]');
      expect(trafficChart).toBeTruthy();
    });

    it('should render the doughnut chart canvas', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const canvas = compiled.querySelector('app-traffic-chart canvas');
      expect(canvas).toBeTruthy();
    });

    it('should render channel info items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const channelItems = compiled.querySelectorAll('.channels-info-item');
      expect(channelItems.length).toBe(5);
    });
  });

  describe('Widget Rendering - Users Map', () => {
    it('should render the users map widget', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const usersMap = compiled.querySelector('[data-testid="users-map-widget"]');
      expect(usersMap).toBeTruthy();
    });

    it('should render country list items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const countryItems = compiled.querySelectorAll('.country-item');
      expect(countryItems.length).toBeGreaterThan(0);
    });

    it('should render map legend', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const legend = compiled.querySelector('.map-legend');
      expect(legend).toBeTruthy();
    });
  });

  describe('Widget Rendering - Line Chart (Revenue)', () => {
    it('should render the line chart widget', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const lineChart = compiled.querySelector('[data-testid="line-chart-widget"]');
      expect(lineChart).toBeTruthy();
    });

    it('should render the line chart canvas', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const canvas = compiled.querySelector('app-line-chart canvas');
      expect(canvas).toBeTruthy();
    });
  });

  describe('Widget Rendering - Popular App', () => {
    it('should render the popular app widget', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const popularApp = compiled.querySelector('[data-testid="popular-app-widget"]');
      expect(popularApp).toBeTruthy();
    });

    it('should display app name', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const logoText = compiled.querySelector('.logo-text');
      expect(logoText?.textContent).toContain('Super App');
    });

    it('should display app stats', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const infoValues = compiled.querySelectorAll('.info-value');
      expect(infoValues.length).toBe(3);
    });
  });

  describe('Widget Rendering - Blur Feed', () => {
    it('should render the blur feed widget', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const blurFeed = compiled.querySelector('[data-testid="blur-feed-widget"]');
      expect(blurFeed).toBeTruthy();
    });

    it('should render feed messages', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const feedMessages = compiled.querySelectorAll('.feed-message');
      expect(feedMessages.length).toBeGreaterThan(0);
    });

    it('should display author names in feed', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const authors = compiled.querySelectorAll('.author');
      expect(authors.length).toBeGreaterThan(0);
    });
  });

  describe('Widget Rendering - Todo List', () => {
    it('should render the todo list widget', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const todoList = compiled.querySelector('[data-testid="todo-list-widget"]');
      expect(todoList).toBeTruthy();
    });

    it('should render todo input field', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const input = compiled.querySelector('.task-todo');
      expect(input).toBeTruthy();
    });

    it('should render todo list items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const todoItems = compiled.querySelectorAll('.todo-list li');
      expect(todoItems.length).toBeGreaterThan(0);
    });

    it('should have add button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const addButton = compiled.querySelector('.add-item-icon');
      expect(addButton).toBeTruthy();
    });
  });

  describe('Widget Rendering - Calendar', () => {
    it('should render the calendar widget', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const calendar = compiled.querySelector('[data-testid="calendar-widget"]');
      expect(calendar).toBeTruthy();
    });

    it('should render calendar header with navigation', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const calendarHeader = compiled.querySelector('.calendar-header');
      expect(calendarHeader).toBeTruthy();
    });

    it('should render weekday headers', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const weekdays = compiled.querySelectorAll('.weekday');
      expect(weekdays.length).toBe(7);
    });

    it('should render calendar days grid', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const dayCells = compiled.querySelectorAll('.day-cell');
      expect(dayCells.length).toBe(42);
    });

    it('should render view mode buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const viewButtons = compiled.querySelectorAll('.view-buttons button');
      expect(viewButtons.length).toBe(3);
    });
  });

  describe('Panel Structure', () => {
    it('should render panels with titles', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = compiled.querySelectorAll('.panel-title');
      expect(panelTitles.length).toBeGreaterThan(0);
    });

    it('should render Acquisition Channels panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = Array.from(compiled.querySelectorAll('.panel-title'));
      const hasAcquisitionPanel = panelTitles.some(title => 
        title.textContent?.includes('Acquisition Channels')
      );
      expect(hasAcquisitionPanel).toBeTruthy();
    });

    it('should render Users by Country panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = Array.from(compiled.querySelectorAll('.panel-title'));
      const hasUsersPanel = panelTitles.some(title => 
        title.textContent?.includes('Users by Country')
      );
      expect(hasUsersPanel).toBeTruthy();
    });

    it('should render Revenue panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = Array.from(compiled.querySelectorAll('.panel-title'));
      const hasRevenuePanel = panelTitles.some(title => 
        title.textContent?.includes('Revenue')
      );
      expect(hasRevenuePanel).toBeTruthy();
    });

    it('should render Feed panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = Array.from(compiled.querySelectorAll('.panel-title'));
      const hasFeedPanel = panelTitles.some(title => 
        title.textContent?.includes('Feed')
      );
      expect(hasFeedPanel).toBeTruthy();
    });

    it('should render To Do List panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = Array.from(compiled.querySelectorAll('.panel-title'));
      const hasTodoPanel = panelTitles.some(title => 
        title.textContent?.includes('To Do List')
      );
      expect(hasTodoPanel).toBeTruthy();
    });

    it('should render Calendar panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitles = Array.from(compiled.querySelectorAll('.panel-title'));
      const hasCalendarPanel = panelTitles.some(title => 
        title.textContent?.includes('Calendar')
      );
      expect(hasCalendarPanel).toBeTruthy();
    });
  });

  describe('Layout Structure', () => {
    it('should have responsive row containers', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const rows = compiled.querySelectorAll('.row');
      expect(rows.length).toBeGreaterThanOrEqual(3);
    });

    it('should have shift-up row for todo and calendar', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const shiftUpRow = compiled.querySelector('.row.shift-up');
      expect(shiftUpRow).toBeTruthy();
    });
  });
});
