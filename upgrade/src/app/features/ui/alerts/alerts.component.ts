import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Alert {
  id: string;
  type: 'success' | 'info' | 'warning' | 'danger';
  title: string;
  message: string;
  visible: boolean;
}

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent {
  basicAlerts: Alert[] = [
    { id: 'basic-success', type: 'success', title: 'Well done!', message: 'You successfully read this important alert message.', visible: true },
    { id: 'basic-info', type: 'info', title: 'Heads up!', message: "This alert needs your attention, but it's not super important.", visible: true },
    { id: 'basic-warning', type: 'warning', title: 'Warning!', message: "Better check yourself, you're not looking too good.", visible: true },
    { id: 'basic-danger', type: 'danger', title: 'Oh snap!', message: 'Change a few things up and try submitting again.', visible: true }
  ];

  dismissibleAlerts: Alert[] = [
    { id: 'dismiss-success', type: 'success', title: 'Well done!', message: 'You successfully read this important alert message.', visible: true },
    { id: 'dismiss-info', type: 'info', title: 'Heads up!', message: "This alert needs your attention, but it's not super important.", visible: true },
    { id: 'dismiss-warning', type: 'warning', title: 'Warning!', message: "Better check yourself, you're not looking too good.", visible: true },
    { id: 'dismiss-danger', type: 'danger', title: 'Oh snap!', message: 'Change a few things up and try submitting again.', visible: true }
  ];

  linkAlerts: Alert[] = [
    { id: 'link-success', type: 'success', title: 'Well done!', message: 'You successfully read <a href class="alert-link">this important alert message</a>.', visible: true },
    { id: 'link-info', type: 'info', title: 'Heads up!', message: 'This <a href class="alert-link">alert needs your attention</a>, but it\'s not super important.', visible: true },
    { id: 'link-warning', type: 'warning', title: 'Warning!', message: 'Better check yourself, you\'re <a href class="alert-link">not looking too good</a>.', visible: true },
    { id: 'link-danger', type: 'danger', title: 'Oh snap!', message: '<a href class="alert-link">Change a few things up</a> and try submitting again.', visible: true }
  ];

  dismissAlert(alertId: string): void {
    const alert = this.dismissibleAlerts.find(a => a.id === alertId);
    if (alert) {
      alert.visible = false;
    }
  }

  getAlertClass(type: string): string {
    return `alert bg-${type}`;
  }
}
