import { Component, Input, OnInit, OnDestroy, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRef } from '../../../../shared/components/modal';

@Component({
  selector: 'app-progress-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" data-testid="progress-modal">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-body">
            <div class="progress-container" data-testid="progress-container">
              <svg class="progress-ring" viewBox="0 0 120 120">
                <circle
                  class="progress-ring-background"
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#e0e0e0"
                  stroke-width="8"
                />
                <circle
                  class="progress-ring-circle"
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#209e91"
                  stroke-width="8"
                  [attr.stroke-dasharray]="circumference"
                  [attr.stroke-dashoffset]="strokeDashoffset"
                  stroke-linecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div class="progress-text" data-testid="progress-text">{{ progress }}%</div>
            </div>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    }

    .modal-dialog {
      display: inline-block;
      text-align: center;
      margin: 0 auto;
    }

    .modal-sm {
      width: 200px;
    }

    .modal-content {
      border-radius: 5px;
      border: none;
      background-color: #fff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .modal-body {
      padding: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-footer {
      padding: 10px;
      border-top: none;
    }

    .progress-container {
      position: relative;
      width: 120px;
      height: 120px;
    }

    .progress-ring {
      width: 100%;
      height: 100%;
    }

    .progress-ring-circle {
      transition: stroke-dashoffset 0.3s ease;
    }

    .progress-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      font-weight: bold;
      color: #209e91;
    }
  `]
})
export class ProgressModalComponent implements OnInit, OnDestroy {
  @Input() modalRef!: ModalRef;
  
  private ngZone = inject(NgZone);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  progress = 0;
  readonly circumference = 2 * Math.PI * 54;

  get strokeDashoffset(): number {
    return this.circumference - (this.progress / 100) * this.circumference;
  }

  ngOnInit(): void {
    this.startProgress();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private startProgress(): void {
    this.ngZone.runOutsideAngular(() => {
      this.incrementProgress();
    });
  }

  private incrementProgress(): void {
    if (this.progress >= 100) {
      this.ngZone.run(() => {
        this.modalRef?.close();
      });
      return;
    }

    this.ngZone.run(() => {
      this.progress += 10;
    });

    this.timeoutId = setTimeout(() => {
      this.incrementProgress();
    }, 300);
  }
}
