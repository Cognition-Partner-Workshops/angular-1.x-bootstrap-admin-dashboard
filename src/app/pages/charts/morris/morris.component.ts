import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-morris',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './morris.component.html',
})
export class MorrisComponent {}
