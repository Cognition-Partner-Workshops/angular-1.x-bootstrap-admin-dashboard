import { Component } from '@angular/core';
import { BaPanelComponent } from '../../../theme';

@Component({
  selector: 'app-progress-bars',
  standalone: true,
  imports: [BaPanelComponent],
  templateUrl: './progress-bars.component.html',
  styleUrl: './progress-bars.component.scss',
})
export class ProgressBarsComponent {}
