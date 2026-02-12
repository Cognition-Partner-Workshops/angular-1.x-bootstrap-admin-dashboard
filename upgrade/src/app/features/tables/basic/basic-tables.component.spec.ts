import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicTablesComponent } from './basic-tables.component';
import { provideRouter } from '@angular/router';

describe('BasicTablesComponent', () => {
  let component: BasicTablesComponent;
  let fixture: ComponentFixture<BasicTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicTablesComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Route Reachability', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render page container with title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const pageContainer = compiled.querySelector('app-page-container');
      expect(pageContainer).toBeTruthy();
    });
  });

  describe('Table Display', () => {
    it('should render hover rows table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('[data-testid="hover-rows-table"]');
      expect(table).toBeTruthy();
      expect(table?.classList.contains('table-hover')).toBe(true);
    });

    it('should render bordered table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('[data-testid="bordered-table"]');
      expect(table).toBeTruthy();
      expect(table?.classList.contains('table-bordered')).toBe(true);
    });

    it('should render condensed table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('[data-testid="condensed-table"]');
      expect(table).toBeTruthy();
      expect(table?.classList.contains('table-condensed')).toBe(true);
    });

    it('should render striped rows table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('[data-testid="striped-rows-table"]');
      expect(table).toBeTruthy();
      expect(table?.classList.contains('table-striped')).toBe(true);
    });

    it('should render contextual table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('[data-testid="contextual-table"]');
      expect(table).toBeTruthy();
    });

    it('should render responsive table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('[data-testid="responsive-table"]');
      expect(table).toBeTruthy();
    });

    it('should display 6 panels for different table types', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panels = compiled.querySelectorAll('app-ba-panel');
      expect(panels.length).toBe(6);
    });
  });

  describe('Data Display Parity', () => {
    it('should display 5 browser metrics rows in hover table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('[data-testid="hover-rows-table"]');
      const rows = table?.querySelectorAll('tbody tr');
      expect(rows?.length).toBe(5);
    });

    it('should display correct browser names', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('[data-testid="hover-rows-table"]');
      const cells = table?.querySelectorAll('tbody tr td.nowrap');
      const browsers = Array.from(cells || []).map(cell => cell.textContent?.trim());
      expect(browsers).toContain('Google Chrome');
      expect(browsers).toContain('Mozilla Firefox');
      expect(browsers).toContain('Internet Explorer');
      expect(browsers).toContain('Safari');
      expect(browsers).toContain('Opera');
    });

    it('should display 5 people rows in condensed table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('[data-testid="condensed-table"]');
      const rows = table?.querySelectorAll('tbody tr');
      expect(rows?.length).toBe(5);
    });

    it('should display status buttons with correct classes', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('[data-testid="condensed-table"]');
      const buttons = table?.querySelectorAll('.status-button');
      expect(buttons?.length).toBe(5);
      const buttonClasses = Array.from(buttons || []).map(btn => btn.className);
      expect(buttonClasses.some(c => c.includes('btn-info'))).toBe(true);
      expect(buttonClasses.some(c => c.includes('btn-primary'))).toBe(true);
      expect(buttonClasses.some(c => c.includes('btn-success'))).toBe(true);
      expect(buttonClasses.some(c => c.includes('btn-danger'))).toBe(true);
      expect(buttonClasses.some(c => c.includes('btn-warning'))).toBe(true);
    });

    it('should display 10 rows in striped table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('[data-testid="striped-rows-table"]');
      const rows = table?.querySelectorAll('tbody tr');
      expect(rows?.length).toBe(10);
    });

    it('should display contextual rows with correct color classes', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('[data-testid="contextual-table"]');
      const rows = table?.querySelectorAll('tr');
      const rowClasses = Array.from(rows || []).map(row => row.className);
      expect(rowClasses.some(c => c.includes('primary'))).toBe(true);
      expect(rowClasses.some(c => c.includes('success'))).toBe(true);
      expect(rowClasses.some(c => c.includes('warning'))).toBe(true);
      expect(rowClasses.some(c => c.includes('danger'))).toBe(true);
      expect(rowClasses.some(c => c.includes('info'))).toBe(true);
    });

    it('should have email links in tables', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const emailLinks = compiled.querySelectorAll('a.email-link');
      expect(emailLinks.length).toBeGreaterThan(0);
      const firstLink = emailLinks[0] as HTMLAnchorElement;
      expect(firstLink.href).toContain('mailto:');
    });
  });

  describe('Visual Elements Parity', () => {
    it('should display up/down arrows for metrics', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const upIcons = compiled.querySelectorAll('.icon-up');
      const downIcons = compiled.querySelectorAll('.icon-down');
      expect(upIcons.length).toBeGreaterThan(0);
      expect(downIcons.length).toBeGreaterThan(0);
    });

    it('should have browser icons in hover and bordered tables', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const hoverTable = compiled.querySelector('[data-testid="hover-rows-table"]');
      const borderedTable = compiled.querySelector('[data-testid="bordered-table"]');
      const hoverImages = hoverTable?.querySelectorAll('img');
      const borderedImages = borderedTable?.querySelectorAll('img');
      expect(hoverImages?.length).toBe(5);
      expect(borderedImages?.length).toBe(5);
    });

    it('should have vertical scroll container for striped table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const stripedTable = compiled.querySelector('[data-testid="striped-rows-table"]');
      const scrollContainer = stripedTable?.closest('.vertical-scroll');
      expect(scrollContainer).toBeTruthy();
    });

    it('should have table-responsive wrapper for responsive table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const responsiveTable = compiled.querySelector('[data-testid="responsive-table"]');
      const wrapper = responsiveTable?.closest('.table-responsive');
      expect(wrapper).toBeTruthy();
    });
  });
});
