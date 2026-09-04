import { Injectable, inject, signal } from '@angular/core';
import { ComposeModalService } from './compose-box/compose-modal.service';
import { MailMessagesService } from './mail-messages.service';

@Injectable()
export class MailTabService {
  readonly navigationCollapsed = signal(true);
  readonly tabs = inject(MailMessagesService).getTabs();
  private readonly composeModal = inject(ComposeModalService);

  toggleNavigation(): void {
    this.navigationCollapsed.update((collapsed) => !collapsed);
  }

  showCompose(subject: string, to: string, text: string): void {
    this.composeModal.open({ subject, to, text });
  }
}
