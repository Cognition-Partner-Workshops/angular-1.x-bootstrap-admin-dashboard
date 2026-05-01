import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-map-lines',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './map-lines.component.html',
})
export class MapLinesComponent {}
