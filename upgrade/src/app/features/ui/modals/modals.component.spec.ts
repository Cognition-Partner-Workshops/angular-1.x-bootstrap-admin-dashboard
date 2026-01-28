import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalsComponent } from './modals.component';
import { ModalService } from '../../../shared/components/modal';
import { NotificationService } from '../../../shared/components/notification';
import { BasicModalComponent } from './modal-templates/basic-modal.component';
import { MessageModalComponent } from './modal-templates/message-modal.component';
import { ProgressModalComponent } from './progress-modal/progress-modal.component';

describe('ModalsComponent', () => {
  let component: ModalsComponent;
  let fixture: ComponentFixture<ModalsComponent>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    modalServiceSpy = jasmine.createSpyObj('ModalService', ['open']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success', 'info', 'warning', 'error']);

    await TestBed.configureTestingModule({
      imports: [ModalsComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Route Reachability (Parity Test)', () => {
    it('should render the modals page with data-testid', () => {
      const pageElement = fixture.debugElement.query(By.css('[data-testid="modals-page"]'));
      expect(pageElement).toBeTruthy();
    });

    it('should render all four panels', () => {
      const modalsPanel = fixture.debugElement.query(By.css('[data-testid="modals-panel"]'));
      const messageModalsPanel = fixture.debugElement.query(By.css('[data-testid="message-modals-panel"]'));
      const notificationsPanel = fixture.debugElement.query(By.css('[data-testid="notifications-panel"]'));
      const progressDialogsPanel = fixture.debugElement.query(By.css('[data-testid="progress-dialogs-panel"]'));

      expect(modalsPanel).toBeTruthy();
      expect(messageModalsPanel).toBeTruthy();
      expect(notificationsPanel).toBeTruthy();
      expect(progressDialogsPanel).toBeTruthy();
    });
  });

  describe('Modal Open/Close Tests (Parity Test)', () => {
    it('should open default modal with medium size', () => {
      component.openModal('medium');
      expect(modalServiceSpy.open).toHaveBeenCalledWith(
        BasicModalComponent,
        jasmine.objectContaining({
          size: 'medium',
          title: 'Modal title',
          closable: true
        })
      );
    });

    it('should open large modal', () => {
      component.openModal('large');
      expect(modalServiceSpy.open).toHaveBeenCalledWith(
        BasicModalComponent,
        jasmine.objectContaining({
          size: 'large',
          title: 'Large Modal',
          closable: true
        })
      );
    });

    it('should open small modal', () => {
      component.openModal('small');
      expect(modalServiceSpy.open).toHaveBeenCalledWith(
        BasicModalComponent,
        jasmine.objectContaining({
          size: 'small',
          title: 'Small Modal',
          closable: true
        })
      );
    });

    it('should have default modal button', () => {
      const defaultBtn = fixture.debugElement.query(By.css('[data-testid="default-modal-btn"]'));
      expect(defaultBtn).toBeTruthy();
      expect(defaultBtn.nativeElement.textContent.trim()).toContain('Default modal');
    });

    it('should have large modal button', () => {
      const largeBtn = fixture.debugElement.query(By.css('[data-testid="large-modal-btn"]'));
      expect(largeBtn).toBeTruthy();
      expect(largeBtn.nativeElement.textContent.trim()).toContain('Large modal');
    });

    it('should have small modal button', () => {
      const smallBtn = fixture.debugElement.query(By.css('[data-testid="small-modal-btn"]'));
      expect(smallBtn).toBeTruthy();
      expect(smallBtn.nativeElement.textContent.trim()).toContain('Small modal');
    });

    it('should trigger openModal when default modal button is clicked', () => {
      spyOn(component, 'openModal');
      const defaultBtn = fixture.debugElement.query(By.css('[data-testid="default-modal-btn"]'));
      defaultBtn.nativeElement.click();
      expect(component.openModal).toHaveBeenCalledWith('medium');
    });
  });

  describe('Message Modal Tests (Parity Test)', () => {
    it('should open success message modal with correct config', () => {
      component.openMessageModal('success');
      expect(modalServiceSpy.open).toHaveBeenCalledWith(
        MessageModalComponent,
        jasmine.objectContaining({
          size: 'small',
          closable: false,
          data: jasmine.objectContaining({
            type: 'success',
            title: 'Success',
            message: 'Your information has been saved successfully',
            icon: 'ion-checkmark'
          })
        })
      );
    });

    it('should open info message modal with correct config', () => {
      component.openMessageModal('info');
      expect(modalServiceSpy.open).toHaveBeenCalledWith(
        MessageModalComponent,
        jasmine.objectContaining({
          data: jasmine.objectContaining({
            type: 'info',
            title: 'Information',
            message: "You've got a new email!",
            icon: 'ion-information-circled'
          })
        })
      );
    });

    it('should open warning message modal with correct config', () => {
      component.openMessageModal('warning');
      expect(modalServiceSpy.open).toHaveBeenCalledWith(
        MessageModalComponent,
        jasmine.objectContaining({
          data: jasmine.objectContaining({
            type: 'warning',
            title: 'Warning',
            message: 'Your computer is about to explode!',
            icon: 'ion-android-warning'
          })
        })
      );
    });

    it('should open danger message modal with correct config', () => {
      component.openMessageModal('danger');
      expect(modalServiceSpy.open).toHaveBeenCalledWith(
        MessageModalComponent,
        jasmine.objectContaining({
          data: jasmine.objectContaining({
            type: 'danger',
            title: 'Error',
            message: "Your information hasn't been saved!",
            icon: 'ion-flame'
          })
        })
      );
    });

    it('should have all message modal buttons', () => {
      const successBtn = fixture.debugElement.query(By.css('[data-testid="success-message-btn"]'));
      const infoBtn = fixture.debugElement.query(By.css('[data-testid="info-message-btn"]'));
      const warningBtn = fixture.debugElement.query(By.css('[data-testid="warning-message-btn"]'));
      const dangerBtn = fixture.debugElement.query(By.css('[data-testid="danger-message-btn"]'));

      expect(successBtn).toBeTruthy();
      expect(infoBtn).toBeTruthy();
      expect(warningBtn).toBeTruthy();
      expect(dangerBtn).toBeTruthy();
    });
  });

  describe('Notification Tests (Parity Test)', () => {
    it('should show success notification with correct message', () => {
      component.showSuccessNotification();
      expect(notificationServiceSpy.success).toHaveBeenCalledWith('Your information has been saved successfully!');
    });

    it('should show info notification with correct title and message', () => {
      component.showInfoNotification();
      expect(notificationServiceSpy.info).toHaveBeenCalledWith('Information', "You've got a new email!");
    });

    it('should show warning notification with correct title and message', () => {
      component.showWarningNotification();
      expect(notificationServiceSpy.warning).toHaveBeenCalledWith('Warning', 'Your computer is about to explode!');
    });

    it('should show error notification with correct title and message', () => {
      component.showErrorNotification();
      expect(notificationServiceSpy.error).toHaveBeenCalledWith('Error', "Your information hasn't been saved!");
    });

    it('should have all notification buttons', () => {
      const successBtn = fixture.debugElement.query(By.css('[data-testid="success-notification-btn"]'));
      const infoBtn = fixture.debugElement.query(By.css('[data-testid="info-notification-btn"]'));
      const warningBtn = fixture.debugElement.query(By.css('[data-testid="warning-notification-btn"]'));
      const dangerBtn = fixture.debugElement.query(By.css('[data-testid="danger-notification-btn"]'));

      expect(successBtn).toBeTruthy();
      expect(infoBtn).toBeTruthy();
      expect(warningBtn).toBeTruthy();
      expect(dangerBtn).toBeTruthy();
    });

    it('should trigger notification when button is clicked', () => {
      spyOn(component, 'showSuccessNotification');
      const successBtn = fixture.debugElement.query(By.css('[data-testid="success-notification-btn"]'));
      successBtn.nativeElement.click();
      expect(component.showSuccessNotification).toHaveBeenCalled();
    });
  });

  describe('Progress Modal Tests (Parity Test)', () => {
    it('should open progress dialog', () => {
      component.openProgressDialog();
      expect(modalServiceSpy.open).toHaveBeenCalledWith(
        ProgressModalComponent,
        jasmine.objectContaining({
          size: 'small',
          closable: false
        })
      );
    });

    it('should have progress dialog button', () => {
      const progressBtn = fixture.debugElement.query(By.css('[data-testid="progress-dialog-btn"]'));
      expect(progressBtn).toBeTruthy();
      expect(progressBtn.nativeElement.textContent.trim()).toContain('Progress dialog');
    });

    it('should trigger openProgressDialog when button is clicked', () => {
      spyOn(component, 'openProgressDialog');
      const progressBtn = fixture.debugElement.query(By.css('[data-testid="progress-dialog-btn"]'));
      progressBtn.nativeElement.click();
      expect(component.openProgressDialog).toHaveBeenCalled();
    });
  });

  describe('Button Styling (Parity Test)', () => {
    it('should have correct button classes for modal buttons', () => {
      const defaultBtn = fixture.debugElement.query(By.css('[data-testid="default-modal-btn"]'));
      const largeBtn = fixture.debugElement.query(By.css('[data-testid="large-modal-btn"]'));
      const smallBtn = fixture.debugElement.query(By.css('[data-testid="small-modal-btn"]'));

      expect(defaultBtn.nativeElement.classList.contains('btn-primary')).toBeTrue();
      expect(largeBtn.nativeElement.classList.contains('btn-success')).toBeTrue();
      expect(smallBtn.nativeElement.classList.contains('btn-warning')).toBeTrue();
    });

    it('should have correct button classes for message modal buttons', () => {
      const successBtn = fixture.debugElement.query(By.css('[data-testid="success-message-btn"]'));
      const infoBtn = fixture.debugElement.query(By.css('[data-testid="info-message-btn"]'));
      const warningBtn = fixture.debugElement.query(By.css('[data-testid="warning-message-btn"]'));
      const dangerBtn = fixture.debugElement.query(By.css('[data-testid="danger-message-btn"]'));

      expect(successBtn.nativeElement.classList.contains('btn-success')).toBeTrue();
      expect(infoBtn.nativeElement.classList.contains('btn-info')).toBeTrue();
      expect(warningBtn.nativeElement.classList.contains('btn-warning')).toBeTrue();
      expect(dangerBtn.nativeElement.classList.contains('btn-danger')).toBeTrue();
    });
  });
});
