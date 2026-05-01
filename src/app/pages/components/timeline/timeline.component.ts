import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {}
