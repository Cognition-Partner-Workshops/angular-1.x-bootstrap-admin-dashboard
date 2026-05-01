import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './slider.component.html',
})
export class SliderComponent {}
