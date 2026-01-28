import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-button.component.html',
  styleUrl: './progress-button.component.scss'
})
export class ProgressButtonComponent {
  @Input() variant = 'primary';
  @Input() pbStyle = 'fill';
  @Input() pbDirection = 'horizontal';

  isLoading = false;
  isComplete = false;
  progress = 0;

  private animationInterval: ReturnType<typeof setInterval> | null = null;

  onClick(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.isComplete = false;
    this.progress = 0;

    const duration = 3000;
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    this.animationInterval = setInterval(() => {
      this.progress += increment;
      if (this.progress >= 100) {
        this.progress = 100;
        if (this.animationInterval) {
          clearInterval(this.animationInterval);
          this.animationInterval = null;
        }
        this.isComplete = true;
        setTimeout(() => {
          this.isLoading = false;
          this.isComplete = false;
          this.progress = 0;
        }, 500);
      }
    }, intervalTime);
  }

  getButtonClasses(): string {
    const classes = ['btn', `btn-${this.variant}`, 'progress-button'];

    if (this.isLoading) {
      classes.push('state-loading');
    }
    if (this.isComplete) {
      classes.push('state-success');
    }

    classes.push(`progress-button-style-${this.pbStyle}`);
    classes.push(`progress-button-dir-${this.pbDirection}`);

    const perspectiveStyles = [
      'rotate-angle-bottom', 'rotate-angle-top', 'rotate-angle-left', 'rotate-angle-right',
      'rotate-side-down', 'rotate-side-up', 'rotate-side-left', 'rotate-side-right',
      'rotate-back', 'flip-open'
    ];
    if (perspectiveStyles.includes(this.pbStyle)) {
      classes.push('progress-button-perspective');
    }

    return classes.join(' ');
  }

  getProgressStyle(): Record<string, string> {
    if (this.pbDirection === 'vertical') {
      return { height: `${this.progress}%` };
    }
    return { width: `${this.progress}%` };
  }
}
