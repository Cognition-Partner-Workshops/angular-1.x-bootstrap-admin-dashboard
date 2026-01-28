import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render page container with title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const pageContainer = compiled.querySelector('app-page-container');
    expect(pageContainer).toBeTruthy();
  });

  it('should render grid sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const gridHeaders = compiled.querySelectorAll('.grid-h');
    expect(gridHeaders.length).toBe(7);
  });

  it('should render stacked to horizontal section with 12 columns', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstRow = compiled.querySelector('.show-grid');
    const cols = firstRow?.querySelectorAll('.col-md-1');
    expect(cols?.length).toBe(12);
  });

  it('should render grid options table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const table = compiled.querySelector('.table');
    expect(table).toBeTruthy();
  });

  it('should have responsive table wrapper', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableResponsive = compiled.querySelector('.table-responsive');
    expect(tableResponsive).toBeTruthy();
  });

  it('should render offsetting columns section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const offsetCols = compiled.querySelectorAll('.col-md-offset-3');
    expect(offsetCols.length).toBeGreaterThan(0);
  });
});
