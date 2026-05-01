import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent {}
