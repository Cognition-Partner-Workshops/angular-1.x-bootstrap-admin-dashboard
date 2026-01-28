import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../shared/components/ba-panel';

@Component({
  selector: 'app-panels',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  templateUrl: './panels.component.html',
  styleUrl: './panels.component.scss'
})
export class PanelsComponent {}
