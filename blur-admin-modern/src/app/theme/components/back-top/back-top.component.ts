import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'back-top',
  standalone: true,
  template: `<i class="fa fa-angle-up back-top" id="backTop" title="Back to Top"
    [style.display]="visible() ? 'block' : 'none'" (click)="scrollToTop()"></i>`,
})
export class BackTopComponent {
  readonly visible = signal(window.scrollY > 200);

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible.set(window.scrollY > 200);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
