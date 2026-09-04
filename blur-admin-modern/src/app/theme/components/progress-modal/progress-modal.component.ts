import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaProgressModalService } from '../../services/ba-progress-modal.service';

@Component({
  selector: 'ba-progress-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="modal-body">
      <svg class="center-block progress-bar-round" width="200" height="200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="#F8F8FF" stroke-width="8"/>
        <circle cx="100" cy="100" r="90" fill="none" id="loader" class=""
                stroke="#209e91" stroke-width="8"
                [attr.stroke-dasharray]="progress() / 100 * 2 * pi * 90 + ',20000'"
                transform="rotate(-90,100,100)" stroke-linecap="round"/>
        <text text-anchor="middle" class="loading" x="100" y="90">Loading...</text>
        <text class="percentage" text-anchor="middle" x="100" y="130">{{ progress() }}%</text>
      </svg>
    </div>
    <div class="modal-footer"></div>
  `,
  styles: '.modal-body { text-align: center; }',
})
export class ProgressModalComponent {
  private readonly progressService = inject(BaProgressModalService);
  readonly progress = this.progressService.progress;
  readonly pi = Math.PI;
}
