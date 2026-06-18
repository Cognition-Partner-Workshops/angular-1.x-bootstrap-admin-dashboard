import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PopularApp {
  name: string;
  icon: string;
  color: string;
  cost: string;
  downloads: string;
}

@Component({
  selector: 'app-popular-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="popular-app-container">
      <h4 class="popular-app-header">Popular App</h4>
      @for (app of apps; track app.name) {
        <div class="popular-app-row">
          <div class="app-icon" [style.background-color]="app.color">
            <i [class]="app.icon"></i>
          </div>
          <div class="app-info">
            <div class="app-name">{{ app.name }}</div>
            <div class="app-downloads">{{ app.downloads }} downloads</div>
          </div>
          <div class="app-cost">{{ app.cost }}</div>
        </div>
      }
    </div>
  `,
  styles: [`
    .popular-app-container { padding: 10px 0; }
    .popular-app-header { font-size: 16px; font-weight: 300; margin-bottom: 16px; color: #666; }
    .popular-app-row {
      display: flex; align-items: center; padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .app-icon {
      width: 40px; height: 40px; border-radius: 50%; display: flex;
      align-items: center; justify-content: center; margin-right: 12px;
      i { color: #fff; font-size: 16px; }
    }
    .app-info { flex: 1; }
    .app-name { font-size: 14px; color: #333; }
    .app-downloads { font-size: 12px; color: #999; }
    .app-cost { font-size: 14px; font-weight: 700; color: #209e91; }
  `],
})
export class PopularAppComponent {
  apps: PopularApp[] = [
    { name: 'Admin App', icon: 'fa fa-cog', color: '#209e91', cost: 'Free', downloads: '1,245' },
    { name: 'Cloud Storage', icon: 'fa fa-cloud', color: '#2dacd1', cost: '$2.99', downloads: '983' },
    { name: 'Photo Editor', icon: 'fa fa-camera', color: '#90b900', cost: '$1.99', downloads: '756' },
    { name: 'Calendar Pro', icon: 'fa fa-calendar', color: '#dfb81c', cost: 'Free', downloads: '620' },
    { name: 'Mail Client', icon: 'fa fa-envelope', color: '#e85656', cost: '$4.99', downloads: '541' },
  ];
}
