import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-progress-bars',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './progress-bars.component.html',
})
export class ProgressBarsComponent {}
