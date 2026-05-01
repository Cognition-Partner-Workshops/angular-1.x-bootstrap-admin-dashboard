import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="back-top" [class.show]="showButton" (click)="scrollToTop()">
      <i class="fa fa-angle-up"></i>
    </div>
  `,
})
export class BackTopComponent {
  showButton = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.showButton = window.scrollY > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
