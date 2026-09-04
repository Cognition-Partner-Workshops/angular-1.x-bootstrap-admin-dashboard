import { Component } from '@angular/core';
import { BaPanelComponent } from '../../../theme';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [BaPanelComponent],
  templateUrl: './alerts.component.html',
})
export class AlertsComponent {
  dismissed: Record<string, boolean> = {};

  dismiss(key: string): void {
    this.dismissed[key] = true;
  }
}
