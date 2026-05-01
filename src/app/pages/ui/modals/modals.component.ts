import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-modals',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './modals.component.html',
})
export class ModalsComponent {}
