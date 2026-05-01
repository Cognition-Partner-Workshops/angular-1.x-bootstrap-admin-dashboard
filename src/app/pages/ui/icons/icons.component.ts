import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './icons.component.html',
})
export class IconsComponent {}
