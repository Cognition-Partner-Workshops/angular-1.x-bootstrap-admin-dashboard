import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './grid.component.html',
})
export class GridComponent {}
