import { Component, output } from '@angular/core';

@Component({
  selector: 'app-page-top',
  standalone: true,
  templateUrl: './page-top.component.html',
  styleUrl: './page-top.component.scss',
})
export class PageTopComponent {
  toggleSidebar = output<void>();

  onToggle(): void {
    this.toggleSidebar.emit();
  }
}
