import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardMapComponent } from './dashboard-map.component';

describe('DashboardMapComponent', () => {
  let fixture: ComponentFixture<DashboardMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMapComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardMapComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the chart host element', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.dashboard-map__chart')).toBeTruthy();
  });

  it('should render a 4-entry legend with the legacy titles', () => {
    const el = fixture.nativeElement as HTMLElement;
    const items = el.querySelectorAll('.dashboard-map__legend-item');
    expect(items.length).toBe(4);
    const text = el.textContent ?? '';
    expect(text).toContain('over 1 000 users');
    expect(text).toContain('500 - 1 000 users');
    expect(text).toContain('100 - 500 users');
    expect(text).toContain('0 - 100 users');
  });
});
