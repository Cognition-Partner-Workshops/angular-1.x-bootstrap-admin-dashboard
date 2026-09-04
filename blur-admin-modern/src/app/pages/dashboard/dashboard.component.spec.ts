import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [DashboardComponent] }).compileComponents());
  it('creates and renders the placeholder', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Dashboard placeholder');
  });
});
