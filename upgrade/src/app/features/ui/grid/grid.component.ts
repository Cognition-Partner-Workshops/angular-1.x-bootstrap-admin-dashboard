import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContainerComponent } from '../../../shared/components';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, PageContainerComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {}
