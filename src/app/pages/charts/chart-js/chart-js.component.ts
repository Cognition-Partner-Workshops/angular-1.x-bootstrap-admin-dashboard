import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-chart-js',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './chart-js.component.html',
})
export class ChartJsComponent {}
