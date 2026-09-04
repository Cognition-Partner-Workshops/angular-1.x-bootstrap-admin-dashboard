import { Component } from '@angular/core';
import { BaSwitcherComponent } from '../../../../../theme';

@Component({
  selector: 'app-switches',
  standalone: true,
  imports: [BaSwitcherComponent],
  templateUrl: './switches.component.html',
})
export class SwitchesComponent {
  switches = { s1: true, s2: false, s3: true, s4: true, s5: false };
}
