import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NotificationsComponent } from './notifications.component';
import { ToastService } from './toast.service';
import { provideRouter } from '@angular/router';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsComponent, FormsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  afterEach(() => {
    toastService.clear();
    const container = document.getElementById('toast-container-wrapper');
    if (container) {
      container.remove();
    }
  });

  describe('Route Reachability', () => {
    it('should create the notifications component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the notifications page', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const page = compiled.querySelector('[data-testid="notifications-page"]');
      expect(page).toBeTruthy();
    });

    it('should have the notification panel with correct structure', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('.notification-panel');
      expect(panel).toBeTruthy();
      expect(panel?.classList.contains('panel')).toBeTrue();
    });
  });

  describe('Toast Configuration Options', () => {
    it('should have default options matching legacy behavior', () => {
      expect(component.options.autoDismiss).toBeFalse();
      expect(component.options.positionClass).toBe('toast-top-right');
      expect(component.options.type).toBe('info');
      expect(component.options.timeOut).toBe('5000');
      expect(component.options.extendedTimeOut).toBe('2000');
      expect(component.options.allowHtml).toBeFalse();
      expect(component.options.closeButton).toBeFalse();
      expect(component.options.tapToDismiss).toBeTrue();
      expect(component.options.progressBar).toBeFalse();
      expect(component.options.newestOnTop).toBeTrue();
      expect(component.options.maxOpened).toBe(0);
      expect(component.options.preventDuplicates).toBeFalse();
      expect(component.options.preventOpenDuplicates).toBeFalse();
      expect(component.options.title).toBe('Some title here');
      expect(component.options.msg).toBe('Type your message here');
    });

    it('should have 4 toast types', () => {
      expect(component.types).toEqual(['success', 'error', 'info', 'warning']);
    });

    it('should have 8 position options', () => {
      expect(component.positionOptions.length).toBe(8);
      const positions = component.positionOptions.map(p => p.value);
      expect(positions).toContain('toast-top-right');
      expect(positions).toContain('toast-bottom-right');
      expect(positions).toContain('toast-bottom-left');
      expect(positions).toContain('toast-top-left');
      expect(positions).toContain('toast-top-full-width');
      expect(positions).toContain('toast-bottom-full-width');
      expect(positions).toContain('toast-top-center');
      expect(positions).toContain('toast-bottom-center');
    });

    it('should have 8 quotes for random toasts', () => {
      expect(component.quotes.length).toBe(8);
    });
  });

  describe('Form Controls', () => {
    it('should render title input', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const titleInput = compiled.querySelector('[data-testid="title-input"]');
      expect(titleInput).toBeTruthy();
    });

    it('should render message textarea', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const messageInput = compiled.querySelector('[data-testid="message-input"]');
      expect(messageInput).toBeTruthy();
    });

    it('should render all checkbox options', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="close-button-checkbox"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="allow-html-checkbox"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="progress-bar-checkbox"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="prevent-duplicates-checkbox"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="prevent-open-duplicates-checkbox"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="tap-to-dismiss-checkbox"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="newest-on-top-checkbox"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="auto-dismiss-checkbox"]')).toBeTruthy();
    });

    it('should render toast type radio buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="type-success-radio"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="type-info-radio"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="type-warning-radio"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="type-error-radio"]')).toBeTruthy();
    });

    it('should render position radio buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="position-toast-top-right-radio"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="position-toast-bottom-right-radio"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="position-toast-bottom-left-radio"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="position-toast-top-left-radio"]')).toBeTruthy();
    });

    it('should render timeout inputs', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="timeout-input"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="extended-timeout-input"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="max-opened-input"]')).toBeTruthy();
    });

    it('should render result display area', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const resultDisplay = compiled.querySelector('[data-testid="result-display"]');
      expect(resultDisplay).toBeTruthy();
    });
  });

  describe('Action Buttons', () => {
    it('should render all action buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="open-toast-button"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="random-toast-button"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="clear-toasts-button"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="clear-last-toast-button"]')).toBeTruthy();
    });

    it('should have correct button labels', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="open-toast-button"]')?.textContent).toContain('Open Toast');
      expect(compiled.querySelector('[data-testid="random-toast-button"]')?.textContent).toContain('Random Toast');
      expect(compiled.querySelector('[data-testid="clear-toasts-button"]')?.textContent).toContain('Clear Toasts');
      expect(compiled.querySelector('[data-testid="clear-last-toast-button"]')?.textContent).toContain('Clear Last Toast');
    });
  });

  describe('Toast Display', () => {
    it('should open a toast when Open Toast button is clicked', fakeAsync(() => {
      const compiled = fixture.nativeElement as HTMLElement;
      const openButton = compiled.querySelector('[data-testid="open-toast-button"]') as HTMLButtonElement;

      openButton.click();
      fixture.detectChanges();
      tick(100);

      const toasts = toastService.getToasts();
      expect(toasts.length).toBe(1);
      expect(toasts[0].type).toBe('info');
      expect(toasts[0].title).toBe('Some title here');
      expect(toasts[0].message).toBe('Type your message here');
    }));

    it('should open a random toast when Random Toast button is clicked', fakeAsync(() => {
      const compiled = fixture.nativeElement as HTMLElement;
      const randomButton = compiled.querySelector('[data-testid="random-toast-button"]') as HTMLButtonElement;

      randomButton.click();
      fixture.detectChanges();
      tick(100);

      const toasts = toastService.getToasts();
      expect(toasts.length).toBe(1);
      expect(component.types).toContain(toasts[0].type);
    }));

    it('should clear all toasts when Clear Toasts button is clicked', fakeAsync(() => {
      component.openToast();
      component.openToast();
      tick(100);
      expect(toastService.getToasts().length).toBe(2);

      const compiled = fixture.nativeElement as HTMLElement;
      const clearButton = compiled.querySelector('[data-testid="clear-toasts-button"]') as HTMLButtonElement;
      clearButton.click();
      fixture.detectChanges();
      tick(100);

      expect(toastService.getToasts().length).toBe(0);
    }));

    it('should clear last toast when Clear Last Toast button is clicked', fakeAsync(() => {
      component.openToast();
      component.openToast();
      tick(100);
      expect(toastService.getToasts().length).toBe(2);

      const compiled = fixture.nativeElement as HTMLElement;
      const clearLastButton = compiled.querySelector('[data-testid="clear-last-toast-button"]') as HTMLButtonElement;
      clearLastButton.click();
      fixture.detectChanges();
      tick(100);

      expect(toastService.getToasts().length).toBe(1);
    }));

    it('should update result display when toast is opened', fakeAsync(() => {
      component.openToast();
      fixture.detectChanges();
      tick(100);

      expect(component.optionsStr).toContain('toastr.info');
      expect(component.optionsStr).toContain('Type your message here');
      expect(component.optionsStr).toContain('Some title here');
    }));
  });

  describe('Toast Types and Styles', () => {
    it('should create success toast with correct type', fakeAsync(() => {
      component.options.type = 'success';
      component.openToast();
      tick(100);

      const toasts = toastService.getToasts();
      expect(toasts[0].type).toBe('success');
    }));

    it('should create error toast with correct type', fakeAsync(() => {
      component.options.type = 'error';
      component.openToast();
      tick(100);

      const toasts = toastService.getToasts();
      expect(toasts[0].type).toBe('error');
    }));

    it('should create warning toast with correct type', fakeAsync(() => {
      component.options.type = 'warning';
      component.openToast();
      tick(100);

      const toasts = toastService.getToasts();
      expect(toasts[0].type).toBe('warning');
    }));

    it('should create info toast with correct type', fakeAsync(() => {
      component.options.type = 'info';
      component.openToast();
      tick(100);

      const toasts = toastService.getToasts();
      expect(toasts[0].type).toBe('info');
    }));
  });

  describe('Toast Position', () => {
    it('should set toast position class correctly', fakeAsync(() => {
      component.options.positionClass = 'toast-bottom-left';
      component.openToast();
      tick(100);

      const config = toastService.getConfig();
      expect(config.positionClass).toBe('toast-bottom-left');
    }));
  });

  describe('Toast Options', () => {
    it('should apply close button option', fakeAsync(() => {
      component.options.closeButton = true;
      component.openToast();
      tick(100);

      const toasts = toastService.getToasts();
      expect(toasts[0].options?.closeButton).toBeTrue();
    }));

    it('should apply progress bar option', fakeAsync(() => {
      component.options.progressBar = true;
      component.openToast();
      tick(100);

      const toasts = toastService.getToasts();
      expect(toasts[0].options?.progressBar).toBeTrue();
    }));

    it('should apply allow HTML option', fakeAsync(() => {
      component.options.allowHtml = true;
      component.openToast();
      tick(100);

      const toasts = toastService.getToasts();
      expect(toasts[0].options?.allowHtml).toBeTrue();
    }));
  });

  describe('Cleanup', () => {
    it('should clear toasts on component destroy', fakeAsync(() => {
      component.openToast();
      tick(100);
      expect(toastService.getToasts().length).toBe(1);

      component.ngOnDestroy();
      expect(toastService.getToasts().length).toBe(0);
    }));
  });
});
