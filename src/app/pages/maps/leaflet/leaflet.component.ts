import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-leaflet',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './leaflet.component.html',
})
export class LeafletComponent {}
