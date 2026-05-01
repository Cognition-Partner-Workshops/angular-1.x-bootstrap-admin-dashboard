import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3 class="popular-app-header">Popular App</h3>
    <div class="popular-app-list">
      @for (app of apps; track app.name) {
        <div class="popular-app-item">
          <div class="app-icon" [style.background]="app.color">
            <i [class]="app.icon"></i>
          </div>
          <div class="app-info">
            <span class="app-name">{{ app.name }}</span>
            <span class="app-count">{{ app.users }} users</span>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .popular-app-header {
      font-size: 16px;
      font-weight: 300;
      color: #666;
      margin: 0 0 15px;
    }
    .popular-app-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    .app-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      i { color: #fff; font-size: 18px; }
    }
    .app-name { display: block; font-size: 13px; color: #666; }
    .app-count { font-size: 11px; color: #999; }
  `],
})
export class PopularAppComponent {
  apps = [
    { name: 'Gmail', icon: 'fa fa-envelope', color: '#e85656', users: '14,520' },
    { name: 'Twitter', icon: 'fa fa-twitter', color: '#2dacd1', users: '10,200' },
    { name: 'Facebook', icon: 'fa fa-facebook', color: '#3b5998', users: '8,100' },
    { name: 'GitHub', icon: 'fa fa-github', color: '#333', users: '7,350' },
    { name: 'Slack', icon: 'fa fa-slack', color: '#90b900', users: '5,300' },
  ];
}
