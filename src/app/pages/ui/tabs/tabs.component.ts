import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {}
