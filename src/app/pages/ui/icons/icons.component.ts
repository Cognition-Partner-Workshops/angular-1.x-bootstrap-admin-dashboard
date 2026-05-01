import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  template: `
    <app-ba-panel title="Font Awesome Icons">
      <div class="row icon-grid">
        @for (icon of fontAwesomeIcons; track icon) {
          <div class="col-md-3 col-sm-4 col-6 icon-item">
            <i [class]="'fa ' + icon"></i>
            <span>{{ icon }}</span>
          </div>
        }
      </div>
    </app-ba-panel>
  `,
  styles: [`
    .icon-grid { margin-top: 10px; }
    .icon-item {
      padding: 10px;
      font-size: 13px;
      color: #666;
      i { width: 30px; text-align: center; font-size: 16px; margin-right: 8px; }
    }
  `],
})
export class IconsComponent {
  fontAwesomeIcons = [
    'fa-home', 'fa-user', 'fa-cog', 'fa-search', 'fa-envelope', 'fa-heart',
    'fa-star', 'fa-check', 'fa-times', 'fa-plus', 'fa-minus', 'fa-pencil',
    'fa-trash', 'fa-download', 'fa-upload', 'fa-refresh', 'fa-lock', 'fa-unlock',
    'fa-bell', 'fa-calendar', 'fa-camera', 'fa-cloud', 'fa-comment', 'fa-globe',
    'fa-map-marker', 'fa-music', 'fa-phone', 'fa-print', 'fa-rocket', 'fa-shield',
    'fa-shopping-cart', 'fa-signal', 'fa-tag', 'fa-trophy', 'fa-wrench', 'fa-bolt',
  ];
}
