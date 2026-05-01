import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-chartist',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './chartist.component.html',
})
export class ChartistComponent {}
