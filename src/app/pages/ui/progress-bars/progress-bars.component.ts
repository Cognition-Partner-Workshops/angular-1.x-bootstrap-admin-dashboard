import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-progress-bars',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  template: `
    <div class="row">
      <div class="col-lg-6">
        <app-ba-panel title="Basic Progress Bars">
          @for (bar of basicBars; track bar.label) {
            <div class="mb-3">
              <small>{{ bar.label }}</small>
              <div class="progress">
                <div class="progress-bar" [ngClass]="'bg-' + bar.type" [style.width.%]="bar.value" role="progressbar">
                  {{ bar.value }}%
                </div>
              </div>
            </div>
          }
        </app-ba-panel>
      </div>
      <div class="col-lg-6">
        <app-ba-panel title="Striped Progress Bars">
          @for (bar of basicBars; track bar.label) {
            <div class="mb-3">
              <small>{{ bar.label }}</small>
              <div class="progress">
                <div class="progress-bar progress-bar-striped" [ngClass]="'bg-' + bar.type" [style.width.%]="bar.value" role="progressbar">
                  {{ bar.value }}%
                </div>
              </div>
            </div>
          }
        </app-ba-panel>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <app-ba-panel title="Animated Progress Bars">
          @for (bar of basicBars; track bar.label) {
            <div class="mb-3">
              <small>{{ bar.label }}</small>
              <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" [ngClass]="'bg-' + bar.type" [style.width.%]="bar.value" role="progressbar">
                  {{ bar.value }}%
                </div>
              </div>
            </div>
          }
        </app-ba-panel>
      </div>
      <div class="col-lg-6">
        <app-ba-panel title="Stacked Progress Bar">
          <div class="progress">
            <div class="progress-bar bg-success" style="width: 35%">35%</div>
            <div class="progress-bar bg-warning" style="width: 20%">20%</div>
            <div class="progress-bar bg-danger" style="width: 10%">10%</div>
          </div>
        </app-ba-panel>
      </div>
    </div>
  `,
})
export class ProgressBarsComponent {
  basicBars = [
    { label: 'Primary', type: 'primary', value: 60 },
    { label: 'Success', type: 'success', value: 35 },
    { label: 'Info', type: 'info', value: 20 },
    { label: 'Warning', type: 'warning', value: 50 },
    { label: 'Danger', type: 'danger', value: 85 },
  ];
}
