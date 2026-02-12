import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProgressButtonComponent } from './progress-button.component';
import { provideRouter } from '@angular/router';

describe('ProgressButtonComponent', () => {
  let component: ProgressButtonComponent;
  let fixture: ComponentFixture<ProgressButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressButtonComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (component['animationInterval']) {
      clearInterval(component['animationInterval']);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant as primary', () => {
    expect(component.variant).toBe('primary');
  });

  it('should have default pbStyle as fill', () => {
    expect(component.pbStyle).toBe('fill');
  });

  it('should have default pbDirection as horizontal', () => {
    expect(component.pbDirection).toBe('horizontal');
  });

  it('should not be loading initially', () => {
    expect(component.isLoading).toBeFalse();
  });

  it('should not be complete initially', () => {
    expect(component.isComplete).toBeFalse();
  });

  it('should have 0 progress initially', () => {
    expect(component.progress).toBe(0);
  });

  describe('Progress Animation', () => {
    it('should start loading on click', () => {
      component.onClick();
      expect(component.isLoading).toBeTrue();
    });

    it('should increment progress during animation', fakeAsync(() => {
      component.onClick();
      tick(100);
      expect(component.progress).toBeGreaterThan(0);
      
      if (component['animationInterval']) {
        clearInterval(component['animationInterval']);
      }
    }));

    it('should complete after full duration', fakeAsync(() => {
      component.onClick();
      tick(3100);
      expect(component.progress).toBe(100);
      expect(component.isComplete).toBeTrue();
      
      tick(600);
      expect(component.isLoading).toBeFalse();
      expect(component.isComplete).toBeFalse();
      expect(component.progress).toBe(0);
    }));

    it('should not start new animation while loading', () => {
      component.onClick();
      const initialProgress = component.progress;
      component.onClick();
      expect(component.progress).toBe(initialProgress);
    });
  });

  describe('Button Classes', () => {
    it('should include btn class', () => {
      const classes = component.getButtonClasses();
      expect(classes).toContain('btn');
    });

    it('should include variant class', () => {
      component.variant = 'success';
      const classes = component.getButtonClasses();
      expect(classes).toContain('btn-success');
    });

    it('should include progress-button class', () => {
      const classes = component.getButtonClasses();
      expect(classes).toContain('progress-button');
    });

    it('should include style class', () => {
      component.pbStyle = 'shrink';
      const classes = component.getButtonClasses();
      expect(classes).toContain('progress-button-style-shrink');
    });

    it('should include direction class', () => {
      component.pbDirection = 'vertical';
      const classes = component.getButtonClasses();
      expect(classes).toContain('progress-button-dir-vertical');
    });

    it('should include state-loading class when loading', () => {
      component.isLoading = true;
      const classes = component.getButtonClasses();
      expect(classes).toContain('state-loading');
    });

    it('should include state-success class when complete', () => {
      component.isComplete = true;
      const classes = component.getButtonClasses();
      expect(classes).toContain('state-success');
    });

    it('should include perspective class for rotate styles', () => {
      component.pbStyle = 'rotate-angle-bottom';
      const classes = component.getButtonClasses();
      expect(classes).toContain('progress-button-perspective');
    });
  });

  describe('Progress Style', () => {
    it('should return width style for horizontal direction', () => {
      component.pbDirection = 'horizontal';
      component.progress = 50;
      const style = component.getProgressStyle();
      expect(style['width']).toBe('50%');
    });

    it('should return height style for vertical direction', () => {
      component.pbDirection = 'vertical';
      component.progress = 75;
      const style = component.getProgressStyle();
      expect(style['height']).toBe('75%');
    });
  });

  describe('DOM Rendering', () => {
    it('should render button element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('should render content span', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const content = compiled.querySelector('.content');
      expect(content).toBeTruthy();
    });

    it('should render progress span', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const progress = compiled.querySelector('.progress');
      expect(progress).toBeTruthy();
    });

    it('should render progress-inner span', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const progressInner = compiled.querySelector('.progress-inner');
      expect(progressInner).toBeTruthy();
    });

    it('should disable button when loading', () => {
      component.isLoading = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('button') as HTMLButtonElement;
      expect(button.disabled).toBeTrue();
    });
  });
});
