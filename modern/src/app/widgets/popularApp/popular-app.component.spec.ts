import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularAppComponent } from './popular-app.component';

describe('PopularAppComponent', () => {
  let fixture: ComponentFixture<PopularAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularAppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(PopularAppComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the Super App card with cost and the three stats', () => {
    const text = ((fixture.nativeElement as HTMLElement).textContent ?? '').replace(/\u00a0/g, ' ');
    expect(text).toContain('Super App');
    expect(text).toContain('Most Popular App');
    expect(text).toContain('175$');
    expect(text).toContain('Total Visits');
    expect(text).toContain('47,512');
    expect(text).toContain('New Visits');
    expect(text).toContain('9,217');
    expect(text).toContain('Sales');
    expect(text).toContain('2,928');
  });
});
