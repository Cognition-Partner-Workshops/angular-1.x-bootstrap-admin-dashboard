import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="panel" [ngClass]="panelClass">
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
})
export class PanelComponent {
  @Input() title = '';
  @Input() panelClass = '';
}
