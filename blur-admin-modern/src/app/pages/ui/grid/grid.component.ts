import { Component, ViewEncapsulation } from '@angular/core';
import { BaPanelComponent } from '../../../theme';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [BaPanelComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GridComponent {}
