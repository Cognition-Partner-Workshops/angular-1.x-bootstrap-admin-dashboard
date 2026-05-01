import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

interface ToastNotification {
  type: string;
  title: string;
  message: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  template: `
    <app-ba-panel title="Notifications">
      <p>Click buttons to show notifications. Previously used angular-toastr, now uses simple inline notifications.</p>
      <div class="notification-buttons">
        <button class="btn btn-success" (click)="showNotification('success', 'Success', 'Operation completed successfully!')">Success</button>
        <button class="btn btn-info" (click)="showNotification('info', 'Info', 'Here is some useful information.')">Info</button>
        <button class="btn btn-warning" (click)="showNotification('warning', 'Warning', 'Something needs your attention.')">Warning</button>
        <button class="btn btn-danger" (click)="showNotification('error', 'Error', 'Something went wrong!')">Error</button>
      </div>
    </app-ba-panel>

    <div class="toast-container">
      @for (toast of toasts; track $index) {
        <div class="toast-item" [ngClass]="'toast-' + toast.type">
          <div class="toast-header">
            <strong>{{ toast.title }}</strong>
            <button (click)="removeToast(toast)">&times;</button>
          </div>
          <div class="toast-body">{{ toast.message }}</div>
        </div>
      }
    </div>
  `,
  styles: [`
    .notification-buttons { display: flex; gap: 8px; flex-wrap: wrap; }
    .toast-container { position: fixed; top: 80px; right: 20px; z-index: 2000; }
    .toast-item {
      background: #fff; border-radius: 6px; box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      margin-bottom: 10px; min-width: 280px; animation: slideIn 0.3s ease;
    }
    .toast-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 12px; border-bottom: 1px solid #eee;
      button { background: none; border: none; font-size: 18px; cursor: pointer; }
    }
    .toast-body { padding: 10px 12px; font-size: 13px; color: #666; }
    .toast-success { border-left: 4px solid #90b900; }
    .toast-info { border-left: 4px solid #2dacd1; }
    .toast-warning { border-left: 4px solid #dfb81c; }
    .toast-error { border-left: 4px solid #e85656; }
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  `],
})
export class NotificationsComponent {
  toasts: ToastNotification[] = [];

  showNotification(type: string, title: string, message: string): void {
    const toast: ToastNotification = { type, title, message };
    this.toasts.push(toast);
    setTimeout(() => this.removeToast(toast), 5000);
  }

  removeToast(toast: ToastNotification): void {
    const idx = this.toasts.indexOf(toast);
    if (idx !== -1) this.toasts.splice(idx, 1);
  }
}
