import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

interface AlertItem {
  type: string;
  message: string;
  visible: boolean;
}

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  template: `
    <app-ba-panel title="Alerts">
      @for (alert of alerts; track alert.type) {
        @if (alert.visible) {
          <div class="alert" [ngClass]="'alert-' + alert.type" role="alert">
            <button type="button" class="btn-close float-end" (click)="alert.visible = false"></button>
            <strong>{{ alert.type | titlecase }}!</strong> {{ alert.message }}
          </div>
        }
      }
      <button class="btn btn-primary btn-sm" (click)="resetAlerts()">Reset Alerts</button>
    </app-ba-panel>

    <app-ba-panel title="Dismissible Alerts">
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Well done!</strong> You successfully read this important alert message.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
      <div class="alert alert-info alert-dismissible fade show" role="alert">
        <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    </app-ba-panel>
  `,
})
export class AlertsComponent {
  alerts: AlertItem[] = [
    { type: 'success', message: 'You successfully read this important alert message.', visible: true },
    { type: 'info', message: 'This alert needs your attention, but it is not super important.', visible: true },
    { type: 'warning', message: 'Better check yourself, you are not looking too good.', visible: true },
    { type: 'danger', message: 'Change a few things up and try submitting again.', visible: true },
  ];

  resetAlerts(): void {
    this.alerts.forEach((a) => (a.visible = true));
  }
}
