import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlainTextPipe, ProfilePicturePipe } from '../../../../theme';
import { MailMessage, MailMessagesService } from '../mail-messages.service';
import { MailTabService } from '../mail-tab.service';

@Component({
  selector: 'app-mail-list',
  standalone: true,
  imports: [DatePipe, RouterLink, NgbDropdownModule, PlainTextPipe, ProfilePicturePipe],
  templateUrl: './mail-list.component.html',
})
export class MailListComponent {
  readonly label = signal('');
  readonly messages = signal<MailMessage[]>([]);
  readonly tab = inject(MailTabService);
  private readonly messagesService = inject(MailMessagesService);

  constructor(route: ActivatedRoute, destroyRef: DestroyRef) {
    route.paramMap.pipe(takeUntilDestroyed(destroyRef)).subscribe((params) => {
      const label = params.get('label') ?? '';
      this.label.set(label);
      this.messages.set(this.messagesService.getMessagesByLabel(label));
    });
  }
}
