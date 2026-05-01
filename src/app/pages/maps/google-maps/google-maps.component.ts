import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './google-maps.component.html',
})
export class GoogleMapsComponent {}
