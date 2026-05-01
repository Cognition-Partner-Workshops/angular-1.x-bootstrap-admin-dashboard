import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

interface MailMessage {
  id: number;
  from: string;
  subject: string;
  date: string;
  body: string;
  label: string;
  read: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [CommonModule, FormsModule, BaPanelComponent],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.scss',
})
export class MailComponent {
  activeLabel = 'inbox';
  selectedMessage: MailMessage | null = null;
  showCompose = false;
  composeText = '';

  labels = ['inbox', 'sent', 'drafts', 'spam', 'trash'];

  messages: MailMessage[] = [
    { id: 1, from: 'John Snow', subject: 'Winter is coming', date: '2 hrs ago', body: 'Hey, just wanted to let you know that winter is coming. Prepare your castles and armies.', label: 'inbox', read: false, selected: false },
    { id: 2, from: 'Cersei Lannister', subject: 'Debt to pay', date: '5 hrs ago', body: 'A Lannister always pays his debts. Do not forget our agreement.', label: 'inbox', read: true, selected: false },
    { id: 3, from: 'Arya Stark', subject: 'List update', date: '1 day ago', body: 'I have updated my list. Let me know if you want any changes.', label: 'inbox', read: true, selected: false },
    { id: 4, from: 'Tyrion', subject: 'Wine tasting invitation', date: '2 days ago', body: 'I am organizing a wine tasting event. Please join me at the usual place.', label: 'inbox', read: true, selected: false },
    { id: 5, from: 'Daenerys', subject: 'Dragons update', date: '3 days ago', body: 'The dragons are growing well. I expect they will be ready for battle soon.', label: 'inbox', read: false, selected: false },
  ];

  get filteredMessages(): MailMessage[] {
    return this.messages.filter((m) => m.label === this.activeLabel);
  }

  openMessage(msg: MailMessage): void {
    msg.read = true;
    this.selectedMessage = msg;
    this.showCompose = false;
  }

  backToList(): void {
    this.selectedMessage = null;
  }

  openCompose(): void {
    this.showCompose = true;
    this.selectedMessage = null;
  }
}
