import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './typography.component.html',
})
export class TypographyComponent {}
