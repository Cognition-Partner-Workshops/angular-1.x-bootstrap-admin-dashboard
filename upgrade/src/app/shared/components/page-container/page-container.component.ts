import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../breadcrumb';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.scss'
})
export class PageContainerComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() showBreadcrumb = true;
}
