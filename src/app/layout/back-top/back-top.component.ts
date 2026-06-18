import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-back-top',
  standalone: true,
  template: `
    <div class="back-top" [class.visible]="isVisible()" (click)="scrollToTop()">
      <i class="fa fa-angle-up"></i>
    </div>
  `,
})
export class BackTopComponent {
  isVisible = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isVisible.set(window.scrollY > 200);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
