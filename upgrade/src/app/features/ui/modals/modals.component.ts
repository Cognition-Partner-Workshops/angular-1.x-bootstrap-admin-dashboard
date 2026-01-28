import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../shared/components/modal';
import { NotificationService } from '../../../shared/components/notification';
import { BasicModalComponent } from './modal-templates/basic-modal.component';
import { MessageModalComponent } from './modal-templates/message-modal.component';
import { ProgressModalComponent } from './progress-modal/progress-modal.component';

export type ModalSize = 'small' | 'medium' | 'large';
export type MessageType = 'success' | 'info' | 'warning' | 'danger';

@Component({
  selector: 'app-modals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modals.component.html',
  styleUrl: './modals.component.scss'
})
export class ModalsComponent {
  private modalService = inject(ModalService);
  private notificationService = inject(NotificationService);

  openModal(size: ModalSize): void {
    const sizeMap: Record<ModalSize, 'small' | 'medium' | 'large'> = {
      'small': 'small',
      'medium': 'medium',
      'large': 'large'
    };

    const titleMap: Record<ModalSize, string> = {
      'small': 'Small Modal',
      'medium': 'Modal title',
      'large': 'Large Modal'
    };

    this.modalService.open(BasicModalComponent, {
      size: sizeMap[size],
      title: titleMap[size],
      closable: true
    });
  }

  openMessageModal(type: MessageType): void {
    const config: Record<MessageType, { title: string; message: string; icon: string }> = {
      'success': {
        title: 'Success',
        message: 'Your information has been saved successfully',
        icon: 'ion-checkmark'
      },
      'info': {
        title: 'Information',
        message: "You've got a new email!",
        icon: 'ion-information-circled'
      },
      'warning': {
        title: 'Warning',
        message: 'Your computer is about to explode!',
        icon: 'ion-android-warning'
      },
      'danger': {
        title: 'Error',
        message: "Your information hasn't been saved!",
        icon: 'ion-flame'
      }
    };

    this.modalService.open(MessageModalComponent, {
      size: 'small',
      closable: false,
      data: {
        type,
        ...config[type]
      }
    });
  }

  showSuccessNotification(): void {
    this.notificationService.success('Your information has been saved successfully!');
  }

  showInfoNotification(): void {
    this.notificationService.info('Information', "You've got a new email!");
  }

  showWarningNotification(): void {
    this.notificationService.warning('Warning', 'Your computer is about to explode!');
  }

  showErrorNotification(): void {
    this.notificationService.error('Error', "Your information hasn't been saved!");
  }

  openProgressDialog(): void {
    this.modalService.open(ProgressModalComponent, {
      size: 'small',
      closable: false
    });
  }
}
