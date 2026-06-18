import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FeedItem {
  type: 'image' | 'video' | 'text' | 'location';
  icon: string;
  author: string;
  time: string;
  message: string;
  image?: string;
}

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="feed-container">
      @for (item of feedItems; track $index) {
        <div class="feed-message">
          <div class="feed-icon" [ngClass]="'icon-' + item.type">
            <i [class]="item.icon"></i>
          </div>
          <div class="feed-content">
            <span class="feed-author">{{ item.author }}</span>
            <span class="feed-text">{{ item.message }}</span>
            @if (item.image) {
              <div class="feed-image">
                <img [src]="item.image" alt="feed image">
              </div>
            }
            <div class="message-time">{{ item.time }}</div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .feed-container { max-height: 500px; overflow-y: auto; }
    .feed-message {
      display: flex; padding: 12px 0; border-bottom: 1px solid #f0f0f0;
    }
    .feed-icon {
      width: 36px; height: 36px; border-radius: 50%; display: flex;
      align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;
      i { color: #fff; font-size: 14px; }
    }
    .icon-image { background-color: #209e91; }
    .icon-video { background-color: #e85656; }
    .icon-text { background-color: #2dacd1; }
    .icon-location { background-color: #dfb81c; }
    .feed-content { flex: 1; }
    .feed-author { font-weight: 700; color: #333; margin-right: 5px; }
    .feed-text { color: #666; font-size: 13px; }
    .feed-image { margin-top: 8px; img { max-width: 100%; border-radius: 4px; } }
    .message-time { color: #999; font-size: 12px; margin-top: 4px; }
  `],
})
export class FeedComponent {
  feedItems: FeedItem[] = [
    { type: 'image', icon: 'fa fa-image', author: 'Nasta', time: '21 min ago', message: 'added new image' },
    { type: 'video', icon: 'fa fa-video-camera', author: 'Andrey', time: '46 min ago', message: 'added new video: "Vader and Me"' },
    { type: 'location', icon: 'fa fa-map-marker', author: 'Vlad', time: '2 hrs ago', message: 'checked in at "New York, NY"' },
    { type: 'text', icon: 'fa fa-comment', author: 'Nasta', time: '3 hrs ago', message: 'posted new message: "Genome project  a life changing discovery which will..."' },
    { type: 'image', icon: 'fa fa-image', author: 'Kostya', time: '6 hrs ago', message: 'changed his profile picture' },
    { type: 'text', icon: 'fa fa-comment', author: 'Andrey', time: '8 hrs ago', message: 'posted a new article about Angular development' },
    { type: 'video', icon: 'fa fa-video-camera', author: 'Nick', time: '12 hrs ago', message: 'shared a video about modern web design' },
  ];
}
