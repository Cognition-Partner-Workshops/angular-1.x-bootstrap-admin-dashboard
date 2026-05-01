import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ba-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="panel ba-panel" [ngClass]="panelClass">
      @if (title) {
        <div class="panel-heading clearfix">
          <h3 class="panel-title">{{ title }}</h3>
        </div>
      }
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .ba-panel {
      background: #ffffff;
      border-radius: 5px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 24px;
      border: none;
    }

    .panel-heading {
      padding: 15px 22px;
      border-bottom: 1px solid #e8e8e8;
    }

    .panel-title {
      font-size: 16px;
      font-weight: 300;
      color: #666;
      margin: 0;
    }

    .panel-body {
      padding: 15px 22px;
    }

    .medium-panel .panel-body {
      min-height: 250px;
    }
  `],
})
export class BaPanelComponent {
  @Input() title = '';
  @Input() panelClass = '';
}
