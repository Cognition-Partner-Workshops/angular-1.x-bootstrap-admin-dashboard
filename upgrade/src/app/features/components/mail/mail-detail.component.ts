import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MailMessagesService, MailMessage } from './mail-messages.service';
import { MailComponent } from './mail.component';

@Component({
  selector: 'app-mail-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './mail-detail.component.html',
  styleUrl: './mail-detail.component.scss'
})
export class MailDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly mailMessagesService = inject(MailMessagesService);
  readonly mailComponent = inject(MailComponent);

  mail: MailMessage | undefined;
  label = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.label = params['label'] || 'inbox';
      const id = params['id'];
      if (id) {
        this.mail = this.mailMessagesService.getMessageById(id);
      }
    });
  }

  getProfilePicture(): string {
    return this.mailMessagesService.getProfilePicture();
  }

  getFirstName(name: string): string {
    return name.split(' ')[0];
  }

  getLastName(name: string): string {
    return name.split(' ')[1] || '';
  }

  toggleNavigation(): void {
    this.mailComponent.navigationCollapsed = !this.mailComponent.navigationCollapsed;
  }

  reply(): void {
    if (this.mail) {
      this.mailComponent.showCompose(this.mail.subject, this.mail.email, '');
    }
  }

  forward(): void {
    if (this.mail) {
      this.mailComponent.showCompose(this.mail.subject, '', this.mail.body);
    }
  }
}
