import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MailMessagesService, MailMessage } from './mail-messages.service';
import { MailComponent } from './mail.component';

@Component({
  selector: 'app-mail-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './mail-list.component.html',
  styleUrl: './mail-list.component.scss'
})
export class MailListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly mailMessagesService = inject(MailMessagesService);
  readonly mailComponent = inject(MailComponent);

  messages: MailMessage[] = [];
  label = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.label = params['label'] || 'inbox';
      this.messages = this.mailMessagesService.getMessagesByLabel(this.label);
    });
  }

  getProfilePicture(): string {
    return this.mailMessagesService.getProfilePicture();
  }

  getPlainText(html: string): string {
    return this.mailMessagesService.stripHtml(html);
  }

  toggleNavigation(): void {
    this.mailComponent.navigationCollapsed = !this.mailComponent.navigationCollapsed;
  }
}
