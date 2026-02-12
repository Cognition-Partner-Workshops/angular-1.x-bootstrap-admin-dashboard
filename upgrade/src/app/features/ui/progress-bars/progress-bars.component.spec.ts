import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarsComponent } from './progress-bars.component';
import { provideRouter } from '@angular/router';

describe('ProgressBarsComponent', () => {
  let component: ProgressBarsComponent;
  let fixture: ComponentFixture<ProgressBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarsComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Panel rendering', () => {
    it('should render Basic panel', () => {
      const panel = fixture.nativeElement.querySelector('[data-testid="panel-basic"]');
      expect(panel).toBeTruthy();
      expect(panel.querySelector('.panel-heading').textContent).toBe('Basic');
    });

    it('should render With label panel', () => {
      const panel = fixture.nativeElement.querySelector('[data-testid="panel-label"]');
      expect(panel).toBeTruthy();
      expect(panel.querySelector('.panel-heading').textContent).toBe('With label');
    });

    it('should render Striped panel', () => {
      const panel = fixture.nativeElement.querySelector('[data-testid="panel-striped"]');
      expect(panel).toBeTruthy();
      expect(panel.querySelector('.panel-heading').textContent).toBe('Striped');
    });

    it('should render Animated panel', () => {
      const panel = fixture.nativeElement.querySelector('[data-testid="panel-animated"]');
      expect(panel).toBeTruthy();
      expect(panel.querySelector('.panel-heading').textContent).toBe('Animated');
    });

    it('should render Stacked panel', () => {
      const panel = fixture.nativeElement.querySelector('[data-testid="panel-stacked"]');
      expect(panel).toBeTruthy();
      expect(panel.querySelector('.panel-heading').textContent).toBe('Stacked');
    });
  });

  describe('Basic progress bars', () => {
    it('should render success progress bar at 40%', () => {
      const progressBar = fixture.nativeElement.querySelector('[data-testid="progress-basic-success"] .progress-bar');
      expect(progressBar).toBeTruthy();
      expect(progressBar.classList.contains('progress-bar-success')).toBeTrue();
      expect(progressBar.style.width).toBe('40%');
      expect(progressBar.getAttribute('aria-valuenow')).toBe('40');
    });

    it('should render info progress bar at 20%', () => {
      const progressBar = fixture.nativeElement.querySelector('[data-testid="progress-basic-info"] .progress-bar');
      expect(progressBar).toBeTruthy();
      expect(progressBar.classList.contains('progress-bar-info')).toBeTrue();
      expect(progressBar.style.width).toBe('20%');
    });

    it('should render warning progress bar at 60%', () => {
      const progressBar = fixture.nativeElement.querySelector('[data-testid="progress-basic-warning"] .progress-bar');
      expect(progressBar).toBeTruthy();
      expect(progressBar.classList.contains('progress-bar-warning')).toBeTrue();
      expect(progressBar.style.width).toBe('60%');
    });

    it('should render danger progress bar at 80%', () => {
      const progressBar = fixture.nativeElement.querySelector('[data-testid="progress-basic-danger"] .progress-bar');
      expect(progressBar).toBeTruthy();
      expect(progressBar.classList.contains('progress-bar-danger')).toBeTrue();
      expect(progressBar.style.width).toBe('80%');
    });
  });

  describe('Labeled progress bars', () => {
    it('should display visible labels', () => {
      const progressBar = fixture.nativeElement.querySelector('[data-testid="progress-label-success"] .progress-bar');
      expect(progressBar.textContent.trim()).toContain('40% Complete (success)');
    });
  });

  describe('Striped progress bars', () => {
    it('should have striped class', () => {
      const progressBar = fixture.nativeElement.querySelector('[data-testid="progress-striped-success"] .progress-bar');
      expect(progressBar.classList.contains('progress-bar-striped')).toBeTrue();
    });
  });

  describe('Animated progress bars', () => {
    it('should have striped and active classes', () => {
      const progressBar = fixture.nativeElement.querySelector('[data-testid="progress-animated-success"] .progress-bar');
      expect(progressBar.classList.contains('progress-bar-striped')).toBeTrue();
      expect(progressBar.classList.contains('active')).toBeTrue();
    });
  });

  describe('Stacked progress bar', () => {
    it('should contain multiple progress bar segments', () => {
      const stackedProgress = fixture.nativeElement.querySelector('[data-testid="progress-stacked"]');
      const segments = stackedProgress.querySelectorAll('.progress-bar');
      expect(segments.length).toBe(4);
    });

    it('should have correct segment widths', () => {
      const stackedProgress = fixture.nativeElement.querySelector('[data-testid="progress-stacked"]');
      const segments = stackedProgress.querySelectorAll('.progress-bar');
      expect(segments[0].style.width).toBe('35%');
      expect(segments[1].style.width).toBe('20%');
      expect(segments[2].style.width).toBe('10%');
      expect(segments[3].style.width).toBe('20%');
    });

    it('should have mixed styles in stacked bar', () => {
      const stackedProgress = fixture.nativeElement.querySelector('[data-testid="progress-stacked"]');
      const segments = stackedProgress.querySelectorAll('.progress-bar');
      expect(segments[0].classList.contains('progress-bar-success')).toBeTrue();
      expect(segments[1].classList.contains('progress-bar-warning')).toBeTrue();
      expect(segments[1].classList.contains('progress-bar-striped')).toBeTrue();
      expect(segments[2].classList.contains('progress-bar-danger')).toBeTrue();
      expect(segments[3].classList.contains('progress-bar-info')).toBeTrue();
      expect(segments[3].classList.contains('active')).toBeTrue();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes on progress bars', () => {
      const progressBar = fixture.nativeElement.querySelector('[data-testid="progress-basic-success"] .progress-bar');
      expect(progressBar.getAttribute('role')).toBe('progressbar');
      expect(progressBar.getAttribute('aria-valuemin')).toBe('0');
      expect(progressBar.getAttribute('aria-valuemax')).toBe('100');
    });

    it('should have sr-only text for basic progress bars', () => {
      const srOnly = fixture.nativeElement.querySelector('[data-testid="progress-basic-success"] .sr-only');
      expect(srOnly).toBeTruthy();
      expect(srOnly.textContent).toContain('40% Complete');
    });
  });
});
