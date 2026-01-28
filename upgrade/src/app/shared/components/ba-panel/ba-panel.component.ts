import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ba-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ba-panel.component.html',
  styleUrl: './ba-panel.component.scss'
})
export class BaPanelComponent {
  @Input() panelTitle = '';
  @Input() panelClass = '';
}
