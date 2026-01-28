import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast, ToastPosition, ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss'
})
export class ToastContainerComponent {
  toasts: Toast[] = [];
  positionClass: ToastPosition = 'toast-top-right';
  toastService!: ToastService;

  getToastClass(toast: Toast): string {
    return `toast toast-${toast.type}`;
  }

  onToastClick(toast: Toast): void {
    this.toastService.onToastClick(toast);
  }

  onCloseClick(event: Event, toast: Toast): void {
    event.stopPropagation();
    this.toastService.clear(toast);
  }

  onMouseEnter(toast: Toast): void {
    this.toastService.pauseTimeout(toast);
  }

  onMouseLeave(toast: Toast): void {
    this.toastService.resumeTimeout(toast);
  }

  hasCloseButton(toast: Toast): boolean {
    return toast.options?.closeButton ?? false;
  }

  hasProgressBar(toast: Toast): boolean {
    return toast.options?.progressBar ?? false;
  }

  allowsHtml(toast: Toast): boolean {
    return toast.options?.allowHtml ?? false;
  }

  trackById(_index: number, toast: Toast): string {
    return toast.id;
  }
}
