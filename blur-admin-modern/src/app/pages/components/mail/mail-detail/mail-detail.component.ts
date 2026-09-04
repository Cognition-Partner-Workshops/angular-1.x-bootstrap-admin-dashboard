import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfilePicturePipe } from '../../../../theme';
import { MailMessage, MailMessagesService } from '../mail-messages.service';
import { MailTabService } from '../mail-tab.service';

@Component({
  selector: 'app-mail-detail',
  standalone: true,
  imports: [DatePipe, RouterLink, ProfilePicturePipe],
  templateUrl: './mail-detail.component.html',
})
export class MailDetailComponent {
  readonly label = signal('');
  readonly mail = signal<MailMessage | undefined>(undefined);
  readonly tab = inject(MailTabService);
  private readonly messages = inject(MailMessagesService);

  constructor(route: ActivatedRoute, destroyRef: DestroyRef) {
    route.paramMap.pipe(takeUntilDestroyed(destroyRef)).subscribe((params) => {
      this.label.set(params.get('label') ?? '');
      this.mail.set(this.messages.getMessageById(params.get('id') ?? ''));
    });
  }
}
