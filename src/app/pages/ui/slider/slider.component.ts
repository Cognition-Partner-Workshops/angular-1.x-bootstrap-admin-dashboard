import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, FormsModule, BaPanelComponent],
  template: `
    <app-ba-panel title="Range Sliders">
      <div class="row">
        <div class="col-md-6 mb-4">
          <label>Basic slider: {{ basicValue }}</label>
          <input type="range" class="form-range" min="0" max="100" [(ngModel)]="basicValue">
        </div>
        <div class="col-md-6 mb-4">
          <label>Step slider (step=10): {{ stepValue }}</label>
          <input type="range" class="form-range" min="0" max="100" step="10" [(ngModel)]="stepValue">
        </div>
        <div class="col-md-6 mb-4">
          <label>Min-Max slider (20-80): {{ minMaxValue }}</label>
          <input type="range" class="form-range" min="20" max="80" [(ngModel)]="minMaxValue">
        </div>
        <div class="col-md-6 mb-4">
          <label>Disabled slider</label>
          <input type="range" class="form-range" disabled value="50">
        </div>
      </div>
    </app-ba-panel>
  `,
})
export class SliderComponent {
  basicValue = 50;
  stepValue = 30;
  minMaxValue = 40;
}
