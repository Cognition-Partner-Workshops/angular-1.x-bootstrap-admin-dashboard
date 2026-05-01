import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Notification {
  userId?: number;
  image?: string;
  template: string;
  time: string;
}

interface Message {
  userId: number;
  text: string;
  time: string;
}

@Component({
  selector: 'app-msg-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './msg-center.component.html',
  styleUrl: './msg-center.component.scss',
})
export class MsgCenterComponent {
  activeTab: 'notifications' | 'messages' = 'notifications';
  isOpen = false;

  users: Record<number, { name: string }> = {
    0: { name: 'Vlad' },
    1: { name: 'Kostya' },
    2: { name: 'Andrey' },
    3: { name: 'Nasta' },
  };

  notifications: Notification[] = [
    { userId: 0, template: '&name posted a new article.', time: '1 min ago' },
    { userId: 1, template: '&name changed his contact information.', time: '2 hrs ago' },
    { image: 'assets/img/shopping-cart.svg', template: 'New orders received.', time: '5 hrs ago' },
    { userId: 2, template: '&name replied to your comment.', time: '1 day ago' },
    { userId: 3, template: "Today is &name's birthday.", time: '2 days ago' },
    { userId: 1, template: '&name invited you to join the event.', time: '1 week ago' },
  ];

  messages: Message[] = [
    { userId: 3, text: 'After you get up and running, you can place Font Awesome icons just about...', time: '1 min ago' },
    { userId: 0, text: 'You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.', time: '2 hrs ago' },
    { userId: 1, text: "Want to request new icons? Here's how. Need vectors or want to use on the...", time: '10 hrs ago' },
    { userId: 2, text: 'Explore your passions and discover new ones by getting involved. Stretch your...', time: '1 day ago' },
    { userId: 3, text: 'Get to know who we are - from the inside out. From our history and culture, to the...', time: '1 day ago' },
    { userId: 1, text: 'Need some support to reach your goals? Apply for scholarships across a variety of...', time: '2 days ago' },
  ];

  constructor(private sanitizer: DomSanitizer, private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  getNotificationText(notification: Notification): SafeHtml {
    let text = notification.template;
    if (notification.userId !== undefined) {
      text = text.replace('&name', `<strong>${this.users[notification.userId].name}</strong>`);
    }
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  getProfilePicture(userId: number): string {
    return `assets/img/app/profile/${this.users[userId].name}.png`;
  }
}
