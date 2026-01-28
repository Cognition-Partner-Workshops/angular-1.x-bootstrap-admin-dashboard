import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService, Notification } from './notification.service';

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-container.component.html',
  styleUrl: './notification-container.component.scss'
})
export class NotificationContainerComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private destroy$ = new Subject<void>();
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.notificationService.getNotifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe(notifications => {
        this.notifications = notifications;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  dismiss(id: string): void {
    this.notificationService.dismiss(id);
  }

  getTypeIcon(type: string): string {
    const iconMap: Record<string, string> = {
      success: 'Y',
      error: 'X',
      warning: '!',
      info: 'i'
    };
    return iconMap[type] || 'i';
  }

  trackById(_index: number, notification: Notification): string {
    return notification.id;
  }
}
