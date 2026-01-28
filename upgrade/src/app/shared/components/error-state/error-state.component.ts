import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ErrorSeverity = 'error' | 'warning' | 'info';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.scss'
})
export class ErrorStateComponent {
  @Input() severity: ErrorSeverity = 'error';
  @Input() title = 'Something went wrong';
  @Input() message = '';
  @Input() errorCode = '';
  @Input() retryLabel = 'Try Again';
  @Input() showRetry = true;
  @Output() retryClick = new EventEmitter<void>();

  onRetryClick(): void {
    this.retryClick.emit();
  }

  getSeverityIcon(): string {
    const iconMap: Record<ErrorSeverity, string> = {
      error: '!',
      warning: '?',
      info: 'i'
    };
    return iconMap[this.severity];
  }
}
