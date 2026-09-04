import { Component } from '@angular/core';
import { OldSwitchComponent } from './old-switch.component';

@Component({
  selector: 'app-old-switches',
  standalone: true,
  imports: [OldSwitchComponent],
  templateUrl: './old-switches.component.html',
})
export class OldSwitchesComponent {}
