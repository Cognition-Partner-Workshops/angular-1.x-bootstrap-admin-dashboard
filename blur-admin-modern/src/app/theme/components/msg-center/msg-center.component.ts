import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilePicturePipe } from '../../pipes/profile-picture.pipe';

interface User { name: string }
interface Notification { userId?: number; image?: string; template: string; time: string }
interface Message { userId: number; text: string; time: string }

@Component({
  selector: 'msg-center',
  standalone: true,
  imports: [NgbDropdownModule, ProfilePicturePipe],
  template: `
    <ul class="al-msg-center clearfix">
      <li ngbDropdown><a href="javascript:void(0)" ngbDropdownToggle><i class="fa fa-bell-o"></i><span>5</span><div class="notification-ring"></div></a>
        <div ngbDropdownMenu class="top-dropdown-menu"><i class="dropdown-arr"></i><div class="header clearfix"><strong>Notifications</strong><a href="javascript:void(0)">Mark All as Read</a><a href="javascript:void(0)">Settings</a></div>
          <div class="msg-list">@for (msg of notifications; track $index) {<a href="javascript:void(0)" class="clearfix"><div class="img-area"><img [src]="msg.image || (users[msg.userId!].name | profilePicture)" [class.photo-msg-item]="!msg.image"></div><div class="msg-area"><div [innerHTML]="getMessage(msg)"></div><span>{{ msg.time }}</span></div></a>}</div>
          <a href="javascript:void(0)">See all notifications</a>
        </div>
      </li>
      <li ngbDropdown><a href="javascript:void(0)" class="msg" ngbDropdownToggle><i class="fa fa-envelope-o"></i><span>5</span><div class="notification-ring"></div></a>
        <div ngbDropdownMenu class="top-dropdown-menu"><i class="dropdown-arr"></i><div class="header clearfix"><strong>Messages</strong><a href="javascript:void(0)">Mark All as Read</a><a href="javascript:void(0)">Settings</a></div>
          <div class="msg-list">@for (msg of messages; track $index) {<a href="javascript:void(0)" class="clearfix"><div class="img-area"><img class="photo-msg-item" [src]="users[msg.userId].name | profilePicture"></div><div class="msg-area"><div>{{ msg.text }}</div><span>{{ msg.time }}</span></div></a>}</div>
          <a href="javascript:void(0)">See all messages</a>
        </div>
      </li>
    </ul>
  `,
})
export class MsgCenterComponent {
  private readonly sanitizer = inject(DomSanitizer);
  readonly users: Record<number, User> = { 0: { name: 'Vlad' }, 1: { name: 'Kostya' }, 2: { name: 'Andrey' }, 3: { name: 'Nasta' } };
  readonly notifications: Notification[] = [
    { userId: 0, template: '&name posted a new article.', time: '1 min ago' },
    { userId: 1, template: '&name changed his contact information.', time: '2 hrs ago' },
    { image: 'assets/img/shopping-cart.svg', template: 'New orders received.', time: '5 hrs ago' },
    { userId: 2, template: '&name replied to your comment.', time: '1 day ago' },
    { userId: 3, template: "Today is &name's birthday.", time: '2 days ago' },
    { image: 'assets/img/comments.svg', template: 'New comments on your post.', time: '3 days ago' },
    { userId: 1, template: '&name invited you to join the event.', time: '1 week ago' },
  ];
  readonly messages: Message[] = [
    { userId: 3, text: 'After you get up and running, you can place Font Awesome icons just about...', time: '1 min ago' },
    { userId: 0, text: 'You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.', time: '2 hrs ago' },
    { userId: 1, text: "Want to request new icons? Here's how. Need vectors or want to use on the...", time: '10 hrs ago' },
    { userId: 2, text: 'Explore your passions and discover new ones by getting involved. Stretch your...', time: '1 day ago' },
    { userId: 3, text: 'Get to know who we are - from the inside out. From our history and culture, to the...', time: '1 day ago' },
    { userId: 1, text: 'Need some support to reach your goals? Apply for scholarships across a variety of...', time: '2 days ago' },
    { userId: 0, text: "Wrap the dropdown's trigger and the dropdown menu within .dropdown, or...", time: '1 week ago' },
  ];

  getMessage(msg: Notification): SafeHtml {
    const text = msg.userId === undefined ? msg.template : msg.template.replace('&name', `<strong>${this.users[msg.userId].name}</strong>`);
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
