import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BaPanelComponent } from '../../../shared/components';
import { MailMessagesService, MailTab } from './mail-messages.service';
import { ComposeModalComponent } from './compose-modal.component';
import { ModalService } from '../../../shared/components/modal/modal.service';

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, BaPanelComponent],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.scss'
})
export class MailComponent {
  private readonly mailMessagesService = inject(MailMessagesService);
  private readonly modalService = inject(ModalService);

  navigationCollapsed = true;
  tabs: MailTab[] = this.mailMessagesService.getTabs();

  showCompose(subject = '', to = '', text = ''): void {
    this.modalService.open(ComposeModalComponent, {
      size: 'large',
      data: { subject, to, text }
    });
  }

  toggleNavigation(): void {
    this.navigationCollapsed = !this.navigationCollapsed;
  }
}
