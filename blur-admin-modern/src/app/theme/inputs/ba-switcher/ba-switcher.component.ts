import { Component, input, model } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ba-switcher',
  standalone: true,
  imports: [NgClass],
  template: `
    <label class="switcher-container">
      <input type="checkbox" [checked]="switcherValue()" (change)="toggle($event)">
      <div class="switcher" [ngClass]="switcherStyle()">
        <div class="handle-container">
          <span class="handle handle-on">ON</span>
          <span class="handle"></span>
          <span class="handle handle-off">OFF</span>
        </div>
      </div>
    </label>
  `,
})
export class BaSwitcherComponent {
  readonly switcherStyle = input('');
  readonly switcherValue = model(false);

  toggle(event: Event): void {
    this.switcherValue.set((event.target as HTMLInputElement).checked);
  }
}
