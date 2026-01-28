import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContainerComponent } from '../../../shared/components';

@Component({
  selector: 'app-progress-bars',
  standalone: true,
  imports: [CommonModule, PageContainerComponent],
  templateUrl: './progress-bars.component.html',
  styleUrl: './progress-bars.component.scss'
})
export class ProgressBarsComponent {}
