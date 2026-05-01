import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-map-bubbles',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './map-bubbles.component.html',
})
export class MapBubblesComponent {}
