import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { DestroyRef, Component, computed, inject, input, signal, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[progressButton]',
  standalone: true,
  imports: [NgStyle, NgTemplateOutlet],
  template: `
    <ng-template #inner>
      <span class="content"><ng-content /></span>
      <span class="progress">
        <span class="progress-inner" [ngStyle]="progressStyles()" [class.notransition]="!allowTransition()"></span>
      </span>
    </ng-template>
    @if (perspective()) {
      <span class="progress-wrap"><ng-container *ngTemplateOutlet="inner" /></span>
    } @else {
      <ng-container *ngTemplateOutlet="inner" />
    }
  `,
  styleUrls: ['./progress-button.component.scss', './progress-button-styles.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '(click)': 'onClick()',
    '(transitionend)': 'onTransitionEnd($event)',
  },
})
export class ProgressButtonComponent {
  readonly progressButton = input.required<() => Promise<unknown>>();
  readonly pbStyle = input('fill');
  readonly pbDirection = input<string>();

  readonly disabled = signal(false);
  readonly loading = signal(false);
  readonly status = signal<'none' | 'success' | 'error'>('none');
  readonly allowTransition = signal(false);
  readonly progress = signal(0);
  readonly opacity = signal<number | undefined>(undefined);
  readonly style = computed(() => this.pbStyle());
  readonly direction = computed(() => this.style() === 'lateral-lines' ? 'vertical' : (this.pbDirection() ?? 'horizontal'));
  readonly perspective = computed(() => this.style().startsWith('rotate') || this.style().startsWith('flip-open'));

  private intervalId: ReturnType<typeof setInterval> | undefined;
  private timeoutId: ReturnType<typeof setTimeout> | undefined;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.clearTimers();
    });
  }

  hostClasses(): string {
    return [
      'progress-button',
      `progress-button-dir-${this.direction()}`,
      `progress-button-style-${this.style()}`,
      this.perspective() ? 'progress-button-perspective' : '',
      this.loading() ? 'state-loading' : '',
      this.status() === 'success' ? 'state-success' : '',
      this.status() === 'error' ? 'state-error' : '',
      this.disabled() ? 'disabled' : '',
    ].filter(Boolean).join(' ');
  }

  progressStyles(): Record<string, string | number> {
    const property = this.direction() === 'vertical' ? 'height' : 'width';
    const styles: Record<string, string | number> = {
      [property]: `${this.progress() * 100}%`,
    };
    const opacity = this.opacity();
    if (opacity !== undefined) {
      styles['opacity'] = opacity;
    }
    return styles;
  }

  onClick(): void {
    if (this.disabled()) {
      return;
    }
    this.disabled.set(true);
    this.loading.set(true);
    this.allowTransition.set(true);
    this.intervalId = setInterval(() => {
      this.progress.update((value) => value + (1 - value) * Math.random() * 0.5);
    }, 200);
    Promise.resolve(this.progressButton()()).then(
      () => {
        this.progress.set(1);
        this.clearInterval();
        this.doStop('success');
      },
      () => {
        this.clearInterval();
        this.doStop('error');
      },
    );
  }

  onTransitionEnd(event: TransitionEvent): void {
    if (event.propertyName !== 'opacity') {
      return;
    }
    this.allowTransition.set(false);
    this.progress.set(0);
    this.opacity.set(1);
  }

  private doStop(status: 'success' | 'error'): void {
    this.opacity.set(0);
    this.status.set(status);
    this.loading.set(false);
    this.timeoutId = setTimeout(() => {
      this.status.set('none');
      this.disabled.set(false);
    }, 1500);
  }

  private clearInterval(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private clearTimers(): void {
    this.clearInterval();
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
