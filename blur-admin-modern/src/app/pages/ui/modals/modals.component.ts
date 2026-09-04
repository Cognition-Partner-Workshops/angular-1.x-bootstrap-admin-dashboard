import { Component, OnDestroy } from '@angular/core';
import { BaPanelComponent, BaProgressModalService } from '../../../theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasicModalComponent } from './modal-templates/basic-modal.component';
import { MessageModalComponent, MessageModalKind } from './modal-templates/message-modal.component';
import { NotificationsWidgetComponent } from './notifications/notifications-widget.component';

@Component({
  selector: 'app-modals',
  standalone: true,
  imports: [BaPanelComponent, NotificationsWidgetComponent],
  templateUrl: './modals.component.html',
  styleUrl: './modals.component.scss',
})
export class ModalsComponent implements OnDestroy {
  private progressTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly modal: NgbModal,
    private readonly progressModal: BaProgressModalService,
  ) {}

  open(size: 'md' | 'lg' | 'sm'): void {
    const options = size === 'md' ? { animation: true } : { animation: true, size };
    this.modal.open(BasicModalComponent, options);
  }

  openMessage(kind: MessageModalKind): void {
    const messages: Record<MessageModalKind, { icon: string; heading: string; message: string }> = {
      success: { icon: 'ion-checkmark', heading: 'Success', message: 'Your information has been saved successfully' },
      info: { icon: 'ion-information-circled', heading: 'Information', message: "You've got a new email!" },
      warning: { icon: 'ion-android-warning', heading: 'Warning', message: 'Your computer is about to explode!' },
      danger: { icon: 'ion-flame', heading: 'Error', message: "Your information hasn't been saved!" },
    };
    const ref = this.modal.open(MessageModalComponent);
    Object.assign(ref.componentInstance, { kind, ...messages[kind] });
  }

  openProgressDialog(): void {
    this.progressModal.setProgress(0);
    this.progressModal.open();
    const step = (): void => {
      if (this.progressModal.getProgress() >= 100) {
        this.progressModal.close();
      } else {
        this.progressModal.setProgress(this.progressModal.getProgress() + 10);
        this.progressTimer = setTimeout(step, 300);
      }
    };
    step();
  }

  ngOnDestroy(): void {
    if (this.progressTimer !== undefined) {
      clearTimeout(this.progressTimer);
    }
  }
}
