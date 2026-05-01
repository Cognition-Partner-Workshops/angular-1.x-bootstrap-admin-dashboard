import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './alerts.component.html',
})
export class AlertsComponent {}
