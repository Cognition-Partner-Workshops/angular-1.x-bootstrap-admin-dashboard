import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-old-switch',
  standalone: true,
  template: `<div class="switch-container {{ color() }}"><label class="bootstrap-switch form-switch"><input type="checkbox" class="form-check-input" [checked]="value()" (change)="value.set($any($event.target).checked)"><span></span></label></div>`,
})
export class OldSwitchComponent {
  readonly color = input('primary');
  readonly value = model(true);
}
